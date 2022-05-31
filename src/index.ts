import { write, read } from "./db";
import dayjs from "dayjs";
import { createTask, getWeeklyTasks } from "./task";
import { Report } from "./types";
import { printTable } from "console-table-printer";

export const add = async (title: string) => {
  const list = await read();
  const task = createTask(title, dayjs().unix());
  list.push(task);

  await write(list);
};

export const clear = async () => {
  await write([]);
};

export const showAll = async () => {
  const list = await read();
  printTaskUseTable(list);
};

export const showWeekly = async (fromList: boolean) => {
  const list = await read();
  const taskWeekly = getWeeklyTasks(list, dayjs());
  printTasks(taskWeekly, fromList);
};

export function printTasks(list: Report[], fromList: boolean) {
  if (list.length > 0) {
    if (fromList) {
      printTaskUseTable(list);
    } else {
      list.forEach((task) => {
        console.log(`- ${task.title}`);
      });
    }
  } else {
    console.log("暂无记录");
  }
}

export function printTaskUseTable(list: Report[]) {
  if (list.length === 0) {
    console.log("暂无记录");
    return;
  }
  const cloneList = JSON.parse(JSON.stringify(list));
  printTable(
    cloneList.map((i: Report) => {
      return {
        name: i.title,
        createAt: dayjs.unix(i.createAt).format("YYYY-MM-DD HH:mm:ss"),
        id: i.id,
      };
    })
  );
}
