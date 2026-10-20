import { useState, useEffect, useRef, useCallback } from "react";

import "./Main.css";
import MainBackground from "../MainBackground/MainBackground";
import MainNavigation from "../MainNavigation/MainNavigation";
import FeaturedWorks from "../FeaturedWorks/FeaturedWorks";
import MostRecent from "../MostRecent/MostRecent";

const TOTAL_ITEMS = 5;
const IDLE_AUTO_SCROLL_DELAY = 8000;

function Main() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isLockedRef = useRef(false);
  const idleTimerRef = useRef(null);

  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) {
      clearInterval(idleTimerRef.current);
    }

    idleTimerRef.current = setInterval(() => {
      if (window.scrollY > 10) return;

      setActiveIndex((prev) => (prev + 1) % TOTAL_ITEMS);
    }, IDLE_AUTO_SCROLL_DELAY);
  }, []);

  useEffect(() => {
    resetIdleTimer();
    return () => {
      if (idleTimerRef.current) clearInterval(idleTimerRef.current);
    };
  }, [resetIdleTimer]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (window.scrollY > 10) return;

      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      if (activeIndex === TOTAL_ITEMS - 1 && scrollingDown) {
        return;
      }

      if (
        (scrollingDown && activeIndex < TOTAL_ITEMS - 1) ||
        (scrollingUp && activeIndex > 0)
      ) {
        e.preventDefault();

        if (isLockedRef.current) return;
        isLockedRef.current = true;

        resetIdleTimer();

        if (scrollingDown) {
          setActiveIndex((prev) => Math.min(prev + 1, TOTAL_ITEMS - 1));
        } else if (scrollingUp) {
          setActiveIndex((prev) => Math.max(prev - 1, 0));
        }

        setTimeout(() => {
          isLockedRef.current = false;
        }, 400);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeIndex, resetIdleTimer]);

  const handleNavigate = (index) => {
    setActiveIndex(index);
    resetIdleTimer();
  };

  return (
    <div className="main">
      <section className="main__hero">
        <MainBackground activeIndex={activeIndex} />
        <MainNavigation activeIndex={activeIndex} onNavigate={handleNavigate} />
      </section>

      <FeaturedWorks />
      <MostRecent />
    </div>
  );
}

export default Main;
