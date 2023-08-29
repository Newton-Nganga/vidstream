import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

import { Request,Response,NextFunction } from "express";


const deleteAllUserFavorites = async (req:Request, res:Response) => {
    const userId = req.params.userId;
  
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          collection: {
            include: {
              favourites: true,
            },
          },
        },
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      const collectionId = user.collection?.id;
  
      if (collectionId) {
        await prisma.favourites.deleteMany({ where: { collectionId } });
      }
  
      res.status(200).json({ message: 'All user favorites deleted successfully.' });
    } catch (error) {
      console.error('Error deleting user favorites:', error);
      res.status(500).json({ message: 'An error occurred while deleting user favorites.' });
    }
  };
  