import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class ConjuntoPlatosService {
	public url: string;
	public identity;
	public token;
	public validacionRestaurante;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	crear(token, conjuntoPlatos):Observable<any> {
		let json = JSON.stringify(conjuntoPlatos);
		let params = 'json='+json+'&authorization='+token;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/conjunto_platos/nuevo', params, {headers: headers});
	}

	lista(idEncargo):Observable<any> {
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/conjunto_platos/lista/' + idEncargo, {headers: headers});
	}

	info(idConjuntoPlatos):Observable<any> {
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/conjunto_platos/info/' + idConjuntoPlatos, {headers: headers});
	}

	editar(token, conjuntoPlatos):Observable<any> {
		let json = JSON.stringify(conjuntoPlatos);
		let params = 'json='+json+'&authorization='+token;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/conjunto_platos/editar', params, {headers: headers});
	}

	eliminar(idConjuntoPlatos):Observable<any> {
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/conjunto_platos/eliminar/' + idConjuntoPlatos, {headers: headers});
	}
}