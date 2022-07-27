import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MyflightspageComponent } from './myflightspage/myflightspage.component';
import { SearchresultspageComponent } from './searchresultspage/searchresultspage.component';
import { ReserveflightpageComponent } from './reserveflightpage/reserveflightpage.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {CheckboxModule} from 'primeng/checkbox';
import {CalendarModule} from 'primeng/calendar';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import {SidebarModule} from 'primeng/sidebar';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';//Goes into component's .ts files
import {SplitButtonModule} from 'primeng/splitbutton';
import {DropdownModule} from 'primeng/dropdown';
import {RippleModule} from 'primeng/ripple';
import {CardModule} from 'primeng/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AutoCompleteModule } from "primeng/autocomplete";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    MyflightspageComponent,
    SearchresultspageComponent,
    ReserveflightpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    CheckboxModule,
    CalendarModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    DialogModule,
    SidebarModule,
    MenubarModule,
    SplitButtonModule,
    DropdownModule,
    RippleModule,
    CardModule,
    BrowserAnimationsModule,
    AutoCompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
