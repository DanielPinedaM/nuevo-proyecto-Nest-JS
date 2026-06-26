# 🐈 Stack Backend del Proyecto
A continuación, se presenta un resumen de las tecnologías principales del proyecto. No incluye la totalidad de dependencias:

* Node JS 24.18.0
* Nest JS 11
* TypeScript 6
* Prisma ORM 7
* PostgreSQL 18

# ⚙️ Configurar lo Siguiente **UNA SOLA VEZ**

## Antes de Empezar
Para que la configuración funcione, debes tener instalado:
* VS Code o cualquier editor basado en VS Code (Antigravity, Cursor, Windsurf, etc.)

* Git Bash

* Node.js

* Claude Code

## Instalar `pnpm`
1. Abrir Git Bash

2. Instalar:

```console
npm install -g pnpm@latest-11
```

3. Cerrar y volver abrir Git Bash

4. Si la instalacion es correcta, al ejecutar

```console
pnpm -v
```

Debe mostrar la version de `pnpm` instalada

## `fnm`
Para que `fnm` automáticamente al entrar a la carpeta del proyecto seleccione la versión correcta de Node.js que se especifica en el archivo `.nvmrc` que esta en la raiz del proyecto. Hacer esto:

1. Abrir Git Bash.

2. Instalar Node.js 24.18.0:

```console
fnm install 24.18.0
```

3. Copiar completo el siguiente comando y ejecutarlo:

```console
echo 'eval "$(fnm env --use-on-cd)"' >> ~/.bashrc
source ~/.bashrc
```

4. Cerrar y volver abrir Git Bash

5. Para verificar que funcione ejecutar los siguientes comandos en el siguiente orden:

```console
cd /ruta/a/tu/proyecto
```

```console
fnm current
```

```console
node -v
```

6. Debería mostrarte `v24.18.0` automáticamente, sin que hayas escrito manualmente

```console
fnm use 24.18.0
```

## ⌨️ Autocompletado, Formatear Código y Linter
Instalar las siguientes extensiones:

* [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)

* [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)

