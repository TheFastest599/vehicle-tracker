import {
  Play,
  Pause,
  RotateCcw,
  Gauge,
  MapPin,
  Clock,
  Zap,
} from 'lucide-react';
import { useVehicleTracker } from '../context/VehicleTrackerContext';

const Controls = () => {
  const {
    isPlaying,
    play,
    pause,
    reset,
    currentPosition,
    elapsedTime,
    speed,
    playbackSpeed,
    onSpeedChange,
    currentIndex,
    totalPoints,
    isAtEnd,
  } = useVehicleTracker();
  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
  };

  const progressPercentage =
    totalPoints > 0 ? ((currentIndex + 1) / totalPoints) * 100 : 0;

  return (
    <div className="space-y-6 m-2">
      {/* Header Card */}
      <div className="card bg-gradient-to-r from-primary to-secondary text-primary-content">
        <div className="card-body p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-10 rounded-full bg-white/20 p-2">
                  <div className="text-white text-lg text-center">🚌</div>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-bold">Vehicle Control</h2>
                <div className="text-sm opacity-80">Live GPS Simulation</div>
              </div>
            </div>
            <div
              className={`badge ${
                isPlaying ? 'badge-success' : 'badge-warning'
              } gap-2`}
            >
              <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
              {isPlaying ? 'LIVE' : 'PAUSED'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Controls */}
      <div className="card bg-base-100 ">
        <div className="card-body p-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {!isPlaying ? (
              <button
                className="btn btn-primary btn-lg gap-2 flex-1 sm:flex-none"
                onClick={play}
                disabled={isAtEnd}
              >
                <Play size={20} />
                Start Journey
              </button>
            ) : (
              <button
                className="btn btn-warning btn-lg gap-2 flex-1 sm:flex-none"
                onClick={pause}
              >
                <Pause size={20} />
                Pause
              </button>
            )}

            <button
              className="btn btn-outline btn-lg gap-2 flex-1 sm:flex-none"
              onClick={reset}
            >
              <RotateCcw size={20} />
              Reset
            </button>
          </div>

          {/* Speed Control */}
          <div className="divider">Playback Speed</div>
          <div className="form-control">
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <Zap size={16} />
                Speed Multiplier: {playbackSpeed}x
              </span>
            </label>
            <select
              className="select select-primary select-bordered w-full"
              value={playbackSpeed}
              onChange={e => onSpeedChange(parseFloat(e.target.value))}
            >
              <option value={0.5}>🐌 0.5x - Slow Motion</option>
              <option value={1}>🚶 1x - Normal Speed</option>
              <option value={1.5}>🚗 1.5x - Fast</option>
              <option value={2}>🏃 2x - Very Fast</option>
              <option value={3}>🚀 3x - Lightning</option>
              <option value={5}>⚡ 5x - Turbo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Progress Card */}
      <div className="card bg-base-100">
        <div className="card-body p-4">
          <h3 className="card-title text-base">Journey Progress</h3>

          <div className="space-y-4">
            {/* Progress Bar */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Route Completion</span>
                <span className="font-mono">
                  {currentIndex + 1} / {totalPoints}
                </span>
              </div>
              <progress
                className="progress progress-primary w-full h-3"
                value={progressPercentage}
                max="100"
              ></progress>
              <div className="text-center text-xs mt-1 opacity-70">
                {progressPercentage.toFixed(1)}% Complete
              </div>
            </div>

            {/* Time Badge */}
            <div className="flex justify-center">
              <div className="badge badge-lg badge-outline gap-2">
                <Clock size={16} />
                {formatTime(elapsedTime)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Speed Card */}
        <div className="card bg-gradient-to-br from-success/20 to-success/5 border border-success/20">
          <div className="card-body p-4 text-center">
            <div className="text-success text-2xl mb-2">
              <Gauge className="mx-auto" size={32} />
            </div>
            <div className="stat-value text-xl text-success">{speed}</div>
            <div className="stat-desc">km/h</div>
          </div>
        </div>

        {/* Location Card */}
        <div className="card bg-gradient-to-br from-info/20 to-info/5 border border-info/20">
          <div className="card-body p-4 text-center">
            <div className="text-info text-2xl mb-2">
              <MapPin className="mx-auto" size={32} />
            </div>
            <div className="stat-desc">Current Location</div>
            <div className="text-xs opacity-70 mt-1">
              {currentPosition ? (
                <>
                  <div>{currentPosition.latitude.toFixed(6)}</div>
                  <div>{currentPosition.longitude.toFixed(6)}</div>
                </>
              ) : (
                'No position data'
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Status Footer */}
      <div className="card bg-base-200/50">
        <div className="card-body p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  isPlaying
                    ? 'bg-success animate-pulse'
                    : isAtEnd
                    ? 'bg-info'
                    : 'bg-warning'
                }`}
              ></div>
              <span className="text-sm font-medium">
                {isPlaying
                  ? 'Vehicle is moving...'
                  : isAtEnd
                  ? 'Journey completed! 🎉'
                  : 'Vehicle stopped'}
              </span>
            </div>

            {currentPosition && (
              <div className="text-xs opacity-60">
                {new Date(currentPosition.timestamp).toLocaleTimeString()}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
