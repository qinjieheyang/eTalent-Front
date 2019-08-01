import { SearchTable } from "./SearchTable";

const rows = [
    { name: "张1", age: 22, children: [{ name: "张12", age: 25 }] },
    { name: "李安2", age: 28 },
    { name: "王3", age: 100 }
];

test("SearchTable---string-equal---Ok", () => {
    const searchTable = new SearchTable(rows);
    const findRows = searchTable.search({ name: "张1" });
    expect(findRows.length).toEqual(1);
    const row张1 = findRows[0];
    expect(row张1.children).not.toBeDefined();
});

test("SearchTable---string-like---Ok", () => {
    const searchTable = new SearchTable(rows);
    const findRows = searchTable.search({ name_like: "2" });
    expect(findRows.length).toEqual(2);
    const row张1 = findRows[0];
    expect(row张1.children).toBeDefined();
    if (row张1.children) {
        expect(row张1.children.length).toEqual(1);
    }

    const row李安2 = findRows[1];
    expect(row李安2.children).not.toBeDefined();
});

test("SearchTable.search( { name:'安'} )--Ok", () => {
    const searchTable = new SearchTable(rows);
    const findRows = searchTable.search({ name_like: "安" });
    expect(findRows.length).toEqual(1);
    const row李安2: any = findRows[0];
    expect(row李安2.children).not.toBeDefined();
    expect(row李安2.name).toEqual("李安2");
});

test("SearchTable.search( { age_gt:24}--Ok", () => {
    const searchTable = new SearchTable(rows);
    const findRows = searchTable.search({ age_gt: 24 });
    expect(findRows.length).toEqual(3);
    const row: any = findRows[0];
    expect(row.children[0].name).toEqual("张12");
});

test("SearchTable.search( { age_gt:27}--Ok", () => {
    const searchTable = new SearchTable(rows);
    const findRows = searchTable.search({ age_gt: 27 });
    expect(findRows.length).toEqual(2);
    const row: any = findRows[0];
    expect(row.name).toEqual("李安2");
});

test("SearchTable.getRowCountBySearch( { age_gt:27} )--Ok", () => {
    const searchTable = new SearchTable(rows);
    const rowCount = searchTable.getRowCountBySearch({ age_gt: 27 });
    expect(rowCount).toEqual(2);
});
