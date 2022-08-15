import {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import api from '../../services/api'
import './filme.css'
import { toast } from 'react-toastify'

export default function Filme() {

  const {id} = useParams()
  const navagate = useNavigate()


  const [filme, setFilme] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    async function loadFilme(){
      await api.get(`/movie/${id}`, {
        params:{
          api_key:'233acee9719175bfc02df0a0fd39abd3',
          language: "pt-BR"
        }
      })
      .then((response)=>{
        setFilme(response.data)
        setLoading(false)
      })
      .catch(()=>{
        console.log('Filme não encontrado')
        navagate("/",{replace: true})
        return
      })
    }

    loadFilme()


  },[id, navagate])

  const salvarFilme = () =>{
    const minhalista = localStorage.getItem("@primeflix");

    let filmesSalvos = JSON.parse(minhalista) || [];

    const hasFilme = filmesSalvos.some((filmesSalvo) =>   filmesSalvo.id === filme.id )

    if (hasFilme) {
      toast.warn('Filme já está na lista')
      return
    }else{
      filmesSalvos.push(filme)
      localStorage.setItem('@primeflix', JSON.stringify(filmesSalvos))
      toast.success('Filme salvo com sucesso!')
    }
  }


  if (loading) {
    return(
      <div className='filme_info'>
        <h1>Carregando detalhes...</h1>
      </div>
    )
  }

  return (
    <div className='filme_info'>
      <h1>{filme.title}</h1>
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>

      <h3>Sinopse</h3>
      <span>{filme.overview}</span>


      <strong>Avaliação: {parseFloat(filme.vote_average).toFixed(1)} / 10</strong>

      <div className='area_button'>
        <button onClick={salvarFilme}>Salvar</button>
        <button>
          <a target='blank' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
            Trailer
          </a>
        </button>
        <button>
          <a target='blank' href={`https://filmeonlinegratis.net/pesquisar/${filme.title}`}>
            Assistir Online
          </a>
        </button>
      </div>
    </div>
  )
}
