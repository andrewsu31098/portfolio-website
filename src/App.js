import styles from "./App.module.scss";
import Navbar from "./components/layout/navbar/Navbar.js";
import MyCanvas from "./components/canvas/MyCanvas/MyCanvas";
import Conveyer from "./components/layout/conveyer/Conveyer";
import Projects from "./components/sections/project/Projects";

function App() {
  return (
    <div className={styles.App}>
      {/* <Navbar /> */}

      <MyCanvas />
      <Conveyer />
      <Projects />
    </div>
  );
}

export default App;
