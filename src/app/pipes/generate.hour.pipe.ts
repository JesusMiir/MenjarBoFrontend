import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name:'generateHour'})
export class GenerateHourPipe implements PipeTransform {
	transform(value):string {
		if (value != null){
			let date = new Date(value * 1000);

			let minutes = date.getMinutes();
			let final_minutes = minutes.toString();
			if(minutes <= 9) {
				final_minutes = '0'+final_minutes;
			} 

			let result = date.getHours() + ':' + final_minutes;
			return result;
		}
		else {
			return '';
		} 
	}
}