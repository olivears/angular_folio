import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InlineSVGModule } from 'ng-inline-svg';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { FolioListComponent } from './folio/folio-list.component';
import { FolioDetailComponent } from './folio/folio-detail.component';
import { TemplateComponent } from './shared/template.component';

import { MotionService } from './shared/motion.service';
import { CachedHttpService } from './shared/cached-http.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    TemplateComponent,
    FolioListComponent,
    FolioDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    InlineSVGModule
  ],
  providers: [
    MotionService,
    CachedHttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }