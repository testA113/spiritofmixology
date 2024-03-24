import { useEffect, useRef, useState, type ReactNode, type PropsWithChildren } from 'react';

const cursorScalingFactor = 0.05;
const scrollScalingFactor = 0.1;

export function ParallaxImageGrid({ children }: PropsWithChildren<{}>) {
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
    >
      {children}
    </ImageGrid>
  );
}

function ImageGrid({
  translateX,
  translateY,
  children,
}: {
  translateX: number;
  translateY: number;
  children: ReactNode;
}) {
  const imagesRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const images = imagesRef?.current?.getElementsByTagName('img');
    if (!images) {
      return;
    }

    const addBlur = () => {
      for (let img of images) {
        img.classList.add('blur-md', 'md:blur-lg', 'brightness-150');
        img.classList.remove('hover:blur-0');
      }
    };

    const removeBlur = () => {
      for (let img of images) {
        img.classList.remove('blur-md', 'md:blur-lg', 'brightness-150');
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
        {children}
      </div>
    </div>
  );
}
