import * as React from "react";
import { Button, Layout, Menu, Card, Tree } from "antd";
import Framework from 'src/framework/Framework';
import CaseCommon from "src/caseCommon/CaseCommon";
import { Const, Columns } from "./Const";
import { Service } from "./Service";
import { IService, ServiceMock } from "./ServiceMock";
import { IState, initState } from "./State";

import { AddModal } from "./AddModal";
import { DeleteModal } from "./DeleteModal";
import { MessageType, UtilMessage } from 'src/framework/utils/Index';

// const { SubMenu } = Menu;
const { TreeNode } = Tree;

const { DropdownMore } = Framework.Com.Dropdowns;
const AdaptiveTable = Framework.Com.Tables.AdaptiveTable;

interface IProps { }
export default class Group extends CaseCommon.PageAsyncBase<IProps, IState, IService> {

    public state: IState = initState;

    public checkedValues: any[];

    constructor(props: IProps) {
        super(props, Const, ServiceMock, Service);
    }

    public async init() {
        const { pageSize, currentPage } = this.state;

        const { total, tableData } = await this.service.getPositionList({ pageSize, currentPage });

        this.setState({
            tableData,
            total
        })

    }

    // rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    // onOpenChange = (openKeys: string[]) => {
    //     const latestOpenKey = openKeys.find((key: string) => this.state.openKeys.indexOf(key) === -1);
    //     if (latestOpenKey && this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
    //         this.setState({ openKeys });
    //     } else {
    //         this.setState({
    //             openKeys: latestOpenKey ? [latestOpenKey] : [],
    //         });
    //     }
    // };

    private renderMore = () => (
        <Menu style={{ textAlign: "center" }}>
            <Menu.Item>排序</Menu.Item>
            <Menu.Item
                onClick={this.handleExport}>导出
            </Menu.Item>
        </Menu>
    );

    private renderSide = () => (
        <Tree showLine defaultExpandedKeys={['0-0-0', '0-0-1', '0-0-2']} >
            <TreeNode title="职位族" key="0-0">
                <TreeNode title="研发族" key="0-0-0">
                    <TreeNode title="leaf" key="0-0-0-0" />
                    <TreeNode title="leaf" key="0-0-0-1" />
                    <TreeNode title="leaf" key="0-0-0-2" />
                </TreeNode>
                <TreeNode title="销售族" key="0-0-1">
                    <TreeNode title="leaf" key="0-0-1-0" />
                </TreeNode>
                <TreeNode title="实施族" key="0-0-2">
                    <TreeNode title="leaf" key="0-0-2-0" />
                    <TreeNode title="leaf" key="0-0-2-1" />
                </TreeNode>
            </TreeNode>
        </Tree>
        // <Menu
        //     mode="inline"
        //     // openKeys={this.state.openKeys}
        //     // onOpenChange={this.onOpenChange}
        //     style={{ border: "none" }}
        // >
        //     <SubMenu
        //         key="sub1"
        //         title={
        //             <span>
        //                 <Icon type="mail" />
        //                 <span>研发族</span>
        //             </span>
        //         }
        //     >
        //         <Menu.Item key="1">产品设计</Menu.Item>
        //         <Menu.Item key="2">前端开发</Menu.Item>
        //         <Menu.Item key="3">后端测试</Menu.Item>
        //         <Menu.Item key="4">系统测试</Menu.Item>
        //     </SubMenu>
        //     <SubMenu
        //         key="sub2"
        //         title={
        //             <span>
        //                 <Icon type="appstore" />
        //                 <span>销售族</span>
        //             </span>
        //         }
        //     >
        //         <Menu.Item key="5">Option 5</Menu.Item>
        //         <Menu.Item key="6">Option 6</Menu.Item>
        //     </SubMenu>
        //     <SubMenu
        //         key="sub4"
        //         title={
        //             <span>
        //                 <Icon type="setting" />
        //                 <span>实施族</span>
        //             </span>
        //         }
        //     >
        //         <Menu.Item key="9">Option 9</Menu.Item>
        //         <Menu.Item key="10">Option 10</Menu.Item>
        //         <Menu.Item key="11">Option 11</Menu.Item>
        //         <Menu.Item key="12">Option 12</Menu.Item>
        //     </SubMenu>
        // </Menu>
    );

