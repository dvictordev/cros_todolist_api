import { app } from "./app";
import { env } from "./env";

app.listen(env.PORT, () => {
  console.log("HTTP server running 🚀");
  console.log("API docs on http://localhost:3333/api-docs");
});
