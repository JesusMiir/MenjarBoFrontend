export class Restaurante{
	constructor(
		public id: number,
		public nombre: string,
		public contrasena: string,
		public telefono: number,
		public email: string,
		public direccionRestaurante: string,
		public tiempoPedidos: number,
		public abierto: boolean
	){}
}