import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

import { Request,Response,NextFunction } from "express";


export const fetchUserFavorites = async (req:Request, res:Response) => {
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
  
      const favorites = user.collection?.favourites || [];
  
      res.status(200).json({ message: 'Favorites fetched successfully.', favorites });
    } catch (error) {
      console.error('Error fetching user favorites:', error);
      res.status(500).json({ message: 'An error occurred while fetching user favorites.' });
    }
  };
  