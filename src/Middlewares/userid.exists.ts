import { NextFunction, Request, Response } from "express";


export const userIdExists = async(req:Request,res:Response,next:NextFunction)=>{
    const {userId}= req.params
    if (!userId || typeof(userId) !== "string" || userId === null){
        return res.status(400).json({Message:"Error : Error you must be logged in first!"})
    }
    next()
}