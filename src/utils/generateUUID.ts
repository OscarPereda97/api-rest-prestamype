export function generateUUIDToTraceability(): string {
    const num = Math.floor((Math.random() * 1000000) + 1);
    const lettersA = generateRandomLetter();
    const lettersB = generateRandomLetter();
    return  `${lettersA}${num}${lettersB}`;
}

function generateRandomLetter():string{
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 2; i++) {
        result = result + (characters.charAt(Math.floor(Math.random() * characters.length)))
    }
    return result;
}