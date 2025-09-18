import request from "supertest";
import app from "./server.js";

describe("Simple API tests", () => {
  test("GET /api/sweets returns status 200 and data", async () => {
    const response = await request(app).get("/api/sweets");
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  test("GET /api/owners returns status 200 and data", async () => {
    const response = await request(app).get("/api/owners");
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  test("GET /api/purchases/:userId returns status 200 and data", async () => {
    const testUserId = "1";
    const response = await request(app).get(`/api/purchases/${testUserId}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });
});
