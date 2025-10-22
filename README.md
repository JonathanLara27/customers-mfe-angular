# 🧩 Customer Platform – Microfrontend Architecture

Este proyecto implementa una **arquitectura de microfrontends en Angular 19**, conformada por un **Host** y un **Microfrontend (customers-mfe)**.  
El objetivo de la prueba técnica es **listar, crear y editar clientes** utilizando **Angular Material** y una arquitectura escalable basada en `ApplicationConfig` (sin módulos tradicionales).

---

## 🏗️ Estructura del Proyecto

```
customer-platform/
│
├── projects/
│   ├── host/                # Aplicación principal (shell)
│   └── customers-mfe/       # Microfrontend para gestión de clientes
│
├── package.json
├── angular.json
└── README.md
```

---

## 🧱 Tecnologías principales

- **Angular 19**
- **Module Federation** con `@angular-architects/module-federation`
- **Angular Material**
- **Vite Dev Server**
- **Standalone Components (sin NgModules)**
- **Arquitectura Monorepo**

---

## ⚙️ Instalación

Antes de ejecutar, instala las dependencias desde la raíz del monorepo:

```bash
npm install
```

> 💡 Si aparece un error de dependencias, usa:
> ```bash
> npm install --legacy-peer-deps
> ```

Asegúrate también de tener instalada la versión correcta de `@angular/animations`:

```bash
npm install @angular/animations@19.2.15
```

---

## ▶️ Ejecución del proyecto

El proyecto se compone de **dos aplicaciones**: el **Host** y el **Microfrontend (customers-mfe)**.  
Ambos deben ejecutarse al mismo tiempo para que la federación funcione correctamente.

### 1. Iniciar el **Host**

El host actúa como contenedor principal y carga los microfrontends remotos.

```bash
ng serve host
```

- Servidor: `http://localhost:4200/`

---

### 2. Iniciar el **Microfrontend (customers-mfe)**

El microfrontend maneja la gestión de clientes (listado, creación y edición).

```bash
ng serve customers-mfe
```

- Servidor: `http://localhost:4201/`

> ⚠️ Ejecuta **ambos proyectos simultáneamente** para que el host pueda consumir las rutas remotas del microfrontend.

---

## 🌐 Navegación entre proyectos

Una vez ambos servidores estén activos:

- Abre [http://localhost:4200/customers](http://localhost:4200/customers)
- Esto cargará el microfrontend `customers-mfe` dentro del host.

### Rutas principales del microfrontend
| Ruta | Descripción |
|------|--------------|
| `/customers` | Lista de clientes |
| `/customers/create` | Formulario de creación de clientes |

---

## Mock API con json-server (desarrollo)

Para desarrollo y pruebas se incluye un mock API basado en `json-server`.

- Archivo de datos: `mock/db.json` (contiene 50 clientes de ejemplo).
- Servidor helper: `mock/server.js` — arranca json-server como módulo y aplica un middleware para simular latencia.

### Instalar dependencias

Desde la raíz del proyecto:

```powershell
npm install
```

### Ejecutar el mock API

```powershell
npm run mock-api
```

Esto arrancará el mock en `http://localhost:3000` y aplicará un delay por defecto de 1000 ms.

### Cambiar el delay

Puedes personalizar el delay con la variable de entorno `MOCK_DELAY` (milisegundos). En PowerShell:

```powershell
$env:MOCK_DELAY=200; npm run mock-api
```

### Endpoints útiles

- `GET /customers` — lista completa
- `GET /customers?_page=1&_limit=10` — paginado (json-server devuelve header `X-Total-Count` con el total)
- `GET /customers/1` — obtener por id
- `POST /customers`, `PUT /customers/1`, `PATCH /customers/1`, `DELETE /customers/1`

### Usar el mock desde el MFE

Se creó `proxy.conf.json` que mapea `/api` a `http://localhost:3000`. Para servir el MFE en desarrollo con el proxy:

```powershell
npm run start:customers
```

Las llamadas a `/api/customers` se redirigen al mock automáticamente.

---

## 🧰 Comandos útiles

### Crear un nuevo componente
```bash
ng generate component projects/customers-mfe/src/app/pages/customer-detail
```

### Construir el proyecto
```bash
ng build host
ng build customers-mfe
```

### Ejecutar pruebas unitarias
```bash
ng test
```

---

## 🧠 Notas Técnicas

- Se usa `ApplicationConfig` en lugar de `AppModule` para configurar los providers.
- `provideAnimations()` habilita las animaciones requeridas por Angular Material.
- Cada aplicación (host y mfe) tiene su propio `webpack.config.js` con configuraciones específicas de **Module Federation**.
- **Angular Material** fue instalado en el **host** (proyecto raíz) para compartir estilos y componentes visuales con los microfrontends.
- El microfrontend `customers-mfe` expone sus rutas a través de:
  ```js
  exposes: {
    './routes': './projects/customers-mfe/src/app/app.routes.ts'
  }
  ```

---

## 📜 Scripts recomendados (opcional)

Puedes agregar estos comandos a tu `package.json` para simplificar la ejecución:

```json
"scripts": {
  "start:host": "ng serve host",
  "start:customers": "ng serve customers-mfe",
  "start:all": "concurrently \"ng serve host\" \"ng serve customers-mfe\""
}
```

Y luego ejecutar:

```bash
npm run start:all
```

> 📦 Requiere instalar `concurrently` si no lo tienes:
> ```bash
> npm install concurrently --save-dev
> ```

---

## 📚 Recursos adicionales

- [Angular 19 Standalone APIs](https://angular.dev/guide/standalone-components)
- [Module Federation en Angular](https://www.angulararchitects.io/guide/module-federation/)
- [Angular Material](https://material.angular.dev)
- [Vite Dev Server](https://vitejs.dev/)

---

## 👨‍💻 Autor

**Jonathan Lara**  
📅 Octubre 2025  
🔧 Versión Angular: `19.2.17`
