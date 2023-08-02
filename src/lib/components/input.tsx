import { useState } from "react";
import { EasyData } from "..";

export default function EasyInput({
  data,
  name,
  defaultValue,
  error,
  handler,
}: {
  data: EasyData;
  name: string;
  defaultValue?: string;
  error: boolean;
  handler: (txt?: string) => void;
}) {
  const [txt, txtHandler] = useState(defaultValue);

  var regExp: RegExp = /^/g;
  switch (data.type) {
    case "number":
      regExp = /^\d+$/g;
      break;
    case "string":
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
        className="easy-form-inputs"
        placeholder={data.placeholder}
        id={`easy-form-${name}`}
      />
    </div>
  );
}
