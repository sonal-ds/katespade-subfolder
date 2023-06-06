import * as React from "react";
/**
 * Create HolidayHour for holiday feild
 * @param props
 * @returns html for holiday hours feild
 */
interface Hour {
  date: string;
  isClosed: boolean;
  openIntervals?: {
    start: string;
    end: string;
  }[];
}

interface HolidayHourProps{
  hours: Hour[];
}


const Holidayhour = (props: HolidayHourProps) => {
  const date = new Date();
  const Day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const currentDate = `${year}-${month}-${Day}`;
  const array:  Hour[] = [];
  props.hours.map((i: Hour) => {
    const d1 = new Date(`${currentDate}`);
    const d2 = new Date(`${i.date}`);
    if (d2.getTime() >= d1.getTime()) {
      array.push(i);
    }
  });
  return (
    <>
      {array.map((res: Hour) => {
        const weeks = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        const d = new Date(res.date);
        const day = d.getDay();
        let date: number|string = d.getDate();
        if (date < 10) {
          date = "0" + date;
        }
        let month: number|string = d.getMonth() + 1;
        if (month < 10) {
          month = "0" + month;
        }
        const year = d.getFullYear();

        return (
          <>
            <div className="pop-up-holyhrs">
              <div>{`${date}/${month}/${year}`}</div>
              <div>{weeks[day]}</div>
              {!res.isClosed && (
                <div className="">
                  {res.openIntervals?.map(
                    (openinterval, index: number) => {
                      return (
                        <>
                          <div key={index}>
                            <span className="op-time">
                              {openinterval?.start}
                            </span>
                            <span className="spac-bx"> - </span>
                            <span className="cl-time">{openinterval?.end}</span>
                          </div>
                        </>
                      );
                    }
                  )}
                </div>
              )}
              {res.isClosed && <div>Closed</div>}
            </div>
          </>
        );
      })}
    </>
  );
};
export default Holidayhour;
