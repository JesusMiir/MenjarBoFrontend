import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria';
import { global } from './global';

@Injectable()
export class CategoriaService {

	public url: string;
	public identity;
	public token;
	public validacionRestaurante;

	constructor(
		private _http: HttpClient
	){
		this.url = global.url;
	}

	create(token, categoria):Observable<any> {
		let json = JSON.stringify(categoria);
		let params = 'json='+json+'&authorization='+token;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/categoria/nueva', params, {headers: headers});
	}

	editar(token, categoria, id):Observable<any> {
		let json = JSON.stringify(categoria);
		let params = 'json='+json+'&authorization='+token;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/categoria/editar/' + id, params, {headers: headers});
	}

	getCategoria(token, id):Observable<any> {
		let params = 'authorization='+token;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/categoria/informacion/' + id, params, {headers: headers});
	}

	getCategorias(token):Observable<any> {
		let params = 'authorization='+token;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/categoria/lista', params, {headers: headers});
	}

	getCategoriaInfo(id):Observable<any> {
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/categoria/informacion/' + id, {headers: headers});
	}

	getCategoriasInfo():Observable<any> {
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url + '/categoria/lista', true, {headers: headers});
	}
}