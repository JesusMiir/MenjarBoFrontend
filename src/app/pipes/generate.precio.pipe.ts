import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name:'generatePrecio'})
export class GeneratePrecioPipe implements PipeTransform {
	transform(value):string {
		let precio = value.toString();
		let i = 0;
		let resultado = '';
		while (precio[i] != '.' && i < precio.length) {
			resultado += precio[i];
			++i;
		}
		resultado += ',';
		if (i == precio.length) {
			resultado += '00';
		}
		else {
			resultado += precio[i + 1];
			if ((i+3) == precio.length)
				resultado += precio[i + 2];
			else resultado += '0';
		}
		return resultado;
	}
}