import React, { createContext, PropsWithChildren, useContext, useState } from "react";
import { PolylineData } from "../services/types";

interface MyContextProps {
    selection: string[];
    setSelection: React.Dispatch<React.SetStateAction<string[]>>;

    selectedCityNames: string[];
    setSelectedCityNames: React.Dispatch<React.SetStateAction<string[]>>;

    openDrawer: boolean
    setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>

    dataInPolyline: PolylineData | null
    setDataInPolyline: React.Dispatch<React.SetStateAction<PolylineData | null>>
}

const MyContext = createContext<MyContextProps | null>(null)

export const MainContext = ({ children }: PropsWithChildren) => {
    const [selection, setSelection] = useState<string[]>([]);
    const [selectedCityNames, setSelectedCityNames] = useState<string[]>([]);
    const [dataInPolyline, setDataInPolyline] = useState<PolylineData | null>(null);

    const [openDrawer, setOpenDrawer] = useState(false);

    return (
        <MyContext.Provider value={{ selection, setSelection, selectedCityNames, setSelectedCityNames, openDrawer, setOpenDrawer, dataInPolyline, setDataInPolyline }}>
            {children}
        </MyContext.Provider>
    );
}

export const useMainContext = () => {
    const context = useContext(MyContext)

    if (!context) {
        throw new Error(
            "useMainContext must be used within a MainContext provider",
        );
    }
    return context
}