* [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

La configuración de autocompletado, formateo de código y linter ya está incluida en los siguientes archivos. No es necesario realizar modificaciones adicionales:

* `.vscode/settings.json`
* `.editorconfig`
* `.prettierrc`
* `eslint.config.mjs`

# 🤖 Uso de IA

> [!WARNING]
> # ⚠️ ****IMPORTANTE**** 🚨
>
> ****Ignorar esta sección ocasionará que la IA genere código que no respete la arquitectura, estructura ni las convenciones del proyecto, produciendo código inconsistente, desordenado y con malas practicas****

Esta sección está diseñada para utilizarse como contexto en herramientas de IA.

## Principales IA para Desarrollo de Software

| Empresa ↓ \ Plataforma → | Web                                                                                     | Desktop                                                               | Terminal / Bash / CLI                                              |
| ------------------------ | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Anthropic                | [Claude Web](https://claude.ai/)                                                        | [Claude Desktop](https://youtu.be/DYwZy7VNKws?si=cXTPumpZ3Jr9rNn9)    | [Claude Code](https://youtu.be/Bf7hfpItrDk?si=wjUIcIgtDX_Loyey)    |
| Open AI                  | [Chat GPT](https://chatgpt.com/)                                                        | [GPT Codex Desktop](https://youtu.be/bgx8ownl3O4?si=TzbOntfYIBVN1PGU) | [Codex](https://youtu.be/Ub-K1n4YYsg?si=EoIXGCzEa4ZxyRqA)          |
| Google                   | [Google AI Studio](https://aistudio.google.com/) / [Gemini](https://gemini.google.com/) | [Antigravity 2.0](https://antigravity.google/product/antigravity-2)   | [Antigravity CLI](https://youtu.be/bdEqIchP4x4?si=gRf6iLggXuzy_cq) |
| Anomaly Innovations      | [`opencode web`](https://opencode.ai/docs/web/)                                         | [Open Code Desktop](https://youtu.be/_SVSv2Y59P0?si=LT2S0z10t1FBxlB6) | [Open Code CLI](https://youtu.be/2gO8WyctqMk?si=aNvHlf23tKfrN-Z3)  |

## 💡 Recomendación

Usar la IA en el siguiente orden:

1. Chat GPT para mejorar el prompt antes de enviarselo a Claude Code.
2. Claude Code para editar el código.
3. Chat GPT para realizar preguntas sobre el código.

## 🧠 Razón
Como Chat GPT es gratis, se recomienda utilizarlo para mejorar el prompt antes de enviarlo a Claude Code, lo que permite que Claude haga mejores modificaciones en el código. Además Chat GPT, puede usarse para resolver dudas sobre el código sin consumir los tokens de Claude Code.

No significa que no se pueda utilizar la IA del CLI para hacer preguntas. La razón para no hacerlo es ahorrar tokens.

No es obligatorio utilizar el CLI de Claude Code, pero sí es necesario pagar una IA y utilizar un CLI.

La razón por la que es necesario pagar una IA es que este `README.md` es muy extenso y las IAs gratuitas tienen limitaciones.

## ✏️ Edición de Código
Evitar copiar y pegar código desde una plataforma web de IA. Siempre utilizar el CLI para editar el código, ya que el CLI tiene:

* Mayor contexto del proyecto.
* Conocimiento de la estructura completa del código.
* Acceso al sistema operativo (archivos y carpetas).
* Capacidad para realizar cambios respetando la arquitectura del proyecto.

## 🌿 Uso de Git y de IA
Por cada feature terminada hacer un commit antes de solicitar nuevas modificaciones a la IA. Evita acumular demasiados cambios, ya que puedes perder el contexto de lo que la IA está realizando y cometer errores.

Trabajar bajo el principio:

> 1 commit = 1 feature

## 📋 Contexto para la IA
Antes de realizar cualquier pregunta sobre este proyecto en una IA, se debe proporcionar este contexto completo para que la IA pueda seguir la arquitectura del proyecto.

Este contenido puede utilizarse dentro de archivos de configuración como:

* `CLAUDE.md`
* Archivos equivalentes de instrucciones para otras IA

Al copiar este contenido hacia una IA:

* Copiar todas las secciones posteriores completas sin omitir reglas.
* No copiar secciones anteriores de este `README.md`.
* Antes de pegarlo en la IA, eliminar todos los emojis del `README.md`.
* Copiar únicamente desde esta sección hacia abajo ⬇️

# `CLAUDE.md`

# ⚙️ Entorno de Ejecución
Obligatorio el uso de Node.js, prohibido usar alternativas como:

* Bun
* Deno

# 📦 Manejador de Paquetes
Obligatorio el uso de `pnpm` y `pnpm-lock.yaml` version `>=11.0.0 <12.0.0`. Esta **BLOQUEADO** el uso de otras alternativas como:

* npm
* npx
* package-lock.json
* yarn

# 🟢 Administrador de Versiones para Node.js
Obligatorio el uso de `fnm`. Está prohibido usar alternativas como:

* nvm
* volta

Este proyecto usa Node.js 24.18.0

# 🔗 Alias
Para todos los comandos de `pnpm` usar el alias `pn`

# 📦 Instalar Paquetes

```console
pn i
```

# ▶️ Ejecutar Proyecto

| Comando          | Apunta a ...  | Ruta Archivo                   |
| ---------------- | ------------- | ------------------------------ |
| `pn start:local` | Local host    | `environments/.env.localhost`  |
| `pn start:test`  | Pruebas       | `environments/.env.test`       |
| `pn start:prod`  | Producción    | `environments/.env.production` |

# 🚀 Generar build (dist) para Desplegar

| Comando         | Apunta a ...  | Ruta Archivo                   |
| --------------- | ------------- | ------------------------------ |
| `pn build:test` | Pruebas       | `environments/.env.test`       |
| `pn build:prod` | Producción    | `environments/.env.production` |

# 🚫 Reglas Obligatorias para la IA

* No generes análisis, recomendaciones ni comentarios adicionales hasta que empiece a realizar preguntas.

* Todas las respuestas, recomendaciones y fragmentos de código deben respetar obligatoriamente la arquitectura, reglas, patrones y convenciones definidas en este documento.

* No cuestiones, reemplaces, contradigas ni ignores las decisiones de arquitectura definidas en este proyecto.

* Siempre que respondas con código, debes indicar explícitamente la ubicación exacta de cada archivo basándote en la estructura base del proyecto definida en este documento.

* Si existe alguna ambigüedad, falta de contexto o algún aspecto importante de arquitectura, estructura o convenciones que no esté definido, primero debes preguntar antes de asumir una implementación.

* Si durante la conversación recibes instrucciones contradictorias, debes priorizar siempre las reglas y decisiones definidas inicialmente en este documento.

* La arquitectura, reglas y convenciones definidas en este documento tienen prioridad absoluta. Sin embargo, como no todos los casos posibles están documentados, si un problema no puede resolverse respetando la arquitectura actual o requiere una solución no contemplada en el README, primero debes advertir explícitamente que dicha solución se sale de la arquitectura o convenciones establecidas antes de generar una implementación.

# 🌐 Reglas de Idioma
* Responder siempre en español. Es decir, redactar en español todas las explicaciones, respuestas, preguntas, descripciones, análisis, recomendaciones, documentación y mensajes dirigidos al usuario.

* Mantener en español el razonamiento explicativo que se muestra al usuario para justificar una respuesta o decisión.

* El razonamiento explicativo es generado y mostrado únicamente a criterio de la IA cuando sea necesario para justificar o aclarar una respuesta o decisión. Cuando este razonamiento se muestre al usuario, debe estar redactado en español.

* No traducir términos técnicos de uso común en desarrollo de software (por ejemplo: middleware, service, controller, repository, signal, interceptor, provider, endpoint, payload).

* No traducir nombres de frameworks, librerías, paquetes, APIs ni patrones de diseño.

* Mantener el código, identificadores, nombres de archivos, clases, interfaces, métodos, funciones y variables en inglés.

* Escribir el código en inglés.

* En Nest JS, las rutas URL de los endpoints se definen mediante el valor de `path` que se pasa al decorador `@Controller()` a nivel de clase y a los decoradores de método (`@Get()`, `@Post()`, `@Put()`, `@Patch()`, `@Delete()`).

* Escribir en inglés los nombres de archivos, carpetas y todos los valores de `path` de las rutas URL de los endpoints, siguiendo una arquitectura basada en features (feature architecture).

# 💾 Commits

## 🎯 Fuente Única de Verdad para los Commits
* La tabla de la sección "Emojis por Tipo de Commit" es la única fuente de verdad para construir cualquier commit. El tipo y el emoji deben seleccionarse exclusivamente desde sus filas.

* Antes de crear un commit, dar prioridad absoluta a la tabla: tomar siempre el tipo y el emoji desde ella.

* El uso de Conventional Commits y Gitmoji está estrictamente limitado a la tabla. Está prohibido usar tipos, emojis o definiciones que no aparezcan en ella.

* Está prohibido inventar nuevos tipos de commit, nuevos emojis o nuevas definiciones de commit.

* Si los cambios no encajan exactamente con ninguna fila de la tabla, está prohibido crear un tipo o un emoji nuevo. En ese caso, utilizar el tipo y el emoji existentes que más se aproximen a la intención real del cambio.

* Está prohibido eliminar, agregar, editar o alterar la tabla de la sección "Emojis por Tipo de Commit".

## ✍️ Formato del Mensaje de Commit
`<emoji>` `<type>`(`<scope>`): `<mensaje en español>`

El `<emoji>` siempre va al inicio, antes del `<type>`. A continuación del encabezado, escribir siempre el `body` como una lista de puntos con los cambios realizados.

Elementos obligatorios en todo commit:

* `<emoji>`: tomado de la tabla.

* `<type>`: tomado de la tabla y escrito en inglés.

* El único elemento opcional es `<scope>`, regido por la sección "Reglas para el Scope".

* `<mensaje en español>`: resumen conciso de lo que se hizo (`subject`), redactado en español.

* `body`: explicación descriptiva de los cambios realizados, redactada en español como una lista de puntos, no como un párrafo. Es obligatorio en todo commit.

* El `body` nunca debe ser idéntico al `<mensaje en español>`. El `<mensaje en español>` resume el cambio, mientras que el `body` lo detalla punto por punto. Aunque el cambio sea muy pequeño y ambos puedan parecer similares, desarrollar el `body` con los puntos concretos del cambio en lugar de repetir el `<mensaje en español>`.

## Ejemplo
El encabezado es el `<emoji> <type>(<scope>): <mensaje en español>` y, debajo, el `body` desarrolla los cambios como lista de puntos.

```
✨ feat(auth): agregar validación de token JWT

- Validar la firma y la expiración del token JWT antes de permitir el acceso.
- Rechazar las peticiones con un token ausente o inválido.
- Agregar mensajes de error específicos para cada caso de validación.
```

En este ejemplo, las líneas que comienzan con `-` son el `body`: detallan punto por punto lo que resume el `<mensaje en español>` "agregar validación de token JWT", sin repetirlo literalmente.

## Emojis por Tipo de Commit

| Tipo de commit | Emoji | Definición                                                                                                                                                                                                |
| ------------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| feat          | ✨ | Nueva funcionalidad o capacidad del sistema                                                                                                                                                                  |
| fix           | 🐛 | Corrección de errores o fallos                                                                                                                                                                               |
| hotfix        | 🚑 | Corrección urgente de errores críticos en producción                                                                                                                                                         |
| docs          | 📝 | Cambios únicamente en documentación: archivos Markdown, README.md, CLAUDE.md, carpeta docs, guías, manuales y contenido informativo                                                                          |
| style         | 💄 | Cambios visuales, estilos (CSS, Sass, Tailwind), maquetación, UI/UX, responsive, textos visibles, animaciones, transiciones sin modificar lógica del negocio                                                 |
| refactor      | ♻️ | Reestructuración del código sin cambiar comportamiento                                                                                                                                                       |
| perf          | ⚡ | Mejoras de rendimiento o eficiencia                                                                                                                                                                          |
| test          | ✅ | Creación o modificación de pruebas                                                                                                                                                                           |
| build         | 📦 | Cambios relacionados con build, compilación o empaquetado                                                                                                                                                    |
| ci            | 👷 | Cambios en integración continua o automatización de pipelines                                                                                                                                                |
| chore         | 🔧 | Cualquier cambio que no afecte la funcionalidad del proyecto: tareas de mantenimiento general, configuración del entorno o de herramientas, scripts, comentarios de código y archivos auxiliares, .gitignore |
| revert        | ⏪ | Reversión de cambios, versiones o despliegues anteriores                                                                                                                                                     |
| docker        | 🐳 | Cambios relacionados con Docker, Kubernetes y contenedores                                                                                                                                                   |
| deps          | ⬆️ | Cambios relacionados con dependencias: agregar, actualizar o eliminar paquetes del proyecto                                                                                                                  |
| wip           | 🚧 | Trabajo en progreso no finalizado                                                                                                                                                                            |
| init          | 🎉 | Inicialización del proyecto o configuración inicial                                                                                                                                                          |
| merge         | 🔀 | Integración de ramas, combinación de cambios y resolución de conflictos de Git                                                                                                                               |
| remove        | ⚰️ | Eliminación definitiva de código, archivos, carpetas, funcionalidades o dependencias que ya no son necesarias                                                                                                |
| i18n          | 🌐 | Internacionalización o traducciones                                                                                                                                                                          |
| lint          | 🎨 | Identación, formateo de código, análisis estático, reglas de calidad de código y configuración de herramientas como ESLint y Prettier sin modificar la lógica ni el comportamiento                           |
| accessibility | ♿ | Mejoras de accesibilidad                                                                                                                                                                                     |
| mock          | 🤡 | Cambios relacionados con mocks, datos simulados o datos quemados utilizados para pruebas y desarrollo                                                                                                        |

## Reglas para el Scope
* El `<scope>` es opcional.

* Cuando se use, escribir el `<scope>` en inglés.

* Antes de omitirlo, intentar determinarlo revisando los archivos modificados, las rutas, los nombres de carpetas y los módulos o features afectados.

* Usar el `<scope>` únicamente cuando la funcionalidad, el módulo o el área modificada pueda identificarse de forma clara y directa.

* No inventar un `<scope>` basado en suposiciones.

* No invertir demasiado tiempo en deducir un `<scope>` ambiguo.

* Si tras revisar los cambios no hay información suficiente para determinarlo con seguridad, omitir el `<scope>`.

Flujo para determinar el `<scope>`:

1. Revisar los archivos modificados.

2. Identificar la feature, el módulo o el área afectada.

3. Validar que el `<scope>` represente realmente el cambio realizado.

4. Si el `<scope>` es claro, usarlo.

5. Si el `<scope>` genera duda, omitirlo.

## Regla Cuando el Cambio no Coincide Exactamente con la Tabla
* Nunca omitir el emoji.

* Priorizar la coherencia semántica sobre la coincidencia exacta: elegir el tipo y el emoji de la tabla que mejor representen la intención del cambio.

## Mostrar el Commit Después de Realizarlo
Cuando se solicite hacer un commit desde un prompt, después de crearlo mostrar en la respuesta el encabezado con el formato `<emoji>` `<type>`(`<scope>`): `<mensaje en español>` y el `body` correspondiente al commit realizado.
