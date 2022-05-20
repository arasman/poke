import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
/*Possible error to include images out of the current site:
Unhandled Runtime Error
Error: Invalid src prop (https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png) on `next/image`, hostname "raw.githubusercontent.com" is not configured under images in your `next.config.js`
See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host
Before:
const nextConfig = {
  reactStrictMode: true,
}
After
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com']
  }
}
This change needs restart the server
*/
const Pokemon = ({pokemonData}) => {
    const router = useRouter()
    if (router.isFallback) {
      return <p>Loading...</p>
    }
    return(
        <div>
            <h1>{pokemonData.name} number #{pokemonData.id}</h1>
            <Image src={pokemonData.sprites.front_default} width={400} height={400}/>
            <Link href="/">Go back to the list</Link>
        </div>
    )
}

export default Pokemon

//SSR: Server Side Rendering
//It requires the presence of the component called getServerSideProps
//{params} Parameter: Is used as part of the url like /pokemon/150   in this case 150 is a parameter, which corresponds to [id].js
//{query} Query string: Is the param-values after ?. But {query} includes both
// export const getServerSideProps = async ({params}) => {
//     const url = `https://pokeapi.co/api/v2/pokemon/${params.id}`
//     const response = await fetch(url)
//     const data = await response.json()
//     return {
//         props: {pokemonData: data}
//     }
// }

//Another way for multiple pages

export const getStaticProps = async ({params}) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${params.id}`
  const response = await fetch(url)
  const data = await response.json()
  return {
      props: {pokemonData: data}
  }
}

/*This help with this
Error: getStaticPaths is required for dynamic SSG pages and is missing for '/pokemones/[id]'.
Read more: https://nextjs.org/docs/messages/invalid-getstaticpaths-value
 fallback: false --> will generate html files for the specific paths
 fallback: true --> will try to render the page in lazy mode, but the parameter "pokemonData" wont have data, so this will need to use useRouter to read the attribute of 'isFallback', 
                   because the html is generating on demand, and the next request for this html will already exist
 fallback: 'blocking' --> This will wait until the data is rendered/collected through getStaticProps and router.isFallback this is not required
*/
export const getStaticPaths = async () => {
  const paths = [
    {params: {id: '1'}},
    {params: {id: '2'}}
  ]
  return (
    {
      paths,
      fallback: true,
    }
  )
}