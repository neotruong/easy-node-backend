import fs from "fs";
import path from "path";

const filePath = path.resolve("./users.json");

export function getUsers() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

export function saveUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}
