import express from 'express';
import { connectDB } from './db.mjs';
import { pokemonRouter } from './router.mjs';
import { indexRouter } from './indexRouter.mjs';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { config } from 'dotenv';
import cron from 'node-cron';
import { shuffledPokemonNames } from './pokemonList.mjs';

config();
import cors from 'cors';
import {
  generateRandomPokemonIndex,
  pushPokemon,
  roundDownToNearestHour,
} from './indexController.mjs';

// await connectDB();
// const app = express();
// app.use(cors());
// const server = createServer(app);
// // const io = new Server(server);
// const io = new Server(server, {
//   cors: {
//     origin: '*', // Replace with your desired origin or set it to a specific URL
//     methods: ['GET', 'POST'], // Allow the methods you need
//   },
// });

// app.use(express.json());
// app.use(pokemonRouter);
// app.use(indexRouter);

(async () => {
  await connectDB();

  const app = express();
  app.use(cors());

  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: '*', // Replace with your desired origin or set it to a specific URL
      methods: ['GET', 'POST'], // Allow the methods you need
    },
  });

  app.use(express.json());
  app.use(pokemonRouter);
  app.use(indexRouter);

  app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello, world!' });
  });

  const pokemonNames = [...shuffledPokemonNames];

  const currentPokemon = pokemonNames.shift();
  const postPokemon = async (name) => {
    try {
      console.log('posting', name);
      const response = await fetch('http://localhost:3001/pokemons/post', {
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

  server.listen(3001, () => {
    console.log('Server is running on port 3001');
  });
})();

// let lastIndexShared = null;
// const activeSockets = new Set();
// io.on('connection', (socket) => {
//   // Function to emit a random index
//   console.log('connection on');
//   // socket.emit('randomPokemonIndex', 1);

//   const emitRandomIndex = async () => {
//     // socket.emit('randomPokemonIndex', 1);
//     if (activeSockets.has(socket)) {
//       // If the socket is already active, you can choose to do nothing or handle it as needed
//       console.log('Socket already connected', socket);
//     } else {
//       console.log('new connection on');
//       activeSockets.add(socket);
//       try {
//         let result;
//         result = await generateRandomPokemonIndex();
//         let rightNow = roundDownToNearestHour();
//         if (lastIndexShared == result.index && result.time == rightNow) {
//           console.log('sending same index to client:', lastIndexShared);
//           socket.emit('randomPokemonIndex', lastIndexShared);
//         } else {
//           lastIndexShared = result.index;
//           socket.emit('randomPokemonIndex', result.index);
//         }
//         // Schedule the next emission at the beginning of the next hour
//         const now = new Date();
//         const nextHour = new Date(
//           now.getFullYear(),
//           now.getMonth(),
//           now.getDate(),
//           now.getHours() + 1,
//           0,
//           0,
//           0
//         );
//         const timeUntilNextHour = nextHour - now;
//         console.log(timeUntilNextHour / 60000);
//         // setTimeout(function () {
//         //   emitRandomIndex();
//         //   console.log('timing out');
//         //   // runs second
//         // }, timeUntilNextHour);
//       } catch (error) {
//         // Handle any errors if they occur
//         console.error('Error:', error);
//       }
//     }
//   };

//   // Initial emission
//   emitRandomIndex();

//   // Handle disconnection
//   socket.on('disconnect', () => {
//     console.log('connection Offf');
//     // Handle disconnection if needed
//   });
// });
