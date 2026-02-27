# fh_practice - Static Pokedex with Astro

Static web application built with Astro that consumes the PokeAPI to list Pokemon and generate detail pages for each one.

## Technical objective

- Render a Pokemon list on the home page using remote data.
- Create static dynamic routes (`/pokemons/[name]`) during build.
- Reuse components and TypeScript typing to keep consistency.

## Stack

- Astro `^5.17.1`
- TypeScript (API response typing)
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Axios `^1.13.5`

## Scripts

- `pnpm dev`: starts local development server at `http://localhost:4321`
- `pnpm build`: generates production output into `dist/`
- `pnpm preview`: serves the local production build

## Project structure

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

## Architecture and data flow

1. `src/pages/index.astro`
- Sends a request to `https://pokeapi.co/api/v2/pokemon`.
- Types the response as `PokemonListResponse`.
- Renders each item with `PokemonCard`.

2. `src/pages/pokemons/[name].astro`
- Implements `getStaticPaths`.
- Requests `https://pokeapi.co/api/v2/pokemon?limit=151`.
- Generates static routes for the first 151 Pokemon.
- Uses `url` as `props` to derive `id` and build cry audio URL.

3. `src/components/pokemons/PokemonCard.astro`
- Reusable presentational component.
- Gets `id` by parsing the PokeAPI `url`.
- Builds official artwork URL from PokeAPI GitHub assets.
- Links to `/pokemons/{name}`.

4. `src/layouts/MainLayout.astro`
- Defines base layout, metadata, and global styles.

## Consumed endpoints

- Base list:
  - `GET https://pokeapi.co/api/v2/pokemon`
- List used for static route generation:
  - `GET https://pokeapi.co/api/v2/pokemon?limit=151`
- ID-derived resources:
  - Image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/{id}.png`
  - Audio: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/{id}.ogg`

## Local setup

### Requirements

- Node.js 18+
- pnpm 8+

### Steps

```bash
pnpm install
pnpm dev
```

Open `http://localhost:4321`.

## Technical considerations

- The project generates static content; dynamic-route data is resolved at build time.
- If the external API fails during build, page generation can fail.
- `PokemonCard` currently includes `console.log(imageSrc)`; removing it is recommended to reduce log noise.
- File name `pokemos-list.response.ts` appears to have a typo (`pokemos` vs `pokemons`), but it does not break behavior as long as imports stay consistent.

## Suggested improvements

- Add API error handling and empty states.
- Parameterize Pokemon limit with an environment variable.
- Add integration tests for static routes.
- Add runtime schema validation for external API responses.

## License

Educational / practice use.
