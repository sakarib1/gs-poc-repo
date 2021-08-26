import styles from './app.module.scss';
import getList from './pokemon/pokemonList';


import PokemonListView from "./pokemon/PokemonListView";

export function App() {
  return (
    <div>
    <p>SQ Replacement</p>
    <PokemonListView list={getList("Bulb")} />
  </div>
  );
}

export default App;
