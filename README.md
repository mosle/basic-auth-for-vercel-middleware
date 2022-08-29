Basic Authentication for vercel middleware

## Installation

```sh
npm install --save basic-auth-for-vercel-middleware
```

```sh
yarn add basic-auth-for-vercel-middleware
```

## Usage

### add "PROJECT_ROOT/middleware.(js | ts)"

directory structure:

```
├── ...
├── middleware.js
└── ...
```

### edit "PROJECT_ROOT/middleware.(js | ts)"

like

```js
import { createBasicAuthHandler } from "basic-auth-for-vercel-middleware";
export default createBasicAuthHandler({ name: "test", password: "test" });

//if you use matcher
/*
export const config = {
  matcher: "/",
};
*/
```

```js
import { createBasicAuthHandler } from "basic-auth-for-vercel-middleware";
export default createBasicAuthHandler(
  { name: "test", password: "test" },
  "message for auth"
);
```

```js
//3rd parameter is skip flag(function or boolean)
import { createBasicAuthHandler } from "basic-auth-for-vercel-middleware";
export default createBasicAuthHandler(
  { name: "test", password: "test" },
  "message for auth",
  (request) =>
    request.headers.get("user-agent")?.includes("user-agent-for-cdn-robot")
);
```
