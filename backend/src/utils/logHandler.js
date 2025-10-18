import fs from "fs";
const fsPromises = fs.promises;
import { format } from "date-fns";
import path from "path";
import { v4 as uuid } from "uuid";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const logHandler = async (message, fileName) => {
    const dateTime = `${format(new Date(), "yyyy MM dd\tHH mm ss")}`;
    const data = `${dateTime}\t${uuid()}\t${message}\n`;
    const logDir = path.join(__dirname, '..', 'logs');
    try {
        if (!fs.existsSync(logDir)) {
            await fsPromises.mkdir(logDir);
        }
        await fsPromises.appendFile(path.join(logDir, fileName), data);
    } catch (err) {
        console.error("Something went wrong with logHandler");
    }
};


export default logHandler;