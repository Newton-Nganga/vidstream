
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import { Request,Response } from "express";

export const fetchOrUpdateUser = async (req:Request, res:Response) => {
    const userId = req.params.userId;
    const { clientId, username, email, imageUrl } = req.body;
  
    try {
      let user = await prisma.user.findUnique({
        where: { clientId: userId },
        include: { collection: { include: { favourites: true, watchList: true } } },
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      // Check if any user data doesn't match the provided data, and update it if necessary
      let updated = false;
      
      if (clientId && user.clientId !== clientId) {
        user = await prisma.user.update({
          where: { clientId: userId },
          data: { clientId },
          include:{collection:{include:{favourites:true,watchList:true}}}
        });
        
        updated = true;
      }
      
      if (username && user.username !== username) {
        user = await prisma.user.update({
          where: { clientId: userId },
          data: { username },
          include:{collection:{include:{favourites:true,watchList:true}}}
        });
        updated = true;
      }
      if (email && user.email !== email) {
        user = await prisma.user.update({
          where: { clientId: userId },
          data: { email },
          include:{collection:{include:{favourites:true,watchList:true}}}
        });
        updated = true;
      }
      if (imageUrl && user.imageUrl !== imageUrl) {
        user = await prisma.user.update({
          where: { clientId: userId },
          data: { imageUrl },
          include:{collection:{include:{favourites:true,watchList:true}}}
        });
        updated = true;
      }
  
      if (updated) {
        user = await prisma.user.findUnique({
          where: { clientId: userId },
          include: { collection: { include: { favourites: true, watchList: true } } },
        });
      }
  
      res.status(200).json({ message: 'User fetched and updated (if necessary) successfully.', user });
    } catch (error) {
      console.error('Error fetching and updating user data:', error);
      res.status(500).json({ message: 'An error occurred while fetching and updating user data.' });
    }
}