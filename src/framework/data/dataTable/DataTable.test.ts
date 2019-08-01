 
import { RowsFakeFactory } from '../../test/fake/RowsFakeFactory';
import { DataTable } from "./DataTable";




// ==================================================
// --------------- 平面维表格测试 --------------------
function getFakeFactory(): RowsFakeFactory {
    const fakeFactory = new RowsFakeFactory();
    fakeFactory.addStringColumn("姓名", "name");
    fakeFactory.addDateTime("生日", "birth");
    fakeFactory.addIntColumn("年龄", "age");
    fakeFactory.addNumberColumn("工资", "money");
    return fakeFactory;
}

test("查找【ID-2】记录", () => {
    const fakeFactory = getFakeFactory();
    const rows = fakeFactory.createRows(10);
    const table = new DataTable(rows);
    expect(table.isExist("ID-2")).toEqual(true);
    expect(table.getById("ID-2")).toBeDefined();
});

test("查找【ID-2、ID-3】记录", () => {
    const fakeFactory = getFakeFactory();
    const rows = fakeFactory.createRows(10);
    const table = new DataTable(rows);
    expect(table.getByIds(["ID-2", "ID-3"]).length).toEqual(2);
});

test("插入底部", () => {
    const fakeFactory = getFakeFactory();
    const rows = fakeFactory.createRows(100);
    const table = new DataTable(rows);
    const newRow = fakeFactory.createRow();
    table.add(newRow); // ....call
    expect(table.rows.length).toEqual(101);
    expect(table.rows[100]).toEqual(newRow);
});

test("插入顶部", () => {
    const fakeFactory = getFakeFactory();
    const rows = fakeFactory.createRows(100);
    const table = new DataTable(rows);
    const newRow = fakeFactory.createRow();
    table.addTop(newRow);
    expect(table.rows.length).toEqual(101);
    expect(table.rows[0]).toEqual(newRow);
});

test("更新", () => {
    const fakeFactory = getFakeFactory();
    const rows = fakeFactory.createRows(10);
    const table = new DataTable(rows);
    const newRow = fakeFactory.createRow();
    newRow.id = "ID-2";
    table.update(newRow);
    expect(table.getById("ID-2")).toEqual(newRow);
    expect(table.rows.length).toEqual(10);
});

test("删除", () => {
    const fakeFactory = getFakeFactory();
    const rows = fakeFactory.createRows(10);
    const table = new DataTable(rows);
    table.delete("ID-2");
    expect(table.rows.length).toEqual(9);
});

test("模糊筛选", () => {
    const fakeFactory = getFakeFactory();
    const rows = fakeFactory.createRows(10);
    const table = new DataTable(rows);
    table.filtrateToRemove("2", ["id"]);
    expect(table.rows.length).toEqual(1);
});

test("位移：上", () => {
    const fakeFactory = getFakeFactory();
    const rows = fakeFactory.createRows(10);
    const table = new DataTable(rows);
    expect(table.rows[2].id).toEqual("ID-3");
    table.moveUpById("ID-3");
    expect(table.rows[1].id).toEqual("ID-3");
});

test("位移：下", () => {
    const fakeFactory = getFakeFactory();
    const rows = fakeFactory.createRows(10);
    const table = new DataTable(rows);
    expect(table.rows[2].id).toEqual("ID-3");
    table.moveDownById("ID-3");
    expect(table.rows[3].id).toEqual("ID-3");
});

test("修改记录属性，保持等于", () => {
    const fakeFactory = getFakeFactory();
    const rows = fakeFactory.createRows(10);
    const table = new DataTable(rows);
    const table2 = new DataTable(rows);
    expect(table.rows[0]).toEqual(table2.rows[0]);
    const row: any = table.rows[0];
    row.name = "111";
    const row2: any = table2.rows[0];
    expect(row2.name).toEqual("111");
});

// ==================================================
// --------------- Tree 表格测试 --------------------

function getTreeFactory(): RowsFakeFactory {
    const fakeFactory = new RowsFakeFactory();
    fakeFactory.addStringColumn("姓名", "name");
    fakeFactory.addDateTime("生日", "birth");
    fakeFactory.addIntColumn("年龄", "age");
    fakeFactory.addNumberColumn("工资", "money");
    return fakeFactory;
}

test("TreeRows..查找【ID-1-2】记录", () => {
    const fakeFactory = getTreeFactory();
    const rows = fakeFactory.createRows(10, 2);
    const table = new DataTable(rows);
    expect(table.isExist("ID-1")).toEqual(true);
    expect(table.getById("ID-2")).toBeDefined();
});

test("TreeRows.插入底部", () => {
    const fakeFactory = getTreeFactory();
    const rows = fakeFactory.createRows(10, 2);
    const table = new DataTable(rows);
    const newRow = fakeFactory.createRow();
    table.add(newRow);
    expect(table.rows.length).toEqual(11);
    expect(table.rows[10]).toEqual(newRow);
});

test("TreeRows.插入顶部", () => {
    const fakeFactory = getFakeFactory();
    const rows = fakeFactory.createRows(10, 2);
    const table = new DataTable(rows);
    const newRow = fakeFactory.createRow();
    table.addTop(newRow);
    expect(table.rows.length).toEqual(11);
    expect(table.rows[0]).toEqual(newRow);
});

test("TreeRows.插入子记录", () => {
    const fakeFactory = getTreeFactory();
    const rows = fakeFactory.createRows(10, 2);
    const table = new DataTable(rows);

    const newChildRow = fakeFactory.createRow();
    expect(table.getById("ID-2").children).not.toBeDefined();
    table.addChild("ID-2", newChildRow);
    expect(table.getById("ID-2").children).toBeDefined();
});

test("TreeRows.全文筛选", () => {
    const fakeFactory = getFakeFactory();
    const rows = fakeFactory.createRows(10, 2);
    const table = new DataTable(rows);
    table.filtrateToRemove("_9", ["name"]);
    expect(table.rows.length).toEqual(1);
});
