import { createContext } from "react";
import { Rate } from "./utilities/parser";

type Context = {
    selectedCurrency: Rate | null,
    setSelectedCurrency: (value: Rate | null) => void;
}

export default createContext<Context>({
    selectedCurrency: null,
    setSelectedCurrency: () => {}
})