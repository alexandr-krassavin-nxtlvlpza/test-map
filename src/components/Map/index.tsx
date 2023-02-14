import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { MapView, MapViewProps } from "./MapView";
import { MapContextValues, MapContext } from "./MapContext";

type Props = {
    theme?: 'light' | 'dark'
    mapViewProps: MapViewProps,
}

const useLoadMapStyle = (theme? : 'light' | 'dark'): boolean => {
    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(() => {
        let cleanup = false;
        (async () => {
            // @ts-ignore
            await import(`@arcgis/core/assets/esri/themes/${theme ?? 'light'}/main.css`);
            if (!cleanup) {
                setIsLoaded(true);
            }
        })();
        return () => {
            cleanup = true;
        }
    }, [theme]);

    return isLoaded;
}

export const Map: FC<PropsWithChildren<Props>> = ({ mapViewProps, theme, children }) => {
    const isStyleLoaded = useLoadMapStyle(theme);
    const [state, setState] = useState<Pick<MapContextValues, 'mapView'>>({
        mapView: null
    });
    const setMapView = useCallback<MapContextValues['setMapView']>((mapView) => {
        setState((prevState) => ({ ...prevState, mapView }));
    }, []);
    return (
        <MapContext.Provider value={{ ...state, setMapView }}>
            {isStyleLoaded && <>
                <MapView {...mapViewProps} />
                {children}
            </>}
        </MapContext.Provider>
    )
}