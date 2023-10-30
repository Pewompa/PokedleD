import express from 'express';
import { connectDB } from './db.mjs';
import { pokemonRouter } from './router.mjs';
import { indexRouter } from './indexRouter.mjs';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { config } from 'dotenv';

config();
import cors from 'cors';
import {
  generateRandomPokemonIndex,
  roundDownToNearestHour,
} from './indexController.mjs';
import { log } from 'console';
await connectDB();
const app = express();
app.use(cors());
const server = createServer(app);
// const io = new Server(server);
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

server.listen(3003, () => {
  console.log('Server is running on port 3001');
});

// io.on('connection', (socket) => {
//   // console.log('A user connected');

//   // Send a random Pokémon index to the connected client
//   const randomIndex = async () => {
//     try {
//       let index1 = await generateRandomPokemonIndex();
//       return index1;
//     } catch (error) {
//       // Handle any errors if they occur
//       console.error('Error:', error);
//       throw error; // Optionally rethrow the error
//     }
//   };

//   // Emit the result when the Promise resolves

//   (async () => {
//     try {
//       console.log('emitting');
//       const result = await randomIndex();;
//       socket.emit('randomPokemonIndex', result);
//     } catch (error) {
//       // Handle any errors if they occur
//       console.error('Error:', error);
//     }
//   })();

//   // Handle disconnection
//   socket.on('disconnect', () => {
//     // console.log('A user disconnected');
//   });
// });

let lastIndexShared = null;
const activeSockets = new Set();
io.on('connection', (socket) => {
  // Function to emit a random index
  console.log('connection on');
  // socket.emit('randomPokemonIndex', 1);

  const emitRandomIndex = async () => {
    // socket.emit('randomPokemonIndex', 1);
    if (activeSockets.has(socket)) {
      // If the socket is already active, you can choose to do nothing or handle it as needed
      console.log('Socket already connected', socket);
    } else {
      console.log('new connection on');
      activeSockets.add(socket);
      try {
        let result;
        result = await generateRandomPokemonIndex();
        let rightNow = roundDownToNearestHour();
        if (lastIndexShared == result.index && result.time == rightNow) {
          console.log('sending same index to client:', lastIndexShared);
          socket.emit('randomPokemonIndex', lastIndexShared);
        } else {
          lastIndexShared = result.index;
          socket.emit('randomPokemonIndex', result.index);
        }
        // Schedule the next emission at the beginning of the next hour
        const now = new Date();
        const nextHour = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          now.getHours() + 1,
          0,
          0,
          0
        );
        const timeUntilNextHour = nextHour - now;
        console.log(timeUntilNextHour / 60000);
        // setTimeout(function () {
        //   emitRandomIndex();
        //   console.log('timing out');
        //   // runs second
        // }, timeUntilNextHour);
      } catch (error) {
        // Handle any errors if they occur
        console.error('Error:', error);
      }
    }
  };

  // Initial emission
  emitRandomIndex();

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('connection Offf');
    // Handle disconnection if needed
  });
});
