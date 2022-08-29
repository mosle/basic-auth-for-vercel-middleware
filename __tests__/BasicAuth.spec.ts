import { createBasicAuthHandler } from "../src/index";

describe("", () => {
  test("require auth", () => {
    const handler = createBasicAuthHandler({
      name: "name",
      password: "password",
    });

    const req = new Request("https://example.com/");
    const res = handler(req);
    expect(res.status).toBe(401);
  });
  test("auth passed", () => {
    const handler = createBasicAuthHandler({
      name: "name",
      password: "password",
    });

    const req = new Request("https://example.com/", {
      headers: {
        Authorization:
          "Basic " + Buffer.from("name" + ":" + "password").toString("base64"),
      },
    });
    const res = handler(req);
    expect(res.status).toBe(200);
  });

  test("skip normally", () => {
    const handler = createBasicAuthHandler(
      {
        name: "name",
        password: "password",
      },
      "require auth",
      (request: Request) => true
    );

    const req = new Request("https://example.com/");
    const res = handler(req);
    expect(res.headers.get("x-middleware-next")).toBe("1");
  });
});
