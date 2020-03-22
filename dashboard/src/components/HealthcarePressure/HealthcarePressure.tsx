import React, {FC} from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line
} from "recharts";

import casesByCountryDate from "../../data/casesByCountryDate.json";
import deathsByCountryDate from "../../data/deathsByCountryDate.json";
import {StateSelection} from "../FilterBar/FilterBar";

type Props = {
  country: StateSelection;
}

const HealthcarePressure: FC<Props> = ({country}) => {
  // @ts-ignore
  const casesForCountry = casesByCountryDate[country];
  // @ts-ignore
  const countryData = Object.keys(casesForCountry).reduce((data: {}[], date) => {
    // @ts-ignore
    const cases = casesForCountry[date];
    // @ts-ignore
    const deaths = deathsByCountryDate[country][date];
    data.push({
      dateTime: date,
      cases: cases,
      deaths: deaths,
    });
    return data;
  }, []);
  return (
    <div className="flex flex-col">
      <LineChart
        width={730}
        height={250}
        data={countryData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="dateTime" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
        <Line
          name={`Confirmed cases in ${country}`}
          type="monotone"
          dataKey="cases"
          stroke="#8884d8"
        />
        <Line
          name={`Death cases in ${country}`}
          type="monotone"
          dataKey="deaths"
          stroke="#82ca9d"
        />
      </LineChart>
    </div>
  );
};

export default HealthcarePressure;
