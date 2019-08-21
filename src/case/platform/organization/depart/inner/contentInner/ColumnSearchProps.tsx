// import React from "react";
// import Highlighter from "react-highlight-words";

// import { Input, Button, Icon } from "antd";

// interface FilterDropdownProps {
//   setSelectedKeys: (target: Array<String>) => void;
//   selectedKeys: Array<string>;
//   confirm: () => void;
//   clearFilters: ()=> void
// }

// const getColumnSearchProps = (dataIndex: string ) => ({
//   filterDropdown: (props: FilterDropdownProps) => (
//     <div style={{ padding: 8 }}>
//       <Input
//         ref={node => {
//           this.searchInput = node;
//         }}
//         placeholder={`Search ${dataIndex}`}
//         value={props.selectedKeys[0]}
//         onChange={e => props.setSelectedKeys(e.target.value ? [e.target.value] : [])}
//         onPressEnter={() => handleSearch(props.selectedKeys, confirm)}
//         style={{ width: 188, marginBottom: 8, display: 'block' }}
//       />
//       <Button
//         type="primary"
//         onClick={() => handleSearch(props.selectedKeys, confirm)}
//         icon="search"
//         size="small"
//         style={{ width: 90, marginRight: 8 }}
//       >
//         Search
//       </Button>
//       <Button onClick={() => handleReset(props.clearFilters)} size="small" style={{ width: 90 }}>
//         Reset
//       </Button>
//     </div>
//   ),
//   filterIcon: (filtered: string|undefined) => (
//     <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
//   ),
//   onFilter: (value:string, record: Array<string>) =>
//     record[dataIndex]
//       .toString()
//       .toLowerCase()
//       .includes(value.toLowerCase()),
//   onFilterDropdownVisibleChange: (visible: boolean) => {
//     if (visible) {
//       setTimeout(() => this.searchInput.select());
//     }
//   },
//   render: (text:string) => (
//     <Highlighter
//       highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
//       searchWords={[this.state.searchText]}
//       autoEscape
//       textToHighlight={text.toString()}
//     />
//   ),
// });


// const handleSearch = (selectedKeys:Array<string>, confirm: ()=> void) => {
//   confirm();
//   // this.setState({ searchText: selectedKeys[0] });
// };

// const handleReset = (clearFilters: ()=> void) => {
//   clearFilters();
//   // this.setState({ searchText: '' });
// };