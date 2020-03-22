import React, {FC, useState, ChangeEvent} from "react";
import InputContainer from "./InputContainer";
import Input, { InputTypeEnum } from "./Input";
import Select from "./Select";
import Checkbox from "./Checkbox";

const COUNTRIES = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas, The",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo (Brazzaville)",
  "Congo (Kinshasa)",
  "Costa Rica",
  "Cote d'Ivoire",
  "Croatia",
  "Cruise Ship",
  "Cuba",
  "Cyprus",
  "Czechia",
  "Denmark",
  "Djibouti",
  "Dominican Republic",
  "East Timor",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia, The",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Guatemala",
  "Guinea",
  "Guyana",
  "Haiti",
  "Holy See",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "South Korea",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Latvia",
  "Lebanon",
  "Liberia",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malaysia",
  "Maldives",
  "Malta",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Namibia",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "San Marino",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Somalia",
  "South Africa",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Taiwan*",
  "Tanzania",
  "Thailand",
  "Togo",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "US",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Zambia",
  "Zimbabwe",
] as const;
type StateSelection = typeof COUNTRIES[number];


type Props = {
  startDate?: any;
  endDate?: any;
  stateSelection: StateSelection;
  onStateSelectionChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onStartDateChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onEndDateChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onStrategyChange: (strategies: {}) => void;
}

const FilterBar: FC<Props> = ({
    startDate,
    endDate,
    stateSelection,
    onStartDateChange,
    onEndDateChange,
    onStateSelectionChange,
    onStrategyChange,
                              }) => {
  const handleStrategyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
    onStrategyChange(values);
  };

  const [values, setValues] = useState({
    socialDistancing: false,
    regionaleAbgrenzung: false,
    virusKontrolle: false,
    foerderungFalldetektion: false,
    foerderungGesundheitssystem: false,
  });

  return (
    <form
      className="flex flex-row justify-around my-4"
    >
      <InputContainer label="Von">
        <Input
          name="start_date"
          type={InputTypeEnum.Date}
          value={startDate}
          onChange={onStartDateChange}
        />
      </InputContainer>
      <InputContainer label="Bis">
        <Input
          name="end_date"
          type={InputTypeEnum.Date}
          value={endDate}
          onChange={onEndDateChange}
        />
      </InputContainer>
      <InputContainer label="Land">
        <Select name="state" value={stateSelection} options={COUNTRIES} onChange={onStateSelectionChange}/>
      </InputContainer>
      <div className="flex flex-row flex-wrap">
        <Checkbox
          label="Social Distancing"
          name="socialDistancing"
          value={values.socialDistancing}
          onChange={handleStrategyChange}
        />
        <Checkbox
          label="Regional Abgrenzung"
          name="regionaleAbgrenzung"
          value={values.regionaleAbgrenzung}
          onChange={handleStrategyChange}
        />
        <Checkbox
          label="Virus Kontrolle"
          name="virusKontrolle"
          value={values.virusKontrolle}
          onChange={handleStrategyChange}
        />
        <Checkbox
          label="Förderung Falldetektion"
          name="foerderungFalldetektion"
          value={values.foerderungFalldetektion}
          onChange={handleStrategyChange}
        />
        <Checkbox
          label="Förderung Gesundheitssystem"
          name="foerderungGesundheitssystem"
          value={values.foerderungGesundheitssystem}
          onChange={handleStrategyChange}
        />
      </div>
    </form>
  );
};

export default FilterBar;
// @ts-ignore
export {StateSelection, COUNTRIES};
