import React, { useState, useCallback, ReactNode } from "react";
import classNames from "classnames";
import activeIcon from "../../assets/images/checked.svg";

export type SelectOption = {
  label: string;
  subLabel?: string;
  icon?: string;
  value: string;
  disabled?: boolean;
};

type SelectProps = {
  options?: SelectOption[];
  value: SelectOption[];
  onChange?: (value: SelectOption[]) => void;
  mode?: "single" | "multiple";
  renderLabel?: (
    option: SelectOption,
    onRemove: (option: SelectOption) => void
  ) => ReactNode;
  searchable?: boolean;
  onCreateOption?: (newOption: string, mode: "single" | "multiple") => void;
  renderDropdown?: (
    options: SelectOption[],
    onSelect: (option: SelectOption) => void
  ) => ReactNode;
  placeholder?: string;
  disabled?: boolean;
};

const Select: React.FC<SelectProps> = ({
  options = [],
  value = [],
  onChange,
  mode = "single",
  renderLabel,
  searchable = false,
  onCreateOption,
  renderDropdown,
  placeholder = "Placeholder",
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = useCallback(
    (option: SelectOption) => {
      let newValue: SelectOption[];

      if (mode === "multiple") {
        if (value.some((val) => val?.value === option?.value)) {
          newValue = value?.filter((val) => val?.value !== option?.value);
        } else {
          newValue = [...value, option];
        }
      } else {
        newValue = [option];
        setIsOpen(false);
      }

      if (onChange) {
        onChange(newValue);
      }

      setSearchQuery("");
    },
    [mode, onChange, value]
  );

  const handleCreateOption = useCallback(() => {
    if (onCreateOption) {
      onCreateOption(inputValue, mode);
    }

    setInputValue("");
    setSearchQuery("");
  }, [inputValue, mode, onCreateOption]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setIsOpen(true);
    setSearchQuery(value);
    setInputValue(value);
  };

  const filteredOptions = options?.filter((option) =>
    option?.label?.toLowerCase()?.includes(searchQuery.toLowerCase())
  );

  const renderDefaultLabel = useCallback(
    (option: SelectOption) => (
      <span
        className={classNames("default-label", {
          "default-label-single": mode === "single",
        })}
      >
        {option?.icon && <img src={option.icon} />}

        {option.label}

        <button onClick={() => handleOptionSelect(option)}>&times;</button>
      </span>
    ),
    [handleOptionSelect, mode]
  );

  const renderDefaultDropdown = useCallback(
    () => (
      <ul className={"default-dropdown"}>
        {filteredOptions.map((option) => (
          <li
            key={option.value}
            onClick={() => handleOptionSelect(option)}
            className={classNames({
              "default-dropdown-disabled": option.disabled,
            })}
          >
            {option?.icon && (
              <img className="default-dropdown__icon" src={option.icon} />
            )}

            <div className="default-dropdown__labels">
              <span className="default-dropdown__labels-main">
                {option.label}
              </span>

              <span className="default-dropdown__labels-sub">
                {option.subLabel}
              </span>
            </div>

            {value?.some((val) => val.value === option.value) && (
              <span className="default-dropdown-selected">
                <img src={activeIcon} />
              </span>
            )}
          </li>
        ))}

        {searchable &&
          inputValue &&
          !options.some((option) => option.label === inputValue) && (
            <li onClick={handleCreateOption}>+ Создать "{inputValue}"</li>
          )}
      </ul>
    ),
    [
      filteredOptions,
      searchable,
      inputValue,
      options,
      handleCreateOption,
      value,
      handleOptionSelect,
    ]
  );

  return (
    <div
      className={classNames("select-container", {
        "select-container-disabled": disabled,
      })}
    >
      <div
        className={classNames("select-input", {
          "select-input-active": isOpen,
        })}
        onClick={handleToggleDropdown}
      >
        {value.map((val) =>
          renderLabel
            ? renderLabel(val, handleOptionSelect)
            : renderDefaultLabel(val)
        )}

        {searchable && (
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            {...(!value?.length && { placeholder: placeholder })}
          />
        )}
      </div>

      {isOpen && (
        <div className="select-dropdown">
          {renderDropdown
            ? renderDropdown(filteredOptions, handleOptionSelect)
            : renderDefaultDropdown()}
        </div>
      )}
    </div>
  );
};

export default Select;
