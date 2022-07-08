export const StockScore = (props) => {
  const classes = " bg-gray-100 " + props.className;
  return (
    <div className={classes}>
      <div className="flex flex-col bg-white w-30 sm:w-auto mt-6 p-3  border-gray-400 rounded-md transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow">
        <p className="pt-5 text-center text-gray-500"> Your Average ESG Score </p>
        <p className="text-center text-3xl font-bold py-2"> {Math.trunc(props.score)} </p>
        <div className="mx-auto">
            <div className={`${props.score > 60 ? "bg-green-500 " : props.score < 30 ? "bg-red-500 " : "bg-yellow-500 "} text-center text-sm text-white rounded-xl p-2`}>
                {props.score > 60 ? "GOOD" : props.score < 30 ? "POOR" : "NORMAL"}
            </div>
        </div>
        <p className="text-center text-gray-500 py-2">A higher ESG score leads<br/>to better long term yield.</p>
        <button onClick={props.setPage} className="mx-auto px-4 align-middle mb-5 bg-blue-500 text-white rounded-md p-2 hover:shadow">Evaluate ESG In Your Portfolio</button>
      </div>
    </div>
  );
};
