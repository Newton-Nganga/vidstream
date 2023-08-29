import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import { Request,Response,NextFunction } from "express";



export const createUserObject = async(req:Request,res:Response,next:NextFunction)=>{

    const {clientId,username,email,imageUrl} = req.body
    try{

     const user = await prisma.user.create({
        data: {
          clientId,
          username,
          email,
          imageUrl,
          collection: { create: {} }, // instantiate an empty collection object for the new user
        },
        include: {
          collection: true,
        },
      });
  
      res.status(201).json({ message: 'User created successfully.', user });

    }catch(error){

      return  res.status(500).json({ message: 'An error occurred while creating the user.' });
    }
    
    }