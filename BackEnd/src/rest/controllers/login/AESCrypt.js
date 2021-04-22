const crypto = require('crypto');
const DEFINE = require('../constant/DEFINE');

exports.encrypt = (async (cryptkey, iv, cleardata) => {
    console.log('AESCrypt: encrypt');
    try {
        var cipher = crypto.createCipheriv('aes-256-cbc', cryptkey, iv);
        var crypted = cipher.update(cleardata, 'utf8', 'base64')
        crypted += cipher.final('base64')
        return crypted
    } catch (error) {
        console.log('encrypt error');
        throw new Error(error);
    }
});

exports.decrypt = (async (cryptkey, iv, encryptdata) => {
    console.log('AESCrypt: decrypt');
    try {
        var decipher = await crypto.createDecipheriv('aes-256-cbc', cryptkey, iv);
        var dec = await decipher.update(encryptdata, 'base64', 'utf8');
        dec += await decipher.final('utf8');
        return dec
    } catch (error) {
        console.log('decrypt error');
        throw new Error(error);
    }
});


exports.getHash = (async () => {
    console.log('AESCrypt: getHash');
    try {
        var hash = await crypto.createHash('sha256').update(DEFINE.AES_HASH_KEY).digest();
        return hash
    } catch (error) {
        console.log('getHash error');
        throw new Error(error);
    }
});

exports.getIv = (async () => {
    console.log('AESCrypt: getIv');
    try {
        iv = new Buffer.alloc(16);
        return iv
    } catch (error) {
        console.log('getIv error');
        throw new Error(error);
    }
});
