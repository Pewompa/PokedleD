const checkPokemon = async (id) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/pokemon/${id}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('error fetching pokemon: ', error);
  }
};

const obtainIndexArray = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/indexes`);
    const data = await res.json();
    return data[0];
  } catch (error) {
    console.log('error fetching index: ', error);
  }
};

const postIndex = async (index) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/indexes/post`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          index: index,
        }),
      }
    );
    const data = await response.json();
    return data.indexes;
  } catch (error) {
    return console.log('error posting pokemon: ', error);
  }
};

const postPokemon = async (id, name) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/pokemon/post`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          id: id,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return console.log('error posting pokemon: ', error);
  }
};

const obtainPokemonName = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/pokemons`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('error fetching index: ', error);
  }
};

export {
  checkPokemon,
  postPokemon,
  obtainIndexArray,
  postIndex,
  obtainPokemonName,
};
