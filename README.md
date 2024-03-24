# KPWorkOut

## Introducción

**KPWorkOut** es una tienda online dedicada a la venta de productos enfocados al mundo de los gimnasios. Esta plataforma permite al administrador gestionar las categorías de productos de manera eficiente y está diseñada para cubrir las necesidades de los entusiastas del deporte que buscan facilidad y diversidad en sus compras online.

## Objetivos y Motivación

El proyecto nace de la necesidad de crear una tienda online que no solo ofrezca una amplia gama de productos relacionados con el deporte, sino que también permita al administrador una gestión fácil y dinámica de las categorías y productos ofrecidos, asegurando una experiencia de usuario óptima.

## Tecnologías Usadas

- **Backend:** Laravel 10
- **Frontend:** React
- **Base de datos:** MySQL
- **Estilos:** Tailwind CSS
- **Pagos:** Stripe

## Requisitos Previos

Para ejecutar este proyecto, necesitarás tener instalado:
- Node 20
- PHP 8
- Cliente MySQL
- Dependencias de React y Laravel

## Instalación

### Frontend (React)
1. Cambia el nombre del archivo dentro de `src/` de `secrets.example.js` a `secrets.js` y actualiza las credenciales según las que vayas a utilizar.
2. Ejecuta `npm install` dentro de la carpeta `frontend`.

### Backend (Laravel)
1. Navega a la carpeta `backend`.
2. Ejecuta `php artisan jwt:secret` para generar la `jwt_secret` necesaria para la autenticación JWT.
3. Actualiza las credenciales de la base de datos en el archivo de configuración con las de tu entorno.
4. Instala las dependencias de Laravel con `composer install`.

### Base de Datos (MySQL)
1. Crea la base de datos que utilizará el proyecto utilizando tu cliente MySQL preferido o mediante la línea de comandos.

## Características

### Cliente
- **Home:** Banner de bienvenida, menú de categorías, listado de categorías y nuevos productos.
- **Shop:** Búsqueda, listado de productos con orden y paginación, filtros dinámicos, detalles de productos.
- **Contact:** Formulario de contacto.
- **Profile:** Gestión de perfil, historial de pedidos, favoritos y carrito para usuarios registrados.
- **Checkout:** Formulario de pedido y pago.
- **ProductDetails:** Detalles y opciones de producto, productos relacionados.

### Administrador
- **Dashboard:** Gestión de productos y categorías.
- **Categorías:** Creación, edición y eliminación de categorías y subcategorías.
- **Filtros:** Gestión de filtros de productos.
- **Productos:** Lista y gestión de productos.
- **Pedidos:** Gestión y actualización de pedidos.

### Demo
    Home
![Home](doc/assets/gif/Home.gif)
    
    Shop
![Shop](doc/assets/gif/Shop.gif)

    Product
![Product](doc/assets/images/Product.png)

    Contact
![Contact](doc/assets/images/Contact.png)

    Login
![Login](doc/assets/images/Login.png)

    Register
![Register](doc/assets/images/Register.png)

    Profile
<div style="display: flex; flex-wrap: wrap; justify-content: space-around;">
  <div style="flex: 33%; max-width: 33%; padding: 5px;">
    <p>Orders</p>
    <img src="doc/assets/images/OrdersProfile.png" alt="Descripción de imagen 1" style="width: 100%;">
  </div>
  <div style="flex: 33%; max-width: 33%; padding: 5px;">
    <p>WishList</p>
    <img src="doc/assets/images/WishList.png" alt="Descripción de imagen 3" style="width: 100%;">
  </div>
  <div style="flex: 33%; max-width: 33%; padding: 5px;">
    <p>Cart</p>
    <img src="doc/assets/images/Cart.png" alt="Descripción de imagen 2" style="width: 100%;">
  </div>
</div>

    CheckOut
![CheckOut](doc/assets/images/CheckOut.png)

    Payment Stripe
![PaymentStripe](doc/assets/images/PaymentStripe.png)

    Admin Dashboard
<div style="display: flex; flex-wrap: wrap; justify-content: space-around;">
  <div style="flex: 50%; max-width: 50%; padding: 5px;">
    <p>Categories</p>
    <img src="doc/assets/images/Categories.png" alt="Descripción de imagen 1" style="width: 100%;">
  </div>
  <div style="flex: 50%; max-width: 50%; padding: 5px;">
    <p>Products</p>
    <img src="doc/assets/images/Products.png" alt="Descripción de imagen 3" style="width: 100%;">
  </div>
  <div style="flex: 50%; max-width: 50%; padding: 5px;">
    <p>Filters</p>
    <img src="doc/assets/images/Filters.png" alt="Descripción de imagen 2" style="width: 100%;">
  </div>
  <div style="flex: 50%; max-width: 50%; padding: 5px;">
    <p>Orders</p>
    <img src="doc/assets/images/Orders.png" alt="Descripción de imagen 4" style="width: 100%;">
  </div>
</div>

    Admin Product
![AdminProduct](doc/assets/images/ProductAdmin.png)


## Licencia

Este proyecto se distribuye bajo la licencia MIT, lo que permite a otros usar, modificar y distribuir el software bajo los términos de dicha licencia.