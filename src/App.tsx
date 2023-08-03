import EasyForm, { Easy } from "./lib";

const structure: Easy = {
  name: {
    type: "string",
    title: "نام و نام خانوادگی",
    placeholder: "نام خود را وارد کنید",
    require: true,
  },
  password: {
    type: "password",
    placeholder: "رمز عبور خود را وارد کنید",
    require: true,
  },
  color: {
    type: "time",
    placeholder: "رنگ مورد علاقه خود را وارد کنید ",
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
