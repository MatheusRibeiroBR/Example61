! function(t, n, e) {
    function o(n, e) {
        this.element = n, this.options = t.extend({}, r, e), this._defaults = r, this._name = i, this.init()
    }
    var i = "ptrLight",
        r = {
            paused: !1,
            ignoreThreshold: 10,
            pullThreshold: 200,
            maxPullThreshold: 500,
            spinnerTimeout: 1e3,
            scrollingDom: null,
            allowPtrWhenStartedWhileScrolled: !1,
            refresh: function() {
                console.warn('Refresh detected. Please specify a refresh function and apply it to the "refresh" property in the ptrLight options object.')
            }
        };
    o.prototype = {
        init: function() {
            var o = this,
                r = t(o.element);
            o.elem = r, o.elemNode = r[0], r.parent().find("#ptr-light-indicator").remove(), r.before('<div id="ptr-light-indicator"><div id="ptr-light-spinner"></div></div>'), o.indicator = r.parent().find("#ptr-light-indicator"), o.indicatorNode = o.indicator[0], o.indicatorHeight = o.indicator.outerHeight(), o.spinner = r.parent().find("#ptr-light-spinner"), o.spinnerNode = o.spinner[0], o.doneTimeout = null, o.inProgress = !1, o.inProgressTouchstart = !1, o.isSpinning = !1, o.wrongAxis = !1, o.requestedAnimationFrame = !1, o.queuedAnimationFrameRequest = [], o.nextAnimationFrame = null, o.requestAnimationFrame = function(t, e, i) {
                !o.requestedAnimationFrame || i ? (o.requestedAnimationFrame = !0, n.requestAnimationFrame(function() {
                    t(), !o.nextAnimationFrame && o.queuedAnimationFrameRequest.length ? o.requestAnimationFrame(o.queuedAnimationFrameRequest.shift(), !1, !0) : o.nextAnimationFrame ? (o.requestAnimationFrame(o.nextAnimationFrame, !1, !0), o.nextAnimationFrame = null) : o.requestedAnimationFrame = !1
                })) : e ? o.queuedAnimationFrameRequest.push(t) : o.nextAnimationFrame = t
            }, o.transformProp = void 0 === o.elemNode.style.transform ? "-webkit-transform" : "transform", o.elemNode.style[o.transformProp] = "translateY(-" + o.indicatorHeight + "px)", o.options.throttleTimeout < 1 && (o.options.throttleTimeout = 1), r.parent().css({
                "-webkit-overflow-scrolling": "touch"
            }), o.spinner.css("opacity", "0"), o.getOffsetTop = function() {
                return (r.parent().offset() ? r.parent().offset().top : 0) - (o.options.scrollingDom || r.parent()).scrollTop()
            }, o.offsetTop = o.getOffsetTop(), o.fingerOffset = 0, o.top = 0, o.spinnerRotation = 0, o.windowDimension = t(n).height(), o.getTopTranslation = function(t) {
                return (1 - 1 / (.55 * o.top / o.windowDimension + 1)) * o.windowDimension
            }, r.unbind("touchstart." + i), r.on("touchstart." + i, function(t) {
                return o.inProgressTouchstart = o.inProgress || !o.options.allowPtrWhenStartedWhileScrolled && (o.options.scrollingDom || r.parent()).scrollTop() > 0, !o.options.paused && !o.inProgress && (o.offsetTop = o.getOffsetTop(), o.fingerOffset = t.originalEvent.touches[0].pageY - o.offsetTop, o.initialX = t.originalEvent.touches[0].pageX, void(o.afterX = o.initialX))
            }), r.unbind("touchmove." + i), r.on("touchmove." + i, function(t) {
                return !o.inProgress && !o.options.paused && (o.wrongAxis || o.inProgressTouchstart || (o.options.scrollingDom || r.parent()).scrollTop() > 0 || r.position().top < 0 || e.body.scrollTop > 0 ? (o.requestAnimationFrame(function() {
                    o.spinner.css("opacity", "0")
                }), !0) : (o.top = t.originalEvent.touches[0].pageY - o.fingerOffset - o.options.ignoreThreshold, o.options.ignoreThreshold && !o.wrongAxis && o.top < 1 && o.top + o.options.ignoreThreshold > 1 && (o.afterX = t.originalEvent.touches[0].pageX, o.wrongAxis = Math.abs(o.initialX - o.afterX) > .8 * o.options.ignoreThreshold), o.top > 1 && o.top <= o.options.maxPullThreshold ? (o.topTranslation = o.getTopTranslation(o.top), o.spinnerRotation = 360 * (o.top / o.options.pullThreshold), o.spinnerRotation = o.spinnerRotation > 359 ? 360 : o.spinnerRotation, o.opacity = o.spinnerRotation > 300 ? 1 - (360 - o.spinnerRotation) / 600 * 6 : .4, o.requestAnimationFrame(function() {
                    o.elemNode.style[o.transformProp] = "translateY(" + (o.topTranslation - o.indicatorHeight) + "px)", o.indicatorNode.style.top = o.topTranslation - o.indicatorHeight + "px", o.spinnerNode.style[o.transformProp] = "rotate(" + o.spinnerRotation + "deg)", o.spinnerNode.style.opacity = o.opacity
                }), !1) : !(t.originalEvent.touches[0].pageY - o.fingerOffset > 1) && void 0))
            }), r.unbind("touchend." + i), r.on("touchend." + i, function(t) {
                return !o.options.paused && !o.inProgress && (o.wrongAxis = !1, void(o.top > 0 ? (o.requestAnimationFrame(function() {
                    o.top > o.options.pullThreshold ? (o.inProgress = !0, o.options.refresh.call(this, o), o.spinner.addClass("rotateLoop"), o.isSpinning = !0, o.elemNode.style[o.transformProp] = "translateY(0)", o.elemNode.style.transition = "transform 300ms ease", o.indicator.css({
                        top: "0px",
                        transition: "top 300ms ease"
                    }), o.options.spinnerTimeout && (o.doneTimeout && clearTimeout(o.doneTimeout), o.doneTimeout = setTimeout(function() {
                        o.done()
                    }, o.options.spinnerTimeout))) : (o.spinnerRotation = 0, o.indicator.css({
                        top: "-" + o.indicatorHeight + "px",
                        transition: "top 300ms ease"
                    }), o.elemNode.style[o.transformProp] = "translateY(-" + o.indicatorHeight + "px)", o.elemNode.style.transition = "transform 300ms ease"), o.top = 0
                }, !0), setTimeout(function() {
                    o.requestAnimationFrame(function() {
                        r.css({
                            transition: ""
                        }), o.indicator.css({
                            transition: ""
                        })
                    }, !0)
                }, 300)) : o.requestAnimationFrame(function() {
                    r.css({
                        transition: ""
                    }), o.indicator.css({
                        transition: ""
                    })
                }, !0)))
            })
        },
        done: function() {
            var t = this,
                n = t.elem;
            t.doneTimeout && (clearTimeout(t.doneTimeout), t.doneTimeout = null), t.requestAnimationFrame(function() {
                t.indicator.css({
                    top: "-" + t.indicatorHeight + "px",
                    transition: "top 300ms ease"
                }), t.elemNode.style[t.transformProp] = "translateY(-" + t.indicatorHeight + "px)", t.elemNode.style.transition = "transform 300ms ease"
            }, !0), setTimeout(function() {
                t.requestAnimationFrame(function() {
                    t.spinner.removeClass("rotateLoop"), t.isSpinning = !1, t.spinnerRotation = 0, t.spinner.css("opacity", "0"), n.css({
                        transition: ""
                    }), t.indicator.css({
                        transition: ""
                    }), t.inProgress = !1
                }, !0)
            }, 300)
        }
    }, t.fn[i] = function(n) {
        return this.each(function() {
            t.data(this, "plugin_" + i) || t.data(this, "plugin_" + i, new o(this, n))
        })
    }
}(jQuery, window, document);