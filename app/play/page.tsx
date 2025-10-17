'use client'
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [valor, setValor] = useState(0);
  const [tempoAtual, setTempoAtual] = useState(0);
  const [duracao, setDuracao] = useState(0);
  const [volume, setVolume] = useState(1);
  const [mostrarVolume, setMostrarVolume] = useState(false);

  useEffect(() => {
    const audio = document.querySelector('audio')!;
    const playIcon = document.getElementById('playIcon')!;
    const pauseIcon = document.getElementById('pauseIcon')!;

    const atualizarBarraProgresso = () => {
      const progresso = (audio.currentTime / audio.duration) * 100;
      setValor(progresso || 0);
      setTempoAtual(audio.currentTime);
      setDuracao(audio.duration);
    };

    audio.addEventListener('timeupdate', atualizarBarraProgresso);

    playIcon.addEventListener('click', () => audio.play());
    pauseIcon.addEventListener('click', () => audio.pause());

    audio.addEventListener('play', () => {
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'inline-block';
    });

    audio.addEventListener('pause', () => {
      playIcon.style.display = 'inline-block';
      pauseIcon.style.display = 'none';
    });

    playIcon.style.display = 'inline-block';
    pauseIcon.style.display = 'none';

    return () => {
      audio.removeEventListener('timeupdate', atualizarBarraProgresso);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const novoValor = Number(e.target.value);
    const audio = document.querySelector('audio')!;
    const novoTempo = (novoValor / 100) * audio.duration;
    audio.currentTime = novoTempo;
    setValor(novoValor);
  };

  const formatarTempo = (segundos: number) => {
    const min = Math.floor(segundos / 60);
    const sec = Math.floor(segundos % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <>
      <div className="w-[400px] h-[600px] bg-[#161511] flex justify-center items-center rounded-[10px]">
        <main className="w-[350px] h-[550px] bg-[#212830] rounded-[16px] flex flex-col justify-center items-center p-4">
          {/* Imagem e título */}
          <div className="w-full h-[70%] flex flex-col items-center justify-between p-2 gap-4 mb-0">
            <div className="w-auto h-[70%]">
              <Image
                src={"/imgs/Multimidia_em_acao.png"}
                alt="capa de álbum"
                width={500}
                height={500}
                className="w-full h-full rounded-[10px]"
              />
            </div>
            <div className="flex flex-col items-center p-1">
              <h1 className="text-[#dacfcf] text-xl text-center font-medium m-0">Multimidia em Ação</h1>
              <h2 className="text-[#b3b3b3] text-center text-sm font-normal opacity-[0.8]">IA</h2>
            </div>
          </div>

          {/* Barra de progresso */}
          <div className="w-[80%] flex flex-col items-center mx-auto justify-center">
            <input
              type="range"
              min="0"
              max="100"
              value={valor}
              onChange={handleChange}
              className="w-full h-2 bg-[#333] rounded-lg appearance-none cursor-pointer accent-[#2c1c1e] m-2"
            />
            <div className="flex justify-between w-full text-[0.8rem] px-1 text-[#aaa]">
              <p>{formatarTempo(tempoAtual)}</p>
              <p>{formatarTempo(duracao)}</p>
            </div>
          </div>

          {/* Player */}
          <div className="w-[80%] h-[50px] rounded-[10px] flex items-center justify-center">
            <div className="flex flex-row justify-around items-center rounded-[10px] w-full h-[80%] ">
              {/* Botão de voltar */}
              <i className="fas fa-step-backward text-[16pt] h-[50px] w-[50px] rounded-full content-center text-center flex items-center justify-center hover:bg-[#e63946]"></i>

              {/* Botão de play e pause */}
              <div className="flex flex-row justify-around items-center rounded-[10px]">
                <i id="playIcon" className="fas fa-play text-[16px] h-[50px] w-[50px] rounded-full content-center text-center flex items-center justify-center hover:bg-[#e63946]"></i>
                <i id="pauseIcon" className="fas fa-pause text-[16pt] h-[50px] w-[50px] rounded-full content-center text-center flex items-center justify-center hover:bg-[#e63946]"></i>
              </div>

              {/* Botão de avançar */}
              <i className="fas fa-step-forward text-[16pt] h-[50px] w-[50px] rounded-full content-center text-center flex items-center justify-center hover:bg-[#e63946]"></i>

              {/* Botão de volume + barra vertical */}
              <div className="relative flex items-center justify-center">
                <i
                  className="fas fa-volume-up text-[16pt] h-[50px] w-[50px] rounded-full content-center text-center flex items-center justify-center hover:bg-[#e63946]"
                  onClick={() => setMostrarVolume(!mostrarVolume)}
                ></i>

                {mostrarVolume && (
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(e) => {
                      const novoVolume = Number(e.target.value);
                      const audio = document.querySelector('audio')!;
                      audio.volume = novoVolume;
                      setVolume(novoVolume);
                    }}
                    className="absolute bottom-[60px] h-[100px] w-2 appearance-none bg-[#333] rounded-lg accent-[#2c1c1e] rotate-180 "
                  />
                )}
              </div>
            </div>

            {/* Áudio */}
            <audio src="/audio/Multimidia_em_acao.mp3"></audio>
          </div>
        </main>
      </div>

      {/* Rodapé */}
      <footer className="w-full h-[50px] flex justify-center items-end p-2 bottom-0">
        <p className="text-center text-base text-[#f7e3e4]">© 2025 mateusvct1</p>
      </footer>
    </>
  );
}
