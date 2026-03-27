import { InlineKeyboard } from "grammy";
import { MASTER_INFO } from "../../config/constants";

export const commonKeyboard = new InlineKeyboard()
  .text("🖋️ Записаться", "appointment")
  .row()
  .text("💼 Портфолио мастера", "portfolio")
  .row()
  .url("🗨️ Написать мастеру", MASTER_INFO.telegram)
  .row();
