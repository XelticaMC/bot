export const getBotToken = () => process.env.BOT_TOKEN;
export const getTosChannel = () => process.env.TOS_CHANNEL;
export const getTosMcserverChannel = () => process.env.TOS_MCSERVER_CHANNEL;
export const getRoleChannel = () => process.env.ROLE_CHANNEL;
export const getCommandPrefix = () => process.env.COMMAND_PREFIX ?? '!';
export const getAdmins = () => (process.env.ADMINS ?? '').split(',');