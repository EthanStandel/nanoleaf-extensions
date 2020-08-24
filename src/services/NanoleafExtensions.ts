import { NanoleafApi } from "./NanoleafApi";
import { PowerState } from "../models/PowerState";
import { State } from "../models/State";
import { Utils } from "../utils";
import { Colors } from "../models/Colors";
import { NanoleafApiDetails } from "../models";

export class NanoleafExtensions {

    private readonly nanoleafApi: NanoleafApi;

    public constructor(apiProvider: NanoleafApi | NanoleafApiDetails) {
        if (apiProvider instanceof NanoleafApi) {
            this.nanoleafApi = apiProvider;
        } else {
            this.nanoleafApi = new NanoleafApi(apiProvider);
        }
    }

    public async getState(): Promise<State> {
        return {
            power: await this.nanoleafApi.getPowerState(),
            colorMode: await this.nanoleafApi.getColorMode(),
            effect: await this.nanoleafApi.getCurrentlySetEffect(),
            brightness: await this.nanoleafApi.getBrightness(),
            colorTemperature: await this.nanoleafApi.getColorTemperature(),
            hue: await this.nanoleafApi.getHue(),
            saturation: await this.nanoleafApi.getSaturation()
        };
    }

    public async setState({
        power,
        colorMode,
        effect,
        colorTemperature,
        hue,
        saturation,
        brightness
    }: State): Promise<void> {
        await this.nanoleafApi.setPowerState(power);
        await this.nanoleafApi.setBrightness(brightness);

        if (colorMode === "effect") {
            await this.nanoleafApi.setEffect(effect);
        } else if (colorMode === "ct") {
            await this.nanoleafApi.setColorTemperature(colorTemperature);
        } else if (colorMode === "hs") {
            await this.nanoleafApi.setHue(hue);
            await this.nanoleafApi.setSaturation(saturation);
        }
    }

    public async pulse(count: number): Promise<void> {
        for (let i = 0; i < count; i++) {
            await this.nanoleafApi.setBrightness(1, 1);
            await Utils.sleep(1);
            await this.nanoleafApi.setBrightness(100, 1);
            await Utils.sleep(1);
        }
    }

    public async flashEvent(
        flashState: State,
        flashCount: number = 3
    ): Promise<void> {
        const originalState = await this.getState();
        await this.setState(flashState);
        await this.pulse(flashCount);
        await this.setState(originalState);
    }

    public async togglePowerState() {
        const powerState = await this.nanoleafApi.getPowerState();
    
        this.nanoleafApi.setPowerState(
            powerState === PowerState.On ? PowerState.Off : PowerState.On
        );
    }

    public successEvent(): Promise<void> {
        return this.flashEvent(Colors.Green);
    }

    public failureEvent(): Promise<void> {
        return this.flashEvent(Colors.Red);
    }
}
