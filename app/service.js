const checkPokemon = async (id) => {
  try {
    console.log(
      'api url',
      `https://pokedleserver-0110db31efcd.herokuapp.com/pokemon/${id}`
    );
    const res = await fetch(
      `https://pokedleserver-0110db31efcd.herokuapp.com/pokemon/${id}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log('error fetching pokemon: ', error);
  }
};

const obtainIndexArray = async () => {
  try {
    const res = await fetch(
      `https://pokedleserver-0110db31efcd.herokuapp.com/indexes`
    );
    const data = await res.json();
    return data[0];
  } catch (error) {
    console.log('error fetching index: ', error);
  }
};

const postIndex = async (index) => {
  try {
    const response = await fetch(
      `https://pokedleserver-0110db31efcd.herokuapp.com/indexes/post`,
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
    console.log('index posted: ', data);
    return data.indexes;
  } catch (error) {
    return console.log('error posting pokemon: ', error);
  }
};

const postPokemon = async (id, name) => {
  try {
    console.log('inside post ', id, name);
    const response = await fetch(
      `https://pokedleserver-0110db31efcd.herokuapp.com/pokemon/post`,
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
    const res = await fetch(
      `https://pokedleserver-0110db31efcd.herokuapp.com/pokemons`
    );
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
