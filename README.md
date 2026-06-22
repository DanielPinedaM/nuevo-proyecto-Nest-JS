# 🐈 Nest JS 11 + Prisma + PostgreSQL

# 🟢 Versión de Node JS

Este proyecto debe ejecutarse utilizando:

```bash
Node JS 24.16.0
```

# 📦 Instalar Paquetes

```console
npm i
```

# ▶️ Ejecutar proyecto

| comando                | apunta a...   | ruta archivo                   |
| ---------------------- | ------------- | ------------------------------ |
| node --run start:local | local host    | `environments/.env.localhost`  |
| node --run start:test  | pruebas       | `environments/.env.test`       |
| node --run start:prod  | producción    | `environments/.env.production` |

# 🚀 Generar build (dist) para desplegar

| comando               | apunta a...   | ruta archivo                   |
| --------------------- | ------------- | ------------------------------ |
| node --run build:test | pruebas       | `environments/.env.test`       |
| node --run build:prod | producción    | `environments/.env.production` |

# 🤖 Uso de IA

> [!WARNING]
> # ⚠️ ****IMPORTANTE**** 🚨
>
> ****Ignorar esta sección ocasionará que la IA genere código que no respete la arquitectura, estructura ni las convenciones del proyecto, produciendo código inconsistente, desordenado y con malas practicas****

Esta sección está diseñada para utilizarse como contexto en herramientas de IA.

## Principales Herramientas de IA para Desarrollo de Software

| Empresa ↓ \ Plataforma → | Web                                                                                     | Desktop                                                               | Terminal / Bash / CLI                                              |
| ------------------------ | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------ |
| Anthropic                | [Claude Web](https://claude.ai/)                                                        | [Claude Desktop](https://youtu.be/DYwZy7VNKws?si=cXTPumpZ3Jr9rNn9)    | [Claude Code](https://youtu.be/Bf7hfpItrDk?si=wjUIcIgtDX_Loyey)    |
| Open AI                  | [Chat GPT](https://chatgpt.com/)                                                        | [GPT Codex Desktop](https://youtu.be/bgx8ownl3O4?si=TzbOntfYIBVN1PGU) | [Codex](https://youtu.be/Ub-K1n4YYsg?si=EoIXGCzEa4ZxyRqA)          |
| Google                   | [Google AI Studio](https://aistudio.google.com/) / [Gemini](https://gemini.google.com/) | [Antigravity 2.0](https://antigravity.google/product/antigravity-2)   | [Antigravity CLI](https://youtu.be/bdEqIchP4x4?si=gRf6iLggXuzy_cq) |
| Anomaly Innovations      | [`opencode web`](https://opencode.ai/docs/web/)                                         | [Open Code Desktop](https://youtu.be/_SVSv2Y59P0?si=LT2S0z10t1FBxlB6) | [Open Code CLI](https://youtu.be/2gO8WyctqMk?si=aNvHlf23tKfrN-Z3)  |

## Recomendación

Usar la IA en el siguiente orden:

1. Chat GPT para mejorar el prompt antes de enviarselo a Claude Code.
2. Claude Code para editar el código.
3. Chat GPT para realizar preguntas sobre el código.

## Razón

Como Chat GPT es gratis, se recomienda utilizarlo para mejorar el prompt antes de enviarlo a Claude Code, lo que permite que Claude haga mejores modificaciones en el código. Además Chat GPT, puede usarse para resolver dudas sobre el código sin consumir los tokens de Claude Code.

No significa que no se pueda utilizar la IA del CLI para hacer preguntas. La razón para no hacerlo es ahorrar tokens.

No es obligatorio utilizar el CLI de Claude Code, pero sí es necesario pagar una IA y utilizar un CLI.

La razón por la que es necesario pagar una IA es que este `README.md` es muy extenso y las IAs gratuitas tienen limitaciones.

## Edición de Código

Evitar copiar y pegar código desde una plataforma web de IA. Siempre utilizar el CLI para editar el código, ya que el CLI tiene:

* Mayor contexto del proyecto.
* Conocimiento de la estructura completa del código.
* Acceso al sistema operativo (archivos y carpetas).
* Capacidad para realizar cambios respetando la arquitectura del proyecto.

## Uso de Git y de IA

Por cada feature terminada hacer un commit antes de solicitar nuevas modificaciones a la IA. Evita acumular demasiados cambios, ya que puedes perder el contexto de lo que la IA está realizando y cometer errores.

Trabajar bajo el principio:

> 1 commit = 1 feature

## Contexto para la IA
Antes de realizar cualquier pregunta sobre este proyecto en una IA, se debe proporcionar este contexto completo para que la IA pueda seguir la arquitectura del proyecto.

Este contenido puede utilizarse dentro de archivos de configuración como:

* `CLAUDE.md`
* Archivos equivalentes de instrucciones para otras IA

Al copiar este contenido hacia una IA:

* Copiar únicamente desde esta sección hacia abajo.
* Copiar todas las secciones posteriores completas sin omitir reglas.
* No copiar secciones anteriores de este `README.md`.
* Antes de pegarlo en la IA, eliminar todos los emojis del `README.md`.

# `CLAUDE.md`

# 🌐 Reglas de idioma

* Responder siempre en español.
* Redactar explicaciones y documentación en español.
* Escribir código en inglés.
* Mantener el código, identificadores, nombres de archivos, clases, interfaces, métodos, funciones y variables en inglés.
* No traducir términos técnicos de uso común en desarrollo de software (por ejemplo: middleware, service, controller, repository, signal, interceptor, provider, endpoint, payload, etc).
* No traducir nombres de frameworks, librerías, APIs ni patrones de diseño.

## Stack Backend del Proyecto

* Node JS 24.16.0
* Nest JS 11
* TypeScript 6
* Prisma ORM
* PostgreSQL

## Reglas Obligatorias para la IA

* No generes análisis, recomendaciones ni comentarios adicionales hasta que empiece a realizar preguntas.

* Todas las respuestas, recomendaciones y fragmentos de código deben respetar obligatoriamente la arquitectura, reglas, patrones y convenciones definidas en este documento.

* No cuestiones, reemplaces, contradigas ni ignores las decisiones de arquitectura definidas en este proyecto.

* Siempre que respondas con código, debes indicar explícitamente la ubicación exacta de cada archivo basándote en la estructura base del proyecto definida en este documento.

* Si existe alguna ambigüedad, falta de contexto o algún aspecto importante de arquitectura, estructura o convenciones que no esté definido, primero debes preguntar antes de asumir una implementación.

* Si durante la conversación recibes instrucciones contradictorias, debes priorizar siempre las reglas y decisiones definidas inicialmente en este documento.

* La arquitectura, reglas y convenciones definidas en este documento tienen prioridad absoluta. Sin embargo, como no todos los casos posibles están documentados, si un problema no puede resolverse respetando la arquitectura actual o requiere una solución no contemplada en el README, primero debes advertir explícitamente que dicha solución se sale de la arquitectura o convenciones establecidas antes de generar una implementación.
