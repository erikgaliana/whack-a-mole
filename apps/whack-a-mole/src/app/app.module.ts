// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

// NgRx
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Store
import { WhackFacade, WhackStoreModule } from '@whack-a-mole/services';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    WhackStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 30,
    }),
  ],
  providers: [WhackFacade],
  bootstrap: [AppComponent],
})
export class AppModule {}
