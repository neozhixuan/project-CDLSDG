export const StockBanner = (props) => {
  return (
    <li className="border-gray-400 flex-row mb-2">
      <div className="bg-white rounded-md grid grid-cols-6 sm:grid-rows-1 grid-rows-1  sm:space-y-0 items-center py-1 px-4hover:shadow">
        <div className="col-span-1 text-center">Stock</div>
        <div className="col-span-1 text-center">Name</div>
        <div className="col-span-1 text-center">Last</div>
        <div className="col-span-1 text-center">Change</div>
        <div className="col-span-1 text-center">Change %</div>

        <div className="col-span-1 text-center">ESG Score</div>
      </div>
    </li>
  );
};
