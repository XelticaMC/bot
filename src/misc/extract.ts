export const extractChannels = (text: string): string[] => (text.match(/<#(\d+)>/g) ?? []).map(t => (/<#(\d+)>/g.exec(t) ?? [])[1] ?? '');

export const extractMentions = (text: string): string[] => (text.match(/<@(\d+)>/g) ?? []).map(t => (/<#(\d+)>/g.exec(t) ?? [])[1] ?? '');