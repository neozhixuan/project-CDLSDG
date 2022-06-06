export const StockLabel = (props) => {
  return (
    <a
      href="#"
      className="inline-block rounded-full text-blacktext-xs mr-1 md:mr-2 mb-2 px-2 md:px-4 py-1 "
    >
      {props.labelName}
    </a>
  );
};
