import express from "express";
// ... other imports

const app = express();
// ... your routes and middleware
app.get("/", (req, res) => {
  res.send("Hello World");
});
// USE THIS:
export default app;
