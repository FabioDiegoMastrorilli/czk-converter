import React, { useState } from "react";
import useRate from "./hooks/useRate";
import { Rate } from "./utilities/parser";

type RatesTableProps = {
  rates: Rate[];
};

function RatesTable({rates}: RatesTableProps) {
  console.log(rates)

  return (
    <>
    {rates.map(rate => (
      <div key={rate.currencyId}>
        {rate.countryName} ({rate.currencyId}), {rate.conversionRate}, {rate.currencySlug}, {rate.quantity}
      </div>
    ))} 
    </>
    )
}

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const {isLoading, error, rates} = useRate(selectedDate);

  const todayDate = new Date();

  console.log(isLoading, error, rates);

  return (
    <div className="App">
      <label htmlFor="date">Date</label>

      <input
        id="date"
        max={todayDate.toISOString().substring(0, 10)}
        onChange={({ target }) => setSelectedDate(new Date(target.value))}
        value={selectedDate.toISOString().substring(0, 10)}
        type="date"
      />

      {!isLoading && rates && (
        <RatesTable rates={rates} />
      )}
    </div>
  );
}

export default App;
