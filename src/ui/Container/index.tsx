import { FC, useState } from "react";
import style from "./style.module.scss";
import Select, { SelectOption } from "../Select";

type PropsType = {
  title: string;
  mode: "single" | "multiple";
  options?: SelectOption[];
  disabled?: boolean;
};

const Container: FC<PropsType> = ({ title, mode, options, disabled }) => {
  const [selectedValues, setSelectedValues] = useState<SelectOption[]>([]);

  const handleChange = (newValues: SelectOption[]) => {
    setSelectedValues(newValues);
  };

  const handleCreateOption = (
    newOption: string,
    mode: "single" | "multiple"
  ) => {
    const newOptionObject = {
      label: newOption,
      value: newOption.toLowerCase(),
    };

    options?.push(newOptionObject);
    handleChange(
      mode === "single"
        ? [newOptionObject]
        : [...selectedValues, newOptionObject]
    );
  };

  return (
    <div className={style.wrapper}>
      <h3>{title}</h3>

      <Select
        options={options}
        value={selectedValues}
        onChange={handleChange}
        mode={mode}
        searchable
        onCreateOption={handleCreateOption}
        disabled={disabled}
      />
    </div>
  );
};

export default Container;
