import axios from "axios";
import nanoleafApiDetails from "../resources/nanoleaf-api-details.json";
import { NanoleafApiDetails } from "../models/NanoleafApiDetails";
import { PowerState } from "../models/PowerState";

export namespace NanoleafApi {

    const apiDetails: NanoleafApiDetails = nanoleafApiDetails;

    const baseEndpoint = (): string => {
        const { address, token } = apiDetails;
        return `http://${address}/api/v1/${token}`
    }

    const setPowerStateEndpoint = (): string => {
        return `${baseEndpoint()}/state`;
    }

    const getPowerStateEndpoint = (): string => {
        return `${baseEndpoint()}/state/on`;
    }

    export const setPowerState = (powerState: PowerState): Promise<void> => {
        const value = powerState === PowerState.On;
        return axios.put(setPowerStateEndpoint(), { on: { value } });
    }

    export const getPowerState = async (): Promise<PowerState> => {
        const response = await axios.get(getPowerStateEndpoint());
        
        if (response.data.value) {
            return PowerState.On
        } else {
            return PowerState.Off;
        }
    }

}
