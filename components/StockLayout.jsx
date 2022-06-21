import { StockCard } from "./StockCard";
import { StockLabel } from "./StockLabel";


export const StockLayout = (props) => {
  const classes = "bg-gray-100 " + props.className;

  const test = () => {
    console.log(props.data.stocks[0]);
  };
  return (
    <div className={classes}>
      <header className="flex-none flex h-16 bg-gray-100 border-t px-4 items-center">
        <h1 className="font-semibold text-lg">
          {props.name ? (
            <span className="text-red-800">Market Status for {props.name}</span>
          ) : (
            <span>Market Status for Anon</span>
          )}
        </h1>
      </header>
      {/* <header className="flex-none flex  bg-gray-100 px-4 items-center">
        <StockLabel labelName="Upside" />
        <StockLabel labelName="Downside" />
      </header> */}
      <ul className="flex flex-col bg-gray-100 p-4">
        {props.stockNames.map((data, idx) => (
          <StockCard
            key={idx}
            companyName={data}
            stockName={"COMPA"}
            stockChange={"↑ 3.45%"}
          />
        ))}
        <button className="w-20 bg-blue-500 text-white" onClick={test}>
          Back
        </button>
      </ul>
    </div>
  );
};
