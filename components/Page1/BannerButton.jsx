export var BannerButton = (props) => {
  return (
    <div className="flex flex-row justify-between mr-2 basis-1/2 select-none bg-white rounded-md items-center py-1 px-4 transform  hover:shadow ">
      <div className="px-10 py-0 sm:py-4 text-center text-sm lg:text-base">{props.text}</div>

      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 sm:py-2 px-4 rounded flex justify-center text-sm sm:text-base">
        {props.button}
      </button>
    </div>
  );
};
