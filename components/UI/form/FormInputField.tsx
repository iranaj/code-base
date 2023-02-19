import React from "react";

type Props = {
  label: string;
  name: string;
  type: string;
  placeholder?: string;
  autoComplete?: string;
  additionalClasses?: string;
  formikObject: any;
};

function classNames(...classes: string[]) {
  return classes.join(" ");
}

export default function FormInputField({
  label,
  name,
  type,
  placeholder,
  autoComplete,
  additionalClasses,
  formikObject,
}: Props) {
  return (
    <div
      className={classNames(
        "col-span-6 sm:col-span-3",
        additionalClasses || ""
      )}
    >
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        autoComplete={autoComplete}
        value={formikObject.values[name]}
        onChange={formikObject.handleChange(name)}
        placeholder={placeholder || ""}
        onBlur={() => formikObject.setFieldTouched(name, true)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
      <span className="text-red-500 text-xs italic">
        {formikObject.touched[name] && formikObject.errors[name]}
      </span>
    </div>
  );
}
