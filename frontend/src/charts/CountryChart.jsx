import {
 BarChart,
 Bar,
 XAxis,
 Tooltip
} from "recharts";

const data = [
 { country:"India", clicks:120 },
 { country:"USA", clicks:70 },
 { country:"UK", clicks:30 }
];

export default function CountryChart(){

 return(

  <BarChart
   width={500}
   height={300}
   data={data}
  >

   <XAxis
    dataKey="country"
   />

   <Tooltip/>

   <Bar dataKey="clicks"/>

  </BarChart>

 );

}