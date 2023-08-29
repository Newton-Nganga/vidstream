import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

import { Request,Response,NextFunction } from "express";


const addUserFavoriteMovie = async (req:Request, res:Response) => {
    const userId = req.params.userId;
    const { movie_id, poster_path, backdrop_path, movie_title } = req.body;
  
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { collection: true },
      });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }
  
      const collectionId = user.collection?.id;
  
      const watchListMovie = await prisma.watchList.create({
        data: {
          movie_id,
          poster_path,
          backdrop_path,
          movie_title,
          collection: { connect: { id: collectionId } },
        },
      });
  
      res.status(201).json({ message: 'Favorite movie added successfully.', watchListMovie });
    } catch (error) {
      console.error('Error adding user favorite movie:', error);
      res.status(500).json({ message: 'An error occurred while adding user favorite movie.' });
    }
  };
  