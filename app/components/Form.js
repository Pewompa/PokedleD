import { useState, useEffect } from 'react';
import MainContent from './MainContent';
import { loadGetInitialProps } from 'next/dist/shared/lib/utils';
import { getSavedAttempts, saveAttempt, pokemonNames } from './PokemonList';

function Form({ pokemon }) {
  const [formValue, setFormValue] = useState([]);
  const [attemptNumber, setAttemptNumber] = useState(1);
  const [attemptList, setAttemptList] = useState([]);
  const [inputError, setInputError] = useState(false);
  const [unknownPokemon, setUknownPokemon] = useState(false);
  const attemptInputs = new Array(6).fill('');
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    let attempts = getSavedAttempts();
    if (attempts) {
      setAttemptList([...attempts]);
      setAttemptNumber(attempts.length + 1);
      setFormValue([...attempts]);
    }
  }, []);
  useEffect(() => {
    if (attemptList.includes(pokemon.name) || attemptList.length === 6) {
      setIsDisabled(true);
    }
  }, [attemptList, pokemon.name]);

  const handleChange = (event) => {
    setFormValue([...formValue, event.target.value]);
  };

  const checkAnswer = (guess) => {
    const answer = pokemon.name;

    // Identifies the input in which the user is submitting the answer, using the attemptNumber state
    const attemptInput = document.querySelector(
      `input[name="attempt${attemptNumber}"]`
    );

    // Fills the input with green if the guess is correct and disables the submit button
    if (guess === answer) {
      attemptInput.classList.add('bg-green-200');
      document
        .querySelector(`button[name="submitButton"]`)
        .setAttribute('disabled', true);
    } else {
      // If incorrect, input turns to red
      attemptInput.classList.add('bg-red-200');
    }
  };

  const obtainPokemonPlace = (attemptNumber) => {
    const attemptInput = document.querySelector(
      `input[name="attempt${attemptNumber}"]`
    );
    return attemptInput;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const guess = formValue[formValue.length - 1];

    let nextPokemonBox = obtainPokemonPlace(attemptNumber);

    if (pokemonNames.includes(guess) && !attemptList.includes(guess)) {
      setInputError(false);
      setAttemptNumber(attemptNumber + 1);
      nextPokemonBox.value = guess;
      checkAnswer(guess); // Check the answer
      setAttemptList([...attemptList, guess]);
      setUknownPokemon(false);
      saveAttempt(guess);
    } else {
      if (pokemonNames.includes(guess) && attemptList.includes(guess)) {
        setInputError(true);
      } else {
        setUknownPokemon(true);
        setInputError(false);
      }
    }

    event.target.elements.guessInput.value = '';
  };

  return (
    <MainContent
      pokemon={pokemon}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      attemptValues={attemptList}
      attemptInputs={attemptInputs}
      duplicateWarning={inputError}
      isDisabled={isDisabled}
      unknownPokemon={unknownPokemon}
    />
  );
}

export default Form;
