import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TabsMenuPage } from './tabs-menu.page';

const routes: Routes = [
  {
    path: '',
    component: TabsMenuPage,
    children: [
      {
        path: 'discover',
        loadChildren: () =>
          import('src/app/modules/discover/discover.module').then(
            (m) => m.DiscoverPageModule
          ),
      },
      {
        path: 'menu',
        loadChildren: () =>
          import('src/app/modules/menu/menu.module').then(
            (m) => m.MenuPageModule
          ),
      },
      {
        path: 'messages',
        loadChildren: () =>
          import('src/app/modules/messages/messages.module').then(
            (m) => m.MessagesPageModule
          ),
      },
      {
        path: '',
        redirectTo: 'menu',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [TabsMenuPage],
})
export class TabsMenuPageModule {}
