import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name:'generateDate'})
export class GenerateDatePipe implements PipeTransform {
	transform(value):string {
		if (value != null){
			let date = new Date(value * 1000);

			let day = date.getDate();
			let final_day = day.toString();
			if(day <= 9) {
				final_day = '0'+day;
			}

			let month = (date.getMonth() + 1);
			let final_month = month.toString();
			if(month <= 9) {
				final_month = '0'+month;
			}

			let minutes = date.getMinutes();
			let final_minutes = minutes.toString();
			if(minutes <= 9) {
				final_minutes = '0'+final_minutes;
			} 

			let result = date.getHours() + ':' + final_minutes + ' - ' + final_day + '/' + final_month + '/' + date.getFullYear();
			return result;
		}
		else {
			return '';
		} 
	}
}