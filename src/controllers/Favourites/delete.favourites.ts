import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

import { Request,Response,NextFunction } from "express";


export const deleteUserFavorite = async (req:Request, res:Response) => {
    const userId = req.params.userId;
    const favouriteId = parseInt(req.params.favouriteId)
    
    try {
      const user = await prisma.user.findUnique({
        where: { clientId: userId },
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
    
      const collectionsId = user.collection?.id;
      
      const favorite = user.collection?.favourites.find((fav) => fav.movie_id === favouriteId);
      
      if (!favorite) {
        return res.status(404).json({ message: 'Favorite not found.' });
      }
  
      await prisma.favourites.delete({
        where: { movie_id: favouriteId },
      });
  
      res.status(200).json({ message: 'Favorite deleted successfully.' });
    } catch (error) {
      console.error('Error deleting user favorite:', error);
      res.status(500).json({ message: 'An error occurred while deleting user favorite.' });
    }
  };
  