import { InjectionToken } from '@angular/core';

export interface AppConfig {
  ApiEndpoint: string;
  ApiKey: string;
}

export const CONFIG: AppConfig = {
  ApiEndpoint: 'https://mashape-community-urban-dictionary.p.mashape.com/define?term=',
  ApiKey: 'QwXbIDZpMjmshn9njwGtM2LJrhPJp1vzY84jsnbSVrXtBkW3MR'
};

export const APP_CONFIG = new InjectionToken<AppConfig>('App.Config');
