import './shell-container.module.scss';
import * as React from "react";
//const Calendar = React.lazy(() => import('Calendar/Calendar'));
import getList from "tsremote-mf/pokemonList";
import PokemonListView from "tsremote-mf/PokemonListView";



import { PokemonListComponent, PokemonListFunction } from './type';

console.log(PokemonListView);

console.log(getList);

const PokemonComp = PokemonListView as PokemonListComponent;

const getPokemonList = getList as PokemonListFunction;

//const RemoteCalendar = React.lazy(() => import("calendarApp/CalendarModule"));

/*
const RemoteCalendar = React.lazy(() =>
  import('calendarApp/CalendarModule')
    .then(({ CalendarModule }) => ({ default: CalendarModule })),
); */

/* eslint-disable-next-line */
export interface ShellContainerProps {}

export function ShellContainer(props: ShellContainerProps) {
  return (
    <div>
       <h1>Welcome to ShellContainer!</h1>
          <PokemonListView list={getList("Bulb")} />
    </div>
  );
}

export default ShellContainer;
