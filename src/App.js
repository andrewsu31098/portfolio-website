import styles from "./App.module.scss";
import Navbar from "./components/layout/navbar/Navbar.js";
import MyCanvas from "./components/canvas/MyCanvas/MyCanvas";
import Conveyer from "./components/layout/conveyer/Conveyer";
import Project from "./components/sections/project/Project";

function App() {
  return (
    <div className={styles.App}>
      {/* <Navbar /> */}

      <MyCanvas />
      <Conveyer />
      <Project />
    </div>
  );
}

export default App;
