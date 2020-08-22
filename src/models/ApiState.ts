export interface ApiState {
    brightness?: ApiState.Brightness;

    colorMode?: ApiState.ColorMode;
    
    ct?: ApiState.ColorTemperature;

    hue?: ApiState.Hue;

    on?: ApiState.Power;

    sat?: ApiState.Saturation;
}

export namespace ApiState {

    export interface Brightness {
        value: number;
        max?: number;
        min?: number;
        duration?: number;
    }

    export type ColorMode = "effect" | "ct" | "hs";

    export interface ColorTemperature {
        value: number;
        max?: number;
        min?: number;
    }

    export interface Hue {
        value: number;
        max?: number;
        min?: number;
    }

    export interface Power {
        value: boolean;
    }

    export interface Saturation {
        value: number;
        max?: number;
        min?: number;
    }

}
