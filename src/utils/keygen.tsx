// @ts-nocheck
export default function generateCode(length) {
    let result = "";
    const characters = '0123456789';
    for (let i = 0; i < length; i++) {
        result += characters[Math.floor(Math.random() * characters.length)];
    }

    result = result.match(/\d{1,4}/g).join("-");
    return result;
}