'use client'
import { useEffect, useState } from "react";
import { FaPlay, FaBackward, FaForward } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
import { GiNextButton } from "react-icons/gi";
import { FaStepBackward } from "react-icons/fa";
import musics from "./data/data";
import Image from "next/image";


export default function Home() {

  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [playing, isPlaying] = useState<boolean>(false);
  const [gain, setGain] = useState<GainNode>();
  const [volume, setVolume] = useState<number>(1);
  const [muted, setMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState<number>(1);
  const [audioIndex, setAudioIndex] = useState<number>(0);
  const [totalTime, setTotalTime] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const toggleMute = () => {
    if (gain) {
      if (muted) {
        gain.gain.value = previousVolume;
        setVolume(previousVolume);
      } else {
        setPreviousVolume(volume);
        gain.gain.value = 0;
        setVolume(0);
      }
      setMuted(!muted);
    }
  };

  useEffect(() => {
    configAudio(0);
  }, []);

  useEffect(() => {
    if (playing) {
      play()
    }
    if (audio) {
      audio.onloadedmetadata = () => {
        setTotalTime(audio.duration);
      }
      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
      }
      audio.onended = () => {
        configAudio(audioIndex + 1);
      }
    }
  }, [audio])

  const formatTime = (value: number) => {
    const minutes = Math.trunc(value / 60);
    const seconds = Math.trunc(value % 60);

    return `${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`;
  }

  const configVolume = (newValue: number) => {
    if (gain) {
      gain.gain.value = newValue;
    }
    setVolume(newValue);
  }

  const decrementaMusica = () => {
    if (audio) {
      audio.currentTime = currentTime - 10;
      setCurrentTime(audio.currentTime);
    }
  }

  const incrementaMusica = () => {
    if (audio) {
      audio.currentTime = currentTime + 10;
      setCurrentTime(audio.currentTime);
    }
  }

  const nextMusica = () =>{
    const nextIndex = (audioIndex + 1) % musics.length;
    configAudio(nextIndex);
  }

  const backMusica = () =>{
    const backIndex = (audioIndex - 1 + musics.length) % musics.length;
    configAudio(backIndex);
  }

  const configAudio = (index: number) => {
    const newIndex = index % musics.length;
    const newAudio = new Audio(musics[newIndex].url);
    pause();
    setAudioIndex(newIndex);
    setAudio(newAudio);

    const audioContext = new AudioContext();
    const media = audioContext.createMediaElementSource(newAudio);
    const newGanho = audioContext.createGain();
    media.connect(newGanho);
    newGanho.connect(audioContext.destination);
    setGain(newGanho);

    
  }

  const configTime = (value: number) => {
    if (audio) {
      audio.currentTime = value;
      setCurrentTime(value);
    }
  }

  const playPause = () => {
    if (playing) {
      pause();
    }

    else {
      play();
    }
    isPlaying(!playing);
  }

  const play = () => {
    if (audio) {
      audio.play();
    }
  }

  const pause = () => {
    if (audio) {
      audio.pause();
    }
  }

  return (

    <div className="w-[400px] h-auto bg-[#161511] flex flex-col justify-center items-center rounded-[10px] pt-8">
      <main className="w-[350px] h-auto bg-[#212830] rounded-[16px] flex flex-col justify-center items-center p-4">
        <div className="w-full h-[70%] flex flex-col items-center justify-between p-2 gap-4 mb-0">
          <Image
            className="rounded-[16px] mx-auto"
            src={musics[audioIndex].image}
            alt="Capa do album Multimídia em Ação"
            width={280}
            height={280}
            objectFit="cover"
            priority
          />

          <div className="flex flex-col items-center p-1">
            <h1 className="text-[#dacfcf] text-xl text-center font-medium m-0">{musics[audioIndex].name}</h1>
            <h2 className="text-[#b3b3b3] text-center text-sm font-normal opacity-[0.8]">{musics[audioIndex].artista}</h2>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center text-black gap-10">
            
            {/* botao de avancar 10s */}
            <button className="cursor-pointer hover:text-white opacity-[80%]" onClick={e => decrementaMusica()}>
              <FaBackward />
            </button>

              {/* botão de back */}
              <button className="cursor-pointer hover:text-white hover:opacity-[80%]" onClick={e => backMusica()}>
               <FaStepBackward />
              </button>

            {/* botão de play e pause */}
            <button className="cursor-pointer " onClick={e => playPause()}>
              {
                playing ?
                  <FaPause className="text-black hover:text-white opacity-[80%]" />
                  :
                  <FaPlay className="text-black hover:text-white opacity-[80%]" />
              }
            </button>
                       
          {/* botão de next */}
            <button className="cursor-pointer hover:text-white opacity-[80%]" onClick={() => nextMusica()}>
              <GiNextButton />
            </button>
              {/* botao de retroceder 10s */} 
             <button className="cursor-pointer hover:text-white opacity-[80%]" onClick={e => incrementaMusica()}>
              <FaForward />
            </button>
            {/* botao de mute */}
            <button className="cursor-pointer text-black hover:text-white opacity-[80%]" onClick={toggleMute}>
              {muted ? <FaVolumeMute  /> : <FaVolumeUp  />}
            </button>

          </div>

          {/* volume */}
          <div>
            <input
              className="cursor-pointer"
              type="range"
              min={0}
              max={1}
              value={volume}
              step={0.001}
              onChange={e => configVolume(Number(e.target.value))}
            />
          </div>
        </div>
        <div>
          <input
            className="cursor-pointer"
            type="range"
            min={0}
            max={totalTime}
            value={currentTime}
            onChange={e => configTime(Number(e.target.value))}
          />
        </div>
        <div>
          {`${formatTime(currentTime)}/${formatTime(totalTime)}`}
        </div>
        
        {/* lista das musicas */}
        <div className="m-[5px] flex flex-col flex-center content-center bg-[#2a313a] rounded-[16px] w-full h-auto hover:bg-[#333d4b]">
          <h1 className="text-center m-4 hover:opacity-[80%]">Lista de músicas</h1>
          <ul className="flex gap-5 overflow-x-auto w-full justify-center content-center">
            {musics.map((music, index) => (
              <li
                key={index}
                onClick={() => configAudio(index)}
                className="cursor-pointer hover:opacity-80 transition"
              >
                <Image
                  className="rounded-[16px] mx-auto mb-1"
                  src={music.image}
                  alt={`Capa do álbum ${music.name}`}
                  width={80}
                  height={80}
                  objectFit="cover"
                  priority
                />
                <h1 className="text-[12px] text-center mt-3 mb-1">{music.name}</h1>
                <h2 className="text-[11px] text-center opacity-[70%]">{music.artista}</h2>
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* Rodapé */}
      <footer className="flex gap-[24px] flex-wrap items-center justify-center py-2">
        <p className="text-center text-base text-[#f7e3e4]">© 2025 mateusvct1</p>
      </footer>
    </div>

  );
}

