'use client';
import React, { useState, useEffect, createContext } from 'react';
import Layout from '@/app/components/Layout';
import Form from '@/app/components/Form';
import { getPokemonInfo } from '@/app/components/PokemonList';
import io from 'socket.io-client';
import { obtainPokemonName } from './service';
import { loadGetInitialProps } from 'next/dist/shared/lib/utils';
export default function Home({}) {
  const [pokemonName, setPokemonName] = useState(null);
  const [pokemon, setPokemon] = useState(null);

  // const [called, setCalled] = useState(false);
  // const [indexFromSocket, setIndexFromSocket] = useState(null);
  // const socket = io('http://localhost:3001');
  // const [indexFromSocketIsIn, setIndexFromSocketIsIn] = useState(false);

  // useEffect(() => {
  //   // Listen for the 'randomPokemonIndex' event
  //   socket.on('randomPokemonIndex', (index) => {
  //     if (indexFromSocketIsIn == false) {
  //       const storedPokemon = localStorage.getItem('chosenPokemon');
  //       const pokemonData = JSON.parse(storedPokemon);
  //       // console.log(pokemonData.id === index);
  //       // console.log(pokemonData.id, index);
  //       if (pokemonData && pokemonData.id == index) {
  //         console.log('setting same index', index);
  //         setIndexFromSocket(pokemonData.id);
  //       } else {
  //         console.log('setting new index', index);
  //         setIndexFromSocket(index);
  //       }
  //       setIndexFromSocketIsIn(true);
  //     }
  //   });
  // }, [socket]);

  // useEffect(() => {
  //   if (indexFromSocket == null) {
  //     console.log('null index');
  //     return;
  //   }
  //   console.log('indexFromSocket: ', indexFromSocket);
  //   const storedPokemon = localStorage.getItem('chosenPokemon');
  //   const pokemonData = JSON.parse(storedPokemon);

  //   // if pokemon id from local storage is the same as the one from socket, set the pokemon directly as its the same hour
  //   if (pokemonData && pokemonData.id === indexFromSocket) {
  //     // get data from local storage if there its the same hour
  //     setPokemon(pokemonData);
  //     console.log('same hour');
  //     return;
  //   } else {
  //     // its a different hour so getting a new pokemon
  //     console.log('different hour');
  //     localStorage.clear();
  //     const fetchData = async () => {
  //       await fetchPokemonData(indexFromSocket);
  //     };

  //     // if the pokemon hasnt been called yet and index is not null, run the above
  //     if (called == false && indexFromSocket !== null) {
  //       fetchData();
  //       return;
  //     }
  //   }
  // }, [indexFromSocket]);

  // // saving the chosen pokemon to local storage
  // const choosePokemon = (pokemonData) => {
  //   localStorage.setItem('chosenPokemon', JSON.stringify(pokemonData));
  // };

  // // fetch pokemon data from pokemon api
  // const fetchPokemonData = async (id) => {
  //   try {
  //     if (id !== null) {
  //       const pokemonData = await getPokemonInfo(id);
  //       setPokemon(pokemonData);
  //       choosePokemon(pokemonData);
  //       setCalled(true);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    const getPokemonFromDB = async () => {
      let pokemon = await obtainPokemonName();
      return pokemon;
    };

    const fetchPokemonName = async () => {
      const pokemonNamer = await getPokemonFromDB();
      setPokemonName(pokemonNamer);
    };
    fetchPokemonName();
  }, []);

  useEffect(() => {
    if (!pokemonName) {
      return;
    }
    const getPokemonInfoFromAPI = async (name) => {
      let info = await getPokemonInfo(name);
      return info;
    };

    const fetchPokemonInfo = async () => {
      const info = await getPokemonInfoFromAPI(pokemonName);
      setPokemon(info);
      localStorage.setItem('current pokemon', JSON.stringify(info));
    };

    let storedPokemon = localStorage.getItem('current pokemon');
    let parsedPokemon = JSON.parse(storedPokemon);

    if (parsedPokemon && parsedPokemon.name === pokemonName) {
      setPokemon(parsedPokemon);
      console.log('obtaining from storage');
      console.log(localStorage);
    } else {
      console.log('fetching new pokemon');
      fetchPokemonInfo();
      localStorage.clear();
    }
  }, [pokemonName]);

  return (
    <Layout>
      {pokemon ? <Form pokemon={pokemon}></Form> : <h1>Pouki</h1>}
    </Layout>
  );
}
