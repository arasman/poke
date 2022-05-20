const Pokemon = ({pokemonData}) => {
    console.log(pokemonData)
    return(
        <p>lala</p>
    )
}

export default Pokemon

//SSR: Server Side Rendering
//It requires the presence of the component called getServerSideProps
//{params} Parameter: Is used as part of the url like /pokemon/150   in this case 150 is a parameter, which corresponds to [id].js
//{query} Query string: Is the param-values after ?. But {query} includes both
export const getServerSideProps = async ({params}) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${params.id}`
    const response = await fetch(url)
    const data = await response.json()
    return {
        props: {pokemonData: data}
    }
}