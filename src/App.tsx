import { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import AppContext from "./AppContext";
import Chart from "./components/Chart";
import Error from "./components/Error";
import Form from "./components/Form";
import LoadingIndicator from "./components/LoadingIndicator";
import useDarkMode from "./hooks/useDarkMode";
import useRate from "./hooks/useRate";
import StyledContainer from "./style/components/Container.styled";
import GlobalStyle from "./style/components/Global.styled";
import { H1 as StyledH1 } from "./style/components/Headers.styled";
import StyledInput from "./style/components/Input.styled";
import InputGroup from "./style/components/InputGroup.styled";
import StyledLabel from "./style/components/Label.styled";
import darkTheme from "./style/darkTheme";
import defaultTheme from "./style/defaultTheme";
import { getChartData, RawChartData } from "./utilities/getData";
import { Rate } from "./utilities/parser";

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCurrency, setSelectedCurrency] = useState<Rate | null>(null);
  const { failed, loading, rates } = useRate(selectedDate);
  const darkMode = useDarkMode();

  const todayDate = new Date();

  const [chartData, setChartData] = useState<RawChartData | null>(null);

  useEffect(() => {
    getChartData().then(setChartData);
  }, []);

  return (
    <AppContext.Provider
      value={{
        chartData,
        selectedCurrency,
        setSelectedCurrency,
      }}
    >
      <ThemeProvider theme={darkMode ? darkTheme : defaultTheme}>
        <GlobalStyle />

        <StyledContainer>
          <div className="grid-header">
            <StyledH1>
              <span className="highlight">CZK</span> Converter
            </StyledH1>
          </div>

          <div className="grid-form">
            <InputGroup bottomSpace>
              <StyledLabel htmlFor="date">Conversion rate date:</StyledLabel>

              <StyledInput
                id="date"
                max={todayDate.toISOString().substring(0, 10)}
                onChange={({ target }) =>
                  setSelectedDate(new Date(target.value))
                }
                value={selectedDate.toISOString().substring(0, 10)}
                type="date"
              />
            </InputGroup>

            {loading && <LoadingIndicator />}

            {failed && <Error />}

            {!failed && <Form rates={rates} />}
          </div>

          <Chart />
        </StyledContainer>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
