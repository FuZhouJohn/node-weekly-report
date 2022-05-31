import {write, read} from './db';
import dayjs from 'dayjs';
import {Report} from '../types';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

export const add = async (title: string) => {
    const list = await read();

    list.push({title, createAt: dayjs().unix()});

    await write(list);
};

export const clear = async () => {
    await write([]);
};

function printAllTasks(list: Report[]) {
    const taskWeekly = [];
    for (let i = list.length - 1; i >= 0; i--) {
        const task = list[i];
        const createAt = dayjs.unix(task.createAt);
        if (createAt.isBefore(dayjs(), 'isoWeek')) {
            break;
        }
        taskWeekly.unshift(`- ${task.title}`);
    }

    if (taskWeekly.length > 0) {
        taskWeekly.forEach(text => {
            console.log(text);
        });
    } else {
        console.log('暂无记录');
    }
}

export const showAll = async () => {
    const list = await read();
    printAllTasks(list);
};
