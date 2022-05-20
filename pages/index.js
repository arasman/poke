const Pokemon = ({pokemon}) => {
  return(
    <li>{pokemon.name}</li>
  )
}
export default function Pokemones({pokemonesInfo}) {
  console.log(pokemonesInfo)
  return (
    <div>
      <p>Pokemones</p>
      <ul>
        {pokemonesInfo.map(pokemon => <Pokemon pokemon={pokemon} key={pokemon.name}/>)}
      </ul>
    </div>
  )
}

//Next when detects the presence of this component implies that it is going to perform a static rendering
//when the command npm run build is executed, this page is going to be generated as static page like index.html which is presented to the user-browser, but the user navigates to other page is going to be delivery to user-browser the index.js so react could interpret it later.
//SSG = Static site generation
export const getStaticProps = async () => {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=151'
  const response = await fetch(url)
  const data = await response.json()

  //props is required otherwise it wont be passed to the component which is going to use it which in this case is Pokemones.
  return {
    props: {pokemonesInfo: data.results}
  }
}