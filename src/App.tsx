import { type FC, useCallback } from 'react'
import { Drawer } from './components/Drawer'
import { Map } from './components/Map'
import { MapMarker } from './components/Map/MapMarker'
import { useDispatch, useSelector } from './store'
import { getAllShops, setSelectedShop } from './slices/shop'
import { toggleDrawer } from './slices/drawer'

const config = {
  apiKey: process.env.REACT_APP_API_KEY ?? '',
  basemap: 'arcgis-streets',
  center: [71.3364446, 51.1425071],
  zoom: 10,
  sx: {
    width: '100vw',
    height: '100vh'
  }
}

const App: FC = () => {
  const dispatch = useDispatch()
  const shops = useSelector(getAllShops)
  const handleSetSelectedShop = useCallback((id: string) => {
    dispatch(setSelectedShop(id))
    dispatch(toggleDrawer(true))
  }, [dispatch])
  return (
    <>
        <Map mapViewProps={config}>
            {shops.map((shop) => (
                <MapMarker
                    key={shop.id}
                    coordinates={shop.coordinates}
                    outlineWidth={2}
                    color={[255, 160, 122]}
                    outlineColor={[255, 160, 122]}
                    onClick={handleSetSelectedShop.bind(null, shop.id)}
                />
            ))}
        </Map>
        <Drawer />
    </>
  )
}

export default App
