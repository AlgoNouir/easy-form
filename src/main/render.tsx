import { useState } from "react";
import { Controller } from "react-hook-form";
import { useEasyFormContext } from "../context/index";
import type { InputTypes, structure } from "../interfaces";

interface RenderFieldProps {
  name: string;
  field: InputTypes;
  control: any;
}

export function RenderField({ name, field, control }: RenderFieldProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { components } = useEasyFormContext();

  return (
    <div className="space-y-2 rounded-lg max-w-full min-w-0 flex flex-col">
      {field.label && (
        <div className="flex items-center justify-between w-full">
          <p className="text-sm font-semibold text-gray-700">{field.label}</p>
          {field.required && (
            <span className="text-xs text-red-500 font-medium">Required</span>
          )}
        </div>
      )}

      <div className="flex">
        <Controller
          name={name}
          control={control}
          defaultValue={field.defaultValue ?? ""}
          rules={{
            required: field.required ? "This field is required" : false,
          }}
          render={({ field: controllerField, fieldState: { error } }) => {
            const baseInputClasses =
              "w-full focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 max-w-full min-w-0";

            const Component = components?.[field.type];

            if (Component) {
              return (
                <Component
                  {...controllerField}
                  field={field}
                  fieldState={error}
                  controller={controllerField}
                  previewUrl={previewUrl}
                  setPreviewUrl={setPreviewUrl}
                  className={baseInputClasses}
                />
              );
            }

            // fallback when no component is provided
            return (
              <div className="p-2 bg-gray-50 rounded border border-gray-200 text-gray-500 text-sm">
                Field type not supported or missing component:{" "}
                <strong>{field.type}</strong>
              </div>
            );
          }}
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
        style={
          areaMap && {
            gridTemplateAreas: areaMap
              .map((area) => '"' + area.join(" ") + '"')
              .join(" "),
          }
        }
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
