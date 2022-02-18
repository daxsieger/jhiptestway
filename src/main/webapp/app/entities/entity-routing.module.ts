import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'evento',
        data: { pageTitle: 'jhiptestwayApp.evento.home.title' },
        loadChildren: () => import('./evento/evento.module').then(m => m.EventoModule),
      },
      {
        path: 'assistito',
        data: { pageTitle: 'jhiptestwayApp.assistito.home.title' },
        loadChildren: () => import('./assistito/assistito.module').then(m => m.AssistitoModule),
      },
      {
        path: 'gestore',
        data: { pageTitle: 'jhiptestwayApp.gestore.home.title' },
        loadChildren: () => import('./gestore/gestore.module').then(m => m.GestoreModule),
      },
      {
        path: 'tipo-evento',
        data: { pageTitle: 'jhiptestwayApp.tipoEvento.home.title' },
        loadChildren: () => import('./tipo-evento/tipo-evento.module').then(m => m.TipoEventoModule),
      },
      {
        path: 'produttore',
        data: { pageTitle: 'jhiptestwayApp.produttore.home.title' },
        loadChildren: () => import('./produttore/produttore.module').then(m => m.ProduttoreModule),
      },
      {
        path: 'stato',
        data: { pageTitle: 'jhiptestwayApp.stato.home.title' },
        loadChildren: () => import('./stato/stato.module').then(m => m.StatoModule),
      },
      {
        path: 'stadio',
        data: { pageTitle: 'jhiptestwayApp.stadio.home.title' },
        loadChildren: () => import('./stadio/stadio.module').then(m => m.StadioModule),
      },
      {
        path: 'processo',
        data: { pageTitle: 'jhiptestwayApp.processo.home.title' },
        loadChildren: () => import('./processo/processo.module').then(m => m.ProcessoModule),
      },
      {
        path: 'transizioni',
        data: { pageTitle: 'jhiptestwayApp.transizioni.home.title' },
        loadChildren: () => import('./transizioni/transizioni.module').then(m => m.TransizioniModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
