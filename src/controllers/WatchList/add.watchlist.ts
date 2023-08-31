import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

import { Request,Response,NextFunction } from "express";


export const addUserWatchList = async (req:Request, res:Response) => {
    const userId = req.params.userId;
    const { media_type,movie_id, poster_path, backdrop_path, movie_title } = req.body;
  
    try {
      const user = await prisma.user.findUnique({
        where: { clientId: userId },
        include: { collection: true },
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
      
      const collectionId = user.collection?.id;
      const alreadyAdded = await prisma.watchList.findUnique({
        where:{movie_id:parseInt(movie_id)}
      })
      if(alreadyAdded){
        return res.status(400).json({message:"The movie is already in your list"})
      }
      const watchListMovie = await prisma.watchList.create({
        data: {
          movie_id:parseInt(movie_id),
          media_type,
          poster_path,
          backdrop_path,
          movie_title,
          collection: { connect: { id: collectionId } },
        } as any,
      });
  
      res.status(201).json({ message: 'Movie added to watchlist successfully.', watchListMovie });
    } catch (error) {
      console.error('Error adding movie to watchlist:', error);
      res.status(500).json({ message: 'An error occurred while adding  movie to watchlist.' });
    }
  };
  