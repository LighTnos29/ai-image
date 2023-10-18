import React from "react";

const FormField = ({
  labelName,
  name,
  type,
  placeholder,
  value,
  handleChange,
  isSupriseMe,
  handleSupriseMe,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-black "
        >
          {labelName}
        </label>
        {isSupriseMe && (
          <button
            type="button"
            onClick={handleSupriseMe}
            className="font-semibold text-xs bg-white py-1 px-2 rounded-[5px] text-black "
          >
            Surprise Me
          </button>
        )}
      </div>
      <textarea
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className="border border-white text-black text-base  focus:ring-[#4649ff] focus:border-grey outline-none w-full h-80 block  p-3 bg-white "
      />
    </div>
  );
};

export default FormField;
