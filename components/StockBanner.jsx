export const StockBanner = (props) => {
  return (
    <li className="border-gray-400 flex-row mb-2">
      <div className="select-none bg-white rounded-md flex flex-1 items-center py-1 px-4 transform  hover:shadow">
        <div className="basis-1/5 pl-1 ">
          <div className="font-medium">Stock</div>
        </div>
        <div className="basis-1/5 text-center">Name</div>

        <div className="basis-1/5 text-center">Last</div>
        <div className="basis-1/5 text-center">Change</div>
        <div className="basis-1/5 text-center">Change %</div>

        <div className="basis-1/5 text-center">ESG Score</div>
      </div>
    </li>
  );
};
