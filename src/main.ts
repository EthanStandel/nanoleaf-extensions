import { NanoleafExtensions } from "./services/NanoleafExtensions";
import { Utils } from "./utils";

const test = async () => {
    await NanoleafExtensions.failureEvent();
    await Utils.sleep(3);
    await NanoleafExtensions.successEvent();
}

test();
