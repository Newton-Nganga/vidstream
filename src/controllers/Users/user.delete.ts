import { PrismaClient } from "@prisma/client";

import { Request,Response} from "express";

const prisma = new PrismaClient()

import {Clerk} from "@clerk/clerk-sdk-node"

const clerk = Clerk({secretKey:process.env.CLERK_SECRET_KEY})

export const deleteUserObject= async(req:Request,res:Response)=>{
    const userId = req.params.userId;
  
  try {
    const user = await prisma.user.findUnique({
      where: { clientId: userId },
      //include: { collections: { include: { favourites: true, watchlist: true } } },
      include:{collection:true}
    });
   
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    
    await prisma.favourites.deleteMany({ where: { collectionId: user.collection?.id } });
    await prisma.watchList.deleteMany({ where: { collectionId: user.collection?.id } });
    await prisma.collection.delete({ where: { id: user.collection?.id} });
    await prisma.user.delete({ where: { clientId: userId } });
    //delete the client
    const us = await clerk.users.deleteUser(userId)
    
    res.status(200).json({ message: 'User and associated data deleted successfully.',user:us });
  } catch (error) {

    console.error('Error deleting user and associated data:', error);
    res.status(500).json({ message: 'An error occurred while deleting the user and associated data.' });
  }
}
