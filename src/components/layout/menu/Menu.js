import styles from "./Menu.module.scss";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";

export default function Menu(props) {
  const [menuState, setMenu] = useState(false);

  function menuClicked() {
    setMenu(menuState ? false : true);
    console.log(menuState);
  }
  return (
    <div className={styles.MenuWrapper}>
      <div className={styles.MenuButton} onClick={menuClicked}>
        <AiOutlinePlus AiOutlinePlus />
        Menu
      </div>
      <div
        className={`${styles.MenuOverlay} ${menuState ? styles.Clicked : null}`}
      ></div>
      <div
        className={`${styles.MenuGrid} ${menuState ? styles.Clicked : null}`}
      >
        <div className={styles.Empty}></div>
        <div className={styles.Home}>
          <a href="#home" onClick={menuClicked}>
            <div className={styles.WordWrapper}>
              <span
                className={`${styles.one} ${menuState ? styles.Clicked : null}`}
              >
                Home
              </span>
            </div>
          </a>
        </div>
        <div className={styles.About}>
          <a href="#about" onClick={menuClicked}>
            <div className={styles.WordWrapper}>
              <span
                className={`${styles.two} ${menuState ? styles.Clicked : null}`}
              >
                About
              </span>
            </div>
          </a>
        </div>
        <div className={styles.Projects}>
          <a href="#projects" onClick={menuClicked}>
            <div className={styles.WordWrapper}>
              <span
                className={`${styles.three} ${
                  menuState ? styles.Clicked : null
                }`}
              >
                Projects
              </span>
            </div>
          </a>
        </div>
        <div className={styles.Contact}>
          <a href="#contact" onClick={menuClicked}>
            <div className={styles.WordWrapper}>
              <span
                className={`${styles.four} ${
                  menuState ? styles.Clicked : null
                }`}
              >
                Contact
              </span>
            </div>
          </a>
        </div>
        <div className={styles.Socials}></div>
        <div className={styles.CloseButton} onClick={menuClicked}>
          <div className={styles.WordWrapper}>
            <span
              className={`${styles.five} ${menuState ? styles.Clicked : null}`}
            >
              <AiOutlineMinusCircle />
              Menu
            </span>
          </div>
        </div>
      </div>

      <div
        className={`${styles.MenuUpOverlay} ${
          menuState ? styles.Clicked : null
        }`}
      >
        <div
          className={`${styles.MenuLeft} ${menuState ? styles.Clicked : null}`}
        ></div>
        <div
          className={`${styles.MenuMid} ${menuState ? styles.Clicked : null}`}
        ></div>
        <div
          className={`${styles.MenuRight} ${menuState ? styles.Clicked : null}`}
        ></div>
      </div>
    </div>
  );
}
