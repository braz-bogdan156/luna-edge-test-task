import type { Meta, StoryObj } from '@storybook/react';

import MultiSelector from "../components/MultiSelector";

const meta = {
    title: 'Component/MultiSelector',
    tags: ['autodocs'],
    component: MultiSelector

} satisfies Meta<typeof MultiSelector>;

export default meta
type Story = StoryObj<typeof meta>;

const dataExample = [
    {
        "name": "bulbasaur",
        "url": "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
        "name": "venusaur",
        "url": "https://pokeapi.co/api/v2/pokemon/3/"
    },
    {
        "name": "ivysaur",
        "url": "https://pokeapi.co/api/v2/pokemon/2/"
    },
    {
        "name": "charizard",
        "url": "https://pokeapi.co/api/v2/pokemon/6/"
    },
    {
        "name": "mddaerqw",
        "url": "https://pokeapi.co/api/v2/pokemon/6/"
    },
    {
        "name": "dfdfdd",
        "url": "https://pokeapi.co/api/v2/pokemon/6/"
    }
]
export const Default: Story = {
    args: {
        field: [],
        label: "MultiSelector",
        data: dataExample,
        error: false,
        limit: 4
    },
};

export const Error: Story = {
    args: {
        field: [],
        label: "Error",
        data: dataExample,
        error: true,
        limit: 100
    },
};

export const NoData: Story = {
    args: {
        field: [],
        label: "NoData",
        data: [],
        error: false,
        limit: 0
    },
};

