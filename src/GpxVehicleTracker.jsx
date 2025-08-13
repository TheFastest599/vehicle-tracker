import React from 'react';
import GpxMapDisplay from './components/GpxMapDisplay';
import Controls from './components/Controls';
import {
  VehicleTrackerProvider,
  useVehicleTracker,
} from './context/VehicleTrackerContext';
import './App.css';

const GpxVehicleTrackerContent = () => {
  return (
    <div className="w-full">
      {/* Mobile-first responsive layout */}
      <div className="flex flex-col xl:flex-row gap-0 xl:gap-6 min-h-[calc(100vh-200px)]">
        {/* Controls Panel - Collapsible on mobile */}
        <div className="xl:w-96 xl:flex-shrink-0">
          <div className="collapse xl:collapse-open bg-base-100 shadow-xl rounded-box mb-4 xl:mb-0">
            <input type="checkbox" className="xl:hidden" />
            <div className="collapse-title text-xl font-medium xl:hidden flex items-center gap-2">
              <div className="badge badge-primary">Controls</div>
              <div className="text-sm opacity-70">Vehicle Simulation</div>
            </div>
            <div className="collapse-content xl:p-0">
              <Controls />
            </div>
          </div>
        </div>

        {/* Map Panel - Full width on desktop */}
        <div className="flex-1 min-h-0">
          <div className="card bg-base-100 shadow-xl rounded-box h-full">
            <div className="card-body p-0 h-full">
              <GpxMapDisplay />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function GpxVehicleTracker() {
  return (
    <VehicleTrackerProvider>
      <GpxVehicleTrackerContent />
    </VehicleTrackerProvider>
  );
}

export default GpxVehicleTracker;
