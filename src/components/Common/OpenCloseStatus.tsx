import * as React from "react";
import { convert24To12 } from "./HoursConverter";
import { t } from "i18next";

export interface WeekType {
  monday?: DayType;
  tuesday?: DayType;
  wednesday?: DayType;
  thursday?: DayType;
  friday?: DayType;
  saturday?: DayType;
  sunday?: DayType;
}

export interface DayType {
  isClosed: boolean;
  openIntervals: IntervalType[];
}

export interface HolidayType {
  date: string;
  isClosed?: boolean;
  openIntervals: IntervalType[];
}

export interface IntervalType {
  start: string;
  end: string;
}

export interface HoursType extends WeekType {
  holidayHours?: HolidayType[];
  reopenDate?: string;
}

// HoursTable

export type DayOfWeekNames = {
  [Property in keyof WeekType]?: string;
};

export type DayStringType =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

const openClose = {
  formatOpenNowString: (hoursData: HoursType, timeZone: string) => {
    let Day = 0;
    const now = new Date();
    const currentTime = new Date(
      now.toLocaleString("en-US", { timeZone: timeZone })
    );
    const tomorrow = new Date(currentTime.getTime() + 60 * 60 * 24 * 1000);
    let nextTomorrow = new Date(tomorrow.getTime() + 86400000);
    const yesterday = new Date(currentTime.getTime() - 60 * 60 * 24 * 1000);
    const nowTimeNumber =
      currentTime.getHours() + currentTime.getMinutes() / 60;

    const intervalsToday = openClose.getIntervalOnDate(currentTime, hoursData);
    const intervalsTomorrow = openClose.getIntervalOnDate(tomorrow, hoursData);
    const intervalsnextTommorow = openClose.getIntervalOnDate(
      nextTomorrow,
      hoursData
    );
    const intervalsYesterday = openClose.getIntervalOnDate(
      yesterday,
      hoursData
    );
    let openRightNow = false;
    let currentInterval = null;
    let nextInterval = null;

    if (intervalsYesterday) {
      for (let i = 0; i < intervalsYesterday.length; i++) {
        const interval = intervalsYesterday[i];
        const startIntervalNumber = openClose.timeStringToNumber(
          interval.start
        );
        const endIntervalNumber = openClose.timeStringToNumber(interval.end);

        // If end overflows to the next day (i.e. today).
        if (endIntervalNumber < startIntervalNumber) {
          if (nowTimeNumber < endIntervalNumber) {
            currentInterval = interval;
            openRightNow = true;
          }
        }
      }
    }

    // Assumes no overlapping intervals
    if (intervalsToday) {
      for (let i = 0; i < intervalsToday.length; i++) {
        const interval = intervalsToday[i];
        const startIntervalNumber = openClose.timeStringToNumber(
          interval.start
        );
        const endIntervalNumber = openClose.timeStringToNumber(interval.end);

        // If current time doesn't belong to one of yesterdays interval.
        if (currentInterval == null) {
          if (endIntervalNumber < startIntervalNumber) {
            if (nowTimeNumber >= startIntervalNumber) {
              currentInterval = interval;
              openRightNow = true;
            }
          } else if (
            nowTimeNumber >= startIntervalNumber &&
            nowTimeNumber < endIntervalNumber
          ) {
            currentInterval = interval;
            openRightNow = true;
          }
        }

        if (nextInterval == null) {
          if (startIntervalNumber > nowTimeNumber) {
            nextInterval = interval;
          }
        } else {
          if (
            startIntervalNumber > nowTimeNumber &&
            startIntervalNumber <
              openClose.timeStringToNumber(nextInterval.start)
          ) {
            nextInterval = interval;
          }
        }
      }
    }
    let nextIsTomorrow = false;

    // If no more intervals in the day
    if (nextInterval == null) {
      if (intervalsTomorrow) {
        if (intervalsTomorrow.length > 0) {
          nextTomorrow = new Date(currentTime.getTime() + 60 * 60 * 24 * 1000);
          Day = nextTomorrow.getDay();
          nextInterval = intervalsTomorrow[0];
          nextIsTomorrow = true;
        }
      } else if (intervalsnextTommorow) {
        nextTomorrow = new Date(tomorrow.getTime() + 86400000);
        Day = nextTomorrow.getDay();
        if (intervalsnextTommorow.length > 0) {
          nextInterval = intervalsnextTommorow[0];
          nextIsTomorrow = true;
        }
      } else if (
        openClose.getIntervalOnDate(
          new Date(nextTomorrow.getTime() + 86400000),
          hoursData
        )
      ) {
        nextTomorrow = new Date(nextTomorrow.getTime() + 86400000);
        Day = nextTomorrow.getDay();
        const nextintervals = openClose.getIntervalOnDate(
          nextTomorrow,
          hoursData
        );
        if (nextintervals && nextintervals.length > 0) {
          nextInterval = nextintervals[0];
          nextIsTomorrow = true;
        }
      } else if (
        openClose.getIntervalOnDate(
          new Date(nextTomorrow.getTime() + 172800000),
          hoursData
        )
      ) {
        nextTomorrow = new Date(nextTomorrow.getTime() + 172800000);
        Day = nextTomorrow.getDay();
        const nextintervals = openClose.getIntervalOnDate(
          nextTomorrow,
          hoursData
        );
        if (nextintervals && nextintervals.length > 0) {
          nextInterval = nextintervals[0];
          nextIsTomorrow = true;
        }
      } else if (
        openClose.getIntervalOnDate(
          new Date(nextTomorrow.getTime() + 259200000),
          hoursData
        )
      ) {
        nextTomorrow = new Date(nextTomorrow.getTime() + 259200000);
        Day = nextTomorrow.getDay();
        const nextintervals = openClose.getIntervalOnDate(
          nextTomorrow,
          hoursData
        );
        if (nextintervals && nextintervals.length > 0) {
          nextInterval = nextintervals[0];
          nextIsTomorrow = true;
        }
      } else if (
        openClose.getIntervalOnDate(
          new Date(nextTomorrow.getTime() + 86400000 + 259200000),
          hoursData
        )
      ) {
        nextTomorrow = new Date(nextTomorrow.getTime() + 86400000 + 259200000);
        Day = nextTomorrow.getDay();
        const nextintervals = openClose.getIntervalOnDate(
          nextTomorrow,
          hoursData
        );
        if (nextintervals && nextintervals.length > 0) {
          nextInterval = nextintervals[0];
          nextIsTomorrow = true;
        }
      }
    }
    const week = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let hoursString = `closed `;
    if (openRightNow) {
      if (
        currentInterval &&
        currentInterval.start === "00:00" &&
        currentInterval.end === "23:59"
      ) {
        hoursString = "Open 24 Hours";
      } else if (currentInterval) {
        hoursString = `${t("Open - Closed at")} [closingTime]`;
        hoursString = hoursString.replace(
          "[closingTime]",
          convert24To12(currentInterval.end)
        );
      }
    } else if (nextInterval) {
      if (nextIsTomorrow) {
        hoursString = `${t("Closed - Open at")}  [openingTime] ${week[Day]} `;
        hoursString = hoursString.replace(
          "[openingTime]",
          convert24To12(nextInterval.start)
        );
      } else {
        hoursString = `${t("Closed - Open at")}  [openingTime]`;
        hoursString = hoursString.replace(
          "[openingTime]",
          convert24To12(nextInterval.start)
        );
      }
    }
    return hoursString;
  },

  getYextTimeWithUtcOffset: (entityUtcOffsetSeconds: number) => {
    const now = new Date();
    let utcOffset = 0;
    if (entityUtcOffsetSeconds) {
      utcOffset = entityUtcOffsetSeconds * 1000;
    }
    if (utcOffset !== 0) {
      const localUtcOffset = now.getTimezoneOffset() * 60 * 1000;
      return new Date(now.valueOf() + utcOffset + localUtcOffset);
    }
    return now;
  },

  parseTimeZoneUtcOffset: (timeString: string) => {
    if (!timeString) {
      return 0;
    }
    const parts = timeString.split(":");
    const hours = parseInt(parts[0].replace(/\u200E/g, ""), 10);
    const minutes = parseInt(parts[1].replace(/\u200E/g, ""), 10);
    if (hours < 0) {
      return -(Math.abs(hours) + minutes / 60) * 60 * 60;
    }
    return (hours + minutes / 60) * 60 * 60;
  },

  timeStringToNumber: (timeString: string) => {
    const parts = timeString.split(":");
    const hours = parseInt(parts[0].replace(/\u200E/g, ""), 10);
    const minutes = parseInt(parts[1].replace(/\u200E/g, ""), 10);
    return hours + minutes / 60;
  },

  getIntervalOnDate: (date: Date, hoursData: HoursType) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const days: string[] = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];

    const dateString =
      year +
      "-" +
      (month < 10 ? "0" + month : month) +
      "-" +
      (day < 10 ? "0" + day : day);
    const dayOfWeekString = days[date.getDay()];

    // Check for holiday
    if (hoursData.holidayHours) {
      for (let i = 0; i < hoursData.holidayHours.length; i++) {
        const holiday = hoursData.holidayHours[i];
        if (holiday.date == dateString) {
          if (holiday.openIntervals) {
            return holiday.openIntervals;
          } else if (holiday.isClosed === true) {
            return null; // On holiday but closed
          }
        }
      }
    }

    // Not on holiday
    if (
      typeof hoursData[dayOfWeekString as DayStringType] !== "undefined" &&
      hoursData[dayOfWeekString as DayStringType]?.openIntervals
    ) {
      return hoursData[dayOfWeekString as DayStringType]?.openIntervals;
    } else {
      return null;
    }
  },

  formatTime: (time: number) => {
    const tempDate = new Date("January 1, 2020 " + time);
    const localeString = "en-US";
    return tempDate.toLocaleTimeString(localeString.replace("_", "-"), {
      hour: "numeric",
      minute: "numeric",
    });
  },

  getUtcOffsetFromTimeZone: (timeZone: string, date: Date = new Date()) => {
    const tz = date
      .toLocaleString("en-gb", { timeZone, timeStyle: "long" })
      .split(" ")
      .slice(-1)[0];
    const dateString = date.toString();
    const offset =
      Date.parse(`${dateString} UTC`) - Date.parse(`${dateString} ${tz}`);
    return openClose.msToTime(offset);
  },

  msToTime: (duration: number) => {
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    hours = hours < 10 ? hours : hours;
    return hours + ":00";
  },
};

interface OpenCloseStatusProps {
  hours?: HoursType;
  timezone?: string | undefined;
}

export default function OpenCloseStatus(props: OpenCloseStatusProps) {
  return (
    <div className="">
      {props?.hours && props?.hours?.reopenDate ? (
        <p className="">Temporarily Closed</p>
      ) : props?.hours ? (
        <p className="closeing-div onhighLight">
          {props.timezone &&
            openClose.formatOpenNowString(props.hours, props.timezone)}
        </p>
      ) : (
        <p className="closed">Closed</p>
      )}
    </div>
  );
}
