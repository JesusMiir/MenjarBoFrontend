import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Restaurante } from '../../../models/restaurante';
import { RestauranteService } from '../../../services/restaurante.service';

@Component({
  selector: 'app-login-restaurante',
  templateUrl: './login-restaurante.component.html',
  styleUrls: ['./login-restaurante.component.css'],
  providers: [RestauranteService]
})
export class LoginRestauranteComponent implements OnInit {

	public page_title: string;
	public restaurante: Restaurante;
	public status: string;
	public token;
	public identity;
	public restauranteValidacion;

	constructor(
	  private _restauranteService: RestauranteService,
	  private _router: Router,
	  private _route : ActivatedRoute
	) { 
		this.page_title = 'Iniciar Sessió Restaurants';
		this.restaurante = new Restaurante(null, '', '', null, '', '', null, true);
		this.identity = this._restauranteService.getIdentity();
	    this.token = this._restauranteService.getToken();
	    this.restauranteValidacion = this._restauranteService.getValidacionRestaurante();
	}

	ngOnInit() {
		//Se ejecuta siempre y cierra sesión solo cuando le llega el paramentro sure por la url
		if(this.identity != null){
      		this._router.navigate(['/inici']);
    	}
    	this.logout();
	}
	
	onSubmit(form) {
		this._restauranteService.signup(this.restaurante).subscribe(
	    response => {
	      //TOKEN
	      if(response.status != 'error') {
	        this.status = 'success';
	        this.token = response;

	        //OJETO RESTAURANTE IDENTIFICADO
	        this._restauranteService.signup(this.restaurante, true).subscribe(
	          response => {
	            this.identity = response;
	            // PERSISTIR DATOS RESTAURANTE IDENTIFICADO
	            localStorage.setItem('token', this.token);
	            localStorage.setItem('identity', JSON.stringify(this.identity));
	            localStorage.setItem('restaurante', 'true');

	            this._router.navigate(['/restaurant/comandes']);
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

	logout() {
		this._route.params.subscribe(params => {
		  let logout = +params['sure'];

		  if(logout == 1) {
		    localStorage.removeItem('identity');
		    localStorage.removeItem('token');
		    localStorage.removeItem('restaurante');

		    this.identity = null;
		    this.token = null;

		    //redirección a inicio
		    this._router.navigate(['inici']);
		  }
		});
	}
	
}
