export const Leaderboard = (props) => {
  return (
    <div className="rounded-md bg-white gap-y-4 grid grid-cols-6 grid-rows-2 items-center p-4 hover:shadow">
      <div className="col-span-6 flex flex-row justify-between">
        <span>Name</span>
        <span>Score</span>
        <span></span>
      </div>
      <div className="col-span-6 flex flex-row justify-between">
        <span>Name</span>
        <span>Score</span>
        <span></span>
      </div>
    </div>
  );
};
