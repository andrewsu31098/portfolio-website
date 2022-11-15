import styles from "./App.module.scss";
import MyCanvas from "./components/canvas/MyCanvas/MyCanvas";
import Conveyer from "./components/layout/conveyer/Conveyer";
import Conveyer2 from "./components/layout/conveyer2/Conveyer2";
import Conveyer3 from "./components/layout/conveyer3/Conveyer3";
import Menu from "./components/layout/menu/Menu";
import About from "./components/sections/about/About";
import Projects from "./components/sections/project/Projects";
import Contact from "./components/sections/contact/Contact";

function App() {
  return (
    <div className={styles.App}>
      <Menu />
      <MyCanvas />
      <Conveyer />
      <About />
      <Conveyer2 />
      <Projects />
      <Conveyer3 />
      <Contact />
    </div>
  );
}

export default App;
