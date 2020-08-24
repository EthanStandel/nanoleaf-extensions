import axios, { AxiosResponse } from "axios";
import { NanoleafApiDetails } from "../models/NanoleafApiDetails";
import { PowerState } from "../models/PowerState";
import { ApiState } from "../models/ApiState";
import { ApiEffects } from "../models/ApiEffects";

export class NanoleafApi {



    // as statement forces type check
    private readonly baseEndpoint: string;
    private readonly stateEndpoint: string;
    private readonly effectsEndpoint: string;

    public constructor({ address, port, token }: NanoleafApiDetails) {
        this.baseEndpoint = `http://${address}:${port}/api/v1/${token}`
        this.stateEndpoint = `${this.baseEndpoint}/state`;
        this.effectsEndpoint= `${this.baseEndpoint}/effects`
    }

    private setState(state: ApiState): Promise<AxiosResponse> {
        return axios.put(this.stateEndpoint, state);
    }

    private async getStateDetails(detail: keyof ApiState | "" = ""): Promise<ApiState> {
        const response = await axios.get(`${this.stateEndpoint}/${detail}`);
        return !detail ? response.data : { [detail]: response.data };
    }

    private async getEffectsDetails(detail: keyof ApiEffects | "" = ""): Promise<ApiEffects> {
        const response = await axios.get(`${this.effectsEndpoint}/${detail}`);
        return !detail ? response.data : { [detail]: response.data };
    }

    public setPowerState(powerState: PowerState): Promise<AxiosResponse> {
        const state: ApiState = { on: { value: powerState === PowerState.On } };
        return this.setState(state);
    }

    public async getPowerState(): Promise<PowerState> {
        const state = await this.getStateDetails("on");
        
        if (state.on!.value) {
            return PowerState.On;
        } else {
            return PowerState.Off;
        }
    }

    public async getBrightness(): Promise<number> {
        const state = await this.getStateDetails("brightness");
        return state.brightness!.value;
    }

    public setBrightness(
        value: number,
        transitionSeconds: number = 1
    ): Promise<AxiosResponse> {
        const brightness: ApiState.Brightness = {
            value, duration: transitionSeconds
        }
        
        return this.setState({ brightness });
    }

    public async getHue(): Promise<number> {
        const state = this.getStateDetails("hue");
        return (await state).hue!.value;
    }

    public async setHue(value: number): Promise<AxiosResponse> {
        const hue: ApiState.Hue = { value };
        return this.setState({ hue });
    }

    public async getSaturation(): Promise<number> {
        const state = await this.getStateDetails("sat");
        return state.sat!.value;
    }

    public setSaturation(value: number): Promise<AxiosResponse> {
        const sat: ApiState.Saturation = { value };
        return this.setState({ sat });
    }

    public async getColorTemperature(): Promise<number> {
        const state = await this.getStateDetails("ct");
        return state.ct!.value;
    }

    public async setColorTemperature(value: number): Promise<AxiosResponse> {
        const ct: ApiState.ColorTemperature = { value };
        return this.setState({ ct });
    }

    public async getColorMode(): Promise<ApiState.ColorMode> {
        const state = await this.getStateDetails("colorMode");
        return state.colorMode!;
    }

    public async getCurrentlySetEffect(): Promise<ApiEffects.Select> {
        const effects = await this.getEffectsDetails("select");
        return effects!.select!;
    }

    public async getAllEffectOptions(): Promise<ApiEffects.List> {
        const effects = await this.getEffectsDetails("effectsList");
        return effects.effectsList!;
    }

    public setEffect(select: ApiEffects.Select): Promise<AxiosResponse> {
        return axios.put(this.effectsEndpoint, { select });
    }

}
