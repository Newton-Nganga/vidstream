import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

import { Request,Response } from "express";


export const deleteAllUserWatchList = async (req:Request, res:Response) => {
    const userId = req.params.userId;
  
    try {
      const user = await prisma.user.findUnique({
        where: { clientId: userId },
        include: {
          collection: {
            include: {
              watchList: true,
            },
          },
        },
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      const collectionId = user.collection?.id;
  
      if (collectionId) {
        await prisma.watchList.deleteMany({ where: { collectionId } });
      }
  
      res.status(200).json({ message: 'All movies in your watchlist deleted successfully.' });

    } catch (error) {
      console.error('Error deleting movies from watchlist:', error);
      res.status(500).json({ message: 'An error occurred while deleting movies from watchlist.' });
    }
  };
  