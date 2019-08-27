import {  Checkbox, List } from "antd";
import * as React from "react";

interface ICheckbox {
  value: string|number;
  name: string;
}

interface IProps {
  onChange?: (checkedValues: any[]) => void;
  items: ICheckbox[];
  value?: string[]|number[];
}

interface ICheckItem extends ICheckbox {
  checked: boolean;
}

interface IState {
  checkAll: boolean;
  indeterminate: boolean;
  checkItems: ICheckItem[];
}

export class CheckBoxList extends React.Component<IProps, IState>  {

  public state: IState;
  private checkItems: ICheckItem[];
  private checkedValues: any[];

  constructor(props: IProps){
    super(props);

    this.checkItems = this.GetIniCheckItems(this.props.items, this.props.value);
    this.checkedValues = this.GetIniValue(this.props.value);
    const checkAll = this.checkedValues.length === props.items.length;

    this.state = {
      checkAll,
      indeterminate: !!this.checkedValues.length && !checkAll,
      checkItems: this.checkItems
    };
  }

  public render = (): React.ReactElement<any> => {
    
    const {checkAll, indeterminate, checkItems} = this.state;

    return (
      <List
        className="qj-checkbox-list"
        bordered
        header={
          <Checkbox indeterminate={indeterminate} onChange={this.onCheckAllChange} checked={checkAll}>
            全选
          </Checkbox>
        }
        dataSource={checkItems}
        renderItem={item => (
          <List.Item className={this.getClassName(item.checked)}>
            <Checkbox className="qj-checkbox-list-item-checkbox" value= {item.value} onChange={this.onChange} checked={item.checked}>{item.name}</Checkbox>
          </List.Item>
        )}
      />
    )
  }

  private GetIniValue = (values?: any[]): any[] => {
    return values ? values : this.props.items.map(item => item.value);
  };

  private GetIniCheckItems = (items: ICheckbox[], values?: any[]) => {
    if(!values) {
      return items.map(item => ({...item,checked: true}));
    }
    return items.map(item => {
      const checked = values.includes(item.value);
      return {
        ...item,
        checked
      }
    })
  }

  private onCheckAllChange = (e: any) => {
    const targetChecked = e.target.checked;

    this.checkedValues = [];
    for(let i = 0, len = this.checkItems.length; i< len; i++){
      this.checkItems[i].checked = targetChecked;

      const item = this.checkItems[i];
      if(targetChecked){
        this.checkedValues.push(item.value)
      };
      
    }

    this.setState({
      checkAll: e.target.checked,
      indeterminate: false,
      checkItems: this.checkItems
    });
    if (this.props.onChange == null) {
      return;
    }
    this.props.onChange(this.checkedValues);
  }

  private onChange = (e: any) =>{
    // e.stopPropagation();
    const targetChecked = e.target.checked;
    const targetValue = e.target.value;

    this.checkedValues = [];
    for(let i = 0, len = this.checkItems.length; i< len; i++){

      if(targetValue === this.checkItems[i].value){
        this.checkItems[i].checked = targetChecked;
      }

      const item = this.checkItems[i];
      if(this.checkItems[i].checked){
        this.checkedValues.push(item.value)
      };
    }
    
    const checkAll = this.checkedValues.length === this.checkItems.length;

    this.setState({
      checkAll,
      indeterminate: !!this.checkedValues.length && !checkAll,
      checkItems: this.checkItems,
    });

    if (this.props.onChange == null) {
        return;
    }
    this.props.onChange(this.checkedValues);
  }

  private getClassName = (checked: boolean) =>{
    let className = "qj-checkbox-list-item";
    if(checked) {
      className += " qj-checkbox-list-item-checked"
    }
    return className;
  }
}
