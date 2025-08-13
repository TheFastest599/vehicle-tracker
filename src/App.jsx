import React from 'react';
import GpxVehicleTracker from './GpxVehicleTracker';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-yellow-200">
        <div className="container mx-auto px-4 py-3">
          <h1 className="text-2xl font-bold text-yellow-600 flex items-center gap-2">
            🚌 Vehicle Tracker
            <span className="text-sm font-normal text-gray-500">
              Bengal College to Durgapur Railway Station
            </span>
          </h1>
        </div>
      </div>

      {/* GPX Vehicle Tracker */}
      <GpxVehicleTracker />

      {/* Footer */}
      <div className="bg-white border-t border-yellow-200 mt-8">
        <div className="container mx-auto px-4 py-3 text-center text-sm text-gray-500">
          Vehicle Tracker - GPX Route Mode - Built with React, Leaflet &
          Tailwind CSS
        </div>
      </div>
    </div>
  );
}

export default App;
