import React, { useState } from 'react';
import Image from 'next/image';
import PokemonInput from './PokemonInput'; // Import the PokemonInput component
import { pokemonNames } from './PokemonList';

function MainContent({
  pokemon,
  handleSubmit,
  handleChange,
  attemptValues,
  attemptInputs,
  duplicateWarning,
  isDisabled,
  unknownPokemon,
}) {
  return (
    <main className="grid gap-4">
      <div>
        <Image
          alt={pokemon.name}
          width={200}
          height={200}
          priority={true}
          src={pokemon.frontImage}
        />
        <h2 className="text-3xl mb-4 hidden">{pokemon.name}</h2>
      </div>
      <form onSubmit={handleSubmit}>
        {attemptInputs.map((attempt, index) => {
          const isCorrect = attemptValues[index] === pokemon.name;
          let inputClassName;
          let isDisabled = false;
          if (!attemptValues[index]) {
            inputClassName = 'bg-white-200';
          } else if (isCorrect) {
            inputClassName = 'bg-green-200';
            isDisabled = true;
          } else {
            inputClassName = 'bg-red-200';
          }
          if (index == 6) {
            isDisabled = true;
          }

          return (
            <div key={index}>
              <PokemonInput
                name={`attempt${index + 1}`}
                value={attemptValues[index]}
                className={inputClassName}
                isDisabled={isDisabled}
              />
            </div>
          );
        })}
        <div>
          <input
            type="text"
            name="guessInput"
            list="pokemonNames"
            id="textBox"
            onChange={handleChange}
            className="text-gray-900 text-sm rounded-lg my-1 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={
              duplicateWarning
                ? 'Snap! Duplicate guess.'
                : unknownPokemon
                ? 'unknown Pokémon'
                : 'Guess the Pokémon'
            }
            required
          />
          <datalist id="pokemonNames">
            {pokemonNames.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>
          {/* {duplicateWarning && (
            <div>
              <div className="relative"></div>
              {duplicateWarning && (
                <div className="absolute inset-x-0 mt-2 text-center text-red-600 dark:text-red-400">
                  <span className="font-medium">Oh, snap!</span> Some error
                  message.
                </div>
              )}
            </div>
            // <div className="alert">You already guessed this Pokémon</div>
          )} */}
        </div>
        <button
          type="submit"
          name="submitButton"
          className="border rounded w-full my-1 border-white-300"
          onSubmit={handleChange}
          disabled={isDisabled}
        >
          Submit
        </button>
      </form>
    </main>
  );
}

export default MainContent;
