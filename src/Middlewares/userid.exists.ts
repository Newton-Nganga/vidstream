import { NextFunction, Request, Response } from "express";


export const userIdExists = async(req:Request,res:Response,next:NextFunction)=>{
    const {userId}= req.params
    
    if (!userId || typeof(userId) !== "string" || userId === null){
        return res.status(400).json({Message:"Error : Error you must be logged in first!"})
    }
    //grab the list of all users from clerk
    //compare it with users in the db
    //if the user does not exist return error
    //if the db users are more delete the ones not in clerk
    next()
}