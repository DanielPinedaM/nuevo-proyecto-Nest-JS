# 🐈 Nest JS 11

usar NodeJS 24.11.1

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

## 📦 Instalar paquetes del proyecto

```console
npm i
```

## ▶️ Ejecutar proyecto

comando                | apunta a...   | ruta archivo
---------------------- | ------------- | -------------
node --run start:local | local host    | environments/.env.localhost
node --run start:test  | pruebas       | environments/.env.test
node --run start:prod  | producción    | environments/.env.production

## 🚀 Generar build (dist) para desplegar

comando               | apunta a...   | ruta archivo
--------------------- | ------------- | -------------
node --run build:test | pruebas       | environments/.env.test
node --run build:prod | producción    | environments/.env.production
