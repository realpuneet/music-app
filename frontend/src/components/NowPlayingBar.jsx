import { CiPause1, CiPlay1 } from "react-icons/ci";
import { FaForward, FaBackward } from "react-icons/fa6";

const NowPlayingBar = ({
  currentSongData,
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  currentTime,
  duration,
  formatTime,
  onSeek,
}) => {
  return (
    <div className="fixed bottom-20 bg-gray-800 w-full px-4 py-2 flex flex-col gap-1 text-white z-50">
      {/* Song Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={currentSongData.coverUrl}
            alt="cover"
            className="w-12 h-12 rounded-md object-cover"
          />
          <div>
            <h1 className="text-sm font-semibold">
              {currentSongData.title.slice(0, 15)}
            </h1>
            <p className="text-xs text-gray-300">
              {currentSongData.artist.slice(0, 21)}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 text-2xl">
          <FaBackward
            className="cursor-pointer hover:text-blue-400"
            onClick={onPrev}
          />
          <button onClick={onPlayPause}>
            {isPlaying ? <CiPause1 /> : <CiPlay1 />}
          </button>
          <FaForward
            className="cursor-pointer hover:text-blue-400"
            onClick={onNext}
          />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-2 text-xs text-gray-300">
        <span>{formatTime(currentTime)}</span>
        <input
  type="range"
  value={currentTime}
  max={duration || 0}
  onChange={(e) => onSeek(Number(e.target.value))}
  className="w-full h-1 appearance-none bg-gray-300 rounded-lg accent-pink-500"
/>

        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default NowPlayingBar;
