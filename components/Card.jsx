export const Card = (props) => {
  return (
      <div className={`w-full select-none cursor-pointer bg-white rounded-md flex flex-1 items-center p-4  transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow bg-gray-100 w-full ${props.className}`}>
        <div className="basis-1/5 pl-1">
          <div className="font-medium">{props.a}</div>
        </div>
        <div className="basis-1/5 text-center">{props.b}</div>
        <div className="basis-1/5 text-center">{props.c}</div>
        <div className="basis-1/5 text-center">{props.d}</div>
        <div className="basis-1/5 text-center">{props.e}</div>
        <div className="basis-1/5 text-center">{props.f}</div>
      </div>
  );
};
