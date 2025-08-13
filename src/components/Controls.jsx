import { Play, Pause, RotateCcw, Gauge } from 'lucide-react';

const Controls = ({
  isPlaying,
  onPlay,
  onPause,
  onReset,
  currentPosition,
  elapsedTime,
  speed,
  playbackSpeed,
  onSpeedChange,
  currentIndex,
  totalPoints,
  isAtEnd,
}) => {
  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 m-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-yellow-600 flex items-center gap-2">
          🚌 Vehicle Tracker
        </h2>
        <div className="badge badge-warning">Live Simulation</div>
      </div>

      {/* Main Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex gap-2">
          {!isPlaying ? (
            <button
              className="btn btn-warning btn-sm"
              onClick={onPlay}
              disabled={isAtEnd}
            >
              <Play size={16} />
              Play
            </button>
          ) : (
            <button className="btn btn-warning btn-sm" onClick={onPause}>
              <Pause size={16} />
              Pause
            </button>
          )}

          <button className="btn btn-outline btn-sm" onClick={onReset}>
            <RotateCcw size={16} />
            Reset
          </button>
        </div>

        {/* Speed Control */}
        <div className="flex items-center gap-2">
          <Gauge size={16} className="text-yellow-600" />
          <span className="text-sm font-medium">Speed:</span>
          <select
            className="select select-bordered select-sm w-20"
            value={playbackSpeed}
            onChange={e => onSpeedChange(parseFloat(e.target.value))}
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={1.5}>1.5x</option>
            <option value={2}>2x</option>
            <option value={3}>3x</option>
          </select>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Progress</span>
          <span>
            {currentIndex + 1} / {totalPoints}
          </span>
        </div>
        <progress
          className="progress progress-warning w-full"
          value={currentIndex + 1}
          max={totalPoints}
        ></progress>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="stat bg-yellow-50 rounded-lg p-3">
          <div className="stat-title text-xs">Elapsed Time</div>
          <div className="stat-value text-lg text-yellow-600">
            {formatTime(elapsedTime)}
          </div>
        </div>

        <div className="stat bg-yellow-50 rounded-lg p-3">
          <div className="stat-title text-xs">Speed</div>
          <div className="stat-value text-lg text-yellow-600">{speed} km/h</div>
        </div>

        {currentPosition && (
          <>
            <div className="stat bg-yellow-50 rounded-lg p-3">
              <div className="stat-title text-xs">Latitude</div>
              <div className="stat-value text-sm text-yellow-600">
                {currentPosition.latitude.toFixed(6)}
              </div>
            </div>

            <div className="stat bg-yellow-50 rounded-lg p-3">
              <div className="stat-title text-xs">Longitude</div>
              <div className="stat-value text-sm text-yellow-600">
                {currentPosition.longitude.toFixed(6)}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Status */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`w-3 h-3 rounded-full ${
              isPlaying ? 'bg-green-500' : 'bg-red-500'
            }`}
          ></div>
          <span className="text-sm font-medium">
            {isPlaying
              ? 'Vehicle Moving'
              : isAtEnd
              ? 'Route Completed'
              : 'Vehicle Stopped'}
          </span>
        </div>

        {currentPosition && (
          <div className="text-xs text-gray-500">
            Last Update:{' '}
            {new Date(currentPosition.timestamp).toLocaleTimeString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Controls;
