import React from 'react';
import Framework from 'src/framework/Framework';
 

export class LineChart2 extends React.Component {
  render() {

    return (
      <div>
        <Framework.Com.charts.Line data= {data}  />     
      </div>
    );
  }
}



const data= [
  {
    group: 'China',
    name: 'Jan',
    iValue : 7,
  },
  {
    group: 'Oversea',
    name: 'Jan',
    iValue: 3.9,
  },
  {
    group: 'China',
    name: 'Feb',
    iValue: 6.9,
  },
  {
    group: 'Oversea',
    name: 'Feb',
    iValue: 4.2,
  },
  {
    group: 'China',
    name: 'Mar',
    iValue: 9.5,
  },
  {
    group: 'Oversea',
    name: 'Mar',
    iValue: 5.7,
  },
 
 
];