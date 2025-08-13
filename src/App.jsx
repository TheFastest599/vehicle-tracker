import React from 'react';
import GpxVehicleTracker from './GpxVehicleTracker';
import './App.css';

function App() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Stats */}

      {/* Main Content - Fully Responsive */}
      <div className="w-full px-2 sm:px-4 lg:px-6 xl:px-8 py-4 lg:py-6">
        <div className="card rounded-xl lg:rounded-2xl overflow-hidden">
          <div className="card-body p-2 sm:p-4 lg:p-6">
            <GpxVehicleTracker />
          </div>
        </div>
      </div>

      {/* Modern Footer */}
      <footer className="footer footer-center bg-base-200 text-base-content rounded-t-2xl p-4 sm:p-6 lg:p-8 mt-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-6">
          <div className="tooltip" data-tip="Built with React">
            <div className="badge badge-primary gap-2 text-xs sm:text-sm">
              ⚛️ React
            </div>
          </div>
          <div className="tooltip" data-tip="Interactive Maps">
            <div className="badge badge-secondary gap-2 text-xs sm:text-sm">
              🗺️ Leaflet
            </div>
          </div>
          <div className="tooltip" data-tip="Modern UI">
            <div className="badge badge-accent gap-2 text-xs sm:text-sm">
              🎨 DaisyUI
            </div>
          </div>
          <div className="tooltip" data-tip="GPS Data Format">
            <div className="badge badge-info gap-2 text-xs sm:text-sm">
              📍 GPX
            </div>
          </div>
        </div>
        <div className="divider divider-horizontal hidden sm:block opacity-30"></div>
        <div className="text-center mt-2 sm:mt-0">
          <p className="text-xs sm:text-sm opacity-70 max-w-md">
            Vehicle Tracker Pro © 2025 - Advanced GPX Route Visualization
          </p>
          <p className="text-xs opacity-50 mt-1 hidden sm:block">
            Real-time GPS simulation from Bengal College to Durgapur Railway
            Station
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
