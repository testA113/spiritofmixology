import { useEffect, useState } from 'react';

const cursorScalingFactor = 0.05;
const scrollScalingFactor = 0.1;

import festivalCocktailPreparing from '/src/assets/images/festival-cocktail-preparing.jpg';
import cocktailVendor from '/src/assets/images/cocktail-vendor.jpg';
import aperolGinSour from '/src/assets/images/aperol-gin-sour.jpg';

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

  return (
    <ImageGrid
      translateX={-cursor.x * cursorScalingFactor + scrollPosition.x * scrollScalingFactor}
      translateY={-cursor.y * cursorScalingFactor + scrollPosition.y * scrollScalingFactor}
    />
  );
}

function ImageGrid({ translateX, translateY }: { translateX: number; translateY: number }) {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center relative opacity-100 overflow-hidden">
      <div
        className="grid w-full h-full grid-6 md:grid-cols-10 lg:grid-cols-12"
        style={{
          transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
        }}
      >
        <img
          src={festivalCocktailPreparing.src}
          alt="at a festival, a bartender skillfully pours a vodka from a height to prepare a cocktail"
          className="col-start-4 col-end-6 row-start-1 row-end-2 blur-md md:blur-lg hover:blur-0 transition-all duration-500"
        ></img>
        <img
          src={cocktailVendor.src}
          alt="a cocktail stall serving earger customers"
          className="col-start-9 col-end-12 row-start-2 row-end-3 blur-md md:blur-lg hover:blur-0 transition-all duration-500"
        ></img>
        <img
          src={aperolGinSour.src}
          alt="aperol gin sour cocktail"
          className="col-start-3 col-end-5 row-start-3 row-end-4 blur-md md:blur-lg hover:blur-0 transition-all duration-500"
        ></img>
      </div>
    </div>
  );
}
