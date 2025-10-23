# 🧩 Customer Platform – Microfrontend Architecture

Este proyecto implementa una **arquitectura de microfrontends en Angular 19**, conformada por un **Host** y un **Microfrontend (customers-mfe)**.  
El objetivo de la prueba técnica es **listar, crear y editar clientes** utilizando **Angular Material**  y **Standalone Components**.

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
- **Json mock (solo local)**
- **Standalone Components (sin NgModules)**
- **Arquitectura Monorepo**
- **Angular Signals (`computed`, `resource`)**
- **Uso de directivas modernas (@for, @if, @defer)**
- **Lazy Loading en rutas**
- **Diseño responsivo con Angular Material**
- **Rutas protegidas simuladas (AuthGuard)**

---

## ⚙️ Instalación

Clonar el repositorio:

```bash
git clone https://github.com/JonathanLara27/customers-mfe-angular.git
npm install
```

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

- URL: [http://localhost:4200](http://localhost:4200)

### 2. Iniciar el **Microfrontend (customers-mfe)**

```bash
ng serve customers-mfe
```

- URL: [http://localhost:4201](http://localhost:4201)

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
- Proxy configurado en `proxy.conf.json` (`/api` → `http://localhost:3000`)

### Instalar dependencias

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
- API simulada mediante **json-server**, con un **interceptor HTTP** que redirige automáticamente las peticiones hacia la ruta del mock.
- Configuración dinámica de rutas y endpoints mediante los archivos de **`environments` de Angular**, adaptando el comportamiento según el entorno (`development`, `production`, etc.).
- Diseño **responsive** y limpio con **Angular Material**.
- Arquitectura **Module Federation** totalmente funcional.

---


# 🧪 Tests en Customers MFE

Este microfrontend (`customers-mfe`) incluye **tests unitarios** y **tests de integración** para asegurar el correcto funcionamiento de los componentes y servicios principales del módulo.

---

## ⚙️ Ejecución de Tests

Para ejecutar los tests de este microfrontend:

```bash
cd projects/customers-mfe
ng test customers-mfe
```

Esto abrirá el navegador (por defecto **Chrome**) y ejecutará los casos definidos en los archivos `*.spec.ts`.

---

## 🧩 Tipos de Tests Implementados

### ✅ 1. Test unitario — `AuthService`

**Ubicación:**  
`src/app/core/auth/auth.service.spec.ts`

**Objetivo:**  
Verificar el comportamiento del servicio de autenticación simulado (`AuthService`), que controla el estado de sesión mediante señales reactivas (`signal`).

**Casos de prueba incluidos:**
- Verificar que el usuario inicialmente **no esté autenticado**.
- Cambiar el estado al llamar a `login()`.
- Restaurar el estado original al llamar a `logout()`.

---

### 🧠 2. Test de integración — `UpsertCustomerDialogComponent`

**Ubicación:**  
`src/app/components/upsert-customer-dialog/upsert-customer-dialog.component.spec.ts`

**Objetivo:**  
Probar la interacción completa entre el **componente**, su **servicio**, y el **sistema de formularios reactivos**.

**Casos de prueba incluidos:**
- El componente se crea correctamente y se inicializa con datos simulados (`MAT_DIALOG_DATA`).
- El formulario se marca como inválido cuando un campo requerido está vacío.
- La función `submitForm()` envía correctamente los datos esperados y cierra el diálogo.
- El método `resetForm()` del servicio limpia el formulario correctamente.

---

## 🧭 Buenas prácticas aplicadas

- Uso de `waitForAsync` y `compileComponents()` para inicializar componentes standalone.
- Simulación de dependencias de Angular Material (`MatDialogRef`, `MAT_DIALOG_DATA`).
- Pruebas unitarias aisladas (AuthService) y de integración (UpsertCustomerDialogComponent).
- Validaciones de formularios reactivas (`ReactiveFormsModule`).

---

## 📋 Resumen

| Tipo de Test        | Archivo / Ubicación                                                                 | Propósito Principal |
|----------------------|-------------------------------------------------------------------------------------|---------------------|
| 🧪 Unitario          | `auth.service.spec.ts`                                                              | Validar el flujo de login/logout del servicio de autenticación simulado |
| 🔗 Integración       | `upsert-customer-dialog.component.spec.ts`                                          | Validar interacción del componente de formulario con su servicio y Material Dialog |

---

> ✅ Estos tests aseguran que tanto la lógica de negocio (servicios) como la experiencia de usuario (componentes) funcionen correctamente en el MFE.


## 👨‍💻 Autor

**Jonathan Lara**  
📅 Octubre 2025  
🔧 Versión Angular: `19.2.17`
