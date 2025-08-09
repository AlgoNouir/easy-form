import { useMemo, useState } from "react";
import { Controller } from "react-hook-form";
import { useEasyFormContext } from "../context/index";
import type {
  FixedInput,
  InputTypes,
  SelectInput,
  structure,
} from "../interfaces";

interface RenderFieldProps {
  name: string;
  field: InputTypes;
  control: any;
}

function FallBack(props: { text: string; key: string }) {
  // fallback when no component is provided
  return (
    <div className="p-2 bg-gray-50 rounded border border-gray-200 text-gray-500 text-sm">
      {props.text} <strong>{props.key}</strong>
    </div>
  );
}

export function RenderField({ name, field, control }: RenderFieldProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { components, relations } = useEasyFormContext();

  // change field to _field name for relations and many2many fields
  // if type of field is relation or many2many fields, convert to select and fetch thir choice
  let _field = field;

  if (_field.type === "fixed") {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: controllerField }) => (
          <input
            {...controllerField}
            type="hidden"
            value={(_field as FixedInput).value}
          />
        )}
      />
    );
  }

  // ----------------------------------------------------------------- RELATION

  if (field.type === "relation") {
    // get relations chocies from context main data. error if not exists
    if (!relations)
      return (
        <FallBack
          text="relation not have any function on provider. relation:"
          key={field.relationName}
        />
      );

    // create options from functions
    const relationData = relations[field.relationName]();
    const options = relationData.map((d) => ({
      label: d[field.key],
      value: d[field.value],
    }));

    // convert relation field to select
    _field = {
      ...field,
      type: "select",
      options: options,
    } as SelectInput;
  }
  // ----------------------------------------------------------------- MANY 2 MANY

  if (field.type === "many2many") {
    // get relations chocies from context main data. error if not exists
    if (!relations)
      return (
        <FallBack
          text="relation not have any function on provider. relation:"
          key={field.relationName}
        />
      );

    // create options from functions
    const relationData = relations[field.relationName]();
    const options = relationData.map((d) => ({
      label: d[field.key],
      value: d[field.value],
    }));

    // convert many2many field to multiSelect
    _field = {
      ...field,
      type: "multiSelect",
      options: options,
    };
  }

  // ----------------------------------------------------------------- FALLBACK

  // get component from context
  const Component = components?.[_field.type];
  if (!Component) {
    return (
      <FallBack
        text="Field type not supported or missing component:"
        key={_field.type}
      />
    );
  }

  // ----------------------------------------------------------------- RENDER

  return (
    <div className="space-y-2 rounded-lg max-w-full min-w-0 flex flex-col">
      {_field.label && (
        <div className="flex items-center justify-between w-full">
          <p className="text-sm font-semibold text-gray-700">{_field.label}</p>
          {_field.required && (
            <span className="text-xs text-red-500 font-medium">Required</span>
          )}
        </div>
      )}
      <div className="flex">
        <Controller
          name={name}
          control={control}
          rules={{
            required: _field.required ? "This field is required" : false,
          }}
          render={({ field: controllerField, fieldState: { error } }) => (
            <Component
              {...controllerField}
              {..._field}
              fieldState={error}
              previewUrl={previewUrl}
              setPreviewUrl={setPreviewUrl}
              className="w-full focus:ring-2 focus:ring-blue-500/20 
                  transition-all duration-200 max-w-full min-w-0"
            />
          )}
        />
      </div>
    </div>
  );
}

export default function EasyForm({
  structure,
  control,
  areaMap,
  title,
  description,
}: {
  structure: structure;
  control: any;
  areaMap?: string[][];
  title?: string;
  description?: string;
}) {
  const fields_in_area = useMemo(
    () =>
      Array(areaMap || []).reduce(
        (result, list) => [...result, ...list.flatMap((l) => l)],
        [] as string[]
      ),
    [areaMap]
  );
  const fields_not_in_area = useMemo(
    () =>
      Object.keys(structure).filter((field) => fields_in_area.includes(field)),
    [fields_in_area, structure]
  );

  const fields_area = [
    ...(areaMap || []),
    ...fields_not_in_area.map((f) => Array(areaMap?.length || 1).fill(f)),
  ];

  return (
    <div className="w-full mx-auto bg-white rounded-xl">
      {(title || description) && (
        <div className="mb-6 pb-6">
          {title && (
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {title}
            </h2>
          )}
          {description && <p className="text-gray-600">{description}</p>}
        </div>
      )}
      <div
        style={{
          gridTemplateAreas: fields_area
            .map((area) => '"' + area.join(" ") + '"')
            .join(" "),
        }}
        className="grid gap-6 w-full max-w-full min-w-0"
      >
        {Object.entries(structure).map(([key, field]) => (
          <div key={key} style={areaMap ? { gridArea: key } : undefined}>
            <RenderField name={key} field={field} control={control} />
          </div>
        ))}
      </div>
    </div>
  );
}
