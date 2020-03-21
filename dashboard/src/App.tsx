import React, { useState } from "react";
import Header from "./components/Header/Header";
import FilterBar from "./components/FilterBar/FilterBar";
import AgeDistribution from "./components/AgeDistribution/AgeDistribution";
import TreatmentLocation from "./components/TreatmentLocation/TreatmenLocation";
import HealthcarePressure from "./components/HealthcarePressure/HealthcarePressure";
import NewInfectionsRecoveries from "./components/NewInfectionsRecoveries/NewInfectionsRecoveries";
import Link from "./components/Link/Link";

function App() {
  const [activeTab, setActiveTab] = useState("HealthcarePressure");
  return (
    <div className="container mx-auto">
      <Header />
      <main>
        <FilterBar />
        <div className="flex">
          <div className="w-1/3 mr-4 border-black border-r-2">People</div>
          <div className="w-2/3">
            <div className="flex flex-col">
              <div className="flex">
                <div className="mr-2">
                  <AgeDistribution />
                </div>
                <TreatmentLocation />
              </div>
              <div className="flex flex-col mt-4">
                <ul className="flex">
                  <li className="mr-6">
                    <Link onClick={() => setActiveTab("HealthcarePressure")}>
                      Auslastung Gesundheitssystem
                    </Link>
                  </li>
                  <li className="mr-6">
                    <Link
                      onClick={() => setActiveTab("NewInfectionsRecoveries")}
                    >
                      Neuinfektionen vs. Genesung
                    </Link>
                  </li>
                </ul>
                {activeTab === "HealthcarePressure" && <HealthcarePressure />}
                {activeTab === "NewInfectionsRecoveries" && (
                  <NewInfectionsRecoveries />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
