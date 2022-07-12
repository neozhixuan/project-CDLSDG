export const CardStats = (props) => {
  let value = props.stat;
  return (
    <div className="basis-1/5 text-center flex flex-col">
      <div className="text-gray-400 font-semibold">{props.name}</div>
      <span className="font-semibold">{typeof(props.stat) === "number" ? Math.trunc(value) : props.stat ? props.stat : 0}</span>
    </div>
  );
};
