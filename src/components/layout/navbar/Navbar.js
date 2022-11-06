import styles from "./Navbar.module.scss";
import { AiOutlineLinkedin, AiOutlineGithub } from "react-icons/ai";
import { useState } from "react";

function Navbar(props) {
  const [drawerState, setDrawer] = useState(false);
  const [barClasses, setBarClasses] = useState("");

  function onDrawerClick() {
    if (barClasses === "") {
      setBarClasses(styles.navDrawerOpen);
      setDrawer(true);
    } else {
      setBarClasses("");
      setDrawer(false);
    }
  }

  //Navbar Components
  const navBurgerButton = (
    <div className={styles.navBurgerButton} onClick={onDrawerClick}>
      <div className={`${styles.navBurgerBar} ${barClasses}`}></div>
    </div>
  );

  const navIcons = (
    <div className={styles.navIcons}>
      <AiOutlineGithub size="32px" />
      <AiOutlineLinkedin size="32px" />
    </div>
  );

  return (
    <div>
      <div className={styles.toolbar}></div>
      <div className={styles.navbar}>
        <div className={styles.navbarFlexbox}>
          {navBurgerButton}
          <p className={styles.navName}>Andrew Su </p>
          <div className={styles.navLinks}>
            <p>Contact</p>
            <div className={styles.navLinksLine}>
              <div></div>
            </div>
            <p>Work</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
