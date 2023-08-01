# Next.js OpenJira App
Para correr localmente se necesita la base de datos
```
docker compose up -d
```
* El -d, significa __detached__

* MongoDB URL Local:
```
mongodb://localhost:27017
```

## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__

## LLenar la base de datos con información de pruebas

Llamara:
``` http://localhost:3000/api/seed ``` 

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.
