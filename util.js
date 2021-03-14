module.exports = class dankUtil {

    static delay(amount) {
        return new Promise(resolve => setTimeout(resolve, amount));
    }
}