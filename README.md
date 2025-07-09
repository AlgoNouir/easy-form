# 🧩 EasyForm

**EasyForm** is a fully customizable, type-safe, and headless dynamic form builder for React using `react-hook-form`. It supports nested fields, repeatable sections, validation, and custom UI components.

Built with full support for headless usage and easy integration with any UI library such as ShadCN, Material UI, Tailwind, or your own components.

---

## 🚀 Features

- ✅ Dynamic form rendering from schema (`structure`)
- ✅ Full type-safety with TypeScript
- ✅ Repeatable groups and nested inputs
- ✅ Uses `react-hook-form` under the hood
- ✅ Headless & customizable via `<EasyFormProvider />`
- ✅ Supports image/file uploads, select, multi-select, etc.

---

## 📦 Installation

```bash
npm install minimal-form
# or
yarn add minimal-form
```

You must also install `react`, `react-hook-form`, and your own UI components (e.g., shadcn/ui).

---

## ⚡ Quick Start

```tsx
import { EasyFormProvider } from "minimal-form";
import { GovernanceForm } from "minimal-form"; // or your custom form renderer
import { structure } from "./form.structure";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

export default function MyForm() {
  const { control, handleSubmit } = useForm();

  return (
    <EasyFormProvider
      components={{
        string: ({ controller, field }) => (
          <Input {...controller} placeholder={field.placeholder} />
        ),
        // Add more input types...
      }}
    >
      <form onSubmit={handleSubmit(console.log)}>
        <GovernanceForm control={control} structure={structure} />
      </form>
    </EasyFormProvider>
  );
}
```

---

## 🎯 Field Types Supported

EasyForm supports the following types:

| Type                    | Description                           |
| ----------------------- | ------------------------------------- |
| `string`                | Text input                            |
| `number`                | Number input                          |
| `email`                 | Email input                           |
| `password`              | Password input                        |
| `select`                | Single select                         |
| `multiSelect`           | Multiple select (with chips)          |
| `text`                  | Textarea                              |
| `image`                 | Image uploader                        |
| `date`, `time`, `color` | HTML5 inputs                          |
| `list`                  | Group of nested repeatable fields     |
| `metaData`              | Section header/description (optional) |

---

## 🧠 Using with EasyFormProvider

You can inject your own UI components using the provider:

```tsx
<EasyFormProvider
  components={{
    string: MyTextInput,
    select: MySelect,
    image: MyImageUpload,
    multiSelect: MyTagSelector,
    // etc.
  }}
>
  <GovernanceForm structure={...} control={...} />
</EasyFormProvider>
```

Each component receives the following props:

```ts
interface EasyFormFieldProps {
  field: inputData;
  fieldState: any;
  controller: any;
  previewUrl?: string;
  setPreviewUrl?: (url: string) => void;
  className?: string;
}
```

---

## 🧱 Form Structure Example

```ts
const structure = {
  firstName: {
    type: "string",
    label: "First Name",
    required: true,
    placeholder: "John",
  },
  profileType: {
    type: "select",
    label: "Type",
    options: [
      { value: "admin", label: "Admin" },
      { value: "user", label: "User" },
    ],
  },
  contactInfo: {
    type: "list",
    label: "Contact Info",
    inputs: {
      email: {
        type: "email",
        label: "Email",
        required: true,
      },
      phone: {
        type: "string",
        label: "Phone",
      },
    },
  },
};
```

---

## 🔌 Extendable Design

- You can build custom renderers using the `RenderField` component directly.
- Supports localization, themes, dynamic visibility (planned in future versions).

---

## 🛠 Roadmap

- [ ] Field-level visibility conditions
- [ ] Custom validation rules
- [ ] i18n support
- [ ] JSON schema -> EasyForm conversion

---

## 👨‍💻 Contribution

We welcome pull requests and feedback!

---

## 📄 License

MIT License
