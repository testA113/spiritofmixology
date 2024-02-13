import { useEffect, useRef, useState } from 'react';

const cursorScalingFactor = 0.05;
const scrollScalingFactor = 0.1;

import festivalCocktailPreparing from '/src/assets/images/festival-cocktail-preparing.jpg';
import cocktailVendor from '/src/assets/images/cocktail-vendor.jpg';
import erricks from '/src/assets/images/erricks.jpg';

export function ParallaxImageGrid() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      setCursor({
        x: e.clientX,
        y: e.clientY,
      });
    };
    const handleWindowScroll = () => {
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY,
      });
    };
    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('scroll', handleWindowScroll);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('scroll', handleWindowScroll);
    };
  }, []);
  const isMobile = window.innerWidth <= 768;

  return (
    <ImageGrid
      translateX={isMobile ? scrollPosition.x * scrollScalingFactor : -cursor.x * cursorScalingFactor}
      translateY={isMobile ? scrollPosition.y * scrollScalingFactor : -cursor.y * cursorScalingFactor}
    />
  );
}

function ImageGrid({ translateX, translateY }: { translateX: number; translateY: number }) {
  const imagesRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const images = imagesRef?.current?.getElementsByTagName('img');
    if (!images) {
      return;
    }

    const addBlur = () => {
      for (let img of images) {
        img.classList.add('blur-md', 'md:blur-lg');
        img.classList.remove('hover:blur-0');
      }
    };

    const removeBlur = () => {
      for (let img of images) {
        img.classList.remove('blur-md', 'md:blur-lg');
        img.classList.add('hover:blur-0');
      }
    };

    for (let img of images) {
      img.addEventListener('mouseover', removeBlur);
      img.addEventListener('mouseout', addBlur);
    }

    return () => {
      for (let img of images) {
        img.removeEventListener('mouseover', removeBlur);
        img.removeEventListener('mouseout', addBlur);
      }
    };
  }, []);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center relative opacity-100 overflow-hidden">
      <div
        ref={imagesRef}
        className="grid w-full h-full grid-cols-3 md:grid-cols-10 lg:grid-cols-12"
        style={{
          transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
        }}
      >
        <img
          src={festivalCocktailPreparing.src}
          alt="at a festival, a bartender skillfully pours a vodka from a height to prepare a cocktail"
          className="col-start-4 col-end-6 row-start-1 row-end-2 blur-md md:blur-lg transition-all md:hover:scale-105 duration-500 -rotate-1"
        ></img>
        <img
          src={cocktailVendor.src}
          alt="a cocktail stall serving earger customers"
          className="col-start-9 col-end-12 row-start-2 row-end-3 blur-md md:blur-lg transition-all md:hover:scale-105 duration-500 rotate-3"
        ></img>
        <img
          src={erricks.src}
          alt="wide angle of erricks venue with a band playing"
          className="col-start-3 col-end-7 lg:col-end-6 xl:col-end-5 row-start-3 row-end-4 blur-md md:blur-lg transition-all md:hover:scale-105 duration-500 -rotate-2"
        ></img>
      </div>
    </div>
  );
}
