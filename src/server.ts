import express from "express";
import authRoutes from "./routes/auth";
import notesRoutes from "./routes/notes";
import { authenticateJWT } from "./middlewares/authenticate";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/notes", authenticateJWT, notesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
