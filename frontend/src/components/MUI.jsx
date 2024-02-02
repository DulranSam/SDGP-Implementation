/* eslint-disable no-unused-vars */
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

const MuiPage = () => {
  const data = [
    // Your data points here
    { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
    // Add more data points as needed
  ];

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

        <br />
      </div>
    </div>
  );
};

export default MuiPage;
