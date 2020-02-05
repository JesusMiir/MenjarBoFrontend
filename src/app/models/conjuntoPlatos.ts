export class ConjuntoPlatos{
	constructor(
		public id: number,
		public idEncargo: number,
		public idMenu: number,
		public idPlato: number,
		public idCombo: number,
		public cantidad: number,
		public precioTotal: number
	){}
}