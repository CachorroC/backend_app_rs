
import { MedidasCautelares } from '../types/carpetas';
import { CarpetaRaw } from '../types/raw-carpeta';

export class ClassMedidasCautelares implements MedidasCautelares {
  demandaId: number;
  fechaOrdenaMedida: Date | null;
  id: number;
  medidaSolicitada: string | null;
  constructor (
    {
      demanda, numero
    }: CarpetaRaw
  ) {
    this.demandaId = numero;
    this.id = numero;



    const {
      medidasCautelares
    } = demanda;

    if ( medidasCautelares ) {
      const {
        fechaOrdenaMedidas, medidaSolicitada

      } = medidasCautelares;
      this.medidaSolicitada = medidaSolicitada
        ? medidaSolicitada
        : null;

      if ( fechaOrdenaMedidas ) {
        const newFecha = new Date(
          fechaOrdenaMedidas 
        );

        const stringer = newFecha.toString();

        if ( stringer === 'Invalid Date' ) {
          this.fechaOrdenaMedida = null;
        } else {
          this.fechaOrdenaMedida = newFecha;
        }
      } else {
        this.fechaOrdenaMedida = null;
      }

    } else {
      this.fechaOrdenaMedida = null;
      this.medidaSolicitada = null;
    }


  }

}