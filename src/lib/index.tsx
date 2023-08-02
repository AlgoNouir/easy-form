import "./main.css";

export default function EasyForm(props: {
  structure: Easy;
  bottonText: string;
}) {
  return (
    <div className="easy-form">
      <div className="easy-form-inputs-section">
        {Object.entries(props.structure).map(([name, data]) => (
          <div className="easy-form-section">
            {data.title === undefined ? (
              <></>
            ) : (
              <label htmlFor={`easy-form-${name}`}>
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
              disabled={data.disabled}
              className="easy-form-inputs"
              key={`easy-form-${name}`}
              placeholder={data.placeholder}
              id={`easy-form-${name}`}
            />
          </div>
        ))}
      </div>
      <div className="easy-form-submit-section">
        <button className="easy-form-submit">{props.bottonText}</button>
      </div>
    </div>
  );
}

export type Easy = {
  [key: string]: {
    type: "string" | "number";
    title?: string;
    require?: boolean | string;
    placeholder?: string;
    disabled?: boolean;
  };
};
