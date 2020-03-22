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
  const capacityForCountry = Math.random() * 10000;
  // @ts-ignore
  const countryData = Object.keys(casesForCountry).reduce((data: {}[], date) => {
    // @ts-ignore
    const cases = casesForCountry[date];
    // @ts-ignore
    const deaths = deathsByCountryDate[country][date];
    const dateObject = new Date(Number.parseInt(date));
    const dateString = `${dateObject.getDay()}.${dateObject.getMonth()}.${dateObject.getFullYear()}`;
    data.push({
      dateTime: dateString,
      cases: cases,
      deaths: deaths,
      capacity: capacityForCountry,
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
          name={`Bestätigte Fälle in ${country}`}
          type="monotone"
          dataKey="cases"
          stroke="red"
        />
        <Line
          name={`Kapazität des Gesundheitssystems in ${country}`}
          type="monotone"
          dataKey="capacity"
          stroke="green"
        />
      </LineChart>
    </div>
  );
};

export default HealthcarePressure;
