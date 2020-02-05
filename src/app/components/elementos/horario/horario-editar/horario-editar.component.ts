import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../../../../services/restaurante.service';
import { HorarioService } from '../../../../services/horario.service';
import { Horario } from '../../../../models/horario';
import { global } from '../../../../services/global';

@Component({
  selector: 'app-horario-editar',
  templateUrl: './horario-editar.component.html',
  styleUrls: ['./horario-editar.component.css'],
  providers: [RestauranteService, HorarioService]
})
export class HorarioEditarComponent implements OnInit {

	public page_title;
	public horario;
	public status;
	public token;
	public identity;
	public id;
	public restauranteValidacion;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _restauranteService: RestauranteService,
		private _horarioService: HorarioService
	) { 
		this.page_title = "Editar Horari";
		this.token = this._restauranteService.getToken();
		this.identity = this._restauranteService.getIdentity();
		this.horario = new Horario(null, null, '', '', '', '', '', '', '', '', '', '', '', '', '', '');
		this.restauranteValidacion = this._restauranteService.getValidacionRestaurante();
	}
	
	ngOnInit() {
		if(this.identity == null || this.restauranteValidacion == null){
	      this._router.navigate(['/restaurant/login']);
	    }
	    else {
	    	this.getHorario();
	    }
	}

	getHorario() {
		this._horarioService.getHorario(this.token, this.identity.id).subscribe(
			response => {
				if(response.status == 'success') {
					console.log(response);
					this.horario.id = response.horario.id;
					this.horario.idRestaurante = response.horario.restaurante.id;
					this.horario.lunesM = response.horario.lunesM;
					this.horario.lunesT = response.horario.lunesT;
					this.horario.martesM = response.horario.martesM;
					this.horario.martesT = response.horario.martesT;
					this.horario.miercolesM = response.horario.miercolesM;
					this.horario.miercolesT = response.horario.miercolesT;
					this.horario.juevesM = response.horario.juevesM;
					this.horario.juevesT = response.horario.juevesT;
					this.horario.viernesM = response.horario.viernesM;
					this.horario.viernesT = response.horario.viernesT;
					this.horario.sabadoM = response.horario.sabadoM;
					this.horario.sabadoT = response.horario.sabadoT;
					this.horario.domingoM = response.horario.domingoM;
					this.horario.domingoT = response.horario.domingoT;
				}
				else {
					this.status = 'error';
				}
			},
			error => {
				this.status = 'error';
				console.log(<any>error);
			}
		);
	}
	
	onSubmit(form) {
		this._horarioService.editar(this.token, this.horario, this.identity.id).subscribe(
			response => {
				if(response.status == 'success') {
					this.status = 'success';
				}
				else {
					this.status = 'error';
				}
			},
			error => {
				this.status = 'error';
				console.log(<any>error);
			}
		);
	}
	
}
