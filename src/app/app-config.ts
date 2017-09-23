import { InjectionToken } from '@angular/core';

export interface AppConfig {
  ApiEndpoint: string;
}

export const CONFIG: AppConfig = {
  ApiEndpoint: 'https://mashape-community-urban-dictionary.p.mashape.com/define?term='
};

export const APP_CONFIG = new InjectionToken<AppConfig>('App.Config');
