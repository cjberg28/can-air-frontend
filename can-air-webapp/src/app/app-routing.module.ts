import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MyflightspageComponent } from './myflightspage/myflightspage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReserveflightpageComponent } from './reserveflightpage/reserveflightpage.component';
import { SearchresultspageComponent } from './searchresultspage/searchresultspage.component';

const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'my-flights', component: MyflightspageComponent},
  { path: 'flights', component: SearchresultspageComponent},
  { path: 'reserve', component: ReserveflightpageComponent},
  { path: '', component: HomepageComponent},
  { path: 'account', component: AccountSettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
