// src/features/projects/components/ProjectForm.jsx
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState, useMemo } from "react";
import { formatBudget } from "./FormatBudget";
import { useWatch } from "react-hook-form";
import { Label } from "./ui/label";
import {
  Building,
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  CalendarPlus,
  ClipboardList,
  Clipboard,
  Clock,
  FileText,
  Flag,
  HelpCircle,
  Home,
  Hourglass,
  IndianRupee,
  ListTodo,
  MapIcon,
  MapPin,
  Phone,
  PlayCircle,
  Sprout,
  User,
  UserCheck,
  Users,
  Wallet,
  ListChecks,
  CheckCircle,
  TrendingUp,
  Eye,
  StickyNote,
  DollarSign,
  PieChart,
  Edit,
  PlusCircle,
  Trash2,
  Clock10Icon,
  Users2,
} from "lucide-react";

const ProjectForm = ({
  watch,
  expenditureFields,
  appendExpenditure,
  removeExpenditure,
  onSubmit,
  register,
  errors,
  teamFields,
  appendTeam,
  removeTeam,
  activityFields,
  appendActivity,
  removeActivity,
  projectId,
  deleteProjectHandler,
  control,
}) => {
  const [activityFilter, setActivityFilter] = useState("");

  const watchedBudget = watch("projectBudget");
  const rawWatchedExpenditures = useWatch({
    control,
    name: "projectExpenditure",
  });
  const watchedExpenditures = useMemo(() => {
    return rawWatchedExpenditures || [];
  }, [rawWatchedExpenditures]);

  const role = useSelector((state) => state.auth.user.role);

  const isDisabled = role !== "admin";
  // Compute total spent using watched values
  const totalSpent = useMemo(() => {
    return watchedExpenditures.reduce(
      (sum, e) => sum + Number(e.amount || 0),
      0
    );
  }, [watchedExpenditures]);

  const remainingBudget = Number(watchedBudget || 0) - totalSpent;
  const filteredActivities = useMemo(() => {
    if (!activityFilter) return activityFields;
    return activityFields.filter(
      (activity) => activity.date === activityFilter
    );
  }, [activityFilter, activityFields]);

  return (
    <form
      onSubmit={onSubmit}
      className="p-6 space-y-4  bg-white rounded-md shadow-md border border-zinc-900 mt-10 "
    >
      <div className="flex lg:flex-row flex-col space-y-4 lg:space-y-0 lg:items-center lg:justify-between ">
        <h2 className="text-2xl font-semibold">Project Details</h2>
        <div className="flex  flex-col lg:flex-row h-40 lg:h-20 w-full lg:w-1/2  items-start lg:items-center justify-start lg:justify-center lg:space-x-4 ">
          {watchedBudget && (
            <p className="flex h-1/2 w-full justify-between items-center lg:justify-center gap-x-2    ">
              <Label>
                <DollarSign />
                Total Budget:
              </Label>
              <span className="border-2 bg-green-400/80 ml-4 font-bold border-green-400 rounded-md  px-2 py-2 flex  text-white">
                ₹ {formatBudget(watchedBudget)}
              </span>
            </p>
          )}
          {watchedBudget && watchedExpenditures.length > 0 && (
            <p className="flex h-1/2 w-full  justify-between items-center lg:justify-center gap-x-2  ">
              <Label>
                <PieChart />
                Remaining Budget:
              </Label>

              <span
                className={` ${
                  remainingBudget < 0
                    ? "bg-rose-400/60  border-rose-400"
                    : "bg-yellow-400/60  border-yellow-400"
                } border-2 ml-4 font-bold  rounded-md  px-2 py-2 flex  text-white`}
              >
                ₹ {formatBudget(remainingBudget)}
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Basic Fields */}
      <div className="space-y-4">
        <Label htmlFor="projectTitle" className={"text-zinc-600"}>
          <FileText />
          Title
        </Label>
        <Input
          id="projectTitle"
          {...register("projectTitle", { required: "Required" })}
          placeholder="Title"
          disabled={isDisabled}
        />
        {errors.projectTitle && (
          <p className="text-red-500">{errors.projectTitle.message}</p>
        )}
      </div>
      <div className="space-y-4">
        <Label htmlFor="projectSanctionedBy" className={"text-zinc-600"}>
          <Building />
          Sanctioned By
        </Label>
        <Input
          id="projectSanctionedBy"
          {...register("projectSanctionedBy", { required: true })}
          placeholder="Sanctioned By"
          disabled={isDisabled}
        />
        {errors.projectSanctionedBy && (
          <p className="text-red-500">{errors.projectSanctionedBy.message}</p>
        )}
      </div>
      <div className="space-y-4">
        <Label htmlFor="projectInspectingAuthority" className={"text-zinc-600"}>
          <UserCheck />
          Inspecting Authority
        </Label>
        <Input
          id="projectInspectingAuthority"
          {...register("projectInspectingAuthority", { required: true })}
          placeholder="Inspecting Authority"
          disabled={isDisabled}
        />
        {errors.projectInspectingAuthority && (
          <p className="text-red-500">
            {errors.projectInspectingAuthority.message}
          </p>
        )}
      </div>
      <div className="space-y-4">
        <Label htmlFor="projectLocation" className={"text-zinc-600"}>
          <MapPin />
          Project Location
        </Label>
        <Input
          id="projectLocation"
          {...register("projectLocation", { required: true })}
          placeholder="Location"
          disabled={isDisabled}
        />
        {errors.projectLocation && (
          <p className="text-red-500">{errors.projectLocation.message}</p>
        )}
      </div>
      <div className="space-y-4">
        <Label htmlFor="projectBudget" className={"text-zinc-600"}>
          <IndianRupee />
          Project Budget
        </Label>
        <Input
          id="projectBudget"
          type="number"
          {...register("projectBudget", {
            required: true,
            valueAsNumber: true,
          })}
          placeholder="Budget"
          disabled={isDisabled}
        />
        {errors.projectBudget && (
          <p className="text-red-500">{errors.projectBudget.message}</p>
        )}
      </div>

      {watchedBudget && (
        <p className="text-sm text-gray-600">≈ {formatBudget(watchedBudget)}</p>
      )}
      <div className="space-y-4">
        <Label className="text-xl font-medium ">
          {" "}
          <PlayCircle />
          Commencement Date
        </Label>

        <Input
          type="date"
          className="w-full lg:w-[11vw]"
          {...register("projectCommencementDate", { required: true })}
          disabled={isDisabled}
        />
        {errors.projectCommencementDate && (
          <p className="text-red-500">
            {errors.projectCommencementDate.message}
          </p>
        )}
      </div>
      {/* Start/End Dates */}
      <div className="space-y-4">
        <Label className="text-xl font-medium">
          <Clock10Icon />
          Project Duration
        </Label>
        <div className="flex flex-col lg:flex-row  lg:items-center items-between  space-y-4 lg:space-y-0 lg:px-4 py-2 rounded-md justify-between space-x-0 lg:space-x-4">
          <div className="flex flex-col lg:flex-row items-center justify-between lg:items-center lg:justify-center gap-2">
            <span className="lg:w-[10vw] gap-4 w-full  flex">
              <CalendarPlus />
              Start-Date:
            </span>

            <Input
              type="date"
              className="w-full  lg:w-[11vw]"
              defaultValue={watch("projectStartDate") || ""}
              {...register("projectStartDate", { required: true })}
              disabled={isDisabled}
            />
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-between lg:items-center lg:justify-center gap-2">
            <span className="lg:w-[10vw] gap-4 w-full  flex">
              {" "}
              <CalendarCheck />
              End-Date:{" "}
            </span>

            <Input
              type="date"
              className="w-full lg:w-[11vw]"
              value={watch("projectEndDate") || ""}
              {...register("projectEndDate", { required: true })}
              disabled={isDisabled}
            />
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="space-y-4">
        <Label className="text-xl font-medium">
          <Users2 />
          Team Members
        </Label>
        {teamFields.map((fld, i) => (
          <div key={fld.id} className="space-y-4 border p-3 rounded-md">
            <div className="flex items-center justify-between space-x-4">
              <div className="space-y-4 w-full">
                <Label htmlFor={`firstName-${i}`} className={"text-zinc-600"}>
                  <User />
                  First Name
                </Label>
                <Input
                  id={`firstName-${i}`}
                  {...register(`projectTeamDetails.${i}.firstName`, {
                    required: true,
                  })}
                  placeholder="First Name"
                  disabled={isDisabled}
                />
                {errors.projectTeamDetails?.[i]?.firstName && (
                  <p className="text-red-500">
                    {errors.projectTeamDetails[i]?.firstName?.message}
                  </p>
                )}
              </div>
              <div className="space-y-4 w-full">
                <Label htmlFor={`lastName-${i}`} className={"text-zinc-600"}>
                  Last Name
                </Label>
                <Input
                  id={`lastName-${i}`}
                  {...register(`projectTeamDetails.${i}.lastName`, {
                    required: true,
                  })}
                  placeholder="Last Name"
                  disabled={isDisabled}
                />
                {errors.projectTeamDetails?.[i]?.lastName && (
                  <p className="text-red-500">
                    {errors.projectTeamDetails[i]?.lastName?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <div className="space-y-4 w-full">
                <Label
                  htmlFor={`contactNumber-${i}`}
                  className={"text-zinc-600"}
                >
                  <Phone />
                  Contact
                </Label>
                <Input
                  id={`contactNumber-${i}`}
                  type={"text"}
                  {...register(`projectTeamDetails.${i}.contactNumber`, {
                    required: true,
                  })}
                  placeholder="Contact No."
                  disabled={isDisabled}
                />
                {errors.projectTeamDetails?.[i]?.contactNumber && (
                  <p className="text-red-500">
                    {errors.projectTeamDetails[i]?.contactNumber?.message}
                  </p>
                )}
              </div>
              <div className="space-y-4 w-full">
                <Label htmlFor={`headQtrs-${i}`} className={"text-zinc-600"}>
                  <MapIcon />
                  headQtrs
                </Label>
                <Input
                  id={`headQtrs-${i}`}
                  type={"text"}
                  {...register(`projectTeamDetails.${i}.headQtrs`, {
                    required: true,
                  })}
                  placeholder="HQ"
                  disabled={isDisabled}
                />
                {errors.projectTeamDetails?.[i]?.headQtrs && (
                  <p className="text-red-500">
                    {errors.projectTeamDetails[i]?.headQtrs?.message}
                  </p>
                )}
              </div>
            </div>

            {!isDisabled && (
              <Button
                type="button"
                variant="outline"
                onClick={() => removeTeam(i)}
                className={"border-4 border-red-500 bg-red-500/80 text-white"}
              >
                Remove
              </Button>
            )}
          </div>
        ))}
        {!isDisabled && (
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              appendTeam({
                firstName: "",
                lastName: "",
                contactNumber: "",
                headQtrs: "",
              })
            }
            className={"border-4 border-sky-500 bg-sky-500/80 text-white"}
          >
            + Add
          </Button>
        )}
      </div>

      {/* Objectives, Duration, Commencement */}
      <div className="space-y-4">
        <Label htmlFor="projectObjectives" className={"text-zinc-600"}>
          <Flag />
          Objectives
        </Label>
        <Textarea
          id="projectObjectives"
          {...register("projectObjectives", { required: true })}
          placeholder="Objectives"
          disabled={isDisabled}
        />
        {errors.projectObjectives && (
          <p className="text-red-500">{errors.projectObjectives.message}</p>
        )}
      </div>
      <div className="space-y-4">
        <Label htmlFor="projectDuration" className={"text-zinc-600"}>
          <Hourglass />
          Duration
        </Label>
        <Input
          id="projectDuration"
          {...register("projectDuration", { required: true })}
          placeholder="Duration"
          disabled={isDisabled}
        />
        {errors.projectDuration && (
          <p className="text-red-500">{errors.projectDuration.message}</p>
        )}
      </div>

      {/* Activities */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-xl font-medium">
            <ListTodo />
            Activities
          </Label>
          <div className="flex items-center gap-2">
            <Label className={"hidden lg:block"}>Filter:</Label>
            <Input
              type="date"
              className="w-full lg:w-[11vw]"
              value={activityFilter}
              onChange={(e) => setActivityFilter(e.target.value)}
            />
          </div>
        </div>
        {filteredActivities.map((fld, i) => (
          <div key={fld.id} className="space-y-4 border p-3 rounded-md">
            <div className="space-y-4">
              <Label htmlFor={`name-${i}`} className={"text-zinc-600"}>
                <Clipboard />
                Name
              </Label>
              <Input
                id={`name-${i}`}
                {...register(`projectActivities.${i}.name`, { required: true })}
                placeholder="Name"
                disabled={isDisabled}
              />
              {errors.projectActivities?.[i]?.name && (
                <p className="text-red-500">
                  {errors.projectActivities[i]?.name?.message}
                </p>
              )}
            </div>
            <div className="space-y-4">
              <Label
                htmlFor={`daywiseWorkProgress-${i}`}
                className={"text-zinc-600"}
              >
                <ListChecks />
                Day wise Work Progress
              </Label>
              <Input
                id={`daywiseWorkProgress-${i}`}
                {...register(`projectActivities.${i}.daywiseWorkProgress`, {
                  required: true,
                })}
                placeholder="Progress"
                disabled={isDisabled}
              />
              {errors.projectActivities?.[i]?.daywiseWorkProgress && (
                <p className="text-red-500">
                  {errors.projectActivities[i]?.daywiseWorkProgress?.message}
                </p>
              )}
            </div>
            <div className="space-y-4">
              <Label htmlFor={`placeOfVisit-${i}`} className={"text-zinc-600"}>
                <MapPin />
                Place of Visit
              </Label>
              <Input
                id={`placeOfVisit-${i}`}
                {...register(`projectActivities.${i}.placeOfVisit`, {
                  required: true,
                })}
                placeholder="Place of Visit"
                disabled={isDisabled}
              />
              {errors.projectActivities?.[i]?.placeOfVisit && (
                <p className="text-red-500">
                  {errors.projectActivities[i]?.placeOfVisit?.message}
                </p>
              )}
            </div>
            <div className="space-y-4">
              <Label htmlFor={`actionTaken-${i}`} className={"text-zinc-600"}>
                <CheckCircle />
                Action Taken
              </Label>
              <Input
                id={`actionTaken-${i}`}
                {...register(`projectActivities.${i}.actionTaken`, {
                  required: true,
                })}
                placeholder="Action Taken"
                disabled={isDisabled}
              />
              {errors.projectActivities?.[i]?.placeOfVisit && (
                <p className="text-red-500">
                  {errors.projectActivities[i]?.placeOfVisit?.message}
                </p>
              )}
            </div>
            <div className="space-y-4">
              <Label htmlFor={`date-${i}`} className={"text-zinc-600"}>
                <CalendarClock />
                Date
              </Label>
              <Input
                id={`date-${i}`}
                type="date"
                className="w-full lg:w-[11vw]"
                {...register(`projectActivities.${i}.date`, { required: true })}
                disabled={isDisabled}
              />
              {errors.projectActivities?.[i]?.date && (
                <p className="text-red-500">
                  {errors.projectActivities[i]?.date?.message}
                </p>
              )}
            </div>
            <div className="space-y-4">
              <Label htmlFor={`actionImpact-${i}`} className={"text-zinc-600"}>
                <TrendingUp />
                Action Impact
              </Label>
              <Input
                id={`actionImpact-${i}`}
                {...register(`projectActivities.${i}.actionImpact`, {
                  required: true,
                })}
                placeholder="Impact"
                disabled={isDisabled}
              />
              {errors.projectActivities?.[i]?.actionImpact && (
                <p className="text-red-500">
                  {errors.projectActivities[i]?.actionImpact?.message}
                </p>
              )}
            </div>
            <div className="space-y-4">
              <Label
                htmlFor={`programAttendance-${i}`}
                className={"text-zinc-600"}
              >
                <Users />
                Program Attendance
              </Label>
              <Input
                id={`programAttendance-${i}`}
                {...register(`projectActivities.${i}.programAttendance`, {
                  required: true,
                })}
                placeholder="Attendance"
                disabled={isDisabled}
              />
              {errors.projectActivities?.[i]?.programAttendance && (
                <p className="text-red-500">
                  {errors.projectActivities[i]?.programAttendance?.message}
                </p>
              )}
            </div>
            <div className="space-y-4">
              <Label htmlFor={`observations-${i}`} className={"text-zinc-600"}>
                <StickyNote />
                Observations
              </Label>
              <Input
                id={`observations-${i}`}
                {...register(`projectActivities.${i}.observations`, {
                  required: true,
                })}
                placeholder="Observations"
                disabled={isDisabled}
              />
              {errors.projectActivities?.[i]?.observations && (
                <p className="text-red-500">
                  {errors.projectActivities[i]?.observations?.message}
                </p>
              )}
            </div>

            {!isDisabled && (
              <Button
                type="button"
                variant="outline"
                onClick={() => removeActivity(i)}
                className={"border-4 border-red-500 bg-red-500/80 text-white"}
              >
                Remove
              </Button>
            )}
          </div>
        ))}
        {!isDisabled && (
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              appendActivity({
                name: "",
                date: "",
                daywiseWorkProgress: "",
                placeOfVisit: "",
                actionTaken: "",
                actionImpact: "",
                programAttendance: "",
                observations: "",
              })
            }
            className={"border-4 border-sky-500 bg-sky-500/80 text-white"}
          >
            + Add
          </Button>
        )}
        {activityFields.length === 0 && (
          <p className="text-gray-500">No activities added yet.</p>
        )}
      </div>

      {/* Range Coverage */}
      <h3 className="text-xl font-medium">Range Coverage</h3>
      <div className="space-y-4">
        <Label htmlFor="numberOfVillages" className={"text-zinc-600"}>
          <Home />
          No. of Villagers
        </Label>
        <Input
          id="numberOfVillages"
          type="number"
          {...register("projectRangeCoverage.numberOfVillages", {
            required: true,
          })}
          placeholder="Villages"
          disabled={isDisabled}
        />
        {errors.projectRangeCoverage?.numberOfVillages && (
          <p className="text-red-500">
            {errors.projectRangeCoverage.numberOfVillages.message}
          </p>
        )}
      </div>
      <div className="space-y-4">
        <Label htmlFor="totalPopulation" className={"text-zinc-600"}>
          <Users />
          Total Population
        </Label>
        <Input
          id="totalPopulation"
          type="number"
          {...register("projectRangeCoverage.totalPopulation", {
            required: true,
          })}
          placeholder="Population"
          disabled={isDisabled}
        />
        {errors.projectRangeCoverage?.totalPopulation && (
          <p className="text-red-500">
            {errors.projectRangeCoverage.totalPopulation.message}
          </p>
        )}
      </div>
      <div className="space-y-4">
        <Label htmlFor="numberOfFarmers" className={"text-zinc-600"}>
          <Sprout />
          No.of Farmers
        </Label>
        <Input
          id="numberOfFarmers"
          type="number"
          {...register("projectRangeCoverage.numberOfFarmers", {
            required: true,
          })}
          placeholder="Farmers"
          disabled={isDisabled}
        />
        {errors.projectRangeCoverage?.numberOfFarmers && (
          <p className="text-red-500">
            {errors.projectRangeCoverage.numberOfFarmers.message}
          </p>
        )}
      </div>

      {/* Support & Pending */}
      <div className="space-y-4">
        <Label htmlFor="requiredSupportFromHO" className={"text-zinc-600"}>
          <HelpCircle />
          Required Suppoert From HQ
        </Label>
        <Textarea
          id="requiredSupportFromHO"
          {...register("requiredSupportFromHO", { required: true })}
          placeholder="Support from HO"
          disabled={isDisabled}
        />
        {errors.requiredSupportFromHO && (
          <p className="text-red-500">{errors.requiredSupportFromHO.message}</p>
        )}
      </div>
      <div className="space-y-4">
        <Label htmlFor="pendingWorks" className={"text-zinc-600"}>
          <ListTodo />
          Pending Works
        </Label>
        <Textarea
          id="pendingWorks"
          {...register("pendingWorks", { required: true })}
          placeholder="Pending Works"
          disabled={isDisabled}
        />
        {errors.pendingWorks && (
          <p className="text-red-500">{errors.pendingWorks.message}</p>
        )}
      </div>

      {/* ———————————————— EXPENDITURES (FIXED) ———————————————— */}
      <div className="space-y-4">
        <h3 className="text-xl font-medium">Expenditures</h3>

        {/* ⬇️ Iterate over `expenditureFields` prop, not expenditureFields ⬇️ */}
        {(expenditureFields || []).map((field, i) => (
          <div key={field.id} className="space-y-4 border p-3 rounded-md">
            <div className="space-y-4">
              <Label
                htmlFor={`description-${field.id}`}
                className={"text-zinc-600"}
              >
                <ClipboardList />
                Description
              </Label>
              <Input
                id={`description-${field.id}`}
                {...register(`projectExpenditure.${i}.description`, {
                  required: "Required",
                })}
                placeholder="Description"
                disabled={isDisabled}
              />
              {errors.projectExpenditure?.[i]?.description && (
                <p className="text-red-500">
                  {errors.projectExpenditure[i]?.description?.message}
                </p>
              )}
            </div>
            <div className="space-y-4">
              <Label htmlFor={`amount-${field.id}`} className={"text-zinc-600"}>
                <Wallet />
                Amount
              </Label>
              <Input
                id={`amount-${field.id}`}
                type="number"
                {...register(`projectExpenditure.${i}.amount`, {
                  required: "Required",
                })}
                placeholder="Amount"
                disabled={isDisabled}
              />
              {field.amount && (
                <p className="text-sm text-gray-600">
                  {formatBudget(field.amount)}
                </p>
              )}
              {errors.projectExpenditure?.[i]?.amount && (
                <p className="text-red-500">
                  {errors.projectExpenditure[i]?.amount?.message}
                </p>
              )}
            </div>
            <div className="space-y-4">
              <Label htmlFor={`date-${field.id}`} className={"text-zinc-600"}>
                <CalendarDays />
                Date
              </Label>
              <Input
                id={`date-${field.id}`}
                type="date"
                className="w-full lg:w-[11vw]"
                {...register(`projectExpenditure.${i}.date`, {
                  required: "Required",
                })}
                disabled={isDisabled}
              />
              {errors.projectExpenditure?.[i]?.date && (
                <p className="text-red-500">
                  {errors.projectExpenditure[i]?.date?.message}
                </p>
              )}
            </div>

            {!isDisabled && (
              <Button
                type="button"
                variant="outline"
                onClick={() => removeExpenditure(i)}
                className={"border-4 border-red-500 bg-red-500/80 text-white"}
              >
                Remove
              </Button>
            )}
          </div>
        ))}

        {!isDisabled && (
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              appendExpenditure({ description: "", amount: "", date: "" });
              console.log("Adding new expenditure");
            }}
            className={"border-4 border-sky-500 bg-sky-500/80 text-white"}
          >
            + Add Expenditure
          </Button>
        )}
      </div>
      <div className="flex  flex-col lg:flex-row h-40 lg:h-20 w-full lg:w-1/2  items-start lg:items-center justify-start lg:justify-center lg:space-x-4 ">
        {watchedBudget && (
          <p className="flex h-1/2 w-full justify-between items-center lg:justify-center gap-x-2    ">
            <Label>
              <DollarSign />
              Total Budget:
            </Label>
            <span className="border-2 bg-green-400/80 ml-4 font-bold border-green-400 rounded-md  px-2 py-2 flex  text-white">
              ₹ {formatBudget(watchedBudget)}
            </span>
          </p>
        )}
        {watchedBudget && watchedExpenditures.length > 0 && (
          <p className="flex h-1/2 w-full  justify-between items-center lg:justify-center gap-x-2  ">
            <Label>
              <PieChart />
              Remaining Budget:
            </Label>

            <span
              className={` ${
                remainingBudget < 0
                  ? "bg-rose-400/60  border-rose-400"
                  : "bg-yellow-400/60  border-yellow-400"
              } border-2 ml-4 font-bold  rounded-md  px-2 py-2 flex  text-white`}
            >
              ₹ {formatBudget(remainingBudget)}
            </span>
          </p>
        )}
      </div>
      {/* Budget summary recap */}
      {/* {watchedBudget && watchedExpenditures && (
        <p className="w-1/3 flex items-center justify-start gap-x-4 ">
          <div className="flex items-center justify-between gap-x-2">
            <DollarSign />
            <Label>Total Budget:</Label>
          </div>

          <span className="border-2 text-sm bg-green-400/80 font-bold border-green-400 rounded-md px-2 py-2 text-white">
            ₹ {formatBudget(watchedBudget)}
          </span>
        </p>
      )}
      {watchedBudget && (
        <p className="w-1/3 flex items-center justify-start gap-x-2 ">
          <PieChart />
          <Label htmlFor="">Remaining Budget:</Label>
          <span
            className={`text-sm ${
              remainingBudget < 0
                ? "bg-rose-400/80 border-2 border-rose-400"
                : "bg-yellow-400/80 border-2 border-yellow-400"
            } px-2 py-2 rounded-md text-white font-bold tracking-wider`}
          >
            ₹ {formatBudget(remainingBudget)}
          </span>
        </p>
      )} */}

      {/* Actions */}
      <div className="flex justify-end gap-4">
        {projectId && !isDisabled && (
          <Button
            type="button"
            variant="outline"
            onClick={deleteProjectHandler}
            className={"bg-red-500/60 text-white border-2 border-red-500"}
          >
            <Trash2 />
            Delete
          </Button>
        )}
        {!isDisabled && (
          <Button
            variant={"outline"}
            type="submit"
            className={"border-2 border-sky-500 bg-sky-500/60 text-white"}
          >
            {projectId ? <Edit /> : <PlusCircle />}
            {projectId ? "Update" : "Create"}
          </Button>
        )}
      </div>
    </form>
  );
};

export default React.memo(ProjectForm);
