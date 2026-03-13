import { hydrate, HydrateFlavor } from '@grammyjs/hydrate'
import dotenv from 'dotenv'
import {
	Bot,
	Context,
	GrammyError,
	HttpError,
	InlineKeyboard,
	Keyboard,
} from 'grammy'
dotenv.config()

type MyContext = HydrateFlavor<Context>

const bot = new Bot<MyContext>(process.env.BOT_API_KEY || '')
bot.use(hydrate())

bot.api.setMyCommands([
	{ command: 'start', description: 'Starting a bot' },
	{ command: 'hello', description: 'Greeting from a bot' },
	{ command: 'like_or_not', description: 'Do you like it or not?' },
	{ command: 'inline_keyboard', description: 'SIU' },
]) //для создания меню команд в телеге

bot.command('start', async ctx => {
	await ctx.reply(
		'Hello! Here is my telegram channel -> <a href="https://t.me/cozycorner_cozyhome">Cozy Home</a>',
		{
			reply_parameters: { message_id: ctx.msg?.message_id },
			parse_mode: 'HTML',
		},
	)
})

bot.command(['hello', 'salam', 'hi'], async ctx => {
	await ctx.react('🖕')
	await ctx.reply(
		`Hello, your name is <span class="tg-spoiler">${ctx.from?.first_name}</span>, ins't it?`,
		{
			parse_mode: 'HTML',
		},
	)
})

bot.command('id', async ctx => {
	const userId = ctx.from?.id
	await ctx.reply(String(userId), { parse_mode: 'HTML' })
})

bot.command('like_or_not', async ctx => {
	const keyboard = new Keyboard()
		.text('Like 👍')
		.row()
		.text('Dislike 👎')
		.row()
		.resized()
		.oneTime()
	await ctx.reply('Do you like it or not?', {
		reply_markup: keyboard,
	})
})

bot.command('inline_keyboard', async ctx => {
	await ctx.reply('выбери цифру', { reply_markup: inlineKeyboard })
})

bot.callbackQuery('Like 👍', async ctx => {
	await ctx.reply('SIUUU')
})
bot.command('share', async ctx => {
	const keyboard = new Keyboard()
		.requestLocation('Location')
		.requestPoll('Poll')
		.requestContact('Contact')
		.resized()

	await ctx.reply('Pls share:', {
		reply_markup: keyboard,
	})
})

bot.hears('Like 👍', async ctx => {
	await ctx.reply('I am glad that you like it! 😊', {
		reply_markup: { remove_keyboard: true },
	})
})
bot.hears('Dislike 👎', async ctx => {
	await ctx.reply('Oh no! What can I do better? 😢')
})
//msg<==>message
bot.on('message:photo', async ctx => {
	await ctx.reply(`${ctx.msg.new_chat_photo}`)
})
bot.hears(['ping', 'PING', 'Ping'], async ctx => {
	await ctx.reply('pong')
})

bot.hears(/жесть/, async ctx => {
	await ctx.react('😈')
	await ctx.reply('Вот это да!')
})

const inlineKeyboard = new InlineKeyboard()
	.text('1', 'button-1')
	.text('2', 'button-2')
	.text('3', 'button-3')
	.url('😇vk', 'vk.com')

const menuKeyboard = new InlineKeyboard()
	.text('Узнать статус заказа', 'order-status')
	.text('Обратиться в поддержку', 'support')
const backKeyboard = new InlineKeyboard().text('< Назад в меню', 'back')

bot.command('menu', async ctx => {
	await.ctx.reply('выберите пункт меню', {reply_markup})
})

bot.on('callback_query:data', async ctx => {
	await ctx.reply(`ебать ты лох, зачем было нажимать ${ctx.callbackQuery.data}`)
	await ctx.answerCallbackQuery()
})

bot.catch(err => {
	const ctx: Context = err.ctx
	console.error('ERROR', ctx.update.update_id)
	const e = err.error

	if (e instanceof GrammyError) {
		console.error('Error in request: ', e.description)
	} else if (e instanceof HttpError) {
		console.error('Could not contact to Telegram servers: ', e)
	} else {
		console.log('Unknown error')
	}
})

bot.start()
