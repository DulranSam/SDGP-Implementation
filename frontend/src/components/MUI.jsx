// /* eslint-disable no-unused-vars */
import { LineChart } from "@mui/x-charts";
// import { BarChart } from "@mui/x-charts";

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

      <LineChart
        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
        series={[
          {
            data: [2, 5.5, 2, 8.5, 1.5, 5],
          },
        ]}
        width={500}
        height={300}
      />

      <h1>Bar Chart!</h1>
      <div></div>
    </div>
  );
};

export default MuiPage;
