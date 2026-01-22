import app from "./app";

const PORT = process.env["PORT"] || 3001;

console.log("BOOT TIME:", new Date().toLocaleTimeString());
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
