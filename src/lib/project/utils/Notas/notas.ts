import { cache } from 'react';
import { fetchNotaById, fetchNotasByPathname } from './fetcher';


export const getNotaById = cache(
  async (
    id: number
  ) => {
    return await fetchNotaById(
      id
    );
  }
);

export const getNotasByPathname = cache(
  async (
    path : string
  ) => {
    return await fetchNotasByPathname(
      path
    );
  }
);
