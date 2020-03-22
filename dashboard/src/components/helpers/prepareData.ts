import casesByCountryDate from "../../data/casesByCountryDate.json";
import countryStats from "../../data/countryStats.json";
import deathsByCountryDate from "../../data/deathsByCountryDate.json";
import prognosis from "../../data/cumulative_confirmed_cases_measures.json"

import {Countries, COUNTRIES_WITH_PROGNOSIS} from "../../types/countries";

const prepareDataForCountry = (country: Countries) => {
    const casesForCountry = casesByCountryDate[country];
    let capacityForCountry: number | undefined = undefined;
    for (let i = 0; i < countryStats.length; i++) {
        const countryStatistic = countryStats[i];
        if (countryStatistic.name === country) {
            capacityForCountry = countryStatistic.hospitalBeds;
            break;
        }
    }

    const mapOver = COUNTRIES_WITH_PROGNOSIS.indexOf(country) === -1 ? casesForCountry : prognosis.no_measure;
    const countryData = Object.keys(mapOver).reduce((data: {}[], dateTime) => {
        // @ts-ignore
        const cases = casesForCountry[dateTime];
        // @ts-ignore
        const deaths = deathsByCountryDate[country][dateTime];
        const dateObject = new Date(Number.parseInt(dateTime));
        const dateString = `${dateObject.getDay()}.${dateObject.getMonth()+1}.${dateObject.getFullYear()}`;
        const dataPoint = {
            dateTime: dateString,
            cases: cases,
            deaths: deaths,
            capacity: capacityForCountry,
            model: {},
        };
        if (country === "Germany") {
            dataPoint.model = {
                // @ts-ignore
                noMeasures: prognosis.no_measure[dateTime],
                    measures: {
                    // @ts-ignore
                    strength1: prognosis.measure_strength1[dateTime],
                    // @ts-ignore
                    strength2: prognosis.measure_strength2[dateTime],
                    // @ts-ignore
                    strength3: prognosis.measure_strength3[dateTime],
                    // @ts-ignore
                    strength4: prognosis.measure_strength4[dateTime],
                }
            }
        } else {
            dataPoint.model = {
                noMeasures: undefined,
                    measures: {
                    strength1: undefined,
                        strength2: undefined,
                        strength3: undefined,
                        strength4: undefined,
                }
            }
        }
        data.push(dataPoint);
        return data;
    }, []);

    return {
        countryData,
        capacityForCountry
    }
};

export default prepareDataForCountry;