import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../../../../services/restaurante.service';
import { UsuarioService } from '../../../../services/usuario.service';
import { PlatoService } from '../../../../services/plato.service';
import { ConjuntoPlatosService } from '../../../../services/conjuntoPlatos.service';
import { Plato } from '../../../../models/plato';
import { ConjuntoPlatos } from '../../../../models/conjuntoPlatos';
import { global } from '../../../../services/global';

@Component({
  selector: 'app-anadir-plato',
  templateUrl: './anadir-plato.component.html',
  styleUrls: ['./anadir-plato.component.css'],
  providers: [RestauranteService, UsuarioService, PlatoService, ConjuntoPlatosService]
})
export class AnadirPlatoComponent implements OnInit {

	public page_title: string;
	public nombreCategoria;
	public nombreCombo;
  	public platos;
  	public status;
  	public conjuntoPlatos: ConjuntoPlatos;
  	public idEncargo;
  	public idCategoria;
  	public idConjuntoElementos;
  	public token;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _restauranteService: RestauranteService,
		private _usuarioService: UsuarioService,
		private _platoService: PlatoService,
		private _conjuntoPlatosService: ConjuntoPlatosService
	) {
		this.page_title = "Tria El Teu Plat";
		this.nombreCategoria = this._route.snapshot.paramMap.get('categoria');
		this.nombreCombo = this._route.snapshot.paramMap.get('combo');
		this.idCategoria = this._route.snapshot.paramMap.get('idCategoria');
		this.idEncargo = this._route.snapshot.paramMap.get('id');
		this.idConjuntoElementos = this._route.snapshot.paramMap.get('idConjuntoElementos');
		this.conjuntoPlatos = new ConjuntoPlatos(0, this.idEncargo, null, null, null, 1, 0);
		this.token = this._usuarioService.getToken();
	}

	ngOnInit() {
		this.getPlatos();
	}

	getPlatos() {
	    this._platoService.getPlatosInfo(this.nombreCategoria).subscribe(
	      response => {
	        if(response.status == 'success') {
	        	this.platos = response.data;
	        	console.log(this.platos);  
	        }
	      },
	      error => {
	        console.log(error);
	      }
	    );
	  }

	escogerPlato(nombrePlato) {
		for (let i = 0; i < this.platos.length; ++i) {
			if (nombrePlato == this.platos[i].nombre){
				this.conjuntoPlatos.idEncargo = this.idEncargo;
				this.conjuntoPlatos.idPlato = this.platos[i].id;
				this._conjuntoPlatosService.crear(this.token, this.conjuntoPlatos).subscribe(
					response => {
						if (response.status == 'success') {
							this.status = 'success';
							this.conjuntoPlatos.id = response.conjuntoPlatos.id;
							if (this.idConjuntoElementos == null) {
								this._router.navigate(['/comanda/', this.idEncargo, 'opcions-plat', this.conjuntoPlatos.id,
								this.nombreCategoria, this.idCategoria, this.platos[i].nombre, this.platos[i].id]);
							} 
							else {
								if (this.nombreCombo == 'A') 
									this._router.navigate(['/comanda/', this.idEncargo, 'nou-plat', 'Menú', 'ComboA']);
								else if (this.nombreCombo == 'B')
									this._router.navigate(['/comanda/', this.idEncargo, 'nou-plat', 'Menú', 'ComboB']);
								else 
									this._router.navigate(['/comanda/', this.idEncargo, 'nou-plat', 'Menú', 'ComboC']);;
							}
						}
						else{
							this.status = 'error';
						}
					},
					error => {
						console.log(error);
					}
				);
			}
		}
	}

}
