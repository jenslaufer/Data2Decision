import React, {FC} from "react";
import {Countries} from "../../types/countries";

import prognosis from "../../data/cumulative_confirmed_cases_measures.json"
import Strategies from "../../types/strategies";

type Props = {
    country: Countries;
    strategies: Strategies;
}

const NewInfectionsRecoveries: FC<Props> = ({
                                                country,
                                                strategies,
                                            }) => {
    const numberOfDeployedStrategies = Object.values(strategies).reduce((count, enabled) => enabled ? ++count : count, 0);
    let rawData = {};
    switch (numberOfDeployedStrategies) {
        case 0:
            rawData = prognosis.no_measure;
            break;
        case 1:
            rawData = prognosis.measure_strength1;
            break;
        case 2:
            rawData = prognosis.measure_strength2;
            break;
        case 3:
            rawData = prognosis.measure_strength3;
            break;
        case 4:
            rawData = prognosis.measure_strength4;
            break;
    }
    const formattedData = Object.keys(rawData).map(timestamp => ({
        timestamp: timestamp,
        // @ts-ignore
        value: rawData[timestamp],
    }));
    return <div>{country}</div>;
};

export default NewInfectionsRecoveries;
