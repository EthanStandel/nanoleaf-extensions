export namespace Utils {

    export const sleep = async (seconds: number): Promise<void> => {
        return new Promise(resolve => setTimeout(resolve, seconds * 1000));
    }

    export const asyncRepeater = async<T> (
        asyncFunction: () => Promise<T>,
        repetitions: number
    ): Promise<T> => {
        const asyncFunctions = Array.from({ length: repetitions })
            .map(() => asyncFunction);

        return synchronouslyAwaitAsyncFunctions(asyncFunctions);
    }

    export const synchronouslyAwaitAsyncFunctions = async<T> (
        asyncFunctions: Array<() => Promise<T>>
    ): Promise<T> => {
        return await asyncFunctions
            .reduce(async (
                previousPromise: Promise<T>,
                nextAsyncFunction: () => Promise<T>
            ): Promise<T> => {
                await previousPromise;
                return await nextAsyncFunction();
            }, Promise.resolve(undefined as any as T));
    }

}
