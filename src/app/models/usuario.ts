export class Usuario{
	constructor(
		public id: number,
		public nombre: string,
		public apellidos: string,
		public contrasena: string,
		public telefono: number,
		public email: string,
		public direccionCasa: string,
		public createAt: any
	){}
}