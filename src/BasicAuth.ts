import { next } from "@vercel/edge";

type Credentials = {
  name: string;
  password: string;
};
const unauthorized = (body: string): Response => {
  return new Response(body, {
    status: 401,
    statusText: "'Authentication required.'",
    headers: {
      "WWW-Authenticate": 'Basic realm="User Visible Realm"',
    },
  });
};

const createBasicAuthHandler = (
  authInfo: Credentials,
  unauthorizedText: string = "Authentication required.",
  skip: ((request: Request) => boolean) | boolean = false
): ((request: Request) => Response) => {
  return (request: Request) => {
    if (skip === true || (typeof skip === "function" && skip(request)))
      return next();

    const authorization = request.headers.get("Authorization");

    if (authorization) {
      const [_, basicAuth] = authorization.split(" ");
      const [user, password] = atob(basicAuth).toString().split(":");

      if (user === authInfo.name && password === authInfo.password)
        return next();
    }
    return unauthorized(unauthorizedText);
  };
};

export default createBasicAuthHandler;
