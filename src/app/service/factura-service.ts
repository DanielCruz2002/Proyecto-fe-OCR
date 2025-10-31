import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Factura {
  no: string;
  rtn: string | null;
  total: number;
  impuesto: number;
  moneda: string;
}

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  private baseUrl = 'http://localhost:8080/api/ocr/setFactura';
  private http = inject(HttpClient);

  /**
   * Envía una imagen al backend y devuelve un objeto Factura
   */
  dataFactura(file: File): Observable<Factura> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.baseUrl, formData, { responseType: 'text' }).pipe(
      map((texto: string) => parseFactura(texto))
    );
  }
}

export function parseFactura(str: string): Factura {
  const partes = str.split(',');
  const data: Record<string, any> = {};

  partes.forEach(parte => {
    const [clave, ...valorPartes] = parte.split(':');
    const valor = valorPartes.join(':').trim();

    const key = clave.trim().toLowerCase();

    if (valor.toUpperCase() === 'NULL') {
      data[key] = null;
    } else if (!isNaN(Number(valor))) {
      data[key] = Number(valor);
    } else {
      data[key] = valor;
    }
  });

  // Normaliza las claves según tu interfaz
  return {
    no: data['no.factura'] || '',
    rtn: data['rtn'] ?? null,
    total: data['total'] ?? 0,
    impuesto: data['impuesto'] ?? 0,
    moneda: data['moneda'] || ''
  };
}
