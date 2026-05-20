# ⚠️ Advertencia: 🚨

Debido a que la IA no conoce las convenciones ni la arquitectura de este proyecto, antes de hacer preguntas a una IA (Chat GPT, Claude, Gemini, etc.), primero debes copiar y pegar completo este README.md en la IA para que las respuestas de la IA y el código generado sigan las buenas prácticas y se alineen correctamente con la arquitectura del proyecto.

Desobedecer esta advertencia hace que el código generado sea desordenado, inconsistente y no siga las convenciones definidas en el proyecto.

# 🐈 Nest JS 11

usar Node JS 24.15.0

Nombre de clases, variables, interfaces, funciones EN INGLÉS.

Elemento                     | Convención de nombre 
-----------------------------|----------------------
Clases                       | PascalCase
Interfaces                   | PascalCase
Funciones                    | camelCase
Variables                    | camelCase
Propiedades                  | camelCase
Archivos                     | minúsculas
Nombres tablas base de datos | PascalCase

# 📦 Instalar paquetes del proyecto

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
