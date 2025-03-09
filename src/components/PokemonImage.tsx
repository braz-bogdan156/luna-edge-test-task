import { useEffect, useState } from "react";
import axios from "axios";
import { PokemonSpriteProps } from "../types";

const PokemonImage: React.FC<PokemonSpriteProps> = ({ name, url }) => {
  const [sprite, setSprite] = useState<string | null>(null);

  useEffect(() => {
    const fetchSprite = async () => {
      try {
        const response = await axios.get(url);
        setSprite(response.data.sprites.front_default);
      } catch (error) {
        console.error("Error fetching sprite:", error);
      }
    };

    fetchSprite();
  }, [url]);

  return (
    <div className="text-center w-24 h-24">
      <p>{name}</p>
      {sprite ? (
        <img src={sprite} alt={`${name} sprite`} className="w-24 h-24" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PokemonImage;