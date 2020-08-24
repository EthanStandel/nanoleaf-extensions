import { NanoleafExtensions } from "../services/NanoleafExtensions";
import { Utils } from "../utils";
import nanoleafApiDetails from "../resources/nanoleaf-api-details.json";

const nanoleafExtensions = new NanoleafExtensions(nanoleafApiDetails)

const flashingTest = async () => {
    await nanoleafExtensions.failureEvent();
    await Utils.sleep(3);
    await nanoleafExtensions.successEvent();
}

flashingTest();
