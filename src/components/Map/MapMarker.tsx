import { memo, useContext, useEffect } from "react";
import Graphic from "@arcgis/core/Graphic";
import {MapContext} from "./MapContext";

type Props = {
    coordinates: {
        latitude: number;
        longitude: number;
    },
    color: number[],
    outlineColor: number[],
    outlineWidth: number,
    onClick?: (event: any) => void,
}

export const MapMarker = memo<Props>((props) => {
    const { coordinates, outlineColor, outlineWidth, color, onClick } = props;
    const { mapView } = useContext(MapContext);
    useEffect(() => {
        const point = {
            type: "point",
            ...coordinates,
        };

        const markerSymbol = {
            type: "simple-marker",
            color,
            outline: {
                color: outlineColor,
                width: outlineWidth,
            },
        };

        const pointGraphic = new Graphic({
            // @ts-ignore
            geometry: point,
            symbol: markerSymbol,
        });

        mapView?.graphics.add(pointGraphic);

        mapView?.on('click', (event) => {
            const screenPoint = {
                x: event.x,
                y: event.y
            };

            mapView?.hitTest(screenPoint).then((response) => {
                if (response.results.length) {
                    const graphic = response.results.find((result) => {
                       return "graphic" in result && result.graphic === pointGraphic
                    });
                    if (graphic) {
                        onClick?.(event);
                    }
                }
            })
        });

    }, [color, coordinates, mapView, onClick, outlineColor, outlineWidth]);

    return null;
});
