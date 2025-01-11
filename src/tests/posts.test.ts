import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import postsModel from "../models/post";
import usersModel from "../models/user";
import { Express } from "express";

var app: Express;
let token: string;
let userId: string;
let postId: string;
let testPost = { content: "Test post", title: "title", userId: "" };

beforeAll(async () => {
  app = await initApp();
  await usersModel.deleteMany();
  await postsModel.deleteMany();

  const userResponse = await request(app)
    .post("/auth/register")
    .send({ username: "testuser", email: "testuser@example.com", password: "password" });
  userId = userResponse.body._id;
  const loginresponse = await request(app).post("/auth/login").send({ email: "testuser@example.com", password: "password" });
  token = loginresponse.body.accessToken;
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});

describe("Posts Tests", () => {
  test("Posts test get all", async () => {
    const response = await request(app).get("/posts");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });

  test("Test Create Comment", async () => {
    const response = await request(app).post("/posts")
    .set("Authorization", `Bearer ${token}`).send(testPost);
    expect(response.statusCode).toBe(201);
    expect(response.body.content).toBe(testPost.content);
    expect(response.body.title).toBe(testPost.title);
    expect(response.body.userId).toBe(userId);
    postId = response.body._id;
  });

  test("Test get post by userId", async () => {
    const response = await request(app).get("/posts?userId=" + userId);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].content).toBe(testPost.content);
    expect(response.body[0].title).toBe(testPost.title);
    expect(response.body[0].userId).toBe(userId);
  });

  test("Post get by id", async () => {
    const response = await request(app).get("/posts/" + postId);
    expect(response.statusCode).toBe(200);
    expect(response.body.content).toBe(testPost.content);
    expect(response.body.title).toBe(testPost.title);
    expect(response.body.userId).toBe(userId);
  });

  test("Post invalid id", async () => {
    const response = await request(app).get("/posts/123");
    expect(response.statusCode).toBe(404);
  });

  test("Post invalid creation", async () => {
    const response = await request(app).post("/posts")
    .set("Authorization", `Bearer ${token}`).send({ title: "title" });
    expect(response.statusCode).toBe(500);
  });

  test("Post update", async () => {
    const response = await request(app).put("/posts/" + postId)
    .set("Authorization", `Bearer ${token}`).send({ title: "new title" });
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe("new title");
  });

  test("Post update invalid id", async () => {
    const response = await request(app).put("/posts/677c6d3333646f563af8dc04")
    .set("Authorization", `Bearer ${token}`).send({ title: "new title" });
    console.log(response.body)
    expect(response.statusCode).toBe(404);
  });

  test("Post delete invalid id", async () => {
    const response = await request(app).delete("/posts/677c6d3333646f563af8dc04")
    .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(404);
  });

  test("Post delete", async () => {
    const response = await request(app).delete("/posts/" + postId)
    .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });

});