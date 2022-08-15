import {useState, useEffect} from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom'
import './home.css'



export default function Home() {

  const [filmes, setFilmes] = useState([])
  const [loading, setLoading] = useState(true)


    useEffect(()=> {
      async function loadFilmes(){
        const respose = await api.get("/movie/now_playing",{
          params:{
            api_key:'233acee9719175bfc02df0a0fd39abd3',
            language: "pt-BR",
            page:1
          }
        })

        const dados_filmes = respose.data.results.slice(0,10)

        //console.log(dados_filmes)

        setFilmes(dados_filmes)
      }

      loadFilmes()
      setLoading(false)
    },[])

    if (loading) {
      return(
        <div className='loading'>
          <h2>Carregando filmes...</h2>
        </div>
      )
    }

  return (
    <div className='container'>
      <div className='lista_filmes'>
        {filmes.map((filme)=>{
          return (
            <article key={filme.id}>
              <strong>{filme.title}</strong>
              <img 
                src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`}
                alt={filme.title}
              />
              <Link to={`/filme/${filme.id}`}>Acessar</Link>
            </article>
          )
        })}
      </div>
    </div>
  )
}
