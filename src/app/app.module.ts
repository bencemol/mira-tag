import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SuggestionComponent } from './suggestion/suggestion.component';
import { SelectLabelComponent } from './select-label/select-label.component';
import { HttpClientModule } from '@angular/common/http';
import { TagComponent } from './tag/tag.component';


@NgModule({
  declarations: [
    AppComponent,
    SuggestionComponent,
    SelectLabelComponent,
    TagComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
