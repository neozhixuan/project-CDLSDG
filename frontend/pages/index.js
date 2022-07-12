import Link from "next/link";
import Head from "next/head";
import { Sidebar } from "../components/Sidebar";
import { StockLayout } from "../components/Page1/StockLayout";
import { StockEvaluator } from "../components/Page2/StockEvaluator";
import { StockScore } from "../components/StockScore";
import { useState } from "react";
import { Container } from "../components/Container";
import { Select } from "../components/Select";
import ESGscores from "../jsonfiles/ESGscores.json";
import { Numbering } from "../components/Page2/Numbering";
import { useMediaQuery } from "react-responsive";

export default function IndexPage({ datapoint }) {
  const [page, willSetPage] = useState(0);
  const [name, setName] = useState("");

  const [items, setItems] = useState([1]);
  const [stocks, setStocks] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [sectors, setSectors] = useState({});

  const [score, setScore] = useState(0);
  const [e, setE] = useState(0);
  const [s, setS] = useState(0);
  const [g, setG] = useState(0);

  const isDesktopMode = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const isTabletMode = useMediaQuery({
    query: "(min-width: 768px)",
  });

  var gatherStats = () => {
    // Hold average ESG score
    let count = 0;
    let total = 0;
    let totalE = 0;
    let totalS = 0;
    let totalG = 0;
    let average = 0;
    // Prevents stocks from piling up when code changes in local
    if (allItems.length !== stocks.length) {
      // "allItems" will be the state that holds all the stocks and info
      for (let i = 0; i < stocks.length; i++) {
        for (let j = 0; j < datapoint.stocks.length; j++) {
          if (stocks[i] === datapoint.stocks[j].Code) {
            allItems.push(datapoint.stocks[j]);

            // Hash Table to compute the companies
            if (sectors[datapoint.stocks[j].Sector] !== undefined) {
              sectors[datapoint.stocks[j].Sector] += 1;
            } else {
              sectors[datapoint.stocks[j].Sector] = 1;
            }

            total += datapoint.stocks[j].ESG;
            totalE += datapoint.stocks[j].E;
            totalS += datapoint.stocks[j].S;
            totalG += datapoint.stocks[j].G;
            console.log("total is " + total);
            count++;
            if (count === stocks.length) {
              average = total / count;
              setScore(average);
              console.log("Average score is " + score);
              setE(totalE / count);
              setS(totalS / count);
              setG(totalG / count);
            }
          }
        }
      }
      setAllItems(allItems);
      console.log(allItems);

      for (const sector in sectors) {
        sectors[sector] = (sectors[sector] / allItems.length) * 100;
      }

      const sortedSectors = Object.fromEntries(
        Object.entries(sectors).sort(([, a], [, b]) => b - a)
      );
      setSectors(sortedSectors);
    } else {
      console.log("Close");
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    for (let i = 2; i < event.target.elements.length - 1; i += 2) {
      const value = event.target[i].value;
      if (value !== "Choose a stock") {
        stocks.push(value);
      }
    }
    if (stocks.length != 0 && stocks[0].length < 13) {
      setName(event.target.elements[0].value);
      setStocks([...stocks]);
      willSetPage(1);
    } else {
      setStocks([]);
    }
    gatherStats();
  };

  const jasonStart = () => {
    stocks.push("MSFT", "AAPL", "TSLA", "AMZN");
    setStocks([...stocks]);
    console.log(stocks.length);
    console.log(allItems.length);
    willSetPage(1);
    gatherStats();
  };

  const addSelect = () => {
    if (items.length < 6) {
      items.push(items[items.length - 1] + 1);
      setItems([...items]);
    }
  };

  const willRemoveItem = () => {
    if (items.length > 1) {
      items.pop();
      setItems([...items]);
    }
  };

  const resetPage = () => {
    setItems([1]);
    setStocks([]);
    willSetPage(0);
    setAllItems([]);
    setScore(0);
    setSectors([]);
  };

  return (
    <main>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={`flex w-full p-4 sm:p-0 ${!isTabletMode && "bg-gray-100 "}`}>
        <Sidebar page={page} />

        {page === 0 && (
          <Container>
            <form onSubmit={onSubmitHandler} className="flex flex-col">
              <p className="mb-2 flex flex-col content-center">
                {" "}
                <label htmlFor="name">(1) Name</label>
                <input id="name" className="border border-gray-300" />
              </p>
              <div className="mb-2 flex flex-col content-center">
                <div className="flex flex-row">
                  <label htmlFor="countries">(2) Stock</label>{" "}
                  <input
                    type="button"
                    className="w-10 border border-gray-300"
                    value="-"
                    onClick={willRemoveItem}
                  />
                </div>

                {items.map((data, idx) => (
                  <Select
                    data={datapoint}
                    key={idx}
                    number={data}
                    willAddItem={() => addSelect()}
                  />
                ))}
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center"
                type="submit"
              >
                Submit
              </button>
            </form>
            <p className="mt-10 font-semibold">
              Alternatively, use a demo portfolio:
            </p>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full form-multiselect"
            >
              <option defaultValue>TESLA INC</option>
            </select>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full form-multiselect"
            >
              <option defaultValue>MICROSOFT INC</option>
            </select>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full form-multiselect"
            >
              <option defaultValue>APPLE INC</option>
            </select>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full form-multiselect"
            >
              <option defaultValue>AMAZON.COM INC</option>
            </select>
            <button
              onClick={jasonStart}
              className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center"
            >
              Log in as Jason
            </button>
          </Container>
        )}
        {page === 1 && (
          <div className="grid grid-cols-4 md:grid-cols-12 w-full grid-rows-2 md:grid-rows-1">
            <StockLayout
              className="h-full col-span-4 md:col-span-8 row-span-1"
              setPage={resetPage}
              name={name}
              allItems={allItems}
              score={score}
            />
            <StockScore
              setPage={() => willSetPage(2)}
              className="col-span-4 md:col-span-4 h-full p-10 row-span-1"
              score={score}
            />
          </div>
        )}
        {page === 2 && (
          <>
            {isDesktopMode && <Numbering />}

            <StockEvaluator
              setPage={() => willSetPage(1)}
              score={score}
              allItems={allItems}
              env={e}
              soc={s}
              gov={g}
              sectors={sectors}
            />
          </>
        )}
      </div>
    </main>
  );
}
function compareStrings(a, b) {
  // Assuming you want case-insensitive comparison
  a = a.toLowerCase();
  b = b.toLowerCase();

  return a < b ? -1 : a > b ? 1 : 0;
}

export async function getStaticProps() {
  const stocks = await ESGscores;
  stocks.sort(function (a, b) {
    return compareStrings(a.Stock_Name, b.Stock_Name);
  });
  return {
    props: {
      datapoint: {
        stocks: stocks,
      },
    },
  };
}
