import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable()
export class ConjuntoElementosService {
	public url: string;
	public identity;
	public token;
	public validacionRestaurante;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	crear(conjuntoElementos):Observable<any> {
		let json = JSON.stringify(conjuntoElementos);
		let params = 'json='+json;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/conjunto_elementos/nuevo', params, {headers: headers});
	}

	lista(idCombo):Observable<any> {
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/conjunto_elementos/lista/' + idCombo, {headers: headers});
	}

	info(idConjuntoElementos):Observable<any> {
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/conjunto_elementos/info/' + idConjuntoElementos, {headers: headers});
	}

	editar(token, conjuntoElementos):Observable<any> {
		let json = JSON.stringify(conjuntoElementos);
		let params = 'json='+json+'&authorization='+token;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/conjunto_elementos/editar', params, {headers: headers});
	}

	eliminar(idConjuntoElementos):Observable<any> {
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/conjunto_elementos/eliminar/'+idConjuntoElementos, {headers: headers});
	}
}