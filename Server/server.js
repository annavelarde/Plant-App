const app = require("./app");

// Add Cache-Control middleware
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache");
  next();
});

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
