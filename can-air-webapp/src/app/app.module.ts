import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { FlightApiService } from './flight-api.service';

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
import {Menubar, MenubarModule} from 'primeng/menubar';
import {SplitButtonModule} from 'primeng/splitbutton';
import {DropdownModule} from 'primeng/dropdown';
import {RippleModule} from 'primeng/ripple';
import {CardModule} from 'primeng/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AutoCompleteModule } from "primeng/autocomplete";
import {ToolbarModule} from 'primeng/toolbar';
import { MenuItem } from 'primeng/api';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {InputNumberModule} from 'primeng/inputnumber';
import { DatePipe } from '@angular/common';
import { Validators } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    MyflightspageComponent,
    SearchresultspageComponent,
    ReserveflightpageComponent,
    
    
    
  ],
  imports: [
    
    DatePipe,
    HttpClientModule,
    OverlayPanelModule,
    InputNumberModule,
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
    AutoCompleteModule,
    ToolbarModule,
    ProgressSpinnerModule,
    RouterModule.forRoot([
      { path: 'home', component: HomepageComponent },
      { path: 'my-flights', component: MyflightspageComponent},
      { path: 'flights', component: SearchresultspageComponent},
      { path: 'reserve', component: ReserveflightpageComponent},
      { path: '', component: HomepageComponent}
    ])
  ],
  providers: [FlightApiService, HomepageComponent, SearchresultspageComponent, DatePipe, NavbarComponent  
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
