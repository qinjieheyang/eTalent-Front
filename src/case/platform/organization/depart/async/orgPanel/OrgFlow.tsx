import React, { Component } from 'react';
import { Button, Select } from "antd";
import Framework from "src/framework/Framework";
import go, { Point } from 'gojs';
const $ = go.GraphObject.make;
const { Option } = Select;

interface IOrgFlowProps {
  data: any[];
  parentCode: string | undefined;
}
interface IOrgFlowState {
  ratio: string;
  myModel: any;
  myDiagram: any;
}
export class OrgFlow extends Component<IOrgFlowProps, IOrgFlowState> {
  private diagram: go.Diagram;
  private angle: number = 90;

  private orgFlowEl: React.RefObject<HTMLDivElement>;

  constructor(props: IOrgFlowProps) {
    super(props);
    this.state = { ratio: "100%", myModel: null, myDiagram: null }
  }

  componentWillReceiveProps(nextProps: IOrgFlowProps) {
    this.loadData(nextProps.data);
    // console.log(nextProps)
  }

  componentDidMount() {
    this.renderCanvas();
    // this.loadData(this.props.data);
  }

  renderCanvas = () => {
    let diagram = $(go.Diagram, this.orgFlowEl,  // the DIV HTML element
      {
        initialDocumentSpot: go.Spot.TopCenter,
        initialViewportSpot: go.Spot.TopCenter,
        isReadOnly: true,
        minScale: 0.2,
        maxScale: 1,
        allowZoom: false,
        layout:
          $(go.TreeLayout,
            {
              angle: 90,
              arrangement: go.TreeLayout.ArrangementFixedRoots,
              layerSpacing: 48,
            })
      });

    function theavatarFlagConverter(avatar: string) {
      // return "https://www.nwoods.com/go/Flags/" + avatar.toLowerCase().replace(/\s/g, "-") + "-flag.Png";
      return "/img/avatar.png";
    }

    diagram.nodeTemplate =
      $(go.Node, "Auto",
        {
          isShadowed: true,
          shadowColor: "#ccc",
          shadowOffset: new Point(0, 0),
          shadowBlur: 3,
          doubleClick: function (e, node: any) {
            var cmd = diagram.commandHandler;
            e.handled = true;
            if (node.isTreeExpanded) {
              cmd.collapseTree(node);
            } else {
              cmd.expandTree(node);
            }
          },
          selectionAdornmentTemplate:
            $(go.Adornment, "Auto",
              $(go.Shape, "RoundedRectangle",
                { fill: null, strokeWidth: 1, strokeDashArray: [5, 2] },
                new go.Binding("stroke", "color"),
              ),
              $(go.Placeholder)
            )
        },
        // 长方形填充色
        $(go.Shape, "RoundedRectangle",
          { stroke: null, strokeWidth: 0 },
          new go.Binding("fill", "color"),
        ),
        //垂直方向 panel
        $(go.Panel, "Vertical",
          {
            maxSize: new go.Size(360, 100)
          },
          //title头部
          $(go.TextBlock,
            {
              margin: 6,
              stroke: "white",
              font: "500 14px Roboto, sans-serif",
              alignment: go.Spot.Center,
              overflow: go.TextBlock.OverflowEllipsis,
              maxLines: 1,
            },
            new go.Binding("text", "orgName"),
          ),
          // 水平方向 panel
          $(go.Panel, "Horizontal",
            {
              background: "#fff",
              stretch: go.GraphObject.Horizontal
            },
            //图片
            $(go.Picture,
              {
                margin: 6,
                imageStretch: go.GraphObject.Uniform,
                alignment: go.Spot.Left,
              },
              // only set a desired size if a flag is also present:
              new go.Binding("desiredSize", "avatar", function () { return new go.Size(48, 48) }),
              new go.Binding("source", "avatar", theavatarFlagConverter)
            ),

            // a table to contain the different parts of the node
            $(go.Panel, "Table",
              { margin: 8, maxSize: new go.Size(360, NaN) },
              // the two TextBlocks in column 0 both stretch in width

              $(go.RowColumnDefinition,
                {
                  column: 2,
                  stretch: go.GraphObject.Horizontal,
                  alignment: go.Spot.Left
                }
              ),
              // the additional textual information
              $(go.TextBlock,
                {
                  row: 1, column: 0, columnSpan: 2,
                  font: "600 14px Roboto, sans-serif",
                  alignment: go.Spot.Left
                },
                new go.Binding("text", "orgManagerName")
              ),
              $(go.TextBlock,
                {
                  row: 2, column: 0,
                  font: "12px Roboto, sans-serif",
                  alignment: go.Spot.Left
                },
                new go.Binding("text", "", function () { return "在编人数：" })
              ),
              $(go.TextBlock,
                {
                  row: 2, column: 1,
                  font: "12px Roboto, sans-serif",
                  alignment: go.Spot.Left
                },
                new go.Binding("text", "total")
              ),
              $(go.TextBlock,
                {
                  row: 3, column: 0,
                  font: "12px Roboto, sans-serif",
                  alignment: go.Spot.Left
                },
                new go.Binding("text", "", function () { return "在岗人数:" })
              ),
              $(go.TextBlock,
                {
                  row: 3, column: 1,
                  font: "12px Roboto, sans-serif",
                  alignment: go.Spot.Left
                },
                new go.Binding("text", "online")
              ),
            )
          ),
        )
      );
    diagram.linkTemplate =
      $(go.Link, go.Link.Orthogonal,
        { corner: 5, selectable: false },
        $(go.Shape, { strokeWidth: 1, stroke: "#e0e0e0" }));

    this.diagram = diagram;
  }

