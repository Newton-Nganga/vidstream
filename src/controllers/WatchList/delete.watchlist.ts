import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

import { Request,Response,NextFunction } from "express";


export const deleteUserWatchList = async (req:Request, res:Response) => {
    const userId = req.params.userId;
    const watchListId = req.params.favoriteId;
  
    try {
      const user = await prisma.user.findUnique({
        where: { clientId: userId },
        include: {
          collections: {
            include: {
              watchlist: true,
            },
          },
        },
      });
      
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      const collectionId = user.collections[0]?.id;
      //filer the movie
      const WatchListMovie = user.collections[0]?.watchlist.find((fav) => fav.id === watchListId);
  
      if (!WatchListMovie) {
        return res.status(404).json({ message: 'WatchList not found.' });
      }
  
      await prisma.watchList.delete({
        where: { id: watchListId },
      });
  
      res.status(200).json({ message: 'Movie deleted from watchlist successfully.' });
    } catch (error) {
      console.error('Error deleting movie from  watchlist :', error);
      res.status(500).json({ message: 'An error occurred while deleting movie from watchlist.' });
    }
  };
  