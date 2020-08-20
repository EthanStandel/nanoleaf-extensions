import { NanoleafApi } from "./services/NanoleafApi";
import { PowerState } from "./models/PowerState";

const togglePowerState = async () => {
    const powerState = await NanoleafApi.getPowerState();

    NanoleafApi.setPowerState(
        powerState === PowerState.On ? PowerState.Off : PowerState.On
    );
}

togglePowerState();
