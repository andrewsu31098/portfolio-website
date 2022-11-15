import styles from "./Overlay.module.scss";
import { SlArrowDown } from "react-icons/sl";

function smoothScroll() {
  var html = document.documentElement;
  html.style.scrollBehavior = "smooth";
  document.getElementById("about").scrollIntoView();
  html.style.scrollBehavior = "";
}

export default function Overlay(props) {
  return (
    <div className={styles.Overlay}>
      <p className={styles.Design}>
        <span>D</span>
        <span>E</span>
        <span>S</span>
        <span>I</span>
        <span>G</span>
        <span>N</span>
      </p>{" "}
      <p className={styles.Development}>
        <span>D</span>
        <span>E</span>
        <span>V</span>
        <span>E</span>
        <span>L</span>
        <span>O</span>
        <span>P</span>
        <span>M</span>
        <span>E</span>
        <span>N</span>
        <span>T</span>
      </p>
      <p className={styles.Creation}>
        <span>C</span>
        <span>R</span>
        <span>E</span>
        <span>A</span>
        <span>T</span>
        <span>I</span>
        <span>O</span>
        <span>N</span>
      </p>
      <div className={styles.arrowDown}>
        <a onClick={smoothScroll}>
          <SlArrowDown className={styles.reactIcon} />
          <SlArrowDown className={styles.reactIcon} />
        </a>
      </div>
    </div>
  );
}
