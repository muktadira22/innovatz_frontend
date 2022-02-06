import React from "react";

type Props = {
  label?: string;
  data: { name: string; value: string }[];
  onChange: (value: string) => void;
};

const Select = ({ label, data, onChange }: Props) => {
  const _handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    onChange(e.target.value);
  };
  return (
    <div className="w-full">
      {label ? (
        <label
          htmlFor="country"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          {label}
        </label>
      ) : (
        ""
      )}
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <select
          id="country"
          name="country"
          autoComplete="country-name"
          className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
          onChange={_handleChange}
        >
          <option value={""}>All</option>
          {data.map((item, key) => (
            <option key={key} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
