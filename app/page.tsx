'use client'
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa"
import Image from "next/image";

export default function Home() {

  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [playing, isPlaying] = useState(false);
  const [gain, setGain] = useState<GainNode>();
  const [volume, setVolume] = useState<number>(1);
  const [muted, setMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState<number>(1);

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
    configAudio("/audio/Multimidia_em_acao.mp3");
  }, []);


  const configVolume = (newValue: number) => {
    if (gain) {
      gain.gain.value = newValue;
    }
    setVolume(newValue);
  }

  const configAudio = (url: string) => {
    const newAudio = new Audio(url);
    setAudio(newAudio);

    const audioContext = new AudioContext();
    const media = audioContext.createMediaElementSource(newAudio);
    const newGanho = audioContext.createGain();
    media.connect(newGanho);
    newGanho.connect(audioContext.destination);
    setGain(newGanho);
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

    <div className="w-[400px] h-[600px] bg-[#161511] flex flex-col justify-center items-center rounded-[10px]">
      <main className="w-[350px] h-[550px] bg-[#212830] rounded-[16px] flex flex-col justify-center items-center p-4">
        <div className="w-full h-[70%] flex flex-col items-center justify-between p-2 gap-4 mb-0">
          <Image
            className="rounded-[16px] mx-auto"
            src="/imgs/Multimidia_em_acao.png"
            alt="Capa do album Multimídia em Ação"
            width={280} 
            height={280}
            objectFit="cover"
            priority
          />

          <div className="flex flex-col items-center p-1">
            <h1 className="text-[#dacfcf] text-xl text-center font-medium m-0">Multimidia em Ação</h1>
            <h2 className="text-[#b3b3b3] text-center text-sm font-normal opacity-[0.8]">IA</h2>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">

          {/* botão de play e pause */}
          <button onClick={e => playPause()}>
            {
              playing ?
                <FaPause className="text-black" />
                :
                <FaPlay className="text-black" />
            }
          </button>
          {/* botao de volume e mute */}
          <button onClick={toggleMute}>
            {muted ? <FaVolumeMute className="text-black" /> : <FaVolumeUp className="text-black" />}
          </button>
          <div>
            <input
              type="range"
              min={0}
              max={1}
              value={volume}
              step={0.001}
              onChange={e => configVolume(Number(e.target.value))}
            />
          </div>
        </div>
      </main>
      {/* Rodapé */}
      <footer className="flex gap-[24px] flex-wrap items-center justify-center py-2">
        <p className="text-center text-base text-[#f7e3e4]">© 2025 mateusvct1</p>
      </footer>
    </div>
  );
}

