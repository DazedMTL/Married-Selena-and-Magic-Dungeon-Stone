var Saba = Saba || {};
Saba.taikenban = false;

Utils.isOptionValid = function (name) {
    if (name == 'test') {
        return false;
    }
    return location.search.slice(1).split('&').contains(name);
};