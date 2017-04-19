// $(function() {
//     zipSelector({
//         url: './json/jp_zip_code_json.json',
//         zip: '#zip',
//         el: ['#lev-1', '#lev-2', '#lev-3'],
//         placeholder: ['choose lev-1', 'choose lev-2', 'choose lev-3']
//     });
// });


var zipSelector = function(options) {
    //
    // options -->
    // url: 檔案位置
    // zip: zip selector
    // el: 選項selector
    // placeholder: 預留文字
    //
    var elZip = $(options.zip),
        elLevs = [],
        lev = 0,
        jsonData = {},
        selected = {};
    options.el.forEach(function(val, index, arr) {
        elLevs.push($(val));
    });
    options.placeholder.forEach(function(val, index, arr) {
        elLevs[index].html('<option value="">' + val + '</option>');
    });
    $.ajax({
        url: options.url,
        dataType: 'json'
    }).done(function(data) {
        jsonData = data;
        lev = data.level;
        renderOptions(elLevs[0], getCurrentName(jsonData.childNode), options.placeholder[0]);
    }).fail(function(jqXHR, textStatus) {
        console.log('error status: ' + textStatus);
    });
    elLevs.forEach(function(val, index, arr) {
        val.on('change', function() {
            var _thisVal = $(this).val(),
                nextIndex = index + 1;
            selected[('lev' + index)] = _thisVal;

            if (_thisVal || _thisVal == '0') {
                var elParent = [];
                for (var i = 0; i < index; i++) {
                    elParent.push(selected[('lev' + i)]);
                }
                elParent.push(_thisVal);
                if (index == arr.length - 1)
                    elZip.val(getData(jsonData, elParent, 'zip'));
                else
                    renderOptions(arr[nextIndex], getCurrentName(getData(jsonData, elParent, 'childNode')), options.placeholder[nextIndex]);
            } else {
                var elDel = [],
                    elDelPlaceholder = [];
                for (var i = arr.length - 1; i >= nextIndex; i--) {
                    elDel.push(arr[i]);
                    elDelPlaceholder.push(options.placeholder[i]);
                }
                deleteOptions(elDel, elDelPlaceholder);
                elZip.val('');
            }
        })
    });
}


function getData(json, query, last) {
    //(json,arr[string],string]
    var result = json;
    for (var i = 0; i < query.length; i++) {
        result = result.childNode[query[i]];
    }
    return result[last];
}

function getCurrentName(childs) {
    //(arr)
    var _arr = [];
    for (var i = 0; i < childs.length; i++) {
        _arr.push(childs[i].name);
    }
    return _arr;
}

function renderOptions(el, names, placeholder) {
    //(el, arr[string], string)
    var _str = '';
    _str += '<option value="">' + placeholder + '</option>';
    for (var i = 0; i < names.length; i++) {
        _str += '<option value=' + i + '>';
        _str += names[i];
        _str += '</option>';
    }
    el.html(_str);
}

function deleteOptions(el, placeholder) {
    //(arr[el], arr[string])
    for (var i = 0; i < el.length; i++) {
        el[i].html('<option value="">' + placeholder[i] + '</option>');
    }
}
