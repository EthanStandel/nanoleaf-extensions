import { State } from "./State";
import { PowerState } from "./PowerState";

const solidColorBase = {
    power: PowerState.On,
    brightness: 100,
    effect: "*Solid*"
}

export const Colors = {
    Green: {
        ...solidColorBase,
        colorMode: "hs",
        colorTemperature: 5000,
        hue: 120,
        saturation: 100
    } as State,
    Red: {
        ...solidColorBase,
        colorMode: "hs",
        colorTemperature: 5000,
        hue: 0,
        saturation: 100
    } as State,
    White: {
        ...solidColorBase,
        colorMode: "hs",
        colorTemperature: 5000,
        hue: 0,
        saturation: 100
    } as State
};
