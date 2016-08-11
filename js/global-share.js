function memberContainer(e) {
    var t = $(e).closest("li.player, .profile-container, .shot-byline .attribution, .hover-card .profile-head, .screenshot-meta"), i = $("." + t.attr("class").match(/user-row-\d+/));
    return i.length ? i : t
}
function initRecentActivity() {
    $("#t-activity").hover(function() {
        $("#t-activity .new-activity:visible").fadeOut("slow", function() {
            var e = $("#t-activity a:first-child").attr("href");
            $.post(e, {
                _method: "PUT"
            })
        })
    }).find(".activity-mini a.close").click(function() {
        $("#nav li ul.tabs").hide()
    })
}
function numberWithDelimiter(e) {
    return e.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}
!function(e) {
    "use strict";
    e.picturefill = function() {
        for (var t = e.document.getElementsByTagName("div"), i = 0, n = t.length; n > i; i++)
            if (null !== t[i].getAttribute("data-picture")) {
                for (var r = t[i].getElementsByTagName("div"), o = [], a = 0, s = r.length; s > a; a++) {
                    var l = r[a].getAttribute("data-media");
                    (!l || e.matchMedia && e.matchMedia(l).matches) && o.push(r[a])
                }
                var u = t[i].getElementsByTagName("img")[0];
                if (o.length) {
                    if (!u) {
                        var c = t[i].getAttribute("data-class");
                        u = e.document.createElement("img"), u.alt = t[i].getAttribute("data-alt"), c && (u.className = c), t[i].appendChild(u)
                    }
                    u.src = o.pop().getAttribute("data-src")
                } else 
                    u && t[i].removeChild(u)
            }
        }, e.addEventListener ? (e.addEventListener("resize", e.picturefill, !1), e.addEventListener("DOMContentLoaded", function() {
        e.picturefill(), e.removeEventListener("load", e.picturefill, !1)
    }, !1), e.addEventListener("load", e.picturefill, !1)) : e.attachEvent && e.attachEvent("onload", e.picturefill)
}(this), window.matchMedia || (window.matchMedia = function() {
    "use strict";
    var e = window.styleMedia || window.media;
    if (!e) {
        var t = document.createElement("style"), i = document.getElementsByTagName("script")[0], n = null;
        t.type = "text/css", t.id = "matchmediajs-test", i.parentNode.insertBefore(t, i), n = "getComputedStyle"in window && window.getComputedStyle(t, null) || t.currentStyle, e = {
            matchMedium: function(e) {
                var i = "@media " + e + "{ #matchmediajs-test { width: 1px; } }";
                return t.styleSheet ? t.styleSheet.cssText = i : t.textContent = i, "1px" === n.width
            }
        }
    }
    return function(t) {
        return {
            matches: e.matchMedium(t || "all"),
            media: t || "all"
        }
    }
}()), Function.prototype.bind || (Function.prototype.bind = function(e) {
    if ("function" != typeof this)
        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    var t = Array.prototype.slice.call(arguments, 1), i = this, n = function() {}, r = function() {
        return i.apply(this instanceof n ? this : e, t.concat(Array.prototype.slice.call(arguments)))
    };
    return n.prototype = this.prototype, r.prototype = new n, r
}), function(e, t) {
    e.rails !== t && e.error("jquery-ujs has already been loaded!");
    var i, n = e(document);
    e.rails = i = {
        linkClickSelector: "a[data-confirm], a[data-method], a[data-remote], a[data-disable-with]",
        buttonClickSelector: "button[data-remote]",
        inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
        formSubmitSelector: "form",
        formInputClickSelector: "form input[type=submit], form input[type=image], form button[type=submit], form button:not([type])",
        disableSelector: "input[data-disable-with], button[data-disable-with], textarea[data-disable-with]",
        enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled",
        requiredInputSelector: "input[name][required]:not([disabled]),textarea[name][required]:not([disabled])",
        fileInputSelector: "input[type=file]",
        linkDisableSelector: "a[data-disable-with]",
        CSRFProtection: function(t) {
            var i = e('meta[name="csrf-token"]').attr("content");
            i && t.setRequestHeader("X-CSRF-Token", i)
        },
        fire: function(t, i, n) {
            var r = e.Event(i);
            return t.trigger(r, n), r.result!==!1
        },
        confirm: function(e) {
            return confirm(e)
        },
        ajax: function(t) {
            return e.ajax(t)
        },
        href: function(e) {
            return e.attr("href")
        },
        handleRemote: function(n) {
            var r, o, a, s, l, u, c, d;
            if (i.fire(n, "ajax:before")) {
                if (s = n.data("cross-domain"), l = s === t ? null : s, u = n.data("with-credentials") || null, c = n.data("type") || e.ajaxSettings && e.ajaxSettings.dataType, n.is("form")) {
                    r = n.attr("method"), o = n.attr("action"), a = n.serializeArray();
                    var h = n.data("ujs:submit-button");
                    h && (a.push(h), n.data("ujs:submit-button", null))
                } else 
                    n.is(i.inputChangeSelector) ? (r = n.data("method"), o = n.data("url"), a = n.serialize(), n.data("params") && (a = a + "&" + n.data("params"))) : n.is(i.buttonClickSelector) ? (r = n.data("method") || "get", o = n.data("url"), a = n.serialize(), n.data("params") && (a = a + "&" + n.data("params"))) : (r = n.data("method"), o = i.href(n), a = n.data("params") || null);
                d = {
                    type: r || "GET",
                    data: a,
                    dataType: c,
                    beforeSend: function(e, r) {
                        return r.dataType === t && e.setRequestHeader("accept", "*/*;q=0.5, " + r.accepts.script), i.fire(n, "ajax:beforeSend", [e, r])
                    },
                    success: function(e, t, i) {
                        n.trigger("ajax:success", [e, t, i])
                    },
                    complete: function(e, t) {
                        n.trigger("ajax:complete", [e, t])
                    },
                    error: function(e, t, i) {
                        n.trigger("ajax:error", [e, t, i])
                    },
                    crossDomain: l
                }, u && (d.xhrFields = {
                    withCredentials: u
                }), o && (d.url = o);
                var f = i.ajax(d);
                return n.trigger("ajax:send", f), f
            }
            return !1
        },
        handleMethod: function(n) {
            var r = i.href(n), o = n.data("method"), a = n.attr("target"), s = e("meta[name=csrf-token]").attr("content"), l = e("meta[name=csrf-param]").attr("content"), u = e('<form method="post" action="' + r + '"></form>'), c = '<input name="_method" value="' + o + '" type="hidden" />';
            l !== t && s !== t && (c += '<input name="' + l + '" value="' + s + '" type="hidden" />'), a && u.attr("target", a), u.hide().append(c).appendTo("body"), u.submit()
        },
        disableFormElements: function(t) {
            t.find(i.disableSelector).each(function() {
                var t = e(this), i = t.is("button") ? "html": "val";
                t.data("ujs:enable-with", t[i]()), t[i](t.data("disable-with")), t.prop("disabled", !0)
            })
        },
        enableFormElements: function(t) {
            t.find(i.enableSelector).each(function() {
                var t = e(this), i = t.is("button") ? "html": "val";
                t.data("ujs:enable-with") && t[i](t.data("ujs:enable-with")), t.prop("disabled", !1)
            })
        },
        allowAction: function(e) {
            var t, n = e.data("confirm"), r=!1;
            return n ? (i.fire(e, "confirm") && (r = i.confirm(n), t = i.fire(e, "confirm:complete", [r])), r && t) : !0
        },
        blankInputs: function(t, i, n) {
            var r, o, a = e(), s = i || "input,textarea", l = t.find(s);
            return l.each(function() {
                if (r = e(this), o = r.is("input[type=checkbox],input[type=radio]") ? r.is(":checked") : r.val(), !o==!n) {
                    if (r.is("input[type=radio]") && l.filter('input[type=radio]:checked[name="' + r.attr("name") + '"]').length)
                        return !0;
                    a = a.add(r)
                }
            }), a.length ? a : !1
        },
        nonBlankInputs: function(e, t) {
            return i.blankInputs(e, t, !0)
        },
        stopEverything: function(t) {
            return e(t.target).trigger("ujs:everythingStopped"), t.stopImmediatePropagation(), !1
        },
        disableElement: function(e) {
            e.data("ujs:enable-with", e.html()), e.html(e.data("disable-with")), e.bind("click.railsDisable", function(e) {
                return i.stopEverything(e)
            })
        },
        enableElement: function(e) {
            e.data("ujs:enable-with") !== t && (e.html(e.data("ujs:enable-with")), e.removeData("ujs:enable-with")), e.unbind("click.railsDisable")
        }
    }, i.fire(n, "rails:attachBindings") && (e.ajaxPrefilter(function(e, t, n) {
        e.crossDomain || i.CSRFProtection(n)
    }), n.delegate(i.linkDisableSelector, "ajax:complete", function() {
        i.enableElement(e(this))
    }), n.delegate(i.linkClickSelector, "click.rails", function(n) {
        var r = e(this), o = r.data("method"), a = r.data("params");
        if (!i.allowAction(r))
            return i.stopEverything(n);
        if (r.is(i.linkDisableSelector) && i.disableElement(r), r.data("remote") !== t) {
            if ((n.metaKey || n.ctrlKey) && (!o || "GET" === o)&&!a)
                return !0;
            var s = i.handleRemote(r);
            return s===!1 ? i.enableElement(r) : s.error(function() {
                i.enableElement(r)
            }), !1
        }
        return r.data("method") ? (i.handleMethod(r), !1) : void 0
    }), n.delegate(i.buttonClickSelector, "click.rails", function(t) {
        var n = e(this);
        return i.allowAction(n) ? (i.handleRemote(n), !1) : i.stopEverything(t)
    }), n.delegate(i.inputChangeSelector, "change.rails", function(t) {
        var n = e(this);
        return i.allowAction(n) ? (i.handleRemote(n), !1) : i.stopEverything(t)
    }), n.delegate(i.formSubmitSelector, "submit.rails", function(n) {
        var r = e(this), o = r.data("remote") !== t, a = i.blankInputs(r, i.requiredInputSelector), s = i.nonBlankInputs(r, i.fileInputSelector);
        if (!i.allowAction(r))
            return i.stopEverything(n);
        if (a && r.attr("novalidate") == t && i.fire(r, "ajax:aborted:required", [a]))
            return i.stopEverything(n);
        if (o) {
            if (s) {
                setTimeout(function() {
                    i.disableFormElements(r)
                }, 13);
                var l = i.fire(r, "ajax:aborted:file", [s]);
                return l || setTimeout(function() {
                    i.enableFormElements(r)
                }, 13), l
            }
            return i.handleRemote(r), !1
        }
        setTimeout(function() {
            i.disableFormElements(r)
        }, 13)
    }), n.delegate(i.formInputClickSelector, "click.rails", function(t) {
        var n = e(this);
        if (!i.allowAction(n))
            return i.stopEverything(t);
        var r = n.attr("name"), o = r ? {
            name: r,
            value: n.val()
        }
        : null;
        n.closest("form").data("ujs:submit-button", o)
    }), n.delegate(i.formSubmitSelector, "ajax:beforeSend.rails", function(t) {
        this == t.target && i.disableFormElements(e(this))
    }), n.delegate(i.formSubmitSelector, "ajax:complete.rails", function(t) {
        this == t.target && i.enableFormElements(e(this))
    }), e(function() {
        var t = e("meta[name=csrf-token]").attr("content"), i = e("meta[name=csrf-param]").attr("content");
        e('form input[name="' + i + '"]').val(t)
    }))
}(jQuery), function(e) {
    e.fn.ajaxSubmit = function(t) {
        function i() {
            function i() {
                if (!f++) {
                    u.detachEvent ? u.detachEvent("onload", i) : u.removeEventListener("load", i, !1);
                    var t=!0;
                    try {
                        if (p)
                            throw "timeout";
                        var r, a;
                        if (a = u.contentWindow ? u.contentWindow.document : u.contentDocument ? u.contentDocument : u.document, d.responseText = a.body ? a.body.innerHTML : null, d.responseXML = a.XMLDocument ? a.XMLDocument : a, d.getResponseHeader = function(e) {
                            var t = {
                                "content-type": o.dataType
                            };
                            return t[e]
                        }, "json" == o.dataType || "script" == o.dataType) {
                            var s = a.getElementsByTagName("textarea")[0];
                            d.responseText = s ? s.value : d.responseText
                        } else 
                            "xml" != o.dataType || d.responseXML || null == d.responseText || (d.responseXML = n(d.responseText));
                        r = e.httpData(d, o.dataType)
                    } catch (c) {
                        t=!1, e.handleError(o, d, "error", c)
                    }
                    t && (o.success(r, "success"), h && e.event.trigger("ajaxSuccess", [d, o])), h && e.event.trigger("ajaxComplete", [d, o]), h&&!--e.active && e.event.trigger("ajaxStop"), o.complete && o.complete(d, t ? "success" : "error"), setTimeout(function() {
                        l.remove(), d.responseXML = null
                    }, 100)
                }
            }
            function n(e, t) {
                return window.ActiveXObject ? (t = new ActiveXObject("Microsoft.XMLDOM"), t.async = "false", t.loadXML(e)) : t = (new DOMParser).parseFromString(e, "text/xml"), t && t.documentElement && "parsererror" != t.documentElement.tagName ? t : null
            }
            var r = s[0], o = e.extend({}, e.ajaxSettings, t), a = "jqFormIO" + (new Date).getTime(), l = e('<iframe id="' + a + '" name="' + a + '" />'), u = l[0], c = e.browser.opera && window.opera.version() < 9;
            (e.browser.msie || c) && (u.src = 'javascript:false;document.write("");'), l.css({
                position: "absolute",
                top: "-1000px",
                left: "-1000px"
            });
            var d = {
                responseText: null,
                responseXML: null,
                status: 0,
                statusText: "n/a",
                getAllResponseHeaders: function() {},
                getResponseHeader: function() {},
                setRequestHeader: function() {}
            }, h = o.global;
            h&&!e.active++&&e.event.trigger("ajaxStart"), h && e.event.trigger("ajaxSend", [d, o]);
            var f = 0, p = 0;
            setTimeout(function() {
                var n = s.attr("target"), c = s.attr("action");
                s.attr({
                    target: a,
                    encoding: "multipart/form-data",
                    enctype: "multipart/form-data",
                    method: "POST",
                    action: o.url
                }), o.timeout && setTimeout(function() {
                    p=!0, i()
                }, o.timeout);
                var d = [];
                try {
                    if (t.extraData)
                        for (var h in t.extraData)
                            d.push(e('<input type="hidden" name="' + h + '" value="' + t.extraData[h] + '" />').appendTo(r)[0]);
                    l.appendTo("body"), u.attachEvent ? u.attachEvent("onload", i) : u.addEventListener("load", i, !1), r.submit()
                } finally {
                    s.attr("action", c), n ? s.attr("target", n) : s.removeAttr("target"), e(d).remove()
                }
            }, 10)
        }
        "function" == typeof t && (t = {
            success: t
        }), t = e.extend({
            url: this.attr("action") || window.location.toString(),
            type: this.attr("method") || "GET"
        }, t || {});
        var n = {};
        if (this.trigger("form-pre-serialize", [this, t, n]), n.veto)
            return this;
        var r = this.formToArray(t.semantic);
        if (t.data) {
            t.extraData = t.data;
            for (var o in t.data)
                r.push({
                    name: o,
                    value: t.data[o]
                })
        }
        if (t.beforeSubmit && t.beforeSubmit(r, this, t)===!1)
            return this;
        if (this.trigger("form-submit-validate", [r, this, t, n]), n.veto)
            return this;
        var a = e.param(r);
        "GET" == t.type.toUpperCase() ? (t.url += (t.url.indexOf("?") >= 0 ? "&" : "?") + a, t.data = null) : t.data = a;
        var s = this, l = [];
        if (t.resetForm && l.push(function() {
            s.resetForm()
        }), t.clearForm && l.push(function() {
            s.clearForm()
        }), !t.dataType && t.target) {
            var u = t.success || function() {};
            l.push(function(i) {
                e(t.target).html(i).each(u, arguments)
            })
        } else 
            t.success && l.push(t.success);
        t.success = function(e, t) {
            for (var i = 0, n = l.length; n > i; i++)
                l[i](e, t, s)
        };
        for (var c = e("input:file", this).fieldValue(), d=!1, h = 0; h < c.length; h++)
            c[h] && (d=!0);
        return t.iframe || d ? e.browser.safari && t.closeKeepAlive ? e.get(t.closeKeepAlive, i) : i() : e.ajax(t), this.trigger("form-submit-notify", [this, t]), this
    }, e.fn.ajaxForm = function(t) {
        return this.ajaxFormUnbind().bind("submit.form-plugin", function() {
            return e(this).ajaxSubmit(t), !1
        }).each(function() {
            e(":submit,input:image", this).bind("click.form-plugin", function(t) {
                var i = this.form;
                if (i.clk = this, "image" == this.type)
                    if (void 0 != t.offsetX)
                        i.clk_x = t.offsetX, i.clk_y = t.offsetY;
                    else if ("function" == typeof e.fn.offset) {
                        var n = e(this).offset();
                        i.clk_x = t.pageX - n.left, i.clk_y = t.pageY - n.top
                    } else 
                        i.clk_x = t.pageX - this.offsetLeft, i.clk_y = t.pageY - this.offsetTop;
                setTimeout(function() {
                    i.clk = i.clk_x = i.clk_y = null
                }, 10)
            })
        })
    }, e.fn.ajaxFormUnbind = function() {
        return this.unbind("submit.form-plugin"), this.each(function() {
            e(":submit,input:image", this).unbind("click.form-plugin")
        })
    }, e.fn.formToArray = function(t) {
        var i = [];
        if (0 == this.length)
            return i;
        var n = this[0], r = t ? n.getElementsByTagName("*"): n.elements;
        if (!r)
            return i;
        for (var o = 0, a = r.length; a > o; o++) {
            var s = r[o], l = s.name;
            if (l)
                if (t && n.clk && "image" == s.type)
                    s.disabled || n.clk != s || i.push({
                        name: l + ".x",
                        value: n.clk_x
                    }, {
                        name: l + ".y",
                        value: n.clk_y
                    });
                else {
                    var u = e.fieldValue(s, !0);
                    if (u && u.constructor == Array)
                        for (var c = 0, d = u.length; d > c; c++)
                            i.push({
                                name: l,
                                value: u[c]
                            });
                    else 
                        null !== u && "undefined" != typeof u && i.push({
                            name: l,
                            value: u
                        })
                    }
            }
        if (!t && n.clk)
            for (var h = n.getElementsByTagName("input"), o = 0, a = h.length; a > o; o++) {
                var f = h[o], l = f.name;
                l&&!f.disabled && "image" == f.type && n.clk == f && i.push({
                    name: l + ".x",
                    value: n.clk_x
                }, {
                    name: l + ".y",
                    value: n.clk_y
                })
            }
        return i
    }, e.fn.formSerialize = function(t) {
        return e.param(this.formToArray(t))
    }, e.fn.fieldSerialize = function(t) {
        var i = [];
        return this.each(function() {
            var n = this.name;
            if (n) {
                var r = e.fieldValue(this, t);
                if (r && r.constructor == Array)
                    for (var o = 0, a = r.length; a > o; o++)
                        i.push({
                            name: n,
                            value: r[o]
                        });
                else 
                    null !== r && "undefined" != typeof r && i.push({
                        name: this.name,
                        value: r
                    })
            }
        }), e.param(i)
    }, e.fn.fieldValue = function(t) {
        for (var i = [], n = 0, r = this.length; r > n; n++) {
            var o = this[n], a = e.fieldValue(o, t);
            null === a || "undefined" == typeof a || a.constructor == Array&&!a.length || (a.constructor == Array ? e.merge(i, a) : i.push(a))
        }
        return i
    }, e.fieldValue = function(t, i) {
        var n = t.name, r = t.type, o = t.tagName.toLowerCase();
        if ("undefined" == typeof i && (i=!0), i && (!n || t.disabled || "reset" == r || "button" == r || ("checkbox" == r || "radio" == r)&&!t.checked || ("submit" == r || "image" == r) && t.form && t.form.clk != t || "select" == o&&-1 == t.selectedIndex))
            return null;
        if ("select" == o) {
            var a = t.selectedIndex;
            if (0 > a)
                return null;
            for (var s = [], l = t.options, u = "select-one" == r, c = u ? a + 1 : l.length, d = u ? a : 0; c > d; d++) {
                var h = l[d];
                if (h.selected) {
                    var f = e.browser.msie&&!h.attributes.value.specified ? h.text: h.value;
                    if (u)
                        return f;
                    s.push(f)
                }
            }
            return s
        }
        return t.value
    }, e.fn.clearForm = function() {
        return this.each(function() {
            e("input,select,textarea", this).clearFields()
        })
    }, e.fn.clearFields = e.fn.clearInputs = function() {
        return this.each(function() {
            var e = this.type, t = this.tagName.toLowerCase();
            "text" == e || "password" == e || "textarea" == t ? this.value = "" : "checkbox" == e || "radio" == e ? this.checked=!1 : "select" == t && (this.selectedIndex =- 1)
        })
    }, e.fn.resetForm = function() {
        return this.each(function() {
            ("function" == typeof this.reset || "object" == typeof this.reset&&!this.reset.nodeType) && this.reset()
        })
    }, e.fn.enable = function(e) {
        return void 0 == e && (e=!0), this.each(function() {
            this.disabled=!e
        })
    }, e.fn.select = function(t) {
        return void 0 == t && (t=!0), this.each(function() {
            var i = this.type;
            if ("checkbox" == i || "radio" == i)
                this.checked = t;
            else if ("option" == this.tagName.toLowerCase()) {
                var n = e(this).parent("select");
                t && n[0] && "select-one" == n[0].type && n.find("option").select(!1), this.selected = t
            }
        })
    }
}(jQuery), function(e) {
    function t(e, t) {
        return "function" == typeof e ? e.call(t) : e
    }
    function i(e) {
        for (; e = e.parentNode;)
            if (e == document)
                return !0;
        return !1
    }
    function n(t, i) {
        this.$element = e(t), this.options = i, this.enabled=!0, this.fixTitle()
    }
    n.prototype = {
        show: function() {
            var i = this.getTitle();
            if (i && this.enabled) {
                var n = this.tip();
                n.find(".tipsy-inner")[this.options.html ? "html": "text"](i), n[0].className = "tipsy", n.remove().css({
                    top: 0,
                    left: 0,
                    visibility: "hidden",
                    display: "block"
                }).prependTo(document.body);
                var r, o = e.extend({}, this.$element.offset(), {
                    width: this.$element[0].offsetWidth,
                    height: this.$element[0].offsetHeight
                }), a = n[0].offsetWidth, s = n[0].offsetHeight, l = t(this.options.gravity, this.$element[0]);
                switch (l.charAt(0)) {
                case"n":
                    r = {
                        top: o.top + o.height + this.options.offset,
                        left: o.left + o.width / 2 - a / 2
                    };
                    break;
                case"s":
                    r = {
                        top: o.top - s - this.options.offset,
                        left: o.left + o.width / 2 - a / 2
                    };
                    break;
                case"e":
                    r = {
                        top: o.top + o.height / 2 - s / 2,
                        left: o.left - a - this.options.offset
                    };
                    break;
                case"w":
                    r = {
                        top: o.top + o.height / 2 - s / 2,
                        left: o.left + o.width + this.options.offset
                    }
                }
                2 == l.length && ("w" == l.charAt(1) ? r.left = o.left + o.width / 2 - 15 : r.left = o.left + o.width / 2 - a + 15), n.css(r).addClass("tipsy-" + l), n.find(".tipsy-arrow")[0].className = "tipsy-arrow tipsy-arrow-" + l.charAt(0), this.options.className && n.addClass(t(this.options.className, this.$element[0])), this.options.fade ? n.stop().css({
                    opacity: 0,
                    display: "block",
                    visibility: "visible"
                }).animate({
                    opacity: this.options.opacity
                }) : n.css({
                    visibility: "visible",
                    opacity: this.options.opacity
                })
            }
        },
        hide: function() {
            this.options.fade ? this.tip().stop().fadeOut(function() {
                e(this).remove()
            }) : this.tip().remove()
        },
        fixTitle: function() {
            var e = this.$element;
            (e.attr("title") || "string" != typeof e.attr("original-title")) && e.attr("original-title", e.attr("title") || "").removeAttr("title")
        },
        getTitle: function() {
            var e, t = this.$element, i = this.options;
            this.fixTitle();
            var e, i = this.options;
            return "string" == typeof i.title ? e = t.attr("title" == i.title ? "original-title" : i.title) : "function" == typeof i.title && (e = i.title.call(t[0])), e = ("" + e).replace(/(^\s*|\s*$)/, ""), e || i.fallback
        },
        tip: function() {
            return this.$tip || (this.$tip = e('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>'), this.$tip.data("tipsy-pointee", this.$element[0])), this.$tip
        },
        validate: function() {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
        },
        enable: function() {
            this.enabled=!0
        },
        disable: function() {
            this.enabled=!1
        },
        toggleEnabled: function() {
            this.enabled=!this.enabled
        }
    }, e.fn.tipsy = function(t) {
        function i(i) {
            var r = e.data(i, "tipsy");
            return r || (r = new n(i, e.fn.tipsy.elementOptions(i, t)), e.data(i, "tipsy", r)), r
        }
        function r() {
            var e = i(this);
            e.hoverState = "in", 0 == t.delayIn ? e.show() : (e.fixTitle(), setTimeout(function() {
                "in" == e.hoverState && e.show()
            }, t.delayIn))
        }
        function o() {
            var e = i(this);
            e.hoverState = "out", 0 == t.delayOut ? e.hide() : setTimeout(function() {
                "out" == e.hoverState && e.hide()
            }, t.delayOut)
        }
        if (t===!0)
            return this.data("tipsy");
        if ("string" == typeof t) {
            var a = this.data("tipsy");
            return a && a[t](), this
        }
        if (t = e.extend({}, e.fn.tipsy.defaults, t), t.live || this.each(function() {
            i(this)
        }), "manual" != t.trigger) {
            var s = t.live ? "live": "bind", l = "hover" == t.trigger ? "mouseenter": "focus", u = "hover" == t.trigger ? "mouseleave": "blur";
            this[s](l, r)[s](u, o)
        }
        return this
    }, e.fn.tipsy.defaults = {
        className: null,
        delayIn: 0,
        delayOut: 0,
        fade: !1,
        fallback: "",
        gravity: "n",
        html: !1,
        live: !1,
        offset: 0,
        opacity: .8,
        title: "title",
        trigger: "hover"
    }, e.fn.tipsy.revalidate = function() {
        e(".tipsy").each(function() {
            var t = e.data(this, "tipsy-pointee");
            t && i(t) || e(this).remove()
        })
    }, e.fn.tipsy.elementOptions = function(t, i) {
        return e.metadata ? e.extend({}, i, e(t).metadata()) : i
    }, e.fn.tipsy.autoNS = function() {
        return e(this).offset().top > e(document).scrollTop() + e(window).height() / 2 ? "s" : "n"
    }, e.fn.tipsy.autoWE = function() {
        return e(this).offset().left > e(document).scrollLeft() + e(window).width() / 2 ? "e" : "w"
    }, e.fn.tipsy.autoBounds = function(t, i) {
        return function() {
            var n = {
                ns: i[0],
                ew: i.length > 1 ? i[1]: !1
            }, r = e(document).scrollTop() + t, o = e(document).scrollLeft() + t, a = e(this);
            return a.offset().top < r && (n.ns = "n"), a.offset().left < o && (n.ew = "w"), e(window).width() + e(document).scrollLeft() - a.offset().left < t && (n.ew = "e"), e(window).height() + e(document).scrollTop() - a.offset().top < t && (n.ns = "s"), n.ns + (n.ew ? n.ew : "")
        }
    }
}(jQuery), function(e) {
    "function" == typeof define && define.amd && define.amd.jQuery ? define(["jquery"], e) : e(jQuery)
}(function(e) {
    "use strict";
    function t(t) {
        return !t || void 0 !== t.allowPageScroll || void 0 === t.swipe && void 0 === t.swipeStatus || (t.allowPageScroll = c), void 0 !== t.click && void 0 === t.tap && (t.tap = t.click), t || (t = {}), t = e.extend({}, e.fn.swipe.defaults, t), this.each(function() {
            var n = e(this), r = n.data(I);
            r || (r = new i(this, t), n.data(I, r))
        })
    }
    function i(t, i) {
        function n(t) {
            if (!(ue() || e(t.target).closest(i.excludedElements, qe).length > 0)) {
                var n, r = t.originalEvent ? t.originalEvent: t, o = r.touches, a = o ? o[0]: r;
                return Ve = S, o ? Ke = o.length : t.preventDefault(), Fe = 0, Ue = null, Ne = null, Me = 0, Re = 0, Pe = 0, _e = 1, Be = 0, Qe = pe(), ze = ge(), se(), !o || Ke === i.fingers || i.fingers === y || z() ? (de(0, a), We = Ee(), 2 == Ke && (de(1, o[1]), Re = Pe = we(Qe[0].start, Qe[1].start)), (i.swipeStatus || i.pinchStatus) && (n = F(r, Ve))) : n=!1, n===!1 ? (Ve = x, F(r, Ve), n) : (i.hold && (et = setTimeout(e.proxy(function() {
                    qe.trigger("hold", [r.target]), i.hold && (n = i.hold.call(qe, r, r.target))
                }, this), i.longTapThreshold)), ce(!0), null)
            }
        }
        function C(e) {
            var t = e.originalEvent ? e.originalEvent: e;
            if (Ve !== k && Ve !== x&&!le()) {
                var n, r = t.touches, o = r ? r[0]: t, a = he(o);
                if (Xe = Ee(), r && (Ke = r.length), i.hold && clearTimeout(et), Ve = T, 2 == Ke && (0 == Re ? (de(1, r[1]), Re = Pe = we(Qe[0].start, Qe[1].start)) : (he(r[1]), Pe = we(Qe[0].end, Qe[1].end), Ne = Te(Qe[0].end, Qe[1].end)), _e = Se(Re, Pe), Be = Math.abs(Re - Pe)), Ke === i.fingers || i.fingers === y ||!r || z()) {
                    if (Ue = $e(a.start, a.end), B(e, Ue), Fe = ke(a.start, a.end), Me = ye(), be(Ue, Fe), (i.swipeStatus || i.pinchStatus) && (n = F(t, Ve)), !i.triggerOnTouchEnd || i.triggerOnTouchLeave) {
                        var s=!0;
                        if (i.triggerOnTouchLeave) {
                            var l = De(this);
                            s = Ie(a.end, l)
                        }
                        !i.triggerOnTouchEnd && s ? Ve = j(T) : i.triggerOnTouchLeave&&!s && (Ve = j(k)), (Ve == x || Ve == k) && F(t, Ve)
                    }
                } else 
                    Ve = x, F(t, Ve);
                n===!1 && (Ve = x, F(t, Ve))
            }
        }
        function O(e) {
            var t = e.originalEvent ? e.originalEvent: e, n = t.touches;
            return n && n.length ? (ae(), !0) : (le() && (Ke = Ge), Xe = Ee(), Me = ye(), R() ||!M() ? (Ve = x, F(t, Ve)) : i.triggerOnTouchEnd || 0 == i.triggerOnTouchEnd && Ve === T ? (e.preventDefault(), Ve = k, F(t, Ve)) : !i.triggerOnTouchEnd && Y() ? (Ve = k, U(t, Ve, p)) : Ve === T && (Ve = x, F(t, Ve)), ce(!1), null)
        }
        function A() {
            Ke = 0, Xe = 0, We = 0, Re = 0, Pe = 0, _e = 1, se(), ce(!1)
        }
        function L(e) {
            var t = e.originalEvent ? e.originalEvent: e;
            i.triggerOnTouchLeave && (Ve = j(k), F(t, Ve))
        }
        function H() {
            qe.unbind(Oe, n), qe.unbind(je, A), qe.unbind(Ae, C), qe.unbind(Le, O), He && qe.unbind(He, L), ce(!1)
        }
        function j(e) {
            var t = e, n = _(), r = M(), o = R();
            return !n || o ? t = x : !r || e != T || i.triggerOnTouchEnd&&!i.triggerOnTouchLeave?!r && e == k && i.triggerOnTouchLeave && (t = x) : t = k, t
        }
        function F(e, t) {
            var i, n = e.touches;
            return Q() || K() || q() || z() ? ((Q() || K()) && (i = U(e, t, h)), (q() || z()) && i!==!1 && (i = U(e, t, f))) : re() && i!==!1 ? i = U(e, t, b) : oe() && i!==!1 ? i = U(e, t, m) : ne() && i!==!1 && (i = U(e, t, p)), t === x && A(e), t === k && (n ? n.length || A(e) : A(e)), i
        }
        function U(t, n, c) {
            var d;
            if (c == h) {
                if (qe.trigger("swipeStatus", [n, Ue || null, Fe || 0, Me || 0, Ke, Qe]), i.swipeStatus && (d = i.swipeStatus.call(qe, t, n, Ue || null, Fe || 0, Me || 0, Ke, Qe), d===!1))
                    return !1;
                if (n == k && V()) {
                    if (qe.trigger("swipe", [Ue, Fe, Me, Ke, Qe]), i.swipe && (d = i.swipe.call(qe, t, Ue, Fe, Me, Ke, Qe), d===!1))
                        return !1;
                    switch (Ue) {
                    case r:
                        qe.trigger("swipeLeft", [Ue, Fe, Me, Ke, Qe]), i.swipeLeft && (d = i.swipeLeft.call(qe, t, Ue, Fe, Me, Ke, Qe));
                        break;
                    case o:
                        qe.trigger("swipeRight", [Ue, Fe, Me, Ke, Qe]), i.swipeRight && (d = i.swipeRight.call(qe, t, Ue, Fe, Me, Ke, Qe));
                        break;
                    case a:
                        qe.trigger("swipeUp", [Ue, Fe, Me, Ke, Qe]), i.swipeUp && (d = i.swipeUp.call(qe, t, Ue, Fe, Me, Ke, Qe));
                        break;
                    case s:
                        qe.trigger("swipeDown", [Ue, Fe, Me, Ke, Qe]), i.swipeDown && (d = i.swipeDown.call(qe, t, Ue, Fe, Me, Ke, Qe))
                    }
                }
            }
            if (c == f) {
                if (qe.trigger("pinchStatus", [n, Ne || null, Be || 0, Me || 0, Ke, _e, Qe]), i.pinchStatus && (d = i.pinchStatus.call(qe, t, n, Ne || null, Be || 0, Me || 0, Ke, _e, Qe), d===!1))
                    return !1;
                if (n == k && N())
                    switch (Ne) {
                    case l:
                        qe.trigger("pinchIn", [Ne || null, Be || 0, Me || 0, Ke, _e, Qe]), i.pinchIn && (d = i.pinchIn.call(qe, t, Ne || null, Be || 0, Me || 0, Ke, _e, Qe));
                        break;
                    case u:
                        qe.trigger("pinchOut", [Ne || null, Be || 0, Me || 0, Ke, _e, Qe]), i.pinchOut && (d = i.pinchOut.call(qe, t, Ne || null, Be || 0, Me || 0, Ke, _e, Qe))
                    }
                }
            return c == p ? (n === x || n === k) && (clearTimeout(Ze), clearTimeout(et), G()&&!ee() ? (Je = Ee(), Ze = setTimeout(e.proxy(function() {
                Je = null, qe.trigger("tap", [t.target]), i.tap && (d = i.tap.call(qe, t, t.target))
            }, this), i.doubleTapThreshold)) : (Je = null, qe.trigger("tap", [t.target]), i.tap && (d = i.tap.call(qe, t, t.target)))) : c == b ? (n === x || n === k) && (clearTimeout(Ze), Je = null, qe.trigger("doubletap", [t.target]), i.doubleTap && (d = i.doubleTap.call(qe, t, t.target))) : c == m && (n === x || n === k) && (clearTimeout(Ze), Je = null, qe.trigger("longtap", [t.target]), i.longTap && (d = i.longTap.call(qe, t, t.target))), d
        }
        function M() {
            var e=!0;
            return null !== i.threshold && (e = Fe >= i.threshold), e
        }
        function R() {
            var e=!1;
            return null !== i.cancelThreshold && null !== Ue && (e = me(Ue) - Fe >= i.cancelThreshold), e
        }
        function P() {
            return null !== i.pinchThreshold ? Be >= i.pinchThreshold : !0
        }
        function _() {
            var e;
            return e = i.maxTimeThreshold && Me >= i.maxTimeThreshold?!1 : !0
        }
        function B(e, t) {
            if (i.preventDefaultEvents!==!1)
                if (i.allowPageScroll === c)
                    e.preventDefault();
                else {
                    var n = i.allowPageScroll === d;
                    switch (t) {
                    case r:
                        (i.swipeLeft && n ||!n && i.allowPageScroll != g) && e.preventDefault();
                        break;
                    case o:
                        (i.swipeRight && n ||!n && i.allowPageScroll != g) && e.preventDefault();
                        break;
                    case a:
                        (i.swipeUp && n ||!n && i.allowPageScroll != v) && e.preventDefault();
                        break;
                    case s:
                        (i.swipeDown && n ||!n && i.allowPageScroll != v) && e.preventDefault()
                    }
                }
            }
        function N() {
            var e = W(), t = X(), i = P();
            return e && t && i
        }
        function z() {
            return !!(i.pinchStatus || i.pinchIn || i.pinchOut)
        }
        function q() {
            return !(!N() ||!z())
        }
        function V() {
            var e = _(), t = M(), i = W(), n = X(), r = R(), o=!r && n && i && t && e;
            return o
        }
        function K() {
            return !!(i.swipe || i.swipeStatus || i.swipeLeft || i.swipeRight || i.swipeUp || i.swipeDown)
        }
        function Q() {
            return !(!V() ||!K())
        }
        function W() {
            return Ke === i.fingers || i.fingers === y ||!$
        }
        function X() {
            return 0 !== Qe[0].end.x
        }
        function Y() {
            return !!i.tap
        }
        function G() {
            return !!i.doubleTap
        }
        function J() {
            return !!i.longTap
        }
        function Z() {
            if (null == Je)
                return !1;
            var e = Ee();
            return G() && e - Je <= i.doubleTapThreshold
        }
        function ee() {
            return Z()
        }
        function te() {
            return (1 === Ke ||!$) && (isNaN(Fe) || Fe < i.threshold)
        }
        function ie() {
            return Me > i.longTapThreshold && w > Fe
        }
        function ne() {
            return !(!te() ||!Y())
        }
        function re() {
            return !(!Z() ||!G())
        }
        function oe() {
            return !(!ie() ||!J())
        }
        function ae() {
            Ye = Ee(), Ge = event.touches.length + 1
        }
        function se() {
            Ye = 0, Ge = 0
        }
        function le() {
            var e=!1;
            if (Ye) {
                var t = Ee() - Ye;
                t <= i.fingerReleaseThreshold && (e=!0)
            }
            return e
        }
        function ue() {
            return !(qe.data(I + "_intouch")!==!0)
        }
        function ce(e) {
            e===!0 ? (qe.bind(Ae, C), qe.bind(Le, O), He && qe.bind(He, L)) : (qe.unbind(Ae, C, !1), qe.unbind(Le, O, !1), He && qe.unbind(He, L, !1)), qe.data(I + "_intouch", e===!0)
        }
        function de(e, t) {
            var i = void 0 !== t.identifier ? t.identifier : 0;
            return Qe[e].identifier = i, Qe[e].start.x = Qe[e].end.x = t.pageX || t.clientX, Qe[e].start.y = Qe[e].end.y = t.pageY || t.clientY, Qe[e]
        }
        function he(e) {
            var t = void 0 !== e.identifier ? e.identifier : 0, i = fe(t);
            return i.end.x = e.pageX || e.clientX, i.end.y = e.pageY || e.clientY, i
        }
        function fe(e) {
            for (var t = 0; t < Qe.length; t++)
                if (Qe[t].identifier == e)
                    return Qe[t]
        }
        function pe() {
            for (var e = [], t = 0; 5 >= t; t++)
                e.push({
                    start: {
                        x: 0,
                        y: 0
                    },
                    end: {
                        x: 0,
                        y: 0
                    },
                    identifier: 0
                });
            return e
        }
        function be(e, t) {
            t = Math.max(t, me(e)), ze[e].distance = t
        }
        function me(e) {
            return ze[e] ? ze[e].distance : void 0
        }
        function ge() {
            var e = {};
            return e[r] = ve(r), e[o] = ve(o), e[a] = ve(a), e[s] = ve(s), e
        }
        function ve(e) {
            return {
                direction: e,
                distance: 0
            }
        }
        function ye() {
            return Xe - We
        }
        function we(e, t) {
            var i = Math.abs(e.x - t.x), n = Math.abs(e.y - t.y);
            return Math.round(Math.sqrt(i * i + n * n))
        }
        function Se(e, t) {
            var i = t / e * 1;
            return i.toFixed(2)
        }
        function Te() {
            return 1 > _e ? u : l
        }
        function ke(e, t) {
            return Math.round(Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)))
        }
        function xe(e, t) {
            var i = e.x - t.x, n = t.y - e.y, r = Math.atan2(n, i), o = Math.round(180 * r / Math.PI);
            return 0 > o && (o = 360 - Math.abs(o)), o
        }
        function $e(e, t) {
            var i = xe(e, t);
            return 45 >= i && i >= 0 ? r : 360 >= i && i >= 315 ? r : i >= 135 && 225 >= i ? o : i > 45 && 135 > i ? s : a
        }
        function Ee() {
            var e = new Date;
            return e.getTime()
        }
        function De(t) {
            t = e(t);
            var i = t.offset(), n = {
                left: i.left,
                right: i.left + t.outerWidth(),
                top: i.top,
                bottom: i.top + t.outerHeight()
            };
            return n
        }
        function Ie(e, t) {
            return e.x > t.left && e.x < t.right && e.y > t.top && e.y < t.bottom
        }
        var Ce = $ || D ||!i.fallbackToMouseEvents, Oe = Ce ? D ? E ? "MSPointerDown": "pointerdown": "touchstart": "mousedown", Ae = Ce ? D ? E ? "MSPointerMove": "pointermove": "touchmove": "mousemove", Le = Ce ? D ? E ? "MSPointerUp": "pointerup": "touchend": "mouseup", He = Ce ? null: "mouseleave", je = D ? E ? "MSPointerCancel": "pointercancel": "touchcancel", Fe = 0, Ue = null, Me = 0, Re = 0, Pe = 0, _e = 1, Be = 0, Ne = 0, ze = null, qe = e(t), Ve = "start", Ke = 0, Qe = null, We = 0, Xe = 0, Ye = 0, Ge = 0, Je = 0, Ze = null, et = null;
        try {
            qe.bind(Oe, n), qe.bind(je, A)
        } catch (tt) {
            e.error("events not supported " + Oe + "," + je + " on jQuery.swipe")
        }
        this.enable = function() {
            return qe.bind(Oe, n), qe.bind(je, A), qe
        }, this.disable = function() {
            return H(), qe
        }, this.destroy = function() {
            H(), qe.data(I, null), qe = null
        }, this.option = function(t, n) {
            if (void 0 !== i[t]) {
                if (void 0 === n)
                    return i[t];
                i[t] = n
            } else 
                e.error("Option " + t + " does not exist on jQuery.swipe.options");
            return null
        }
    }
    var n = "1.6.9", r = "left", o = "right", a = "up", s = "down", l = "in", u = "out", c = "none", d = "auto", h = "swipe", f = "pinch", p = "tap", b = "doubletap", m = "longtap", g = "horizontal", v = "vertical", y = "all", w = 10, S = "start", T = "move", k = "end", x = "cancel", $ = "ontouchstart"in window, E = window.navigator.msPointerEnabled&&!window.navigator.pointerEnabled, D = window.navigator.pointerEnabled || window.navigator.msPointerEnabled, I = "TouchSwipe", C = {
        fingers: 1,
        threshold: 75,
        cancelThreshold: null,
        pinchThreshold: 20,
        maxTimeThreshold: null,
        fingerReleaseThreshold: 250,
        longTapThreshold: 500,
        doubleTapThreshold: 200,
        swipe: null,
        swipeLeft: null,
        swipeRight: null,
        swipeUp: null,
        swipeDown: null,
        swipeStatus: null,
        pinchIn: null,
        pinchOut: null,
        pinchStatus: null,
        click: null,
        tap: null,
        doubleTap: null,
        longTap: null,
        hold: null,
        triggerOnTouchEnd: !0,
        triggerOnTouchLeave: !1,
        allowPageScroll: "auto",
        fallbackToMouseEvents: !0,
        excludedElements: "label, button, input, select, textarea, a, .noSwipe",
        preventDefaultEvents: !0
    };
    e.fn.swipe = function(i) {
        var n = e(this), r = n.data(I);
        if (r && "string" == typeof i) {
            if (r[i])
                return r[i].apply(this, Array.prototype.slice.call(arguments, 1));
            e.error("Method " + i + " does not exist on jQuery.swipe")
        } else if (!(r || "object" != typeof i && i))
            return t.apply(this, arguments);
        return n
    }, e.fn.swipe.version = n, e.fn.swipe.defaults = C, e.fn.swipe.phases = {
        PHASE_START: S,
        PHASE_MOVE: T,
        PHASE_END: k,
        PHASE_CANCEL: x
    }, e.fn.swipe.directions = {
        LEFT: r,
        RIGHT: o,
        UP: a,
        DOWN: s,
        IN: l,
        OUT: u
    }, e.fn.swipe.pageScroll = {
        NONE: c,
        HORIZONTAL: g,
        VERTICAL: v,
        AUTO: d
    }, e.fn.swipe.fingers = {
        ONE: 1,
        TWO: 2,
        THREE: 3,
        ALL: y
    }
}), function(e, t) {
    "use strict";
    var i = e.History = e.History || {}, n = e.jQuery;
    if ("undefined" != typeof i.Adapter)
        throw new Error("History.js Adapter has already been loaded...");
    i.Adapter = {
        bind: function(e, t, i) {
            n(e).bind(t, i)
        },
        trigger: function(e, t, i) {
            n(e).trigger(t, i)
        },
        extractEventData: function(e, i, n) {
            var r = i && i.originalEvent && i.originalEvent[e] || n && n[e] || t;
            return r
        },
        onDomLoad: function(e) {
            n(e)
        }
    }, "undefined" != typeof i.init && i.init()
}(window), function(e, t) {
    "use strict";
    var i = e.console || t, n = e.document, r = e.navigator, o=!1, a = e.setTimeout, s = e.clearTimeout, l = e.setInterval, u = e.clearInterval, c = e.JSON, d = e.alert, h = e.History = e.History || {}, f = e.history;
    try {
        o = e.sessionStorage, o.setItem("TEST", "1"), o.removeItem("TEST")
    } catch (p) {
        o=!1
    }
    if (c.stringify = c.stringify || c.encode, c.parse = c.parse || c.decode, "undefined" != typeof h.init)
        throw new Error("History.js Core has already been loaded...");
    h.init = function(e) {
        return "undefined" == typeof h.Adapter?!1 : ("undefined" != typeof h.initCore && h.initCore(), "undefined" != typeof h.initHtml4 && h.initHtml4(), !0)
    }, h.initCore = function(p) {
        if ("undefined" != typeof h.initCore.initialized)
            return !1;
        if (h.initCore.initialized=!0, h.options = h.options || {}, h.options.hashChangeInterval = h.options.hashChangeInterval || 100, h.options.safariPollInterval = h.options.safariPollInterval || 500, h.options.doubleCheckInterval = h.options.doubleCheckInterval || 500, h.options.disableSuid = h.options.disableSuid ||!1, h.options.storeInterval = h.options.storeInterval || 1e3, h.options.busyDelay = h.options.busyDelay || 250, h.options.debug = h.options.debug ||!1, h.options.initialTitle = h.options.initialTitle || n.title, h.options.html4Mode = h.options.html4Mode ||!1, h.options.delayInit = h.options.delayInit ||!1, h.intervalList = [], h.clearAllIntervals = function() {
            var e, t = h.intervalList;
            if ("undefined" != typeof t && null !== t) {
                for (e = 0; e < t.length; e++)
                    u(t[e]);
                h.intervalList = null
            }
        }, h.debug = function() {
            (h.options.debug ||!1) && h.log.apply(h, arguments)
        }, h.log = function() {
            var e, t, r, o, a, s = "undefined" != typeof i && "undefined" != typeof i.log && "undefined" != typeof i.log.apply, l = n.getElementById("log");
            for (s ? (o = Array.prototype.slice.call(arguments), e = o.shift(), "undefined" != typeof i.debug ? i.debug.apply(i, [e, o]) : i.log.apply(i, [e, o])) : e = "\n" + arguments[0] + "\n", t = 1, r = arguments.length; r > t; ++t) {
                if (a = arguments[t], "object" == typeof a && "undefined" != typeof c)
                    try {
                        a = c.stringify(a)
                    } catch (u) {}
                e += "\n" + a + "\n"
            }
            return l ? (l.value += e + "\n-----\n", l.scrollTop = l.scrollHeight - l.clientHeight) : s || d(e), !0
        }, h.getInternetExplorerMajorVersion = function() {
            var e = h.getInternetExplorerMajorVersion.cached = "undefined" != typeof h.getInternetExplorerMajorVersion.cached ? h.getInternetExplorerMajorVersion.cached: function() {
                for (var e = 3, t = n.createElement("div"), i = t.getElementsByTagName("i"); (t.innerHTML = "<!--[if gt IE " + ++e + "]><i></i><![endif]-->") && i[0];);
                return e > 4 ? e : !1
            }();
            return e
        }, h.isInternetExplorer = function() {
            var e = h.isInternetExplorer.cached = "undefined" != typeof h.isInternetExplorer.cached ? h.isInternetExplorer.cached: Boolean(h.getInternetExplorerMajorVersion());
            return e
        }, h.options.html4Mode ? h.emulated = {
            pushState: !0,
            hashChange: !0
        } : h.emulated = {
            pushState: !Boolean(e.history && e.history.pushState && e.history.replaceState&&!/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(r.userAgent)&&!/AppleWebKit\/5([0-2]|3[0-2])/i.test(r.userAgent)),
            hashChange: Boolean(!("onhashchange"in e || "onhashchange"in n) || h.isInternetExplorer() && h.getInternetExplorerMajorVersion() < 8)
        }, h.enabled=!h.emulated.pushState, h.bugs = {
            setHash: Boolean(!h.emulated.pushState && "Apple Computer, Inc." === r.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(r.userAgent)),
            safariPoll: Boolean(!h.emulated.pushState && "Apple Computer, Inc." === r.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(r.userAgent)),
            ieDoubleCheck: Boolean(h.isInternetExplorer() && h.getInternetExplorerMajorVersion() < 8),
            hashEscape: Boolean(h.isInternetExplorer() && h.getInternetExplorerMajorVersion() < 7)
        }, h.isEmptyObject = function(e) {
            for (var t in e)
                if (e.hasOwnProperty(t))
                    return !1;
            return !0
        }, h.cloneObject = function(e) {
            var t, i;
            return e ? (t = c.stringify(e), i = c.parse(t)) : i = {}, i
        }, h.getRootUrl = function() {
            var e = n.location.protocol + "//" + (n.location.hostname || n.location.host);
            return n.location.port && (e += ":" + n.location.port), e += "/"
        }, h.getBaseHref = function() {
            var e = n.getElementsByTagName("base"), t = null, i = "";
            return 1 === e.length && (t = e[0], i = t.href.replace(/[^\/]+$/, "")), i = i.replace(/\/+$/, ""), i && (i += "/"), i
        }, h.getBaseUrl = function() {
            var e = h.getBaseHref() || h.getBasePageUrl() || h.getRootUrl();
            return e
        }, h.getPageUrl = function() {
            var e, t = h.getState(!1, !1), i = (t || {}).url || h.getLocationHref();
            return e = i.replace(/\/+$/, "").replace(/[^\/]+$/, function(e, t, i) {
                return /\./.test(e) ? e : e + "/"
            })
        }, h.getBasePageUrl = function() {
            var e = h.getLocationHref().replace(/[#\?].*/, "").replace(/[^\/]+$/, function(e, t, i) {
                return /[^\/]$/.test(e) ? "" : e
            }).replace(/\/+$/, "") + "/";
            return e
        }, h.getFullUrl = function(e, t) {
            var i = e, n = e.substring(0, 1);
            return t = "undefined" == typeof t?!0 : t, /[a-z]+\:\/\//.test(e) || (i = "/" === n ? h.getRootUrl() + e.replace(/^\/+/, "") : "#" === n ? h.getPageUrl().replace(/#.*/, "") + e : "?" === n ? h.getPageUrl().replace(/[\?#].*/, "") + e : t ? h.getBaseUrl() + e.replace(/^(\.\/)+/, "") : h.getBasePageUrl() + e.replace(/^(\.\/)+/, "")), i.replace(/\#$/, "")
        }, h.getShortUrl = function(e) {
            var t = e, i = h.getBaseUrl(), n = h.getRootUrl();
            return h.emulated.pushState && (t = t.replace(i, "")), t = t.replace(n, "/"), h.isTraditionalAnchor(t) && (t = "./" + t), t = t.replace(/^(\.\/)+/g, "./").replace(/\#$/, "")
        }, h.getLocationHref = function(e) {
            return e = e || n, e.URL === e.location.href ? e.location.href : e.location.href === decodeURIComponent(e.URL) ? e.URL : e.location.hash && decodeURIComponent(e.location.href.replace(/^[^#]+/, "")) === e.location.hash ? e.location.href : - 1 == e.URL.indexOf("#")&&-1 != e.location.href.indexOf("#") ? e.location.href : e.URL || e.location.href
        }, h.store = {}, h.idToState = h.idToState || {}, h.stateToId = h.stateToId || {}, h.urlToId = h.urlToId || {}, h.storedStates = h.storedStates || [], h.savedStates = h.savedStates || [], h.normalizeStore = function() {
            h.store.idToState = h.store.idToState || {}, h.store.urlToId = h.store.urlToId || {}, h.store.stateToId = h.store.stateToId || {}
        }, h.getState = function(e, t) {
            "undefined" == typeof e && (e=!0), "undefined" == typeof t && (t=!0);
            var i = h.getLastSavedState();
            return !i && t && (i = h.createStateObject()), e && (i = h.cloneObject(i), i.url = i.cleanUrl || i.url), i
        }, h.getIdByState = function(e) {
            var t, i = h.extractId(e.url);
            if (!i)
                if (t = h.getStateString(e), "undefined" != typeof h.stateToId[t])
                    i = h.stateToId[t];
                else if ("undefined" != typeof h.store.stateToId[t])
                    i = h.store.stateToId[t];
                else {
                    for (; i = (new Date).getTime() + String(Math.random()).replace(/\D/g, ""), "undefined" != typeof h.idToState[i] || "undefined" != typeof h.store.idToState[i];);
                    h.stateToId[t] = i, h.idToState[i] = e
                }
            return i
        }, h.normalizeState = function(e) {
            var t, i;
            return e && "object" == typeof e || (e = {}), "undefined" != typeof e.normalized ? e : (e.data && "object" == typeof e.data || (e.data = {}), t = {}, t.normalized=!0, t.title = e.title || "", t.url = h.getFullUrl(e.url ? e.url : h.getLocationHref()), t.hash = h.getShortUrl(t.url), t.data = h.cloneObject(e.data), t.id = h.getIdByState(t), t.cleanUrl = t.url.replace(/\??\&_suid.*/, ""), t.url = t.cleanUrl, i=!h.isEmptyObject(t.data), (t.title || i) && h.options.disableSuid!==!0 && (t.hash = h.getShortUrl(t.url).replace(/\??\&_suid.*/, ""), /\?/.test(t.hash) || (t.hash += "?"), t.hash += "&_suid=" + t.id), t.hashedUrl = h.getFullUrl(t.hash), (h.emulated.pushState || h.bugs.safariPoll) && h.hasUrlDuplicate(t) && (t.url = t.hashedUrl), t)
        }, h.createStateObject = function(e, t, i) {
            var n = {
                data: e,
                title: t,
                url: i
            };
            return n = h.normalizeState(n)
        }, h.getStateById = function(e) {
            e = String(e);
            var i = h.idToState[e] || h.store.idToState[e] || t;
            return i
        }, h.getStateString = function(e) {
            var t, i, n;
            return t = h.normalizeState(e), i = {
                data: t.data,
                title: e.title,
                url: e.url
            }, n = c.stringify(i)
        }, h.getStateId = function(e) {
            var t, i;
            return t = h.normalizeState(e), i = t.id
        }, h.getHashByState = function(e) {
            var t, i;
            return t = h.normalizeState(e), i = t.hash
        }, h.extractId = function(e) {
            var t, i, n, r;
            return r =- 1 != e.indexOf("#") ? e.split("#")[0] : e, i = /(.*)\&_suid=([0-9]+)$/.exec(r), n = i ? i[1] || e : e, t = i ? String(i[2] || "") : "", t ||!1
        }, h.isTraditionalAnchor = function(e) {
            var t=!/[\/\?\.]/.test(e);
            return t
        }, h.extractState = function(e, t) {
            var i, n, r = null;
            return t = t ||!1, i = h.extractId(e), i && (r = h.getStateById(i)), r || (n = h.getFullUrl(e), i = h.getIdByUrl(n) ||!1, i && (r = h.getStateById(i)), !r && t&&!h.isTraditionalAnchor(e) && (r = h.createStateObject(null, null, n))), r
        }, h.getIdByUrl = function(e) {
            var i = h.urlToId[e] || h.store.urlToId[e] || t;
            return i
        }, h.getLastSavedState = function() {
            return h.savedStates[h.savedStates.length - 1] || t
        }, h.getLastStoredState = function() {
            return h.storedStates[h.storedStates.length - 1] || t
        }, h.hasUrlDuplicate = function(e) {
            var t, i=!1;
            return t = h.extractState(e.url), i = t && t.id !== e.id
        }, h.storeState = function(e) {
            return h.urlToId[e.url] = e.id, h.storedStates.push(h.cloneObject(e)), e
        }, h.isLastSavedState = function(e) {
            var t, i, n, r=!1;
            return h.savedStates.length && (t = e.id, i = h.getLastSavedState(), n = i.id, r = t === n), r
        }, h.saveState = function(e) {
            return h.isLastSavedState(e)?!1 : (h.savedStates.push(h.cloneObject(e)), !0)
        }, h.getStateByIndex = function(e) {
            var t = null;
            return t = "undefined" == typeof e ? h.savedStates[h.savedStates.length - 1] : 0 > e ? h.savedStates[h.savedStates.length + e] : h.savedStates[e]
        }, h.getCurrentIndex = function() {
            var e = null;
            return e = h.savedStates.length < 1 ? 0 : h.savedStates.length - 1
        }, h.getHash = function(e) {
            var t, i = h.getLocationHref(e);
            return t = h.getHashByUrl(i)
        }, h.unescapeHash = function(e) {
            var t = h.normalizeHash(e);
            return t = decodeURIComponent(t)
        }, h.normalizeHash = function(e) {
            var t = e.replace(/[^#]*#/, "").replace(/#.*/, "");
            return t
        }, h.setHash = function(e, t) {
            var i, r;
            return t!==!1 && h.busy() ? (h.pushQueue({
                scope: h,
                callback: h.setHash,
                args: arguments,
                queue: t
            }), !1) : (h.busy(!0), i = h.extractState(e, !0), i&&!h.emulated.pushState ? h.pushState(i.data, i.title, i.url, !1) : h.getHash() !== e && (h.bugs.setHash ? (r = h.getPageUrl(), h.pushState(null, null, r + "#" + e, !1)) : n.location.hash = e), h)
        }, h.escapeHash = function(t) {
            var i = h.normalizeHash(t);
            return i = e.encodeURIComponent(i), h.bugs.hashEscape || (i = i.replace(/\%21/g, "!").replace(/\%26/g, "&").replace(/\%3D/g, "=").replace(/\%3F/g, "?")), i
        }, h.getHashByUrl = function(e) {
            var t = String(e).replace(/([^#]*)#?([^#]*)#?(.*)/, "$2");
            return t = h.unescapeHash(t)
        }, h.setTitle = function(e) {
            var t, i = e.title;
            i || (t = h.getStateByIndex(0), t && t.url === e.url && (i = t.title || h.options.initialTitle));
            try {
                n.getElementsByTagName("title")[0].innerHTML = i.replace("<", "&lt;").replace(">", "&gt;").replace(" & ", " &amp; ")
            } catch (r) {}
            return n.title = i, h
        }, h.queues = [], h.busy = function(e) {
            if ("undefined" != typeof e ? h.busy.flag = e : "undefined" == typeof h.busy.flag && (h.busy.flag=!1), !h.busy.flag) {
                s(h.busy.timeout);
                var t = function() {
                    var e, i, n;
                    if (!h.busy.flag)
                        for (e = h.queues.length - 1; e >= 0; --e)
                            i = h.queues[e], 0 !== i.length && (n = i.shift(), h.fireQueueItem(n), h.busy.timeout = a(t, h.options.busyDelay))
                };
                h.busy.timeout = a(t, h.options.busyDelay)
            }
            return h.busy.flag
        }, h.busy.flag=!1, h.fireQueueItem = function(e) {
            return e.callback.apply(e.scope || h, e.args || [])
        }, h.pushQueue = function(e) {
            return h.queues[e.queue || 0] = h.queues[e.queue || 0] || [], h.queues[e.queue || 0].push(e), h
        }, h.queue = function(e, t) {
            return "function" == typeof e && (e = {
                callback: e
            }), "undefined" != typeof t && (e.queue = t), h.busy() ? h.pushQueue(e) : h.fireQueueItem(e), h
        }, h.clearQueue = function() {
            return h.busy.flag=!1, h.queues = [], h
        }, h.stateChanged=!1, h.doubleChecker=!1, h.doubleCheckComplete = function() {
            return h.stateChanged=!0, h.doubleCheckClear(), h
        }, h.doubleCheckClear = function() {
            return h.doubleChecker && (s(h.doubleChecker), h.doubleChecker=!1), h
        }, h.doubleCheck = function(e) {
            return h.stateChanged=!1, h.doubleCheckClear(), h.bugs.ieDoubleCheck && (h.doubleChecker = a(function() {
                return h.doubleCheckClear(), h.stateChanged || e(), !0
            }, h.options.doubleCheckInterval)), h
        }, h.safariStatePoll = function() {
            var t, i = h.extractState(h.getLocationHref());
            return h.isLastSavedState(i) ? void 0 : (t = i, t || (t = h.createStateObject()), h.Adapter.trigger(e, "popstate"), h)
        }, h.back = function(e) {
            return e!==!1 && h.busy() ? (h.pushQueue({
                scope: h,
                callback: h.back,
                args: arguments,
                queue: e
            }), !1) : (h.busy(!0), h.doubleCheck(function() {
                h.back(!1)
            }), f.go( - 1), !0)
        }, h.forward = function(e) {
            return e!==!1 && h.busy() ? (h.pushQueue({
                scope: h,
                callback: h.forward,
                args: arguments,
                queue: e
            }), !1) : (h.busy(!0), h.doubleCheck(function() {
                h.forward(!1)
            }), f.go(1), !0)
        }, h.go = function(e, t) {
            var i;
            if (e > 0)
                for (i = 1; e >= i; ++i)
                    h.forward(t);
            else {
                if (!(0 > e))
                    throw new Error("History.go: History.go requires a positive or negative integer passed.");
                for (i =- 1; i >= e; --i)
                    h.back(t)
            }
            return h
        }, h.emulated.pushState) {
            var b = function() {};
            h.pushState = h.pushState || b, h.replaceState = h.replaceState || b
        } else 
            h.onPopState = function(t, i) {
                var n, r, o=!1, a=!1;
                return h.doubleCheckComplete(), n = h.getHash(), n ? (r = h.extractState(n || h.getLocationHref(), !0), r ? h.replaceState(r.data, r.title, r.url, !1) : (h.Adapter.trigger(e, "anchorchange"), h.busy(!1)), h.expectedStateId=!1, !1) : (o = h.Adapter.extractEventData("state", t, i) ||!1, a = o ? h.getStateById(o) : h.expectedStateId ? h.getStateById(h.expectedStateId) : h.extractState(h.getLocationHref()), a || (a = h.createStateObject(null, null, h.getLocationHref())), h.expectedStateId=!1, h.isLastSavedState(a) ? (h.busy(!1), !1) : (h.storeState(a), h.saveState(a), h.setTitle(a), h.Adapter.trigger(e, "statechange"), h.busy(!1), !0))
            }, h.Adapter.bind(e, "popstate", h.onPopState), h.pushState = function(t, i, n, r) {
                if (h.getHashByUrl(n) && h.emulated.pushState)
                    throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                    if (r!==!1 && h.busy())
                        return h.pushQueue({
                            scope: h,
                            callback: h.pushState,
                            args: arguments,
                            queue: r
                        }), !1;
                        h.busy(!0);
                        var o = h.createStateObject(t, i, n);
                        return h.isLastSavedState(o) ? h.busy(!1) : (h.storeState(o), h.expectedStateId = o.id, f.pushState(o.id, o.title, o.url), h.Adapter.trigger(e, "popstate")), !0
                    }, h.replaceState = function(t, i, n, r) {
                        if (h.getHashByUrl(n) && h.emulated.pushState)
                            throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                            if (r!==!1 && h.busy())
                                return h.pushQueue({
                                    scope: h,
                                    callback: h.replaceState,
                                    args: arguments,
                                    queue: r
                                }), !1;
                                h.busy(!0);
                                var o = h.createStateObject(t, i, n);
                                return h.isLastSavedState(o) ? h.busy(!1) : (h.storeState(o), h.expectedStateId = o.id, f.replaceState(o.id, o.title, o.url), h.Adapter.trigger(e, "popstate")), !0
                            };
        if (o) {
            try {
                h.store = c.parse(o.getItem("History.store")) || {}
            } catch (m) {
                h.store = {}
            }
            h.normalizeStore()
        } else 
            h.store = {}, h.normalizeStore();
        h.Adapter.bind(e, "unload", h.clearAllIntervals), h.saveState(h.storeState(h.extractState(h.getLocationHref(), !0))), o && (h.onUnload = function() {
            var e, t, i;
            try {
                e = c.parse(o.getItem("History.store")) || {}
            } catch (n) {
                e = {}
            }
            e.idToState = e.idToState || {}, e.urlToId = e.urlToId || {}, e.stateToId = e.stateToId || {};
            for (t in h.idToState)
                h.idToState.hasOwnProperty(t) && (e.idToState[t] = h.idToState[t]);
            for (t in h.urlToId)
                h.urlToId.hasOwnProperty(t) && (e.urlToId[t] = h.urlToId[t]);
            for (t in h.stateToId)
                h.stateToId.hasOwnProperty(t) && (e.stateToId[t] = h.stateToId[t]);
            h.store = e, h.normalizeStore(), i = c.stringify(e);
            try {
                o.setItem("History.store", i)
            } catch (r) {
                if (r.code !== DOMException.QUOTA_EXCEEDED_ERR)
                    throw r;
                o.length && (o.removeItem("History.store"), o.setItem("History.store", i))
            }
        }, h.intervalList.push(l(h.onUnload, h.options.storeInterval)), h.Adapter.bind(e, "beforeunload", h.onUnload), h.Adapter.bind(e, "unload", h.onUnload)), h.emulated.pushState || (h.bugs.safariPoll && h.intervalList.push(l(h.safariStatePoll, h.options.safariPollInterval)), ("Apple Computer, Inc." === r.vendor || "Mozilla" === (r.appCodeName || "")) && (h.Adapter.bind(e, "hashchange", function() {
            h.Adapter.trigger(e, "popstate")
        }), h.getHash() && h.Adapter.onDomLoad(function() {
            h.Adapter.trigger(e, "hashchange")
        })))
    }, (!h.options ||!h.options.delayInit) && h.init()
}(window);
var Dribbble = Dribbble || {};
DEVICE_WIDTH_BREAKPOINT = "800px", HIDPI_BREAKPOINT = "(-webkit-min-device-pixel-ratio: 1.5),(min--moz-device-pixel-ratio: 1.5),(-o-min-device-pixel-ratio: 3/2),(min-device-pixel-ratio: 1.5),(min-resolution: 1.5dppx)";
var tipsyOptions = {
    fade: !1,
    opacity: .95,
    className: function() {
        return this.getAttribute("data-tipsy-class")
    },
    gravity: function() {
        var e = 100, t = $(this).offset(), i = t.left, n = t.top;
        return e > i ? "sw" : i > $(window).width() - e ? e > n ? "ne" : "se" : e > n ? "n" : "s"
    }
};
$(document).ajaxSend(function(e, t, i) {
    var n = $('meta[name="csrf-token"]').attr("content");
    t.setRequestHeader("X-CSRF-Token", n)
}), $("a[href=#]").click(function(e) {
    e.preventDefault()
}), User = {
    loggedIn: function() {
        return $("body.logged-in").length > 0
    },
    loggedOut: function() {
        return !this.loggedIn()
    },
    isPro: function() {
        return $("body.pro").length > 0
    },
    isTeam: function() {
        return $("body.team").length > 0
    }
}, initRecentActivity(), $(function() {
    $("[placeholder]").focus(function() {
        var e = $(this);
        e.val() == e.attr("placeholder") && (e.val(""), e.removeClass("placeholder"))
    }).blur(function() {
        var e = $(this);
        ("" == e.val() || e.val() == e.attr("placeholder")) && (e.addClass("placeholder"), e.val(e.attr("placeholder")))
    }).blur(), $("[placeholder]").parents("form").submit(function() {
        $(this).find("[placeholder]").each(function() {
            var e = $(this);
            e.val() == e.attr("placeholder") && e.val("")
        })
    })
}), $("#toggle-nav").click(function() {
    return $("#nav").toggleClass("nav-open"), $("body").toggleClass("scroll"), $("html, body").scrollTop(0), !1
}), $(".places-location").hover(function() {
    return $(".places-location ul").toggle(), !1
}), $("#t-more > a, #t-profile > a").click(function(e) {
    var t = $(this).parent();
    $("ul#nav").hasClass("nav-open") && (e.preventDefault(), $(this).toggleClass("back-link"), $("#nav > li:not(#t-activity,#t-upld)").toggle(), t.toggle().toggleClass("nav-expanded"), $("html, body").scrollTop(0))
}), $(".subscribe-to-notification").on("ajax:success", "a[data-method]", function(e, t) {
    $(e.target).closest(".subscribe-to-notification").html(t)
}), jQuery.fn.showAndHide = function(e) {
    return $(e).hide(), this.show()
}, jQuery.fn.modelId = function() {
    var e = $(this).attr("id");
    if (null == e)
        return null;
    var t = e.split(/[-_]/g);
    return t.length > 1 ? t[t.length - 1] : null
}, Notify = {
    success: function(e) {
        Notify.notify("success", e)
    },
    warning: function(e) {
        Notify.notify("warning", e)
    },
    error: function(e) {
        Notify.notify("error", e)
    },
    alert: function(e, t) {
        var t = t || {}, i = $(".notice-alert"), n = Math.max(0, $("#header").height() - $(document).scrollTop()), r = function() {
            i.fadeOut(500, function() {
                i.find("a.close").show()
            })
        };
        if ($(document).keyup(function(e) {
            27 == e.which && r()
        }), i.css({
            top: n + "px"
        }).find("h3").html(e).end().find("a.close").click(function() {
            r()
        }).end().show(), t.timeout) {
            i.find("a.close").hide();
            var o = t.timeout;
            o = "number" == typeof o ? o : 3e3, setTimeout(r, o)
        }
    },
    clear: function() {
        $(".notice").hide().removeClass("success warning error").find("h2").text("")
    },
    notify: function(e, t) {
        Notify.clear(), $(".ajax.notice").find("h2").html(t).end().find("a.close").click(Notify.clear).end().addClass(e).show()
    },
    scrollTo: function() {
        $("html, body").scrollTop($(".notice").offset().top)
    }
}, $.fn.clank = function(e) {
    if (null != e) {
        var t = $(this).closest("form");
        t.find(".errorExplanation").remove(), t.find("fieldset").removeClass("fieldWithErrors"), e = '<div class="errorExplanation" id="errorExplanation"><h2>Clank!</h2><ul><li>' + e + "</li></ul></div>", t.prepend(e), t.find("fieldset").addClass("fieldWithErrors")
    }
}, ShowAndHideControl = function(e) {
    var t = $(e.target), i = $(e.showControl), n = $(e.hideControl);
    i.click(function() {
        return t.showAndHide(i), !1
    }), n.click(function() {
        return t.hide(), i.show(), !1
    })
}, ResultsPane = function(e) {
    $paneContainer = $(e || "#main");
    var t = $paneContainer.find(".results-pane"), i = $paneContainer.find("div.processing");
    return {
        waiting: function() {
            i.show(), t.css("opacity", .2)
        },
        finished: function() {
            i.hide(), t.css("opacity", 1)
        },
        noResults: function(e) {
            e = e || "None", t.html('<div class="null-message"><h2>' + e + "</h2></div>")
        }
    }
}, $("#t-search").click(function() {
    return $("#dashboard").slideToggle("normal"), !1
}), $("[rel*=tipsy]").tipsy(tipsyOptions), $(document).ajaxSuccess(function() {
    $("[rel*=tipsy]").tipsy(tipsyOptions)
}), $("a[data-hover]").hover(function() {
    var e = $(this);
    e.attr("data-hover-out", e.text()).text(e.attr("data-hover"))
}, function() {
    var e = $(this);
    e.text(e.attr("data-hover-out")), e.removeAttr("data-hover-out")
});
var showActionMenu = function(e) {
    Dribbble.HoverCards && Dribbble.HoverCards.dismiss(), $(e.target).closest(".actions-menu").addClass("active").find(".actions-list").show()
}, hideActionMenu = function(e) {
    $(e.target).closest(".actions-menu").removeClass("active").find(".actions-list").hide()
}, toggleActionMenu = function(e) {
    $(e.target).closest(".actions-menu").hasClass("active") ? hideActionMenu(e) : showActionMenu(e)
};
$("body").on({
    mouseenter: showActionMenu,
    mouseleave: hideActionMenu
}, ".actions-menu"), $(".action.grid").on("touchstart", toggleActionMenu), $(".actions-list li a").click(function() {
    $(this).closest(".actions-menu").removeClass("active").find(".actions-list").hide()
}), $("a.block").live("click", function(e) {
    var t = this;
    $.post(t.href, function() {
        memberContainer(t).addClass("blocked-by-current-user").removeClass("followed-by-current-user listed-by-current-user")
    }), e.preventDefault()
}), $("a.unblock").live("click", function(e) {
    var t = this;
    $.ajax(t.href, {
        type: "DELETE",
        success: function() {
            memberContainer(t).removeClass("blocked-by-current-user")
        }
    }), e.preventDefault()
}), $(".actions-list").find(".remove-from-team a").live("click", function(e) {
    if (!confirm("Remove this member from the team?"))
        return !1;
    var t = this;
    $.ajax(t.href, {
        type: "DELETE",
        success: function(e) {
            e.error ? Notify.error(e.error) : Notify.alert(e.success)
        }
    }), e.preventDefault()
}).end().find(".leave-team a").live("click", function(e) {
    if (!confirm("You are about to leave this team. Continue?"))
        return !1;
    var t = this;
    $.ajax(t.href, {
        type: "DELETE",
        success: function(e) {
            e.error ? Notify.error(e.error) : Notify.alert(e.success)
        }
    }), e.preventDefault()
}).end(), window.matchMedia("screen and (min-width: " + DEVICE_WIDTH_BREAKPOINT + ")").matches || $("#main .tabs > li.has-dd > a, div.full-tabs ul.full-tabs-links > li.more > a").click(function() {
    var e = $(this).parent();
    return e.hasClass("hover") ? e.removeClass("hover") : ($("#main .tabs > li.hover, div.full-tabs ul.full-tabs-links > li.hover").removeClass("hover"), e.addClass("hover")), !1
}), function() {
    window.innerWidth < 870 && $(".vertical-sidenav li.active a").click(function(e) {
        e.preventDefault(), $(".vertical-sidenav").toggleClass("open")
    })
}(), Dribbble.isHistorySupported = function() {
    return window.history && "pushState"in window.history
}, Dribbble.isMobile = function() {
    return window.matchMedia("(max-width: 959px)").matches?!0 : Dribbble.isMobileSafari()?!0 : !1
}, Dribbble.isMobileSafari = function() {
    return navigator.userAgent.match(/(iPad|iPhone|iPod touch)/)?!0 : !1
}, Dribbble.FollowButton = function(e, t) {
    return t = t || function() {
        return null
    }, {
        initialize: function() {
            this.bindEventListeners()
        },
        bindEventListeners: function() {
            e.on("click", ".follow-prompt a.follow", this.follow.bind(this)), e.on("click", ".follow-prompt a.unfollow", this.unfollow.bind(this))
        },
        follow: function(e) {
            var t = $(e.currentTarget), i = memberContainer(t);
            return i.hasClass("blocking-current-user") ? (Notify.alert("You have been blocked from following this account at the request of the member."), !1) : ($.ajax(t.attr("href"), {
                type: "POST",
                beforeSend: function() {
                    t.addClass("processing")
                }
            }).done(function() {
                i.addClass("followed-by-current-user"), this.modifyFollowerCount(1, i)
            }.bind(this)).fail(function(e) {
                Notify.alert(e.responseText)
            }).always(function() {
                t.removeClass("processing")
            }), !1)
        },
        unfollow: function(e) {
            var t = $(e.currentTarget), i = memberContainer(t);
            return $.ajax(t.attr("href"), {
                type: "DELETE",
                beforeSend: function() {
                    t.addClass("processing")
                }
            }).done(function() {
                i.removeClass("followed-by-current-user"), this.modifyFollowerCount( - 1, i)
            }.bind(this)).always(function() {
                t.removeClass("processing")
            }), !1
        },
        modifyFollowerCount: function(e, i) {
            var n = t(i);
            if (n && 1 == n.length) {
                var r = n.find(".meta"), o = n.find(".count"), a = parseInt(o.text().replace(",", ""), 10) + e;
                o.text(numberWithDelimiter(a)), 1 == a ? r.text("Follower") : r.text("Followers")
            }
        }
    }
}, new Dribbble.FollowButton($("#wrap")).initialize(), new Dribbble.FollowButton($(".profile-dash-actions"), function() {
    return $(".full-tabs .full-tabs-links .followers")
}).initialize(), Dribbble.Overlay = {
    overlays: [],
    anyOpen: function() {
        for (i = 0; i < this.overlays.length; i++)
            if (this.overlays[i].isOpen)
                return !0;
        return !1
    },
    applyOptions: function(e, t) {
        var i = function(e) {
            return [].concat(e || [])
        };
        return e.$el = t.$el, t.trigger && (e.trigger = t.trigger, e.bindTrigger()), e.beforeShow = i(t.beforeShow), e.onShow = i(t.onShow), e.beforeHide = i(t.beforeHide), e.onHide = i(t.onHide), t.remoteContent && (e.remoteContent = t.remoteContent, e.beforeShow.push(t.loadRemoteContent || e.defaultLoadRemoteContent.bind(e)), e.onHide.push(t.hideRemoteContent || e.defaultHideRemoteContent.bind(e))), e
    }
}, Dribbble.Overlay.Simple = function(e) {
    Dribbble.Overlay.applyOptions(this, e), Dribbble.Overlay.overlays.push(this)
}, Dribbble.Overlay.Simple.prototype = {
    isOpen: !1,
    currentTarget: null,
    _runCallbacks: function(e) {
        var t=!0;
        return $.each(e, function(e, i) {
            t && 0 == i() && (t=!1)
        }.bind(this)), t
    },
    bindTrigger: function() {
        $(this.trigger).click(function(e) {
            e.preventDefault(), this.currentTarget = e.currentTarget, this.show()
        }.bind(this))
    },
    find: function(e) {
        return this.$el.find(e)
    },
    defaultLoadRemoteContent: function() {
        var e = this.remoteContent.url || $(this.currentTarget || this.trigger).attr("href");
        $.isFunction(e) && (e = e.apply(this)), $(this.remoteContent.el).load(e, (this.remoteContent.onComplete || $.noop).bind(this))
    },
    defaultHideRemoteContent: function() {
        $(this.remoteContent.el).html('<div class="processing">Loading ...</div>')
    },
    listenForEvents: function() {
        this.$el.on("click.overlay", ".close", this.hide.bind(this)), this.$el.on("click.overlay", "form .cancel", this.hide.bind(this)), this.suppressClickToClose || this.$el.on("click.overlay", function(e) {
            $(e.target).is(this.$el) && this.hide()
        }.bind(this)), this.keyListeners = Dribbble.Hotkeys.map("overlay", {
            ESCAPE: this.hide.bind(this)
        })
    },
    stopListeningForEvents: function() {
        this.$el.off("click.overlay"), this.keyListeners.off()
    },
    show: function(e) {
        return this._runCallbacks(this.beforeShow) ? (this.listenForEvents(), this.$el.css("height", "100%"), this.$el.fadeIn(function() {
            this.$el.focus(), this._runCallbacks(this.onShow)
        }.bind(this)), this.isOpen=!0, !1) : !1
    },
    hide: function() {
        return this._runCallbacks(this.beforeHide) ? (this.stopListeningForEvents(), this.$el.fadeOut(function() {
            this._runCallbacks(this.onHide)
        }.bind(this)), this.isOpen=!1, !1) : !1
    }
}, Dribbble.Overlay.RemoteForm = function(e) {
    Dribbble.Overlay.applyOptions(this, e), this.form = e.form, this.verb = e.verb || "POST", this.onSuccess = e.onSuccess || this.defaultOnSuccess.bind(this), this.onError = e.onError || this.defaultOnError.bind(this), this.containerToUpdateOnSuccess = e.containerToUpdateOnSuccess, this.containerToUpdateOnFailure = e.containerToUpdateOnFailure, this.successNotification = e.successNotification, Dribbble.Overlay.overlays.push(this)
}, Dribbble.Overlay.RemoteForm.prototype = $.extend({}, Dribbble.Overlay.Simple.prototype, {
    defaultOnError: function(e, t, i) {
        422 == e.status ? $(this.containerToUpdateOnFailure).html(e.responseText) : Notify.alert(e.responseText)
    },
    listenForEvents: function() {
        Dribbble.Overlay.Simple.prototype.listenForEvents.apply(this), this.$el.on("submit.remoteOverlay", this.form || "form", this.submit.bind(this))
    },
    stopListeningForEvents: function() {
        Dribbble.Overlay.Simple.prototype.stopListeningForEvents.apply(this), this.$el.off("submit.remoteOverlay")
    },
    defaultOnSuccess: function(e) {
        this.hide(), $(this.containerToUpdateOnSuccess).html(e), this.successNotification && Notify.success(this.successNotification)
    },
    submit: function(e) {
        e.preventDefault();
        var t = this.find(this.form || "form");
        $.ajax({
            context: this,
            type: this.verb,
            url: t.attr("action"),
            data: t.serialize(),
            success: this.onSuccess,
            error: this.onError
        })
    }
}), Dribbble.Overlay.Adapters = {
    bind: function(e, t, i) {
        var n = e.data(), r = {
            $el: $(n.overlay || "#overlay"),
            trigger: e,
            form: n.form,
            containerToUpdateOnFailure: n.failureContainer || n.remoteContent && n.remoteContent.container,
            containerToUpdateOnSuccess: n.successContainer,
            successNotification: n.notification
        };
        n.remoteContent && (r.remoteContent = {
            el: n.remoteContent.container,
            url: n.remoteContent.url
        }), e.data().overlayObj = new t(r)
    },
    SimpleTrigger: function(e) {
        Dribbble.Overlay.Adapters.bind(e, Dribbble.Overlay.Simple)
    },
    RemoteFormTrigger: function(e) {
        Dribbble.Overlay.Adapters.bind(e, Dribbble.Overlay.RemoteForm)
    },
    bindAll: function() {
        $(".overlay-trigger").each(function() {
            $(this).data().overlayObj || new Dribbble.Overlay.Adapters.SimpleTrigger($(this))
        }), $(".overlay-form-trigger").each(function() {
            $(this).data().overlayObj || new Dribbble.Overlay.Adapters.RemoteFormTrigger($(this))
        })
    }
}, Dribbble.Overlay.Adapters.bindAll(), $(document).ajaxComplete(function(e, t, i) {
    setTimeout(function() {
        Dribbble.Overlay.Adapters.bindAll()
    })
}), Dribbble.ClickTracking = {}, Dribbble.ClickTracking.init = function(e) {
    $(e || document).find("a[data-url]").each(function() {
        var e = $(this), t = e.data("url"), i = e.attr("href");
        e.data("url", i).attr("href", t)
    }).click(function() {
        var e = $(this);
        e.attr("href", e.data("url"))
    })
}, Dribbble.ClickTracking.init(document), $(".psst .close").click(function() {
    var e = $(this), t = e.next(), i = t.next();
    $.post(t.data("url")), 0 == i.length ? $(".psst").slideUp() : t.fadeOut(function() {
        t.remove(), i.fadeIn()
    })
}), Dribbble.Shots = {
    data: {},
    add: function(e) {
        $(e).each(function(e, t) {
            this.data[t.id] = t
        }.bind(this))
    },
    update: function(e, t) {
        var i = this.data[e];
        if (i) {
            for (var n in t)
                i[n] = t[n];
            i.liker && i.liker.render()
        }
    },
    idFromShotDiv: function(e) {
        return e[0].id.split("-")[1]
    },
    logView: function(e) {
        Dribbble.ShotViewRecorder.queueView(e), this.logAnalyticsView(e)
    },
    logViewForShotInDiv: function(e) {
        this.logView(this.idFromShotDiv(e))
    },
    logAnalyticsView: function(e) {
        for (var t = this.data[e], i = 0; i < t.ga.length; i++) {
            var n = t.ga[i];
            Dribbble.Analytics.logPageView(n[1], n[0], t.path, t.title)
        }
    },
    logAnalyticsLike: function(e, t) {
        for (var i = this.data[e], n = 0; n < i.ga.length; n++) {
            var r = i.ga[n];
            Dribbble.Analytics.log(r[1], r[0], "event", {
                eventCategory: "Shots",
                eventAction: t.action || "like",
                eventLabel: "Shot: " + e
            })
        }
    }
}, Dribbble.TeaserStats = {
    init: function(e) {
        var t = $("#main ol.dribbbles>li");
        $(e).each(function(e, t) {
            var i = $("ol.dribbbles li#screenshot-" + t.id);
            t.rebounds_count > 0 ? i.find(".has-rebounds").html(numberWithDelimiter(t.rebounds_count)).closest("a").show() : t.is_rebound && i.find(".is-rebound").closest("a").show(), t.attachments_count > 0 && i.find(".attachments-mark").show(), t.liked_by_html && i.find(".dribbble-img").append(t.liked_by_html).find("em").hide(), i.find("li.views span").html(numberWithDelimiter(t.view_count)), i.find("li.cmnt").each(function() {
                var e = $(this);
                e.find("span").html(numberWithDelimiter(t.comments_count)).tipsy(tipsyOptions)
            }), i.find(".timestamp").html(t.created_at), t.liker = new Dribbble.ShotLiker(t, i), t.liker.render()
        }), t.find("ul.tools").css({
            visibility: "visible"
        })
    }
}, Dribbble.ShotLiker = function(e, t) {
    var i, n=!1;
    return {
        initialized: !1,
        init: function() {
            if (!this.initialized) {
                if (i = t.find("li.fav"), User.loggedIn()) {
                    var e = function(e) {
                        return $(e.target).tipsy("hide"), this.toggle(), !1
                    }.bind(this);
                    $("<a href='#' class='toggle-fav'> </a>").insertBefore(i.find("a")).on("click", e), i.find("a").tipsy(tipsyOptions)
                }
                this.initialized=!0
            }
        },
        render: function() {
            this.init();
            var t = i.find("a:last");
            t.html(numberWithDelimiter(e.likes_count)), i.toggleClass("marked", e.liked)
        },
        toggle: function() {
            n || (Dribbble.Shots.logAnalyticsView(e.id), like_or_unlike = e.liked ? "unlike" : "like", Dribbble.Shots.logAnalyticsLike(e.id, {
                action: like_or_unlike
            }), n=!0, this.toggleLikeState(), this.render(), this.persistState())
        },
        toggleLikeState: function() {
            Dribbble.Shots.update(e.id, {
                liked: !e.liked,
                likes_count: e.likes_count + (e.liked?-1 : 1)
            })
        },
        persistState: function() {
            var t = {
                type: "POST",
                data: {
                    screenshot_id: e.id
                },
                complete: function(e) {
                    n=!1
                },
                error: function(e) {
                    this.toggleLikeState(), this.render()
                }.bind(this)
            }, i = e.liked;
            t.url = i ? SHOT_LIKE_ADD_PATH : SHOT_LIKE_REMOVE_PATH, $.ajax(t)
        }
    }
}, "undefined" != typeof newShots && (Dribbble.Shots.add(newShots), Dribbble.TeaserStats.init(newShots));
var Dribbble = Dribbble || {};
Dribbble.DeckAd = {
    enabled: !1,
    enable: function() {
        this.enabled=!0
    },
    load: function() {
        if (this.enabled) {
            var e = $(".ad.thedeck.target.notloaded");
            if (e.length) {
                var t = "DB", i = "https://connect.decknetwork.net/deck" + t + "_js.php?" + (new Date).getTime(), n = document.write;
                $.ajax({
                    url: i,
                    dataType: "script",
                    beforeSend: function() {
                        document.write = function(t) {
                            e.append(t), e.removeClass("notloaded")
                        }
                    },
                    complete: function() {
                        document.write = n
                    }
                })
            }
        }
    },
    unload: function() {
        $(".secondary .ad.thedeck.target").addClass("notloaded").empty()
    },
    shuffle: function() {
        this.enabled && (this.unload(), this.load())
    }
}, Dribbble.Hotkeys = {
    listeners: {},
    KEY_ALIASES: {
        LEFT: 37,
        RIGHT: 39,
        ESCAPE: 27,
        ENTER: 13
    },
    initialize: function(e) {
        this.bindKeys()
    },
    bindKeys: function() {
        $(document).keyup(function(e) {
            if (!this.isFormField(e.target.tagName)&&!this.isModifierKey(e)) {
                var t = this.keyName(e.which);
                this.keyName && this.trigger(t)
            }
        }.bind(this))
    },
    isFormField: function(e) {
        return "INPUT" == e || "TEXTAREA" == e
    },
    isModifierKey: function(e) {
        return e.ctrlKey || e.altKey || e.shiftKey || e.metaKey
    },
    keyName: function(e) {
        var t = Dribbble.Hotkeys.KEY_ALIASES;
        for (var i in t)
            if (t[i] === e)
                return i;
        return String.fromCharCode(e)
    },
    map: function(e, t, i) {
        return this.listeners[e] && this.listeners[e].off(), this.listeners[e] = t, this.listeners[e].isApplicable = i || function() {
            return !0
        }, this.listeners[e].off = function() {
            delete this.listeners[e]
        }.bind(this), this.listeners[e]
    },
    trigger: function(e) {
        for (var t in this.listeners) {
            var i = this.listeners[t];
            i[e] && i.isApplicable() && i[e]()
        }
    }
}, Dribbble.Hotkeys.TextAreaSubmission = {
    eventName: "keydown.keyboardSubmit",
    shortcutCopy: (navigator.userAgent.match(/Macintosh/) ? "\u2318" : "ctrl") + "+enter",
    enable: function() {
        $(document).off(this.eventName).on(this.eventName, "textarea", function(e) {
            (e.metaKey || e.ctrlKey) && e.keyCode == Dribbble.Hotkeys.KEY_ALIASES.ENTER && (e.preventDefault(), $(this).closest("form").submit())
        }), this.fillShortcuts()
    },
    fillShortcuts: function() {
        $(".keyboard-submit-shortcut").text(this.shortcutCopy)
    }
}, Dribbble.Hotkeys.initialize(), Dribbble.Hotkeys.TextAreaSubmission.enable(), function() {
    var e, t = function(t) {
        var i = $.trim($(".pagination:last").find(t).attr("href"));
        i && (e.off(), document.location = i)
    };
    e = Dribbble.Hotkeys.map("list", {
        LEFT: function() {
            t(".previous_page")
        },
        RIGHT: function() {
            t(".next_page")
        }
    }, function() {
        return !(!($(".previous_page:visible, .next_page:visible").length > 0) || Dribbble.Overlay && Dribbble.Overlay.anyOpen() || Dribbble.ShotOverlay && Dribbble.ShotOverlay.isOpen())
    })
}(), Dribbble.Router = {
    initialize: function() {
        Dribbble.isHistorySupported && History.Adapter.bind(window, "statechange", function() {
            var e = document.location.pathname;
            $(".attachment-overlay").is(":visible") ? e.match(/\/attachments\//) ? Dribbble.Attachments.showOverlay(document.location.toString()) : Dribbble.Attachments.hideOverlay() : e.match(/\/attachments\//) ? "undefined" != typeof Dribbble && Dribbble.Attachments ? Dribbble.Attachments.showOverlay(document.location.toString()) : window.location.reload(!0) : $("#viewer").length ? window.location.reload(!0) : Dribbble.ShotOverlay && Dribbble.ShotOverlay.active ? e.match(/\/shots\/[^/]+$/) ? Dribbble.ShotOverlay.show(document.location.toString()) : Dribbble.ShotOverlay.hide() : ($(document).scrollTop(0), window.location.reload(!0))
        })
    },
    go: function(e) {
        history.go(e)
    },
    pushState: function(e, t, i) {
        History.pushState(e, t, i)
    }
}, Dribbble.Router.initialize(), Dribbble.ShotViewRecorder = {
    seenShotIds: [],
    recordedIds: [],
    recordingDelay: 3e3,
    recordingMaxQueueDepth: 10,
    recordingTimeoutId: null,
    submitting: !1,
    queueView: function(e) {
        - 1 == this.seenShotIds.indexOf(e) && this.seenShotIds.push(e), this.queueRecordViewedShots()
    },
    queueRecordViewedShots: function() {
        clearTimeout(this.recordingTimeoutId);
        var e = this.recordingDelay;
        this.seenShotIds.length - this.recordedIds.length >= this.recordingMaxQueueDepth && (e = 0), this.recordingTimeoutId = setTimeout(function() {
            this.submitting ? this.queueRecordViewedShots() : this.recordViewedShots()
        }.bind(this), e)
    },
    recordViewedShots: function() {
        this.submitting=!0;
        var e = $(this.seenShotIds).not(this.recordedIds).get();
        if (e.length > 0) {
            var t = $.post("/shots/log_views", {
                ids: e
            });
            t.done(function() {
                this.recordedIds = this.recordedIds.concat(e)
            }.bind(this)), t.always(function() {
                this.submitting=!1
            }.bind(this))
        } else 
            this.submitting=!1
    }
}, Dribbble.Analytics = {
    existingProperties: [],
    sentEvents: [],
    reset: function() {
        this.existingProperties = [], this.sentEvents = []
    },
    logPageView: function(e, t, i, n) {
        this.log(e, t, "pageview", {
            page: i,
            title: n
        })
    },
    log: function(e, t, i, n, r) {
        "undefined" == typeof ga ? (r = 2 * (r || 50), 1e4 > r && setTimeout(function() {
            this.log(e, t, i, n, r)
        }.bind(this), r)) : (this._createProperty(e, t), this._sendEvent(t, i, n))
    },
    _createProperty: function(e, t) {
        - 1 == this.existingProperties.indexOf(e) && (ga("create", e, "auto", {
            name: t
        }), this.existingProperties.push(e))
    },
    _sendEvent: function(e, t, i) {
        i = i || {};
        var n = [e, t, $.param(i)].join("|");
        - 1 == this.sentEvents.indexOf(n) && (ga(e + ".send", t, i), this.sentEvents.push(n))
    }
}, Dribbble.AnimatedGifSwap = {
    animatedUrl: function(e) {
        return e.replace(/(.*)_(1x|still_2x|still|teaser)(.*?)$/, "$1$3")
    },
    attach: function(e, t) {
        $(document).on({
            mouseenter: function(e) {
                var i = this.swapperFor($(e.currentTarget), t);
                i.activate()
            }.bind(this),
            mouseleave: function(e) {
                var t = this.swapperFor($(e.currentTarget));
                t.deactivate()
            }.bind(this)
        }, e)
    },
    swapperFor: function(e, t) {
        if (!e.data("gif-swapper")) {
            var i = e;
            t.parentSelector && (i = e.parents(t.parentSelector)), e.data("gif-swapper", new Dribbble.AnimatedGifSwap.Swapper(i, t.imgSelector))
        }
        return e.data("gif-swapper")
    }
}, Dribbble.AnimatedGifSwap.LoadingIndicator = function(e) {
    var t = [14, 28, 42, 56], i = t.length + 1, n=!1;
    return {
        activate: function() {
            n=!0, this.show(), this.progress()
        },
        deactivate: function() {
            n=!1, e.css("background-position-y", 0)
        },
        hide: function() {
            e.hide()
        },
        progress: function() {
            n && (i > 0 ? i -= 1 : i = t.length, e.css("background-position-y", t[i] + "px"), setTimeout(this.progress.bind(this), 250))
        },
        show: function() {
            e.show()
        }
    }
}, Dribbble.AnimatedGifSwap.Swapper = function(e, t) {
    var i = e.find(t), n = i.attr("src"), r = Dribbble.AnimatedGifSwap.animatedUrl(n), o = new Dribbble.AnimatedGifSwap.LoadingIndicator(e.find(".gif-indicator"));
    return {
        $shot: e,
        $image: i,
        loaded: !1,
        hovering: !1,
        activate: function() {
            this.hovering=!0, this.swapImage()
        },
        deactivate: function() {
            this.hovering=!1, this.restoreImage(), o.deactivate(), o.show()
        },
        loadImageInBackground: function(e, t) {
            var i = new Image;
            i.onload = function() {
                this.loaded=!0, t()
            }.bind(this), i.src = e
        },
        restoreImage: function() {
            i.attr("src", n)
        },
        swapImage: function() {
            this.loaded ? (i.attr("src", r), Dribbble.Shots.logViewForShotInDiv(e), o.deactivate(), o.hide()) : (o.activate(), this.loadImageInBackground(r, function() {
                this.hovering && this.swapImage()
            }.bind(this)))
        }
    }
}, Dribbble.HoverCards = {
    fetchDelay: 500,
    displayDelay: 1e3,
    pendingDisplayId: null,
    pendingFetchId: null,
    tooCloseToTop: 350,
    cache: {},
    displayedURL: null,
    dismissed: !1,
    cardBoundaries: null,
    wrapper: null,
    initialize: function(e) {
        this.scopeSelector = e, this.bindEventListeners()
    },
    bindEventListeners: function() {
        $(this.scopeSelector).on("mouseenter.hovercard", "a.hoverable", this.mouseenter.bind(this))
    },
    findCard: function() {
        var e = $(".hover-card");
        return e.length > 0 ? e : ($("body").prepend('<div class="hover-card"></div>'), new Dribbble.FollowButton($(".hover-card"), function(e) {
            return e.parent().find(".followers")
        }).initialize(), this.findCard())
    },
    mouseenter: function(e) {
        if (!e.ctrlKey&&!e.metaKey) {
            var t = $(e.currentTarget), i = t.attr("href") + "/hover_card", n = this.displayedURL != i;
            if (this.displayedURL)
                if (n)
                    this.dismiss();
                else if (!this.dismissed)
                    return !1;
            this.displayedURL = i, this.dismissed=!1;
            var r =+ new Date, o = this.findCard();
            return this.wrapper = t.closest(".hover-card-parent"), 0 == this.wrapper.length && (this.wrapper = t.parent()), this.addHandlerForDismissal(), this.cache[i] ? (n && o.html(this.cache[i]), this.delayedShow(o, r)) : this.delayedFetch(o, i, r), !1
        }
    },
    dismiss: function() {
        (!this.dismissed || this.pendingDisplayId) && (this.dismissed=!0, clearTimeout(this.pendingFetchId), clearTimeout(this.pendingDisplayId), this.pendingFetchId = this.pendingDisplayId = null, this.cardBoundaries = null, $(this.scopeSelector).off("mousemove.hovercard"), this.findCard().hide())
    },
    delayedShow: function(e, t) {
        var i = this.displayDelay - ( + new Date - t);
        this.triggerBoundaries = this.getBoundariesForElement(this.wrapper);
        var n = this.triggerBoundaries.left + e.outerWidth(), r = this.wrapper[0].getBoundingClientRect().top;
        e.toggleClass("center", n > document.documentElement.clientWidth), e.toggleClass("top", r < this.tooCloseToTop);
        var o = {
            left: this.triggerBoundaries.left,
            bottom: "",
            top: ""
        };
        r < this.tooCloseToTop ? o.top = this.triggerBoundaries.top + this.wrapper.outerHeight() : o.bottom = $(window).height() - this.triggerBoundaries.top, e.css(o), clearTimeout(this.pendingDisplayId), this.pendingDisplayId = setTimeout(function() {
            e.show(), picturefill(), this.cardBoundaries = this.getBoundariesForElement(e), r < this.tooCloseToTop ? this.cardBoundaries.top -= this.wrapper.outerHeight() : this.cardBoundaries.bottom += this.wrapper.outerHeight()
        }.bind(this), i)
    },
    delayedFetch: function(e, t, i) {
        clearTimeout(this.pendingFetchId), this.pendingFetchId = setTimeout(function() {
            this.dismissed || $.get(t, function(n) {
                this.dismissed || (e.html(n).find("[rel=tipsy]").removeAttr("rel"), this.cache[t] = e.html(), this.delayedShow(e, i))
            }.bind(this))
        }.bind(this), this.fetchDelay)
    },
    checkShouldDismissOnMouseMove: function(e) {
        this.mouseIn(e, this.cardBoundaries) || this.wrapper.is(":hover") || this.dismiss()
    },
    getBoundariesForElement: function(e) {
        var t = e.offset();
        return t.right = e.outerWidth() + t.left, t.bottom = e.outerHeight() + t.top, t
    },
    mouseIn: function(e, t) {
        return null != t && e.pageX >= t.left && e.pageX <= t.right && e.pageY >= t.top && e.pageY <= t.bottom
    },
    addHandlerForDismissal: function() {
        this.removeHandlerForDismissal(), $(this.scopeSelector).on("mousemove.hovercard", this.checkShouldDismissOnMouseMove.bind(this))
    },
    removeHandlerForDismissal: function() {
        $(this.scopeSelector).off("mousemove.hovercard")
    }
}, Dribbble.isMobile() || Dribbble.HoverCards.initialize("body"), $(document).on("change keypress", "form[data-warn-unsaved] input, form[data-warn-unsaved] textarea", function() {
    window.onbeforeunload = function() {
        return "You have unsaved changes."
    }
}), $(document).on("submit", "form[data-warn-unsaved]", function() {
    window.onbeforeunload = null
}), Dribbble.ShareSheet = function(e) {
    if (e = e || {}, this.container = $(e.selector), this.body = {
        raw: e.body,
        encoded: encodeURIComponent(e.body)
    }, this.url = {
        raw: window.location.href,
        encoded: encodeURIComponent(window.location.href)
    }, e.imageUrl && (this.imageUrl = {
        raw: e.imageUrl,
        encoded: encodeURIComponent(e.imageUrl)
    }), this.bodies = {}, e.bodies)
        for (var t in e.bodies)
            e.bodies.hasOwnProperty(t) && (this.bodies[t] = {
                raw: e.bodies[t],
                encoded: encodeURIComponent(e.bodies[t])
            });
    this.buildShareSheet(), this.bindEventListeners()
}, Dribbble.ShareSheet.prototype = {
    buildShareSheet: function() {
        actions = ['<div class="share-sheet">', '<a href="#" class="share-twitter" title="Share on Twitter">Share on Twitter</a>', '<a href="#" class="share-facebook" title="Share on Facebook">Share on Facebook</a>'], this.imageUrl && actions.push('<a href="#" class="share-pinterest" title="Share on Pinterest">Share on Pinterest</a>'), actions.push('<a href="#" class="share-tumblr" title="Share on Tumblr">Share on Tumblr</a>', '<a href="#" class="share-email" title="Share by Email">Share via Email</a>', "</div>"), this.container.html(actions.join(" "))
    },
    bindEventListeners: function() {
        this.container.find("a.share-twitter").click(this.shareTwitter.bind(this)), this.container.find("a.share-facebook").click(this.shareFacebook.bind(this)), this.container.find("a.share-pinterest").click(this.sharePinterest.bind(this)), this.container.find("a.share-tumblr").click(this.shareTumblr.bind(this)), this.container.find("a.share-email").click(this.shareEmail.bind(this))
    },
    shareFacebook: function() {
        var e = "https://www.facebook.com/sharer/sharer.php?u=" + this.url.encoded;
        return window.open(e, "", "height=350,width=600"), !1
    },
    shareTwitter: function() {
        return window.open(this.twitterUrl(), "", "status=0,toolbar=0,height=250,width=600"), !1
    },
    sharePinterest: function() {
        var e = "https://pinterest.com/pin/create/button/?url=" + this.url.encoded + "&description=" + this.body.encoded + "&media=" + this.imageUrl.encoded;
        return window.open(e, "", "height=260,width=600"), !1
    },
    shareTumblr: function() {
        var e = "https://www.tumblr.com/widgets/share/tool?shareSource=legacy&canonicalUrl=&url=" + this.url.encoded + "&title=" + this.body.encoded;
        return window.open(e, "", "height=400,width=600"), !1
    },
    shareEmail: function() {
        var e = "mailto:?&body=" + this.body.encoded + encodeURIComponent("\n\n") + this.url.encoded;
        return window.location.href = e, !1
    },
    twitterUrl: function() {
        var e = this.body.encoded;
        return this.bodies.twitter && (e = this.bodies.twitter.encoded), "https://twitter.com/intent/tweet?url=" + this.url.encoded + "&text=" + e
    }
}, Dribbble.SingleSubmit = {}, Dribbble.SingleSubmit.disableForm = function(e, t) {
    t = t || "Processing\u2026", e.attr("disabled", "disabled"), e.find("button[type=submit], input[type=submit]").attr("disabled", "disabled"), e.find("button[type=submit]").each(function(e, t) {
        $(t).data("original-preprocessing-text", $(t).text())
    }).text(t), e.find("input[type=submit]").each(function(e, t) {
        $(t).data("original-preprocessing-text", $(t).val())
    }).val(t)
}, Dribbble.SingleSubmit.enableForm = function(e) {
    e.removeAttr("disabled"), e.find("button[type=submit], input[type=submit]").removeAttr("disabled", "disabled"), e.find("button[type=submit]").each(function(e, t) {
        $(t).text($(t).data("original-preprocessing-text") || "Submit")
    }), e.find("input[type=submit]").each(function(e, t) {
        $(t).val($(t).data("original-preprocessing-text") || "Submit")
    })
}, Dribbble.SingleSubmit.bind = function(e) {
    $(e).off("submit.singleSubmit"), $(e).on("submit.singleSubmit", function(e) {
        var t = $(e.currentTarget);
        Dribbble.SingleSubmit.disableForm(t)
    })
}, window.picturefill();
