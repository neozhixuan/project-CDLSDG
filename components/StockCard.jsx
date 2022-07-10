export const StockCard = (props) => {
  return (
    <li className="border-gray-400 flex-row mb-2">
      <div className="select-none cursor-pointer bg-white rounded-md flex flex-1 items-center p-4  transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow">
        <div className="basis-1/5 pl-1">
          <div className="font-medium">{props.companyName}</div>
          <div className="text-gray-600 text-sm">
            {" "}
            <a
              href="#"
              className="inline-block rounded-full text-white 
                          bg-yellow-700
                          text-xs font-bold 
                          mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 "
            >
              {props.stockName}
            </a>{" "}
          </div>
        </div>
        <div className="basis-1/5 text-center">{props.name}</div>
        <div className="basis-1/5 text-center">${props.last}</div>
        <div className="basis-1/5 text-center">{props.stockChange}</div>
        <div className={`basis-1/5 text-center ${props.stockChangePercent.includes("+") ? "text-green-500" : "text-red-500"} `}>
          {props.stockChangePercent}
        </div>
        <div className={`basis-1/5 text-center text-white`}>
          <span className={`${props.esg > 60 ? "bg-green-500 " : props.esg < 30 ? "bg-red-500 " : "bg-yellow-500 "} px-3 rounded-lg`}>{Math.trunc(props.esg)}</span>
        </div>
      </div>
    </li>
  );
};
