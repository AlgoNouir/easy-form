import { useState } from "react";
import { EasyData } from "..";

export default function EasyInput({
  data,
  name,
  defaultValue,
  error,
  handler,
  defaultInputClassname,
  defaultTitleClassname,
}: {
  data: EasyData;
  name: string;
  defaultValue?: string;
  error: boolean;
  handler: (txt?: string) => void;
  defaultInputClassname?: string;
  defaultTitleClassname?: string;
}) {
  const [txt, txtHandler] = useState(defaultValue);

  var regExp: RegExp = /^/g;
  var inputName = name;
  switch (data.type) {
    case "time":
    case "color":
    case "password":
    case "date":
      break;
    case "string":
      inputName = "text";
      break;
    case "datetime":
      inputName = "datetime-local";
      break;
    case "number":
      regExp = /^\d+$/g;
      break;
    case "email":
      regExp = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi;
      break;
    default:
      regExp = data.type;
      break;
  }

  return (
    <div key={`easy-form-${name}`} className="easy-form-section">
      {data.title === undefined ? (
        <></>
      ) : (
        <label
          style={{
            color: error ? "#900" : "",
          }}
          className={data.titleClassname || defaultTitleClassname}
          htmlFor={`easy-form-${name}`}
        >
          {data.title}
          {data.require ? (
            <small className="easy-form-require">
              {typeof data.require === "string" ? data.require : "*"}
            </small>
          ) : (
            <></>
          )}
        </label>
      )}
      <input
        onBlur={() => {
          handler(txt);
        }}
        type={inputName}
        onChange={(e) => {
          if (regExp.test(e.target.value)) txtHandler(e.target.value);
          else if (e.target.value === "") txtHandler(undefined);
        }}
        value={txt}
        defaultValue={data.default}
        style={{
          border: error ? "1px solid #900" : undefined,
        }}
        disabled={data.disabled}
        className={
          data.inputClassname || defaultInputClassname || "easy-form-inputs"
        }
        placeholder={data.placeholder}
        id={`easy-form-${name}`}
      />
    </div>
  );
}
