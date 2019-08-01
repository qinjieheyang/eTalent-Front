import {  Card } from "antd";

import * as React from "react";

 

export interface IProps {
    groupTitle:string  ;
}

/** 多编辑项分组容器 */
export class ItemsGroup extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (

           <Card title={this.props.groupTitle} >
               { this.props.children}
          </Card>
        );
    }

 
}
