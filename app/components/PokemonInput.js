import React from 'react';

function PokemonInput({ name, onChange, value, className }) {
  return (
    <input
      type="text"
      name={name}
      defaultValue={value || ''}
      // onChange={onChange}
      className={`${className} rounded w-full text-gray-900 py-1 px-1 my-1 pointer-events-none`}
    />
  );
}

export default PokemonInput;
