export class Horario{
	constructor(
		public id: number,
		public idRestaurante: number,
		public lunesM: string,
		public lunesT: string,
		public martesM: string,
		public martesT: string,
		public miercolesM: string,
		public miercolesT: string,
		public juevesM: string,
		public juevesT: string,
		public viernesM: string,
		public viernesT: string,
		public sabadoM: string,
		public sabadoT: string,
		public domingoM: string,
		public domingoT: string,
	){}
}