import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),  
    providePrimeNG({           
      theme: {                 
        preset: Aura,   
        options: {
          cssLayer: {
            name: 'primeng',
            order: 'tailwind, primeng'
          }
        }      
      },                       
    })]
};
