import { Controller, type Control } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { useQuery } from "@tanstack/react-query";
import { InputHeadline } from "./InputHeadline";
import InputError from "./InputError";
import { fetchingTags } from "../api/content.api";

export interface AllTags {
  title: string;
}

interface TagInputProps {
  control: Control<any>; // React Hook Form control
  name: string;          // Field name (e.g., "tags")
  error?: string;        // Error message
}



export const TagInput = ({ control, name, error }: TagInputProps) => {
  // 1. Fetch existing tags for recommendations
  const { data: tags = [], isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchingTags,
    staleTime: 1000 * 60 * 5, // Cache for 5 mins
  });

  // converting the array of tags into this format {label: tag , value: tag} for react-select options 
  const options = tags.map((tag: { title: string}) => ({
    label: tag.title,
    value: tag.title  
  }))

  console.log(options)
  
  return (
    <div className="w-full">
      <InputHeadline text="Tags (Max 3)" />
      
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, onBlur, ref } }) => {
            
          // Transform current string[] value to object[] for react-select
          // e.g. ["react"] -> [{label: "react", value: "react"}]
          const currentValues = (value || []).map((val: string) => ({
             label: val, value: val 
          }));

          return (
            <CreatableSelect
              ref={ref}
              isMulti
              isLoading={isLoading}
              options={options}
              value={currentValues}
              placeholder="Search or create tags..."
              
              // Custom styles to match your UI
              styles={{
                control: (base, state) => ({
                  ...base,
                  borderColor: error ? "#ef4444" : "#e5e7eb",
                  boxShadow: state.isFocused ? "0 0 0 1px #a855f7" : "none",
                  "&:hover": { borderColor: "#a855f7" }
                }),
                multiValue: (base) => ({
                  ...base,
                  backgroundColor: "#f3e8ff", // Light purple
                  borderRadius: "4px",
                }),
                multiValueLabel: (base) => ({
                    ...base,
                    color: "#6b21a8"
                })
              }}

              // Handle Changes
              onChange={(selectedOptions) => {
                // selectedOptions is an array of objects.
                // We map it back to an array of strings for the form.
                const tags = selectedOptions.map((opt) => opt.value);
                onChange(tags);
              }}

              formatCreateLabel={(inputValue) => `Add the tag "${inputValue}"` }
              
              onBlur={onBlur}
              
              // LIMIT LOGIC: Disable typing/selecting if 3 are selected
              isValidNewOption={() => currentValues.length < 3}
              isOptionDisabled={() => currentValues.length >= 3}
              noOptionsMessage={() => currentValues.length >= 3 ? "Max 3 tags reached" : "No tags found"}
            />
          );
        }}
      />
      {error && <InputError message={error} />}
    </div>
  );
};