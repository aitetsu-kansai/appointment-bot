import { InlineKeyboard } from "grammy";

export const commonKeyboard = new InlineKeyboard()
  .text("🖋️ Записаться", "appointment")
  .row()
  .text("💼 Портфолио мастера", "portfolio")
  .row()
  .text("🗨️ Написать мастеру", "contactWithMaster")
  .row();
