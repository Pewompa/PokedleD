import express from 'express';
import { connectDB } from './db.mjs';
import { pokemonRouter } from './router.mjs';
import { indexRouter } from './indexRouter.mjs';
import { createServer } from 'http';
import { config } from 'dotenv';
import cron from 'node-cron';
import { shuffledPokemonNames } from './pokemonList.mjs';
import cors from 'cors';

config();

(async () => {
  await connectDB();

  const app = express();
  app.use(cors());

  const server = createServer(app);

  app.use(express.json());
  app.use(pokemonRouter);
  app.use(indexRouter);

  const pokemonNames = [...shuffledPokemonNames];
  const currentPokemon = pokemonNames.shift();

  const postPokemon = async (name) => {
    try {
      console.log('posting', name);
      const response = await fetch('${process.env.MONGODB_URI}/pokemons/post', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return console.log('error posting pokemon: ', error);
    }
  };
  postPokemon(currentPokemon);

  cron.schedule('0 0 * * *', async () => {
    const currentPokemon = pokemonNames.shift();
    await postPokemon(currentPokemon);
  });

  const port = process.env.PORT || 3001;
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})();
