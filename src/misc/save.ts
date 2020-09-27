import fs from 'fs';

export let savedata = {
    tosMessage: null as string | null,
};

export const save = () => {
    fs.writeFileSync('./save.json', JSON.stringify(savedata));
};

export const load = () => {
    savedata = JSON.parse(fs.readFileSync('./save.json').toString());
};