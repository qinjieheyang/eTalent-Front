import React, { Component } from 'react';
import { Button } from "antd";
import go, { Point } from 'gojs';
const $ = go.GraphObject.make;

interface IOrgFlowProps {
  data: any[];
  parentCode: string | undefined;
}
interface IOrgFlowState {
  ratio: string;
  myModel: any;
  myDiagram: any;
  angle: number
}
export class OrgFlow extends Component<IOrgFlowProps, IOrgFlowState> {
  public diagram: go.Diagram;

  private orgFlowEl: React.RefObject<HTMLDivElement>;

  constructor(props: IOrgFlowProps) {
    super(props);
    this.state = { ratio: "100%", myModel: null, myDiagram: null, angle: 90 }
  }

  renderCanvas = () => {
    let diagram = $(go.Diagram, this.orgFlowEl,  // the DIV HTML element
      {
        // Put the diagram contents at the top center of the viewport
        initialDocumentSpot: go.Spot.TopCenter,
        initialViewportSpot: go.Spot.TopCenter,
        // select: 1, // users can select only one part at a time
        isReadOnly: true,
        minScale: 0.2,
        maxScale: 1,
        // autoScale: go.Diagram.UniformToFill,
        layout:
          $(go.TreeLayout,  // use a TreeLayout to position all of the nodes
            {
              treeStyle: go.TreeLayout.StyleLastParents,
              arrangement: go.TreeLayout.ArrangementHorizontal,
              // properties for most of the tree:
              angle: 90,
              layerSpacing: 48,
              // properties for the "last parents":
              alternateAngle: 90,
              alternateLayerSpacing: 48,
              alternateAlignment: go.TreeLayout.AlignmentCenterChildren,
              alternateNodeSpacing: 56
            })
      });

    diagram.nodeTemplate =
      $(go.Node, "Auto",
        {
          isShadowed: true,
          shadowColor: "#ccc",
          shadowOffset: new Point(0, 0),
          shadowBlur: 8,
          selectable: false
        },
        // 长方形填充色
        $(go.Shape, "RoundedRectangle",
          { stroke: null, strokeWidth: 0 },
          new go.Binding("fill", "color"),
        ),
        //垂直方向 panel
        $(go.Panel, "Vertical",
          {
            // width: 200,
            // height: 90,
            maxSize: new go.Size(200, 100)
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
            new go.Binding("text", "title"),
          ),
          // 水平方向 panel
          $(go.Panel, "Horizontal",
            {
              background: "#fff",
              stretch: go.GraphObject.Horizontal
            },
            $(go.TextBlock,
              {
                row: 2, column: 0,
                font: "12px Roboto, sans-serif",
                alignment: go.Spot.Left
              },
              new go.Binding("text", "online", function (value) { return `在岗人数: ${value}人` })
            )
          )
        )  // end Table Panel
      );  // end Node
    // define the Link template, a simple orthogonal line
    diagram.linkTemplate =
      $(go.Link, go.Link.Orthogonal,
        { corner: 5, selectable: false },
        $(go.Shape, { strokeWidth: 1, stroke: "#e0e0e0" }));  // dark gray, rounded corner links


    diagram.model = $(go.TreeModel,
      {
        nodeDataArray: this.props.data
      }
    );

    this.diagram = diagram;
  }



  componentDidMount() {
    this.renderCanvas();
  }

  render() {
    return (
      <div className="qj-org-flow-wrapper">
        <div className="qj-org-zoom-box">
          <Button shape="circle" icon="plus" onClick={() => { this.handleZoom(1) }} />
          <span style={{ display: "block", padding: "20px 0" }}>{this.state.ratio}</span>
          <Button shape="circle" icon="minus" onClick={() => { this.handleZoom(0) }} />
        </div>
        <div id="qj-org-flow" ref={(node: any) => { this.orgFlowEl = node }}></div>
      </div>
    );
  }

  handleZoom = (num: number) => {
    const scale = this.diagram.scale;
    this.diagram.scale = num > 0 ? scale + 0.1 : scale - 0.1;
    this.setState({ "ratio": `${Math.round(this.diagram.scale * 100)}%` })
  }

  export = () => {
    const img = this.diagram.makeImage({ scale: 1 });
    var url = String(img && img.src);
    var a = document.createElement('a');
    var event = new MouseEvent('click');
    a.download = '岗位图';
    a.href = url;
    a.dispatchEvent(event)
  }

  setAngle = () => {
    const angle = this.state.angle > 0 ? 0 : 90;
    this.setState({ angle });
    this.diagram.layout = $(go.TreeLayout,  // use a TreeLayout to position all of the nodes
      {
        treeStyle: go.TreeLayout.StyleLastParents,
        arrangement: go.TreeLayout.ArrangementHorizontal,
        // properties for most of the tree:
        angle: angle,
        layerSpacing: 48,
        // properties for the "last parents":
        alternateAngle: angle,
        alternateLayerSpacing: 48,
        alternateAlignment: go.TreeLayout.AlignmentCenterChildren,
        alternateNodeSpacing: 56
      })
  }
}