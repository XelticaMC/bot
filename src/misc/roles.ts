export type RoleDefinition = {
    name: string,
    description?: string,
    snowflake?: string;
    emoji: string,
};

export const memberRole: RoleDefinition = {
    name: 'クラフター',
    emoji: '',
};

export const citizenRole: RoleDefinition = {
    name: '市民',
    emoji: '',
};

export const roles: RoleDefinition[] = [{
    name: 'Java版プレイヤー',
    emoji: '☕',
    description: 'Java版で遊んでいます'
}, {
    name: '統合版プレイヤー',
    emoji: '🎮',
    description: '統合版(BE)で遊んでいます'
}, {
    name: '鯖管',
    emoji: '🐟',
    description: 'サーバーを立てています'
}, {
    name: '建築士',
    emoji: '🏠',
    description: 'クリエイティブガチ勢'
}, {
    name: 'PvPer',
    emoji: '⚔️',
    description: 'PvP 大好き'
}, {
    name: 'モッダー',
    emoji: '🛠',
    description: 'MOD つくってます'
}, {
    name: 'データパッカー',
    emoji: '📦',
    description: 'データパックつくってます'
}, {
    name: 'リソースパッカー',
    emoji: '🎨',
    description: 'リソースパックつくってます'
}, {
    name: '赤石エンジニア',
    emoji: '🛑',
    description: 'レッドストーンなら任せろ'
}, {
    name: '鉄道エンジニア',
    emoji: '🚃',
    description: 'トロッコ鉄道なら任せろ'
}, {
    name: '初心者',
    emoji: '👶',
    description: 'マイクラおしえてください'
}, {
    name: '実況者',
    emoji: '📺',
    description: 'マイクラ実況者やってます'
}, ];