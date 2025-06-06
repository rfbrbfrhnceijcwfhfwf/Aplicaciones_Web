

// Variables tipadas
let nombreUsuario: string = "Andrea";
let edadUsuario: number = 17;
let esPremium: boolean = false;
let tituloCancion: string = "Acordes Básicos";
let duracionLeccion: number = 12;

console.log(`Bienvenida, ${nombreUsuario}!`);
console.log(`Edad: ${edadUsuario}`);
console.log(`Usuario Premium: ${esPremium ? "Sí" : "No"}`);
console.log(`Canción actual: ${tituloCancion}`);
console.log(`Duración de la lección: ${duracionLeccion} minutos`);

// Clase Cliente
class Cliente {
  private id_cliente: number;
  private nombre: string;
  private email: string;

  constructor(id_cliente: number, nombre: string, email: string) {
    this.id_cliente = id_cliente;
    this.nombre = nombre;
    this.email = email;
  }

  getNombre(): string {
    return this.nombre;
  }

  getIdCliente(): number {
    return this.id_cliente;
  }

  getEmail(): string {
    return this.email;
  }

  actualizarInfo(nombre: string, email: string): void {
    if (!email.includes("@")) {
      throw new Error("Email inválido");
    }
    this.nombre = nombre;
    this.email = email;
  }

  esMayorDeEdad(edad: number): boolean {
    return edad >= 18;
  }
}

// Clase Producto
class Producto {
  private id_producto: number;
  private nombre_producto: string;
  private precio: number;

  constructor(id_producto: number, nombre_producto: string, precio: number) {
    this.id_producto = id_producto;
    this.nombre_producto = nombre_producto;
    this.precio = precio;
  }

  getIdProducto(): number {
    return this.id_producto;
  }

  getNombreProducto(): string {
    return this.nombre_producto;
  }

  getPrecio(): number {
    return this.precio;
  }

  actualizarPrecio(nuevo_precio: number): void {
    if (nuevo_precio <= 0) {
      throw new Error("El precio debe ser mayor que cero");
    }
    this.precio = nuevo_precio;
  }
}

// Clase Reserva
class Reserva {
  private activa: boolean = true;
  private cliente: Cliente;
  private producto: Producto;
  private cantidad: number;

  constructor(
    cliente: Cliente,
    producto: Producto,
    cantidad: number
  ) {
    if (cantidad <= 0) {
      throw new Error("La cantidad debe ser mayor que cero");
    }
    this.cliente = cliente;
    this.producto = producto;
    this.cantidad = cantidad;
  }

  cancelarReserva(): void {
    this.activa = false;
  }

  obtenerDetallesReserva(): string {
    const estado = this.activa ? "Activa" : "Cancelada";
    return `Reserva para ${this.cliente.getNombre()} - ${this.producto.getNombreProducto()} x${this.cantidad} - Estado: ${estado}`;
  }

  getCantidad(): number {
    return this.cantidad;
  }

  esActiva(): boolean {
    return this.activa;
  }
}

// Datos de ejemplo
const clientes: Cliente[] = [
  new Cliente(1, "Andrea", "andrea@gmail.com"),
  new Cliente(2, "Luis", "luis@hotmail.com"),
  new Cliente(3, "Marta", "marta@gmail.com"),
];

const productos: Producto[] = [
  new Producto(1, "Ticket Adulto", 10.0),
  new Producto(2, "Ticket Niño", 5.0),
  new Producto(3, "Ticket Senior", 7.0),
  new Producto(4, "Combo Familiar", 20.0),
  new Producto(5, "Combo Pareja", 12.0),
  new Producto(6, "Combo Individual", 7.0),
  new Producto(7, "Combo Snack", 4.0),
  new Producto(8, "Combo Bebida", 3.0),
  new Producto(9, "Combo Dulce", 2.5),
  new Producto(10, "Combo Salado", 2.5),
];

const reservas: Reserva[] = [
  new Reserva(clientes[0], productos[0], 2),
  new Reserva(clientes[1], productos[1], 1),
  new Reserva(clientes[2], productos[3], 3),
];

// === FUNCIONES TIPADAS ===

// (1) Mostrar todos los elementos
function mostrarClientes(clientes: Cliente[]): void {
  console.log("📋 Lista de Clientes:");
  clientes.forEach(c =>
    console.log(`ID: ${c.getIdCliente()}, Nombre: ${c.getNombre()}`)
  );
}

function mostrarProductos(productos: Producto[]): void {
  console.log("📦 Lista de Productos:");
  productos.forEach(p =>
    console.log(`ID: ${p.getIdProducto()}, Nombre: ${p.getNombreProducto()}, Precio: $${p.getPrecio()}`)
  );
}

function mostrarReservas(reservas: Reserva[]): void {
  console.log("🧾 Lista de Reservas:");
  reservas.forEach(r => console.log(r.obtenerDetallesReserva()));
}

// (2) Funciones de filtrado y conteo
function filtrarProductosCaros(productos: Producto[], precioMinimo: number): Producto[] {
  return productos.filter(p => p.getPrecio() > precioMinimo);
}

function contarClientesGmail(clientes: Cliente[]): number {
  return clientes.filter(c => c.getEmail().includes("@gmail.com")).length;
}

