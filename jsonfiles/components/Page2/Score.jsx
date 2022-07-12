export const Score = (props) => {
  return (
    <div className={`${props.className} col-span-1 text-center flex flex-col`}>
      <div className="text-gray-400 font-semibold">{props.name}</div>
      <span className={`font-semibold text-3xl `}>
        {typeof(props.score) !== "number"
          ? props.score
          : props.score
          ? <span className={`${
            props.score > 60
              ? "text-green-500 "
              : props.score < 30
              ? "text-red-500 "
              : "text-yellow-500 "
          }`}>{Math.trunc(props.score)}</span>
          : <span className="text-red-500">0</span>}
      </span>
    </div>
  );
  F;
};
