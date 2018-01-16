import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {
  id: number;
  pokemon: Pokemon;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService,
    public meta: Meta,
    public title: Title) {
      title.setTitle('Pokemon Detail');
      meta.addTags([
        {
          name: 'author', content: 'Kseniya'
        },
        {
          name: 'keywords', content: 'Detailed Pokemon'
        },
        {
          name: 'description', content: 'Detailed info about pokemon'
        }
      ]);
     }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.id = parseInt(params.get('id'), 10);
      this.pokemonService.getDetails(this.id)
      .subscribe(details => this.pokemon = details);
    });
  }
}
