/* 
| <設定分頁>
----------------------------- 
| 傳入長度後初始化 (length) -> refreshPage
| 更新頁籤btn的狀態active || disable (page) -> refreshData
| 新增頁籤後載入資料 (startindex)
*/ 
function initpage(l) {
    // l=得到幾筆資料

    var pages = 1,
        nav = $('.pagination'),
        appendstr = "";
    //append page
    if (l % row_in_page) {
        pages = parseInt(l / row_in_page) + 1;
    } else {
        pages = l / row_in_page;
    }
    appendstr += "<li class='disabled'><span aria-hidden='true'>&laquo;</span></li> ";
    appendstr += "<li class='active'><span>1</span></li> ";
    for (i = 2; i < pages + 1; i++) {
        appendstr += "<li><span>" + i + "</span></li> ";
    }
    appendstr += "<li "
    if (pages == 1) {
        appendstr += "class='disabled'";
    }
    appendstr += "><span aria-hidden='true'>&raquo;</span></li> ";
    nav.empty().append(appendstr);
    //refresh data from 1
    refreshData(1);

    //click func 
    $('.pagination li span').click(function() {
        var c = $(this).text();
        //console.log("page", c);
        var p = 0;
        var a = $('.pagination li.active span').text();
        if (c == a) {
            return 0;
        } else if (c == "»") {
            p = parseInt(a) + 1;
        } else if (c == "«") {
            p = parseInt(a) - 1;
        } else {
            p = parseInt(c);
        }
        //console.log("pass", p);
        refreshPage(p);
    });
}

function refreshPage(id) {
    var l = $('.pagination li').length;
    if (id == 0 || id == (l - 1)) {
        return 0;
    } else {
        $('.pagination li.active').removeClass('active');
        $('.pagination li.disabled').removeClass('disabled');
        $('.pagination li:nth-child(' + (id + 1) + ')').addClass('active');

        if (id == l - 2) {
            $('.pagination li:nth-child(' + (id + 2) + ')').addClass('disabled');
        } else if (id == 1) {
            $('.pagination li:nth-child(1)').addClass('disabled');
        }
    }
    refreshData((id - 1) * row_in_page + 1);
}

function refreshData(startdata) {
   
    var l = getresponsedata.length;
    var enddata = startdata + row_in_page - 1;
    if (enddata > l) {
        enddata = l;
    }
    // decode State
   
    for (i = (startdata - 1); i < enddata; i++) {
        
    }
    
}
