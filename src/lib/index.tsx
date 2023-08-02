import { Dispatch, SetStateAction, useCallback, useState } from "react";
import "./main.css";
import EasyInput from "./components/input";

export default function EasyForm(props: {
  structure: Easy;
  bottonText: string;
  onSubmit: (data: any) => void;
}) {
  const [values, valuesHandler] = useState<any>();
  const [check, checkHandler] = useState(false);
  const submit = useCallback(props.onSubmit, [props.structure]);
  return (
    <div className="easy-form">
      <div className="easy-form-inputs-section">
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
          />
        ))}
      </div>
      <div className="easy-form-submit-section">
        <button
          onClick={() => {
            checkHandler(true);
            submit(values);
          }}
          className="easy-form-submit"
        >
          {props.bottonText}
        </button>
      </div>
    </div>
  );
}

export type EasyData = {
  type: "string" | "number" | "email" | RegExp;
  title?: string;
  require?: boolean | string;
  placeholder?: string;
  disabled?: boolean;
  default?: "string" | "number";
};

export type Easy = {
  [key: string]: EasyData;
};
