import { Card } from "./Card";
import { StockAnalysisCard } from "./StockAnalysisCard";
import { Accordion } from "./Accordion";

export const StockEvaluator = (props) => {
  const classes = "m-5 w-full flex-col " + props.className;
  return (
    <div className={classes}>
      <button
        className="w-20 h-10 bg-blue-500 text-white"
        onClick={props.setPage}
      >
        Back
      </button>
      {/* Part 1 */}
      <div className="font-semibold mt-5">Your Current Statistics</div>
      <Card
        className="mx-auto "
        a={"A breakdown of your average sustainability scores"}
        b={"Good"}
        c={props.score}
        d={"XX"}
        e={"XX"}
        f={"XX"}
      />
      <ul className="flex flex-col bg-gray-100 p-4 mt-4">
        {props.allItems.map((data, idx) => (
          <StockAnalysisCard
            key={idx}
            companyName={data.Code}
            stockName={data.Exch}
            stockChange={data.Change}
            last={data.Last}
            name={data.Stock_Name}
            stockChangePercent={data.ChangePerc}
            esg={data.ESG}
            e={data.E}
            s={data.S}
            g={data.G}
          />
        ))}
      </ul>
      {/* Part 2 */}
      <div className="font-semibold mt-10">
        Understanding the benefits of ESG
      </div>
      <div
        className={`flex-col w-full select-none cursor-pointer bg-white rounded-md flex flex-1 items-center p-4  transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow bg-gray-100 w-full`}
      >
        <div className="justify-between select-none cursor-pointer bg-white rounded-md flex flex-1 items-center p-4  transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow">
          <div className="basis-4/5">
            Investing in a stock with high ESG ratings have their individual
            benefits. Studies have proven that companies with higher ESG ratings
            have a positive relation with the financial performance. At the same
            time, these companies have a lower risk regarding their stock price
            and action. We will breakdown the individual factors here for your
            education.
          </div>
          <div className="basis-1/5">
            <img src="/flower.png" />
          </div>
        </div>
        <Accordion />
        <Accordion />
        <Accordion />
      </div>
      {/* Part 3 */}
      <div className="font-semibold mt-5">Investing to Improve Your Score</div>
      <Card
        className="mx-auto "
        a={"A Breakdown of Your Portfolio’s Holdings"}
        b={" "}
        c={" "}
        d={"XX"}
        e={"XX"}
        f={"XX"}
      />
      <ul className="flex flex-col bg-gray-100 p-4 mt-4">
        <StockAnalysisCard
          companyName={"MSFT"}
          stockName={"NASDAQ"}
          stockChange={"View report"}
          esg={93}
          last={111.3}
          e={78}
          s={97}
          g={93}
        />
      </ul>
      {/* Part 4 */}
      <div className="font-semibold mt-5">Leaderboard</div>
      <div
        className={`p-5 flex-row w-full select-none cursor-pointer bg-white rounded-md flex flex-1 items-center p-4  transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow bg-gray-100 w-full ${props.className}`}
      >
        <div className="basis-1/2 flex flex-col">
          <div>Sebastian</div>
          <div>Jason</div>
        </div>
        <div className="basis-1/2">Eiden wins</div>
      </div>
      <button
        className="w-20 h-10 bg-blue-500 text-white mt-5"
        onClick={props.setPage}
      >
        Back
      </button>
    </div>
  );
};
