import React, { useId } from "react";
import style from "./Input.module.css";

const Input = (
  {
    margin,
    border,
    padding,
    width,
    label,
    labelcheckbox,
    type = "text",
    placeholder = "text",
    className = "",
    defaultValue,
    onChange,
    ...props
  }: any,
  ref
) => {
  const id = useId();
  return (
    <div className={style.inputDiv} style={{ width: `${width}` }}>
      {label && <label htmlFor={id}>{label}</label>}
      <div
        className={style.inputBox}
        style={{
          padding: `${padding}`,
          margin: `${margin}`,
          border: `${border}`,
        }}
      >
        <input
          className={className}
          type={type}
          placeholder={placeholder}
          ref={ref}
          {...props}
          id={id}
          defaultValue={defaultValue}
          onChange={onChange}
        />
        {labelcheckbox && <label htmlFor={id}>{labelcheckbox}</label>}
        {props.showImage && (
          <div className={style.imageDiv}>{props.showImage}</div>
        )}
      </div>
    </div>
  );
};

export default React.forwardRef(Input);
