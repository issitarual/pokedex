import { useEffect, useState, createContext, useContext } from "react";
import axios from "axios";

import UserContext from "../contexts/UserContext";

const PokemonsContext = createContext();
export default PokemonsContext;

export function PokemonsProvider({ children }) {
    const { token } = useContext(UserContext);
    const [pokemons, setPokemons] = useState(null);

    useEffect(() => {
        updatePokemons();
    }, [token?.token]);

    function updatePokemons() {
        axios.get(`https://back-end-pokedex.herokuapp.com/pokemons`, {
            headers: {
                Authorization: `Bearer ${token?.token}`
            }
        }).then(response => {
            setPokemons(response.data);
        });
    }

    return (
        <PokemonsContext.Provider value={{ pokemons, updatePokemons }}>
            {children}
        </PokemonsContext.Provider>
    );
}
