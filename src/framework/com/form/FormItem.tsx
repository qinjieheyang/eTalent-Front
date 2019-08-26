import { Col, Row } from "antd";
import * as React from "react";

  interface IProps {
    label: string;
    labelLengthLimit?: number;
    labelCols?:number;
    inputCols?:number;
}



/** 带标签和输入框 */
export class FormItem extends React.Component<IProps> {
 
    public render = (): React.ReactElement<any> =>{
        console.log(this.props.children)
        if (document.body.clientWidth < 1200) {
            return this.getSmallGroup();
        }
        return this.getBigGroup();
    };

    private getBigGroup() {
        let labelCols=this.props.labelCols;
        let inputCols=this.props.inputCols;
        if(  labelCols == null  ||  inputCols == null  ){
            labelCols= 8;
            inputCols=16;
        }
        return (
            <Row gutter={20}>
                <Col className="gutter-row ant-form-item-label" span={labelCols}>
                    {this.getLabel()}
                </Col>
                <Col className="gutter-row" span={inputCols}>
                    {this.props.children}
                </Col>
            </Row>
        );
    }

    private getSmallGroup() {
        return (
            <div>
                <div>{this.props.label}</div>
                <div>{this.props.children}</div>
            </div>
        );
    }

    

    private getLabel = () => {
        if (this.props.label == null) {
            return "props.label不能为空";
        }

        let label = this.props.label;
        let limitLength = 10;
        if (this.props.labelLengthLimit != null) {
            limitLength = this.props.labelLengthLimit;
        }
        if (label.length > limitLength) {
            label = label.substring(0, limitLength);
        }

        return <span title={this.props.label}>{label}</span>;
    };
}
