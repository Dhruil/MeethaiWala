import request from "supertest";
import app from "../server.js";
import db from "../utils/db.js";

// Before all tests, ensure the database is reachable
beforeAll(async () => {
  try {
    await db.query("SELECT 1");
    console.log("Database connected for tests");

    await db.query("DELETE FROM users where email = 'user@example.com'");
    await db.query("DELETE FROM shop_owners where email = 'owner@example.com'");
  } catch (err) {
    console.error("Database connection failed", err);
    throw err;
  }
});

// After all tests, close the database connection
afterAll(async () => {
  await db.end();
});
describe("Auth API", () => {
  // --------- USER TESTS ----------
  test("Register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        role: "user",
        name: "TestUser",
        email: "user@example.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("user_id");
  });

  test("Login as registered user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "user@example.com",
        password: "password123",
        type: "user"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.role).toBe("user");
  });

  // --------- OWNER TESTS ----------
  test("Register a new owner", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        role: "owner",
        name: "TestOwner",
        email: "owner@example.com",
        password: "ownerpass",
        shop_name: "Owner Mithaiwala"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("owner_id");
  });

  test("Login as registered owner", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "owner@example.com",
        password: "ownerpass",
        type: "owner"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.user.role).toBe("owner");
  });

  // --------- ERROR CASES ----------
  test("Reject login with wrong password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "user@example.com",
        password: "wrongpass",
        type: "user"
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/Invalid credentials/);
  });

  test("Reject duplicate user registration", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        role: "user",
        name: "DuplicateUser",
        email: "user@example.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toMatch(/already registered/);
  });
});
