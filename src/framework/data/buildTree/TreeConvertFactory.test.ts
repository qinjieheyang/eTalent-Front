import { TreeConvertFactory } from "./TreeConvertFactory";

test("TreeConvertFactory.topTable()", () => {
    const rows = [{ id: "1", name: "user1" }, { id: "1", name: "user2" }];
    const factory = TreeConvertFactory.topTable("user", rows);
    const treeConvert = factory.getConvert();
    const nodes = treeConvert.getTree();
    expect(nodes.length).toEqual(2);
});

test("TreeConvertFactory : 单表连接单表", () => {
    const unitRows = [{ id: "1", name: "unit1" }, { id: "2", name: "unit2" }];
    const userRows = [{ id: "1", name: "user1", unitId: "1" }, { id: "1", name: "user2", unitId: "2" }];

    const factory = TreeConvertFactory.topTable("unit", unitRows).joinTable("user", userRows, "unitId");
    const treeConvert = factory.getConvert();
    const nodes = treeConvert.getTree();
    expect(nodes.length).toEqual(2);
    expect(nodes[0].children).not.toBeNull();
    expect(nodes[0].children.length).toEqual(1);
    expect(nodes[0].children[0].type).toEqual("user");
    expect(nodes[0].children[0].name).toEqual("user1");
});

test("TreeConvertFactory : ParentID表自连接", () => {
    const unitRows = [{ id: "1", name: "unit1", parentId: undefined }, { id: "2", name: "unit2", parentId: "1" }];

    const factory = TreeConvertFactory.topParentIdTable("unit", unitRows);
    const treeConvert = factory.getConvert();
    const nodes = treeConvert.getTree();
    expect(nodes.length).toEqual(1);
    expect(nodes[0].children).not.toBeNull();
    expect(nodes[0].children.length).toEqual(1);
    expect(nodes[0].children[0].type).toEqual("unit");
    expect(nodes[0].children[0].name).toEqual("unit2");
});

test("TreeConvertFactory : ParentID表 Join ParentID表", () => {
    const unitRows = [{ id: "1", name: "unit1", parentId: undefined }, { id: "2", name: "unit2", parentId: "1" }];
    const departmentRows = [
        { id: "1", name: "dep1", parentId: undefined, unitId: "1" },
        { id: "2", name: "dep2", parentId: "1", unitId: "1" }
    ];
    const factory = TreeConvertFactory.topParentIdTable("unit", unitRows).joinParentIdTable(
        "department",
        departmentRows,
        "unitId"
    );
    const treeConvert = factory.getConvert();
    const nodes = treeConvert.getTree();
    expect(nodes.length).toEqual(1);
    expect(nodes[0].children).not.toBeNull();
    expect(nodes[0].children.length).toEqual(2);
});
