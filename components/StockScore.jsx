export const StockScore = (props) => {
  const classes = " bg-gray-100 " + props.className;
  return (
    <div className={classes}>
      <div className="flex flex-col bg-white lg:mt-20 p-10">
        <p className="pt-5 text-center"> Your Average ESG Score </p>
        <p className="text-center"> 64 </p>
        <div className="mx-auto">
            <div className="bg-green-100 text-center p-2">
                Normal
            </div>
        </div>
        <p className="text-center">A higher ESG score leads to better long term yield.</p>
        <button onClick={props.setPage} className="mx-auto px-4 align-middle mb-5 bg-blue-500 text-white">Evaluate ESG In Your Portfolio</button>
      </div>
    </div>
  );
};
