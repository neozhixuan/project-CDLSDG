import { Score } from "./Score";

export const SectorCard = (props) => {
  console.log(Object.keys(props.sectors)[0]);
  return (
    <div
      className={`w-full select-none bg-white rounded-md flex flex-1 items-center p-4 w-full ${props.className}`}
    >
      <div className="basis-2/5 pl-1">
        <div className="font-medium">{props.a}</div>
      </div>
      <Score
        name={Object.keys(props.sectors)[0]}
        score={Object.values(props.sectors)[0] + "%"}
      />
      {Object.values(props.sectors)[1] && (
        <Score
          name={Object.keys(props.sectors)[1]}
          score={Object.values(props.sectors)[1] + "%"}
        />
      )}
      {Object.values(props.sectors)[2] && (
        <Score
          name={Object.keys(props.sectors)[2]}
          score={Object.values(props.sectors)[2] + "%"}
        />
      )}
    </div>
  );
};
