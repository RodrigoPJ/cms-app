import { Request, Response } from "express";
import validateNewUser from "../utils/validators/validateNewUser";

const createNewUser = async(req:Request, res:Response) => {
    const body = req.body;
    const validationErrors = await validateNewUser(body);
    if((validationErrors).length > 0) {
        res.status(403).json({ ...validationErrors.map((el) => el.constraints) })
    }else {
        
    }
}

export default createNewUser;