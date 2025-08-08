// src/components/NowPlayingBar.jsx
import { CiPause1, CiPlay1 } from "react-icons/ci";
import { FaForward, FaBackward } from "react-icons/fa6";

const NowPlayingBar = ({ currentSongData, isPlaying, onPlayPause }) => {
  if (!currentSongData) return null;

  return (
    <div className="fixed bottom-20 bg-gray-800 w-full px-4 py-2 flex items-center justify-between text-white z-50">
      {/* Left: Song Info */}
      <div className="flex items-center gap-3">
        <img
          src={currentSongData.coverUrl}
          alt="cover"
          className="w-12 h-12 rounded-md object-cover"
        />
        <div>
          <h1 className="text-sm font-semibold">{currentSongData.title.slice(0, 10)}</h1>
          <p className="text-xs text-gray-300">{currentSongData.artist.slice(0, 21)}</p>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center gap-4 text-2xl">
        <FaBackward className="text-sm cursor-pointer hover:text-blue-400" />
        <button className="text-sm" onClick={onPlayPause}>
          {isPlaying ? <CiPause1 /> : <CiPlay1 />}
        </button>
        <FaForward className="text-sm cursor-pointer hover:text-blue-400" />
      </div>
    </div>
  );
};

export default NowPlayingBar;
