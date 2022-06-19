import { StockCard } from "./StockCard";
import { StockLabel } from "./StockLabel";

export const StockLayout = (props) => {
  const classes = "bg-gray-100 " + props.className;
  return (
    <div className={classes}>
      <header className="flex-none flex h-16 bg-gray-100 border-t px-4 items-center">
        <h1 className="font-semibold text-lg">Market Status for <span className="text-red-800">{props.name}</span></h1>
      </header>
      <header className="flex-none flex  bg-gray-100 px-4 items-center">
        <StockLabel labelName="Upside" />
        <StockLabel labelName="Downside" />
      </header>

      <ul className="flex flex-col bg-gray-100 p-4">
        <StockCard
          companyName={"Company A"}
          stockName={"COMPA"}
          stockChange={"↑ 3.45%"}
        />
        <StockCard
          companyName={"Company B"}
          stockName={"COMPB"}
          stockChange={"↑ 4.45%"}
        />
        <StockCard
          companyName={"Company C"}
          stockName={"COMPC"}
          stockChange={"↑ 5.45%"}
        />
      </ul>
      <button onClick={props.setPage}>
        Back
      </button>
    </div>
  );
};
