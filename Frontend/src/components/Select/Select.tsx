import React, { useId } from "react";
import style from "./Select.module.css";

const Select = (
  {
    border,
    padding,
    margin,
    height,
    options,
    label,
    className = "",
    ...props
  }: any,
  ref
) => {
  const id = useId();
  return (
    <div className={style.container}>
      {label && (
        <label htmlFor={id} className="">
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={style.select}
        style={{padding: `${padding}`,height: `${height}`, margin: `${margin}`, border: `${border}`}}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.forwardRef(Select);
