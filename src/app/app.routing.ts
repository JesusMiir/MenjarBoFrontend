// Imports Necesarios
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// Importar Componentes
// PRINCIPAL
import { InformacionCategoriasComponent } from './components/inicio/informacion-categorias/informacion-categorias.component';
import { InformacionCategoriaComponent } from './components/inicio/informacion-categoria/informacion-categoria.component';
import { ErrorComponent } from './components/error/error.component';
// USUARIO
import { LoginComponent } from './components/usuario/login/login.component';
import { RegisterComponent } from './components/usuario/register/register.component';
import { EditarUsuarioComponent } from './components/usuario/editar/editar-usuario.component';

// RESTAURANTE
import { LoginRestauranteComponent } from './components/restaurante/login-restaurante/login-restaurante.component';
import { RegisterRestauranteComponent } from './components/restaurante/register-restaurante/register-restaurante.component';
import { EditarRestauranteComponent } from './components/restaurante/editar-restaurante/editar-restaurante.component';
import { InformacionRestauranteComponent } from './components/restaurante/informacion-restaurante/informacion-restaurante.component';
import { TiempoEsperaComponent } from './components/restaurante/tiempo-espera/tiempo-espera.component';
import { FacturacionComponent } from './components/restaurante/facturacion/facturacion.component';

// PEDIDO
// ---- Platos Especiales
import { HamburguesaComponent } from './components/pedido/platos-especiales/hamburguesa/hamburguesa.component';
import { PastaFrescaComponent } from './components/pedido/platos-especiales/pasta-fresca/pasta-fresca.component';
import { MenuComponent } from './components/pedido/platos-especiales/menu/menu.component';
import { ComboAComponent } from './components/pedido/platos-especiales/combos/combo-a/combo-a.component';
import { ComboBComponent } from './components/pedido/platos-especiales/combos/combo-b/combo-b.component';
import { ComboCComponent } from './components/pedido/platos-especiales/combos/combo-c/combo-c.component';
// ---- Pedidios Usuario
import { RealizarPedidoComponent } from './components/pedido/realizar/realizar-pedido/realizar-pedido.component';
import { EscogerCategoriaComponent } from './components/pedido/realizar/escoger-categoria/escoger-categoria.component';
import { AnadirPlatoComponent } from './components/pedido/realizar/anadir-plato/anadir-plato.component';
import { HistorialPedidosComponent } from './components/pedido/historial/historial-pedidos/historial-pedidos.component';
import { OpcionesPlatoComponent } from './components/pedido/realizar/opciones-plato/opciones-plato.component';
import { FinalizarPedidoComponent } from './components/pedido/realizar/finalizar-pedido/finalizar-pedido.component';
import { InformacionEncargoComponent } from './components/pedido/historial/informacion-encargo/informacion-encargo.component';
import { CantidadPlatosComponent } from './components/pedido/realizar/cantidad-platos/cantidad-platos.component';
// ---- Pedidios Restaurante
import { PedidosRestauranteComponent } from './components/pedido/historial/pedidos-restaurante/pedidos-restaurante.component';
import { InformacionEncargoUsuarioComponent } from './components/pedido/historial/informacion-encargo-usuario/informacion-encargo-usuario.component';

// ELEMENTOS
// CATEGORIA
import { CategoriaTodasComponent } from './components/elementos/categoria/categoria-todas/categoria-todas.component';
import { CategoriaNuevaComponent } from './components/elementos/categoria/categoria-nueva/categoria-nueva.component';
import { CategoriaInformacionComponent } from './components/elementos/categoria/categoria-informacion/categoria-informacion.component';
import { CategoriaSubirImagenComponent } from './components/elementos/categoria/categoria-subir-imagen/categoria-subir-imagen.component';
import { CategoriaEditarComponent } from './components/elementos/categoria/categoria-editar/categoria-editar.component';
// INGREDIENTE
import { IngredienteTodosComponent } from './components/elementos/ingrediente/ingrediente-todos/ingrediente-todos.component';
import { IngredienteNuevoComponent } from './components/elementos/ingrediente/ingrediente-nuevo/ingrediente-nuevo.component';
import { IngredienteInformacionComponent } from './components/elementos/ingrediente/ingrediente-informacion/ingrediente-informacion.component';
// MENU
import { MenuTodosComponent } from './components/elementos/menu/menu-todos/menu-todos.component';
import { MenuNuevoComponent } from './components/elementos/menu/menu-nuevo/menu-nuevo.component';
import { MenuInformacionComponent } from './components/elementos/menu/menu-informacion/menu-informacion.component';
// PLATO
import { PlatoTodosComponent } from './components/elementos/plato/plato-todos/plato-todos.component';
import { PlatoNuevoComponent } from './components/elementos/plato/plato-nuevo/plato-nuevo.component';
import { PlatoInformacionComponent } from './components/elementos/plato/plato-informacion/plato-informacion.component';
// HORARIO
import { HorarioInformacionComponent } from './components/elementos/horario/horario-informacion/horario-informacion.component';
import { HorarioEditarComponent } from './components/elementos/horario/horario-editar/horario-editar.component';

