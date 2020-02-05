import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';
import { global } from './global';

@Injectable()
export class EncargoService {
	public url: string;
	public identity;
	public token;
	public validacionRestaurante;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	crear(email, encargo):Observable<any> {
		let json = JSON.stringify(encargo);
		let params = 'json='+json;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/encargo/nuevo/' + email, params, {headers: headers});
	}

	editar(encargo):Observable<any> {
		let json = JSON.stringify(encargo);
		let params = 'json='+json;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/encargo/editar' , params, {headers: headers});
	}

	getEncargo(token, idEncargo):Observable<any> {
		let params = 'authorization='+token;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/encargo/informacion_restaurante/' + idEncargo, params, {headers: headers});
	}

	getEncargoUsuario(token, idEncargo):Observable<any> {
		let params = 'authorization='+token;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/encargo/informacion_usuario/' + idEncargo, params, {headers: headers});
	}

	getEncargoNuevo(token, usuario):Observable<any> {
		let json = JSON.stringify(usuario);
		let params = 'json='+json+'&authorization='+token;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/encargo/info-nuevo', params, {headers: headers});
	}

	getEncargosRealizados(token, usuario):Observable<any> {
		let json = JSON.stringify(usuario);
		let params = 'json='+json+'&authorization='+token;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/encargo/info-realizados', params, {headers: headers});
	}

	getEncargosRestaurante(token, restaurante):Observable<any> {
		let json = JSON.stringify(restaurante);
		let params = 'json='+json+'&authorization='+token;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/encargo/info-restaurante', params, {headers: headers});
	}

	listaEstado(restaurante, estado):Observable<any> {
		let json = JSON.stringify(restaurante);
		let params = 'json='+json;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/encargo/info-restaurante-estado/' + estado, params, {headers: headers});
	}

	

}