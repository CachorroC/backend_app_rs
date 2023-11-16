import { cache } from 'react';
import { tareasCollection } from '../connection/collections';

export const getTareas = cache(
  async () => {
    const collection = await tareasCollection();

    const tareas = await collection.find()
      .toArray();



    return tareas.map(
      (
        tarea
      ) => {
        return {
          ...tarea,
          _id: tarea._id.toString()
        };
      }
    );
  }
);
