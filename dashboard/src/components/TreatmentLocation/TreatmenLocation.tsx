import React from "react";
import { PieChart, Pie } from "recharts";

const data = [
  {
    name: "Group A",
    value: 2400
  },
  {
    name: "Group B",
    value: 4567
  },
  {
    name: "Group C",
    value: 1398
  }
];

function TreatmentLocation() {
  return (
    <div className="flex flex-col">
      <h2 className="text-center">Behandlungsort</h2>
      <PieChart width={300} height={250}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#82ca9d"
          label
        />
      </PieChart>
    </div>
  );
}

export default TreatmentLocation;
