import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

import { Request,Response,NextFunction } from "express";


export const fetchUserWatchListById = async (req:Request, res:Response) => {
    const userId = req.params.userId;
    const watchlistId = req.params.watchlistId;
  
    try {
      const user = await prisma.user.findUnique({
        where: { clientId: userId },
        include: {
          collections: {
            include: {
              watchlist: {
                where: { id: watchlistId },
              },
            },
          },
        },
      });
    
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      
      const watchlistMovie = user.collections[0].watchlist[0]; // Assuming the ID is unique, so we select the first found favorite
    
      if (!watchlistMovie) {
        return res.status(404).json({ message: 'Movie from watchlist not found.' });
      }
    
      res.status(200).json({ message: 'Movie from watchlsit successfully.', watchlistMovie });
    } catch (error) {
      console.error('Error fetching Movie from watchlsit  by ID:', error);
      res.status(500).json({ message: 'An error occurred while fetching Movie from watchlsit by ID.' });
    }
  };
  