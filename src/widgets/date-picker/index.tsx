import "./style.scss";

import { Calendar } from "primereact/calendar";
import { useState } from "react";
import { Nullable } from "primereact/ts-helpers";



function DatePicker() {
  const today = new Date();
  const year = today.getFullYear();
  const yesterday = today.getDate() - 1;
  const nextYear =  year + 1;

  const [dates, setDate] = useState<Nullable<Date[]>>(null);

  const handleCalendarChange = (e: any) => {
    setDate(e.value);
  };

  const minDate = new Date();

  minDate.setDate(yesterday);

  const maxDate = new Date();

  maxDate.setFullYear(nextYear);

  return (
    <>
     <div className="relative mt-2 rounded-md shadow-sm">
              <Calendar
                id="date"
                value={dates}
                minDate={minDate}
                maxDate={maxDate}
                onChange={handleCalendarChange}
                numberOfMonths={2}
                selectionMode="range"
                readOnlyInput
                showIcon
                icon="fa-solid fa-calendar-range fa-2x"
                placeholder="Tarih"
              />
            </div>
    </>
  );
}

export default DatePicker;
