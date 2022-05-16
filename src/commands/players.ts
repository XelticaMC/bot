import { define } from "./define";
import fetch from 'node-fetch';

type Player = {
    uuid: string;
    displayName: string;
};

export default define('players', 'XelticaMCの参加プレイヤー一覧を返します。', async (args: string[]) => {
    try {
        const res = await fetch('https://api.craft.xeltica.work/v1/players').then(r => r.json()).then(r => r as Player[]);
        return `総数: ${res.length}\n${res.map(r => r.displayName).join(', ')}`;
    } catch(e) {
        console.error(e);
        return '取得失敗';
    }
});
