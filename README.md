# fh_practice - Pokedex Estatica con Astro

Aplicacion web estatica construida con Astro que consume la PokeAPI para listar pokemones y generar paginas de detalle por cada pokemon.

## Objetivo tecnico

- Generar una lista de pokemones en la home usando datos remotos.
- Crear rutas estaticas dinamicas (`/pokemons/[name]`) durante build.
- Reutilizar componentes y tipado TypeScript para mantener consistencia.

## Stack

- Astro `^5.17.1`
- TypeScript (tipado de respuestas de API)
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Axios `^1.13.5`

## Scripts

- `pnpm dev`: levanta entorno local en `http://localhost:4321`
- `pnpm build`: genera salida de produccion en `dist/`
- `pnpm preview`: sirve el build localmente

## Estructura del proyecto

```text
.
|-- public/
|   |-- favicon.ico
|   `-- favicon.svg
|-- src/
|   |-- components/
|   |   `-- pokemons/
|   |       `-- PokemonCard.astro
|   |-- interfaces/
|   |   `-- pokemos-list.response.ts
|   |-- layouts/
|   |   `-- MainLayout.astro
|   |-- pages/
|   |   |-- index.astro
|   |   `-- pokemons/
|   |       `-- [name].astro
|   `-- styles/
|       `-- global.css
|-- astro.config.mjs
`-- package.json
```

## Arquitectura y flujo de datos

1. `src/pages/index.astro`
- Hace request a `https://pokeapi.co/api/v2/pokemon`.
- Tipa la respuesta con `PokemonListResponse`.
- Renderiza cada elemento con `PokemonCard`.

2. `src/pages/pokemons/[name].astro`
- Implementa `getStaticPaths`.
- Solicita `https://pokeapi.co/api/v2/pokemon?limit=151`.
- Genera rutas estaticas para los primeros 151 pokemones.
- Usa `url` como `props` para derivar `id` y construir el audio del grito.

3. `src/components/pokemons/PokemonCard.astro`
- Componente presentacional reutilizable.
- Obtiene `id` parseando la `url` de PokeAPI.
- Construye URL de artwork oficial desde GitHub de PokeAPI.
- Navega a `/pokemons/{name}`.

4. `src/layouts/MainLayout.astro`
- Define layout base, metadatos y estilos globales.

## Endpoints consumidos

- Lista base:
  - `GET https://pokeapi.co/api/v2/pokemon`
- Lista para rutas estaticas:
  - `GET https://pokeapi.co/api/v2/pokemon?limit=151`
- Recursos derivados por ID:
  - Imagen: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{id}.png`
  - Audio: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/{id}.ogg`

## Ejecucion local

### Requisitos

- Node.js 18+
- pnpm 8+

### Pasos

```bash
pnpm install
pnpm dev
```

Abrir `http://localhost:4321`.

## Consideraciones tecnicas

- El proyecto genera contenido estatico; los datos se resuelven en build para rutas dinamicas.
- Si la API externa falla durante build, la generacion de paginas puede fallar.
- `PokemonCard` actualmente incluye `console.log(imageSrc)`; recomendable removerlo para evitar ruido en logs.
- El nombre del archivo `pokemos-list.response.ts` parece tener un typo (`pokemos` vs `pokemons`), pero no afecta funcionalidad actual mientras las importaciones coincidan.

## Mejoras sugeridas

- Manejo de errores y estados vacios al consumir API.
- Parametrizar el limite de pokemones por variable de entorno.
- Agregar pruebas de integracion de rutas estaticas.
- Añadir validacion de tipos runtime para respuestas externas.

## Licencia

Uso educativo / practica.
