import {useState, useEffect} from 'react'
import './favoritos.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Favoritos() {

  const [filmes, setFilmes] = useState([])

  useEffect(()=>{
    const minhaLista = localStorage.getItem('@primeflix')
    setFilmes(JSON.parse(minhaLista)|| [])

  },[])


  function excluirFilme(filme_id){
    let novosFilmes = filmes.filter((item)=> item.id !== filme_id)
    localStorage.setItem('@primeflix', JSON.stringify(novosFilmes))
    setFilmes(novosFilmes)
    toast.success("Filme removido com sucesso!")

  }

  return (
    <div className='meus_filmes'>
      <h1>Meus Filmes</h1>

      {filmes.length === 0 && <span>Você não possui nenhum filme salvo.</span>}

      <ul>
        {filmes.map((filme) => {
          return(
            <li key={filme.id}>
              <span>{filme.title}</span>
              <div>
                <Link to={`/filme/${filme.id}`}>Ver detalhes</Link>
                <button onClick={() => excluirFilme(filme.id)}>Excluir</button>
              </div>
            </li>

          )})}
      </ul>
    </div>
  )
}
