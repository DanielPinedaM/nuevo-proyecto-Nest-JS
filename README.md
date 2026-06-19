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

comando                | apunta a...   | ruta archivo
---------------------- | ------------- | -------------
node --run start:local | local host    | `environments/.env.localhost`
node --run start:test  | pruebas       | `environments/.env.test`
node --run start:prod  | producción    | `environments/.env.production`

# 🚀 Generar build (dist) para desplegar

comando               | apunta a...   | ruta archivo
--------------------- | ------------- | -------------
node --run build:test | pruebas       | `environments/.env.test`
node --run build:prod | producción    | `environments/.env.production`

# 🤖 Uso de IA

> [!WARNING]
> # ⚠️ ****IMPORTANTE**** 🚨
>
> ****Ignorar esta sección ocasionará que la IA genere código que no respete la arquitectura, estructura ni las convenciones del proyecto, produciendo código inconsistente y desordenado.****

Esta sección está diseñada para utilizarse como contexto en herramientas de IA como Chat GPT, Claude, Gemini, Antigravity, etc.

Antes de realizar cualquier consulta relacionada con este proyecto en una IA, se debe proporcionar este contexto completo para que la herramienta pueda entender y respetar las reglas establecidas.

Es recomendable ****utilizar IA desde la terminal (bash)**** y no en interfaces graficasa web ni aplicaciones de escritorio.

No es recomendable usar herramientas de IA mediante interfaces gráficas como:

* [Open Code Desktop](https://youtu.be/_SVSv2Y59P0?si=auL72MgiH7cyg37J)

* [GPT Codex Desktop](https://youtu.be/bgx8ownl3O4?si=IIRgtKcmLaHW_Jc0)
* [Chat GPT desde la interfaz web](https://chatgpt.com/)

* [Claude Desktop](https://youtu.be/DYwZy7VNKws?si=h8dUgpeITRXuf9G1)
* [Claude desde la interfaz web](https://chat.chatbotapp.ai/claude)

* [Google AI Studio](https://aistudio.google.com/)

* Chats con interfaces gráficas equivalentes

Siempre usar la IA en la terminal (bash)

***Ejemplos:***

* Chat GPT desde la interfaz web → usar [GPT Codex CLI](https://youtu.be/Ub-K1n4YYsg?si=AECFbRb8VmaquZYr)
* Claude desde la interfaz web → usar [Claude Code](https://youtu.be/Bf7hfpItrDk?si=v05Cqqe4yW3vJBgx)
* Google AI Studio → usar [Antigravity CLI](https://youtu.be/bdEqIchP4x4?si=o0-bS58bZbuPP99d)

La terminal permite que la IA tenga:
* Mayor contexto del proyecto

* Estructura completa del código

* Acceso al sistema operativo (archivos y carpetas)

* Realizar cambios respetando la arquitectura del proyecto.

## Uso de Git y de IA

Siempre realizar un commit antes de solicitar modificaciones a la IA.

Esto evita acumular cambios sin control y permite tener trazabilidad clara de lo que la IA modifica.

Trabajar bajo el principio:

> 1 commit = 1 feature

## Contexto para la IA
Este contenido puede utilizarse dentro de archivos de configuración como:

* `CLAUDE.md`
* Archivos equivalentes de instrucciones para otras herramientas de IA

Al copiar este contenido hacia una herramienta de IA:

* Copiar únicamente desde esta sección hacia abajo.
* Copiar todas las secciones posteriores completas sin omitir reglas.
* No copiar secciones anteriores de este `README.md`.
* Antes de pegarlo en la IA, eliminar los emojis del README.md

# `CLAUDE.md`

# 🌐 Reglas de idioma

* Responder siempre en español.
* Redactar explicaciones y documentación en español.
* Escribir código en inglés.
* Mantener el código, identificadores, nombres de archivos, clases, interfaces, métodos, funciones y variables en inglés.
* No traducir términos técnicos de uso común en desarrollo de software (por ejemplo: middleware, service, controller, repository, signal, interceptor, provider, endpoint, payload, etc).
* No traducir nombres de frameworks, librerías, APIs ni patrones de diseño.

## Stack Backend del Proyecto

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
