
import { NextFunction, Request, Response } from "express";

export const validateData = async(req:Request,res:Response,next:NextFunction)=>{
    const { media_type,movie_id, poster_path, backdrop_path, movie_title } = req.body;
    if(!media_type || !movie_id || !poster_path || !backdrop_path || !movie_title){
        return res.status(400).json({Message:"Error: All fields are required"})
    }
    if(typeof(movie_id) && typeof(movie_title) && typeof(media_type) && typeof(poster_path) && typeof(backdrop_path)  !== "string"){
        return res.status(400).json({Message:"Error: Field values can only be strings"})
    }

    next()
}


export const validateUserData = async(req:Request,res:Response,next:NextFunction)=>{
    const {clientId,username,email,imageUrl} = req.body

    if(!clientId || !username|| !email || !imageUrl ){
        return res.status(400).json({Message:"Error: All fields are required"})
    }
    if(typeof(clientId) && typeof(username) && typeof(email) && typeof(imageUrl)  !== "string"){
        return res.status(400).json({Message:"Error: Field values can only be strings"})
    }

    next()
}