export class Encargo{
	constructor(
		public id: number,
		public idRestaurante: number,
		public idUsuario: number,
		public estado: string,
		public tiempoEspera: number,
		public preciototal: number,
		public informacionusuario: string,
		public informacionrestaurante: string,
		public vivienda: string,
		public createAt: any,
		public efectivo: boolean
	){}
}