const crypto = require("crypto");
const algo = "aes-256-cbc";

const stringLen = (secret) => {
    let newSecret = '';
    if(secret.length > 32){
        newSecret = secret.substr(0,32);
        return newSecret;
    }else {
        newSecret = secret;
        for(let i = 0; i < 32 - secret.length; i++){
            newSecret += "$";
           
        }
        return newSecret;
    }
}

const encrypt = (password,secret) => {
    let key = stringLen(secret);
    let iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv(algo, Buffer.from(key), iv);
    let encrypted = cipher.update(password);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return  { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') }
}

const decrypt = (password, iv, secret) => {
    let key = stringLen(secret);
    let intrav = Buffer.from(iv, 'hex');
    let encryptedText = Buffer.from(password, 'hex');
    let decipher = crypto.createDecipheriv(algo, Buffer.from(key), intrav);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
module.exports = {encrypt,decrypt,};