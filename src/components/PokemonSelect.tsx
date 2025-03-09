import Select from "react-select";
import { MultiSelectorProps, PokemonI } from "../types";
import { components } from "react-select";
import { useEffect, useState } from "react";

const PokemonSelect: React.FC<MultiSelectorProps> = ({ field, label, data, error, limit }) => {
  const [hasError, setHasError] = useState(true);

  useEffect(() => {
    setHasError(field.value?.length !== limit);
  }, [error, field, limit]);

  const Menu = (props: any) => {
    const selectedLength = props.getValue().length || 0;
    return (
      <components.Menu {...props}>
        {selectedLength === limit ? (
          <div className="m-3">You can select only {limit} Pokemon</div>
        ) : (
          props.children
        )}
      </components.Menu>
    );
  };

  return (
    <div className="mt-2">
      <p className="font-semibold">{label}</p>
      <Select
        {...field}
        components={{ Menu }}
        getOptionLabel={(option: PokemonI) => option.name}
        getOptionValue={(option: PokemonI) => option.name}
        options={data}
        isMulti
        onKeyDown={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
        styles={{
          control: (styles, state) => ({
            ...styles,
            borderColor: state.isFocused ? "#4B2EBE" : "",
          }),
          dropdownIndicator: (styles, state) => ({
            ...styles,
            transition: "all .2s ease",
            transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
          }),
          multiValue: (styles) => ({
            ...styles,
            background: "gray-300",
            borderRadius: "20px",
          }),
          multiValueRemove: (styles) => ({
            ...styles,
            color: "gray",
          }),
        }}
        className={`w-full border-2 rounded-lg hover:border-violet focus:border-violet outline-none ${
          error && hasError ? "border-red" : ""
        }`}
      />
      <p className={`${error && hasError ? "text-red" : ""}`}>You must select {limit} Pokemons</p>
    </div>
  );
};

export default PokemonSelect;
