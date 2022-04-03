// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

// Router
import { AppRoutingModule } from './app-routing.module';

// NgRx
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Store
import { WhackStoreModule } from '@whack-a-mole/services';
import { GameViewModule } from './game/game.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    GameViewModule,
    BrowserModule,
    WhackStoreModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 30,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
