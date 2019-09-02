
import * as React from "react";

// import { Layout } from "antd";
import { GojsDiagram } from 'react-gojs';
import * as go from 'gojs';
import { Diagram } from 'gojs';



interface IOrgFlowProps { }

export default class OrgFlow extends React.Component<IOrgFlowProps> {

  constructor(props: IOrgFlowProps) {
    super(props);
  }

  public render() {
    const portFrom = 'R';
    const portTo = 'L';
    const nodeDataArray =  [
      { key: 0, name: "Ban Ki-moon 반기문", nation: "South Korea", title: "Secretary-General of the United Nations", headOf: "Secretariat" },
      { key: 1, boss: 0, name: "Patricia O'Brien", nation: "Ireland", title: "Under-Secretary-General for Legal Affairs and United Nations Legal Counsel", headOf: "Office of Legal Affairs" },
      { key: 3, boss: 1, name: "Peter Taksøe-Jensen", nation: "Denmark", title: "Assistant Secretary-General for Legal Affairs" },
      { key: 9, boss: 3, name: "Other Employees" },
      { key: 4, boss: 1, name: "Maria R. Vicien - Milburn", nation: "Argentina", title: "General Legal Division Director", headOf: "General Legal Division" },
      { key: 10, boss: 4, name: "Other Employees" },
      { key: 5, boss: 1, name: "Václav Mikulka", nation: "Czech Republic", title: "Codification Division Director", headOf: "Codification Division" },
      { key: 11, boss: 5, name: "Other Employees" },
      { key: 6, boss: 1, name: "Sergei Tarassenko", nation: "Russia", title: "Division for Ocean Affairs and the Law of the Sea Director", headOf: "Division for Ocean Affairs and the Law of the Sea" },
      { key: 12, boss: 6, name: "Alexandre Tagore Medeiros de Albuquerque", nation: "Brazil", title: "Chairman of the Commission on the Limits of the Continental Shelf", headOf: "The Commission on the Limits of the Continental Shelf" },
      { key: 17, boss: 12, name: "Peter F. Croker", nation: "Ireland", title: "Chairman of the Committee on Confidentiality", headOf: "The Committee on Confidentiality" },
      { key: 31, boss: 17, name: "Michael Anselme Marc Rosette", nation: "Seychelles", title: "Vice Chairman of the Committee on Confidentiality" },
      { key: 32, boss: 17, name: "Kensaku Tamaki", nation: "Japan", title: "Vice Chairman of the Committee on Confidentiality" },
      { key: 33, boss: 17, name: "Osvaldo Pedro Astiz", nation: "Argentina", title: "Member of the Committee on Confidentiality" },
      { key: 34, boss: 17, name: "Yuri Borisovitch Kazmin", nation: "Russia", title: "Member of the Committee on Confidentiality" },
      { key: 18, boss: 12, name: "Philip Alexander Symonds", nation: "Australia", title: "Chairman of the Committee on provision of scientific and technical advice to coastal States", headOf: "Committee on provision of scientific and technical advice to coastal States" },
      { key: 35, boss: 18, name: "Emmanuel Kalngui", nation: "Cameroon", title: "Vice Chairman of the Committee on provision of scientific and technical advice to coastal States" },
      { key: 36, boss: 18, name: "Sivaramakrishnan Rajan", nation: "India", title: "Vice Chairman of the Committee on provision of scientific and technical advice to coastal States" },
      { key: 37, boss: 18, name: "Francis L. Charles", nation: "Trinidad and Tobago", title: "Member of the Committee on provision of scientific and technical advice to costal States" },
      { key: 38, boss: 18, name: "Mihai Silviu German", nation: "Romania", title: "Member of the Committee on provision of scientific and technical advice to costal States" },
      { key: 19, boss: 12, name: "Lawrence Folajimi Awosika", nation: "Nigeria", title: "Vice Chairman of the Commission on the Limits of the Continental Shelf" },
      { key: 20, boss: 12, name: "Harald Brekke", nation: "Norway", title: "Vice Chairman of the Commission on the Limits of the Continental Shelf" },
      { key: 21, boss: 12, name: "Yong-Ahn Park", nation: "South Korea", title: "Vice Chairman of the Commission on the Limits of the Continental Shelf" },
      { key: 22, boss: 12, name: "Abu Bakar Jaafar", nation: "Malaysia", title: "Chairman of the Editorial Committee", headOf: "Editorial Committee" },
      { key: 23, boss: 12, name: "Galo Carrera Hurtado", nation: "Mexico", title: "Chairman of the Training Committee", headOf: "Training Committee" },
      { key: 24, boss: 12, name: "Indurlall Fagoonee", nation: "Mauritius", title: "Member of the Commission on the Limits of the Continental Shelf" },
      { key: 25, boss: 12, name: "George Jaoshvili", nation: "Georgia", title: "Member of the Commission on the Limits of the Continental Shelf" },
      { key: 26, boss: 12, name: "Wenzhang Lu", nation: "China", title: "Member of the Commission on the Limits of the Continental Shelf" },
      { key: 27, boss: 12, name: "Isaac Owusu Orudo", nation: "Ghana", title: "Member of the Commission on the Limits of the Continental Shelf" },
      { key: 28, boss: 12, name: "Fernando Manuel Maia Pimentel", nation: "Portugal", title: "Member of the Commission on the Limits of the Continental Shelf" },
      { key: 7, boss: 1, name: "Renaud Sorieul", nation: "France", title: "International Trade Law Division Director", headOf: "International Trade Law Division" },
      { key: 13, boss: 7, name: "Other Employees" },
      { key: 8, boss: 1, name: "Annebeth Rosenboom", nation: "Netherlands", title: "Treaty Section Chief", headOf: "Treaty Section" },
      { key: 14, boss: 8, name: "Bradford Smith", nation: "United States", title: "Substantive Legal Issues Head", headOf: "Substantive Legal Issues" },
      { key: 29, boss: 14, name: "Other Employees" },
      { key: 15, boss: 8, name: "Andrei Kolomoets", nation: "Russia", title: "Technical/Legal Issues Head", headOf: "Technical/Legal Issues" },
      { key: 30, boss: 15, name: "Other Employees" },
      { key: 16, boss: 8, name: "Other Employees" },
      { key: 2, boss: 0, name: "Heads of Other Offices/Departments" }
    ];

    const model = {
        nodeParentKeyProperty: "boss",  // this property refers to the parent node data
        "nodeDataArray":  nodeDataArray,
        linkDataArray: nodeDataArray.unshift().map(item => {from: item.boss, to: item.key, fromPort: portFrom, toPort: portTo});
      };
      

    const createDiagram = (diagramId: string): Diagram => {
      const $ = go.GraphObject.make;
      const theNationFlagConverter = (nation: string) => {
        return "https://www.nwoods.com/go/Flags/" + nation.toLowerCase().replace(/\s/g, "-") + "-flag.Png";
      }
      const theInfoTextConverter = (info: any) => {
        var str = "";
        if (info.title) str += "Title: " + info.title;
        if (info.headOf) str += "\n\nHead of: " + info.headOf;
        if (typeof info.boss === "number") {
          var bossinfo = myDiagram.model.findNodeDataForKey(info.boss);
          if (bossinfo !== null) {
            str += "\n\nReporting to: " + bossinfo.name;
          }
        }
        return str;
      }
      const myDiagram: Diagram = $(go.Diagram, diagramId, {
        // initialContentAlignment: go.Spot.LeftCenter,
        initialDocumentSpot: go.Spot.TopCenter,
        initialViewportSpot: go.Spot.TopCenter,
        layout:
          $(go.TreeLayout,  // use a TreeLayout to position all of the nodes
            {
              treeStyle: go.TreeLayout.StyleLastParents,
              // properties for most of the tree:
              angle: 90,
              layerSpacing: 80,
              // properties for the "last parents":
              alternateAngle: 0,
              alternateAlignment: go.TreeLayout.AlignmentStart,
              alternateNodeIndent: 20,
              alternateNodeIndentPastParent: 1,
              alternateNodeSpacing: 20,
              alternateLayerSpacing: 40,
              alternateLayerSpacingParentOverlap: 1,
              alternatePortSpot: new go.Spot(0.001, 1, 20, 0),
              alternateChildPortSpot: go.Spot.Left
            })
      });
      myDiagram.nodeTemplate =
        $(go.Node, "Auto",
          // the outer shape for the node, surrounding the Table
          $(go.Shape, "Rectangle",
            { stroke: null, strokeWidth: 0 },
            /* reddish if highlighted, blue otherwise */
            new go.Binding("fill", "isHighlighted", function (h) { return h ? "#F44336" : "#A7E7FC"; }).ofObject()),
          // a table to contain the different parts of the node
          $(go.Panel, "Table",
            { margin: 6, maxSize: new go.Size(200, NaN) },
            // the two TextBlocks in column 0 both stretch in width
            // but align on the left side
            $(go.RowColumnDefinition,
              {
                column: 0,
                stretch: go.GraphObject.Horizontal,
                alignment: go.Spot.Left
              }),
            // the name
            $(go.TextBlock,
              {
                row: 0, column: 0,
                maxSize: new go.Size(160, NaN), margin: 2,
                font: "500 16px Roboto, sans-serif",
                alignment: go.Spot.Top
              },
              new go.Binding("text", "name")),
            // the country flag
            $(go.Picture,
              {
                row: 0, column: 1, margin: 2,
                imageStretch: go.GraphObject.Uniform,
                alignment: go.Spot.TopRight
              },
              // only set a desired size if a flag is also present:
              new go.Binding("desiredSize", "nation", function () { return new go.Size(34, 26) }),
              new go.Binding("source", "nation", theNationFlagConverter)),
            // the additional textual information
            $(go.TextBlock,
              {
                row: 1, column: 0, columnSpan: 2,
                font: "12px Roboto, sans-serif"
              },
              new go.Binding("text", "", theInfoTextConverter))
          )  // end Table Panel
        );  // end Node
      // define the Link template, a simple orthogonal line
      myDiagram.linkTemplate =
        $(go.Link, go.Link.Orthogonal,
          { corner: 5, selectable: false },
          $(go.Shape, { strokeWidth: 3, stroke: "#424242" }));  // dark gray, rounded corner links

      return myDiagram;
    };

    const updateDiagramProps = (myDiagram: Diagram): void => {
      // The function could kept empty or we can add diagram properties that we wish to change. The reason to make this function user defined is to give more customization options to user. And also, its bit difficult to cover all the use cases of the charting library.
      myDiagram.layout = go.GraphObject.make(go.LayeredDigraphLayout, { direction: 90 });
    };

    const myDiagramId = 'myDiagramId';

    const defaultSelectedNodeKey = 'Beta';

    let diagram: Diagram;
    let modelChangeCallback;
    let keyIndex = 0;
    // console.log(GojsDiagram)
    return (
      <GojsDiagram
        diagramId={myDiagramId}
        model={model}
        createDiagram={(id: string) => {
          diagram = createDiagram(myDiagramId);
          return diagram;
        }}
        updateDiagramProps={(myDiagram: any) => {
          updateDiagramProps(myDiagram);
        }}
        className="fakecss"
        onModelChange={modelChangeCallback}
        linkFromPortIdProperty={portFrom}
        linkToPortIdProperty={portTo}
        linkKeyProperty="key"
        makeUniqueLinkKeyFunction={() => {
          keyIndex++;
          return keyIndex;
        }}
        makeUniqueKeyFunction={() => {
          keyIndex++;
          return keyIndex;
        }}
        copyNodeDataFunction={(data: any) => {
          keyIndex++;
          let newdata = Object.assign({}, data);
          newdata.key = keyIndex;
          return newdata;
        }}
        defaultSelectedNode={defaultSelectedNodeKey}
      />

    );
  }


}
