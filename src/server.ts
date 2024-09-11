import { app } from "./app";
import { env } from "./env";

app.listen(env.PORT, () => {
  console.log("HTTP server running 🚀");
});
