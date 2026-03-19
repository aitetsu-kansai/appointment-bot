// сборка

import { Bot } from "grammy";
import * as dotenv from "dotenv";
import { commonComposer } from "../modules/common/common.handler";

dotenv.config();
export const bot = new Bot(process.env.BOT_API_KEY || "");
bot.use(commonComposer);
