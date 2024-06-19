import { deleteRemoveAccess, getManyProjectAll, getManyUser, postAddAccess, postOneUser } from "@controllers";
import { Router } from "express";

const adminRouter = Router();

adminRouter.post( "/add-access", postAddAccess );
adminRouter.delete( "/remove-access", deleteRemoveAccess );

adminRouter.post( "/user", postOneUser );
adminRouter.get( "/users", getManyUser );
adminRouter.get( "/projects", getManyProjectAll );

export { adminRouter };
