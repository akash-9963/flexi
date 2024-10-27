import { Router } from "express";
import {
  getUserInfo,
  login,
  setUserImage,
  setUserInfo,
  signup,
} from "../controllers/AuthControllers.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";

const authRoutes = Router();
const upload = multer({ dest: "uploads/profiles/" });

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/get-user-info", verifyToken, getUserInfo);
authRoutes.post("/set-user-info", verifyToken, setUserInfo);
// Delete User Endpoint
authRoutes.delete('/api/delete-user', async (req, res) => {
  const userId = req.user.id; // Assuming you have user authentication in place

  try {
      const result = await db.query('DELETE FROM users WHERE id = $1', [userId]);
      if (result.rowCount === 0) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});
authRoutes.post(
  "/set-user-image",
  verifyToken,
  upload.single("images"),
  setUserImage
);

export default authRoutes;
