import { useCallback, useState } from "react";
import "./main.css";
import EasyInput from "./components/input";

export default function EasyForm(props: {
  structure: Easy;
  bottonText: string;
  onSubmit: (data: any) => void;
  inputscontainerClassname?: string;
  inputDefaultClassname?: string;
  titleDefaultClassname?: string;
  submitClassname?: string;
}) {
  const [values, valuesHandler] = useState<any>();
  const [check, checkHandler] = useState(false);
  const submit = useCallback(props.onSubmit, [props.structure]);
  return (
    <div className="easy-form">
      <div
        className={props.inputscontainerClassname || "easy-form-inputs-section"}
      >
        {Object.entries(props.structure).map(([name, data]) => (
          <EasyInput
            handler={(txt) =>
              valuesHandler((d: any) => ({ ...d, [name]: txt }))
            }
            error={
              check &&
              data.require === true &&
              (values[name] === undefined || values[name] === "")
            }
            name={name}
            data={data}
            defaultInputClassname={props.titleDefaultClassname}
            defaultTitleClassname={props.submitClassname}
          />
        ))}
      </div>
      <div className="easy-form-submit-section">
        <button
          onClick={() => {
            checkHandler(true);
            submit(values);
          }}
          className={props.submitClassname || "easy-form-submit"}
        >
          {props.bottonText}
        </button>
      </div>
    </div>
  );
}

export type EasyData = {
  type:
    | "string"
    | "number"
    | "email"
    | "password"
    | "color"
    | "date"
    | "time"
    | "datetime"
    | RegExp;
  title?: string;
  require?: boolean | string;
  placeholder?: string;
  disabled?: boolean;
  default?: "string" | "number";
  inputClassname?: string;
  titleClassname?: string;
};

export type Easy = {
  [key: string]: EasyData;
};
