import type { FavoritePokemon } from "@interfaces/favorite-pokemon";
import { useState } from "react";


interface Props {
    pokemon: FavoritePokemon;
}


export const FavoritePokemonCard = ({ pokemon }: Props) => {

    const [isVisible, setIsVisible] = useState(true);

    const imageSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`;

    const handleDelete = () => {
        const favorites = JSON.parse(localStorage.getItem("favorites") ?? '[]') as FavoritePokemon[];
        const newFavorites = favorites.filter(pokemon => pokemon.id !== pokemon.id);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        setIsVisible(false)
    }

    return (
        <>
            {
                isVisible && (
                    <div className="flex flex-col justify-center items-center">
                        <a href={`/pokemons/${pokemon.name}`}>
                            <img
                                src={imageSrc}
                                alt={pokemon.name}
                                width={96}
                                height={96}
                                style={{
                                    viewTransitionName: `${pokemon.name}-image`
                                }} />
                            <p className="capitalize"> #{pokemon.id} {pokemon.name} </p>
                        </a>
                        <button className="text-red-400" onClick={handleDelete}>Borrar</button>

                    </div>
                )
            }
        </>
    )
}
