export const ESGScore = (props) => (
    <div className={props.className}>
    <div className="text-gray-400 font-semibold">ESG Score</div>
    <span className={`font-semibold w-10 rounded-lg text-white ${
        props.esg > 60
          ? "bg-green-500 "
          : props.esg < 30
          ? "bg-red-500 "
          : "bg-yellow-500 "
      }`}>{Math.trunc(props.esg)}</span>
  </div>
);