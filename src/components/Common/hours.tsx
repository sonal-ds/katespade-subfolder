import * as React from "react";
import { useEffect, useState } from "react";
import { convert24To12 } from "./HoursConverter";
import { HoursType } from "./OpenCloseStatus";
import { DayType, HolidayType, IntervalType } from "../../types/Types";

type Hours = {
  title?: string;
  hours: HoursType;
  children?: React.ReactNode;
  additionalHoursText?: string;
  timezone?: string;
  reopenDate?: string | Date;
};

/* interface Week  {
  holidayHours?:HolidayType[]
  monday?: DayType;
  tuesday?: DayType;
  wednesday?: DayType;
  thursday?: DayType;
  friday?: DayType;
  saturday?: DayType;
  sunday?: DayType;
} */

interface Week  {
  holidayHours?:HolidayType[]
  monday?: DayType;
  tuesday?: DayType;
  wednesday?: DayType;
  thursday?: DayType;
  friday?: DayType;
  saturday?: DayType;
  sunday?: DayType;
}

/**
 * todayIndex is a constant which stores the value of Day
 */
const todayIndex = new Date().getDay();

/**
 * Returns an object with the number of days until each day of the week from the current day.
 * @returns An object with the number of days until each day of the week from the current day.
 */
function getSorterForCurrentDay(): { [key: string]: number } {
  const todayIndex = new Date().getDay();
  const dayIndexes = [0, 1, 2, 3, 4, 5, 6];

  const updatedDayIndexes = dayIndexes.map((dayIndex) => {
    if (dayIndex - todayIndex >= 0) {
      return dayIndex - todayIndex;
    } else {
      return dayIndex + 7 - todayIndex;
    }
  });

  return {
    sunday: updatedDayIndexes[0],
    monday: updatedDayIndexes[1],
    tuesday: updatedDayIndexes[2],
    wednesday: updatedDayIndexes[3],
    thursday: updatedDayIndexes[4],
    friday: updatedDayIndexes[5],
    saturday: updatedDayIndexes[6],
  };
}

const defaultSorter: { [key: string]: number } = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

/**
 * Sorts the days of a week object according to a predefined order and returns a new week object with the days in order.
 *
 * @param week The week object to sort.
 * @returns A new week object with the days sorted.
 */
function sortByDay(week: Week): Week {
  const sortedEntries = Object.entries(week).sort(([day1], [day2]) => {
    const sorter = getSorterForCurrentDay();
    return sorter[day1] - sorter[day2];
  });

  type WeekDay = {
    open: string;
    close: string;
  };
  
  type OrderedWeek = {
    [key: string]: WeekDay;
  };

  const orderedWeek: OrderedWeek = {};
  for (const [key, value] of sortedEntries) {
    orderedWeek[key] = value;
  }
  return orderedWeek;
}

const renderHours = (week: Week) => {
  const dayElements: JSX.Element[] = [];
  let dayOffset = 0;

  interface DateTimeFormat {
    day?: "numeric" | "2-digit";
    month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
    year?: "numeric" | "2-digit";
    hour?: "numeric" | "2-digit";
    minute?: "numeric" | "2-digit";
    second?: "numeric" | "2-digit";
    timeZoneName?: "long" | "short";
  }

  function joinDateTime(
    dateTime: Date,
    formats: DateTimeFormat[],
    separator: string
  ) {
    function formatDateTime(format: DateTimeFormat) {
      const formatter = new Intl.DateTimeFormat("en", format);
      return formatter.format(dateTime);
    }
    return formats.map(formatDateTime).join(separator);
  }

  for (const [dayName, dayHours] of Object.entries(sortByDay(week))) {
    let currentDate = new Date();
    if (dayOffset > 0) {
      currentDate = new Date(Date.now() + dayOffset * 24 * 60 * 60 * 1000);
    }
    const dateTimeFormats: DateTimeFormat[] = [
      { day: "numeric" },
      { month: "long" },
      { year: "numeric" },
    ];
    const formattedDate = joinDateTime(currentDate, dateTimeFormats, " ");

    dayElements.push(
      <DayRow
        key={dayName}
        dayDate={formattedDate}
        dayName={dayName}
        day={dayHours}
        isToday={isDayToday(dayName)}
        holidayhours={week.holidayHours}
      />
    );
    dayOffset++;
  }

  return <tbody className="font-normal">{dayElements}</tbody>;
};

function isDayToday(dayName: string) {
  return defaultSorter[dayName] === todayIndex;
}

type DayRowProp = {
  dayName: string;
  day: DayType;
  isToday?: boolean;
  dayDate: string;
  holidayhours: HolidayType[] | undefined;
};

/**
 * Create DayRow for Hours feild
 * @param props
 * @returns html elements (current day,dayname, open intervals)
 */
