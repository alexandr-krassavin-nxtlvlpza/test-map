import type ArcMapView from '@arcgis/core/views/MapView'
import { createContext } from 'react'

export interface MapContextValues {
  mapView: ArcMapView | null
  setMapView: (mapView: ArcMapView) => void
}
export const MapContext = createContext<MapContextValues>({
  mapView: null,
  setMapView: () => {}
})
