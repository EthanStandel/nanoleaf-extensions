import { AxiosResponse } from "axios";
import { NanoleafApi } from "./NanoleafApi";
import { PowerState } from "../models/PowerState";
import { State } from "../models/State";
import { Utils } from "../utils";
import { Colors } from "../models/Colors";

export namespace NanoleafExtensions {

    const getState = async (): Promise<State> => ({
        power: await NanoleafApi.getPowerState(),
        colorMode: await NanoleafApi.getColorMode(),
        effect: await NanoleafApi.getCurrentlySetEffect(),
        brightness: await NanoleafApi.getBrightness(),
        colorTemperature: await NanoleafApi.getColorTemperature(),
        hue: await NanoleafApi.getHue(),
        saturation: await NanoleafApi.getSaturation()
    });

    const setState = async ({
        power,
        colorMode,
        effect,
        colorTemperature,
        hue,
        saturation,
        brightness
    }: State): Promise<void> => {
        await NanoleafApi.setPowerState(power);
        await NanoleafApi.setBrightness(brightness);

        if (colorMode === "effect") {
            await NanoleafApi.setEffect(effect);
        } else if (colorMode === "ct") {
            await NanoleafApi.setColorTemperature(colorTemperature);
        } else if (colorMode === "hs") {
            await NanoleafApi.setHue(hue);
            await NanoleafApi.setSaturation(saturation);
        }
    }

    const pulse = async (count: number): Promise<void> => {
        for (let i = 0; i < count; i++) {
            await NanoleafApi.setBrightness(1, 1);
            await Utils.sleep(1);
            await NanoleafApi.setBrightness(100, 1);
            await Utils.sleep(1);
        }
    }

    const flashEvent = async (
        flashState: State,
        flashCount: number = 3
    ): Promise<void> => {
        const originalState = await getState();
        await setState(flashState);
        await pulse(flashCount);
        await setState(originalState);
    }

    export const togglePowerState = async () => {
        const powerState = await NanoleafApi.getPowerState();
    
        NanoleafApi.setPowerState(
            powerState === PowerState.On ? PowerState.Off : PowerState.On
        );
    }

    export const successEvent = (): Promise<void> => {
        return flashEvent(Colors.Green);
    }

    export const failureEvent = (): Promise<void> => {
        return flashEvent(Colors.Red);
    }
}
