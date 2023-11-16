import { cache } from 'react';
import { fetchCarpetaByNumero, fetchCarpetaByllaveProceso, fetchCarpetasByllaveProceso, fetcherCarpetaByidProceso } from './fetcher';

export const getCarpetasByllaveProceso = cache(
  async(
    llaveProceso: string
  ) => {
    return await fetchCarpetasByllaveProceso(
      llaveProceso
    );
  }
);

export const getCarpetaByllaveProceso = cache(
  async (
    llaveProceso: string
  ) => {
    return await fetchCarpetaByllaveProceso(
      llaveProceso
    );
  }
);

export const getCarpetabyNumero = cache(
  async (
    numero: number
  ) => {
    return await fetchCarpetaByNumero(
      numero
    );
  }
);

export const getCarpetaByidProceso = cache(
  async (
    idProceso: number
  ) => {
    return fetcherCarpetaByidProceso(
      idProceso
    );
  }
);
