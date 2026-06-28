import Scene from "./Scene";

interface CharacterModelProps {
  view?: "skills" | "about";
}

const CharacterModel = ({ view = "skills" }: CharacterModelProps) => {
  return <Scene view={view} />;
};

export default CharacterModel;
