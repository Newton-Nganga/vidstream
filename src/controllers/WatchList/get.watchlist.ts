import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

import { Request,Response,NextFunction } from "express";


export const fetchUserWatchListById = async (req:Request, res:Response) => {
    const userId = req.params.userId;
    const favoriteId = req.params.favoriteId;
  
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          collection: {
            include: {
              favourites: {
                where: { id: favoriteId },
              },
            },
          },
        },
      });
    
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
    
      const favorite = user.collection?.favourites[0]; // Assuming the ID is unique, so we select the first found favorite
    
      if (!favorite) {
        return res.status(404).json({ message: 'Favorite not found.' });
      }
    
      res.status(200).json({ message: 'Favorite fetched successfully.', favorite });
    } catch (error) {
      console.error('Error fetching user favorite by ID:', error);
      res.status(500).json({ message: 'An error occurred while fetching user favorite by ID.' });
    }
  };
  