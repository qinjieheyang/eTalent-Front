import React, { Component } from 'react';
import go from 'gojs';
const $ = go.GraphObject.make;

const nodeDataArray = [
  { key: 0, name: "中国雄安投资集团", nation: "South Korea", title: "中国雄安投资集团", headOf: "Secretariat" },
  { key: 1, parent: 0, name: "Patricia O'Brien", nation: "Ireland", title: "Under-Secretary-General for Legal Affairs and United Nations Legal Counsel", headOf: "Office of Legal Affairs" },
  { key: 3, parent: 1, name: "Peter Taksøe-Jensen", nation: "Denmark", title: "Assistant Secretary-General for Legal Affairs" },
  { key: 9, parent: 3, name: "Other Employees" },
  { key: 4, parent: 1, name: "Maria R. Vicien - Milburn", nation: "Argentina", title: "General Legal Division Director", headOf: "General Legal Division" },
  { key: 10, parent: 4, name: "Other Employees" },
  { key: 5, parent: 1, name: "Václav Mikulka", nation: "Czech Republic", title: "Codification Division Director", headOf: "Codification Division" },
  { key: 11, parent: 5, name: "Other Employees" },
  { key: 6, parent: 1, name: "Sergei Tarassenko", nation: "Russia", title: "Division for Ocean Affairs and the Law of the Sea Director", headOf: "Division for Ocean Affairs and the Law of the Sea" },
  { key: 12, parent: 6, name: "Alexandre Tagore Medeiros de Albuquerque", nation: "Brazil", title: "Chairman of the Commission on the Limits of the Continental Shelf", headOf: "The Commission on the Limits of the Continental Shelf" },
  { key: 17, parent: 12, name: "Peter F. Croker", nation: "Ireland", title: "Chairman of the Committee on Confidentiality", headOf: "The Committee on Confidentiality" },
  { key: 31, parent: 17, name: "Michael Anselme Marc Rosette", nation: "Seychelles", title: "Vice Chairman of the Committee on Confidentiality" },
  { key: 32, parent: 17, name: "Kensaku Tamaki", nation: "Japan", title: "Vice Chairman of the Committee on Confidentiality" },
  { key: 33, parent: 17, name: "Osvaldo Pedro Astiz", nation: "Argentina", title: "Member of the Committee on Confidentiality" },
  { key: 34, parent: 17, name: "Yuri Borisovitch Kazmin", nation: "Russia", title: "Member of the Committee on Confidentiality" },
  { key: 18, parent: 12, name: "Philip Alexander Symonds", nation: "Australia", title: "Chairman of the Committee on provision of scientific and technical advice to coastal States", headOf: "Committee on provision of scientific and technical advice to coastal States" },
  { key: 35, parent: 18, name: "Emmanuel Kalngui", nation: "Cameroon", title: "Vice Chairman of the Committee on provision of scientific and technical advice to coastal States" },
  { key: 36, parent: 18, name: "Sivaramakrishnan Rajan", nation: "India", title: "Vice Chairman of the Committee on provision of scientific and technical advice to coastal States" },
  { key: 37, parent: 18, name: "Francis L. Charles", nation: "Trinidad and Tobago", title: "Member of the Committee on provision of scientific and technical advice to costal States" },
  { key: 38, parent: 18, name: "Mihai Silviu German", nation: "Romania", title: "Member of the Committee on provision of scientific and technical advice to costal States" },
  { key: 19, parent: 12, name: "Lawrence Folajimi Awosika", nation: "Nigeria", title: "Vice Chairman of the Commission on the Limits of the Continental Shelf" },
  { key: 20, parent: 12, name: "Harald Brekke", nation: "Norway", title: "Vice Chairman of the Commission on the Limits of the Continental Shelf" },
  { key: 21, parent: 12, name: "Yong-Ahn Park", nation: "South Korea", title: "Vice Chairman of the Commission on the Limits of the Continental Shelf" },
  { key: 22, parent: 12, name: "Abu Bakar Jaafar", nation: "Malaysia", title: "Chairman of the Editorial Committee", headOf: "Editorial Committee" },
  { key: 23, parent: 12, name: "Galo Carrera Hurtado", nation: "Mexico", title: "Chairman of the Training Committee", headOf: "Training Committee" },
  { key: 24, parent: 12, name: "Indurlall Fagoonee", nation: "Mauritius", title: "Member of the Commission on the Limits of the Continental Shelf" },
  { key: 25, parent: 12, name: "George Jaoshvili", nation: "Georgia", title: "Member of the Commission on the Limits of the Continental Shelf" },
  { key: 26, parent: 12, name: "Wenzhang Lu", nation: "China", title: "Member of the Commission on the Limits of the Continental Shelf" },
  { key: 27, parent: 12, name: "Isaac Owusu Orudo", nation: "Ghana", title: "Member of the Commission on the Limits of the Continental Shelf" },
  { key: 28, parent: 12, name: "Fernando Manuel Maia Pimentel", nation: "Portugal", title: "Member of the Commission on the Limits of the Continental Shelf" },
  { key: 7, parent: 1, name: "Renaud Sorieul", nation: "France", title: "International Trade Law Division Director", headOf: "International Trade Law Division" },
  { key: 13, parent: 7, name: "Other Employees" },
  { key: 8, parent: 1, name: "Annebeth Rosenboom", nation: "Netherlands", title: "Treaty Section Chief", headOf: "Treaty Section" },
  { key: 14, parent: 8, name: "Bradford Smith", nation: "United States", title: "Substantive Legal Issues Head", headOf: "Substantive Legal Issues" },
  { key: 29, parent: 14, name: "Other Employees" },
  { key: 15, parent: 8, name: "Andrei Kolomoets", nation: "Russia", title: "Technical/Legal Issues Head", headOf: "Technical/Legal Issues" },
  { key: 30, parent: 15, name: "Other Employees" },
  { key: 16, parent: 8, name: "Other Employees" },
  { key: 2, parent: 0, name: "Heads of Other Offices/Departments" }
];