  private renderOptionItem = () => {
    const opt = [
      { value: "0", text: "全部显示" },
      { value: "1", text: "显示1层" },
      { value: "2", text: "显示2层" },
      { value: "3", text: "显示3层" },
    ]
    return opt.map(item => (
      <Option value={item.value} key={item.value}>{item.text}</Option>
    ))
  }



  render() {
    return (
      <React.Fragment>
        <Framework.Com.Buttons.Tool.LeftArea>
          <Button onClick={this.handleOrgAngle}>显示方向</Button>
          <Button>显示内容</Button>
          <Select defaultValue="0" onChange={this.handleShowLevelChange}>
            {this.renderOptionItem()}
          </Select>
          <Button type="primary" onClick={this.handleOrgExport}>导出</Button>
        </Framework.Com.Buttons.Tool.LeftArea>
        <div className="qj-org-flow-wrapper">
          <div className="qj-org-zoom-box">
            <Button shape="circle" icon="plus" onClick={() => { this.handleZoom(1) }} />
            <span style={{ display: "block", padding: "20px 0" }}>{this.state.ratio}</span>
            <Button shape="circle" icon="minus" onClick={() => { this.handleZoom(0) }} />
          </div>
          <div id="qj-org-flow" ref={(node: any) => { this.orgFlowEl = node }}></div>
        </div>
      </React.Fragment>
    );
  }

  handleZoom = (num: number) => {
    const scale = this.diagram.scale;
    this.diagram.scale = num > 0 ? scale + 0.1 : scale - 0.1;
    this.setState({ "ratio": `${Math.round(this.diagram.scale * 100)}%` })
  }

  handleOrgExport = () => {
    const img = this.diagram.makeImage({ scale: 1 });
    var url = String(img && img.src);
    var a = document.createElement('a');
    var event = new MouseEvent('click');
    a.download = '组织机构图';
    a.href = url;
    a.dispatchEvent(event)
  }

  handleOrgAngle = () => {
    this.angle = this.angle === 0 ? 90 : 0;
    this.diagram.layout["angle"] = this.angle;
  }

  private loadData = (dataSource: any[], maxOrgCodeLength?: number) => {
    const convertData = (maxOrgCodeLength: number) => dataSource.filter(item => item.orgCode.length <= maxOrgCodeLength);
    const data = maxOrgCodeLength ? convertData(maxOrgCodeLength) : dataSource;
    this.diagram.model = $(go.TreeModel,
      {
        nodeParentKeyProperty: "orgParentId",
        nodeKeyProperty: "orgId",
        nodeDataArray: data
      }
    );
  }

  private handleShowLevelChange = (value: string) => {
    if (this.props.parentCode === undefined) {
      return this.loadData(this.props.data);
    }
    const parentIdLenght = this.props.parentCode.length;
    const numberVal = Number(value);
    this.loadData(this.props.data, numberVal > 0 ? parentIdLenght + (numberVal - 1) * 3 : undefined);

  }
}