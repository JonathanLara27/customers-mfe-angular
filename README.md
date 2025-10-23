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
- **Angular Signals (`computed`, `resource`)**
- **Uso de directivas modernas (@for, @if, @defer)**
- **Lazy Loading en rutas**
- **Diseño responsivo con Angular Material**
- **Rutas protegidas simuladas (AuthGuard)**

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

```bash
ng serve host
```

- Servidor: `http://localhost:4200/`

### 2. Iniciar el **Microfrontend (customers-mfe)**

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
| `/customers/list` | Lista de clientes con skeleton loading y protegido con guard |
| `/customers/table` | Tabla de clientes con búsqueda rápida y Material Table |

---

## 🔒 Rutas protegidas (sin backend real)

El microfrontend `customers-mfe` implementa una simulación de autenticación utilizando **signals** y un **AuthGuard** (en este caso llamado `loginGuard`) para restringir el acceso a ciertas rutas, incluso sin un backend real.

Este enfoque permite:

- Simular una sesión activa directamente en el frontend.
- Aplicar control de acceso sin necesidad de un servidor.
- Demostrar buenas prácticas en arquitectura modular.
- Gestionar el estado de forma reactiva con **Angular 17**.

Esto simula rutas protegidas sin necesidad de backend, cumpliendo el requerimiento opcional de seguridad local.

---

## Mock API con json-server (desarrollo)

Para desarrollo y pruebas se incluye un mock API basado en `json-server`.

- Archivo de datos: `mock/db.json` (contiene 50 clientes de ejemplo).
- Servidor helper: `mock/server.js` — arranca json-server como módulo y aplica un middleware para simular latencia.

### Instalar dependencias

```powershell
npm install
```

### Ejecutar el mock API

```powershell
npm run mock-api
```

Esto arrancará el mock en `http://localhost:3000` y aplicará un delay por defecto de 1000 ms.

---

## 🧠 Notas Técnicas

- Uso de **Signals (`computed`, `resource`)** para la gestión de estado local.
- Implementación de **rutas lazy-loaded** y **protegidas con guards** simulando autenticación.
- Uso de **directivas modernas Angular (@for, @if, @defer)**.
- API simulada mediante **json-server** o interceptores HTTP.
- Diseño **responsive** y limpio con **Angular Material**.
- Arquitectura **Module Federation** totalmente funcional.

---

## 👨‍💻 Autor

**Jonathan Lara**  
📅 Octubre 2025  
🔧 Versión Angular: `19.2.17`
