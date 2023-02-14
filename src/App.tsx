import React, {useCallback} from 'react';
import {Drawer} from "./components/Drawer";
import { Map } from "./components/Map";
import {MapMarker} from "./components/Map/MapMarker";
import {useDispatch, useSelector} from "./store";
import {getAllShops, setSelectedShop} from "./slices/shop";
import {toggleDrawer} from "./slices/drawer";

const config = {
    apiKey: 'AAPKfa4cb3f0d1a9401ca159459b11ef9387zHMZMh-WEbNemmZZIMBONxYiOvGVh-wkL83ZDOQc1XmwU0U4hElTWbc5DHRbNrX5',
    basemap: 'arcgis-streets',
    center: [71.3364446, 51.1425071],
    zoom: 10,
    sx: {
        width: '100vw',
        height: '100vh',
    }
}

function App() {
    const dispatch = useDispatch()
    const shops = useSelector(getAllShops);
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
                    color={[255,160,122]}
                    outlineColor={[255,160,122]}
                    onClick={handleSetSelectedShop.bind(null, shop.id)}
                />
            ))}
        </Map>
        <Drawer />
    </>
  );
}

export default App;
