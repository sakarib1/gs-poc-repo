import './pokemon.module.scss';
import React from "react";
import { Pokemon } from './type';

/* eslint-disable-next-line */
export interface PokemonProps {}

export function PokemonListView({list }: {list: Pokemon[]}) {
  return (
    <table>
      {list.map(({ name, type }) => (
        <tr>
          <td>
            <strong>{name}</strong>
          </td>
          <td>{type}</td>
        </tr>
      ))}
  </table>
  );
}

export default PokemonListView;


