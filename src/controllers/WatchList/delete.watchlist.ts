import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

import { Request,Response} from "express";


export const deleteUserWatchList = async (req:Request, res:Response) => {
    const userId = req.params.userId;
    const watchListId = parseInt(req.params.watchListId);
  
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
      //filer the movie
      const WatchListMovie = user.collection?.watchList.find((fav) => fav.movie_id === watchListId);
  
      if (!WatchListMovie) {
        return res.status(404).json({ message: 'WatchList not found.' });
      }
  
      await prisma.watchList.delete({
        where: { movie_id: watchListId },
      });
  
      res.status(200).json({ message: 'Movie deleted from watchlist successfully.' });
    } catch (error) {
      console.error('Error deleting movie from  watchlist :', error);
      res.status(500).json({ message: 'An error occurred while deleting movie from watchlist.' });
    }
  };
  