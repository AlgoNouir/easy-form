import { useState } from "react";
import EasyForm, { Easy } from "./lib";

const structure: Easy = {
  name: {
    type: "string",
    title: "نام و نام خانوادگی",
    placeholder: "نام خود را وارد کنید",
    require: true,
  },
  age: {
    type: "number",
  },
};

export default function App() {
  const [data, dataHandler] = useState();
  console.log(data);

  return (
    <div dir="rtl" style={{ width: "40%" }}>
      <EasyForm
        structure={structure}
        bottonText="ذخیره"
        handler={dataHandler}
      />
    </div>
  );
}
