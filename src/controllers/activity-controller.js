import { Activity } from "../models/activity-model.js";
import { validateTime } from "../shared/validators.js";

export const createActivity = async (newActivity, next) => {
  const existingActivity = await Activity.findOne({
    date: newDate.date,
    startTime: { $lte: newDate.endTime },
    endTime: { $gte: newDate.startTime },
  });
  if (existingActivity) {
    throw new Error(next("BUSY_SESSION"));
  }

  const currentDate = new Date();
  const selectedDate = new Date(newDate.date);
  if (selectedDate < currentDate) {
    throw new Error(next("INVALID_DATE"));
  }

  const formattedStartTime = validateTime(newDate.startTime, next);
  const formattedEndTime = validateTime(newDate.endTime, next);
  if (formattedStartTime > formattedEndTime) {
    throw new Error(next("INVALID_TIME"));
  }

  const monitorMapping = {
    yoga: "658cbcb7d3796f800264a596",
    zumba: "658cbd51d3796f800264a599",
    spinning: "658cbd8dd3796f800264a59c",
    bodyCombat: "658cbdc0d3796f800264a59f",
  };
  const monitorId = monitorMapping[newActivity.type];
  newActivity.monitor = monitorId;

  const createdActivity = await Activity.create(newActivity);
  return createdActivity;
};
