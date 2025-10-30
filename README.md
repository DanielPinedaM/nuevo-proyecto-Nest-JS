# Nest JS 11

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
nvm install 24.7.0
```

```console
nvm use 24.7.0
```

```console
npm i
```

## ▶️ Ejecutar proyecto

```console
nvm use 24.7.0
```

comando                | apunta a...   | ruta archivo
---------------------- | ------------- | -------------
node --run start:local | localhost     | environments/.env.localhost
node --run start:test  | pruebas       | environments/.env.test
node --run start:prod  | producción    | environments/.env.production

## 🚀 Generar build (dist) para desplegar

```console
nvm use 24.7.0
```

comando               | apunta a...   | ruta archivo
--------------------- | ------------- | -------------
node --run build:test | pruebas       | environments/.env.test
node --run build:prod | producción    | environments/.env.production
