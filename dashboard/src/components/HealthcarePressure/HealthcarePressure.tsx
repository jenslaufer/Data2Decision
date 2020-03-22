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

import {Countries} from "../../types/countries";
import prepareDataForCountry from "../helpers/prepareData";
import Strategies from "../../types/strategies";

type Props = {
  country: Countries;
  strategies: Strategies;
}

const HealthcarePressure: FC<Props> = ({
                                         country,
                                         strategies
}) => {
  const {countryData, capacityForCountry} = prepareDataForCountry(country);

  const numberOfDeployedStrategies = Object.values(strategies).reduce((count, enabled) => enabled ? ++count : count, 0);
  let modelDataKey: string | undefined = "model.";
  switch (numberOfDeployedStrategies) {
    case 0:
      modelDataKey += "noMeasures";
      break;
    case 1:
    case 2:
    case 3:
    case 4:
      modelDataKey += `measures.strength${numberOfDeployedStrategies}`;
      break;
    default:
      modelDataKey += "measures.strength4";
      break;
  }

  return (
    <div className="flex flex-col">
      {capacityForCountry ? null : "Keine Krankenhauskapazität bekannt."}
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
          name={"Entwicklung mit Gegenmaßnahmen"}
          type="monotone"
          dataKey={modelDataKey}
          stroke="black"
        />
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
