import { Pokemon, PokemonListFunction } from "./type";

const pokemon: Pokemon[] = [
  {
    name: "Bulbasaur",
    type: "Fire",
  },
  {
    name: "Bulbafoo",
    type: "Earth",
  },
];

const getList: PokemonListFunction = (nameFilter: string) =>
  pokemon.filter(({ name }) => name.includes(nameFilter));

export default getList;