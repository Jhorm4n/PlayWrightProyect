# Playwright Course - JM Consultant

## Descripción

Este proyecto contiene un curso completo de automatización de pruebas utilizando **Playwright**, un framework moderno para testing end-to-end que permite automatizar navegadores web como Chrome, Firefox y Safari.

## 📋 Tabla de Contenidos

1. [Características](#características)
2. [Requisitos Previos](#requisitos-previos)
3. [Instalación](#instalación)
4. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
5. [Lenguaje de Programación](#lenguaje-de-programación)
6. [Estructura y Organización](#estructura-y-organización)
7. [Patrones de Diseño Implementados](#patrones-de-diseño-implementados)
8. [Fixtures en Playwright](#fixtures-en-playwright)
9. [Uso y Ejecución](#uso-y-ejecución)
10. [Reportes de Pruebas](#reportes-de-pruebas)
11. [Mejores Prácticas](#mejores-prácticas)
12. [FAQ para Principiantes](#faq-para-principiantes)

## ✨ Características

- ✅ Automatización de navegadores web (Chrome, Firefox, Safari)
- ✅ Pruebas end-to-end (E2E) de alta calidad
- ✅ Ejecución paralela de tests para optimizar tiempo
- ✅ Screenshots y videos de pruebas fallidas
- ✅ Integración con CI/CD
- ✅ Arquitectura escalable y mantenible
- ✅ Reportes detallados en HTML

## 📋 Requisitos Previos

- **Node.js** (versión 16 o superior)
- **npm** o **yarn**
- **Git**
- Editor de código (VSCode recomendado)

## 🚀 Instalación

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd playwright-course.jm-consultant
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Agregar variables de entorno
Copia el archivo `.env.example` a `.env` y actualiza `BASE_URL`, `APP_USER` y `APP_PASSWORD`.

### 4. Instalar navegadores de Playwright
```bash
npm run prepare
```

## 🏗️ Arquitectura del Proyecto

### Filosofía de Diseño

Este proyecto implementa **Page Object Model (POM)**, un patrón de diseño que mejora la mantenibilidad y escalabilidad de los tests. La arquitectura se divide en capas:

```
┌─────────────────────────────────────┐
│      Tests (Archivos .spec.ts)      │
│   (Lógica de prueba y validaciones) │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│    Page Objects (Clases de Página)  │
│  (Selectores e interacciones)       │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│   Fixtures (Datos y Configuración)  │
│   (Setup y teardown de pruebas)     │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│    Browser & Page (Playwright)      │
│      (Motor de automatización)      │
└─────────────────────────────────────┘
```

## 💻 Lenguaje de Programación

### ¿Por qué TypeScript?

Se utiliza **TypeScript** en lugar de JavaScript porque:

- ✅ **Tipado estático**: Detecta errores antes de ejecutar el código
- ✅ **Autocompletado**: Mejor experiencia de desarrollo en el IDE
- ✅ **Documentación integrada**: El código es autodocumentado
- ✅ **Menos bugs**: Previene errores comunes de JavaScript
- ✅ **Escalabilidad**: Facilita mantener proyectos grandes

### Ejemplo de Diferencia

```typescript
// TypeScript - Detecta errores automáticamente
const login = (username: string, password: string): void => {
  // El IDE te ayuda y valida los tipos
};

// JavaScript - No detecta errores de tipo
const login = (username, password) => {
  // Podrías pasar un número sin darte cuenta
};
```

## 📁 Estructura y Organización

```
playwright-course.jm-consultant/
│
├── 📂 tests/
│   ├── auth.spec.ts              # Tests de autenticación
│   ├── checkout.spec.ts          # Tests de compra
│   └── ...
│
├── 📂 pages/
│   ├── BasePage.ts               # Clase base con métodos comunes
│   ├── LoginPage.ts              # Página de login
│   ├── DashboardPage.ts          # Página de dashboard
│   └── ...
│
├── 📂 fixtures/
│   ├── userFixture.ts            # Datos de usuarios de prueba
│   ├── productFixture.ts         # Datos de productos
│   └── ...
│
├── 📂 utils/
│   ├── helpers.ts                # Funciones auxiliares
│   ├── constants.ts              # Constantes globales
│   └── ...
│
├── 📂 reports/                    # Reportes generados (gitignore)
├── playwright.config.ts           # Configuración principal
├── package.json                   # Dependencias del proyecto
└── README.md                      # Este archivo
```

### ¿Por qué esta estructura?

| Carpeta | Propósito | Ventaja |
|---------|-----------|---------|
| **tests/** | Contiene los escenarios de prueba | Fácil localizar y ejecutar pruebas |
| **pages/** | Clases que representan páginas | Reutilizar código, cambios en un solo lugar |
| **fixtures/** | Datos y configuración compartida | Compartir datos entre tests, fácil actualizar |
| **utils/** | Funciones reutilizables | Evitar duplicación de código |
| **reports/** | Salida de reportes | Mantener el repositorio limpio |

## 🎯 Patrones de Diseño Implementados

### 1. Page Object Model (POM)

**¿Qué es?**
Cada página de la aplicación web se representa como una clase que encapsula:
- Selectores CSS/XPath
- Métodos de interacción
- Validaciones específicas de la página

**¿Por qué?**
- Los cambios en la UI se hacen en un solo lugar
- Los tests son más legibles
- Reutilización de código
- Mantenimiento más fácil

**Ejemplo:**

```typescript
// pages/LoginPage.ts
export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Selectores (privados para encapsulación)
  private usernameInput = '[data-testid="username"]';
  private passwordInput = '[data-testid="password"]';
  private loginButton = 'button:has-text("Login")';
  private errorMessage = '.error-message';

  // Métodos de interacción
  async login(username: string, password: string): Promise<void> {
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async getErrorMessage(): Promise<string> {
    return await this.page.textContent(this.errorMessage);
  }
}
```

**Ventajas:**
- Cambio de selector: Actualizar en 1 lugar en lugar de 10 tests
- Tests legibles: `await loginPage.login('user', 'pass')`
- Fácil debugging: Errores localizados rápidamente

### 2. BasePage (Clase Base)

**¿Qué es?**
Una clase padre con funcionalidades comunes a todas las páginas.

**¿Por qué?**
Evitar repetir código común en todas las clases de página.

```typescript
// pages/BasePage.ts
export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Métodos comunes
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async waitForNavigation(): Promise<void> {
    await this.page.waitForNavigation();
  }

  async isElementVisible(selector: string): Promise<boolean> {
    return await this.page.isVisible(selector);
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }
}
```

### 3. Fixtures (Setup y Teardown)

**¿Qué es?**
Configuración previa y limpieza después de cada test.

**¿Por qué?**
- Garantiza un estado limpio antes de cada test
- Evita que un test afecte otro
- Código reutilizable

```typescript
// playwright.config.ts
export const test = base.extend({
  context: async ({ browser }, use) => {
    // Setup: Antes de cada test
    const context = await browser.newContext();
    
    // El test usa el contexto
    await use(context);
    
    // Teardown: Después de cada test
    await context.close();
  },
});
```

## 📦 Models - Definir Tipos de Datos

### **Product.ts** - Interface

````typescript
export interface Product {
  name: string;
  supplierName: string;
  categoryName: string;
  unitsInStock: number;
  unitsOnOrder: number;
  reorderLevel: number;
}
````
---

**¿Por qué un interface?**

```typescript
// ✅ Con interface - Tenemos validación:
const product: Product = {
  name: "Laptop",
  supplierName: "Tech Corp",
  // ... sin falta campos, TypeScript avisa

// ❌ Sin interface - Podemos olvidar campos:
const product = {
  name: "Laptop"
  // Olvidamos otros campos, error en tests
}
```

---

## 🔧 Fixtures en Playwright - Explicación Detallada

### ¿Qué son los Fixtures?

Los fixtures son **datos y configuraciones reutilizables** que se comparten entre tests. Piensa en ellos como "preparación para la prueba".

### Tipos de Fixtures

#### 1. Fixtures de Autenticación

```typescript
// fixtures/authFixture.ts
export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    // Setup: Ir a login
    await page.goto('https://app.example.com/login');
    
    // Login automático
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="password"]', 'password123');
    await page.click('button:has-text("Login")');
    
    // Esperar a que cargue el dashboard
    await page.waitForURL('**/dashboard');
    
    // Ahora el test usa la página autenticada
    await use(page);
    
    // Teardown: Limpiar
    await page.context().close();
  }
});
```

**Uso en un test:**

```typescript
test('Usuario puede ver su perfil', async ({ authenticatedPage }) => {
  // No necesito hacer login, ya estoy autenticado
  await authenticatedPage.goto('https://app.example.com/profile');
  await expect(authenticatedPage.locator('h1')).toContainText('Mi Perfil');
});
```

**Ventaja:** No repites el login en 50 tests, lo haces una sola vez.

#### 2. Fixtures de Datos

```typescript
// fixtures/dataFixture.ts
export const test = base.extend({
  testUser: {
    username: 'testuser@example.com',
    password: 'SecurePassword123!',
    firstName: 'Juan',
    lastName: 'Pérez',
    phone: '+34 666 777 888'
  },
  
  testProduct: {
    id: '12345',
    name: 'Laptop Pro',
    price: 1299.99,
    quantity: 1
  }
});
```

**Uso:**

```typescript
test('Comprar producto', async ({ page, testUser, testProduct }) => {
  await page.goto('https://shop.example.com');
  await page.click(`product-${testProduct.id}`);
  // ...
});
```

#### 3. Fixtures Dinámicas (Más Avanzadas)

```typescript
// fixtures/databaseFixture.ts
export const test = base.extend({
  db: async ({}, use) => {
    // Setup: Conectar a BD
    const db = new Database();
    await db.connect();
    
    // Usar en el test
    await use(db);
    
    // Teardown: Desconectar
    await db.disconnect();
  }
});
```

## 📊 Uso y Ejecución

### Ejecutar Todas las Pruebas

```bash
npx playwright test
```

**Qué sucede:**
- Ejecuta todos los tests en paralelo
- Prueba en Chrome, Firefox y Safari (si están configurados)
- Genera reportes automáticamente

### Ejecutar Pruebas Específicas

```bash
# Solo tests de autenticación
npx playwright test auth.spec.ts

# Solo un test específico
npx playwright test --grep "debe loguear correctamente"

# En un navegador específico
npx playwright test --project=chromium
```

### Modo Interactivo (UI Mode)

```bash
npx playwright test --ui
```

**Características:**
- Ver tests en tiempo real
- Pausar y reanudar
- Ver screenshots de cada paso
- Debuggear paso a paso

### Modo Debug (Inspector)

```bash
npx playwright test --debug
```

**Abre:**
- Inspector de Playwright
- Browser con DevTools
- Pausas en cada acción para inspeccionar

## 📈 Reportes de Pruebas

### ¿Dónde quedan los reportes?

Los reportes se generan en:
```
playwright-course.jm-consultant/
└── playwright-report/
    ├── index.html          # Página principal del reporte
    ├── data/
    └── resources/
```

### ¿Por qué se generan reportes?

- ✅ Documentación de ejecución
- ✅ Análisis de fallos
- ✅ Screenshots de errores
- ✅ Videos de pruebas fallidas
- ✅ Timeline de eventos

### Ver el Reporte

```bash
npx playwright show-report
```

Se abrirá automaticamente:
```
file:///C://Users//jbustamanteb//Proyectos//PlayWright//playwright-course.jm-consultant//playwright-report//index.html
```

### Contenido del Reporte

| Sección | Información |
|---------|------------|
| **Resumen** | Total tests, pasados, fallidos, skipped |
| **Timeline** | Duración de cada test |
| **Screenshots** | Capturas cuando hay errores |
| **Videos** | Grabación completa de tests fallidos |
| **Detalles** | Error messages, stack trace |
| **Trazabilidad** | En qué paso falló exactamente |

### Ejemplo de Estructura del Reporte

```
┌─────────────────────────────────────────────────┐
│ Playwright Test Report                          │
├─────────────────────────────────────────────────┤
│ Tests: 45 passed, 3 failed, 2 skipped    [4.2s] │
├─────────────────────────────────────────────────┤
│ ✅ auth.spec.ts                                 │
│    ✅ Login correctamente                       │
│    ✅ Recuperar contraseña                      │
│    ❌ Logout con errores                        │
│       └─ Error: Expected 'url' to contain...   │
│          📸 screenshot_1.png                    │
│          🎬 video_1.webm                        │
├─────────────────────────────────────────────────┤
│ ✅ checkout.spec.ts                             │
│    ✅ Completar compra                          │
│    ...                                          │
```

## 🛠️ Configuración Detallada

### playwright.config.ts - Explicación Línea por Línea

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // ¿Dónde están los tests?
  testDir: './tests',
  
  // ¿Cuántos tests en paralelo?
  fullyParallel: true,
  
  // Si un test falla, ¿parar o continuar?
  forbidOnly: process.env.CI === 'true',
  
  // ¿Reintentar tests fallidos?
  retries: process.env.CI ? 2 : 0,
  
  // ¿Cuántos workers paralelos?
  workers: process.env.CI ? 1 : undefined,
  
  // Tipo de reporte
  reporter: 'html',
  
  // Timeout global (en milisegundos)
  timeout: 30 * 1000,
  
  // Timeout para expect
  expect: { timeout: 5000 },
  
  // Configuración de navegadores
  use: {
    // URL base de tu app
    baseURL: 'http://localhost:3000',
    
    // Tamaño de ventana
    viewport: { width: 1280, height: 720 },
    
    // Registrar videos
    video: 'retain-on-failure',
    
    // Hacer screenshots
    screenshot: 'only-on-failure',
    
    // Traceback de acciones
    trace: 'on-first-retry',
  },
  
  // Proyectos (navegadores)
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
```

## 📚 Mejores Prácticas

### 1. Selectores Robustos

**❌ Malo (Frágil):**
```typescript
// Si cambia el CSS, el test falla
await page.click('.btn-container > div > button');
```

**✅ Bueno (Robusto):**
```typescript
// Usa atributos data-testid
await page.click('[data-testid="login-button"]');
```

### 2. Esperas Explícitas

**❌ Malo (Esperar siempre):**
```typescript
await page.waitForTimeout(5000); // ¿Por qué 5 segundos?
```

**✅ Bueno (Esperar a algo específico):**
```typescript
// Esperar hasta que el elemento esté visible
await page.waitForSelector('[data-testid="success-message"]');
```

### 3. Assertions Descriptivos

**❌ Malo (No claro):**
```typescript
expect(result).toBe(true);
```

**✅ Bueno (Claro y específico):**
```typescript
await expect(page.locator('.success-message')).toContainText('Compra completada');
```

### 4. Tests Independientes

**❌ Malo (Tests dependientes):**
```typescript
test('Crear usuario', () => { /* ... */ });
test('Loguear usuario creado', () => { 
  // Este test depende del anterior
});
```

**✅ Bueno (Tests independientes):**
```typescript
test('Crear y loguear usuario', async ({ page, testUser }) => {
  // Crear usuario al inicio del test
  // Loguear
  // Validar
  // Todo es independiente
});
```

## ❓ FAQ para Principiantes

### P: ¿Por qué mis tests pasan localmente pero fallan en CI?

**R:** Posibles causas:
- Diferencias en velocidad de red
- Diferencias en resolución de pantalla
- Errores de timing (esperas insuficientes)
- Rutas hardcodeadas en lugar de variables de entorno

**Solución:**
```typescript
// ✅ Usar variables de entorno
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// ✅ Usar esperas explícitas
await page.waitForSelector('[data-testid="element"]');
```

### P: ¿Cómo debuggeo un test que falla?

**R:** Varias formas:

1. **Modo debug:**
   ```bash
   npx playwright test --debug auth.spec.ts
   ```

2. **Agregar pausas:**
   ```typescript
   await page.pause(); // Se abre el inspector
   ```

3. **Ver screenshots:**
   ```bash
   npx playwright show-report
   ```

### P: ¿Cuál es la diferencia entre .click() y .press()?

**R:**
- `.click()` - Simula click del mouse (útil para botones)
- `.press()` - Simula presionar tecla (útil para Enter, Tab, etc.)

```typescript
await page.click('[data-testid="login-button"]');  // Click
await page.press('[data-testid="password"]', 'Enter'); // Tecla Enter
```

### P: ¿Por qué mis tests son lentos?

**R:** Causas comunes:
- No usar esperas explícitas (Playwright espera más de lo necesario)
- Screenshots/Videos en cada test
- No ejecutar en paralelo
- Muchos tests en un solo archivo

**Optimización:**
```typescript
// playwright.config.ts
use: {
  screenshot: 'only-on-failure',  // Solo en fallos
  video: 'retain-on-failure',     // Solo en fallos
},
fullyParallel: true,              // Ejecutar en paralelo
workers: 10,                       // Más workers
```

### P: ¿Cómo manejo diferentes ambientes (dev, staging, prod)?

**R:**
```typescript
// playwright.config.ts
const env = process.env.ENV || 'dev';
const baseURL = {
  dev: 'http://localhost:3000',
  staging: 'https://staging.example.com',
  prod: 'https://app.example.com'
}[env];

export default defineConfig({
  use: { baseURL }
});
```

```bash
ENV=staging npx playwright test
```

### P: ¿Cómo hago testing de login sin grabar credenciales?

**R:**
```typescript
// fixture/authFixture.ts
export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    // Usar variables de entorno
    const email = process.env.TEST_EMAIL;
    const password = process.env.TEST_PASSWORD;
    
    if (!email || !password) {
      throw new Error('TEST_EMAIL y TEST_PASSWORD no están definidos');
    }
    
    await page.goto('/login');
    await page.fill('[name="email"]', email);
    await page.fill('[name="password"]', password);
    await page.click('button:has-text("Login")');
    
    await use(page);
  }
});
```

```bash
# .env
TEST_EMAIL=test@example.com
TEST_PASSWORD=securePassword123
```

## 🎓 Ventajas de esta Arquitectura

| Ventaja | Explicación |
|---------|------------|
| **Mantenibilidad** | Cambios en la UI: actualizar 1 archivo en vez de 50 tests |
| **Escalabilidad** | Fácil agregar nuevos tests sin duplicar código |
| **Legibilidad** | Tests se leen como "historias" en lugar de "código técnico" |
| **Reutilización** | Fixtures compartidas evitan repetición |
| **Confiabilidad** | Esperas explícitas = menos falsos negativos |
| **Debugging** | Fácil encontrar dónde falló exactamente |
| **CI/CD** | Reportes automáticos y claros |
| **Documentación** | El código documenta la aplicación |

---

**Última actualización:** 2026
**Versión de Playwright:** 1.40+
**Versión de Node:** 16+
