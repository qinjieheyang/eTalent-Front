import * as React from "react";
import { Table, Input, InputNumber, Popconfirm, Form } from 'antd';

const data: any[] = [];

for (let i = 0; i < 10; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
const EditableContext = React.createContext({});

class EditableCell extends React.Component<any, any> {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }: any) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
            children
          )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

class EditableTable extends React.Component<any, any> {
  private columns: any[];
  constructor(props: any) {
    super(props);
    this.state = { data, editingKey: '' };
    this.columns = [
      {
        title: '左括号',
        dataIndex: 'isLeftBrackets',
        width: 100,
        editable: true,
      },
      {
        title: '表名',
        dataIndex: 'tableName',
        width: 150,
        editable: true,
      },
      {
        title: '字段名',
        dataIndex: 'fieldType',
        width: 150,
        editable: true,
      },
      {
        title: '操作符',
        dataIndex: 'operateSymbol',
        width: 100,
        editable: true,
      },
      {
        title: '值',
        dataIndex: 'fieldValue',
        width: 150,
        editable: true,
      },
      {
        title: '右括号',
        dataIndex: 'isRightBrackets',
        width: 100,
        editable: true,
      },
      {
        title: '连接符',
        dataIndex: 'linkSymbol',
        width: 100,
        editable: true,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width: 150,
        render: (text: any, record: any) => {
          // const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record.key)}
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
              <a href="javascript:;" onClick={() => this.edit(record.key)}>Edit</a>
            );
        },
      },
    ];
  }

  isEditing = (record: any) => record.key === this.state.editingKey;

  cancel = (key: string) => {
    this.setState({ editingKey: '' });
  };

  save(form: any, key: string) {
    form.validateFields((error: any, row: any) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }

  edit(key: string) {
    this.setState({ editingKey: key });
  }

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: any) => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          pagination={false}
        />
      </EditableContext.Provider>
    );
  }
}

const EditableFormTable = Form.create()(EditableTable);

export default EditableFormTable;