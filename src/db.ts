import fs from "fs";
import os from "os";
import path from "path";
import { Report } from "./types";

const homedir = os.homedir();
const home = process.env.HOME || homedir;
const dbPath = path.join(home, ".weekly-report");

export const read = (path = dbPath): Promise<Report[]> => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { flag: "a+" }, (error, data) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      let list;
      try {
        list = JSON.parse(data.toString());
      } catch (e) {
        list = [];
      }
      resolve(list);
    });
  });
};
export const write = (list: Report[], path = dbPath) => {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(list);
    fs.writeFile(path, data, (error) => {
      if (error) return reject(error);
      resolve("success");
    });
  });
};
