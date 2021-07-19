import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts";

const Chart = () => {
  const data = [
    {
      name: "Okay",
      value: 200,
    },
    {
      name: "Just",
      value: 350,
    },
  ];

  return (
    <div>
      <h1>hello World</h1>
      <ResponsiveContainer width="100%" aspect={3}>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