interface IOrgFlowProps { }
export default class GoJs extends Component<IOrgFlowProps> {
  constructor(props: IOrgFlowProps) {
    super(props);
    this.state = { myModel: null, myDiagram: null }
  }

  renderCanvas = () => {

    let diagram = $(go.Diagram, "qj-org-flow",  // the DIV HTML element
    {
      // Put the diagram contents at the top center of the viewport
      initialDocumentSpot: go.Spot.TopCenter,
      initialViewportSpot: go.Spot.TopCenter,
      // OR: Scroll to show a particular node, once the layout has determined where that node is
      //"InitialLayoutCompleted": function(e) {
      //  var node = e.diagram.findNodeForKey(28);
      //  if (node !== null) e.diagram.commandHandler.scrollToPart(node);
      //},
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

    function theNationFlagConverter(nation: string) {
      return "https://www.nwoods.com/go/Flags/" + nation.toLowerCase().replace(/\s/g, "-") + "-flag.Png";
    }
    function theInfoTextConverter(info: any) {
      var str = "";
      if (info.title) str += "Title: " + info.title;
      if (info.headOf) str += "\nHead of: " + info.headOf;
      return str;
    }
    diagram.nodeTemplate =
      $(go.Node, "Auto",
        // the outer shape for the node, surrounding the Table
        $(go.Shape, "Rectangle",
          { stroke: null, strokeWidth: 0 },
          /* reddish if highlighted, blue otherwise */
          new go.Binding("fill", "isHighlighted", function (h) { return h ? "#F44336" : "#A7E7FC"; }).ofObject()),
          $(go.TextBlock,
            {
              maxSize: new go.Size(160, NaN), margin: 2,
              font: "500 16px Roboto, sans-serif",
              alignment: go.Spot.Top
            },
            new go.Binding("text", "name")),
        // a table to contain the different parts of the node
        $(go.Panel, "Table",
          { margin: 6, maxSize: new go.Size(200, NaN) },
          // the two TextBlocks in column 0 both stretch in width
          // but align on the left side
          // the name
          
          $(go.RowColumnDefinition,
            {
              column: 0,
              stretch: go.GraphObject.Horizontal,
              alignment: go.Spot.Center
            }),
          
          // the country flag
          $(go.Picture,
            {
              row: 0, column: 0, margin: 2,
              imageStretch: go.GraphObject.Uniform,
              alignment: go.Spot.Left
            },
            // only set a desired size if a flag is also present:
            new go.Binding("desiredSize", "nation", function () { return new go.Size(34, 26) }),
            new go.Binding("source", "nation", theNationFlagConverter)),
          // the additional textual information
          $(go.TextBlock,
            {
              row: 1, column: 1,
              font: "12px Roboto, sans-serif",
              alignment: go.Spot.Right
            },
            new go.Binding("text", "", theInfoTextConverter))
        )  // end Table Panel
      );  // end Node
    // define the Link template, a simple orthogonal line
    diagram.linkTemplate =
      $(go.Link, go.Link.Orthogonal,
        { corner: 5, selectable: false },
        $(go.Shape, { strokeWidth: 3, stroke: "#424242" }));  // dark gray, rounded corner links

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