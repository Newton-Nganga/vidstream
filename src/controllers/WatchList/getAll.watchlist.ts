import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

import { Request,Response,NextFunction } from "express";


export const fetchUserWatchList = async (req:Request, res:Response) => {
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
  
      const moviesInWatchList = user.collection?.watchList || []; //returns all movies list for the user
  
      res.status(200).json({ message: 'Your watchlist fetched successfully.', watchlist:moviesInWatchList });
    } catch (error) {
      console.error('Error fetching the watchlist:', error);
      res.status(500).json({ message: 'An error occurred while fetching the watchlist.' });
    }
  };
  