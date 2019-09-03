import React, { Component } from 'react';
import go, { Point } from 'gojs';
const $ = go.GraphObject.make;

const nodeDataArray = [
  { key: 0, avatar: "Denmark", title: "中国雄安投资集团", name:"张三", total: 20, online: 10, color:"#FF8C58" },
  { key: 1, parent: 0, avatar: "Denmark", title: "集团办公室", total: 20, online: 10, color:"#2FDD93" },
  { key: 2, parent: 1, avatar: "Denmark", title: "党委办公室", total: 20, online: 10, color:"#19ADE6" },
  { key: 3, parent: 1, avatar: "Denmark", title: "党委办公室", total: 20, online: 10, color:"#19ADE6" },
  { key: 4, parent: 1, avatar: "Denmark", title: "党委办公室", total: 20, online: 10, color:"#19ADE6" },
  { key: 5, parent: 1, avatar: "Denmark", title: "党委办公室", total: 20, online: 10, color:"#19ADE6" },
  { key: 6, parent: 1, avatar: "Denmark", title: "党委办公室", total: 20, online: 10, color:"#19ADE6" },
  { key: 7, parent: 1, avatar: "Denmark", title: "党委办公室", total: 20, online: 10, color:"#19ADE6" },
];

interface IOrgFlowProps { 
  angle: number;
}
export default class GoJs extends Component<IOrgFlowProps> {
  constructor(props: IOrgFlowProps) {
    super(props);
    this.state = { myModel: null, myDiagram: null }
  }

  renderCanvas = () => {
    const {angle} = this.props;
    let diagram = $(go.Diagram, "qj-org-flow",  // the DIV HTML element
      {
        // Put the diagram contents at the top center of the viewport
        initialDocumentSpot: go.Spot.TopCenter,
        initialViewportSpot: go.Spot.TopCenter,
        layout:
          $(go.TreeLayout,  // use a TreeLayout to position all of the nodes
            {
              treeStyle: go.TreeLayout.StyleLastParents,
              arrangement: go.TreeLayout.ArrangementHorizontal,
              // properties for most of the tree:
              angle: angle,
              layerSpacing: 35,
              // properties for the "last parents":
              alternateAngle: 90,
              alternateLayerSpacing: 35,
              alternateAlignment: go.TreeLayout.AlignmentCenterChildren,
              alternateNodeSpacing: 20
            })
      });

    function theavatarFlagConverter(avatar: string) {
      return "https://www.nwoods.com/go/Flags/" + avatar.toLowerCase().replace(/\s/g, "-") + "-flag.Png";
    }
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
          new go.Binding("fill","color"),
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
              font: "500 16px Roboto, sans-serif",
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
            //图片
            $(go.Picture,
              {
                margin: 12,
                imageStretch: go.GraphObject.Uniform,
                alignment: go.Spot.Left,
              },
              // only set a desired size if a flag is also present:
              new go.Binding("desiredSize", "avatar", function () { return new go.Size(32, 32) }),
              new go.Binding("source", "avatar", theavatarFlagConverter)
            ),

            // a table to contain the different parts of the node
            $(go.Panel, "Table",
              { margin: 8, maxSize: new go.Size(200, NaN) },
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
                  font: "600 16px Roboto, sans-serif",
                  alignment: go.Spot.Left
                },
                new go.Binding("text", "", function () { return "张三" })
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
          )
        )  // end Table Panel
      );  // end Node
    // define the Link template, a simple orthogonal line
    diagram.linkTemplate =
      $(go.Link, go.Link.Orthogonal,
        { corner: 5, selectable: false },
        $(go.Shape, { strokeWidth: 1, stroke: "#999" }));  // dark gray, rounded corner links

    diagram.model = $(go.TreeModel,
      {
        nodeDataArray: nodeDataArray
      });;
  }



  componentDidMount() {
    this.renderCanvas();
  }

  render() {
    return <div id="qj-org-flow"></div>;
  }
}