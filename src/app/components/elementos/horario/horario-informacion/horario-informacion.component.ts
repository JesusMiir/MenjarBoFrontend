import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { RestauranteService } from '../../../../services/restaurante.service';
import { HorarioService } from '../../../../services/horario.service';
import { Horario } from '../../../../models/horario';
import { global } from '../../../../services/global';

@Component({
  selector: 'app-horario-informacion',
  templateUrl: './horario-informacion.component.html',
  styleUrls: ['./horario-informacion.component.css'],
  providers: [RestauranteService, HorarioService]
})
export class HorarioInformacionComponent implements OnInit {

	public page_title;
	public horario;
	public status;
	public token;
	public id;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _restauranteService: RestauranteService,
		private _horarioService: HorarioService
	) { 
		this.page_title = "Horari Del Restaurant";
		this.token = this._restauranteService.getToken();
		this.id = this._route.snapshot.paramMap.get('id');
		this.horario = new Horario(null, null, '', '', '', '', '', '', '', '', '', '', '', '', '', '');
	}

	ngOnInit() {
		this.getHorarioInfo();
	}

	getHorarioInfo() {
		this._horarioService.getHorarioInfo().subscribe(
			response => {
				if(response.status == 'success') {
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
					console.log(this.horario);
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
