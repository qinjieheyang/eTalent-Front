// import { Page } from "../../struct";
import { FieldFacotry } from "./FieldFacotry";

// const pager= new  Page() ;

test("BoolField-sex -OK", () => {
    const factory = new FieldFacotry({ sex: false });
    expect(factory.getField("sex")).toBeDefined();
    const findFunc = factory.getField("sex").getFindFunc();
    expect(findFunc({ sex: true })).toEqual(false);
    expect(findFunc({ sex: false })).toEqual(true);
});

test("NumberField-OK", () => {
    const factory = new FieldFacotry({ age_gt: 10 });
    expect(factory.getField("age")).toBeDefined();
    const findFunc = factory.getField("age").getFindFunc();
    expect(findFunc({ age: 9 })).toEqual(false);
    expect(findFunc({ age: 11 })).toEqual(true);
});

test("StringField-equal-OK", () => {
    const factory = new FieldFacotry({ name: "111" });
    expect(factory.getField("name")).toBeDefined();
    expect(factory.getFields().length).toEqual(1);
    const findFunc = factory.getField("name").getFindFunc();
    expect(findFunc({ name: "a111a" })).toEqual(false);
    expect(findFunc({ name: "111" })).toEqual(true);
});

test("StringField-like-OK", () => {
    const factory = new FieldFacotry({ name_like: "111" });
    expect(factory.getField("name")).toBeDefined();
    expect(factory.getFields().length).toEqual(1);
    const findFunc = factory.getField("name").getFindFunc();
    expect(findFunc({ name: "a111a" })).toEqual(true);
    expect(findFunc({ name: "a222a" })).toEqual(false);
});

test("DatetimeField-OK", () => {
    const factory = new FieldFacotry({ birth_gt: new Date(2010, 11, 11) });
    expect(factory.getField("birth")).toBeDefined();
    const findFunc = factory.getField("birth").getFindFunc();
    expect(findFunc({ birth: new Date(2010, 11, 10) })).toEqual(false);
    expect(findFunc({ birth: new Date(2010, 11, 12) })).toEqual(true);
});

test("FieldFacotry.getFindFuncs()-OK", () => {
    const factory = new FieldFacotry({ birth_gt: new Date(2010, 11, 11) });

    expect(factory.getFindFuncs().length).toEqual(1);
});
