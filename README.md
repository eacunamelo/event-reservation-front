# Event Reservation Frontend

Este proyecto es la parte frontend de la aplicación Event Reservation, diseñada para la gestión de reservas de espacios para eventos.

## Requisitos del Sistema
Antes de comenzar, asegúrate de tener instalado lo siguiente:

- Node.js (>= 14.x)
- Angular CLI (>= 13.x)
- Git (opcional)

## Instalación
Clonar el Proyecto
Clona este repositorio en tu máquina local usando Git:
git clone https://github.com/tuusuario/event-reservation-front.git
cd event-reservation-front

## Instalar Dependencias
Instala todas las dependencias necesarias utilizando npm:
npm install

## Configuración del Entorno
El proyecto Angular utiliza un archivo de entorno para conectar con el backend. Crea un archivo environment.ts en la carpeta src/environments si no está creado, o modifica el existente con las siguientes variables:

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/api'  // Aquí va la URL de tu API en el backend.
};

Asegúrate de que la URL apunta al backend que configuraste previamente.

## Ejecutar el Proyecto
Inicia el servidor de desarrollo de Angular:

ng serve

El proyecto estará disponible en http://localhost:4200/.

## Estructura del Proyecto
- src/: Carpeta principal del código fuente.
- app/: Contiene los componentes, servicios, y demás lógica de la aplicación.
- assets/: Contiene las imágenes, archivos y recursos estáticos.
- environments/: Configuración de entornos (producción y desarrollo).

## Rutas Principales
- /spaces: Página principal donde se listan los espacios disponibles para reservas.
- /reservations: Página donde el usuario puede ver y gestionar sus reservas.
- /admin/spaces: Página para administradores, donde pueden gestionar los espacios.

## Uso de la Aplicación

### Crear una Reserva
El usuario navega a la página de espacios y selecciona uno.
En la página del formulario, ingresa el nombre del evento, la fecha, la hora de inicio y de fin.
Al hacer clic en Reservar, se envía la solicitud al backend.
Editar Espacios (Solo para Admins)
Los administradores pueden navegar a la página de gestión de espacios.
Seleccionan un espacio para editar o pueden crear uno nuevo utilizando el formulario.
Pueden cargar imágenes para los espacios y definir la capacidad y tipo de espacio.


## Consideraciones Adicionales

### Autenticación JWT
El frontend está integrado con autenticación JWT. Una vez que el usuario se autentica (login), el token JWT se guarda en el localStorage y se utiliza para todas las solicitudes protegidas.

### Protección de Rutas
Las rutas de administración están protegidas por un guardia de autenticación (authGuard) y otro de roles (adminGuard).

### Integración con Backend
El frontend interactúa con el backend para obtener datos sobre espacios y reservas a través de las APIs documentadas en Swagger.