import express from "express";
import {createUser,loginUser,logoutCurrentUser,getAllUsers,
    getCurrentUserProfile,updateCurrentUserProfile,deleteUserById,getUserById,updateUserById} from "../controllers/userControllers.js";
import { authenticate,authorizeAdmin } from "../middlewares/authMiddleware.js";

const router=express.Router();

router.route('/').post(createUser).get(authenticate,authorizeAdmin,getAllUsers);

http://localhost:3080/api/users/auth
router.post('/auth',loginUser);
router.post('/logout',logoutCurrentUser);

router.route('/profile').get(authenticate,getCurrentUserProfile).put(authenticate,updateCurrentUserProfile);

//admin routes
router.route('/:id').delete(authenticate,authorizeAdmin,deleteUserById)
.get(authenticate,authorizeAdmin,getUserById)
.put(authenticate,authorizeAdmin,updateUserById);


export default router;