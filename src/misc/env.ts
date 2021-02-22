export const getBotToken = () => process.env.BOT_TOKEN;
export const getTosChannel = () => process.env.TOS_CHANNEL;
export const getRoleChannel = () => process.env.ROLE_CHANNEL;
export const getSkinChannel = () => process.env.SKIN_CHANNEL;
export const getCommandPrefix = () => process.env.COMMAND_PREFIX ?? '!';
export const getAdmins = () => (process.env.ADMINS ?? '').split(',');
export const getSkinDestination = () => process.env.SKIN_DEST;