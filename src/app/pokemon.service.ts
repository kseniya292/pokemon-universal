import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { TransferState, makeStateKey } from '@angular/platform-browser';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import { Pokemon } from './pokemon';

const POKEMONS_KEY = makeStateKey('pokemons');
const POKEMON_DETAILS_KEY = makeStateKey('pokemon_details');

@Injectable()
export class PokemonService {

  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient,
    private state: TransferState) { }

  listPokemons() {
    let pokemons = this.state.get(POKEMONS_KEY, null as any);
    if (pokemons) {
      return Observable.of(pokemons);
    }

    return this.http.get(`${this.baseUrl}/pokedex/1/`)
    .map((res: any) => {
      console.log('api call');
      let pokemons: Pokemon[] = [];
      const reducedPokemonEntries = res.pokemon_entries.splice(0, 50);

      reducedPokemonEntries.forEach((entry) => {
        const pokemon = new Pokemon();
        pokemon.name = entry.pokemon_species.name;
        pokemon.id = entry.entry_number;
        pokemon.imageurl = `https://rawgit.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

        pokemons.push(pokemon);
      });
      this.state.set(POKEMONS_KEY, pokemons as any);
      return pokemons;
    });
  } // listPokemons

  getDetails(id: number) {
    let pokemonDetails: Pokemon = this.state.get(POKEMON_DETAILS_KEY, null as any);
    if (pokemonDetails && pokemonDetails.id === id) {
      return Observable.of(pokemonDetails);
    }
    return this.http.get(`${this.baseUrl}/pokemon/${id}/`)
    .map((res: any) => {
      const pokemon = new Pokemon();
      pokemon.name = res.name;
      pokemon.id = res.id;
      pokemon.imageurl = `https://rawgit.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

      res.types.forEach((type) => {
        pokemon.types.push(type.type.name);
      });

      res.stats.forEach((stat) => {
        pokemon.stats.push({
          name: stat.stat.name,
          value: stat.base_stat
        });
      });

        for (const sprite in res.sprites) {
          if (res.sprites[sprite]) {
            pokemon.sprites.push({
              name: sprite,
              imagePath: res.sprites[sprite]
            });
          }
        }
      this.state.set(POKEMON_DETAILS_KEY, pokemon as any);
      return pokemon;
    });
  } // getDetails
}
