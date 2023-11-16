import * as z from 'zod';

export const ZodNotaElementSchema = z.object(
  {
    id      : z.coerce.number(),
    text    : z.coerce.string(),
    date    : z.coerce.date(),
    pathname: z.union(
      [
        z.null(),
        z.coerce.string()
      ]
    ),
    carpetaNumero: z.union(
      [
        z.coerce.number(),
        z.null()
      ]
    ),
  }
);

export type ZodNotaElement = z.infer<typeof ZodNotaElementSchema>;
