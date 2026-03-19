import { Composer, InputFile } from "grammy";
import { MASTER_INFO, SERVICES } from "../../config/constants";
import { commonKeyboard } from "./common.keyboard";

export const commonComposer = new Composer();

commonComposer.command("start", async (ctx) => {
  const message =
    `👋 Приветствую! Я - <b>${MASTER_INFO.name}</b>.\n` +
    `\n` +
    `🧑‍🏫 Занимаюсь такими видами услуг, как: <i>наращивание ресниц в разных вариантах, акцентирование бровей</i>, и другая хуйня.\n` +
    `\n` +
    `🚩 Приехать на приём можно по адресу: <i>${MASTER_INFO.addres}</i>.\n` +
    `\n` +
    `💬 Договариваться о приёме можно либо по номеру телефона: <i>${MASTER_INFO.phone}</i> \n` +
    `Либо нажав кнопочку <i>"Записаться"</i> ниже.`;

  const photoPath = "temp/ronnie.jpg";
  const inputFile = new InputFile(photoPath);

  await ctx.replyWithPhoto(inputFile, {
    caption: message,
    parse_mode: "HTML",
    reply_to_message_id: ctx.msg?.message_id,
    reply_markup: commonKeyboard,
  });
});
