import {Controller, SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";
import CustomInput from "./UI/CustomInput";
import {IPokemonForm, PokemonI} from "../types";
import MultiSelector from "./MultiSelector";
import {useEffect, useState} from "react";
import axios from "axios";
import Modal from "./UI/Modal";
import PokemonSprite from "./PokemonSprite";

const PokemonForm = () => {
    const {
        register,
        control,
        handleSubmit,
        getValues,
        formState: {errors},
    } = useForm<IPokemonForm>();

    const [fetchedPokemons, setFetchedPokemons] = useState([])
    const [pokemonSelectorError, setPokemonSelectorError] = useState(false);
    const [modalActive, setModalActive] = useState(false)
    const [selectedPokemons, setSelectedPokemons] = useState<PokemonI[]>([]);
    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokemon?limit=1302").then((response) => {
            setFetchedPokemons(response.data.results);
        });
    }, [])

    const onSubmit: SubmitHandler<IPokemonForm> = (data) => {
        const pokemons = getValues().pokemons;
        if (pokemons.length === 4) {
            setSelectedPokemons(pokemons);
            setModalActive(true)
        }
    };

    const error: SubmitErrorHandler<IPokemonForm> = (data) => {
        setPokemonSelectorError(true);
    }
    console.log(selectedPokemons)
    return (
        <form onSubmit={handleSubmit(onSubmit, error)} className="text-xl w-[550px]">
            <CustomInput
                label="First name"
                name="firstName"
                register={register}
                required
                pattern={/^[a-zA-Z]{2,12}$/}
                error={errors.firstName}
            />
            <CustomInput
                label="Last name"
                name="lastName"
                register={register}
                required
                pattern={/^[a-zA-Z]{2,12}$/}
                error={errors.lastName}
            />
            {
                fetchedPokemons
                    ?
                    <Controller
                        name="pokemons"
                        rules={{required: true}}
                        render={({field}) =>
                            <MultiSelector
                                field={field}
                                label="Select your team"
                                data={fetchedPokemons}
                                error={pokemonSelectorError}
                                limit={4}
                            />
                        }
                        control={control}

                    />
                    : ''
            }
            <button type="submit" className="bg-violet text-white p-3 rounded-md mt-2">Submit</button>
            <Modal active={modalActive} setActive={setModalActive}>
                <h2 className="text-center text-2xl font-bold">Your Team</h2>
                <div className="flex gap-10 my-5">
                    {selectedPokemons.map((item) =>
                        <PokemonSprite name={item.name} url={item.url} key={item.url}/>
                    )}
                </div>
            </Modal>
        </form>
    );
};

export default PokemonForm;