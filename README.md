le# minimal-form code less set fast

just insert your fields data in structure

```typescript
import EasyForm from "minimal-form";

export default function App() {
  return (
    <EasyForm
      structure={{
        name: { type: "string" },
        password: { type: "password" },
      }}
      bottonText="ذخیره"
      onSubmit={(d) => console.log(d)}
    />
  );
}
```

below code output this:

```
{
    name: "data in input name",
    password: "data in input password",
}
```
