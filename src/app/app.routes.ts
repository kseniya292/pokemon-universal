import { Routes, RouterModule } from '@angular/router';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';

const routes: Routes = [
  {
    path: '',
    component: PokemonListComponent
  },
  {
    path: 'details/:id',
    component: PokemonDetailsComponent
  }
];

const routesModule = RouterModule.forRoot(routes);
export { routesModule };
