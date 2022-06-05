import { StockCard } from "./StockCard";

export const StockLayout = () => {
  return (
    <div class="flex-auto">
      <header class="flex-none flex h-16 bg-gray-100 border-t px-4 items-center">
        <h1 class="font-semibold text-lg">Market Status</h1>
      </header>
      <header class="flex-none flex  bg-gray-100 px-4 items-center">
        <a
          href="#"
          class="inline-block rounded-full text-black
                                
                                text-xs 
                                mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 "
        >
          Upside
        </a>
        <a
          href="#"
          class="inline-block rounded-full text-black
                                
                                text-xs 
                                mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 "
        >
          Downside
        </a>
      </header>

      <ul class="flex flex-col bg-gray-100 p-4">
        <StockCard
          companyName={"Company A"}
          stockName={"COMPA"}
          stockChange={"↑ 3.45%"}
        />
        <StockCard
          companyName={"Company B"}
          stockName={"COMPB"}
          stockChange={"↑ 4.45%"}
        />
        <StockCard
          companyName={"Company C"}
          stockName={"COMPC"}
          stockChange={"↑ 5.45%"}
        />
      </ul>
    </div>
  );
};
