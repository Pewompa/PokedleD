'use client';
import React, { useState, useEffect, createContext } from 'react';
import Layout from '@/app/components/Layout';
import Form from '@/app/components/Form';
import { getPokemonInfo } from '@/app/components/PokemonList';
import { myHourlyFunction, timeUntilNextHour } from '@/app/components/Time';
import { postPokemon, obtainIndexArray, postIndex } from './service';
import io from 'socket.io-client';

export default function Home({}) {
  const [pokemon, setPokemon] = useState(null);
  const [index, setIndex] = useState(null);
  const [called, setCalled] = useState(false);
  const [indexFromSocket, setIndexFromSocket] = useState(null);
  const socket = io('http://localhost:3001');

  useEffect(() => {
    // Listen for the 'randomPokemonIndex' event
    socket.on('randomPokemonIndex', (index) => {
      console.log(index);
      setIndexFromSocket(index);
    });
  }, [socket]);

  const generateIndex = () => {
    let inde = Math.ceil(Math.random() * 100);
    setIndex(inde);
  };

  useEffect(() => {
    const storedPokemon = localStorage.getItem('chosenPokemon');
    // const storedTimestamp = localStorage.getItem('chosenPokemonTimestamp');
    if (storedPokemon) {
      const pokemonData = JSON.parse(storedPokemon);
      setPokemon(pokemonData);
      return;
    } else {
      console.log('different hour');
      localStorage.clear();
      const fetchData = async () => {
        await fetchPokemonData(indexFromSocket);
      };
      if (called == false && indexFromSocket !== null) {
        fetchData();
        return;
      }
    }
  }, [indexFromSocket]);

  // useEffect(() => {
  //   const storedPokemon = localStorage.getItem('chosenPokemon');
  //   const storedTimestamp = localStorage.getItem('chosenPokemonTimestamp');
  //   if (storedPokemon && storedTimestamp) {
  //     const pokemonData = JSON.parse(storedPokemon);
  //     const currentTimestamp = roundDownToNearestHour();
  //     // Check if the stored Pokémon is less than an hour old
  //     console.log();
  //     if (storedTimestamp.toString() === currentTimestamp.toString()) {
  //       console.log('same hour');
  //       setPokemon(pokemonData);
  //       return;
  //     }
  //   }
  //   console.log('different hour');
  //   localStorage.clear();
  //   generateIndex();
  // }, []);

  // useEffect(() => {
  //   if (index) {
  //     console.log(index);
  //   }
  //   const fetchData = async () => {
  //     if (index != null) {
  //       let pokemonArrays = await checkPokemonArray(index);
  //       if (pokemonArrays == 'full') {
  //         console.log('pokemon limit reached');
  //       } else {
  //         // await postIndex(pokemonArrays);
  //         await fetchPokemonData(pokemonArrays);
  //         // await savePokemon();
  //       }
  //     }
  //   };
  //   if (called == false && index !== null) {
  //     console.log('data fetched');
  //     fetchData();
  //   }
  // }, [index]);

  // const savePokemon = async () => {
  //   if (pokemon !== null && called == true && index !== null) {
  //     await postPokemon(pokemon.id, pokemon.name);
  //   }
  // };
  // savePokemon();

  let checkPokemonArray = async (indexParam) => {
    let pokemonArray = await obtainIndexArray();
    let newIndex;
    while (pokemonArray.indexes.includes(indexParam)) {
      if (pokemonArray.indexes.length + 1 >= 101) {
        return 'full';
      }
      do {
        newIndex = Math.ceil(Math.random() * 10);
        console.log(pokemonArray);
      } while (pokemonArray.indexes.includes(newIndex));
      indexParam = newIndex;
      setCalled(true);
      // pushIndexToLocalStorage(indexParam);
      return indexParam;
    }
    // pushIndexToLocalStorage(index);
    setCalled(true);
    return index;
  };

  const fetchPokemonData = async (id) => {
    try {
      if (id !== null) {
        const pokemonData = await getPokemonInfo(id);
        setPokemon(pokemonData);
        choosePokemon(pokemonData);
        setCalled(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // setInterval(() => {
  //   myHourlyFunction();
  // }, timeUntilNextHour());

  function roundDownToNearestHour() {
    const now = new Date();
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    return now;
  }

  const choosePokemon = (pokemonData) => {
    // Store the Pokémon's data in local storage
    localStorage.setItem('chosenPokemon', JSON.stringify(pokemonData));
    const currentHourTimestamp = roundDownToNearestHour();
    // localStorage.setItem('chosenPokemonTimestamp', currentHourTimestamp);
  };

  return (
    <Layout>
      {pokemon ? <Form pokemon={pokemon}></Form> : <h1>Pouki</h1>}
    </Layout>
  );
}
