import { useEffect, useRef, useState } from "react";
import { Polyline, useMap } from "react-leaflet";
import axios from "axios";
import { GeoJSON } from "react-leaflet";
import { IranGeo } from "../data/IranGeo";
import { Button, Spin, Tour } from "antd";
import { SwapOutlined } from "@ant-design/icons";
import { OSRMResponse } from "../services/types";
import { useMainContext } from "../context/mainContext";
import DrawerComp from "./drawerComp";
import SideInfoComp from "./sideInfoComp";
import { FeatureCollection } from "geojson";
import L from 'leaflet';


const PoyLineUi = () => {
    const map = useMap();

    const { selection, setDataInPolyline, setOpenDrawer, dataInPolyline } = useMainContext()

    const [loading, setLoading] = useState(false);

    // ---------------- Api call ---------------

    useEffect(() => {
        const fetchPolyline = async () => {
            if (!selection[0] || !selection[1]) return;
            setOpenDrawer(false)

            const coords1 = selection[0].split(",").map(Number);
            const coords2 = selection[1].split(",").map(Number);
            const dataPolyline = [
                [coords1[1], coords1[0]],
                [coords2[1], coords2[0]],
            ];

            try {
                setLoading(true);
                const res = await axios.get<OSRMResponse>(
                    `https://router.project-osrm.org/route/v1/driving/${coords1[0]},${coords1[1]};${coords2[0]},${coords2[1]}?overview=full&geometries=geojson`
                );

                const polyLineData: [number, number][] = res.data.routes[0].geometry.coordinates.map(
                    (i: [number, number]) => [i[1], i[0]]
                );

                const distance = res.data.routes[0]?.distance;
                const durationSec = res.data.routes[0]?.duration;
                const h = Math.floor(durationSec / 3600);
                const m = Math.floor((durationSec % 3600) / 60);
                const duration = `${h} : ${m}`;

                setDataInPolyline({ polyLineData, distance, duration });
                map.flyToBounds(dataPolyline as [number, number][]);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPolyline();
    }, [selection, map]);


    // ---------------- Tour Component ---------------

    const refButton = useRef(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const isTourEnabled = localStorage.getItem("tour") !== "false";
        if (isTourEnabled) {
            setTimeout(() => setOpen(true), 300);
        }
    }, []);

    const steps = [
        {
            title: <SwapOutlined className="text-xl !text-blue-700" />,
            description: 'از این قسمت امکان مسیریابی در اختیار شما میباشد',
            target: () => refButton.current,
            nextButtonProps: {
                children: "فهمیدم",
                style: {
                    color: "white",
                    fontSize: "13px",
                },
            },
        },
    ];

    const customIcon = new L.Icon({
        iconUrl: '/icons/loc.svg',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
    });

    return (
        <>
            <Button ref={refButton} onClick={() => {
                setOpenDrawer(true)

                setOpen(false)
            }} icon={<SwapOutlined className="text-xl mt-1" />}
                className="z-1000 !absolute bottom-0 left-0 m-5"
                type="primary" size="large">
                مسیر یابی
            </Button>


            <Tour open={open} onFinish={() => localStorage.setItem("tour", "false")}
                onClose={() => setOpen(false)} steps={steps} placement="topRight" />


            <DrawerComp />

            <SideInfoComp />


            {/* {selection[0] && selection[1] && (
                <GeoJSON
                    data={{
                        type: "FeatureCollection",
                        features: IranGeo?.features
                            .filter((item) => {
                                const coord = `${item.geometry.coordinates[0]},${item.geometry.coordinates[1]}`;
                                return selection.includes(coord);
                            })
                            .map((item) => ({
                                type: "Feature",
                                properties: { name: item?.properties?.name },
                                geometry: {
                                    type: "Point",
                                    coordinates: item.geometry.coordinates,
                                },
                            })),
                    }}
                />
            )} */}

            {selection[0] && selection[1] && (
                <GeoJSON
                    data={{
                        type: "FeatureCollection",
                        features: IranGeo.features
                            .filter((item) => {
                                const coord = `${item.geometry.coordinates[0]},${item.geometry.coordinates[1]}`;
                                return selection.includes(coord);
                            })
                            .map((item) => {
                                return {
                                    type: "Feature",
                                    geometry: {
                                        type: "Point",
                                        coordinates: item.geometry.coordinates,
                                    },
                                    properties: {
                                        name: item?.properties?.name,
                                    },
                                };
                            }),
                    } as FeatureCollection
                    }

                    pointToLayer={(_, latlng) => {
                        return L.marker(latlng, { icon: customIcon });
                    }}
                />
            )}

            {dataInPolyline?.polyLineData && (
                <Polyline positions={dataInPolyline.polyLineData} pathOptions={{ weight: 5 }} />
            )}

            <Spin spinning={loading} fullscreen tip={"لطفا شکیبا باشید"} size="large" />

        </>
    );
};

export default PoyLineUi;