import { Nota } from '@prisma/client';

export class NewNota implements Nota {
  id!: number;
  date: Date;
  createdAt!: Date;
  pathname: string | null;
  carpetaNumero: number | null;
  content: string | null;
  title: string;
  updatedAt!: Date;
  constructor (
    {
      date, pathname, carpetaNumero, content, title
    }: { date?: string;  pathname?: string; carpetaNumero?: number; content?: string; title: string }
  ) {
    this.date =date
      ?  new Date(
        date
      )
      : new Date();
    this.pathname = pathname
      ? pathname
      : null;
    this.carpetaNumero = carpetaNumero
      ? carpetaNumero
      : null;
    this.content = content
      ? content
      : null;
    this.title = title;
  }
}