import React, {FC, ChangeEvent} from "react";
import InputContainer from "./InputContainer";
import Input, { InputTypeEnum } from "./Input";
import Select from "./Select";
import Checkbox from "./Checkbox";
import {Countries, COUNTRIES} from "../../types/countries";
import Strategies from "../../types/strategies";

type Props = {
  startDate?: any;
  endDate?: any;
  countrySelection: Countries;
  onStateSelectionChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onStartDateChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onEndDateChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onStrategyChange: (strategies: Strategies) => void;
  strategies: Strategies;
}

const FilterBar: FC<Props> = ({
    startDate,
    endDate,
    countrySelection,
    onStartDateChange,
    onEndDateChange,
    onStateSelectionChange,
    onStrategyChange,
    strategies,
                              }) => {
  const handleStrategyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    onStrategyChange({ ...strategies, [name]: value });
  };
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
        <Select name="state" value={countrySelection} options={COUNTRIES} onChange={onStateSelectionChange}/>
      </InputContainer>
      <div className="flex flex-row flex-wrap">
        <Checkbox
          label="Social Distancing"
          name="socialDistancing"
          value={strategies.socialDistancing}
          onChange={handleStrategyChange}
        />
        <Checkbox
          label="Regional Abgrenzung"
          name="regionaleAbgrenzung"
          value={strategies.regionaleAbgrenzung}
          onChange={handleStrategyChange}
        />
        <Checkbox
          label="Virus Kontrolle"
          name="virusKontrolle"
          value={strategies.virusKontrolle}
          onChange={handleStrategyChange}
        />
        <Checkbox
          label="Förderung Falldetektion"
          name="foerderungFalldetektion"
          value={strategies.foerderungFalldetektion}
          onChange={handleStrategyChange}
        />
        <Checkbox
          label="Förderung Gesundheitssystem"
          name="foerderungGesundheitssystem"
          value={strategies.foerderungGesundheitssystem}
          onChange={handleStrategyChange}
        />
      </div>
    </form>
  );
};

export default FilterBar;
