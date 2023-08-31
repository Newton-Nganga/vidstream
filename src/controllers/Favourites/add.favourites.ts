import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

import { Request,Response } from "express";


export const addUserFavoriteMovie = async (req:Request, res:Response) => {
    const userId = req.params.userId;
    const { media_type,movie_id, poster_path, backdrop_path, movie_title } = req.body;
  
    try {
      const user = await prisma.user.findUnique({
        where: { clientId: userId },
       // include: { collection: true },
       include: {
        collection: {
          select: {
            id: true,
          },
        },
      }
      });
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      
      
      const collectionId = user.collection?.id;
      const alreadyAdded = await prisma.favourites.findUnique({
        where:{movie_id:parseInt(movie_id)}
      })
      if(alreadyAdded){
        return res.status(400).json({message:"The movie is already in your list"})
      }
      const favoriteMovie = await prisma.favourites.create({
        data: {
          movie_id:parseInt(movie_id),
          media_type,
          poster_path,
          backdrop_path,
          movie_title,
          collection: { connect: { id: collectionId } },
        } as any,
      });
      
      res.status(201).json({ message: 'Favorite movie added successfully.', favoriteMovie });
    } catch (error) {
      console.error('Error adding user favorite movie:', error);
      res.status(500).json({ message: 'An error occurred while adding user favorite movie.' });
    }
  };
  