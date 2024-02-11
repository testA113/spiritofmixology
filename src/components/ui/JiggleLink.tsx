import type { PropsWithChildren } from 'react';
import clsx from 'clsx';

type Props = {
  url: string;
  width?: 'wide' | 'narrow';
};

export function JiggleLink({ url, children, width }: PropsWithChildren<Props>) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white flex items-center justify-center relative group"
    >
      <div
        className={clsx(
          'h-[145%] w-[120%] md:w-[150%] border border-accent border-solid rounded-[200px/50px] md:rounded-[130px/50px] flex absolute -rotate-2 group-hover:animate-jiggle1',
          {
            '!rounded-[200px/50px]': width === 'wide',
          }
        )}
      ></div>
      <div
        className={clsx(
          'h-[145%] w-[120%] md:w-[150%] border border-accent border-solid rounded-[200px/50px] md:rounded-[130px/50px] flex absolute rotate-1 md:rotate-1 group-hover:animate-jiggle2',
          {
            '!rounded-[200px/50px]': width === 'wide',
          }
        )}
      ></div>
      {children}
    </a>
  );
}
