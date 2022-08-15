import axios from "axios";

//Base da URL: https://api.themoviedb.org/3/
//GET da API: movie/now_playing?
//Chave da API: api_key=233acee9719175bfc02df0a0fd39abd3
//Laguage da API: &language=pt-BR 


const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/'
})

export default api;