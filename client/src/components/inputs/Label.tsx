import React from "react";
import { twMerge } from "tailwind-merge";

interface LabelProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  containerClass?: string;
  labelClass?: string;
}

const Label = ({ containerClass, labelClass, text, children }: LabelProps) => {
  const labelClasses = twMerge(
    'block text-sm font-medium text-white mb-2',
    labelClass
  );

  return (
    <div className={containerClass}>
      <label className={labelClasses}>
        {text}
      </label>
      {children}
    </div>
  );
};

export default Label;
