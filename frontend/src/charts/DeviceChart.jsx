import {
 PieChart,
 Pie,
 Cell,
 Tooltip
} from "recharts";

const data = [
 { name:"Mobile", value:68 },
 { name:"Desktop", value:24 },
 { name:"Tablet", value:8 }
];

export default function DeviceChart(){

 return(

  <PieChart width={400} height={300}>

   <Pie
    data={data}
    dataKey="value"
    outerRadius={100}
   />

   <Tooltip/>

  </PieChart>

 );

}