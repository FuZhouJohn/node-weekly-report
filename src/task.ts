import { printTable } from "console-table-printer";
import dayjs, { Dayjs } from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek.js";
import md5 from "md5";
import { Report } from "./types";

dayjs.extend(isoWeek);

export const createTask = (title: string, createAt: number) => {
  return { title, createAt, id: md5(title + createAt) };
};


export function getWeeklyTasks(list: Report[], today: Dayjs) {
  const taskWeekly = [];
  for (let i = list.length - 1; i >= 0; i--) {
    const task = list[i];
    const createAt = dayjs.unix(task.createAt);
    if (createAt.isBefore(today, "isoWeek")) {
      break;
    }
    taskWeekly.unshift(task);
  }
  return taskWeekly;
}

