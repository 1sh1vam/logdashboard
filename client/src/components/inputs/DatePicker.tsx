import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClass?: string;
  label?: string;
}

const DatePicker = ({ containerClass, label, className, ...props }: DatePickerProps) => {
    const [date, setDate] = useState(new Date());

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.value) return;
      setDate(new Date(e.target.value));
    };

  const inputClasses = twMerge(
    "w-full px-4 py-3 text-sm bg-transparent outline-none border border-outline rounded-lg text-content-1 placeholder:text-content-3 disabled:text-content-disabled disabled:bg-neutral-light",
    className
  );

  return (
    <div className={containerClass}>
      {label ? <label className="block text-sm font-medium text-white mb-2">{label}</label> : null}
      <input
        value={date.toISOString().split("T")[0]}
        onChange={handleDateChange}
        {...props}
        type="date"
        className={inputClasses}
      />
    </div>
  );
};

export default DatePicker;