type Holiday = {
  date: string;
  // other properties...
};
type DataAccordingToMe = {
  [key: string]: Holiday[];
};
const DayRow = (props: DayRowProp) => {
  const { dayName, day, isToday, dayDate, holidayhours } = props;
  const [myDataAccordintToMe, setMyDataAccordintToMe] = React.useState({});
  let a: Intl.DateTimeFormatOptions[] | undefined;
  let s: string | undefined;
  let holidayDate: string | undefined;
  function join(t: Date, a: Intl.DateTimeFormatOptions[], s: string) {
    function format(m: Intl.DateTimeFormatOptions) {
      const f = new Intl.DateTimeFormat("en", m);
      return f.format(t);
    }
    return a.map(format).join(s);
  }

  const holidayarray: HolidayType[] = [];
  const holidayopenintervals = [];

  const keysFromData = holidayhours ? holidayhours.map((holiday: HolidayType) => {
        a = [{ day: "numeric" }, { month: "long" }, { year: "numeric" }];
        s = join(new Date(holiday.date), a, " ");
        holidayDate = s;
        holidayarray.push(holiday);
        return holidayDate;
      })
    : null;

  React.useEffect(() => {
    if (keysFromData) {
      const keysFromDataUnique = keysFromData.filter(
        (value: string, index: number, self: string[]) => {
          return self.indexOf(value) === index;
        }
      );
      // const dataAccordintToMe: { id: number, name: string }[] = {};
      const dataAccordintToMe: DataAccordingToMe = {};
      for (let index = 0; index < keysFromDataUnique.length; index++) {
        const element = keysFromDataUnique[index];
        dataAccordintToMe[element] = holidayarray.filter((fe: Holiday) => {
          const dateNew:Intl.DateTimeFormatOptions[] = [{ day: "numeric" }, { year: "numeric" }];
          const matchdate = join(new Date(fe.date), dateNew, " ");
          return matchdate == element;
        });
      }
      setMyDataAccordintToMe(dataAccordintToMe);
    }
  }, []);

  let Status = false;
  for (const key in myDataAccordintToMe) {
    if (key.includes(dayDate)) {
      Status = true;
      holidayopenintervals.push(myDataAccordintToMe[key]);
    }
  }
  return (
    <tr className={isToday ? "currentDay" : ""}>
      {Status ? (
        <td className="capitalize text-left pl-1 pr-4 dayName">
          <span>
            <b className="checked"></b>
            {dayName} <b className="block text-sm font-normal">(Holiday)</b>
          </span>
        </td>
      ) : (
        <td className="capitalize text-left pl-1 pr-4 dayName">
          <span>
            <b className="checked"></b>
            {dayName}
          </span>
        </td>
      )}

      {!day.isClosed && (
        <td className="dayTime pr-1">
          {Status
            ? holidayopenintervals &&
              holidayopenintervals?.map((res: HolidayType[]) => {
                return res?.map((openint: HolidayType, index: number) => {
                  return (
                    <>
                      {openint.isClosed ? (
                        <div key={index} className="pr-1">
                          <span className="time-hours">Closed</span>
                        </div>
                      ) : (
                        openint?.openIntervals &&
                        openint?.openIntervals?.map(
                          (res: IntervalType, indexInner: number) => {
                            return (
                              <div key={indexInner} className="time-hours">
                                <span className="time-open-hours">
                                  {convert24To12(res?.start)}
                                </span>
                                <span className="dash">-</span>
                                <span className="time-close-hours">
                                  {convert24To12(res?.end)}
                                </span>
                              </div>
                            );
                          }
                        )
                      )}
                    </>
                  );
                });
              })
            : day?.openIntervals?.map((res: IntervalType, index: number) => {
                return (
                  <span key={index} className="time-hours">
                    <span className="time-open-hours">
                      {convert24To12(res?.start)}
                    </span>
                    <span className="dash">-</span>
                    <span className="time-close-hours">
                      {convert24To12(res?.end)}
                    </span>
                  </span>
                );
              })}
        </td>
      )}
      {day.isClosed &&
        (Status ? (
          <td className="capitalize text-left pl-1 pr-4">
            <span>
              {holidayopenintervals?.map((res: HolidayType[]) => {
                return res?.map((openint: HolidayType) => {
                  return openint?.openIntervals?.map((res: IntervalType) => {
                    return (
                      <>
                        <span className="time-hours">
                          <span className="time-open-hours">{res?.start}</span>
                          <span className="dash">-</span>
                          <span className="time-close-hours">{res?.end}</span>
                        </span>
                      </>
                    );
                  });
                });
              })}
            </span>
          </td>
        ) : (
          <td className="pr-1">
            <span className="time-hours">Closed</span>
          </td>
        ))}
    </tr>
  );
};

/**
 * Hours component
 * @param props
 * @returns html elements (holiday hours with popup and opening hours)
 */
const Hours = (props: Hours) => {
  const [dateTime, setDateTime] = useState("");
  const { title, hours } = props;
  const titleString = title ? (
    <div className="text-xl font-semibold mb-4">{title}</div>
  ) : (
    ""
  );

  useEffect(() => {
    const reopenDate: Date | undefined = hours.reopenDate
      ? new Date(hours.reopenDate)
      : undefined;
    if (reopenDate) {
      let date: number | string = reopenDate.getDate();
      date = date < 10 ? "0" + date : date;
      const month = reopenDate.toLocaleString("default", { month: "long" });
      const year = reopenDate.getFullYear();
      const intervalId = setInterval(() => {
        setDateTime(`${date}/${month}/${year}`);
      }, 30);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, []);

  return (
    <div>
      {titleString}
      <table>
        <thead className="sr-only">
          <tr>
            <th>Day of the Week</th>
            <th>Hours</th>
          </tr>
        </thead>
        {props?.hours && props?.hours.reopenDate ? (
          <tbody>
            <tr>
              <td>
                {props?.additionalHoursText} <br />
                The Store will reopen at {`${dateTime}`}
              </td>
            </tr>
          </tbody>
        ) : (
          <>{renderHours(hours)}</>
        )}
      </table>
    </div>
  );
};

export default Hours;
