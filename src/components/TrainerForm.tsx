import { Controller, useForm } from "react-hook-form";
import TextInput from "./UI/TextInput";
import { IPokemonForm, PokemonI } from "../types";
import PokemonSelect from "./PokemonSelect";
import { useEffect, useState } from "react";
import axios from "axios";
import ModalWindow from "./UI/ModalWindow";
import PokemonImage from "./PokemonImage";

const TrainerForm: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IPokemonForm>();

  const [pokemons, setPokemons] = useState<PokemonI[]>([]);
  const [selectorError, setSelectorError] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [selectedPokemons, setSelectedPokemons] = useState<PokemonI[]>([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=1302");
        setPokemons(response.data.results);
      } catch (error) {
        console.error("Error fetching pokemons:", error);
      }
    };

    fetchPokemons();
  }, []);

  const onSubmit = (data: IPokemonForm) => {
    const selected = getValues().pokemons;
    if (selected.length === 4) {
      setSelectedPokemons(selected);
      setIsModalActive(true);
    }
  };

  const onError = () => {
    setSelectorError(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="text-xl w-[550px]">
      <TextInput
        label="First name"
        name="firstName"
        register={register}
        required
        pattern={/^[a-zA-Z]{2,12}$/}
        error={errors.firstName}
      />
      <TextInput
        label="Last name"
        name="lastName"
        register={register}
        required
        pattern={/^[a-zA-Z]{2,12}$/}
        error={errors.lastName}
      />
      {pokemons.length > 0 && (
        <Controller
          name="pokemons"
          rules={{ required: true }}
          render={({ field }) => (
            <PokemonSelect
              field={field}
              label="Select your team"
              data={pokemons}
              error={selectorError}
              limit={4}
            />
          )}
          control={control}
        />
      )}
     <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-2 transition duration-300"
      >
        Submit
      </button>
      <ModalWindow active={isModalActive} setActive={setIsModalActive}>
        <h2 className="text-center text-2xl font-bold">Your Team</h2>
        <div className="flex gap-10 my-5">
          {selectedPokemons.map((pokemon) => (
            <PokemonImage name={pokemon.name} url={pokemon.url} key={pokemon.url} />
          ))}
        </div>
      </ModalWindow>
    </form>
  );
};

export default TrainerForm;