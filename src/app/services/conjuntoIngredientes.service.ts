import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class ConjuntoIngredientesService {
	public url: string;
	public identity;
	public token;
	public validacionRestaurante;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	crear(token, conjuntoIngredientes):Observable<any> {
		let json = JSON.stringify(conjuntoIngredientes);
		let params = 'json='+json+'&authorization='+token;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/conjunto_ingredientes/nuevo', params, {headers: headers});
	}

	lista(idConjuntoPlatos):Observable<any> {
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/conjunto_ingredientes/lista/' + idConjuntoPlatos, {headers: headers});
	}

	listaTodo():Observable<any> {
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/conjunto_ingredientes/lista_todo', {headers: headers});
	}

	info(idConjuntoIngredientes):Observable<any> {
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/conjunto_ingredientes/info/' + idConjuntoIngredientes, {headers: headers});
	}

	editar(token, conjuntoIngredientes):Observable<any> {
		let json = JSON.stringify(conjuntoIngredientes);
		let params = 'json='+json+'&authorization='+token;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/conjunto_ingredientes/editar', params, {headers: headers});
	}

	eliminar(idIngrediente):Observable<any> {
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/conjunto_ingredientes/eliminar/'+idIngrediente, {headers: headers});
	}
}