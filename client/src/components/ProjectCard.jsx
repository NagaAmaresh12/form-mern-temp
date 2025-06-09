import { Link } from "react-router-dom";
import { formatBudget } from "./FormatBudget";

export default function ProjectCard({
  id,
  projectTitle,
  projectBudget,
  projectExpenditure,
}) {
  console.log({
    id,
    projectTitle,
    projectBudget,
    projectExpenditure,
  });
  let spentedAmount = 0;
  projectExpenditure.map((expenditure) => {
    if (typeof expenditure.amount === "string") {
      expenditure.amount = parseFloat(expenditure.amount);
    }
    console.log("Expenditure Amount:", expenditure.amount);

    spentedAmount += expenditure.amount;
  });
  console.log({
    spentedAmount,
    projectBudget,
  });

  const remainingBudget = Number(projectBudget) - Number(spentedAmount);

  return (
    <Link
      to={`/projects/${id}`}
      className="w-[80vw] bg-white border border-zinc-900 space-y-8 rounded-lg p-4 my-4 hover:bg-zinc-100 transition-colors"
    >
      <h2 className="text-xl font-semibold">{projectTitle}</h2>
      <div className="w-full  lg:w-1/2 flex flex-col lg:flex-row  items-center lg:items-end  justify-start lg:justify-between  space-y-4 lg:space-x-4 ">
        <p className="font-medium flex items-center justify-between w-full text-md text-zinc-600   ">
          Total Budget:
          <span className=" border-green-500  ml-2 border-2 rounded-md p-1 text-white bg-green-500/80">
            ₹ {formatBudget(projectBudget)}
          </span>
        </p>
        <p className="font-medium flex items-center justify-between w-full  text-md text-zinc-600  ">
          Spent:
          <span className="border-yellow-500  ml-2 border-2 rounded-md p-1 text-white bg-yellow-500/80">
            ₹ {formatBudget(spentedAmount)}
          </span>
        </p>
        <p className="font-medium flex items-center justify-between  w-full text-md text-zinc-600  ">
          Remaining:
          <span className=" border-rose-500 ml-2  border-2 rounded-md p-1 text-white bg-rose-500/80 ">
            ₹ {formatBudget(remainingBudget)}
          </span>
        </p>
      </div>
    </Link>
  );
}
