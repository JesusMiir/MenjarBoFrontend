import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { global } from './global';

@Injectable()
export class UsuarioService {

	public url: string;
	public identity;
	public token;
	public validacionRestaurante;

	constructor(
		public _http: HttpClient
	){
		this.url = global.url;
	}

	register(usuario): Observable<any>{
		let json = JSON.stringify(usuario);
		let params = 'json='+json;

		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post(this.url+'/usuario/nuevo', params, {headers: headers}); 
	}

	signup(usuario, getHash = null): Observable<any> {
		if (getHash != null) {
			usuario.getHash = 'true';
		}
		let json = JSON.stringify(usuario);
		let params = 'json='+json;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

		return this._http.post(this.url+'/login_usuario', params, {headers: headers});
	}

	update(usuario): Observable<any> {
		let json = JSON.stringify(usuario);
		let params = 'json='+json+'&authorization='+this.getToken();
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url+'/usuario/editar', params, {headers: headers});
	}

	getIdentity(): Observable<any>{
		let identity = JSON.parse(localStorage.getItem('identity'));

		if(identity && identity != "udndefined") {
			this.identity = identity;
		}
		else {
			this.identity = null;
		}

		return this.identity;
	}

	getToken(): Observable<any>{
		let token = localStorage.getItem('token');
		if(token && token != "undefined") {
			this.token = token;
		}
		else {
			this.token = null;
		}

		return this.token;
	}

	getValidacionRestaurante(): Observable<any> {
		let validacionRestaurante = localStorage.getItem('restaurante');
		if(validacionRestaurante && validacionRestaurante != "undefined") {
			this.validacionRestaurante = validacionRestaurante;
		}
		else {
			this.validacionRestaurante = null;
		}

		return this.validacionRestaurante;
	}

	getUsuario(idUsuario): Observable<any> {
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url+'/usuario/informacion/'+idUsuario, {headers: headers});
	}

}