// Definir Rutas
const appRoutes: Routes = [
	// INICIO
	{path: '', component: InformacionCategoriasComponent},
	{path: 'inici', component: InformacionCategoriasComponent},
	{path: 'categoria-restaurant/:id/Hamburguesa', component: HamburguesaComponent},
	{path: 'categoria-restaurant/:id/Pasta Fresca', component: PastaFrescaComponent},
	{path: 'categoria-restaurant/:id/Menú', component: MenuComponent},
	{path: 'categoria-restaurant/:id/:nombre', component: InformacionCategoriaComponent},
	// USUARIO
	{path: 'login', component: LoginComponent},
	{path: 'logout/:sure', component: LoginComponent},
	{path: 'registre', component: RegisterComponent},
	{path: 'configuracio', component: EditarUsuarioComponent},

	// RESTAURANTE
	{path: 'restaurant/login', component: LoginRestauranteComponent},
	{path: 'restaurant/logout/:sure', component: LoginRestauranteComponent},
	{path: 'restaurant/registre', component: RegisterRestauranteComponent},
	{path: 'restaurant/configuracio', component: EditarRestauranteComponent},
	{path: 'restaurant/informacio', component: InformacionRestauranteComponent},
	{path: 'restaurant/temps-espera', component: TiempoEsperaComponent},
	{path: 'restaurant/facturacio', component: FacturacionComponent},

	// PEDIDOS

	// -- Platos Especiales
	{path: 'comanda/:id/nou-plat/Hamburguesa/:idCategoria', component: HamburguesaComponent},
	{path: 'comanda/:id/nou-plat/Pasta Fresca/:idCategoria', component: PastaFrescaComponent},
	{path: 'comanda/:id/nou-plat/Menú/ComboA', component: ComboAComponent},
	{path: 'comanda/:id/nou-plat/Menú/ComboB', component: ComboBComponent},
	{path: 'comanda/:id/nou-plat/Menú/ComboC', component: ComboCComponent},
	{path: 'comanda/:id/nou-plat/Menú/:idCategoria', component: MenuComponent},
	{path: 'comanda/:id/seleccionar-plat/:idConjuntoElementos/Hamburguesa/:idCategoria/:combo', component: HamburguesaComponent},
	{path: 'comanda/:id/seleccionar-plat/:idConjuntoElementos/Pasta Fresca/:idCategoria/:combo', component: PastaFrescaComponent},
	{path: 'comanda/:id/seleccionar-plat/:idConjuntoElementos/:categoria/:idCategoria/:combo', component: AnadirPlatoComponent},
	// -- Pedidos Usuario
	{path: 'fer-comanda', component: RealizarPedidoComponent},
	{path: 'comanda/:id/triar-categoria', component: EscogerCategoriaComponent},
	{path: 'comanda/:id/nou-plat/:categoria/:idCategoria', component: AnadirPlatoComponent},
	{path: 'historial-comandes', component: HistorialPedidosComponent},
	{path: 'comanda/:id/opcions-plat/:idConjuntoPlatos/:categoria/:idCategoria/:plato/:idPlato', component: OpcionesPlatoComponent},
	{path: 'finalitzar-comanda', component: FinalizarPedidoComponent},
	{path: 'informacio-comanda/:id', component: InformacionEncargoComponent},
	{path: 'unitats-del-plat/:id', component: CantidadPlatosComponent},
	// ---- Pedidios Restaurante
	{path: 'restaurant/comandes', component: PedidosRestauranteComponent},
	{path: 'restaurant/informacio-comanda-usuari/:id', component: InformacionEncargoUsuarioComponent},
	
	// ELEMENTOS
	// CATEGORIA
	{path: 'categoria/totes', component: CategoriaTodasComponent},
	{path: 'categoria/nova', component: CategoriaNuevaComponent},
	{path: 'categoria/informacio/:id/:nombre', component: CategoriaInformacionComponent},
	{path: 'categoria/penjar-imatge/:id', component: CategoriaSubirImagenComponent},
	{path: 'categoria/editar/:id/:nombre', component: CategoriaEditarComponent},
	// INGREDIENTE
	{path: 'ingredient/tots', component: IngredienteTodosComponent},
	{path: 'ingredient/nou', component: IngredienteNuevoComponent},
	{path: 'ingredient/informacio/:id/:nombre', component: IngredienteInformacionComponent},
	// MENU
	{path: 'menu/tots', component: MenuTodosComponent},
	{path: 'menu/nou', component: MenuNuevoComponent},
	{path: 'menu/informacio/:id/:nombre', component: MenuInformacionComponent},
	// PLATO
	{path: 'plat/tots', component: PlatoTodosComponent},
	{path: 'plat/nou', component: PlatoNuevoComponent},
	{path: 'plat/informacio/:id/:nombre', component: PlatoInformacionComponent},
	// HORARIO
	{path: 'horari/informacio', component: HorarioInformacionComponent},
	{path: 'restaurant/horari/editar', component: HorarioEditarComponent},
	// FINAL
	{path: '**', component: ErrorComponent}
];

// Exportar Configuración
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);