import React, { useRef } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapViewProps {
  latitude: number;
  longitude: number;
  zoom: number;
  dragable: boolean;
}

const MapView: React.FC<MapViewProps> = ({
  latitude,
  longitude,
  zoom,
  dragable,
}) => {
  return (
    <Map
      initialViewState={{
        latitude,
        longitude,
        zoom: zoom,
        bearing: 0,
        pitch: 0,
      }}
      style={{ width: "490px", height: "450px", borderRadius: "18px" }}
      mapboxAccessToken={process.env.MAPBOX_TOKEN}
      mapStyle="mapbox://styles/fnel/ckjq7gxh44ikk19qvoly77bfb"
    >
      <Marker longitude={longitude} latitude={latitude} color="#0B1D44" />
    </Map>
  );
};

export default MapView;
