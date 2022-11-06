import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

import { laptopQuery } from "../../../utilities/breakpoints.js";

import styles from "./ExampleNavbar.module.scss";

const navPages = [
  { name: "Home", path: "/", value: 0 },
  {
    name: "About Us",
    path: "/about",
    value: 1,
  },
  {
    name: "Services/Menu/Portfolio",
    path: "/services",
    value: 2,
  },
  {
    name: "Contact",
    path: "/contact",
    value: 3,
  },
  {
    name: "Order",
    path: "/order",
    value: 3,
  },
];

function ExampleNavbar(props) {
  var isTablet = useMediaQuery({
    query: laptopQuery,
  });

  // State variables for Navbar
  const [tabIndex, setTabIndex] = useState(0);
  const [drawerState, setDrawer] = useState(false);
  const [barClasses, setBarClasses] = useState("");

  // Updating lifecycle behavior
  // Code allows tab to remain after window refresh.
  function listenToPopstate() {
    navPages.forEach(({ path, value }) => {
      if (window.location.pathname === path) {
        setTabIndex(value);
      }
    });
  }
  useEffect(() => {
    listenToPopstate();
  }, []);

  // Pieces of the NavBar
  const navPageComponents = navPages.map(({ name, path, value }) => (
    <div
      className={tabIndex === value ? styles.tabSelected : null}
      key={path + value + "navbar"}
    >
      <a href={path} onClick={(e) => onPageSelect(value)}>
        {name}
      </a>
    </div>
  ));

  const navLinks = (
    <div className={styles.navLinks}>
      <div className={styles.navPages}>{navPageComponents}</div>
    </div>
  );

  const navBurgerButton = (
    <div className={styles.navBurgerButton} onClick={onDrawerClick}>
      <div className={`${styles.navBurgerBar} ${barClasses}`}></div>
    </div>
  );

  const dropDownMenu = (
    <div
      className={
        drawerState
          ? `${styles.dropDownMenu} ${styles.openMenu}`
          : styles.dropDownMenu
      }
    >
      {navPages.map(({ name, path, value }) => (
        <div
          className={tabIndex === value ? styles.burgerTabSelected : null}
          onClick={(e) => onPageSelect(value)}
          key={path + value + "dropdown"}
        >
          <a href={path}>{name}</a>
        </div>
      ))}
    </div>
  );

  const cloak = <div className={styles.cloak} onClick={onCloakClick}></div>;

  //Custom
  const navThreeBlocks = (
    <div classname={styles.navThreeBlocks}>
      <div>Hamburger Menu</div>
      <div>Andrew Su </div>
      <div>Linkedin Logo, Github Logo </div>
    </div>
  );

  // Functions for buttons
  function onDrawerClick() {
    if (barClasses === "") {
      setBarClasses(styles.openButton);
      setDrawer(true);
    } else {
      setBarClasses("");
      setDrawer(false);
    }
  }
  function onCloakClick() {
    setBarClasses("");
    setDrawer(false);
  }
  function onPageSelect(pageValue) {
    setTabIndex(pageValue);
    setBarClasses("");
    setDrawer(false);
  }

  // Hydration Fix
  // Dynamic content requires itself to be rendered on page load.
  // useMediaQuery doesn't render on page load.
  // I have to use "useEffect" to force my content to render
  // only when the page has loaded once already.
  const [myTabletCheck, setMyTabletCheck] = useState(false);
  useEffect(() => {
    setMyTabletCheck(isTablet);
    // If the user resizes the page with the menu open, it should close.
    onCloakClick();
  }, [isTablet]);

  return (
    <div>
      <div className={styles.toolbar}></div>
      <div className={styles.navContainer}>
        <nav className={styles.navbar}>
          <div>
            {!myTabletCheck && navThreeBlocks}{" "}
            {myTabletCheck && navBurgerButton}
          </div>
        </nav>
      </div>
      {dropDownMenu}
      {drawerState ? cloak : null}
    </div>
  );
}

export default ExampleNavbar;
