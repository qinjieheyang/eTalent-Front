export function assert(condition: boolean, msg: string) {
    if (condition === true) {
        return;
    }

    throw new Error("assert:" + msg);
}
