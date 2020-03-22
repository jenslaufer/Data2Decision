import React, {ChangeEvent, useState} from "react";
import Header from "./components/Header/Header";
import FilterBar from "./components/FilterBar/FilterBar";
import AgeDistribution from "./components/AgeDistribution/AgeDistribution";
import TreatmentLocation from "./components/TreatmentLocation/TreatmenLocation";
import HealthcarePressure from "./components/HealthcarePressure/HealthcarePressure";
import {Countries} from "./types/countries";
import Strategies from "./types/strategies";
import PeopleMeter from "./components/PeopleMeter/PeopleMeter";

function App() {
  const [stateSelection, setStateSelection] = useState<Countries>("Germany");
  const [startDate, setStartDate] = useState(new Date().toDateString());
  const [endDate, setEndDate] = useState(new Date().toDateString());
  const [strategies, setStrategies] = useState<Strategies>({
    socialDistancing: false,
    regionaleAbgrenzung: false,
    virusKontrolle: false,
    foerderungFalldetektion: false,
    foerderungGesundheitssystem: false,
  });

  const handleStateSelectionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const state: Countries = event.target.value as Countries;
    setStateSelection(state);
  };

  const handleStartDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const handleStrategyChange = (strategies: Strategies) => {
    setStrategies(strategies);
  };

  return (
    <div className="container mx-auto">
      <Header />
      <main>
        <FilterBar startDate={startDate} endDate={endDate} countrySelection={stateSelection} onStartDateChange={handleStartDateChange} onEndDateChange={handleEndDateChange} onStateSelectionChange={handleStateSelectionChange} onStrategyChange={handleStrategyChange} strategies={strategies}/>
        <div className="flex">
          <div className="w-1/3 mr-4 border-black border-r-2">
            <PeopleMeter percentage={Math.random()} title="Neuinfektionen"/>
            <PeopleMeter percentage={Math.random()} title="Schwerer Krankheitsverlauf"/>
            <PeopleMeter percentage={Math.random()} title="Milder Krankheitsverlauf"/>
            <PeopleMeter percentage={Math.random()} title="Genesung"/>
            <PeopleMeter percentage={Math.random()} title="Todesfälle"/>
          </div>
          <div className="w-2/3">
            <div className="flex flex-col">
              <div className="flex flex-col mt-4">
                {<HealthcarePressure country={stateSelection} strategies={strategies}/>}
              </div>
              <div className="flex">
                <div className="mr-2">
                  <AgeDistribution />
                </div>
                <TreatmentLocation />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
