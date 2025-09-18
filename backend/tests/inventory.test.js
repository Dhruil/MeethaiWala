import request from "supertest";
import app from "../server.js";
import db from "../utils/db.js";

let ownerToken, userToken, sweetId, ownerId, userId;

beforeAll(async () => {
  // Register an owner
  const ownerRes = await request(app)
    .post("/api/auth/register")
    .send({
      role: "owner",
      name: "OwnerTest",
      email: "owner@shop.com",
      password: "ownerpass",
      shop_name: "Owner Mithai"
    });
  ownerId = ownerRes.body.owner_id;

  const ownerLogin = await request(app)
    .post("/api/auth/login")
    .send({ email: "owner@shop.com", password: "ownerpass", type: "owner" });
  ownerToken = ownerLogin.body.token;

  // Register a user
  const userRes = await request(app)
    .post("/api/auth/register")
    .send({
      role: "user",
      name: "UserTest",
      email: "user@test.com",
      password: "userpass"
    });
  userId = userRes.body.user_id;

  const userLogin = await request(app)
    .post("/api/auth/login")
    .send({ email: "user@test.com", password: "userpass", type: "user" });
  userToken = userLogin.body.token;

  // Owner adds a sweet
  const sweetRes = await request(app)
    .post("/api/sweets")
    .set("Authorization", `Bearer ${ownerToken}`)
    .send({
      name: "Rasgulla",
      category: "Mithai",
      price: 100,
      quantity: 10,
      description: "Soft rasgullas",
      image_url: "https://dummyimage.com/rasgulla.jpg"
    });

  sweetId = sweetRes.body.sweet_id;
});

afterAll(async () => {
  // Delete only the added data
  await db.query("DELETE FROM purchases WHERE user_id = ?", [userId]);
  await db.query("DELETE FROM sweets WHERE id = ?", [sweetId]);
  await db.query("DELETE FROM shop_owners WHERE id = ?", [ownerId]);
  await db.query("DELETE FROM users WHERE id = ?", [userId]);
  await db.end();
});

describe("Inventory API", () => {
  test("User can purchase a sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ quantity: 2 });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Purchase successful");
  });

  test("Reject purchase when stock is insufficient", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/purchase`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ quantity: 50 });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Insufficient stock/);
  });

  test("Owner can restock a sweet", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${ownerToken}`)
      .send({ quantity: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Sweet restocked");
    expect(res.body.new_quantity).toBe(13);
    expect(res.body.added_quantity).toBe(5);
  });

  test("Reject restock by normal user", async () => {
    const res = await request(app)
      .post(`/api/sweets/${sweetId}/restock`)
      .set("Authorization", `Bearer ${userToken}`)
      .send({ quantity: 5 });

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toMatch(/Only owners can restock/);
  });
});
