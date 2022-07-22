import React, { Component, useEffect } from "react";
import Head from "next/head";
import { Sidebar } from "../components/Sidebar";
import { StockLayout } from "../components/Page1/StockLayout";
import { BannerButton } from "../components/Page1/BannerButton";
import { StockEvaluator } from "../components/Page2/StockEvaluator";
import { StockScore } from "../components/StockScore";
import { useState } from "react";
import { Container } from "../components/Container";
import { useMediaQuery } from "react-responsive";
import { connectToDatabase } from "../util/mongodb";
import Select from "react-select";
import { createFilter } from "react-select";
import { FixedSizeList as List } from "react-window";
import Image from "next/image";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useRouter } from "next/router";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
export default function IndexPage({ datapoint, options, leaders, reports }) {
  console.log("Reports is below")
  console.log(leaders[0].score);
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
  const [last, setLast] = useState(0);
  const [prevLast, setPrevLast] = useState(0);
  const [position, setPosition] = useState(0);

  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Portfolio Value",
        yAxisID: "A",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [0, 0, 0, 0, 0, prevLast, last],
      },
      {
        label: "ESG Value",
        yAxisID: "B",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "#000000",
        borderColor: "#00000",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#000000",
        pointHoverBorderColor: "#000000",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [0, 0, 0, 0, 0, 0, score],
      },
    ],
  };

  const isDesktopMode = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const isTabletMode = useMediaQuery({
    query: "(min-width: 768px)",
  });

  var record = async (array) => {
    const data = await fetch(
      `http://localhost:3000/api/users?name=${array[1]}&score=${array[0]}`
    );
    const res = await data.json();
    console.log(res);
  };

  var gatherStats = (name) => {
    // Hold average ESG score
    let count = 0;
    let total = 0;
    let totalE = 0;
    let totalS = 0;
    let totalG = 0;
    let average = 0;
    let totalLast = 0;
    let change = 0.0;
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
          totalLast += parseFloat(datapoint[j].Last);
          change += parseFloat(datapoint[j].Change);
          console.log(change);
          count++;
          // Set ESG Scores, Portfolio Value, Write to Mongo
          if (count === select.length) {
            average = total / count;
            setScore(average);
            console.log("Average score is " + score);
            setE(totalE / count);
            setS(totalS / count);
            setG(totalG / count);
            setLast(totalLast);
            setPrevLast((totalLast -= change));
            let array = [average, name];
            record(array);
          }
        }
      }
    }
    // Set Item Bank
    setAllItems(allItems);
    console.log(allItems);

    // Sectors
    for (const sector in sectors) {
      sectors[sector] = (sectors[sector] / allItems.length) * 100;
    }
    const sortedSectors = Object.fromEntries(
      Object.entries(sectors).sort(([, a], [, b]) => b - a)
    );
    setSectors(sortedSectors);

    console.log("myscore is" + average);
    for (let i = 0; i < leaders.length; i++) {
      if (average > leaders[i].score) {
        console.log("posiiton is " + i);
        setPosition(i + 1);
        console.log(position);
        break;
      }
    }
  };

  const isMobileMode = useMediaQuery({
    query: "(min-width: 640px)",
  });
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (select.length !== 0) {
      setName(event.target.elements[0].value);
      willSetPage(1);
    }
    setName("NIL");
    gatherStats(event.target.elements[0].value);
    refreshData();
  };

  const jasonStart = () => {
    select.push("SSTK", "AAPL", "TSLA", "AMZN");
    setSelect([...select]);
    willSetPage(1);
    setName("Jason");
    gatherStats("Jason");
    refreshData();
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

  const router = useRouter();

  // Refreshes getServerSideProps by redirecting the URL to itself
  // https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/
  // Btw i still dont know the difference btw this and getstaticprops
  const refreshData = () => {
    router.replace(router.asPath);
  };

  return (
    <main>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
        <title>ESG DaSH</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <div className={`flex w-full p-4 bg-gray-100 sm:p-0 `}>
        <Sidebar items={allItems} page={page} backAction={() => resetPage} />

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

                {/* {items.map((data, idx) => ( */}
                {/* <p className="flex flex-row space-x-2 w-full" key={idx}> */}
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
                {/* </p> */}
                {/* ))} */}
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
              <option defaultValue>SHUTTERSTOCK INC</option>
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
            <a href={reports[0].Report} target="_blank" className="mt-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex justify-center">Report</a>
          </Container>
        )}
        {page === 1 && (
          <div className="flex flex-col w-full space-y-10  bg-gray-100">
            <div className="bg-gray-100 w-full pl-4 pt-4">
              <header className="h-80 w-auto pb-80 mr-2 mb-5 sm:mb-36 md:mb-16 md:pb-24 lg:pb-10">
                <h1 className="font-semibold text-lg">
                  {name !== "NIL" ? (
                    <span>Welcome back, {name}</span>
                  ) : (
                    <span>Overview</span>
                  )}
                </h1>
                <div className="flex flex-col lg:flex-row lg:space-y-0 space-y-4 w-full mt-4 mb-6 sm:mb-2">
                  <BannerButton
                    text={"View a recap of your year of ESG with CGS-CIMB"}
                    button={"View recap"}
                  />
                  <BannerButton
                    text={"Take a pledge towards improving your ESG score"}
                    button={"View pledge"}
                  />
                </div>
                <Line
                  className={`pb-6 sm:pb-0 ${isMobileMode && "pt-6"}`}
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                      A: {
                        type: "linear",
                        position: "left",
                      },
                      B: {
                        type: "linear",
                        position: "right",
                        ticks: {
                          max: 1,
                          min: 0,
                        },
                      },
                    },
                  }}
                />
              </header>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-12 w-full grid-rows-2 sm:grid-rows-1 pb-10">
              <StockLayout
                className="h-full col-span-4 md:col-span-8"
                setPage={resetPage}
                name={name}
                allItems={allItems}
                score={score}
              />
              <StockScore
                setPage={() => willSetPage(2)}
                className="h-80 col-span-4 md:col-span-4 p-4 sm:p-10 "
                score={score}
              />
            </div>
          </div>
        )}
        {page === 2 && (
          <>
            {/* {isDesktopMode && <Numbering />} */}

            <StockEvaluator
              setPage={() => willSetPage(1)}
              score={score}
              allItems={allItems}
              env={e}
              soc={s}
              gov={g}
              sectors={sectors}
              leaders={leaders}
              position={position}
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

  const leaderboard = await db
    .collection("users")
    .find()
    .sort({ score: -1 })
    .toArray();
  const leaders = JSON.parse(JSON.stringify(leaderboard));

  const report = await db.collection("reports").find({}).toArray();
  const reports = JSON.parse(JSON.stringify(report));

  const options = properties.map((property) => {
    return {
      value: property.Code,
      label: property.Stock_Name,
    };
  });

  return {
    props: {
      datapoint: properties,
      options: options,
      leaders: leaders,
      reports: reports,
    },
  };
}
