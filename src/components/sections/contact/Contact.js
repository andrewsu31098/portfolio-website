import styles from "./Contact.module.scss";
import { AiOutlineGithub, AiFillLinkedin, AiOutlineMail } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useRef, useEffect, useState } from "react";

export default function Contact(props) {
  const [isVisible, setVisible] = useState(false);

  const domRef = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) =>
        entry.isIntersecting ? setVisible(true) : null
      );
    });
    observer.observe(domRef.current);
  }, []);

  return (
    <div
      className={`${styles.ContactWrapper} ${
        isVisible ? styles.OnStart : null
      }`}
      ref={domRef}
    >
      <div className={styles.ContactCall}>
        <div className={styles.Call1}>Feel free to contact me </div>
        <div className={styles.Call2}>if you'd like to chat.</div>
        <br />
        <div className={styles.Call3}>Thanks for stopping by.</div>
      </div>
      <div className={styles.ContactFlex}>
        <div className={styles.ContactEmail}>
          <a href="mailto:avsu@uci.edu" target="_blank">
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
          </a>

          <span className={styles.ContactSubtitle}>avsu@uci.edu</span>
        </div>

        <div className={styles.ContactEmail}>
          <a
            href="https://www.linkedin.com/in/andrew-s-a1a9a0159/"
            target="_blank"
          >
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
          </a>

          <span className={styles.ContactSubtitle}>Andrew Su</span>
        </div>
      </div>
    </div>
  );
}
