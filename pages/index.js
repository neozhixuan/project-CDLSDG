import React, { Component } from "react";
import Head from "next/head";
import { Sidebar } from "../components/Sidebar";
import { StockLayout } from "../components/Page1/StockLayout";
import { StockEvaluator } from "../components/Page2/StockEvaluator";
import { StockScore } from "../components/StockScore";
import { useState, useRef } from "react";
import { Container } from "../components/Container";
import { Numbering } from "../components/Page2/Numbering";
import { useMediaQuery } from "react-responsive";
import { connectToDatabase } from "../util/mongodb";
import Select from "react-select";
import { createFilter } from "react-select";
import { FixedSizeList as List } from "react-window";
import Image from "next/image";

const height = 35;

class MenuList extends Component {
  render() {
    const { options, children, maxHeight, getValue } = this.props;
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * height;

    return (
      <List
        height={maxHeight}
        itemCount={children.length}
        itemSize={height}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    );
  }
}
export default function IndexPage({ datapoint, options }) {
  const [page, willSetPage] = useState(0);
  const [name, setName] = useState("");

  const [items, setItems] = useState([1]);
  // const [stocks, setStocks] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [sectors, setSectors] = useState({});

  const [select, setSelect] = useState([]);

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
    // // Prevents stocks from piling up when code changes in local
    // if (allItems.length !== select.length) {
    // "allItems" will be the state that holds all the stocks and info
    for (let i = 0; i < select.length; i++) {
      for (let j = 0; j < datapoint.length; j++) {
        if (select[i] === datapoint[j].Code) {
          allItems.push(datapoint[j]);

          // Hash Table to compute the companies
          if (sectors[datapoint[j].Sector] !== undefined) {
            sectors[datapoint[j].Sector] += 1;
          } else {
            sectors[datapoint[j].Sector] = 1;
          }

          total += datapoint[j].ESG;
          totalE += datapoint[j].E;
          totalS += datapoint[j].S;
          totalG += datapoint[j].G;
          console.log("total is " + total);
          count++;
          if (count === select.length) {
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
    // } else {
    //   console.log("Close");
    // }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (select.length !== 0) {
      setName(event.target.elements[0].value);
      willSetPage(1);
    }
    gatherStats();
  };

  const jasonStart = () => {
    select.push("MSFT", "AAPL", "TSLA", "AMZN");
    setSelect([...select]);
    willSetPage(1);
    gatherStats();
  };

  // const addSelect = () => {
  //   if (items.length < 6) {
  //     items.push(items[items.length - 1] + 1);
  //     setItems([...items]);
  //   }
  // };

  // const willRemoveItem = () => {
  //   if (items.length > 1) {
  //     items.pop();
  //     setItems([...items]);
  //   }
  // };

  const resetPage = () => {
    setItems([1]);
    setSelect([]);
    willSetPage(0);
    setAllItems([]);
    setScore(0);
    setSectors([]);
  };

  const handleTypeSelect = (e) => {
    let array = [];
    for (let i = 0; i < e.length; i++) {
      array.push(e[i].value);
    }
    select = array;
    setSelect(select);
    console.log(select);
    array = [];
  };

  return (
    <main>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={`flex w-full p-4 sm:p-0 `}>
        <Sidebar page={page} />

        {page === 0 && (
          <Container>
            <div className="mb-12 ">
              <Image className="" width={300} height={75} src="/cgscimb.png" />
              <Image className="" width={280} height={75} src="/esg-dash.png" />
            </div>

            <p className="font-semibold mb-2 text-lg">
              List the stocks existing in your portfolio:
            </p>
            <form onSubmit={onSubmitHandler} className="flex flex-col">
              <p className="mb-2 flex flex-row content-center ">
                {" "}
                <label htmlFor="name" className="mr-2">
                  Name:{" "}
                </label>
                <input id="name" className=" w-full border border-gray-300" />
              </p>
              <div className="mb-2 flex flex-row">
                <div className="flex flex-row">
                  <label htmlFor="countries" className="mr-2 flex self-center">
                    Stocks:{" "}
                  </label>{" "}
                  {/* <input
                    type="button"
                    className="w-10 border border-gray-300"
                    value="-"
                    onClick={willRemoveItem}
                  /> */}
                </div>

                {items.map((data, idx) => (
                  <p className="flex flex-row space-x-2 w-full" key={idx}>
                    {/* <span>{data}</span> */}
                    <Select
                      filterOption={createFilter({ ignoreAccents: false })}
                      components={{ MenuList }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full form-multiselect"
                      options={options}
                      isMulti
                      onChange={handleTypeSelect}
                    />
                    {/* <input
                      type="button"
                      className="w-10 border border-gray-300"
                      value="+"
                      onClick={addSelect}
                    /> */}
                  </p>
                ))}
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center"
                type="submit"
              >
                Submit
              </button>
            </form>
            <p className=" mb-2 mt-20 font-semibold text-lg">
              Alternatively, use a demo portfolio:
            </p>
            <select
              id="countries"
              className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full form-multiselect"
            >
              <option defaultValue>TESLA INC</option>
            </select>
            <select
              id="countries"
              className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full form-multiselect"
            >
              <option defaultValue>MICROSOFT INC</option>
            </select>
            <select
              id="countries"
              className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full form-multiselect"
            >
              <option defaultValue>APPLE INC</option>
            </select>
            <select
              id="countries"
              className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full form-multiselect"
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

export async function getServerSideProps(context) {
  const { db } = await connectToDatabase();

  const data = await db.collection("data").find({}).toArray();

  const property = JSON.parse(JSON.stringify(data));
  const properties = property.sort(function (a, b) {
    return compareStrings(a.Stock_Name, b.Stock_Name);
  });

  const options = properties.map((property) => {
    return {
      value: property.Code,
      label: property.Stock_Name,
    };
  });
  return {
    props: { datapoint: properties, options: options },
  };
}
