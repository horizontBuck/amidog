// src/app/core/pocketbase.client.ts
import PocketBase from 'pocketbase';

export const PB_URL = 'https://db.buckapi.site:8020'; 
export const pb = new PocketBase(PB_URL);
