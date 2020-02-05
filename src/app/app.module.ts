import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { AngularFileUploaderModule } from 'angular-file-uploader';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GenerateDatePipe } from './pipes/generate.date.pipe';
import { GenerateHourPipe } from './pipes/generate.hour.pipe';
import { GeneratePrecioPipe } from './pipes/generate.precio.pipe';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { RegisterComponent } from './components/usuario/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { EditarUsuarioComponent } from './components/usuario/editar/editar-usuario.component';
import { RegisterRestauranteComponent } from './components/restaurante/register-restaurante/register-restaurante.component';
import { LoginRestauranteComponent } from './components/restaurante/login-restaurante/login-restaurante.component';
import { EditarRestauranteComponent } from './components/restaurante/editar-restaurante/editar-restaurante.component';
import { CategoriaTodasComponent } from './components/elementos/categoria/categoria-todas/categoria-todas.component';
import { CategoriaNuevaComponent } from './components/elementos/categoria/categoria-nueva/categoria-nueva.component';
import { CategoriaInformacionComponent } from './components/elementos/categoria/categoria-informacion/categoria-informacion.component';
import { CategoriaSubirImagenComponent } from './components/elementos/categoria/categoria-subir-imagen/categoria-subir-imagen.component';
import { PlatoNuevoComponent } from './components/elementos/plato/plato-nuevo/plato-nuevo.component';
import { PlatoTodosComponent } from './components/elementos/plato/plato-todos/plato-todos.component';
import { PlatoInformacionComponent } from './components/elementos/plato/plato-informacion/plato-informacion.component';
import { MenuInformacionComponent } from './components/elementos/menu/menu-informacion/menu-informacion.component';
import { IngredienteInformacionComponent } from './components/elementos/ingrediente/ingrediente-informacion/ingrediente-informacion.component';
import { IngredienteTodosComponent } from './components/elementos/ingrediente/ingrediente-todos/ingrediente-todos.component';
import { IngredienteNuevoComponent } from './components/elementos/ingrediente/ingrediente-nuevo/ingrediente-nuevo.component';
import { MenuNuevoComponent } from './components/elementos/menu/menu-nuevo/menu-nuevo.component';
import { MenuTodosComponent } from './components/elementos/menu/menu-todos/menu-todos.component';
import { CategoriaEditarComponent } from './components/elementos/categoria/categoria-editar/categoria-editar.component';
import { HorarioInformacionComponent } from './components/elementos/horario/horario-informacion/horario-informacion.component';
import { HorarioEditarComponent } from './components/elementos/horario/horario-editar/horario-editar.component';
import { InformacionRestauranteComponent } from './components/restaurante/informacion-restaurante/informacion-restaurante.component';
import { InformacionCategoriasComponent } from './components/inicio/informacion-categorias/informacion-categorias.component';
import { InformacionCategoriaComponent } from './components/inicio/informacion-categoria/informacion-categoria.component';
import { RealizarPedidoComponent } from './components/pedido/realizar/realizar-pedido/realizar-pedido.component';
import { HistorialPedidosComponent } from './components/pedido/historial/historial-pedidos/historial-pedidos.component';
import { PedidosRestauranteComponent } from './components/pedido/historial/pedidos-restaurante/pedidos-restaurante.component';
import { AnadirPlatoComponent } from './components/pedido/realizar/anadir-plato/anadir-plato.component';
import { EscogerCategoriaComponent } from './components/pedido/realizar/escoger-categoria/escoger-categoria.component';
import { TiempoEsperaComponent } from './components/restaurante/tiempo-espera/tiempo-espera.component';
import { InformacionEncargoUsuarioComponent } from './components/pedido/historial/informacion-encargo-usuario/informacion-encargo-usuario.component';
import { OpcionesPlatoComponent } from './components/pedido/realizar/opciones-plato/opciones-plato.component';
import { HamburguesaComponent } from './components/pedido/platos-especiales/hamburguesa/hamburguesa.component';
import { PastaFrescaComponent } from './components/pedido/platos-especiales/pasta-fresca/pasta-fresca.component';
import { FinalizarPedidoComponent } from './components/pedido/realizar/finalizar-pedido/finalizar-pedido.component';
import { InformacionEncargoComponent } from './components/pedido/historial/informacion-encargo/informacion-encargo.component';
import { CantidadPlatosComponent } from './components/pedido/realizar/cantidad-platos/cantidad-platos.component';
import { MenuComponent } from './components/pedido/platos-especiales/menu/menu.component';
import { ComboAComponent } from './components/pedido/platos-especiales/combos/combo-a/combo-a.component';
import { ComboBComponent } from './components/pedido/platos-especiales/combos/combo-b/combo-b.component';
import { ComboCComponent } from './components/pedido/platos-especiales/combos/combo-c/combo-c.component';
import { FacturacionComponent } from './components/restaurante/facturacion/facturacion.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    EditarUsuarioComponent,
    RegisterRestauranteComponent,
    LoginRestauranteComponent,
    EditarRestauranteComponent,
    CategoriaTodasComponent,
    CategoriaNuevaComponent,
    CategoriaInformacionComponent,
    CategoriaSubirImagenComponent,
    PlatoNuevoComponent,
    PlatoTodosComponent,
    PlatoInformacionComponent,
    MenuInformacionComponent,
    IngredienteInformacionComponent,
    IngredienteTodosComponent,
    IngredienteNuevoComponent,
    MenuNuevoComponent,
    MenuTodosComponent,
    CategoriaEditarComponent,
    HorarioInformacionComponent,
    HorarioEditarComponent,
    InformacionRestauranteComponent,
    InformacionCategoriasComponent,
    InformacionCategoriaComponent,
    RealizarPedidoComponent,
    HistorialPedidosComponent,
    PedidosRestauranteComponent,
    AnadirPlatoComponent,
    EscogerCategoriaComponent,
    TiempoEsperaComponent,
    GenerateDatePipe,
    GenerateHourPipe,
    GeneratePrecioPipe,
    InformacionEncargoUsuarioComponent,
    OpcionesPlatoComponent,
    HamburguesaComponent,
    PastaFrescaComponent,
    FinalizarPedidoComponent,
    InformacionEncargoComponent,
    CantidadPlatosComponent,
    MenuComponent,
    ComboAComponent,
    ComboBComponent,
    ComboCComponent,
    FacturacionComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpClientModule,
    AngularFileUploaderModule,
    DragDropModule,
    MatCardModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
  	appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
