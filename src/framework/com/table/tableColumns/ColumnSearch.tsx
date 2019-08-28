import { Checkbox, Input, InputNumber, Button, DatePicker, TreeSelect } from "antd";
import * as React from "react";

interface FilterDropdownProps {
  setSelectedKeys: (target: string[]) => void;
  selectedKeys: string[];
  confirm: () => void;
  clearFilters: () => void;
}

interface ISearchProps {
  title?: string;
  dataIndex?: string;
  enableSearch?: boolean;
  searchData?: any[];
  checkNull?: boolean;
  trueValue?: string;
  falseValue?: string;
}

export interface IColumnSearchDefine {
  filterDropdown?: (props: FilterDropdownProps) => React.ReactElement<any>;
  filterIcon?: (filtered: string | undefined) => React.ReactNode;
  onFilterDropdownVisibleChange?: (visible: boolean) => void;
  filterDropdownVisible?: boolean;
}

export class ColumnSearch {

  public static getTextSearchProps = ({ title, enableSearch = true, checkNull = true }: ISearchProps) => {

    if (!enableSearch) return {};

    let changeValues: string[];

    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps): React.ReactElement<any> => {
        return (
          <React.Fragment>
            <span className="qj-filter-dropdown-arrow"></span>
            <div
              style={{ padding: 8 }}
              onMouseLeave={() => { confirm() }}
            >
              <div style={{ marginBottom: 8 }}>
                <Input
                  placeholder={`请输入${title}`}
                  defaultValue={selectedKeys[0]}
                  // value={selectedKeys[0]}
                  onChange={e => { changeValues = e.target.value === undefined ? [] : [e.target.value] }}
                  style={{ width: 188 }}
                />
                <Button
                  type="primary"
                  onClick={() => { setSelectedKeys(changeValues); confirm(); }}
                  style={{ marginLeft: 8 }}
                >确定</Button>
              </div>
              {
                checkNull ?
                  <Button
                    onClick={() => { setSelectedKeys(["null"]); confirm(); }}
                    style={{ width: 90 }}
                  >筛选空值</Button> : ""
              }
            </div>
          </React.Fragment>
        )
      }
    }
  }

  public static getTreeSearchProps = ({ title, enableSearch = true, searchData = [] }: ISearchProps) => {

    if (!enableSearch) return {};

    let changeValues: string[];

    const tProps = {
      treeData:searchData,
      onChange: (values: string[]) => {changeValues = values;},
      treeCheckable: true,
      showCheckedStrategy: TreeSelect.SHOW_PARENT,
      searchPlaceholder: `请选择${title}`,
      style: {
        width: 188
      },
    };

    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps): React.ReactElement<any> => {
        return (
          <React.Fragment>
            <span className="qj-filter-dropdown-arrow"></span>
            <div style={{ padding: 8 }} onMouseLeave={() => { confirm() }}>
              <TreeSelect {...tProps} />
              <Button type="primary" style={{ marginLeft: 8 }} onClick={() => { setSelectedKeys(changeValues); confirm(); }}>确定</Button>
            </div>
          </React.Fragment>
        )
      }
    }
  }

  public static getDateSearchProps = ({  enableSearch = true, checkNull = true }: ISearchProps) => {

    if (!enableSearch) return {};

    let changeValues: string[];

    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: FilterDropdownProps): React.ReactElement<any> => {
        return (
          <React.Fragment>
            <span className="qj-filter-dropdown-arrow"></span>
            <div style={{ padding: 8 }} onMouseLeave={()=>{confirm()}} >
              <DatePicker.RangePicker onChange={(dates: any, dateStrings: [string, string]) => { changeValues = dateStrings }} />
              <Button
                type="primary"
                style={{ marginLeft: 8 }}
                onClick={() => { setSelectedKeys(changeValues); confirm(); }}
              >
                确定
                </Button>
            </div>
          </React.Fragment>
        )
      }
    }
  }

  public static getBoolSearchProps = ({  enableSearch = true, trueValue = "是", falseValue = "否" }: ISearchProps) => {

    if (!enableSearch) return {};

    let changeValues: string[];

    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }: FilterDropdownProps): React.ReactElement<any> => {
        const defaultValue = selectedKeys.length > 0 ? selectedKeys : [true, false]
        return (
          <React.Fragment>
            <span className="qj-filter-dropdown-arrow"></span>
            <div style={{ padding: 8 }} onMouseLeave={() => { confirm() }} >
              <Checkbox.Group
                className="qj-table-filter-column"
                options={[{ label: trueValue, value: true }, { label: falseValue, value: false }]}
                defaultValue={defaultValue}
                onChange={(checkedValues: string[]) => {
                  changeValues = checkedValues;
                }}
              />
              <div style={{ textAlign: "center" }}>
                <Button type="primary" onClick={() => { setSelectedKeys(changeValues); confirm(); }}>确定</Button>
              </div>
            </div>
          </React.Fragment>
        )
      }
    }
  }

  public static getCheckboxSearchProps = ({  enableSearch = true, searchData = [] }: ISearchProps) => {

    if (!enableSearch) return {};

    let changeValues: string[];

    const defaultValues: string[] = [];
    const plainOptions: any[] = searchData.map((item: any, index: number) => {
      defaultValues.push(item.id);
      return { label: item.name, value: item.id }
    });

    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }: FilterDropdownProps): React.ReactElement<any> => {
        return (
          <React.Fragment>
            <span className="qj-filter-dropdown-arrow"></span>
            <div style={{ padding: 8 }} onMouseLeave={() => { confirm() }} >
              <Checkbox.Group
                className="qj-table-filter-column"
                options={plainOptions}
                defaultValue={defaultValues}
                onChange={(checkedValues: string[]) => {
                  changeValues = checkedValues;
                }}
              />
              <div style={{ textAlign: "center" }}>
                <Button type="primary" onClick={() => { setSelectedKeys(changeValues); confirm(); }}>确定</Button>
              </div>
            </div>
          </React.Fragment>
        )
      }
    }
  }

  public static getNumberSearchProps = ({  enableSearch = true , searchData = [0, 100] }: ISearchProps) => {

    if (!enableSearch) return {};

    let [minValue, maxValue] = [0, 100]

    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }: FilterDropdownProps): React.ReactElement<any> => {
        return (
          <React.Fragment>
            <span className="qj-filter-dropdown-arrow"></span>
            <div className="custom-filter-dropdown" style={{ padding: 8 }} onMouseLeave={() => { confirm() }}>
              <div style={{ display: "inline-block", verticalAlign: "middle" }}>
                <Input.Group compact >
                  <InputNumber style={{ width: 100, textAlign: 'center' }} placeholder="Minimum"
                    defaultValue={searchData[0]}
                    onChange={(value: number) => { minValue = value }} />
                  <Input
                    style={{
                      width: 30,
                      pointerEvents: 'none',
                      backgroundColor: '#fff',
                    }}
                    placeholder="~"
                    disabled
                  />
                  <InputNumber style={{ width: 100, textAlign: 'center' }} placeholder="Maximum"
                    defaultValue={searchData[1]}
                    onChange={(value: number) => { maxValue = value }} />
                </Input.Group>
              </div>
              <Button type="primary" style={{ marginLeft: 8, verticalAlign: "middle" }}
                onClick={() => { setSelectedKeys([String(minValue), String(maxValue)]); confirm(); }}>确定</Button>
            </div>
          </React.Fragment>
        )
      }
    }
  }
}
