// GPX parsing functions using native browser APIs

// Parse GPX file function using DOMParser
export const parseGpxFile = async gpxFile => {
  try {
    // Fetch the GPX file content
    const response = await fetch(gpxFile);
    const gpxText = await response.text();

    // Parse XML using DOMParser
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(gpxText, 'text/xml');

    // Check for parsing errors
    const parserError = xmlDoc.querySelector('parsererror');
    if (parserError) {
      throw new Error('XML parsing error');
    }

    const tracks = [];
    const trackElements = xmlDoc.querySelectorAll('trk');

    trackElements.forEach((track, index) => {
      const trackName =
        track.querySelector('name')?.textContent || `Track ${index + 1}`;
      const trackSegments = track.querySelectorAll('trkseg');

      const coordinates = [];
      trackSegments.forEach(segment => {
        const trackPoints = segment.querySelectorAll('trkpt');
        trackPoints.forEach(point => {
          const lat = parseFloat(point.getAttribute('lat'));
          const lon = parseFloat(point.getAttribute('lon'));
          const eleElement = point.querySelector('ele');
          const ele = eleElement ? parseFloat(eleElement.textContent) : 0;

          coordinates.push({
            lat: lat,
            lon: lon,
            ele: ele,
          });
        });
      });

      tracks.push({
        name: trackName,
        coordinates: coordinates,
      });
    });

    return tracks;
  } catch (error) {
    console.error('Error parsing GPX file:', error);
    return [];
  }
};

// Convert GPX data to vehicle tracker format
export const convertGpxToVehicleRoute = gpxTracks => {
  if (!gpxTracks || gpxTracks.length === 0) return [];

  const mainTrack = gpxTracks[0]; // Use first track
  const vehicleRoute = [];

  mainTrack.coordinates.forEach((coord, index) => {
    // Generate realistic vehicle data based on coordinate position
    const baseTime = new Date('2024-07-20T08:00:00Z');
    const timestamp = new Date(baseTime.getTime() + index * 15000); // 15 seconds apart

    // Calculate speed based on position in route (simulate realistic speeds)
    let speed = 35; // Default speed
    let status = 'Normal Speed';

    // Simulate different conditions based on index
    if (index === 0) {
      speed = 0;
      status = 'Starting - Bengal College';
    } else if (index < 10) {
      speed = Math.min(5 + index * 3, 25);
      status = 'Accelerating';
    } else if (index > mainTrack.coordinates.length - 10) {
      speed = Math.max(35 - (mainTrack.coordinates.length - index) * 3, 0);
      status =
        index === mainTrack.coordinates.length - 1
          ? 'Arrived - Durgapur Station'
          : 'Approaching Destination';
    } else {
      // Simulate traffic conditions
      const randFactor = Math.sin(index * 0.1) * 0.5 + 0.5; // Creates variation
      if (randFactor < 0.2) {
        speed = Math.floor(Math.random() * 15 + 10); // 10-25 km/h
        status = 'Heavy Traffic';
      } else if (randFactor < 0.4) {
        speed = Math.floor(Math.random() * 10 + 25); // 25-35 km/h
        status = 'Moderate Traffic';
      } else if (randFactor < 0.7) {
        speed = Math.floor(Math.random() * 15 + 35); // 35-50 km/h
        status = 'Normal Speed';
      } else {
        speed = Math.floor(Math.random() * 10 + 50); // 50-60 km/h
        status = 'Highway Section';
      }
    }

    vehicleRoute.push({
      latitude: coord.lat,
      longitude: coord.lon,
      timestamp: timestamp.toISOString(),
      speed: speed,
      status: status,
    });
  });

  return vehicleRoute;
};

// Merge elevation data (placeholder for compatibility)
export const mergeElevation = async tracks => {
  const allCoordinates = [];

  tracks.forEach(track => {
    track.coordinates.forEach(coord => {
      allCoordinates.push([coord.lat, coord.lon, coord.ele || 0]);
    });
  });

  return allCoordinates;
};

// Get min/max elevation
export const getMinMaxElevation = async tracks => {
  let min = Infinity;
  let max = -Infinity;

  tracks.forEach(track => {
    track.coordinates.forEach(coord => {
      const ele = coord.ele || 0;
      if (ele < min) min = ele;
      if (ele > max) max = ele;
    });
  });

  return {
    min: min === Infinity ? 0 : min,
    max: max === -Infinity ? 100 : max,
  };
};
