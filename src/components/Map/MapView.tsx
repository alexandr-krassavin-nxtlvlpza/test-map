import '@arcgis/core/assets/esri/themes/light/main.css'
import { type FC, useEffect, useRef, useContext } from 'react'
import { Box, type SxProps, type Theme } from '@mui/material'
import config from '@arcgis/core/config'
import ArcMap from '@arcgis/core/Map'
import ArcMapView from '@arcgis/core/views/MapView'
import { MapContext } from './MapContext'

export interface MapViewProps {
  apiKey: string
  center: number[]
  zoom: number
  basemap: string
  sx?: SxProps<Theme>
}
export const MapView: FC<MapViewProps> = ({ apiKey, basemap, zoom, center, sx }) => {
  config.apiKey = apiKey
  const { setMapView } = useContext(MapContext)
  const mapRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const map = new ArcMap({ basemap })
    const mapView = new ArcMapView({
      container: mapRef.current as HTMLDivElement,
      map,
      center,
      zoom
    })
    setMapView(mapView)
    return () => {
      mapView?.destroy()
      map?.destroy()
    }
  }, [basemap, center, setMapView, zoom])
  return (
        <Box ref={mapRef} sx={sx} />
  )
}
