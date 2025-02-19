import TELEGRAM_BOT from 'node-telegram-bot-api';
import { TELEGRAM_BOT_TOKEN } from './env';

if (!TELEGRAM_BOT_TOKEN) throw new Error('TELEGRAM_TOKEN does not exist');

const bot = new TELEGRAM_BOT(TELEGRAM_BOT_TOKEN, { polling: true });

export default bot;