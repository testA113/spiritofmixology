import { useEffect, useState } from 'react';

const frontScalingFactor = 0.05;
// const backScalingFactor = 0.05;

import festivalCocktailPreparing from 'src/assets/images/festival-cocktail-preparing.jpg';
import cocktailVendor from 'src/assets/images/cocktail-vendor.jpg';
import aperolGinSour from 'src/assets/images/aperol-gin-sour.jpg';

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
    <div className="h-full w-full flex flex-col justify-center items-center relative opacity-100 overflow-hidden">
      <div
        className="grid w-[120%] h-[120%] grid-cols-6"
        style={{
          transform: `translate3d(-${cursor.x * frontScalingFactor}px, -${cursor.y * frontScalingFactor}px, 0)`,
        }}
      >
        <div className="col-span-6"></div>
        <div className="col-span-2"></div>
        <div>
          <img
            src={festivalCocktailPreparing.src}
            alt="at a festival, a bartender skillfully pours a vodka from a height to prepare a cocktail"
            className="blur-md md:blur-lg hover:blur-0 transition-all duration-500"
          ></img>
        </div>
        <div className="col-span-3"></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div>
          <img
            src={cocktailVendor.src}
            alt="a cocktail stall serving earger customers"
            className="blur-md md:blur-lg hover:blur-0 transition-all duration-500"
          ></img>
        </div>
        <div></div>
        <div>
          <img
            src={aperolGinSour.src}
            alt="aperol gin sour cocktail"
            className="blur-md md:blur-lg hover:blur-0 transition-all duration-500"
          ></img>
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
