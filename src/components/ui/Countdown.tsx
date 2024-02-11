import { useEffect, useState } from 'react';
import { DateTime, Duration, Interval } from 'luxon';

const eventStartTime = DateTime.fromObject({ year: 2024, month: 6, day: 17, hour: 17 }, { zone: 'Pacific/Auckland' });
const eventEndTime = DateTime.fromObject({ year: 2024, month: 6, day: 17, hour: 22 }, { zone: 'Pacific/Auckland' });

export function Countdown() {
  const [currentTime, setCurrentTime] = useState(DateTime.now());
  const isEventStarted = currentTime >= eventStartTime;
  const isEventOver = currentTime > eventEndTime;
  const durationUntilStart = isEventStarted
    ? Duration.fromObject({ days: 0 }) // 0 duration once the event starts
    : Interval.fromDateTimes(currentTime, eventStartTime)
        .toDuration(['months', 'days', 'hours', 'minutes', 'seconds'])
        .toObject();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(DateTime.now());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="flex gap-x-2 w-full justify-center">
      {!isEventStarted && (
        <>
          {Object.entries(durationUntilStart).map(([key, value]) => (
            <TimerUnit key={key} value={value} label={key} />
          ))}
        </>
      )}
      {isEventStarted && !isEventOver && <Message message="we are live! see you there 🎉" />}
      {isEventOver && <Message message="event is over! see you soon 🫶" />}
    </div>
  );
}

function TimerUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col gap-y-2-justify-center">
      <div className="flex items-center justify-center w-16 h-12 bg-white rounded-md dark:bg-gray-800">
        <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">{Math.floor(value)}</span>
      </div>
      <div className="text-sm">{unPluralise(label, value)}</div>
    </div>
  );
}

// unPluralise removes the 's' from the label if the value is 1
function unPluralise(label: string, value: number) {
  return value === 1 ? label.slice(0, -1) : label;
}

function Message({ message }: { message: string }) {
  return (
    <div className="flex flex-col gap-y-2-justify-center">
      <div className="flex items-center justify-center p-4 bg-white rounded-md dark:bg-gray-800">
        <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">{message}</span>
      </div>
    </div>
  );
}
