import { AxiosResponse } from "axios";
import { NanoleafApi } from "./NanoleafApi";
import { PowerState } from "../models/PowerState";
import { State } from "../models/State";
import { Utils } from "../utils";

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

    const setGreen = async (): Promise<void> => {
        await setState({
            power: PowerState.On,
            colorMode: "hs",
            brightness: 100,
            colorTemperature: 5000,
            hue: 120,
            saturation: 100,
            effect: "*Solid*"
        });
    }

    const pulse = async (count: number): Promise<void> => {
        for (let i = 0; i < count; i++) {
            await NanoleafApi.setBrightness(1, 1);
            await Utils.sleep(1);
            await NanoleafApi.setBrightness(100, 1);
            await Utils.sleep(1);
        }
    }

    export const togglePowerState = async () => {
        const powerState = await NanoleafApi.getPowerState();
    
        NanoleafApi.setPowerState(
            powerState === PowerState.On ? PowerState.Off : PowerState.On
        );
    }

    export const successEvent = async (): Promise<void> => {
        const originalState = await getState();
        await setGreen();
        await pulse(5);
        await setState(originalState);
    }

}
