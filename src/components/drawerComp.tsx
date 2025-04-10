import { Drawer, Select } from "antd";
import { useMainContext } from "../context/mainContext";
import { IranGeo } from "../data/IranGeo";

const DrawerComp = () => {
    const { Option } = Select
    const { openDrawer, setOpenDrawer, setSelection, selectedCityNames, setSelectedCityNames, selection } = useMainContext()

    // -------------- Get Data ---------------

    const handleChange = (value: string, index: number) => {
        const newSelection = [...selection];
        newSelection[index] = value;
        setSelection(newSelection);

        const selectedFeature = IranGeo.features.find((item) => {
            const val = `${item.geometry.coordinates[0]},${item.geometry.coordinates[1]}`;
            return val === value;
        });

        if (selectedFeature) {
            const cityName = selectedFeature?.properties?.name;
            const newCityNames = [...selectedCityNames];
            newCityNames[index] = cityName;
            setSelectedCityNames(newCityNames);
        }
    };

    return (
        <Drawer
            placement="bottom"
            closable={false}
            onClose={() => setOpenDrawer(false)}
            open={openDrawer}
            className="!bg-slate-50"
        >
            <div className="flex shadow-2xl IRANSansX-Medium bg-white flex-col bottom-5 justify-center items-center border border-slate-300 mt-5 mx-auto rounded-2xl z-1000 gap-10 p-10 w-[400px]">
                {/* ------------------------- */}

                <h1>لطفا شهر مبدا و مقصد خود را انتخاب کنید</h1>

                <Select
                    size="large"
                    placeholder="شهر مبدا را انتخاب کنید"
                    value={selection[0] || undefined}
                    className="w-[270px]"
                    onChange={(value) => handleChange(value, 0)}
                >
                    {IranGeo.features.map((item) => {
                        const val = `${item.geometry.coordinates[0]},${item.geometry.coordinates[1]}`;
                        return (
                            <Option
                                value={val}
                                key={`dest-${item?.properties?.name}`}
                                disabled={val === selection[1]}
                                className="!mr-3 !my-1"
                            >
                                {item?.properties?.name}
                            </Option>
                        );
                    })}
                </Select>

                {/* ------------------------- */}
                <Select
                    size="large"
                    className="w-[270px]"
                    placeholder="شهر مقصد را انتخاب کنید"
                    value={selection[1] || undefined}
                    onChange={(value) => handleChange(value, 1)}
                >
                    {IranGeo.features.map((item) => {
                        const val = `${item.geometry.coordinates[0]},${item.geometry.coordinates[1]}`;
                        return (
                            <Option
                                value={val}
                                key={`dest-${item?.properties?.name}`}
                                disabled={val === selection[0]}
                                className="!mr-3 !my-1"
                            >
                                {item?.properties?.name}
                            </Option>
                        );
                    })}
                </Select>
            </div>
        </Drawer>

    );
}

export default DrawerComp;