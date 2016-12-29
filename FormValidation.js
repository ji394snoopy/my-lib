var FormValidation = (function() {
    var checkSelect = function(val, min, max) {
        min = (/\d/).test(min) ? parseInt(min) : -Infinity;
        max = (/\d/).test(max) ? parseInt(max) : Infinity;
        if ((/\d/).test(parseInt(val)) && val >= min && val <= max) {
            return true;
        } else {
            return false;
        }
    }

    var checkEmptyString = function(val) {
            val = "" + val;
            if (val.length > 0) {
                return true;
            } else {
                return false;
            }
        }
        /*
         *@param format: String
         *-long yyyy/mm/dd T hr:min:sec
         *-short yyyy/mm/dd  ###default
         *@param mark :String
         *- '/'
         *- '-' ###default
         */
    var checkDate = function(val, mark, format) {
        mark = mark ? mark : '/';
        format = format ? format : 'short';
        switch (format) {
            case 'long':
                var str = '\\d{4}' + mark + '([1-9]|0[1-9]|1[1-2])' + mark + '([1-9]|0[1-9]|[1-2][0-9]|3[01])T([0-9]|0[0-9]|1[0-2]):([0-9]|[0-5][0-9]|60)';
                var reg = new RegExp(str);
                return reg.test(val);
                break;
            case 'short':
                var str = '\\d{4}' + mark + '([1-9]|0[1-9]|1[1-2])' + mark + '([1-9]|0[1-9]|[1-2][0-9]|3[01])';
                var reg = new RegExp(str);
                return reg.test(val);
                break;
            default:
                return false;
                break;
        }
    }

    var checkTel = function(val) {
        var str = '(\\d{10}|\\d{8})';
        var reg = new RegExp(str);
        return reg.test(val);
    }

    var checkIdNum = function(val) {
        var str = '([a-z]{1}|[A-Z]{1})(\\d{9})';
        var reg = new RegExp(str);
        return reg.test(val);
    }

    var checkCheckBox = function(arr, min, max) {
        min = (/\d/).test(min) ? parseInt(min) : -Infinity;
        max = (/\d/).test(max) ? parseInt(max) : Infinity;
        if (arr instanceof Array && arr.length >= min && arr.length <= max) {
            return true;
        } else {
            return false;
        }
    }

    return {
        checkEmptyString: checkEmptyString,
        checkDate: checkDate,
        checkSelect: checkSelect,
        checkCheckBox: checkCheckBox,
        checkIdNum: checkIdNum,
        checkTel: checkTel
    }
})();
