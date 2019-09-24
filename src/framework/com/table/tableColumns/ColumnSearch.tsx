import { Checkbox, Input, InputNumber, Button, DatePicker, TreeSelect } from "antd";
import * as React from "react";

interface FilterDropdownProps {
  setSelectedKeys: (target: object[]) => void;
  selectedKeys: string[];
  confirm: () => void;
  clearFilters: () => void;
}

interface ISearchProps {
  key: string;
  title: string;
  dataIndex?: string;
  enableSearch?: boolean;
  searchData?: any[];
  checkNull?: boolean;
  trueValue?: string;
  falseValue?: string;
  handler?: object;
}

export interface IColumnSearchDefine {
  filterDropdown?: (props: FilterDropdownProps) => React.ReactElement<any>;
  filterIcon?: (filtered: string | undefined) => React.ReactNode;
  onFilterDropdownVisibleChange?: (visible: boolean) => void;
  filterDropdownVisible?: boolean;
}

export class ColumnSearch {

  public static getTextSearchProps = ({ key, title, enableSearch = false, checkNull = false, handler = {} }: ISearchProps) => {

    if (!enableSearch) return {};

    let changeValues: object[] = [];

    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any): React.ReactElement<any> => {
        const defaultValue = selectedKeys.length === 0 ? undefined : selectedKeys[0];
        const handleInputChange = (e: any) => {
          let value: string = e.target.value;
          if (value) {
            value = value.trim();
          }
          changeValues = [{
            fieldLabel: title,
            fieldName: key,
            fieldValue: value,
          }]
        }
        const handleOk = () => {
          if (changeValues.length === 0) return;
          setSelectedKeys(changeValues); confirm();
        }

        const handleNull = () => {
          changeValues = [{
            fieldLabel: title,
            fieldName: key,
            isFilterNull: true
          }]
          setSelectedKeys(changeValues); confirm();
        }
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
                  defaultValue={defaultValue}
                  onChange={handleInputChange}
                  style={{ width: 188 }}
                />
                <Button
                  type="primary"
                  onClick={handleOk}
                  style={{ marginLeft: 8 }}
                >确定</Button>
              </div>
              {
                checkNull ?
                  <Button
                    onClick={handleNull}
                    style={{ width: 90 }}
                  >筛选空值</Button> : ""
              }
            </div>
          </React.Fragment>
        )
      }
    }
  }

  public static getTreeSearchProps = ({ key, title, enableSearch = false, searchData = [] }: ISearchProps) => {

    if (!enableSearch) return {};

    let changeValues: object[] = [];

    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any): React.ReactElement<any> => {
        const defaultValue = selectedKeys.length === 0 ? undefined : selectedKeys[0];
        const handleChange = (value: string) => {
          changeValues = [{
            fieldLabel: title,
            fieldName: key,
            fieldValue: value,
          }]
        }

        const tProps = {
          treeData: searchData,
          onChange: handleChange,
          defaultValue: defaultValue,
          treeCheckable: true,
          showCheckedStrategy: TreeSelect.SHOW_PARENT,
          searchPlaceholder: `请选择${title}`,
          style: {
            width: 188
          },
        };

        const handleOk = () => {
          if (changeValues.length === 0) return;
          setSelectedKeys(changeValues); confirm();
        }

        return (
          <React.Fragment>
            <span className="qj-filter-dropdown-arrow"></span>
            <div style={{ padding: 8 }} onMouseLeave={() => { confirm() }}>
              <TreeSelect {...tProps} />
              <Button type="primary" style={{ marginLeft: 8 }} onClick={handleOk}>确定</Button>
            </div>
          </React.Fragment>
        )
      }
    }
  }

  public static getDateSearchProps = ({ key, title, enableSearch = false }: ISearchProps) => {

    if (!enableSearch) return {};

    let changeValues: object[] = [];

    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any): React.ReactElement<any> => {
        // const defaultValue = selectedKeys.length === 0 ? undefined : selectedKeys[0];
        const handleChange = (dates: any, dateStrings: [string, string]) => {
          changeValues = [{
            fieldLabel: title,
            fieldName: key,
            fieldValue: dateStrings
          }]
        }
        const handleOk = () => {
          if (changeValues.length === 0) return;
          setSelectedKeys(changeValues); confirm();
        }
        return (
          <React.Fragment>
            <span className="qj-filter-dropdown-arrow"></span>
            <div style={{ padding: 8 }} onMouseLeave={() => { confirm() }} >
              <DatePicker.RangePicker onChange={handleChange} />
              <Button
                type="primary"
                style={{ marginLeft: 8 }}
                onClick={handleOk}
              >
                确定
                </Button>
            </div>
          </React.Fragment>
        )
      }
    }
  }

  public static getBoolSearchProps = ({ key, title, enableSearch = false, trueValue = "是", falseValue = "否" }: ISearchProps) => {

    if (!enableSearch) return {};

    let changeValues: object[] = [];

    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }: any): React.ReactElement<any> => {
        const defaultValue = selectedKeys.length > 0 ? selectedKeys : [true, false];

        const handleChange = (checkedValues: string[]) => {
          changeValues = [{
            fieldLabel: title,
            fieldName: key,
            fieldValue: checkedValues
          }]
        }
        const handleOk = () => {
          if (changeValues.length === 0) return;
          setSelectedKeys(changeValues); confirm();
        }

        return (
          <React.Fragment>
            <span className="qj-filter-dropdown-arrow"></span>
            <div style={{ padding: 8 }} onMouseLeave={() => { confirm() }} >
              <Checkbox.Group
                className="qj-table-filter-column"
                options={[{ label: trueValue, value: true }, { label: falseValue, value: false }]}
                defaultValue={defaultValue}
                onChange={handleChange}
              />
              <div style={{ textAlign: "center" }}>
                <Button type="primary" onClick={handleOk}>确定</Button>
              </div>
            </div>
          </React.Fragment>
        )
      }
    }
  }

  public static getCheckboxSearchProps = ({ key, title, enableSearch = false, searchData = [] }: ISearchProps) => {

    if (!enableSearch) return {};

    let changeValues: object[] = [];


    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }: any): React.ReactElement<any> => {
        const defaultValue = selectedKeys.length > 0 ? selectedKeys : [];
        const plainOptions: any[] = searchData.map((item: any, index: number) => {
          // defaultValue.push(item.id);
          return { label: item.name, value: item.id }
        });
        const handleChange = (checkedValues: string[]) => {
          changeValues = [{
            fieldLabel: title,
            fieldName: key,
            fieldValue: checkedValues
          }]
        }
        const handleOk = () => {
          if (changeValues.length === 0) return;
          setSelectedKeys(changeValues); confirm();
        }


        return (
          <React.Fragment>
            <span className="qj-filter-dropdown-arrow"></span>
            <div style={{ padding: 8 }} onMouseLeave={() => { confirm() }} >
              <Checkbox.Group
                className="qj-table-filter-column"
                options={plainOptions}
                defaultValue={defaultValue}
                onChange={handleChange}
              />
              <div style={{ textAlign: "center" }}>
                <Button type="primary" onClick={handleOk}>确定</Button>
              </div>
            </div>
          </React.Fragment>
        )
      }
    }
  }

  public static getNumberSearchProps = ({ key, title, enableSearch = false, searchData = [0, 100] }: ISearchProps) => {

    if (!enableSearch) return {};

    let [minValue, maxValue] = [0, 100];

    let changeValues: object[] = [];

    return {
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }: any): React.ReactElement<any> => {

        // const defaultValue = selectedKeys.length > 0 ? selectedKeys : [];

        const handleChange = (minValue: number, maxValue: number) => {
          changeValues = [{
            fieldLabel: title,
            fieldName: key,
            fieldValue: [minValue, maxValue]
          }]
        }
        const handleOk = () => {
          if (changeValues.length === 0) return;
          setSelectedKeys(changeValues); confirm();
        }

        return (
          <React.Fragment>
            <span className="qj-filter-dropdown-arrow"></span>
            <div className="custom-filter-dropdown" style={{ padding: 8 }} onMouseLeave={() => { confirm() }}>
              <div style={{ display: "inline-block", verticalAlign: "middle" }}>
                <Input.Group compact >
                  <InputNumber style={{ width: 100, textAlign: 'center' }} placeholder="Minimum"
                    defaultValue={minValue}
                    onChange={(value: number) => { minValue = value; handleChange(minValue, maxValue) }} />
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
                    defaultValue={maxValue}
                    onChange={(value: number) => { maxValue = value; handleChange(minValue, maxValue) }} />
                </Input.Group>
              </div>
              <Button type="primary" style={{ marginLeft: 8, verticalAlign: "middle" }}
                onClick={handleOk}>确定</Button>
            </div>
          </React.Fragment>
        )
      }
    }
  }
}
