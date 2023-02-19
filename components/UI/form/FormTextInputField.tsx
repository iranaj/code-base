import React from "react";

type Props = {
  label: string;
  name: string;
  placeholder?: string;
  note: string;
  additionalClasses?: string;
  formikObject: any;
};

function classNames(...classes: string[]) {
  return classes.join(" ");
}

export default function FormTextInputField({
  label,
  name,
  placeholder,
  additionalClasses,
  note,
  formikObject,
}: Props) {
  return (
    <div
      className={classNames(
        "bg-white px-4 py-5 sm:p-6",
        additionalClasses || ""
      )}
    >
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-6">
          <label
            htmlFor="note"
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
          <div className="mt-1">
            <textarea
              name={name}
              id={name}
              rows={3}
              value={formikObject.values[name]}
              onChange={formikObject.handleChange(name)}
              onBlur={() => formikObject.setFieldTouched(name, true)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder={placeholder}
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">{note}</p>
        </div>
        <span className="text-red-500 text-xs italic">
          {formikObject.touched[name] && formikObject.errors[name]}
        </span>
      </div>
    </div>
  );
}