    public render() {
        const { tableData, pageSize, currentPage, total, confirmLoading, visibleAdd, visibleDelete, addModalTitle, checkedList } = this.state;

        const addProps = { visible: visibleAdd, confirmLoading, onOk: this.handleAdd, onCancel: this.handleAddCancel, title: addModalTitle };
        const delProps = { visible: visibleDelete, confirmLoading, onOk: this.handleDelete, onCancel: this.handleDelCancel, checkedList, onCheckedChange: this.handleCheckChange };
        return (
            <Layout style={{ height: "100%", margin: 1 }}>
                <Layout.Sider style={{ background: "#fff", borderRight: "1px solid #e8e8e8", padding: 8 }}>
                    {this.renderSide()}
                </Layout.Sider>
                <Layout.Content style={{ background: "#fff" }}>
                    <Card bodyStyle={{ padding: 16 }} bordered={false}>
                        <Framework.Com.Buttons.Tool.LeftArea>
                            <Button type="primary" onClick={() => { this.openAddModal() }}>新增</Button>
                            <Button onClick={this.openDelModal}>删除</Button>
                            <DropdownMore menu={this.renderMore()}></DropdownMore>
                        </Framework.Com.Buttons.Tool.LeftArea>
                        <AdaptiveTable
                            columns={this.GetColumns()}
                            dataSource={tableData}
                            minusHeight={311}
                            pageSize={pageSize}
                            current={currentPage}
                            total={total}
                            onPageChange={this.handlePageChange}
                            onShowSizeChange={this.handleShowSizeChange}
                            onSelectRows={this.handleSelectRows}
                        />

                        <AddModal {...addProps} />
                        <DeleteModal {...delProps} />
                    </Card>
                </Layout.Content>
            </Layout>
        )
    }

    private GetColumns = () => {
        const getHandler = (dataType: string | undefined) => {
            if (dataType === "linkText") {
                return {
                    handler: {
                        onLinkClick: (row: any) => {
                            this.openAddModal("编辑信息");
                        }
                    }
                }
            }
            return {};
        }

        return Columns.map(col => (
            {
                ...col,
                dataIndex: col.key,
                ...getHandler(col.dataType)
            })
        )
    }

    //翻页：pagesize 改变
    private handleShowSizeChange = async (current: number, size: number) => {
        const { tableData } = await this.service.getPositionList({
            currentPage: 1,
            pageSize: size,
        });
        this.setState({ pageSize: size, currentPage: 1, tableData });
    }

    //翻页：页码改变
    private handlePageChange = async (page: number, pageSize: number) => {
        const { tableData } = await this.service.getPositionList({
            currentPage: page,
            pageSize,
        });
        this.setState({ currentPage: page, tableData });
    }

    private openAddModal = (title?: string) => {
        this.setState({ visibleAdd: true, addModalTitle: title });
    }

    private handleAdd = () => {
        this.setState({ visibleAdd: false });
    }

    private handleAddCancel = () => {
        this.setState({ visibleAdd: false });
    }

    private openDelModal = () => {
        const { checkedList } = this.state;

        if (checkedList.length <= 0) {
            UtilMessage.showMessage("请勾选要删除的内容", MessageType.error);
            return;
        }

        this.setState({ visibleDelete: true });
    }

    private handleDelete = async () => {

        this.setState({ visibleDelete: false });
    }

    private handleDelCancel = () => {
        this.setState({ visibleDelete: false });
    }

    //表格checkbox选中
    private handleSelectRows = (selectRows: any[]) => {
        this.setState({
            checkedList: selectRows.map(row => (
                {
                    value: row.positionId,
                    name: row.positionName
                })
            )
        })
    }

    private handleCheckChange = (checkedValues: any[]) => {
        this.checkedValues = checkedValues;
    }

    //导出
    private handleExport = () => {
        this.service.downloadPositionExcel();
    }
}