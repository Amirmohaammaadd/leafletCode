import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import PoyLineUi from "./poyLineUi";


const LeafletComp = () => {
    const position: LatLngExpression = [32.30910377510498, 55.57374690686764];

    return (
        <div className="h-screen">
            <MapContainer
                center={position}
                zoom={window.innerWidth > 600 ? 6 : 4}
                minZoom={window.innerWidth > 600 ? 6 : 4}
                style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    zIndex: 1,
                }}
                scrollWheelZoom={true}
                maxBounds={
                    window.innerWidth > 600
                        ? [
                            [39.83537747494472, 44.04182386913732],
                            [25.02476640292126, 62.230072841034826],
                        ]
                        : [
                            [41.13140227938439, 42.66178188172543],
                            [24.412383924438487, 64.92344046574658],
                        ]
                }
            >
                <LayersControl>
                    <LayersControl.BaseLayer checked name="Osm">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer>
                    {/* <LayersControl.BaseLayer name="HOT">
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
                            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                        />
                    </LayersControl.BaseLayer> */}

                </LayersControl>

                <PoyLineUi />
            </MapContainer>

            <div className="absolute IRANSansX-Medium text-sm text-center bottom-0 right-0 bg-white w-fit px-3 z-1000 py-1 rounded-tl-md">
                made with ❤️ by Amirmohammad
            </div>
        </div>

    )
}

export default LeafletComp;