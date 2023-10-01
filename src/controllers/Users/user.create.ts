import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import { Request,Response,NextFunction } from "express";



export const createUserObject = async(req:Request,res:Response,next:NextFunction)=>{
    const {clientId,username,email,imageUrl} = req.body
    try{
      //check if there is a user with the clientId
      let userExists = await prisma.user.findUnique({
        where: { clientId },
        include: { collection: { include: { favourites: true, watchList: true } } },
      });
      if(userExists){
        return res.status(200).json({message:"User already created",user:userExists})
      }
      //if there is no user then create one
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
      return  res.status(500).json({ message: 'An error occurred while creating the user.',error });
    }
    
    }