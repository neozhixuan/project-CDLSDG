import Link from "next/link";
import Head from "next/head";
import { Sidebar } from "../components/Sidebar";
import { StockLayout } from "../components/StockLayout";
import { StockScore } from "../components/StockScore";
import { useState } from "react";
import { Container } from "../components/Container";
import { Select } from "../components/Select";
export default function IndexPage() {
  const [page, willSetPage] = useState(0);
  const [name, setName] = useState("");
  const [items, setItems] = useState([1]);
  const [stocks, setStocks] = useState([]);

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
  };

  return (
    <main>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className="flex">
        <Sidebar />
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
          </Container>
        )}
        {page === 1 && (
          <div className="grid grid-cols-4 md:grid-cols-12 w-full grid-rows-2 md:grid-rows-1">
            <StockLayout
              className="h-full col-span-4 md:col-span-8 row-span-1"
              setPage={resetPage}
              stockNames={stocks}
              name={name}
            />
            <StockScore
              setPage={() => willSetPage(2)}
              className="col-span-4 md:col-span-4 h-full p-10 row-span-1"
            />
          </div>
        )}
        {page === 2 && (
          <div className="grid grid-cols-4 md:grid-cols-12 w-full grid-rows-2 md:grid-rows-1">
             P3
          </div>
        )}
      </div>
    </main>
  );
}
