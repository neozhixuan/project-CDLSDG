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
        <div className="flex w-full lg:flex-row flex-col">
          <StockLayout className="lg:basis-3/4"/>
          <StockScore className="lg:basis-1/4 w-full"/>
        </div>
      </div>
    </main>
  );
}
