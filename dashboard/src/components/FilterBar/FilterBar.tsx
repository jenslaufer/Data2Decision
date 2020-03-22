import React, {FC, useState, ChangeEvent} from "react";
import InputContainer from "./InputContainer";
import Input, { InputTypeEnum } from "./Input";
import Select from "./Select";
import Checkbox from "./Checkbox";

const STATES =  [
  "Bayern",
  "Baden-Württemberg",
  "Saarland",
  "Rheinland-Pfalz",
  "Sachsen",
  "Thüringen",
  "Hessen",
  "Nordrhein-Westfalen",
  "Sachsen-Anhalt",
  "Berlin",
  "Brandenburg",
  "Niedersachsen",
  "Mecklenburg-Vorpommern",
  "Bremen",
  "Hamburg",
  "Schleswig-Holstein"
] as const;
type StateSelection = typeof STATES[number];


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
        <Select name="state" value={stateSelection} options={STATES} onChange={onStateSelectionChange}/>
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
export {StateSelection, STATES};
