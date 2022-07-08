export const Card = (props) => {
  return (
    <div
      className={`w-full select-none bg-white rounded-md flex flex-1 items-center p-4 w-full ${props.className}`}
    >
      <div className="basis-1/5 pl-1">
        <div className="font-medium">{props.a}</div>
      </div>
      {props.b ? (
        <div className="basis-1/5 text-center">
          <span
            className={`${
              props.c > 60
                ? "bg-green-500 "
                : props.esg < 30
                ? "bg-red-500 "
                : "bg-yellow-500 "
            } p-2 rounded-xl text-white font-semibold`}
          >
            {props.b}
          </span>
        </div>
      ) : (
        <div className="basis-1/5 text-center"></div>
      )}
      {props.c ? (
        <div className="basis-1/5 text-center flex flex-col">
          <span>ESG Score</span>
          <span className="text-2xl">{Math.trunc(props.c)}</span>
        </div>
      ) : (
        <div className="basis-1/5 text-center text-2xl">
          {props.c}
        </div>
      )}

      <div className="basis-1/5 text-center flex flex-col">
        <span>Environmental</span>
        <span className="text-2xl">{Math.trunc(props.d)}</span>
      </div>
      <div className="basis-1/5 text-center flex flex-col">
          <span>Social</span>
          <span className="text-2xl">{Math.trunc(props.e)}</span>
        </div>
        <div className="basis-1/5 text-center flex flex-col">
          <span>Governmental</span>
          <span className="text-2xl">{Math.trunc(props.f)}</span>
        </div>
    </div>
  );
};
