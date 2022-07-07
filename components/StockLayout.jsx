import { StockCard } from "./StockCard";
import { StockLabel } from "./StockLabel";
import { useEffect, useState } from "react";
import ESGscores from "../jsonfiles/ESGscores.json";

export const StockLayout = (props) => {
  const classes = "bg-gray-100 " + props.className;

  const [items, setItems] = useState([]);

  var gatherStats = () => {
    // Prevents stocks from piling up when code changes in local
    if (items.length !== props.stockNames.length) {
      // "items" will be the state that holds all the stocks and info
      for (let i = 0; i < props.stockNames.length; i++) {
        for (let j = 0; j < props.data.stocks.length; j++) {
          if (props.stockNames[i] === props.data.stocks[j].Code) {
            items.push(props.data.stocks[j]); 
            setItems([...items]); 
            console.log(items)
          }
        }
      }
    }else{
      console.log("Close")
    }
  };

  useEffect(() => {
    gatherStats();
  });

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
        {items.map((data, idx) => (
          <StockCard
            key={idx}
            companyName={data.Code}
            stockName={data.Exch}
            stockChange={data.Change}
            last={data.Last}
            name={data.Stock_Name}
            stockChangePercent={data.ChangePerc}
          />
        ))}
        <button className="w-20 bg-blue-500 text-white" onClick={props.setPage}>
          Back
        </button>
      </ul>
    </div>
  );
};
