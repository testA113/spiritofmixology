import { useEffect, useState } from 'react';

const frontScalingFactor = 0.05;

import festivalCocktailPreparing from 'public/festival-cocktail-preparing.jpg';
import cocktailVendor from 'public/cocktail-vendor.jpg';
import aperolGinSour from 'public/aperol-gin-sour.jpg';

export function ParallaxImageGrid() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      setCursor({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
  }, []);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center relative opacity-100 overflow-x-hidden overflow-y-visible">
      <div
        className="grid w-full h-full sm:grid-cols-10 md:grid-cols-11 lg:grid-cols-12"
        style={{
          transform: `translate3d(-${cursor.x * frontScalingFactor}px, -${cursor.y * frontScalingFactor}px, 0)`,
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
