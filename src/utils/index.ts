export namespace Utils {

    export const sleep = async (seconds: number): Promise<void> => {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }

    export const asyncRepeater = async (
        asyncFunction: () => Promise<void>,
        repetitions: number
    ): Promise<void> => {
        await Array.from({ length: repetitions })
            .map(() => asyncFunction)
            .reduce(async (
                previousPromise: Promise<void>,
                nextAsyncFunction: () => Promise<void>
            ): Promise<void> => {
                await previousPromise;
                await nextAsyncFunction();
            }, Promise.resolve());
    }

}
