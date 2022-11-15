import styles from "./About.module.scss";
import filterPhoto from "../../../assets/filters/tom2.png";

import { AiOutlineGithub, AiFillLinkedin, AiOutlineMail } from "react-icons/ai";
import { IconContext } from "react-icons";

function HobbyComponent(props) {
  return <div className={styles.HobbyComponent}>{props.name}</div>;
}

export default function About(props) {
  return (
    <div className={styles.AboutWrapper}>
      <div className={styles.AboutCloud}>MY NAME IS</div>
      <div className={styles.AboutFlex}>
        <div className={styles.InfoWrapper}>
          <div className={styles.Name}>ANDREW SU </div>
          <div className={styles.Title}>A Web Developer</div>
          <div className={styles.Description}>
            I graduated from University of California, Irvine with a bachelors
            in Computer Science and a specialization in Information. There, I
            enjoyed coding microcontrollers, a search engine, and a compiler.
            But ultimately web development is what interested me the most.
          </div>
          <div className={styles.HobbyTitle}>Hobbies</div>
          <div className={styles.HobbiesFlex}>
            <HobbyComponent name="Working Out" />{" "}
            <HobbyComponent name="Spending Money" />
            <HobbyComponent name="Cooking" />
          </div>

          <div className={styles.SocialWrapper}>
            <div className={styles.SocialFlex}>
              <div className={styles.IconWrapper}>
                <IconContext.Provider
                  value={{
                    size: "50px",
                    color: "white",
                  }}
                >
                  <AiFillLinkedin />
                </IconContext.Provider>

                <div className={styles.SpinBorder}></div>
              </div>
              <div className={styles.IconWrapper}>
                <IconContext.Provider
                  value={{
                    size: "50px",
                    color: "white",
                  }}
                >
                  <AiOutlineGithub />
                </IconContext.Provider>

                <div className={styles.SpinBorder}></div>
              </div>
              <div className={styles.IconWrapper}>
                <IconContext.Provider
                  value={{
                    size: "50px",
                    color: "white",
                  }}
                >
                  <AiOutlineMail />
                </IconContext.Provider>

                <div className={styles.SpinBorder}></div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.ImageWrapper}>
          <img src={filterPhoto} alt="Photo of Developer" />
        </div>
      </div>
    </div>
  );
}