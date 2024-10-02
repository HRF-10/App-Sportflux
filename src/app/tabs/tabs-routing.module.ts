import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
      path: 'home',
      loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
    },
    {
      path: 'diagnose',
      loadChildren: () => import('../diagnose/diagnose.module').then( m => m.DiagnosePageModule)
    },
    {
      path: 'login',
      loadChildren: () => import('../login/login.module').then( m => m.LoginPageModule)
    },
    {
      path: 'device',
      loadChildren: () => import('../device/device.module').then( m => m.DevicePageModule)
    },
    {
      path: 'record',
      loadChildren: () => import('../record/record.module').then( m => m.RecordPageModule)
    },
    {
      path: 'trainer',
      loadChildren: () => import('../trainer/trainer.module').then( m => m.TrainerPageModule)
    },
    {
      path: 'fisioterapis',
      loadChildren: () => import('../fisioterapis/fisioterapis.module').then( m => m.FisioterapisPageModule)
    },
    {
      path: 'message',
      loadChildren: () => import('../message/message.module').then( m => m.MessagePageModule)
    },
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
