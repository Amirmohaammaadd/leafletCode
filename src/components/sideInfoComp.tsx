import { PushpinOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useMainContext } from "../context/mainContext";
import carIcon from '../assets/1.svg'
import tiemIcon from '../assets/2.svg'

const SideInfoComp = () => {
    const { selection, selectedCityNames, dataInPolyline, setDataInPolyline, setSelection } = useMainContext()

    return (
        <div className={`w-[300px] py-5 right-0 m-5 p-10 bg-[#edeef7] z-500 
            shadow-xl rounded-xl transition-all duration-700 !absolute hidden md:flex ${selection[0] && selection[1] ? "translate-x-0" : "translate-x-100"} `}>


            <div className="flex flex-col gap-10">
                {/* ---------- A -------- */}
                <div className="flex justify-between items-center">
                    <div className="flex justify-between items-center gap-1 ml-3">
                        <PushpinOutlined className="text-2xl !text-green-700" />
                        <p className="text-[15px]">مبدا</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="text-sm text-slate-400">ایران</span>
                        <h2 className="text-xl text-slate-900">{selectedCityNames[0]}</h2>
                    </div>
                </div>

                {/* ---------- B -------- */}

                <div className="flex justify-between items-center">
                    <div className="flex justify-between items-center gap-1">
                        <PushpinOutlined className="text-2xl !text-red-700" />
                        <p className="text-[15px]">مقصد</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="text-sm text-slate-400">ایران</span>
                        <h2 className="text-xl text-slate-900">{selectedCityNames[1]}</h2>
                    </div>
                </div>

                {/* ---------- c -------- */}

                <div className="flex flex-col gap-5">
                    <div className="flex justify-between items-center">
                        <div className="text-sm flex flex-col gap-1" >
                            <span className="text-sm">
                                مسافت

                            </span>
                            {dataInPolyline?.distance && (dataInPolyline?.distance / 1000).toFixed(0)} KM
                        </div>
                        <img src={carIcon} className="w-1/4 mb-2" />
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="text-sm flex flex-col gap-1" >
                            <span>زمان حدودی</span>
                            <span dir="ltr" className="text-right">

                                {dataInPolyline?.duration || "0 : 0"}
                            </span>
                        </div>
                        <img src={tiemIcon} className="w-1/4 mb-2" />
                    </div>
                </div>

                <Button onClick={() => { setSelection(['', '']), setDataInPolyline(null) }
                } className="!bg-red-600" type="primary" size="large">
                    انصراف
                </Button>

            </div>
        </div>
    );
}

export default SideInfoComp;