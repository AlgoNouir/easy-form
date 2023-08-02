import "./main.css";

export default function EasyForm(props: { structure: Easy }) {
  return (
    <div className="easy-form">
      {Object.entries(props.structure).map(([name, data]) => (
        <div className="easy-form-section">
          {data.title === undefined ? (
            <></>
          ) : (
            <label htmlFor={`easy-form-${name}`}>{data.title}</label>
          )}
          <input
            className="easy-form-inputs"
            key={`easy-form-${name}`}
            placeholder={data.placeholder}
            id={`easy-form-${name}`}
          />
        </div>
      ))}
    </div>
  );
}

export type Easy = {
  [key: string]: {
    type: "string" | "number";
    title?: string;
    require?: boolean;
    placeholder?: string;
  };
};
