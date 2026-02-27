import type { FavoritePokemon } from "@interfaces/favorite-pokemon";
import { useState } from "react";
import { FavoritePokemonCard } from "./FavoritePokemonCard";

const getLocalStoragePokemons = (): FavoritePokemon[] => {
    const pokemons = JSON.parse(localStorage.getItem("favorites") ?? '[]');
    if (!pokemons) return [];
    return pokemons;
}


export const FavoritePokemons = () => {

    const [favoritePokemons, setFavoritePokemons] = useState(getLocalStoragePokemons());

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4">
            {
                favoritePokemons.map(pokemon => (
                    <FavoritePokemonCard pokemon={pokemon} />
                ))
            }
        </div>
    )
}