import { StockCard } from "./StockCard";
import { StockBanner } from "./StockBanner";

export const StockLayout = (props) => {
  const classes = "bg-gray-100 px-5 " + props.className;

  return (
    <div className={classes}>

      <ul className="flex flex-col bg-gray-100">
        <StockBanner />
        {props.allItems.map((data, idx) => (
          <StockCard
            key={idx}
            companyName={data.Code}
            stockName={data.Exch}
            stockChange={data.Change}
            last={data.Last}
            name={data.Stock_Name}
            stockChangePercent={data.ChangePerc}
            esg={data.ESG}
          />
        ))}
        <button className="w-20 bg-blue-500 text-white" onClick={props.setPage}>
          Back
        </button>
      </ul>
    </div>
  );
};
