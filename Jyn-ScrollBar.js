/*
 *@param parent:String 外框dom selector(遮蔽原Scrollbar)
 *@param container :String 內容dom selector
 *@param bar: String auto append or Bar dom selector
 */
var jynScrollbar = (function() {
    var option = {
        fix: true,
        axis: 'y'
    }
    var _el = {
        scrollcontainer: null,
        scrollbar: null,
        scrollparent: null
    }

    var init = function(parent, container, bar) {
        _el.scrollcontainer = $(container);
        _el.scrollbar = $(bar);
        _el.scrollparent = $(parent);
        var H = _el.scrollcontainer.outerHeight(true), //外框高度
            sH = _el.scrollcontainer[0].scrollHeight, //內容高度
            sbH = H * H / sH; //bar 長度

        setStyle();

        /****
        設定bar 長度和drag event
        ****/
        _el.scrollbar.height(sbH).draggable({
            axis: option.axis,
            containment: parent,
            drag: function(e, ui) {
                _el.scrollcontainer.scrollTop(sH / (H - sbH) * ui.position.top);
            }
        });

        /****
        設定scroll event
         ****/

        _el.scrollcontainer.on('scroll', function() {
            var scrolltop = _el.scrollcontainer.scrollTop() >= sH - H ? sH - H : _el.scrollcontainer.scrollTop();
            _el.scrollbar.css({
                top: scrolltop * (H) / sH
            });
        });
    }

    function setStyle() {
        _el.scrollbar.css({
            'position': 'absolute',
            'overflow': 'auto',
            'top': '0px',
            'right': '0px',
            'z-index': '9999',
            'background': '#444',
            'width': '7px',
            'border-radius': '5px',
        });

        _el.scrollparent.css({
            'position': 'relative',
            'overflow': 'hidden'
        });

        _el.scrollcontainer.css({
            'position': 'absolute',
            'padding-right': '17px',
            'width': '100%',
        });

        switch (option.axis) {
            case 'y':
                _el.scrollcontainer.css({
                    'overflow-y': 'auto',
                });
                break;
            case 'x':
                _el.scrollcontainer.css({
                    'overflow-x': 'auto',
                });
                break;
            case 'xy':
                _el.scrollcontainer.css({
                    'overflow': 'auto',
                });
                break;
            default:
                console.log('error in option axis')
                hasErr('axis');
        }
    }

    function hasErr(err) {
        return false;
    }
    return {
        init: init
    };

})();
