import { Score } from "./Score";
import { CardStats } from "./CardStats";
import { NameBlock } from "./NameBlock";
import { ESGScore } from "./ESGScore";

export const StockAnalysisCard = (props) => {
  return (
    <li className="flex-row border-b-2 ">
      {props.suggestion ? (
        <div className="border-b-2 select-none cursor-pointer bg-white rounded-md  grid grid-cols-3 sm:grid-cols-6 sm:grid-rows-1 grid-rows-2 items-center p-4  transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow">
          <NameBlock className="basis-1/5 text-center" {...props} />
          <ESGScore
            className="basis-1/5 text-center flex flex-col items-center"
            {...props}
          />
          <CardStats name={"Last"} stat={"$" + props.last} />
          <div className="basis-1/5"></div>
          <div className="basis-2/5">
          <button disabled
              className="mt-2 w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex justify-center"
            >View CGS-CIMB&apos;s report</button>
          </div>
        </div>
      ) : (
        <div className="border-b-2 bg-white grid grid-cols-3 gap-y-4 sm:grid-cols-6 sm:grid-rows-1 grid-rows-2 items-center p-4 hover:shadow">
          <NameBlock className="basis-1/5 text-center" {...props} />
          <CardStats name={"Name"} stat={props.name} />
          <CardStats name={"Last"} stat={"$" + props.last} />
          <CardStats name={"Change"} stat={props.stockChange} />
          <CardStats name={"Change %"} stat={props.stockChangePercent} />
          <ESGScore
            className="basis-1/5 text-center flex flex-col items-center"
            {...props}
          />
        </div>
      )}

      <div className="bg-white gap-y-4 grid grid-cols-3 sm:grid-cols-6 sm:grid-rows-1 grid-rows-2 items-center p-4 hover:shadow">
        <div className="row-start-1 col-span-2 pl-1">
          <div className="font-medium text-sm md:text-base text-center">
            Companys sustainability scores:
          </div>
        </div>
        <Score className="row-start-1" name={"CDP Score"} score={"NIL"} />
        <Score className="row-start-2 sm:row-start-1" name={"Environmental"} score={props.e} />
        <Score className="row-start-2 sm:row-start-1" name={"Social"} score={props.s} />
        <Score className="row-start-2 sm:row-start-1" name={"Governmental"} score={props.g} />
      </div>
    </li>
  );
};
