import { cache } from 'react';
import { fetchNotas } from './fetcher';

export const getNotas = cache(
  async (
    carpetaId?: number
  ) => {
    return await fetchNotas(
      carpetaId
    );
  }
);
