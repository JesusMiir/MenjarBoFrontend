import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css']
})
export class FacturacionComponent implements OnInit {

	public page_title;

	constructor() { 
		this.page_title = 'Facturació';
	}

	ngOnInit() {
	}

}
