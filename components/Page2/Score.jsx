export const Score = (props) => {
  return (
    <div className={`${props.className} col-span-1 text-center flex flex-col`}>
      <div className="text-gray-400 font-semibold text-xs sm:text-sm md:text-base">{props.name}</div>
      <span className={`font-semibold text-2xl sm:text-3xl `}>
        {props.score === "NIL" || !props.score ? (
          "NIL"
        ) : typeof props.score !== "number"  ? (
          props.score
        ) : props.score ? (
          <span
            className={`${
              props.score > 75
                ? "text-green-500 "
                : props.score < 30
                ? "text-red-500 "
                : "text-yellow-500 "
            }`}
          >
            {Math.trunc(props.score)}
          </span>
        ) : (
          <span className="text-red-500">0</span>
        )}
      </span>
    </div>
  );
  F;
};
