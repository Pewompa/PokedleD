'use client';
import React, { useState, useEffect, createContext } from 'react';
import Layout from '@/app/components/Layout';
import Form from '@/app/components/Form';
import { getPokemonInfo } from '@/app/components/PokemonList';
import { obtainPokemonName } from './service';
import { loadGetInitialProps } from 'next/dist/shared/lib/utils';
export default function Home({}) {
  const [pokemonName, setPokemonName] = useState(null);
  const [pokemon, setPokemon] = useState(null);

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
