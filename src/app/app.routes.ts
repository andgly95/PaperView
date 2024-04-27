import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { SearchResolver } from './resolvers/search.resolver';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'search',
    component: SearchResultsComponent,
    resolve: {
      searchResults: SearchResolver,
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
];
