import { LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterLuxon";

import styles from "./App.module.css";
import { Main, NavBar } from "./components/layouts";

const App = () => {
  return (
    <LocalizationProvider dateAdapter={DateAdapter} locale="nz">
      <div className={styles.appWrapper}>
        <NavBar />
        <Main />
      </div>
    </LocalizationProvider>
  );
};

export default App;
