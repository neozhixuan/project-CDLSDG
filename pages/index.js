import Link from "next/link";
import Head from "next/head";
import { Sidebar } from "../components/Sidebar";
import { StockLayout } from "../components/StockLayout";
import { StockScore } from "../components/StockScore";
import { useState } from "react";

export default function IndexPage() {
  const [page, willSetPage] = useState(0);
  const [name, setName] = useState("")

  const onSubmitHandler = (event) => {
    event.preventDefault();
    willSetPage(1);
    setName(event.target.elements[0].value);
  }

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
          <div>
            <form onSubmit={onSubmitHandler}>
              <label htmlFor="name">Name</label>
              <input id="name"/>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
                Submit
              </button>
            </form>
          </div>
        )}
        {page === 1 && (
          <div className="grid grid-cols-4 md:grid-cols-12 w-full grid-rows-2 md:grid-rows-1">
            <StockLayout className="h-full col-span-4 md:col-span-8 row-span-1" setPage={()=>willSetPage(0)} name={name}/>
            <StockScore className="col-span-4 md:col-span-4 h-full p-10 row-span-1" />
          </div>
        )}
      </div>
    </main>
  );
}
