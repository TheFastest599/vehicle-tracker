import { Polyline } from 'react-leaflet';

const RoutePolyline = ({ visitedPoints, fullRoute }) => {
  // Create coordinates array for visited points
  const visitedCoordinates = visitedPoints.map(point => [
    point.latitude,
    point.longitude,
  ]);

  // Create coordinates array for full route (lighter color)
  const fullRouteCoordinates = fullRoute.map(point => [
    point.latitude,
    point.longitude,
  ]);

  return (
    <>
      {/* Full route (lighter/dashed) */}
      <Polyline
        positions={fullRouteCoordinates}
        pathOptions={{
          color: '#FFF176',
          weight: 3,
          opacity: 0.4,
          dashArray: '10, 10',
        }}
      />

      {/* Visited route (solid yellow) */}
      {visitedCoordinates.length > 1 && (
        <Polyline
          positions={visitedCoordinates}
          pathOptions={{
            color: '#FFC107',
            weight: 4,
            opacity: 0.8,
          }}
        />
      )}
    </>
  );
};

export default RoutePolyline;
