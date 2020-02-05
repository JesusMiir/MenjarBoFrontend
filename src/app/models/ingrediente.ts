export class Ingrediente{
	constructor(
		public id: number,
		public idRestaurante: number,
		public idCategoria: number,
		public nombre: string,
		public precio: number
	){}
}