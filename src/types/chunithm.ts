export type ChunithmSongDataCommonRaw = {
    id: string;
    release: string;
    new?: '' | '[NEW]';
    title: string;
    reading: string;
    artist: string;
    copyright1: string;
    image: string;
};

export type ChunithmSongDataNormalRaw = ChunithmSongDataCommonRaw & {
    catcode: ChunithmCategory;
    lev_bas: string;
    lev_adv: string;
    lev_exp: string;
    lev_mas: string;
};

export type ChunithmSongDataWorldsEndRaw = ChunithmSongDataCommonRaw & {
    catcode: 'WORLD\'S END';
    lev_we: string;
    we_tex: string;
};

export type ChunithmSongDataRaw = ChunithmSongDataNormalRaw | ChunithmSongDataWorldsEndRaw;

export type ChunithmCategory =
    | 'POPS＆ANIME'
    | 'niconico'
    | '東方Project'
    | 'VARIETY'
    | 'イロドリミドリ'
    | 'ゲキマイ'
    | 'ORIGINAL'
    ;

export type ChunithmSongDataCommon = {
    id: string;
    release: string;
    isNewSong: boolean;
    title: string;
    reading: string;
    artist: string;
    copyright: string;
    imageUrl: string;
};

export type ChunithmSongDataNormal = ChunithmSongDataCommon & {
    category: ChunithmCategory;
    basicLevel: number;
    advancedLevel: number;
    expertLevel: number;
    masterLevel: number;
    rawData: ChunithmSongDataNormalRaw;
};

export type ChunithmSongDataWorldsEnd = ChunithmSongDataCommon & {
    category: "WORLD'S END";
    worldsEndLevel: number;
    worldsEndLevelText: string;
    rawData: ChunithmSongDataWorldsEndRaw;
};

export type ChunithmSongData = ChunithmSongDataNormal | ChunithmSongDataWorldsEnd;

// World's Endのレベル文字列を数値表現のレベルに変換
export const convertWELevel = (level: string) => {
    return /☆{1,5}/.test(level) ? level.length : NaN;
};

// 表示用レベル文字列を数値表現のレベルに変換
export const convertLevel = (level: string) => {
    const l = parseInt(level);
    return level.endsWith('+') ? l + 0.5 : l;
};

// 数値表現のレベルを表示用レベル文字列に変換
export const convertLevelToString = (level: number) => {
    return Math.floor(level) + (level.toString().includes('.') ? '+' : '');
};

// API が返す生データを整形する
export const convert = (data: ChunithmSongDataRaw): ChunithmSongData => {
    if (data.catcode === 'WORLD\'S END') {
        return {
            id: data.id,
            release: data.release,
            isNewSong: data.new === '[NEW]',
            title: data.title,
            reading: data.reading,
            artist: data.artist,
            copyright: data.copyright1,
            imageUrl: data.image,
            category: 'WORLD\'S END',
            worldsEndLevel: convertWELevel(data.lev_we),
            worldsEndLevelText: data.we_tex,
            rawData: data,
        };
    } else {
        return {
            id: data.id,
            release: data.release,
            isNewSong: data.new === '[NEW]',
            title: data.title,
            reading: data.reading,
            artist: data.artist,
            copyright: data.copyright1,
            imageUrl: data.image,
            category: data.catcode,
            basicLevel: convertLevel(data.lev_bas),
            advancedLevel: convertLevel(data.lev_adv),
            expertLevel: convertLevel(data.lev_exp),
            masterLevel: convertLevel(data.lev_mas),
            rawData: data,
        };
    };
};

// API が返す生データを全て整形する
export const convertAll = (datas: ChunithmSongDataRaw[]): ChunithmSongData[] => datas.map(convert);