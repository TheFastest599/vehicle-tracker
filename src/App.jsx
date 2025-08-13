import React from 'react';
import GpxVehicleTracker from './GpxVehicleTracker';
import './App.css';

function App() {
  return (
    <div className="min-h-screen">
      {/* Main Content - Fully Responsive */}
      <div className="w-full px-2 sm:px-4 lg:px-6 xl:px-8 py-4 lg:py-6">
        <GpxVehicleTracker />
      </div>
    </div>
  );
}

export default App;
