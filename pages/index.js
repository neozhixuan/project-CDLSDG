import Link from "next/link";
import Head from "next/head";
import { Sidebar } from "../components/Sidebar";
import { StockLayout } from "../components/StockLayout";
import { StockScore } from "../components/StockScore";

export default function IndexPage() {
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
        <div className="grid grid-cols-4 md:grid-cols-12 w-full grid-rows-2 md:grid-rows-1">
          <StockLayout className="h-full col-span-4 md:col-span-8 row-span-1"/>
          <StockScore className="col-span-4 md:col-span-4 h-full p-10 row-span-1"/>
        </div>
      </div>
    </main>
  );
}
