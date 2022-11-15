import styles from "./Contact.module.scss";
import { AiOutlineGithub, AiFillLinkedin, AiOutlineMail } from "react-icons/ai";
import { IconContext } from "react-icons";

export default function Contact(props) {
  return (
    <div className={styles.ContactWrapper}>
      <div className={styles.ContactCall}></div>
      <div className={styles.ContactEmail}>
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
        <span>avsu@uci.edu</span>
      </div>

      <div className={styles.ContactEmail}>
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
        <span>Andrew Su</span>
      </div>
    </div>
  );
}
