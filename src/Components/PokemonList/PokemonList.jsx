import { useEffect, useState } from "react";
import axios from "axios";
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";
function PokemonList(){

    const [pokemonList , setPokemonList] = useState([]);
    const [isLoading , setIsLoading] = useState(true);
    const [pokedex_URL, setPokedexUrl]= useState('https://pokeapi.co/api/v2/pokemon');
    const [nextURL , setNextURL] = useState('');
    const [prevURL , setPrevURL] = useState('');



    
    
    async function downloadPokemons(){
        setIsLoading(true);
        const response = await axios.get(pokedex_URL); //This downloads list of 20 pokemons
        const pokemonResults = response.data.results; //We get the array of pokemons from result
        console.log(response.data);
        setNextURL(response.data.next);
        setPrevURL(response.data.previous);



        //Iterating over the array of pokemons , and using their url , to create an array of promises that will download those 20 pokemons
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url))
        //pokemonResultPromise has the promises of all the 20 URLs in tthe link above
        //Passing that promise array to axios.all
        const pokemonData = await axios.all(pokemonResultPromise);   //array of 20 pokemon detailed data 
        // await function is called when all the promises inside the link is fetched
        console.log(pokemonData);
        
        //now iterate on the data of each pokemon , and extract id , name , imnage and typesd
        const PokeListresult = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id ,
                name : pokemon.name , 
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types: pokemon.types 
            }
        });
        console.log(PokeListresult);
        setPokemonList(PokeListresult);
        setIsLoading(false); 
    }
    useEffect(() => {
        const fetchData = async () => {
            await downloadPokemons();
        };
        fetchData();
    }, [pokedex_URL]);
    // useEffect(async () => {
    //     downloadPokemons();
    // },[pokedex_URL]);   
    //useEffect expects a callback and a dependency array
    //An empty array says that , it is not dependent on anything , if dont pass an empty array then the useeffect will be called again and again 
    //If I pass x on the array , then it will only track changes of x only


    return(
        <div className="pokemon-list-wrapper">
            <div className="pokemon_wrapper">
                {(isLoading) ? 'Loading ...' : 
                    pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} />)
                }
            </div>
            <div className="controls">
                <button disabled={prevURL == null}  onClick={() => setPokedexUrl(prevURL)}>Prev</button>
                <button disabled={nextURL == null}  onClick={() => setPokedexUrl(nextURL)}>Next</button>

            </div>
        </div>
    );
}
export default PokemonList;













// function PokemonList(){

//     const [x, setX] = useState(0);
//     const [y, setY] = useState(0);

//     useEffect(() => {
//         console.log("Effect called")
//     },[x])   
//     //useEffect expects a callback and a dependency array
//     //An empty array says that , it is not dependent on anything , if dont pass an empty array then the useeffect will be called again and again 
//     //If I pass x on the array , then it will only track changes of x only


//     return(
//         <>
//         <div>
//             X: {x} <button onClick={ () => setX(x+1)}>Inc</button>
//         </div>
//         <div>
//             Y: {y} <button onClick={ () => setY(y+1)}>Dec</button>
//         </div>
//         </>
//     )
// }
