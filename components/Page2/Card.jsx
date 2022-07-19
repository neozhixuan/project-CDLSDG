import { Score } from "./Score";

export const Card = (props) => {
  return (
    <div
      className={`w-full select-none bg-white rounded-md grid grid-cols-3 gap-y-4 sm:grid-cols-6 sm:grid-rows-1 grid-rows-2 items-center p-4 w-full ${props.className}`}
    >
      <div className="row-start-1 col-span-1 pl-1 text-sm md:text-base">
        <div className="font-medium">{props.a}</div>
      </div>
      <div className="row-start-1 col-span-1 text-center flex justify-center">
        <span
          className={`${
            props.c > 60
              ? "bg-green-500 "
              : props.esg < 30
              ? "bg-red-500 "
              : "bg-yellow-500 "
          } p-2 rounded-xl text-white font-semibold`}
        >
          {props.b}
        </span>
      </div>
      <Score className="row-start-1" name={"CDP Score"} score={"NIL"} />
      <Score className="row-start-2 sm:row-start-1" name={"Environmental"} score={props.d} />
      <Score className="row-start-2 sm:row-start-1" name={"Social"} score={props.e} />
      <Score className="row-start-2 sm:row-start-1" name={"Governmental"} score={props.f} />
    </div>
  );
};
