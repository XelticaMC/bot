import dotenv from 'dotenv';
dotenv.config();

export const getBotToken = () => process.env.BOT_TOKEN;
export const getTosChannel = () => process.env.TOS_CHANNEL;
export const getTosMcserverChannel = () => process.env.TOS_MCSERVER_CHANNEL;
export const getRoleChannel = () => process.env.ROLE_CHANNEL;
export const getClubChannel = () => process.env.CLUB_CHANNEL;
export const getSkinChannel = () => process.env.SKIN_CHANNEL;
export const getGameChatChannel = () => process.env.GAME_CHAT_CHANNEL;
export const getConsoleChannel = () => process.env.CONSOLE_CHANNEL;
export const getTodoChannel = () => process.env.TODO_CHANNEL;
export const getCommandPrefix = () => process.env.COMMAND_PREFIX ?? '!';
export const getAdmins = () => (process.env.ADMINS ?? '').split(',');
export const getSkinDestination = () => process.env.SKIN_DEST;