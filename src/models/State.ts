import { PowerState } from "./PowerState";
import { ApiState } from "./ApiState";

export interface State {

    power: PowerState;
    colorMode: ApiState.ColorMode;
    effect: string;
    brightness: number;
    colorTemperature: number;
    hue: number;
    saturation: number;

}
