import React, { useState } from "react";
import InputContainer from "./InputContainer";
import Input, { InputTypeEnum } from "./Input";
import Select from "./Select";
import Checkbox from "./Checkbox";

function FilterBar() {
  const handleInputChange = (e: any) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
  };
  const [values, setValues] = useState({
    start_date: new Date().toDateString(),
    end_date: new Date().toDateString(),
    state: "",
    social_distancing: true,
    regionale_abgrenzung: true,
    virus_kontrolle: true,
    foerderung_falldetektion: true,
    foerderung_gesundheitssystem: true
  });
  const states = [
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
  ];
  return (
    <form
      className="flex flex-row justify-around my-4"
      onChange={e => handleInputChange(e)}
    >
      <InputContainer label="Von">
        <Input
          name="start_date"
          type={InputTypeEnum.Date}
          value={values.start_date}
        />
      </InputContainer>
      <InputContainer label="Bis">
        <Input
          name="end_date"
          type={InputTypeEnum.Date}
          value={values.end_date}
        />
      </InputContainer>
      <InputContainer label="Land">
        <Select name="state" value={values.state} options={states} />
      </InputContainer>
      <div className="flex flex-row flex-wrap">
        <Checkbox
          label="Social Distancing"
          name="social_distancing"
          value={values.social_distancing}
        />
        <Checkbox
          label="Regional Abgrenzung"
          name="regionale_abgrenzung"
          value={values.regionale_abgrenzung}
        />
        <Checkbox
          label="Virus Kontrolle"
          name="virus_kontrolle"
          value={values.virus_kontrolle}
        />
        <Checkbox
          label="Förderung Falldetektion"
          name="foerderung_falldetektion"
          value={values.foerderung_falldetektion}
        />
        <Checkbox
          label="Förderung Gesundheitssystem"
          name="foerderung_gesundheitssystem"
          value={values.foerderung_gesundheitssystem}
        />
      </div>
    </form>
  );
}

export default FilterBar;
