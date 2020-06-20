import "./LoadEnv"; // Must be the first import
import app from "@server";

// Start the server
const port = Number(process.env.PORT || 8000);
app.listen(port, () => {
  console.log("Express server started on port: " + port);
});
