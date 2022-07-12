export const StockBanner = (props) => {
  return (
    <li className="border-gray-400 flex-row mb-2">
      <div className="select-none bg-white rounded-md grid grid-cols-3 sm:grid-cols-6 sm:grid-rows-1 grid-rows-2 space-y-2 sm:space-y-0 items-center py-1 px-4 transform  hover:shadow">
        <div className="basis-1/5 text-center">Stock</div>
        <div className="basis-1/5 text-center">Name</div>
        <div className="basis-1/5 text-center">Last</div>
        <div className="basis-1/5 text-center">Change</div>
        <div className="basis-1/5 text-center">Change %</div>

        <div className="basis-1/5 text-center">ESG Score</div>
      </div>
    </li>
  );
};
