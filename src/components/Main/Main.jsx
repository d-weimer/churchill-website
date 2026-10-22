import { useState, useEffect, useRef, useCallback } from "react";

import "./Main.css";
import MainBackground from "../MainBackground/MainBackground";
import MainNavigation from "../MainNavigation/MainNavigation";
import FeaturedWorks from "../FeaturedWorks/FeaturedWorks";
import MostRecent from "../MostRecent/MostRecent";

const TOTAL_ITEMS = 5;
//const IDLE_AUTO_SCROLL_DELAY = 8000;

function Main() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isLockedRef = useRef(false);
  const idleTimerRef = useRef(null);
  const touchStartYRef = useRef(0);
  const touchEndYRef = useRef(0);

  const resetIdleTimer = useCallback(() => {
    /*
    if (idleTimerRef.current) {
      clearInterval(idleTimerRef.current);
    }

    idleTimerRef.current = setInterval(() => {
      if (window.scrollY > 10) return;

      setActiveIndex((prev) => (prev + 1) % TOTAL_ITEMS);
    }, IDLE_AUTO_SCROLL_DELAY);
    */
  }, []);

  useEffect(() => {
    resetIdleTimer();
    return () => {
      if (idleTimerRef.current) clearInterval(idleTimerRef.current);
    };
  }, [resetIdleTimer]);

  const changeSlide = useCallback(
    (direction) => {
      const scrollingDown = direction === "down";
      const scrollingUp = direction === "up";

      if (activeIndex === TOTAL_ITEMS - 1 && scrollingDown) {
        return;
      }

      if (
        (scrollingDown && activeIndex < TOTAL_ITEMS - 1) ||
        (scrollingUp && activeIndex > 0)
      ) {
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
    },
    [activeIndex, resetIdleTimer],
  );

  useEffect(() => {
    const handleWheel = (e) => {
      if (window.scrollY > 10) return;

      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      if (activeIndex === TOTAL_ITEMS - 1 && scrollingDown) {
        return; // Allow natural scroll past the last item
      }

      if (
        (scrollingDown && activeIndex < TOTAL_ITEMS - 1) ||
        (scrollingUp && activeIndex > 0)
      ) {
        e.preventDefault();
        changeSlide(scrollingDown ? "down" : "up");
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [activeIndex, changeSlide]);

  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (window.scrollY > 10) return;

      const currentY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - currentY;

      // Allow natural page scroll if trying to move past Gallery (down) or Writing (up)
      if (activeIndex === TOTAL_ITEMS - 1 && deltaY > 0) {
        return;
      }
      if (activeIndex === 0 && deltaY < 0) {
        return;
      }

      e.preventDefault();
    };

    const handleTouchEnd = (e) => {
      if (window.scrollY > 10) return;

      touchEndYRef.current = e.changedTouches[0].clientY;
      const deltaY = touchStartYRef.current - touchEndYRef.current;
      const minSwipeDistance = 50;

      if (Math.abs(deltaY) > minSwipeDistance) {
        if (deltaY > 0) {
          // If we are at Gallery and trying to swipe further down, let it scroll naturally
          if (activeIndex === TOTAL_ITEMS - 1) return;
          changeSlide("down");
        } else {
          if (activeIndex === 0) return;
          changeSlide("up");
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeIndex, changeSlide]);

  const handleNavigate = (index) => {
    setActiveIndex(index);
    resetIdleTimer();
  };

  const handleScrollDown = () => {
    const featuredSection = document.getElementById("featured-works");
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="main">
      <section className="main__hero">
        <MainBackground activeIndex={activeIndex} />
        <MainNavigation
          activeIndex={activeIndex}
          onNavigate={handleNavigate}
          onScrollDown={handleScrollDown}
        />
      </section>

      <div id="featured-works">
        <FeaturedWorks />
      </div>
      <MostRecent />
    </div>
  );
}

export default Main;
