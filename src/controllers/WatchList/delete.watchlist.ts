import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

import { Request,Response,NextFunction } from "express";


export const deleteUserWatchList = async (req:Request, res:Response) => {
    const userId = req.params.userId;
    const watchListId = req.params.favoriteId;
  
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
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
      const WatchListMovie = user.collection?.watchList.find((fav) => fav.id === watchListId);
  
      if (!WatchListMovie) {
        return res.status(404).json({ message: 'WatchList not found.' });
      }
  
      await prisma.watchList.delete({
        where: { id: watchListId },
      });
  
      res.status(200).json({ message: 'Movie deleted from list successfully.' });
    } catch (error) {
      console.error('Error deleting movie from users watchlist :', error);
      res.status(500).json({ message: 'An error occurred while deleting user watchlist.' });
    }
  };
  