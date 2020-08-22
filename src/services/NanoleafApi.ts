import axios, { AxiosResponse } from "axios";
import nanoleafApiDetails from "../resources/nanoleaf-api-details.json";
import { NanoleafApiDetails } from "../models/NanoleafApiDetails";
import { PowerState } from "../models/PowerState";
import { ApiState } from "../models/ApiState";
import { ApiEffects } from "../models/ApiEffects";

export namespace NanoleafApi {

    // as statement forces type check
    const { address, token, port } = nanoleafApiDetails as NanoleafApiDetails;

    const baseEndpoint = `http://${address}:${port}/api/v1/${token}`;
    const stateEndpoint = `${baseEndpoint}/state`;
    const effectsEndpoint = `${baseEndpoint}/effects`;

    const setState = (state: ApiState): Promise<AxiosResponse> => {
        return axios.put(stateEndpoint, state);
    }

    const getStateDetails = async (detail: keyof ApiState | "" = ""): Promise<ApiState> => {
        const response = await axios.get(`${stateEndpoint}/${detail}`);
        return !detail ? response.data : { [detail]: response.data };
    }

    const getEffectsDetails = async (detail: keyof ApiEffects | "" = ""): Promise<ApiEffects> => {
        const response = await axios.get(`${effectsEndpoint}/${detail}`);
        return !detail ? response.data : { [detail]: response.data };
    }

    export const setPowerState = (powerState: PowerState): Promise<AxiosResponse> => {
        const state: ApiState = { on: { value: powerState === PowerState.On } };
        return setState(state);
    }

    export const getPowerState = async (): Promise<PowerState> => {
        const state = await getStateDetails("on");
        
        if (state.on!.value) {
            return PowerState.On;
        } else {
            return PowerState.Off;
        }
    }

    export const getBrightness = async (): Promise<number> => {
        const state = await getStateDetails("brightness");
        return state.brightness!.value;
    }

    export const setBrightness = (
        value: number,
        transitionSeconds: number = 1
    ): Promise<AxiosResponse> => {
        const brightness: ApiState.Brightness = {
            value, duration: transitionSeconds
        }
        
        return setState({ brightness });
    }

    export const getHue = async (): Promise<number> => {
        const state = getStateDetails("hue");
        return (await state).hue!.value;
    }

    export const setHue = (value: number): Promise<AxiosResponse> => {
        const hue: ApiState.Hue = { value };
        return setState({ hue });
    }

    export const getSaturation = async (): Promise<number> => {
        const state = await getStateDetails("sat");
        return state.sat!.value;
    }

    export const setSaturation = (value: number): Promise<AxiosResponse> => {
        const sat: ApiState.Saturation = { value };
        return setState({ sat });
    }

    export const getColorTemperature = async (): Promise<number> => {
        const state = await getStateDetails("ct");
        return state.ct!.value;
    }

    export const setColorTemperature = (value: number): Promise<AxiosResponse> => {
        const ct: ApiState.ColorTemperature = { value };
        return setState({ ct });
    }

    export const getColorMode = async (): Promise<ApiState.ColorMode> => {
        const state = await getStateDetails("colorMode");
        return state.colorMode!;
    }

    export const getCurrentlySetEffect = async (): Promise<ApiEffects.Select> => {
        const effects = await getEffectsDetails("select");
        return effects!.select!;
    }

    export const getAllEffectOptions = async (): Promise<ApiEffects.List> => {
        const effects = await getEffectsDetails("effectsList");
        return effects.effectsList!;
    }

    export const setEffect = (select: ApiEffects.Select): Promise<AxiosResponse> => {
        return axios.put(effectsEndpoint, { select });
    }

}
