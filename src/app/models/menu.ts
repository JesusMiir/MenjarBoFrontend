export class Menu{
	constructor(
		public id: number,
		public idRestaurante: number,
		public nombre: string,
		public nombrePrimero: string,
		public descripcionPrimero: string,
		public nombreSegundo: string,
		public descripcionSegundo: string,
		public precio: number,
		public contadorActual: number,
		public contadorGeneral: number
	){}
}