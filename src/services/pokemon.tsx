export const getPokemonByName = async (name: any) => {
  const { results: allPokemons } = await fetch(
    "https://pokeapi.co/api/v2/pokemon/?limit=100"
  ).then((resp) => resp.json());

  return allPokemons.filter((p: any) => p.name.includes(name));
};
