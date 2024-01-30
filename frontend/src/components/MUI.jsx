// import {
//   LineChart,
//   Area,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "@mui/x-charts";
// import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";

const MuiPage = () => {
  // const data = [
  //   // Your data points here
  //   { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
  //   { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
  //   // Add more data points as needed
  // ];

  return (
    <div>
      <h1>Hello?</h1>
      {/* <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="uv" fill="#8884d8" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer> */}
      <h1>Bar Chart!</h1>
      <div>
        <h1>Line Chart</h1>
        <LineChart
          xAxis={[{ data: [0, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          width={500}
          height={300}
        />
        <br />
      </div>
    </div>
  );
};

export default MuiPage;
