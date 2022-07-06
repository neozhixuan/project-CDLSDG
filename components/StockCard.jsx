export const StockCard = (props) => {
  return (
    <li className="border-gray-400 flex-row mb-2">
      <div className="select-none cursor-pointer bg-white rounded-md flex flex-1 items-center p-4  transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow">
        <div className="flex-1 pl-1 mr-16">
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
        <div className="basis-1/5 text-center">
          {props.last}
        </div>
        <div className="text-red-500 ">{props.stockChange}</div>
      </div>
    </li>
  );
};
