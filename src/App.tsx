import EasyForm, { Easy } from "./lib";

const structure: Easy = {
  name: {
    type: "string",
    title: "نام و نام خانوادگی",
    placeholder: "نام خود را وارد کنید",
    require: true,
  },
  email: {
    type: "email",
    require: true,
  },
};

export default function App() {
  return (
    <div dir="rtl" style={{ width: "40%" }}>
      <EasyForm
        structure={structure}
        bottonText="ذخیره"
        onSubmit={(d) => console.log(d)}
      />
    </div>
  );
}
