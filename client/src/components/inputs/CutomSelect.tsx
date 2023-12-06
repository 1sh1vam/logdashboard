import { useEffect, useRef, useState } from "react";
import ArroDownIcon from "@/assets/icons/chevron-down.svg?react";
import { twMerge } from "tailwind-merge";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  containerClass?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  defaultOption?: string;
}

const CustomSelect = ({
  options,
  onChange,
  containerClass,
  defaultOption,
  placeholder = "Select",
}: CustomSelectProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(defaultOption || null);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false);
    onChange(value);
  };

  const containeClasses = twMerge(
    'relative text-sm inline-block text-left w-full',
    containerClass
  )

  return (
    <div ref={selectRef} className={containeClasses}>
      <button
        type="button"
        className="inline-flex justify-between items-center w-full rounded-lg border border-outline py-3 px-4 font-medium"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? (
          <span className="text-content-1">
            {options.find((option) => option.value === selectedOption)?.label}
          </span>
        ) : (
          <span className="text-content-3">{placeholder}</span>
        )}
        <ArroDownIcon />
      </button>
      {isOpen && (
        <div className="w-full origin-top-right absolute right-0 mt-2 rounded-md bg-neutral-dark">
          <div className="py-1">
            {options.map((option) => (
              <div
                key={option.value}
                className="block px-4 py-2 text-sm text-content-1 hover:bg-primary-orange cursor-pointer"
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
