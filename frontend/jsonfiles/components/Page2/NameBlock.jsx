export const NameBlock = (props) => {
  return (
    <div className={`${props.className}`}>
      <div className="font-medium">{props.companyName}</div>
      <div className="text-gray-600 text-sm">
        {" "}
        <a
          href="#"
          className="inline-block rounded-full text-white 
                      bg-yellow-700
                      text-xs font-bold 
                      mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 "
        >
          {props.stockName}
        </a>{" "}
      </div>
    </div>
  );
};
