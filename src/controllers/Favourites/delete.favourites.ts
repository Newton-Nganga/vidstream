import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

import { Request,Response,NextFunction } from "express";


const deleteUserFavorite = async (req:Request, res:Response) => {
    const userId = req.params.userId;
    const favoriteId = req.params.favoriteId;
  
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          collections: {
            include: {
              favourites: true,
            },
          },
        },
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      const collectionsId = user.collections?.id;
      const favorite = user.collections?.favourites.find((fav) => fav.id === favoriteId);
  
      if (!favorite) {
        return res.status(404).json({ message: 'Favorite not found.' });
      }
  
      await prisma.favourites.delete({
        where: { id: favoriteId },
      });
  
      res.status(200).json({ message: 'Favorite deleted successfully.' });
    } catch (error) {
      console.error('Error deleting user favorite:', error);
      res.status(500).json({ message: 'An error occurred while deleting user favorite.' });
    }
  };
  