import { NameBlock } from "../Page2/NameBlock";


export const StockCard = (props) => {
  return (
    <li className="border-gray-400 flex-row mb-2">
      <div className="select-none cursor-pointer bg-white rounded-md grid grid-cols-6 grid-rows-1 items-center p-2  transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow">
        <NameBlock className="basis-1/5 flex flex-col items-start sm:items-center- " {...props} />
        <div className="basis-1/5 text-center font-semibold text-xs sm:text-sm break-words">{props.name}</div>
        <div className="basis-1/5 text-center text-xs  sm:text-sm">${props.last}</div>
        <div className="basis-1/5 text-center text-xs sm:text-sm">{props.stockChange}</div>
        <div className={`basis-1/5 text-center text-xs  sm:text-sm ${props.stockChangePercent.includes("+") ? "text-green-500" : "text-red-500"} `}>
          {props.stockChangePercent}
        </div>
        <div className={`basis-1/5 text-center text-white`}>
          <span className={`${props.esg > 75 ? "bg-green-500 " : props.esg < 30 ? "bg-red-500 " : "bg-yellow-500 "} px-3 rounded-lg`}>{Math.trunc(props.esg)}</span>
        </div>
      </div>
    </li>
  );
};
