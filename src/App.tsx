import { useState } from "react";
import { ThemeProvider } from "styled-components";
import AppContext from "./AppContext";
import Form from "./components/Form";
import LoadingIndicator from "./components/LoadingIndicator";
import useDarkMode from "./hooks/useDarkMode";
import useRate from "./hooks/useRate";
import StyledContainer from "./style/components/Container.styled";
import GlobalStyle from "./style/components/Global.styled";
import StyledInput from "./style/components/Input.styled";
import darkTheme from "./style/darkTheme";
import defaultTheme from "./style/defaultTheme";
import { Rate } from "./utilities/parser";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCurrency, setSelectedCurrency] = useState<Rate | null>(null);
  const { failed, loading, rates } = useRate(selectedDate);
  const darkMode = useDarkMode();

  const todayDate = new Date();

  return (
    <AppContext.Provider value={{
      selectedCurrency,
      setSelectedCurrency
    }}>
      <ThemeProvider theme={darkMode ? darkTheme : defaultTheme}>
        <GlobalStyle />

        <StyledContainer>
          <label htmlFor="date">Please select a date</label>

          <StyledInput
            id="date"
            max={todayDate.toISOString().substring(0, 10)}
            onChange={({ target }) => setSelectedDate(new Date(target.value))}
            value={selectedDate.toISOString().substring(0, 10)}
            type="date"
          />

          {loading && <LoadingIndicator />}

          {failed && <div>Un expected error occoured</div>}

          {!failed && <Form rates={rates} />}
        </StyledContainer>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
