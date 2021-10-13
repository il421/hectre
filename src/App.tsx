import styles from "./App.module.css";
import { Main, NavBar } from "./components/layouts";

const App = () => {
  return (
    <div className={styles.appWrapper}>
      <NavBar />
      <Main />
    </div>
  );
};

export default App;
