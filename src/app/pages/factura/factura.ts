import { Component, inject, OnInit, signal } from '@angular/core';
import { Factura, FacturaService } from '../../service/factura-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-factura',
  imports: [CommonModule],
  templateUrl: './factura.html',
})
export class FacturaComponent implements OnInit {

  srvFactura = inject(FacturaService);

  isLoading = signal<boolean>(false);
  factura = signal<Factura | null>(null);
  fileFactura: File | null = null;
  fileImage: any = null;
  ngOnInit(): void {

  }

  onFileSelected(event: any) {
    this.isLoading.set(true);
    const file = event.target.files[0];
    if (file) {
      this.fileFactura = event.target.files[0];
      this.fileImage = URL.createObjectURL(event.target.files[0])
      this.srvFactura.dataFactura(file).subscribe({
        next: (res) => {
          console.log(res);
          this.factura.set(res);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error(err);
          this.isLoading.set(false);
        },
        complete: () => {
          console.log('Carga completada');
        }
      });

    }
  }

}
