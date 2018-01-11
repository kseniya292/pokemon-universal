import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpResponse } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

import { Pokemon } from './pokemon';

@Injectable()
export class PokemonService {

  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  listPokemons() {
    return this.http.get(`${this.baseUrl}/pokedex/1/`)
    .map((res: any) => {
      const pokemons: Pokemon[] = [];
      const reducedPokemonEntries = res.pokemon_entries.splice(0, 50);

      reducedPokemonEntries.forEach((entry) => {
        const pokemon = new Pokemon();
        pokemon.name = entry.pokemon_species.name;
        pokemon.id = entry.entry_number;

        pokemons.push(pokemon);
      });
      return pokemons;
    });
  } // listPokemons

  getDetails(id: number) {
    return this.http.get(`${this.baseUrl}/pokemon/${id}/`)
    .map((res: any) => {
      const pokemon = new Pokemon();
      pokemon.name = res.name;
      pokemon.id = res.id;

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
      return pokemon;
    });
  } // getDetails
}
