import Link from "next/link";
import Head from "next/head";
import { Sidebar } from "../components/Sidebar";
import { StockLayout } from "../components/StockLayout";

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
        <StockLayout />
      </div>
    </main>
  );
}
