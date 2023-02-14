import ArcMapView from "@arcgis/core/views/MapView";
import {createContext} from "react";

export type MapContextValues = {
    mapView: ArcMapView | null;
    setMapView: (mapView: ArcMapView) => void,
}
export const MapContext = createContext<MapContextValues>({
    mapView: null,
    setMapView: () => {},
});