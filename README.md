# 🚌 Vehicle Tracker

[![Live Demo](https://img.shields.io/badge/Live%20Demo-🚀%20View%20App-blue?style=for-the-badge)](https://vehicle-tracker-anirban.netlify.app)
[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-5.0.50-5A0EF8?style=for-the-badge&logo=daisyui)](https://daisyui.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?style=for-the-badge&logo=leaflet)](https://leafletjs.com/)
[![GPX](https://img.shields.io/badge/GPX-Real%20Route%20Data-orange?style=for-the-badge&logo=map)](https://en.wikipedia.org/wiki/GPS_Exchange_Format)
[![Netlify](https://img.shields.io/badge/Deployed%20on-Netlify-00C7B7?style=for-the-badge&logo=netlify)](https://netlify.com/)

> **Advanced Real-time Vehicle Tracking System** powered by **authentic GPX route data** from Bengal College of Engineering and Technology to Durgapur Railway Station. Experience realistic vehicle simulation using actual GPS coordinates recorded from a real journey.

![Vehicle Tracker Preview](/public/image.png)

## 🛣️ **Real Route Data Powered**

This application stands out by using **genuine GPS track data** captured from an actual journey. The `routes.gpx` file contains:

- 📍 **264 Precise GPS Coordinates** - Every turn, stop, and road segment
- 🛤️ **Authentic Route Path** - Real roads traveled from Bengal College to Durgapur Railway Station
- ⏱️ **Accurate Timestamps** - Realistic timing data for authentic simulation
- 🌍 **Geographic Precision** - Latitude/longitude data accurate to 6 decimal places
- 📊 **Elevation Data** - Real terrain information for comprehensive tracking

### Route Details

| Property                 | Value                                        |
| ------------------------ | -------------------------------------------- |
| **Start Point**          | Bengal College of Engineering and Technology |
| **End Point**            | Durgapur Railway Station                     |
| **Total Distance**       | ~15 km (real measured distance)              |
| **GPS Points**           | 264 coordinates                              |
| **Data Format**          | GPX (GPS Exchange Format)                    |
| **Coordinate Precision** | 6 decimal places (~0.1m accuracy)            |

## ✨ Features

### 🎯 **Core Functionality**

- **🛣️ Real GPX Route Data** - Authentic GPS coordinates from actual journey recording
- **📍 Precision Tracking** - 264 real GPS points with sub-meter accuracy
- **⚡ Real-time Simulation** - Live vehicle movement along actual road paths
- **🗺️ Interactive Maps** - High-quality satellite and hybrid map views with real terrain
- **🎮 Playback Controls** - Play, pause, reset, and variable speed control (0.5x to 5x)
- **📊 Live Analytics** - Real-time journey progress, speed, and location data
- **🛤️ Route Visualization** - Complete route display with dynamic visited path highlighting

### 🎨 **Modern UI/UX**

- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Glass Morphism** - Modern backdrop blur effects and gradients
- **DaisyUI Components** - Beautiful, accessible component library
- **Dark/Light Themes** - Multiple theme options with custom color schemes
- **Collapsible Layout** - Space-efficient mobile-first design

### 📱 **Device Compatibility**

- **Mobile-First** - Touch-friendly controls and optimized layouts
- **Tablet Ready** - Perfect medium screen experience
- **Desktop Enhanced** - Full-width utilization with advanced features
- **Cross-Browser** - Works on all modern browsers

## 🚀 Live Demo

**[🌐 View Live Application](https://vehicle-tracker-anirban.netlify.app)**

Experience the full functionality of the Vehicle Tracker with real GPX data simulation.

## 📊 **Authentic GPX Data Highlights**

### 🎯 **What Makes This Special**

This isn't just another map application - it's powered by **real-world GPS data**:

```
📁 routes.gpx - The Heart of Accuracy
├── 📍 264 GPS Coordinates
├── 🛣️ Actual Road Network
├── ⏱️ Realistic Timestamps
├── 🌍 Sub-meter Precision
└── 📊 Elevation Data
```

### 🔍 **Data Quality Metrics**

| Metric            | Value            | Description                 |
| ----------------- | ---------------- | --------------------------- |
| **Precision**     | 6 decimal places | ~0.1 meter accuracy         |
| **Sampling Rate** | Variable         | Optimized for road segments |
| **Coverage**      | Complete route   | No gaps or interpolation    |
| **Format**        | Standard GPX     | Universal GPS data format   |
| **Validation**    | Real journey     | Actual recorded trip data   |

### 🛤️ **Route Authenticity**

- **Real Roads**: Every coordinate represents an actual road traveled
- **Accurate Timing**: Realistic speed and timing simulation
- **Geographic Fidelity**: True-to-life route following real infrastructure
- **No Approximation**: Zero interpolated or estimated coordinates

## 🛠️ Technology Stack

### **Frontend Framework**

- **React 19.1.1** - Latest React with modern hooks and Context API
- **Vite 7.1.2** - Lightning-fast build tool and dev server
- **JavaScript ES6+** - Modern JavaScript features

### **Styling & UI**

- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **DaisyUI 5.0.50** - Component library with beautiful themes
- **Custom Responsive Design** - Mobile-first approach

### **Mapping & GPS**

- **React-Leaflet 5.0.0** - React components for Leaflet maps
- **Leaflet 1.9.4** - Open-source interactive maps
- **Google Maps Tiles** - Satellite and hybrid map layers
- **GPX File Support** - Real GPS track data parsing with native DOMParser
- **Authentic Route Data** - `routes.gpx` contains actual recorded GPS journey
- **Geographic Precision** - Sub-meter accuracy GPS coordinates
- **Elevation Support** - Real terrain and elevation data integration

### **Icons & Assets**

- **Lucide React 0.539.0** - Beautiful, customizable icons
- **Custom Vehicle Markers** - Bus icon with real-time status

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18+ recommended)
- **npm** or **yarn**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/TheFastest599/vehicle-tracker.git
   cd vehicle-tracker
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 🎮 Usage Guide

### **Starting a Journey**

1. Click **"Start Journey"** to begin vehicle simulation
2. Watch the vehicle move along the predefined route
3. Use speed controls to adjust playback speed (0.5x - 5x)

### **Playback Controls**

- **▶️ Play/Pause** - Control vehicle movement
- **🔄 Reset** - Return to starting position
- **⚡ Speed Selector** - Choose from 6 speed options

### **Map Interaction**

- **Zoom** - Use mouse wheel or touch gestures
- **Pan** - Click and drag to move around
- **Layer Switch** - Toggle between satellite, hybrid, and street views

### **Route Information**

- **Total Points**: 264 authentic GPS coordinates from real journey
- **Route**: Bengal College to Durgapur Railway Station (actual roads traveled)
- **Data Source**: Real GPX file (`routes.gpx`) with recorded GPS track
- **Real-time Stats**: Speed, location, elapsed time, progress
- **Coordinate Precision**: 6 decimal places (sub-meter accuracy)
- **No Simulation**: Every point represents actual GPS data, not estimated paths

## 🏗️ Architecture

### **State Management**

- **Context API** - Centralized state with `VehicleTrackerContext`
- **No Prop Drilling** - Components access context directly
- **Optimized Re-renders** - Efficient state updates

### **Component Hierarchy**

```
App
└── VehicleTrackerProvider (Context)
    └── GpxVehicleTracker
        ├── Controls (Context Consumer)
        └── GpxMapDisplay (Context Consumer)
            ├── VehicleMarker
            └── ProgressBar
```

### **Data Flow**

1. **Real GPX Data Loading** - Authentic route data loaded from `routes.gpx` file
2. **GPS Coordinate Parsing** - 264 real GPS points processed with native DOMParser
3. **Context Storage** - Authentic route data managed in `VehicleTrackerContext`
4. **Component Consumption** - Components subscribe to real GPS coordinate updates
5. **Real-time Simulation** - Vehicle follows actual recorded GPS path with realistic timing

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Anirban Bhattacharjee** (TheFastest599)

- GitHub: [@TheFastest599](https://github.com/TheFastest599)
- Project: [Vehicle Tracker](https://vehicle-tracker-anirban.netlify.app)

## 🙏 Acknowledgments

- **Real GPS Data** - Special thanks for the authentic route recording from Bengal College to Durgapur
- **React Team** - For the amazing framework
- **Leaflet** - For the excellent mapping library
- **DaisyUI** - For beautiful UI components
- **Tailwind CSS** - For utility-first styling
- **GPX Format** - For standardized GPS data exchange
- **Netlify** - For seamless deployment

---

<div align="center">

**[🚀 View Live Demo](https://vehicle-tracker-anirban.netlify.app)** | **[⭐ Star this Project](https://github.com/TheFastest599/vehicle-tracker)**

Made with ❤️ by [TheFastest599](https://github.com/TheFastest599)

</div>
