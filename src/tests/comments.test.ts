import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import commentsModel from "../models/comment";
import postsModel from "../models/post";
import usersModel from "../models/user";
import { Express } from "express";

var app: Express;
let token: string;
let userId: string;
let postId: string;
let testComment = { content: "Test Comment", postId: "", userId: "" };

beforeAll(async () => {
  app = await initApp();
  await usersModel.deleteMany();
  await commentsModel.deleteMany();
  await postsModel.deleteMany();

  const userResponse = await request(app)
    .post("/auth/register")
    .send({ username: "testuser", email: "testuser@example.com", password: "password" });
  userId = userResponse.body._id;
  testComment.userId = userId;
  const loginresponse = await request(app).post("/auth/login").send({ email: "testuser@example.com", password: "password" });
  token = loginresponse.body.accessToken;
  const postResponse = await request(app).post("/post")
  .set("Authorization", `Bearer ${token}`).send({ title: "testuser@example.com", content: "password" });
  postId = loginresponse.body._id;
  testComment.postId = postId;
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});

let commentId = "";

describe("Comments Tests", () => {
  test("Comments test get all", async () => {
    const response = await request(app).get("/comments");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });

  test("Test Create Comment", async () => {
    const response = await request(app).post("/comments")
    .set("Authorization", `Bearer ${token}`).send(testComment);
    expect(response.statusCode).toBe(201);
    expect(response.body.content).toBe(testComment.content);
    expect(response.body.postId).toBe(testComment.postId);
    expect(response.body.userId).toBe(testComment.userId);
    commentId = response.body._id;
  });

  test("Test get commenty by userId", async () => {
    const response = await request(app).get("/comments?userId=" + testComment.userId);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].content).toBe(testComment.content);
    expect(response.body[0].postId).toBe(testComment.postId);
    expect(response.body[0].userId).toBe(testComment.userId);
  });

  test("Comments get by post id", async () => {
    const response = await request(app).get("/comments/" + postId);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].content).toBe(testComment.content);
    expect(response.body[0].postId).toBe(testComment.postId);
    expect(response.body[0].userId).toBe(testComment.userId);
  });

  test("Comment update", async () => {
    const response = await request(app).put("/comments/" + commentId)
    .set("Authorization", `Bearer ${token}`).send({ content: "Updated content" });
    expect(response.statusCode).toBe(200);
    expect(response.body.content).toBe("Updated content");
  });

  test("Comment delete", async () => {
    const response = await request(app).delete("/comments/" + commentId)
    .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
  });

});