import { RowsFakeFactory } from "./RowsFakeFactory";

test("row.id自动创建", () => {
    const factory = new RowsFakeFactory();
    const rows = factory.createRows(1);
    expect(rows.length).toEqual(1);
    expect(rows[0].id).toEqual("ID-1");
});

test("row[DateTime]", () => {
    const factory = new RowsFakeFactory();
    const min = new Date(2000, 1, 1);
    const max = new Date(2001, 1, 1);
    factory.addDateTime("生日", "birth", min, max);
    const rows: any = factory.createRows(100);
    rows.forEach((row: any) => {
        expect(row.birth).toBeDefined();
        expect(row.birth.getTime()).toBeGreaterThanOrEqual(min.getTime());
        expect(row.birth.getTime()).toBeLessThanOrEqual(max.getTime());
    });
});

test("row[int]", () => {
    const factory = new RowsFakeFactory();
    const min = 100;
    const max = 200;
    factory.addIntColumn("年龄", "age", min, max);
    const rows: any = factory.createRows(1);
    rows.forEach((row: any) => {
        expect(row.age).toBeGreaterThanOrEqual(min);
        expect(row.age).toBeLessThanOrEqual(max);
    });
});

test("row[Number]", () => {
    const factory = new RowsFakeFactory();
    const min = 100;
    const max = 200;
    factory.addNumberColumn("工资", "money", min, max, 2);
    const rows: any = factory.createRows(100);
    rows.forEach((row: any) => {
        expect(row.money).toBeGreaterThanOrEqual(min);
        expect(row.money).toBeLessThanOrEqual(max);
    });
});

test("row[PK外键]", () => {
    const factory = new RowsFakeFactory();
    factory.addFkColumn("部门ID", "departmentId", 3);
    const rows: any = factory.createRows(3);
    expect(rows[0].departmentId).toEqual("ID-2");
    expect(rows[rows.length - 1].departmentId).toEqual("ID-1");
});

test("row[String]", () => {
    const factory = new RowsFakeFactory();
    factory.addStringColumn("姓名", "name");
    const rows: any = factory.createRows(2);
    expect(rows[0].name).toEqual("姓名_1");
    expect(rows[1].name).toEqual("姓名_2");
});

test("row[Bool]", () => {
    const factory = new RowsFakeFactory();
    factory.addBoolColumn("性别", "sex");
    const rows: any = factory.createRows(2);
    expect(rows[0].sex).not.toEqual(rows[1].sex);
});

test("RowsFakeFactory.createRows(5, 3)--Ok", () => {
    const factory = new RowsFakeFactory();
    factory.addStringColumn("姓名", "name");
    const rows: any = factory.createRows(5, 3);
    expect(rows[0].name).toEqual("姓名_1");
    expect(rows[0].children[0].name).toEqual("姓名_2");
    expect(rows[0].children[0].id).toEqual("ID-2");
    const children = rows[0].children;
    if (children) {
        expect(children.length).toEqual(3);
    }
});
