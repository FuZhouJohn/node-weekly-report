const dayjs = require("dayjs");
const md5 = require("md5");
const task = require("../src/task");

describe("task", () => {
  it("create", () => {
    const title = "123";
    const createAt = dayjs().unix();
    const id = md5(title + createAt);
    expect(task.createTask(title, createAt)).toEqual({
      title,
      createAt,
      id,
    });
  });

  it("getWeeklyTasks", () => {
    const today = dayjs("2022-06-05T00:00:00.000Z");
    const monday = dayjs("2022-05-30T00:00:00.000Z");
    const lastSunday = dayjs("2022-05-29T00:00:00.000Z");
    const data = [
      {
        title: "123",
        createAt: lastSunday.unix(),
        id: md5("123" + lastSunday.unix()),
      },
      {
        title: "456",
        createAt: monday.unix(),
        id: md5("456" + monday.unix()),
      },
    ];

    expect(task.getWeeklyTasks(data, today)).toEqual([
      {
        title: "456",
        createAt: monday.unix(),
        id: md5("456" + monday.unix()),
      },
    ]);
  });
});
