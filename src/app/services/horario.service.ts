import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Horario } from '../models/horario';
import { global } from './global';

@Injectable()
export class HorarioService {

	public url: string;
	public identity;
	public token;
	public validacionRestaurante;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	create(horario):Observable<any> {
		console.log(horario);
		let json = JSON.stringify(horario);
		let params = 'json='+json;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/horario/nuevo', params, {headers: headers});
	}

	editar(token, horario, id):Observable<any> {
		let json = JSON.stringify(horario);
		let params = 'json='+json+'&authorization='+token;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/horario/editar/' + id, params, {headers: headers});
	}

	getHorario(token, id):Observable<any> {
		let params = 'authorization='+token;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/horario/informacion/' + id, params, {headers: headers});
	}

	getHorarioInfo():Observable<any> {
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/horario/informacion', {headers: headers});
	}
	
}