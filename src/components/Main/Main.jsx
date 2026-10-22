import { useState, useEffect, useRef, useCallback } from "react";

import "./Main.css";
import MainBackground from "../MainBackground/MainBackground";
import MainNavigation from "../MainNavigation/MainNavigation";
import FeaturedWorks from "../FeaturedWorks/FeaturedWorks";
import MostRecent from "../MostRecent/MostRecent";

const TOTAL_ITEMS = 5;

function Main() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isLockedRef = useRef(false);
  const heroRef = useRef(null);
  const touchStartYRef = useRef(0);
  const touchEndYRef = useRef(0);

  const handleScrollDown = () => {
    const featuredSection = document.getElementById("featured-works");
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollUpToHero = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const changeSlide = useCallback(
    (direction) => {
      const scrollingDown = direction === "down";
      const scrollingUp = direction === "up";

      if (isLockedRef.current) return;

      if (activeIndex === TOTAL_ITEMS - 1 && scrollingDown) {
        isLockedRef.current = true;
        handleScrollDown();
        setTimeout(() => {
          isLockedRef.current = false;
        }, 600);
        return;
      }

      if (
        (scrollingDown && activeIndex < TOTAL_ITEMS - 1) ||
        (scrollingUp && activeIndex > 0)
      ) {
        isLockedRef.current = true;

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
    [activeIndex],
  );

  useEffect(() => {
    const handleWheel = (e) => {
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;
      const heroHeight = heroRef.current
        ? heroRef.current.offsetHeight
        : window.innerHeight;

      if (window.scrollY < heroHeight - 50) {
        e.preventDefault();
        if (activeIndex === TOTAL_ITEMS - 1 && scrollingDown) {
          changeSlide("down");
        } else {
          changeSlide(scrollingDown ? "down" : "up");
        }
      } else if (scrollingUp) {
        if (isLockedRef.current) return;
        e.preventDefault();
        isLockedRef.current = true;
        handleScrollUpToHero();
        setTimeout(() => {
          isLockedRef.current = false;
        }, 600);
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
      const heroHeight = heroRef.current
        ? heroRef.current.offsetHeight
        : window.innerHeight;
      if (window.scrollY < heroHeight - 50) {
        e.preventDefault();
      } else {
        const currentY = e.touches[0].clientY;
        const deltaY = touchStartYRef.current - currentY;
        if (deltaY < 0) {
          e.preventDefault();
        }
      }
    };

    const handleTouchEnd = (e) => {
      touchEndYRef.current = e.changedTouches[0].clientY;
      const deltaY = touchStartYRef.current - touchEndYRef.current;
      const minSwipeDistance = 40;
      const heroHeight = heroRef.current
        ? heroRef.current.offsetHeight
        : window.innerHeight;

      if (Math.abs(deltaY) > minSwipeDistance) {
        if (window.scrollY < heroHeight - 50) {
          if (deltaY > 0) {
            changeSlide("down");
          } else {
            if (activeIndex > 0) changeSlide("up");
          }
        } else if (deltaY < 0) {
          handleScrollUpToHero();
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
  };

  return (
    <div className="main">
      <section className="main__hero" ref={heroRef}>
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

Main.displayName = "Main";

export default Main;
