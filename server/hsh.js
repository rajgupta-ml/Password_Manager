const bcrypt = require('bcrypt');
async function hashing(password){
    const salt = await bcrypt.genSalt();
    const hsh = await bcrypt.hash(password, salt);
    return hsh;
}

async function hashCompare(password,hash){
    const compare = await bcrypt.compare(password,hash)
    return compare
}

module.exports = {hashing, hashCompare,}; 