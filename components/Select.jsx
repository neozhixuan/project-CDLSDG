export const Select = (props) => {
  return (
    <p className="flex flex-row space-x-2">
      <span>{props.number}</span>
      <select
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full form-multiselect"
      >
        <option defaultValue>Choose a stock</option>
        {props.data.stocks.map((data,idx) => (
          <option key={idx} value={`${data.Code}`}>{data.Stock_Name}</option>
        ))}
        {/* <option value="APPL">APPL</option>
        <option value="TSLA">TSLA</option>
        <option value="AMZN">AMZN</option> */}
      </select>
      <input
        type="button"
        className="w-10 border border-gray-300"
        value="+"
        onClick={props.willAddItem}
      />
    </p>
  );
};
