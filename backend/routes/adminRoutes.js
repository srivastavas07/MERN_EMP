import express from "express";
import { admin_login, admin_logout} from "../controllers/adminController.js";
const router = express.Router();
router.route('/login').post(admin_login);
router.route('/logout').get(admin_logout);
export default router;