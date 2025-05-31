import { Request, Response } from "express";

const isAuthenticated = async (...client:[Request, Response]) => {
    const res = client[1];
    res.status(200).json({logged: true});
}

export default isAuthenticated