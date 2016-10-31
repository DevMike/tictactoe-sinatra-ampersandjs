(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        if (typeof root === 'undefined' || root !== Object(root)) {
            throw new Error('templatizer: window does not exist or is not an object');
        }
        root.templatizer = factory();
    }
}(this, function () {
    var jade=function(){function n(n){return null!=n&&""!==n}function t(e){return(Array.isArray(e)?e.map(t):e&&"object"==typeof e?Object.keys(e).filter(function(n){return e[n]}):[e]).filter(n).join(" ")}function e(n){return i[n]||n}function r(n){var t=String(n).replace(o,e);return t===""+n?n:t}var a={};a.merge=function s(t,e){if(1===arguments.length){for(var r=t[0],a=1;a<t.length;a++)r=s(r,t[a]);return r}var i=t["class"],o=e["class"];(i||o)&&(i=i||[],o=o||[],Array.isArray(i)||(i=[i]),Array.isArray(o)||(o=[o]),t["class"]=i.concat(o).filter(n));for(var f in e)"class"!=f&&(t[f]=e[f]);return t},a.joinClasses=t,a.cls=function(n,e){for(var r=[],i=0;i<n.length;i++)e&&e[i]?r.push(a.escape(t([n[i]]))):r.push(t(n[i]));var o=t(r);return o.length?' class="'+o+'"':""},a.style=function(n){return n&&"object"==typeof n?Object.keys(n).map(function(t){return t+":"+n[t]}).join(";"):n},a.attr=function(n,t,e,r){return"style"===n&&(t=a.style(t)),"boolean"==typeof t||null==t?t?" "+(r?n:n+'="'+n+'"'):"":0==n.indexOf("data")&&"string"!=typeof t?(-1!==JSON.stringify(t).indexOf("&")&&console.warn("Since Jade 2.0.0, ampersands (`&`) in data attributes will be escaped to `&amp;`"),t&&"function"==typeof t.toISOString&&console.warn("Jade will eliminate the double quotes around dates in ISO form after 2.0.0")," "+n+"='"+JSON.stringify(t).replace(/'/g,"&apos;")+"'"):e?(t&&"function"==typeof t.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+n+'="'+a.escape(t)+'"'):(t&&"function"==typeof t.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+n+'="'+t+'"')},a.attrs=function(n,e){var r=[],i=Object.keys(n);if(i.length)for(var o=0;o<i.length;++o){var s=i[o],f=n[s];"class"==s?(f=t(f))&&r.push(" "+s+'="'+f+'"'):r.push(a.attr(s,f,!1,e))}return r.join("")};var i={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"},o=/[&<>"]/g;return a.escape=r,a.rethrow=function f(n,t,e,r){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&t||r))throw n.message+=" on line "+e,n;try{r=r||require("fs").readFileSync(t,"utf8")}catch(a){f(n,null,e)}var i=3,o=r.split("\n"),s=Math.max(e-i,0),l=Math.min(o.length,e+i),i=o.slice(s,l).map(function(n,t){var r=t+s+1;return(r==e?"  > ":"    ")+r+"| "+n}).join("\n");throw n.path=t,n.message=(t||"Jade")+":"+e+"\n"+i+"\n\n"+n.message,n},a.DebugItem=function(n,t){this.lineno=n,this.filename=t},a}(); 

    var templatizer = {};
    templatizer["includes"] = {};
    templatizer["pages"] = {};

    // body.jade compiled template
    templatizer["body"] = function tmpl_body() {
        return '<body><nav class="navbar navbar-default"><div class="container-fluid"><div class="navbar-header"><a href="/" class="navbar-brand">TicTacToe</a></div></div></nav><div class="container"><main data-hook="page-container"></main></div></body>';
    };

    // head.jade compiled template
    templatizer["head"] = function tmpl_head() {
        return '<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0"/><meta name="apple-mobile-web-app-capable" content="yes"/>';
    };

    // includes/formInput.jade compiled template
    templatizer["includes"]["formInput"] = function tmpl_includes_formInput() {
        return '<div class="form-group"><label data-hook="label"></label><div data-hook="message-container"><div data-hook="message-text" class="alert alert-danger"></div></div><input class="form-control"/></div>';
    };

    // includes/player.jade compiled template
    templatizer["includes"]["player"] = function tmpl_includes_player() {
        return '<table class="table-bordered leadership"><tr><td><span data-hook="name"></span></td><td><span data-hook="wins"></span></td><td><span data-hook="draws"></span></td><td><span data-hook="looses"></span></td></tr></table>';
    };

    // pages/game.jade compiled template
    templatizer["pages"]["game"] = function tmpl_pages_game(locals) {
        var buf = [];
        var jade_mixins = {};
        var jade_interp;
        var locals_for_with = locals || {};
        (function(undefined) {
            buf.push('<section class="page"><h2 data-hook="brief" class="text-center"></h2><section class="page"><table class="table-bordered game"><tbody>');
            (function() {
                var $obj = [ 0, 1, 2 ];
                if ("number" == typeof $obj.length) {
                    for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                        var y = $obj[$index];
                        buf.push("<tr>");
                        (function() {
                            var $obj = [ 0, 1, 2 ];
                            if ("number" == typeof $obj.length) {
                                for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                                    var x = $obj[$index];
                                    buf.push('<td data-hook="move"' + jade.attr("data-y", y, true, false) + jade.attr("data-x", x, true, false) + ' class="empty text-center"></td>');
                                }
                            } else {
                                var $l = 0;
                                for (var $index in $obj) {
                                    $l++;
                                    var x = $obj[$index];
                                    buf.push('<td data-hook="move"' + jade.attr("data-y", y, true, false) + jade.attr("data-x", x, true, false) + ' class="empty text-center"></td>');
                                }
                            }
                        }).call(this);
                        buf.push("</tr>");
                    }
                } else {
                    var $l = 0;
                    for (var $index in $obj) {
                        $l++;
                        var y = $obj[$index];
                        buf.push("<tr>");
                        (function() {
                            var $obj = [ 0, 1, 2 ];
                            if ("number" == typeof $obj.length) {
                                for (var $index = 0, $l = $obj.length; $index < $l; $index++) {
                                    var x = $obj[$index];
                                    buf.push('<td data-hook="move"' + jade.attr("data-y", y, true, false) + jade.attr("data-x", x, true, false) + ' class="empty text-center"></td>');
                                }
                            } else {
                                var $l = 0;
                                for (var $index in $obj) {
                                    $l++;
                                    var x = $obj[$index];
                                    buf.push('<td data-hook="move"' + jade.attr("data-y", y, true, false) + jade.attr("data-x", x, true, false) + ' class="empty text-center"></td>');
                                }
                            }
                        }).call(this);
                        buf.push("</tr>");
                    }
                }
            }).call(this);
            buf.push("</tbody></table></section></section>");
        }).call(this, "undefined" in locals_for_with ? locals_for_with.undefined : typeof undefined !== "undefined" ? undefined : undefined);
        return buf.join("");
    };

    // pages/home.jade compiled template
    templatizer["pages"]["home"] = function tmpl_pages_home() {
        return '<section class="page home"><h3>Welcome to TicTacToe world! Type your names to kick it off!</h3><section class="page"><form data-hook="person-form"><fieldset data-hook="field-container"></fieldset><div class="buttons"><button data-hook="reset" type="submit" class="btn">Submit and Play</button></div></form></section><section class="page people-list-container hidden"><h2>Leadership board</h2><table class="table-bordered leadership"><tr><td><strong>Name</strong></td><td><strong>Wins</strong></td><td><strong>Draws</strong></td><td><strong>Looses</strong></td></tr></table><div data-hook="people-list"></div></section></section>';
    };

    return templatizer;
}));
