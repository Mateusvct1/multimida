'use client'

import { useRef, useState } from "react";

export default function Home() {

  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  const playPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (playing) {
      video.pause();
    } else {
      video.play();
    }
    setPlaying(!playing);
  }

  const changeVolume = (value: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = value;
    setVolume(value);
  }

  return (
    <div className="flex flex-col items-center p-6">
      <h1>GamePlay - Jogando zombie city: survival</h1>
      <h2 className="mb-1">@MateusVCT</h2>
      <video
        ref={videoRef}
        className="w-full max-w-xl rounded"
        src="/video/jogando.mp4"
      />

      <div className="flex gap-4 mt-4">

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={playPause}
        >
          {playing ? "Pause" : "Play"}
        </button>

        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={e => changeVolume(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
