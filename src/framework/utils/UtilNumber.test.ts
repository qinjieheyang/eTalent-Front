import { NumberClass } from "./UtilNumber";

const util = new NumberClass();
test(" util.numberToFixed(1.1,2)", () => {
    const num = util.numberToFixed(1.1, 2);
    expect(num).toEqual(1.1);
});

test("UtilNumber.numberToRMB(1.1)", () => {
    const text = util.numberToRMB(1.1);
    expect(text).toEqual("1.1");
});

test("UtilNumber.numberToRMB(123.15))", () => {
    const text = util.numberToRMB(123.15);
    expect(text).toEqual("123.15");
});

test("UtilNumber.numberToRMB(123.145))", () => {
    const text = util.numberToRMB(123.145);
    expect(text).toEqual("123.15");
});

test("UtilNumber.numberToRMB(1123.145))", () => {
    const text = util.numberToRMB(1123.145);
    expect(text).toEqual("1,123.15");
});

test("UtilNumber.numberToRMB(2221123.145))", () => {
    const text = util.numberToRMB(2221123.145);
    expect(text).toEqual("2,221,123.15");
});

test("UtilNumber.numberToRMB(2221123.145))+$", () => {
    const text = util.numberToRMB(2221123.145, "$");
    expect(text).toEqual("$2,221,123.15");
});
