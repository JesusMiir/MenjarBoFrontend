import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Restaurante } from '../../../models/restaurante';
import { Horario } from '../../../models/horario';
import { RestauranteService } from '../../../services/restaurante.service';
import { HorarioService } from '../../../services/horario.service';

@Component({
  selector: 'app-register-restaurante',
  templateUrl: './register-restaurante.component.html',
  styleUrls: ['./register-restaurante.component.css'],
  providers: [RestauranteService, HorarioService]
})
export class RegisterRestauranteComponent implements OnInit {

  public page_title: string;
  public restaurante: Restaurante;
  public horario: Horario;
  public status: string;
  public codigo: string;
  public token;
  public identity;
  public restauranteValidacion;

  constructor(
      private _router: Router,
      private _route : ActivatedRoute,
      private _restauranteService: RestauranteService,
      private _horarioService: HorarioService
    ) { 
  	this.codigo = '';
  	this.page_title = 'Registro Restaurantes';
    this.restaurante = new Restaurante(null, '', '', null, '', '', null, true);
    this.horario = new Horario(null, null, '', '', '', '', '', '', '', '', '', '', '', '', '', '');
    this.identity = this._restauranteService.getIdentity();
    this.token = this._restauranteService.getToken();
    this.restauranteValidacion = this._restauranteService.getValidacionRestaurante();
  }

  ngOnInit() {
  	if(this.identity != null){
      this._router.navigate(['/inici']);
    }
  }

  onSubmit(form){
    
  	if (this.codigo == 'a') {
	    this._restauranteService.register(this.restaurante).subscribe(
	       response => {
	          if (response.status == "success") {
	            this.status = 'success';
              this.crearHorario(this.restaurante.nombre);
	            this._router.navigate(['/restaurant/login']);
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
	  else {
		  this.status = 'error';
	  }
    
  }

  crearHorario(nombreRestaurante) {
    
    this._restauranteService.informacionRestaurante(nombreRestaurante).subscribe(
      response => {
        if (response.status == "success") {
            this.horario.idRestaurante = response.restaurante.id;

            this._horarioService.create(this.horario).subscribe(
              response => {
                if (response.status == "success") {
                  console.log('OK');
                }
                else {
                  this.status = 'error';
                  console.log('Error');
                }
              },
              error => {
                this.status = 'error';
                console.log(<any>error);
              }
            );
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
