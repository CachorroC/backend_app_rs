import * as z from 'zod';


export const NotaElementSchema = z.object(
  {
    'id'       : z.coerce.number(),
    'date'     : z.coerce.date(),
    'createdAt': z.coerce.date(),
    'pathname' : z.union(
      [
        z.null(),
        z.coerce.string()
      ]
    ),
    'carpetaNumero': z.union(
      [
        z.coerce.number(),
        z.null()
      ]
    ),
    'content': z.union(
      [
        z.null(),
        z.coerce.string()
      ]
    ),
    'title'    : z.coerce.string(),
    'updatedAt': z.coerce.date(),
  }
);

export type NotaElement = z.infer<typeof NotaElementSchema>;
