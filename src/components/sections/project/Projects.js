import styles from "./Projects.module.scss";
import weather from "../../../assets/videos/weather.mp4";
import distance from "../../../assets/videos/distance.mp4";
import blog from "../../../assets/videos/blog.mp4";

import { useMediaQuery } from "react-responsive";
import { tabletQuery } from "../../../utilities/breakpoints";
import { useState, useRef, useEffect } from "react";

function TechComponent(props) {
  return <div className={styles.TechComponent}>{props.name}</div>;
}

export default function Project(props) {
  const [isVisible, setVisible] = useState(false);
  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  const videoRef3 = useRef(null);

  useEffect(() => {
    if (videoRef1.current && isVisible) {
      videoRef1.current.play();
    }
  }, [videoRef1]);
  useEffect(() => {
    if (videoRef2.current && isVisible) {
      videoRef2.current.play();
    }
  }, [videoRef2]);
  useEffect(() => {
    if (videoRef3.current && isVisible) {
      videoRef3.current.play();
    }
  }, [videoRef3]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) =>
        entry.isIntersecting ? setVisible(true) : null
      );
    });
    observer.observe(videoRef1.current);
    observer.observe(videoRef2.current);
    observer.observe(videoRef3.current);
  }, []);

  return (
    <div className={styles.ProjectWrapper}>
      <div className={styles.ProjectGrid}>
        <div className={styles.VideoWrapper}>
          <div className={styles.Darken}></div>

          <video
            ref={videoRef1}
            src={blog}
            autoplay
            autoPlay
            loop
            muted
            playsinline
          ></video>
        </div>
        <div className={styles.InfoWrapper}>
          <div className={styles.Title}>Personal Blog Website</div>
          <div className={styles.Description}>
            A blogging platform built to be fast, scalable, and informative.
          </div>

          <div className={styles.TechWrapper}>
            <div className={styles.TechTitle}>Tech Stack</div>
            <div className={styles.TechFlex}>
              <TechComponent name="Next.js" />
              <TechComponent name="Netlify" />
              <TechComponent name="Sanity.io" />
              <TechComponent name="Sass" />
            </div>
          </div>
        </div>
        <div className={styles.VideoWrapper}>
          <video
            ref={videoRef2}
            src={weather}
            autoplay
            autoPlay
            loop
            muted
            playsinline
          ></video>
        </div>
        <div className={styles.InfoWrapper}>
          <div className={styles.Title}>Minimalist Weather Website</div>
          <div className={styles.Description}>
            A weather website made for an easy user experience and a
            minimalistic presentation.
          </div>

          <div className={styles.TechWrapper}>
            <div className={styles.TechTitle}>Tech Stack</div>
            <div className={styles.TechFlex}>
              <TechComponent name="Amplify" />
              <TechComponent name="Lambda" />
              <TechComponent name="React" />
            </div>
          </div>
        </div>
        <div className={styles.VideoWrapper}>
          <div className={styles.Darken}></div>
          <video
            ref={videoRef3}
            src={distance}
            autoplay
            autoPlay
            loop
            muted
            playsinline
          ></video>
        </div>
        <div className={styles.InfoWrapper}>
          <div className={styles.Title}>Distance Guesser Game</div>
          <div className={styles.Description}>
            A website to test how well you can guess distance from famous
            cities.
          </div>

          <div className={styles.TechWrapper}>
            <div className={styles.TechTitle}>Tech Stack</div>
            <div className={styles.TechFlex}>
              <TechComponent name="AWS S3" />
              <TechComponent name="Amplify" />
              <TechComponent name="Lambda" />
              <TechComponent name="React" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