function contarReservasGrandes(reservas: Reserva[], minimo: number): number {
  return reservas.filter(r => r.getCantidad() >= minimo).length;
}

// (3) Insertar y eliminar elementos
function agregarProducto(productos: Producto[], nuevo: Producto): void {
  productos.push(nuevo);
  console.log(`✅ Producto "${nuevo.getNombreProducto()}" agregado.`);
}

function eliminarProductoPorId(productos: Producto[], id: number): void {
  const index = productos.findIndex(p => p.getIdProducto() === id);
  if (index !== -1) {
    const eliminado = productos.splice(index, 1)[0];
    console.log(`🗑️ Producto "${eliminado.getNombreProducto()}" eliminado.`);
  } else {
    console.log("❌ Producto no encontrado.");
  }
}

// === USO DE FUNCIONES ===
mostrarClientes(clientes);
mostrarProductos(productos);
mostrarReservas(reservas);

console.log("🎯 Productos caros (> $6):", filtrarProductosCaros(productos, 6));
console.log("📧 Clientes con Gmail:", contarClientesGmail(clientes));
console.log("🔢 Reservas con más de 2 productos:", contarReservasGrandes(reservas, 2));

agregarProducto(productos, new Producto(11, "Combo Mini", 2.0));
eliminarProductoPorId(productos, 3); // Elimina producto con ID 3

mostrarProductos(productos); // Para ver cambios

const correosClientes: string[] = clientes.map(cliente => cliente.getEmail());
console.log("Correos electrónicos de los clientes:", correosClientes);
const productosCaros = productos.filter(producto => producto.getPrecio() > 6);
console.log("🛒 Productos con precio mayor a $6:");
productosCaros.forEach(p =>
  console.log(`- ${p.getNombreProducto()} | Precio: $${p.getPrecio()}`)
);

const clientesGmail = clientes.filter(cliente => cliente.getEmail().includes("@gmail.com"));
console.log("👥 Clientes con correo Gmail:");
clientesGmail.forEach(c => console.log(`- ${c.getNombre()} (${c.getEmail()})`));

const reservasActivas = reservas.filter(reserva => reserva.esActiva());
console.log("📄 Reservas activas:");
reservasActivas.forEach(r => console.log(r.obtenerDetallesReserva()));

const combos = productos.filter(producto => producto.getNombreProducto().includes("Combo"));
console.log("🥤 Productos tipo 'Combo':");
combos.forEach(p =>
  console.log(`- ${p.getNombreProducto()} | Precio: $${p.getPrecio()}`)
);
const sumaTotalPrecios = productos.reduce((total, producto) => total + producto.getPrecio(), 0);
console.log(`💰 Suma total de precios de productos: $${sumaTotalPrecios.toFixed(2)}`);
const totalProductosReservados = reservas.reduce((total, reserva) => total + reserva.getCantidad(), 0);
console.log(`📦 Total de productos reservados: ${totalProductosReservados}`);
const promedioPrecio = productos.reduce((total, p) => total + p.getPrecio(), 0) / productos.length;
console.log(`📊 Promedio de precios de productos: $${promedioPrecio.toFixed(2)}`);
const nombresConcatenados = clientes.reduce((acum, cliente) => acum + cliente.getNombre() + ", ", "");
console.log(`👥 Nombres de clientes: ${nombresConcatenados.slice(0, -2)}`);

class Pedido {
  private cliente: Cliente;
  private productos: Producto[];
  private fecha: Date;

  constructor(cliente: Cliente, productos: Producto[], fecha: Date = new Date()) {
    this.cliente = cliente;
    this.productos = productos;
    this.fecha = fecha;
  }

  getCliente(): Cliente {
    return this.cliente;
  }

  getProductos(): Producto[] {
    return this.productos;
  }

  getFecha(): Date {
    return this.fecha;
  }

  getTotal(): number {
    return this.productos.reduce((total, p) => total + p.getPrecio(), 0);
  }

  resumenPedido(): string {
    return `🧾 Pedido de ${this.cliente.getNombre()} (${this.fecha.toLocaleDateString()}):
    - Productos: ${this.productos.map(p => p.getNombreProducto()).join(", ")}
    - Total: $${this.getTotal().toFixed(2)}`;
  }
}

// Datos simulados
const cliente1 = new Cliente(1, "Andrea", "andrea@gmail.com");
const cliente2 = new Cliente(2, "Luis", "luis@hotmail.com");

const producto1 = new Producto(101, "Curso Guitarra", 30);
const producto2 = new Producto(102, "Afinador", 10);
const producto3 = new Producto(103, "Capotraste", 5);

// Pedidos relacionados
const pedido1 = new Pedido(cliente1, [producto1, producto2]);
const pedido2 = new Pedido(cliente2, [producto3]);

// Objeto "base de datos"
const baseDeDatos = {
  clientes: [cliente1, cliente2],
  productos: [producto1, producto2, producto3],
  pedidos: [pedido1, pedido2]
};
console.log("📚 PEDIDOS REGISTRADOS:");
baseDeDatos.pedidos.forEach(p => {
  console.log(p.resumenPedido());
});
