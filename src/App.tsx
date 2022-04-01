import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import Form from "./components/Form";
import useRate from "./hooks/useRate";
import theme from "./style/theme";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const { isLoading, error, rates } = useRate(selectedDate);

  const todayDate = new Date();

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <label htmlFor="date">Date</label>

        <input
          id="date"
          max={todayDate.toISOString().substring(0, 10)}
          onChange={({ target }) => setSelectedDate(new Date(target.value))}
          value={selectedDate.toISOString().substring(0, 10)}
          type="date"
        />

        {isLoading && <div>Loading</div>}

        {!isLoading && error && <div>{error}</div>}

        {!isLoading && rates && <Form rates={rates} />}
      </div>
    </ThemeProvider>
  );
}

export default App;
