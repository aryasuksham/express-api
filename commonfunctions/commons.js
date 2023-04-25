const bcrypt = require("bcrypt");




//---------Function for random string / generating username----------
function randomString(name, length) {
    let str = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789_$';
    const charactersLength = characters.length;

    for (let counter = 0; counter < length; counter++) {
        str += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const nameLength = name.length;
    const result = nameLength <= 3 ? (name + str).toLowerCase() : (name.slice(0, 3) + str).toLowerCase();

    return result;
}


//-----------------------Hashed Password-------------------------
const hashedPassword = (password) => {
    bcrypt.hash(password, 5)
        .then(hPassword => {
            return hPassword;
        })
}






module.exports = {
    randomString,
    hashedPassword
};
