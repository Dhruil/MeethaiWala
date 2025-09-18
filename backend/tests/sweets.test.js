import request from "supertest";
import app from "../server.js";
import db from "../utils/db.js";

let ownerToken;  // JWT for owner
let sweetId;     // store sweet id for update/delete
let ownerId;     // store owner id for cleanup

beforeAll(async () => {
  // register an owner
  const registerRes = await request(app)
    .post("/api/auth/register")
    .send({
      role: "owner",
      name: "TestOwner",
      email: "owner@test.com",
      password: "ownerpass",
      shop_name: "Test Mithai"
    });
  ownerId = registerRes.body.owner_id;

  // login as owner to get token
  const res = await request(app)
    .post("/api/auth/login")
    .send({
      email: "owner@test.com",
      password: "ownerpass",
      type: "owner"
    });

  ownerToken = res.body.token;
});

afterAll(async () => {
  // delete only the added sweet and owner
  if (sweetId) {
    await db.query("DELETE FROM sweets WHERE id = ?", [sweetId]);
  }
  if (ownerId) {
    await db.query("DELETE FROM shop_owners WHERE id = ?", [ownerId]);
  }
  await db.end();
});

describe("Sweets API", () => {

  test("GET /api/sweets should return all sweets", async () => {
    const res = await request(app).get("/api/sweets");
    expect(res.statusCode).toBe(200);
    expect(res.body[0].name).toBe("Kaju Katli");
  });

  test("GET /api/sweets/search should filter sweets by category", async () => {
    const res = await request(app).get("/api/sweets/search?category=Mithai");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].category).toBe("Mithai");
  });

    test("POST /api/sweets should add a sweet (owner only)", async () => {
    const res = await request(app)
      .post("/api/sweets")
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({
        name: "Ras Malai",
        category: "Mithai",
        price: 500,
        quantity: 20,
        description: "Delicious ras malai sweet",
        image_url: "https://dummyimage.com/rasmalai.jpg"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("sweet_id");
    sweetId = res.body.sweet_id;
  });

  test("PUT /api/sweets/:id should update sweet details", async () => {
    const res = await request(app)
      .put(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({
        name: "Gulab Jamun",
        category: "Mithai",
        price: 550,
        quantity: 25,
        description: "Delicious gulab jamun sweet",
        image_url: "https://dummyimage.com/gulabjamun.jpg"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Sweet updated");
  });

  test("DELETE /api/sweets/:id should delete sweet (owner only)", async () => {
    const res = await request(app)
      .delete(`/api/sweets/${sweetId}`)
      .set("Authorization", `Bearer ${ownerToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Sweet deleted");
  });

  test("GET /api/sweets/:id after delete should return not found", async () => {
    const res = await request(app).get("/api/sweets");
    const exists = res.body.find(s => s.id === sweetId);
    expect(exists).toBeUndefined();
  });
});