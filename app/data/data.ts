type Music = {
    name: string;
    url: string;
    image: string;
    artista: string;
}

const musics:Music[] = [
    {
     name: "Multimidia em Ação",
     url: "./audio/Multimidia_em_acao.mp3",
     image: "/imgs/Multimidia_em_acao.png",
     artista: "IA"  
    },
    {
      name: "Creep",
     url: "/audio/Radiohead__creep.mp3",
     image: "/imgs/creep.jpeg",
     artista: "Radiohead"   
    },
    {
      name: "Espumas ao Vento",
     url: "/audio/Elza_Soares__Espumas_ao_Vento.mp3",
     image: "/imgs/Elza_Soares—Espumas_ao_Vento.jpeg",
     artista: "Elza_Soares"  
    }

]
export default musics;