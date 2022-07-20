export const NameBlock = (props) => {
  return (
    <div className={`${props.className}`}>
      <div className="font-medium text-base sm:text-xl text-center mt-1 mb-2">{props.companyName}</div>
      <div className="text-gray-600 text-sm">
        {" "}
        <a
          href="#"
          className="inline-block rounded-full text-white 
                      bg-yellow-700
                      text-xs font-bold 
                      mr-1 mb-2 px-1 sm:px-4 py-1 "
        >
          {props.stockName}
        </a>{" "}
      </div>
    </div>
  );
};
