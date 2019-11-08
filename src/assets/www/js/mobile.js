function hasheTimer() {
    var e = parseInt(getTimer());
    return parseInt(e + 10)
}

function newTimer() {
    var e = parseInt(getTimer());
    return parseInt(e + 400)
}

function newTimerr() {
    var e = parseInt(getTimer());
    return parseInt(e + 550)
}

function getTimer() {
    var e = $.now().toString();
    return e = parseInt(e.substr(0, 10))
}
var Exe = 0,
    play = "";

function showAds() {}

function clipboard(e) {
    document.getElementById(e).select(), document.execCommand("copy"), minMessage("Link Copiado")
}

function hApp() {
    return $(window).height()
}

function hideAds() {}

function Ads() {
    if (ambiente())
        if (1 == Exe);
        else {
            var e = getTimer();
            if ($("#adsTime").html() < e) {
                var a = newTimer();
                $("#adsTime").html(a), /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) ? document.addEventListener("deviceready", AdFloating, !1) : AdFloating()
            }
        }
}

function Ads2() {
    if (ambiente())
        if (1 == Exe);
        else {
            var e = getTimer();
            if ($("#adsTimer").html() < e) {
                var a = newTimerr();
                $("#adsTimer").html(a), /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) ? document.addEventListener("deviceready", AdVideo, !1) : AdVideo()
            }
        }
}

function Ads3() {
    ambiente() && (1 == Exe || (/(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) ? document.addEventListener("deviceready", AdVideo, !1) : AdVideo()))
}

function deslog() {
    confirm("Você está prestes a encerrar sua sessão?") && (nRem(), offTela(), window.setTimeout(function() {
        DBdeleter("1"), window.location.href = "mobile1.html"
    }, 500))
}

function deslogg() {
    offTela(), nRem(), window.setTimeout(function() {
        DBdeleter("1"), window.location.href = "mobile1.html"
    }, 500)
}

function closeMessage() {
    $(".overAlerter").hide(), $(".alerter").fadeOut(function() {
        $(".alerter").removeClass("ook").removeClass("err")
    })
}

function openMessage(e, a, s) {
    s ? $(".alerter .oh").html(s) : $(".alerter .oh").html("Ocorreu um Erro."), $(".alerter .p p").empty().html(e), $(".overAlerter").show(), $(".alerter").addClass(a).fadeIn()
}

function limiter(e, a) {
    return len = e.length, 50 < len ? e.substr(0, a) + "..." : e
}

function limitt(e) {
    return len = e.length, 27 < len ? e.substr(0, 27) + "..." : e
}

function limittt(e) {
    return len = e.length, 50 < len ? e.substr(0, 50) + "..." : e
}

function online() {
    window.setInterval(function() {
        var e = window.location.href,
            a = $(".item-play").attr("data-current"),
            s = $(".item-play").attr("data-type");
        $.post(getLink() + "/app-user-update.php", {
            token: breakToken(),
            accepts: breakDevice(),
            url: e,
            qual: a,
            type: s
        }, function(e) {
            var a = $.parseJSON(e);
            a.logado ? a.Continue && $("#sHome .one").empty().html(JSON.stringify(a.Continue)) : deslogg()
        })
    }, 25e3)
}

function trailer(a) {
    a = getSite() + "/v2/trailer.php?vid=" + a.replace(".", "");
    document.addEventListener("deviceready", function() {
        var e = window.open(a, "_parent", "location=no");
        e.addEventListener("loadstart", function(e) {
            onFull(), screen.orientation.lock("landscape"), window.plugins.insomnia.keepAwake()
        }), e.addEventListener("loadstop", function(e) {}), e.addEventListener("exit", function(e) {
            ofFull(), screen.orientation.lock("portrait"), window.plugins.insomnia.allowSleepAgain()
        })
    }, !1)
}

function getCast() {
    return $('input[id="cast"]').val()
}

function getLinkCast() {
    return $("#sistemaCast").val() + "/"
}

function playPlayer(e, s, i, t, l, r, o) {
    $("#playerShow").fadeIn(), $.post(getLink() + "/app-play.php", {
        token: breakToken(),
        accepts: breakDevice(),
        gets: e
    }, function(e) {
        var a = $.parseJSON(e);
        a.play ? 1 == getCast() ? (castPlayer(a.play, s, i, t, o, l), $("#playerShow").fadeOut()) : montaPlayer(a.play, s, i, t, l, r, o) : (minMessage("Não foi possível reproduzir esse titulo, tente novamente!"), $("#playerShow").fadeOut())
    })
}

function alterPlayer(e, a, s, i, t, l, r) {
    onTela(), 0 < $("#player-wrapper").length && player.destroy(), clearInterval(realtime), unCheckPlayer(), $(".overlay-player").show(), $(".next-ep").addClass("hider").attr("href", "javascript:void(0);"), $(".prev-ep").addClass("hider").attr("href", "javascript:void(0);"), $(".media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause]").click(), $("#player-wrapper").empty().remove(), $(".item-play").attr({
        "data-type": "",
        "data-current": ""
    }).empty(), $(".players-btn").hide(), $(".media-control").hide(), $(".title-player span").empty(), $(".media-control").addClass("media-control-hide"), window.setTimeout(function() {
        montaPlayer(e, a, s, i, t, l, r)
    }, 500)
}

function nonePlayer() {
    Ads3(), 0 < $("#player-wrapper").length && player.destroy(), $("#playerShow .player-res").remove(), clearInterval(realtime), unCheckPlayer(), $(".title-player span").empty(), $(".next-ep").addClass("hider").attr("href", "javascript:void(0);"), $(".prev-ep").addClass("hider").attr("href", "javascript:void(0);"), $(".media-control").addClass("media-control-hide"), $(".players-btn").hide(), $(".media-control").hide(), offTela(), $(".media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause]").click(), $("#player-wrapper").empty().remove(), $(".item-play").attr({
        "data-type": "",
        "data-current": ""
    }).empty(), $("#playerShow").fadeOut();
    var e = getUrl(),
        a = atualView();
    "playSerie" == a && nfilterSerie(e), "playFilme" == a && nfilterFilme(e), "home" == a && updC()
}
var realtime = null,
    player = null;

function seekMore() {
    var e = parseInt(player.getCurrentTime()) + 10;
    player.seek(e)
}

function seekMinus() {
    var e = parseInt(player.getCurrentTime()) - 10;
    player.seek(e)
}

function red(e, a, s) {
    Ads2(), montaPlayer("https://www.redtube.com.br/" + e, s, "adult", e, "adult", a, 0)
}

function castPlayer(a, e, s, i, t, l) {
    "serie" == s && $("#current" + s).val();
    var r = a.indexOf("stream"),
        o = a.indexOf("redtube");
    0 < r ? $.ajax({
        url: a,
        cache: !1,
        type: "GET",
        success: function(e) {
            getter = NetCINE(e, a), window.plugins.socialsharing.shareVia("com.instantbits.cast.webvideo", null, null, null, getter, function() {}, function(e) {
                minMessage("Ocorreu um erro, verifique se o Web Video Cast está instalado!")
            })
        }
    }) : 0 < o ? $.ajax({
        url: a,
        cache: !1,
        type: "GET",
        success: function(e) {
            getter = RedTUBE(e), window.plugins.socialsharing.shareVia("com.instantbits.cast.webvideo", null, null, null, getter, function() {}, function(e) {
                minMessage("Ocorreu um erro, verifique se o Web Video Cast está instalado!")
            })
        }
    }) : (getter = a, window.plugins.socialsharing.shareVia("com.instantbits.cast.webvideo", null, null, null, getter, function() {}, function(e) {
        minMessage("Ocorreu um erro, verifique se o Web Video Cast está instalado!")
    })), $("#playerShow").show(), $(".overlay-player").fadeIn(), nonePlayer()
}

function montaPlayer(a, s, i, t, l, e, r) {
    CheckPlayer(), onTela(), $("#playerShow").fadeIn(), $("#playerShow .title-player span ").html(e), $(".item-play").attr({
        "data-type": i,
        "data-current": t,
        "data-lang": l,
        "data-title": e
    }).html('<div id="player-wrapper"></div>');
    var o = "video/mp4";
    if ("filme" == i) {
        o = "video/mp4";
        $("#playerShow").removeClass("ondemand")
    }
    if ("serie" == i) {
        o = "video/mp4";
        $("#playerShow").removeClass("ondemand")
    }
    if ("anime" == i) {
        o = "video/mp4";
        $("#playerShow").removeClass("ondemand")
    }
    if ("tv" == i) {
        o = "application/vnd.apple.mpegurl";
        $("#playerShow").addClass("ondemand")
    }
    var n = a.indexOf("stream"),
        c = a.indexOf("redtube");
    0 < n ? $.ajax({
        url: a,
        cache: !1,
        type: "GET",
        success: function(e) {
            getter = NetCINE(e, a), play = getter, player = new Clappr.Player({
                source: getter,
                poster: s,
                mute: !1,
                height: "100%",
                width: "100%",
                autoPlay: !1,
                playbackNotSupportedMessage: "Ocorreu um erro ao reproduzir o vídeo. Tente Novamente.",
                mimeType: o,
                parentId: "#player-wrapper"
            }), window.setTimeout(function() {
                $(".overlay-player").fadeOut(), $(".spinner-three-bounce[data-spinner]").html('<i class="preload"></div>'), player.setVolume(100), player.play()
            }, 500)
        }
    }) : 0 < c ? $.ajax({
        url: a,
        cache: !1,
        type: "GET",
        success: function(e) {
            getter = RedTUBE(e), play = getter, player = new Clappr.Player({
                source: getter,
                poster: s,
                mute: !1,
                height: "100%",
                width: "100%",
                autoPlay: !1,
                playbackNotSupportedMessage: "Ocorreu um erro ao reproduzir o vídeo. Tente Novamente.",
                mimeType: o,
                parentId: "#player-wrapper"
            }), window.setTimeout(function() {
                $(".overlay-player").fadeOut(), $(".spinner-three-bounce[data-spinner]").html('<i class="preload"></div>'), player.setVolume(100), player.play()
            }, 500)
        }
    }) : (play = a, player = new Clappr.Player({
        source: a,
        poster: s,
        mute: !1,
        height: "100%",
        width: "100%",
        autoPlay: !1,
        playbackNotSupportedMessage: "Ocorreu um erro ao reproduzir o vídeo. Tente Novamente.",
        mimeType: o,
        parentId: "#player-wrapper"
    }), window.setTimeout(function() {
        $(".overlay-player").fadeOut(), $(".spinner-three-bounce[data-spinner]").html('<i class="preload"></div>'), player.setVolume(100), player.play()
    }, 500)), 0 < r && player.seek(r), realTime(i, t), "serie" == i && window.setTimeout(function() {
        $(".picEu").attr("data-access");
        var e = $("#current" + i).val();
        $.post(getLink() + "/app-series-active.php", {
            token: breakToken(),
            accepts: breakDevice(),
            serie: t,
            cap: e,
            track: l
        }, function(e) {
            var a = $.parseJSON(e);
            if (a.prox) {
                var s = a.prox;
                $(".player-seeking.next-ep").removeClass("hider").removeClass("hider").attr("href", "javascript:CurrentSerieCap(" + s.cap + "),alterPlayer('" + s.stream + "', '" + s.wall + "', 'serie', '" + s.serie + "', '" + s.lang + "', '" + s.titulo + "', 0),Ads();")
            }
            if (a.prev) {
                s = a.prev;
                $(".player-seeking.prev-ep").removeClass("hider").attr("href", "javascript:CurrentSerieCap(" + s.cap + "),alterPlayer('" + s.stream + "', '" + s.wall + "', 'serie', '" + s.serie + "', '" + s.lang + "', '" + s.titulo + "', 0),Ads();")
            }
        })
    }, 1e3)
}

function NetCINE(e, a) {
    var s = a.indexOf("/stream"),
        i = a.substr(s);
    i = a.replace(i, "");
    var t = e.indexOf('id="videolink">');
    t = (e = e.substr(t + 15)).indexOf("</p>");
    return e = i + "/gettoken/" + e.substr(0, t) + "?download=true"
}

function RedTUBE(e) {
    var a = e.indexOf('[{"defaultQuality');
    a = (e = e.substr(a)).indexOf("}]") + 2;
    i = (e = e.substr(0, a)).replace("//", "/");
    var s = "",
        i = $.parseJSON(i);
    if ("" != i[0].videoUrl) s = i[0].videoUrl;
    else if ("" != i[1].videoUrl) s = i[1].videoUrl;
    else if ("" != i[2].videoUrl) s = i[2].videoUrl;
    return s
}

function realTime(t, l) {
    var r = window.setInterval(function() {
        $(".picEu").attr("data-access");
        if ("tv" == t && clearInterval(realTime), 0 < $(".media-control-indicator").length) {
            var e = formataTime(player.getCurrentTime()),
                a = formataTime(player.getDuration()),
                s = $(".item-play").attr("data-lang");
            if ("filme" == t && $.post(getLink() + "/app-user-seekfilme.php", {
                    token: breakToken(),
                    accepts: breakDevice(),
                    current: e,
                    finish: a,
                    filmeId: l,
                    track: s
                }, function(e) {}), "serie" == t) {
                var i = $("#current" + t).val();
                $.post(getLink() + "/app-user-seekserie.php", {
                    token: breakToken(),
                    accepts: breakDevice(),
                    current: e,
                    finish: a,
                    serieId: l,
                    capId: i,
                    track: s
                }, function(e) {
                    var a = $.parseJSON(e);
                    if (a.proximo && (a.finish && clearInterval(r), a.proximo.nexter)) {
                        var s = a.proximo.nexter;
                        CurrentSerieCap(s.cap), Ads2(), nonePlayer(), alterPlayer(s.stream, s.wall, "serie", s.serie, s.lang, s.titulo, 0)
                    }
                })
            }
        } else clearInterval(r)
    }, 1e4)
}

function ofBottom() {
    $(".menu-bottom").removeClass("vis")
}

function onBottom() {
    $(".menu-bottom").addClass("vis")
}

function onCast() {
    $('input[id="cast"]').val(1), $(".setCast").addClass("on").attr("href", "javascript:offCast();"), $(".setCast").html('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px"  viewBox="0 0 469.333 469.333" style="enable-background:new 0 0 469.333 469.333;" xml:space="preserve"><path d="M0,192v42.667c106.027,0,192,85.973,192,192h42.667C234.667,297.067,129.6,192,0,192z"></path><path d="M0,277.333V320c58.88,0,106.667,47.787,106.667,106.667h42.667C149.333,344.213,82.453,277.333,0,277.333z"></path><path d="M0,362.667v64h64C64,391.36,35.307,362.667,0,362.667z"></path><path d="M426.667,42.667h-384C19.093,42.667,0,61.76,0,85.333v64h42.667v-64h384V384H277.333v42.667h149.333     c23.573,0,42.667-19.093,42.667-42.667V85.333C469.333,61.76,450.24,42.667,426.667,42.667z"></path><path d="M384,128H85.333v34.88c84.48,27.307,151.147,93.973,178.453,178.453H384V128z"></path></svg>'), $(".globalFilter .ratio-hd .plays a").addClass("castPlayer"), $(".globalFilter .ratio-hd .play").addClass("castPlayer")
}

function offCast() {
    $('input[name="auto-cast"]').click(), $(".setCast").removeClass("on").attr("href", "javascript:openCcast();"), $('input[id="cast"]').val(0), $(".setCast").html('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px"  viewBox="0 0 469.333 469.333" style="enable-background:new 0 0 469.333 469.333;" xml:space="preserve"><path d="M0,277.333V320c58.88,0,106.667,47.787,106.667,106.667h42.667C149.333,344.213,82.453,277.333,0,277.333z" ></path><path d="M0,362.667v64h64C64,391.36,35.307,362.667,0,362.667z" ></path><path d="M426.667,42.667h-384C19.093,42.667,0,61.76,0,85.333v64h42.667v-64h384V384H277.333v42.667h149.333     c23.573,0,42.667-19.093,42.667-42.667V85.333C469.333,61.76,450.24,42.667,426.667,42.667z" ></path><path d="M0,192v42.667c106.027,0,192,85.973,192,192h42.667C234.667,297.067,129.6,192,0,192z" fill="#FFF"></path></svg>'), $(".globalFilter .ratio-hd .plays a").removeClass("castPlayer"), $(".globalFilter .ratio-hd .play").removeClass("castPlayer")
}
var checkPlayer = null;

function CheckPlayer() {
    checkPlayer = window.setInterval(function() {
        0 < $("#player-wrapper").length && (onTela(), $(".media-control").hasClass("media-control-hide") || ($(".media-control").addClass("media-control-hide"), $(".players-btn").fadeOut(), $(".media-control").fadeOut(), $(".backplayer").fadeOut()))
    }, 5e3)
}

function formataTime(e, a) {
    if (!isFinite(e)) return "--:--";
    e *= 1e3;
    var s = (e = parseInt(e / 1e3)) % 60,
        i = (e = parseInt(e / 60)) % 60,
        t = (e = parseInt(e / 60)) % 24,
        l = parseInt(e / 24),
        r = "";
    return l && 0 < l && (r += l + ":", t < 1 && (r += "00:")), (t && 0 < t || a) && (r += ("0" + t).slice(-2) + ":"), r += ("0" + i).slice(-2) + ":", (r += ("0" + s).slice(-2)).trim()
}

function unCheckPlayer() {
    clearInterval(checkPlayer)
}

function checkLogin() {
    var i = [];
    db.transaction("PERSON").objectStore("PERSON").openCursor().onsuccess = function(e) {
        var a = e.target.result;
        if (a) i.push(a.value), a.continue();
        else {
            var s = "nada";
            i.length;
            if (i[0]) {
                s = i[0].NOME;
                1 == i[0].ID && ($("#dataUser").html(s), inicioMob())
            } else window.location.href = "mobile1.html"
        }
    }
}

function inicioMob() {
    var e = $.parseJSON($("#dataUser").html());
    $(".picEu").attr("data-access", e.number).attr("data-token", e.token), $("#hashe").html(e.token), montaHome()
}

function breakToken() {
    return $(".picEu").attr("data-token")
}

function breakDevice() {
    return $(".picEu").attr("data-access")
}

function getsApp(e) {
    $.post(getLink() + "/app-gets.php", {
        token: breakToken(),
        accepts: breakDevice(),
        filter: e
    }, function(e) {
        var a = $.parseJSON(e);
        "ganhar" == atualView() && a.msg && minMessage(a.msg), $(".nCredit").html(a.num), $("a.bky").attr("data-cred", a.num)
    })
}

function download(e, a, s) {
    $(".page-down .preload").show(), $(".down1").hide(), $.post(getLink() + "/app-download.php", {
        token: breakToken(),
        accepts: breakDevice(),
        one: e,
        two: a,
        tre: s
    }, function(e) {
        var a = $.parseJSON(e);
        a.result ? ($("a.bky").attr("data-cred", a.credits), $(".nCredit").html(a.credits), closeCdown(), external(a.link)) : minMessage("Ocorreu um erro, tente novamente!")
    })
}

function addTopMy() {
    $.post(getLink() + "/app-pedidos.php", {
        token: breakToken(),
        accepts: breakDevice(),
        my: !0
    }, function(e) {
        var a = $.parseJSON(e);
        a.meusPedidos && $(".myPed").html(a.meusPedidos), a.loop && ($(".padrao-4").empty(), jQuery.each(a.loop, function(e, a) {
            var s = "'" + a.imdb + "'";
            if (1 < a.pedidos) var i = "PEDIDOS";
            else i = "PEDIDO";
            var t = "<b>" + a.pedidos + "</b> " + i,
                l = "Pedido por " + a.quem;
            if (a.pedi) var r = '<a href="javascript:addCC(' + s + ');">ADICIONAR CRÉDITO</a>';
            else r = '<a href="javascript:addCC(' + s + ');">PEDIR TAMBÉM</a>';
            $(".padrao-4").append('<li id="' + a.imdb + '"><div class="img"><img src="' + a.image + '" /></div><div class="caption"><h1>' + a.name + '</h1><div class="tt">' + a.tipo + " // " + a.ano + '</div><div class="tttt">' + l + '</div><div class="ttt">' + t + '</div><div class="b">' + r + "</div></div></li>")
        }))
    })
}

function addTop50() {
    $.post(getLink() + "/app-pedidos.php", {
        token: breakToken(),
        accepts: breakDevice(),
        lista: !0
    }, function(e) {
        var a = $.parseJSON(e);
        a.meusPedidos && $(".myPed").html(a.meusPedidos), a.loop && ($(".padrao-1").empty(), jQuery.each(a.loop, function(e, a) {
            var s = "'" + a.imdb + "'";
            if (1 < a.pedidos) var i = "PEDIDOS";
            else i = "PEDIDO";
            var t = "<b>" + a.pedidos + "</b> " + i,
                l = "Pedido por " + a.quem;
            if (a.pedi) var r = '<a href="javascript:addCC(' + s + ');">ADICIONAR CRÉDITO</a>';
            else r = '<a href="javascript:addCC(' + s + ');">PEDIR TAMBÉM</a>';
            $(".padrao-1").append('<li id="' + a.imdb + '"><div class="img"><img src="' + a.image + '" /></div><div class="caption"><h1>' + a.name + '</h1><div class="tt">' + a.tipo + " // " + a.ano + '</div><div class="tttt">' + l + '</div><div class="ttt">' + t + '</div><div class="b">' + r + "</div></div></li>")
        }))
    })
}

function addCCC(e) {
    $.post(getLink() + "/app-pedidos.php", {
        token: breakToken(),
        accepts: breakDevice(),
        filterID: e
    }, function(e) {
        var a = $.parseJSON(e);
        if (a.meusPedidos && $(".myPed").html(a.meusPedidos), a.result) {
            var s = a.loop;
            if ($("li#" + s.imdb + " .caption").empty(), 0 < s.added) {
                var i = "Disponível no Top Flix TV",
                    t = "ESTÁ NO TOP FLIX TV";
                if ("FILME" == s.tipo) var l = "#playFilme?" + s.added;
                else l = "#playSerie?" + s.added;
                var r = '<a class="ee" href="' + l + '">ASSISTIR AGORA</a>'
            } else {
                if (1 < s.pedidos) var o = "PEDIDOS";
                else o = "PEDIDO";
                var n = "'" + s.imdb + "'";
                t = "<b>" + s.pedidos + "</b> " + o;
                if (s.add) i = "Ninguém pediu", r = '<a href="javascript:addCC(' + n + ');">FAZER PEDIDO</a>';
                else {
                    i = "Pedido por " + s.quem;
                    if (s.pedi) r = '<a href="javascript:addCC(' + n + ');">ADICIONAR CRÉDITO</a>';
                    else r = '<a href="javascript:addCC(' + n + ');">PEDIR TAMBÉM</a>'
                }
            }
            $("li#" + s.imdb + " .caption").html("<h1>" + s.name + '</h1><div class="tt">' + s.tipo + " // " + s.ano + '</div><div class="tttt">' + i + '</div><div class="ttt">' + t + '</div><div class="b">' + r + "</div>")
        }
    })
}

function addCC(e) {
    $.post(getLink() + "/app-pedidos.php", {
        token: breakToken(),
        accepts: breakDevice(),
        pedir: e
    }, function(e) {
        var a = $.parseJSON(e);
        a.meusPedidos && $(".myPed").html(a.meusPedidos), a.result ? ($(".nCredit").html(a.myCredit), addCCC(a.id), minMessage("Pedido adicionado!")) : a.erro ? openMessage(a.erro, "err", "Sem créditos") : minMessage("Ocorreu um erro, tente novamente!")
    })
}

function adtC(e) {
    return "" == (e = $("#ssC").val()) ? $("#ssC").focus() : ($(".padrao-3 .preload").show(), $(".busc-n").hide(), $(".busc-p").hide(), window.location.href = "#creditos?3", $.post(getLink() + "/app-pedidos.php", {
        token: breakToken(),
        accepts: breakDevice(),
        buscar: e
    }, function(e) {
        $("#ssC").val("");
        var a = $.parseJSON(e);
        $(".padrao-3 .preload").hide(), a.meusPedidos && $(".myPed").html(a.meusPedidos), a.noCredit ? ($(".busc-n").show(), $(".busc-p").hide()) : ($(".busc-n").hide(), $(".busc-p").empty().show()), a.loop ? jQuery.each(a.loop, function(e, a) {
            if (0 < a.added) {
                var s = "Disponível no Top Flix TV",
                    i = "ESTÁ NO TOP FLIX TV";
                if ("FILME" == a.tipo) var t = "#playFilme?" + a.added;
                else t = "#playSerie?" + a.added;
                var l = '<a class="ee" href="' + t + '">ASSISTIR AGORA</a>'
            } else {
                if (1 < a.pedidos) var r = "PEDIDOS";
                else r = "PEDIDO";
                var o = "'" + a.imdb + "'";
                i = "<b>" + a.pedidos + "</b> " + r;
                if (a.add) s = "Ninguém pediu", l = '<a href="javascript:addCC(' + o + ');">FAZER PEDIDO</a>';
                else {
                    s = "Pedido por " + a.quem;
                    if (a.pedi) l = '<a href="javascript:addCC(' + o + ');">ADICIONAR CRÉDITO</a>';
                    else l = '<a href="javascript:addCC(' + o + ');">PEDIR TAMBÉM</a>'
                }
            }
            $(".busc-p").append('<li id="' + a.imdb + '"><div class="img"><img src="' + a.image + '" /></div><div class="caption"><h1>' + a.name + '</h1><div class="tt">' + a.tipo + " // " + a.ano + '</div><div class="tttt">' + s + '</div><div class="ttt">' + i + '</div><div class="b">' + l + "</div></div></li>")
        }) : $(".busc-p").empty().html('<div class="sugestion2" style=""><div class="qIn">NADA ENCONTRADO...</div><h1>SUGESTÕES:</h1> <p>DIGITE O TITULO ORIGINAL:</p> <p>DIGITE O ID O IMDB (TT1234567):</p></div>')
    })), !1
}

function montaHome() {
    atualView();
    return $.post(getLink() + "/app-mobile.php", {
        token: breakToken(),
        accepts: breakDevice()
    }, function(e) {
        if (0 < e.indexOf("trigger")) montaHome();
        else {
            var a;
            if ((a = $.parseJSON(e)).update) return !(window.location.href = "update.html");
            if (window.setTimeout(function() {
                    $(".ovv").addClass("out"), window.setTimeout(function() {
                        $(".introduct").fadeOut("slow"), $(".ovv").addClass("outt")
                    }, 300)
                }, 500), window.setTimeout(function() {
                    $(".introduct").remove(), $(".ovv").remove()
                }, 1500), online(), 0 == (a = $.parseJSON(e)).newStatus) return window.location.href = "#noticias", void $("#notV").remove();
            if ($("#init").html(1), a.deslog) return void deslogg();
            if (1 == a.topVip ? ($("#rtopp").hide(), Exe = 1, a.topAdult && (a.topAccess && $("#pin").html(a.topAccess), $("#r-adult").show())) : ($("#r-adult").hide(), $("#rtopp").show()), a.usuario && ($("#nomeUser").html(a.usuario.nome), $(".nname").html(a.usuario.nome), $(".picEu").attr("src", getSite() + "/_storage/avatar/" + a.usuario.picture)), a.atWhats) {
                var s = "'" + a.atWhats + "'";
                $("#atWhats a").attr("href", "javascript:external(" + s + ")"), $("#atWhats").show()
            } else $("#atWhats").hide();
            $("#vipTv").attr("href", "#tv?27"), $(".whats").attr("href", "javascript:external('" + a.LinkFone + "');"), $(".whats p").html(a.Fone), $("#sistemaCast").val(a.cast), $("#planoUser").html(a.topPlano), a.creditos && $(".nCredit").html(a.creditos), a.meusPedidos && $(".myPed").html(a.meusPedidos), $("#topH2").attr("data-text", a.topTitulo), a.menu && (a.menu.whats.active ? $("#mm-whats").attr("href", "javascript:external('" + a.menu.whats.link + "');").show : $("#mm-whats").hide(), a.menu.insta.active ? $(".mm-insta").attr("href", "javascript:external('" + a.menu.insta.link + "');").show : $(".mm-insta").hide(), a.menu.face.active ? $(".mm-face").attr("href", "javascript:external('" + a.menu.face.link + "');").show : $(".mm-face").hide()), a.alerter && openMessage(a.alerter, "err", "Estamos em Manutenção"), a.Continue ? ($("#sHome .one").html(JSON.stringify(a.Continue)), $("#primm").show().addClass("margin-top"), $("#segunn").removeClass("margin-top"), $("#filmes1").html('<div class="owl-carousel lister-continue"></div>'), jQuery.each(a.Continue, function(e, a) {
                var s = "'" + a.link + "'";
                $("#filmes1 .lister-continue").append('<div class="itemm" id="' + a.type + "-C-" + a.id + '"><a class="pl-coninute" href="' + a.play + '"><div class="img"><div class="outline"></div><div class="shad"></div><span class="costPlay"></span><img class="lazyload" src="img/load-2.png" data-src="' + a.image + '"></div></a><div class="cont-nue"><div class="bar"><span style="width:' + a.bar + '%;"></span></div><div class="til">' + a.name + '</div><i onClick="window.location.href=' + s + ';" class="info"></i></div></div>')
            }), carHome2()) : ($("#primm").hide(), $("#segunn").addClass("margin-top")), a.Lista ? ($("tercnn").show(), $("#filmes7").html('<div class="owl-carousel carter"></div>'), jQuery.each(a.Lista, function(e, a) {
                $("#filmes7 .carter").append('<a href="' + a.link + '" class="itemm"><div class="outline"></div><div class="img"><img  class="lazyload" src="img/load-1.png" data-src="' + a.folder + '" /></div><div class="shad"></div><div class="caption"><h2>' + a.name + "</h2></div></a>")
            })) : $("#tercnn").hide(), $("#filmes8").html('<div class="owl-carousel carter"></div>'), jQuery.each(a.homeAlta, function(e, a) {
                $("#filmes8 .carter").append('<a href="' + a.link + '" class="itemm"><div class="outline"></div><div class="img"><img  class="lazyload" src="img/load-1.png" data-src="' + a.folder + '" /></div><div class="shad"></div><div class="caption"><h2>' + a.name + "</h2></div></a>")
            }), a.homeLancamentos && ($("#filmes2").html('<div class="owl-carousel carter"></div>'), jQuery.each(a.homeLancamentos, function(e, a) {
                e < 21 && $("#filmes2 .carter").append('<a href="#playFilme?' + a.id + '" class="itemm"><div class="outline"></div><div class="img"><img  class="lazyload" src="img/load-1.png" data-src="' + a.folder + '" /></div><div class="shad"></div><div class="caption"><h2>' + a.name + "</h2></div></a>")
            })), a.homeAssistidos && ($("#filmes3").html('<div class="owl-carousel carter"></div>'), jQuery.each(a.homeAssistidos, function(e, a) {
                e < 21 && $("#filmes3 .carter").append('<a href="#playFilme?' + a.id + '" class="itemm"><div class="outline"></div><div class="img"><img class="lazyload" src="img/load-1.png" data-src="' + a.folder + '" /></div><div class="shad"></div><div class="caption"><h2>' + a.name + "</h2></div></a>")
            })), a.homeRecomenda && ($("#filmes5").html('<div class="owl-carousel carter"></div>'), jQuery.each(a.homeRecomenda, function(e, a) {
                e < 21 && $("#filmes5 .carter").append('<a href="#playFilme?' + a.id + '" class="itemm"><div class="img"><img class="lazyload" src="img/load-1.png" data-src="' + a.folder + '" /></div><div class="shad"></div><div class="caption"><h2>' + a.name + "</h2></div></a>")
            })), a.homeEpisodios && ($("#filmes6").html('<div class="owl-carousel carter"></div>'), jQuery.each(a.homeEpisodios, function(e, a) {
                $("#filmes6 .carter").append('<a href="#playSerie?' + a.id + '" class="itemm"><div class="outline"></div><div class="img"><img class="lazyload" src="img/load-1.png" data-src="' + a.folder + '" /></div><div class="shad"></div><div class="caption"><h2>' + a.name + "</h2><h3>" + a.last + "</h3></div></a>")
            })), a.homeOriginais && jQuery.each(a.homeOriginais, function(e, a) {
                $("#looper").append('<div class="home-sep"><div class="img"><div class="backgroundd"></div><img src="img/load-6.png" data-src="' + a.wall + '" class="lazyload" /></div><div class="filder"><div class="div"><a href="' + a.link + '" class="pl"></a><div class="im"><a href="' + a.link + '"><img src="img/load-1.png" data-src="' + a.folder + '" class="lazyload" /></a></div><h3>' + a.name + '</h3><div class="gen">' + a.ctg + '</div><div class="info">' + a.line + "</div></div></div></div>")
            }), a.CategoryFilmes && jQuery.each(a.CategoryFilmes, function(e, a) {
                $(".menu-FILMES .rel").append('<li><a onClick="hideCategorias();" id="F' + a.id + '" data-name="' + a.title + '" href="#filmes?' + a.id + '">' + a.title + "</a></li>"), $("#p-filmes").append('<div id="getF-' + a.id + '" class="getCategory animated"><div class="topload"></div></div>')
            }), a.CategorySeries && jQuery.each(a.CategorySeries, function(e, a) {
                $(".menu-SERIES .rel").append('<li><a onClick="hideCategorias();" id="S' + a.id + '" data-name="' + a.title + '" href="#series?' + a.id + '">' + a.title + "</a></li>"), $("#p-series").append('<div id="getS-' + a.id + '" class="getCategory animated"><div class="topload"></div></div>')
            }), a.CategoryZZZ && jQuery.each(a.CategoryZZZ, function(e, a) {
                $(".menu-ADULTO .rel").append('<li><a onClick="hideCategorias();" id="Z' + a.id + '" data-name="' + a.title + '" href="#adulto?' + a.id + '">' + a.title + "</a></li>"), $("#p-adulter").append('<div id="getZ-' + a.id + '" class="getCategory animated"><div class="topload"></div></div>')
            }), a.CategoryTv && jQuery.each(a.CategoryTv, function(e, a) {
                $(".menu-TV .rel").append('<li><a onClick="hideCategorias();" id="T' + a.id + '" data-name="' + a.title + '" href="#tv?' + a.id + '">' + a.title + "</a></li>"), $("#p-tv").append('<div id="getT-' + a.id + '" class="getCategory animated"><div class="topload"></div></div>')
            }), a.topAdult || ($("#getT-39").remove(), $("#T39").remove())
        }
        carter(), carHome3(), carterH()
    }), !1
}

function desceTop() {
    $(".newMenu").is(":visible") || window.setTimeout(function() {
        $(".newMenu").show().addClass("fadeInDown"), window.setTimeout(function() {
            $(".newMenu").removeClass("fadeInDown")
        }, 1e3)
    }, 800)
}

function onTOP() {
    $(".newMenu").attr("data-este", ""), $(".corp-menu .nons.current").removeClass("current"), $(".corp-menu .meen").hide(), window.setTimeout(function() {
        $(".corp-menu .nons").show()
    }, 300)
}

function offTOP(e, a) {
    $(".corp-menu .meen a").show(), "none" == a || $(".prmmm").html(a), $(".newMenu").attr("data-este", e), "filmes" == e && ($(".liner-topo a").attr("data-type", "FILMES"), $("#kseries").fadeOut(), $("#ktv").fadeOut(), $("#kadultos").fadeOut(), window.setTimeout(function() {
        $("#kfilmes").addClass("current"), $(".corp-menu .meen").fadeIn()
    }, 300)), "series" == e && ($(".liner-topo a").attr("data-type", "SERIES"), $("#kfilmes").fadeOut(), $("#ktv").fadeOut(), $("#kadultos").fadeOut(), window.setTimeout(function() {
        $("#kseries").addClass("current"), $(".corp-menu .meen").fadeIn()
    }, 300)), "tv" == e && ($(".liner-topo a").attr("data-type", "TV"), $("#kfilmes").fadeOut(), $("#kseries").fadeOut(), $("#kadultos").fadeOut(), window.setTimeout(function() {
        $("#ktv").addClass("current"), $(".corp-menu .meen").fadeIn()
    }, 300)), "adulto" == e && ($(".liner-topo a").attr("data-type", "ADULTO"), $("#kfilmes").fadeOut(), $("#kseries").fadeOut(), $("#ktv").fadeOut(), "none" == a ? window.setTimeout(function() {
        $("#kadultos").addClass("current"), $(".corp-menu .meen").fadeOut()
    }, 300) : window.setTimeout(function() {
        $("#kadultos").addClass("current"), $(".corp-menu .meen").fadeIn()
    }, 300), $(".corp-menu .meen a").hide())
}

function showCategorias() {
    var e = $(".liner-topo a").attr("data-type");
    $(".menu-" + e).show()
}

function hideCategorias() {
    $(".menu-categoria").hide()
}

function padraoPage() {
    closeCdown(), closeCcast(), $(".over-menu").show(), window.setTimeout(function() {
        $(".over-menu").hide()
    }, 1700), $(".minner-top").hide(), $(".g-cast").hide(), 0 < $("#player-wrapper").length && nonePlayer(), $(".corp-apps").animate({
        scrollTop: 0
    }, 600), $("ul.historico").empty(), $("ul.listaa").empty(), hideCategorias(), window.setTimeout(function() {
        closeSlike(), closeFlike()
    }, 600)
}

function checkInit() {
    return $("#init").html()
}

function adultPin() {
    $("#p-adulto .pinner").val() == $("#pin").html() && ($("#pin").attr("data-accept", 1), getAdults2(), offTOP("adulto", $("#Z" + getUrl()).attr("data-name")), $(".meen").fadeIn())
}

function adultPinn() {
    $("#p-tv .pinner").val() == $("#pin").html() && ($("#pin").attr("data-accept", 1), $("#adultPinn").hide(), $("#p-tv #getT-39").show())
}

function changeseek(e, a, s, i) {}

function NotificaPlayer() {
    $(".player-error-screen__content").remove(), $(".player-poster[data-poster] .play-wrapper[data-poster] svg").remove(), "tv" == $(".item-play").attr("data-type") && $(".player-res").fadeIn();
    var e = $(".item-play").attr("data-type"),
        a = $(".item-play").attr("data-current");
    if ("serie" == e) var s = $("#currentserie").val();
    else s = 0;
    $(".backplayer").fadeIn(), $.post(getLink() + "/app-error.php", {
        token: breakToken(),
        accepts: breakDevice(),
        type: e,
        id: a,
        cap: s,
        play: play
    }, function(e) {
        $.parseJSON(e).result ? minMessage("Não foi possível reproduzir esse titulo. Tente novamente!") : minMessage("Não foi possível reproduzir esse titulo, o erro foi notificado!")
    })
}

function carterH() {
    $(".outer").owlCarousel({
        loop: !0,
        margin: 0,
        autoplay: !1,
        nav: !1,
        dots: !1,
        items: 1
    }), lazyload()
}

function carter() {
    $(".carter").owlCarousel({
        loop: !1,
        margin: 7,
        autoplay: !1,
        nav: !1,
        dots: !1,
        responsiveClass: !0,
        responsive: {
            0: {
                items: 2
            },
            350: {
                items: 2
            },
            500: {
                items: 3
            },
            680: {
                items: 4
            },
            850: {
                items: 5
            },
            1e3: {
                items: 6
            }
        }
    }), lazyload()
}

function carHome() {
    $(".lister-home").owlCarousel({
        loop: !1,
        margin: 7,
        autoplay: !1,
        nav: !1,
        dots: !1,
        responsiveClass: !0,
        responsive: {
            0: {
                items: 3
            },
            350: {
                items: 3
            },
            500: {
                items: 4
            },
            700: {
                items: 5
            },
            850: {
                items: 6
            }
        }
    }), lazyload()
}

function carHome2() {
    $(".lister-continue").owlCarousel({
        loop: !1,
        margin: 7,
        autoplay: !1,
        nav: !1,
        dots: !1,
        responsiveClass: !0,
        responsive: {
            0: {
                items: 1
            },
            350: {
                items: 1
            },
            550: {
                items: 2
            },
            850: {
                items: 3
            },
            1010: {
                items: 4
            }
        }
    }), lazyload()
}

function carProgr() {
    $(".progrs").owlCarousel({
        loop: !1,
        margin: 0,
        autoplay: !1,
        nav: !1,
        dots: !1,
        responsiveClass: !0,
        responsive: {
            0: {
                items: 6
            },
            350: {
                items: 6
            },
            400: {
                items: 8
            },
            450: {
                items: 9
            },
            500: {
                items: 10
            }
        }
    }), lazyload()
}

function carHome3() {
    $(".netflix-car").owlCarousel({
        loop: !0,
        margin: 10,
        autoplay: !1,
        nav: !1,
        dots: !1,
        responsiveClass: !0,
        responsive: {
            0: {
                items: 2
            },
            350: {
                items: 2
            },
            500: {
                items: 3
            },
            700: {
                items: 4
            }
        }
    }), lazyload()
}

function carHome4() {
    $(".car-tv").owlCarousel({
        loop: !1,
        margin: 7,
        autoplay: !1,
        nav: !1,
        dots: !1,
        responsiveClass: !0,
        responsive: {
            0: {
                items: 1
            },
            450: {
                items: 2
            },
            600: {
                items: 2
            },
            800: {
                items: 3
            }
        }
    }), lazyload()
}

function netflixTop() {
    $(".netflix-top").owlCarousel({
        loop: !1,
        margin: 0,
        autoplay: !1,
        nav: !1,
        dots: !0,
        responsiveClass: !0,
        responsive: {
            0: {
                items: 1
            },
            350: {
                items: 1
            },
            500: {
                items: 1
            },
            700: {
                items: 1
            },
            850: {
                items: 1
            }
        }
    }), lazyload()
}

function openMenu() {
    $(".header-trigger").addClass("active"), $(".corp-apps").addClass("rotate")
}

function closeMenu() {
    $(".header-trigger").removeClass("active"), $(".corp-apps").removeClass("rotate")
}

function leeters(e, a) {
    $(e).shuffleLetters({
        text: a
    })
}

function fixPage(e) {
    var a = "bounceInDown2",
        s = "bounceInUp",
        i = $("#" + e).attr("data-direction");
    "left" == i && (s = a = "fadeInRight2"), s = a = "fadeInRight2", "p-home" == e ? ($(".over-home").hide(), $(".aberta").addClass("zoomOut").fadeOut(function() {
        window.setTimeout(function() {
            $(".aberta").removeClass("aberta").hide().removeClass("zoomOut")
        }, 1e3), $("#p-home").removeClass("z-home")
    })) : ($("#p-home").addClass("z-home"), $(".over-home").show(), $("#" + e).is(":visible") || ($(".mPage").hasClass("aberta") ? "left" == i ? ($("#" + e).addClass("zindexed").show().addClass(a), $(".aberta").addClass("zoomOut"), window.setTimeout(function() {
        $(".aberta").removeClass("zoomOut").hide().removeClass("aberta"), $("#" + e).removeClass("zindexed").removeClass(a).addClass("aberta")
    }, 700)) : $(".aberta").addClass("zoomOut").fadeOut(function() {
        window.setTimeout(function() {
            $(".aberta").removeClass("aberta").hide().removeClass("zoomOut")
        }, 1e3), $("#" + e).show().addClass(a), window.setTimeout(function() {
            $("#" + e).removeClass(a).addClass("aberta")
        }, 1e3)
    }) : ($("#" + e).show().addClass(s), window.setTimeout(function() {
        $("#" + e).removeClass(s).show().addClass("aberta")
    }, 1e3))))
}

function escreveHome() {
    "&nbsp;" == $("#topH1").html() && window.setTimeout(function() {
        leeters("#topH1", "Top Flix TV"), window.setTimeout(function() {
            leeters("#topH2", "SUCESSOS DO CINEMA NO SEU ANDROID")
        }, 800), window.setTimeout(function() {
            leeters("#topH3", "ONLINE GRÁTIS!")
        }, 1600)
    }, 500)
}

function updateContinue() {
    var a = $("#sHome .one").html();
    "" == a ? ($("#primm").hide(), $("#segunn").addClass("margin-top")) : window.setTimeout(function() {
        $("#primm").show().addClass("margin-top"), $("#segunn").removeClass("margin-top");
        var e = $.parseJSON(a);
        $("#filmes1 .lister-continue").remove(), $("#filmes1").html('<div class="owl-carousel lister-continue"></div>'), jQuery.each(e, function(e, a) {
            var s = "'" + a.link + "'";
            $("#filmes1 .lister-continue").append('<div class="itemm" id="' + a.type + "-C-" + a.id + '"><a class="pl-coninute" href="javascript:' + a.play + '"><div class="img"><div class="shad"></div><span class="costPlay"></span><img class="lazyload" src="img/load-2.png" data-src="' + a.image + '"></div></a><div class="cont-nue"><div class="bar"><span style="width:' + a.bar + '%;"></span></div><div class="til">' + a.name + '</div><i onClick="window.location.href=' + s + ';" class="info"></i></div></div>')
        }), carHome2()
    }, 700)
}

function updC() {
    var e = window.location.href;
    $.post(getLink() + "/app-user-update.php", {
        token: breakToken(),
        accepts: breakDevice(),
        url: e
    }, function(e) {
        var a = $.parseJSON(e);
        a.Continue && ($("#primm").show().addClass("margin-top"), $("#segunn").removeClass("margin-top"), $("#filmes1 .lister-continue").remove(), $("#filmes1").html('<div class="owl-carousel lister-continue"></div>'), jQuery.each(a.Continue, function(e, a) {
            var s = "'" + a.link + "'";
            $("#filmes1 .lister-continue").append('<div class="itemm" id="' + a.type + "-C-" + a.id + '"><a class="pl-coninute" href="javascript:' + a.play + '"><div class="img"><div class="shad"></div><span class="costPlay"></span><img class="lazyload" src="img/load-2.png" data-src="' + a.image + '"></div></a><div class="cont-nue"><div class="bar"><span style="width:' + a.bar + '%;"></span></div><div class="til">' + a.name + '</div><i onClick="window.location.href=' + s + ';" class="info"></i></div></div>')
        }), carHome2())
    })
}

function notFound() {
    minMessage("Esse titulo não está disponível!"), window.setTimeout(function() {
        window.location.href = "#home"
    }, 1e3)
}

function nfilterSerie(e) {
    $.post(getLink() + "/app-series-filter.php", {
        token: breakToken(),
        accepts: breakDevice(),
        filter: e
    }, function(e) {
        var a = $.parseJSON(e);
        if (a.data) {
            var s = a.data;
            $("#p-playseries a.bkk").attr("href", "#series?" + s.idcategoria), s.mess ? $("#p-playseries .mess").html(s.mess).show() : $("#p-playseries .mess").empty().hide();
            var i = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 475.099 475.099" style="enable-background:new 0 0 475.099 475.099;" xml:space="preserve"><path d="M442.829,265.532c9.328-14.089,13.986-29.598,13.986-46.538c0-19.607-7.225-36.637-21.687-51.117   c-14.469-14.465-31.601-21.696-51.394-21.696h-50.251c9.134-18.842,13.709-37.117,13.709-54.816c0-22.271-3.34-39.971-9.996-53.105   c-6.663-13.138-16.372-22.795-29.126-28.984C295.313,3.09,280.947,0,264.959,0c-9.712,0-18.274,3.521-25.697,10.566   c-8.183,7.993-14.084,18.274-17.699,30.837c-3.617,12.559-6.521,24.6-8.708,36.116c-2.187,11.515-5.569,19.652-10.135,24.41   c-9.329,10.088-19.511,22.273-30.551,36.547c-19.224,24.932-32.264,39.685-39.113,44.255H54.828   c-10.088,0-18.702,3.574-25.84,10.706c-7.135,7.139-10.705,15.752-10.705,25.841v182.723c0,10.089,3.566,18.699,10.705,25.838   c7.142,7.139,15.752,10.711,25.84,10.711h82.221c4.188,0,17.319,3.806,39.399,11.42c23.413,8.186,44.017,14.418,61.812,18.702   c17.797,4.284,35.832,6.427,54.106,6.427h26.545h10.284c26.836,0,48.438-7.666,64.809-22.99   c16.365-15.324,24.458-36.213,24.27-62.67c11.42-14.657,17.129-31.597,17.129-50.819c0-4.185-0.281-8.277-0.855-12.278   c7.23-12.748,10.854-26.453,10.854-41.11C445.399,278.379,444.544,271.809,442.829,265.532z M85.949,396.58   c-3.616,3.614-7.898,5.428-12.847,5.428c-4.95,0-9.233-1.813-12.85-5.428c-3.615-3.613-5.424-7.897-5.424-12.85   c0-4.948,1.805-9.229,5.424-12.847c3.621-3.617,7.9-5.425,12.85-5.425c4.949,0,9.231,1.808,12.847,5.425   c3.617,3.617,5.426,7.898,5.426,12.847C91.375,388.683,89.566,392.967,85.949,396.58z M414.145,242.419   c-4.093,8.754-9.186,13.227-15.276,13.415c2.854,3.237,5.235,7.762,7.139,13.562c1.902,5.807,2.847,11.087,2.847,15.848   c0,13.127-5.037,24.455-15.126,33.969c3.43,6.088,5.141,12.658,5.141,19.697c0,7.043-1.663,14.038-4.996,20.984   c-3.327,6.94-7.851,11.938-13.559,14.982c0.951,5.709,1.423,11.04,1.423,15.988c0,31.785-18.274,47.678-54.823,47.678h-34.536   c-24.94,0-57.483-6.943-97.648-20.841c-0.953-0.38-3.709-1.383-8.28-2.998s-7.948-2.806-10.138-3.565   c-2.19-0.767-5.518-1.861-9.994-3.285c-4.475-1.431-8.087-2.479-10.849-3.142c-2.758-0.664-5.901-1.283-9.419-1.855   c-3.52-0.571-6.519-0.855-8.993-0.855h-9.136V219.285h9.136c3.045,0,6.423-0.859,10.135-2.568c3.711-1.714,7.52-4.283,11.421-7.71   c3.903-3.427,7.564-6.805,10.992-10.138c3.427-3.33,7.233-7.517,11.422-12.559c4.187-5.046,7.47-9.089,9.851-12.135   c2.378-3.045,5.375-6.949,8.992-11.707c3.615-4.757,5.806-7.613,6.567-8.566c10.467-12.941,17.795-21.601,21.982-25.981   c7.804-8.182,13.466-18.603,16.987-31.261c3.525-12.66,6.427-24.604,8.703-35.832c2.282-11.229,5.903-19.321,10.858-24.27   c18.268,0,30.453,4.471,36.542,13.418c6.088,8.945,9.134,22.746,9.134,41.399c0,11.229-4.572,26.503-13.71,45.821   c-9.134,19.32-13.698,34.5-13.698,45.539h100.495c9.527,0,17.993,3.662,25.413,10.994c7.426,7.327,11.143,15.843,11.143,25.553   C420.284,225.943,418.237,233.653,414.145,242.419z"></path></svg>',
                t = s.wall.replace("amp;w", "w").replace("amp;h", "h");
            if ($(".serieJson").attr("data-cover", t), $(".bty.like").attr("onClick", "chacgeSLike(" + s.id + ", 1)"), $(".bty.unlike").attr("onClick", "chacgeSLike(" + s.id + ", 2)"), 1 == s.votei ? ($("#p-playseries .global-votos i").html('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  x="0px" y="0px" viewBox="0 0 456.814 456.814" style="enable-background:new 0 0 456.814 456.814;" xml:space="preserve"><path d="M441.11,252.677c10.468-11.99,15.704-26.169,15.704-42.54c0-14.846-5.432-27.692-16.259-38.547    c-10.849-10.854-23.695-16.278-38.541-16.278h-79.082c0.76-2.664,1.522-4.948,2.282-6.851c0.753-1.903,1.811-3.999,3.138-6.283    c1.328-2.285,2.283-3.999,2.852-5.139c3.425-6.468,6.047-11.801,7.857-15.985c1.807-4.192,3.606-9.9,5.42-17.133    c1.811-7.229,2.711-14.465,2.711-21.698c0-4.566-0.055-8.281-0.145-11.134c-0.089-2.855-0.574-7.139-1.423-12.85    c-0.862-5.708-2.006-10.467-3.43-14.272c-1.43-3.806-3.716-8.092-6.851-12.847c-3.142-4.764-6.947-8.613-11.424-11.565    c-4.476-2.95-10.184-5.424-17.131-7.421c-6.954-1.999-14.801-2.998-23.562-2.998c-4.948,0-9.227,1.809-12.847,5.426    c-3.806,3.806-7.047,8.564-9.709,14.272c-2.666,5.711-4.523,10.66-5.571,14.849c-1.047,4.187-2.238,9.994-3.565,17.415    c-1.719,7.998-2.998,13.752-3.86,17.273c-0.855,3.521-2.525,8.136-4.997,13.845c-2.477,5.713-5.424,10.278-8.851,13.706    c-6.28,6.28-15.891,17.701-28.837,34.259c-9.329,12.18-18.94,23.695-28.837,34.545c-9.899,10.852-17.131,16.466-21.698,16.847    c-4.755,0.38-8.848,2.331-12.275,5.854c-3.427,3.521-5.14,7.662-5.14,12.419v183.01c0,4.949,1.807,9.182,5.424,12.703    c3.615,3.525,7.898,5.38,12.847,5.571c6.661,0.191,21.698,4.374,45.111,12.566c14.654,4.941,26.12,8.706,34.4,11.272    c8.278,2.566,19.849,5.328,34.684,8.282c14.849,2.949,28.551,4.428,41.11,4.428h4.855h21.7h10.276    c25.321-0.38,44.061-7.806,56.247-22.268c11.036-13.135,15.697-30.361,13.99-51.679c7.422-7.042,12.565-15.984,15.416-26.836    c3.231-11.604,3.231-22.74,0-33.397c8.754-11.611,12.847-24.649,12.272-39.115C445.395,268.286,443.971,261.055,441.11,252.677z"></path><path d="M100.5,191.864H18.276c-4.952,0-9.235,1.809-12.851,5.426C1.809,200.905,0,205.188,0,210.137v182.732    c0,4.942,1.809,9.227,5.426,12.847c3.619,3.611,7.902,5.421,12.851,5.421H100.5c4.948,0,9.229-1.81,12.847-5.421    c3.616-3.62,5.424-7.904,5.424-12.847V210.137c0-4.949-1.809-9.231-5.424-12.847C109.73,193.672,105.449,191.864,100.5,191.864z     M67.665,369.308c-3.616,3.521-7.898,5.281-12.847,5.281c-5.14,0-9.471-1.76-12.99-5.281c-3.521-3.521-5.281-7.85-5.281-12.99    c0-4.948,1.759-9.232,5.281-12.847c3.52-3.617,7.85-5.428,12.99-5.428c4.949,0,9.231,1.811,12.847,5.428    c3.617,3.614,5.426,7.898,5.426,12.847C73.091,361.458,71.286,365.786,67.665,369.308z"></path></svg>').addClass(s.gosto), $("#serieVotar").attr("onClick", "removeSlike(" + s.id + ");")) : ($("#serieVotar").attr("onClick", "overSlike();"), $("#p-playseries .global-votos i").html(i).addClass("like")), $("#p-playseries .bhy .like").html(i), $("#p-playseries .bhy .unlike").html(i), $("#p-playseries .global-share").attr("href", "javascript:openSharer('" + s.share + "', '" + s.name + "');"), s.lista ? ($("#p-playseries .global-lista").attr("data-action", "del").attr("href", "javascript:addSlist(" + s.id + ");"), $("#p-playseries .global-lista i").html('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 26 26" enable-background="new 0 0 26 26"> <path d="m.3,14c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.4-0.4 1-0.4 1.4,0l.1,.1 5.5,5.9c0.2,0.2 0.5,0.2 0.7,0l13.4-13.9h0.1v-8.88178e-16c0.4-0.4 1-0.4 1.4,0l1.4,1.4c0.4,0.4 0.4,1 0,1.4l0,0-16,16.6c-0.2,0.2-0.4,0.3-0.7,0.3-0.3,0-0.5-0.1-0.7-0.3l-7.8-8.4-.2-.3z"></path></svg>')) : ($("#p-playseries .global-lista").attr("data-action", "add").attr("href", "javascript:addSlist(" + s.id + ");"), $("#p-playseries .global-lista i").html('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 357 357" style="enable-background:new 0 0 357 357;" xml:space="preserve"><path d="M357,204H204v153h-51V204H0v-51h153V0h51v153h153V204z"></path></svg>')), 0 < s.relevancia ? $("#p-playseries .votos").html(s.relevancia + "% Relevante").show() : $("#p-playseries .votos").empty().hide(), $("#p-playseries .ratio-hd").css("background-image", "url(" + t + ")"), $("#p-playseries .name").html(s.name), $("#p-playseries .ano").html(s.ano), $("#p-playseries .duracao").html(s.duracao), $("#p-playseries .category").html(s.category + "<i></i>"), $("#p-playseries .sinopse").html("<b>" + s.original + "</b>" + limiter(s.sinopse, 140)), $("#p-playseries .elenco").html("<b>Elenco:</b> " + s.elenco), $("#p-playseries .direcao").html("<b>Direção:</b> " + s.direcao), $("#p-playseries .generos").html("<b>Atualizado:</b> " + s.update), $("#p-playseries .res").html(s.res), a.temporadas) SeriesTaction(JSON.stringify(a.temporadas));
            a.seek ? ($("#p-playseries .name").hide(), $("#p-playseries .seekingk").show(), $("#p-playseries .seekingk .bar span").css("width", a.seek.bar + "%"), $("#p-playseries .seekingk .named").html(a.seek.name), $("#p-playseries .seekingk .resta").html("Tempo restante " + a.seek.resta), alterTSeries(a.seek.temporada), $("#p-playseries #current").val(a.seek.timer), $("#p-playseries #seek").val(a.seek.id), $("#p-playseries .plays").hide(), $("#p-playseries .play").show().attr("href", "javascript:CurrentSerieCap(" + a.seek.id + "),playPlayer('" + s.id + "," + a.seek.id + "," + a.seek.lang + "', '" + t + "', 'serie', '" + a.seek.serie + "', '" + a.seek.lang + "', '" + a.seek.titulo + "', " + a.seek.timer + ");")) : ($("#p-playseries .name").show(), playNoContinue(a.init), alterTSeries(1)), $("#p-playseries .plays").hide(), $("#p-playseries .play").show(), 1 == getCast() ? ($("#p-playseries .plays a").addClass("castPlayer"), $("#p-playseries .play").addClass("castPlayer")) : ($("#p-playseries .plays a").removeClass("castPlayer"), $("#p-playseries .play").removeClass("castPlayer"))
        }
    })
}

function filterSerie(e) {
    window.setTimeout(function() {
        Ads()
    }, 1500), $.post(getLink() + "/app-series-filter.php", {
        token: breakToken(),
        accepts: breakDevice(),
        filter: e
    }, function(e) {
        if (0 < e.indexOf("trigger")) notFound();
        else {
            var a = $.parseJSON(e);
            if (0 == a.result && notFound(), a.data) {
                window.setTimeout(function() {
                    $("#p-series .getCategory").empty(), $("#p-playseries .globalOverlay").fadeOut(function() {
                        $("#p-playseries .globalFilter").show().addClass("bounceInDown2"), $("#p-playseries .minner-top").show(), $("#p-playseries .g-cast").show(), window.setTimeout(function() {
                            $("#p-playseries .globalFilter").removeClass("bounceInDown2")
                        }, 1e3)
                    })
                }, 1e3), $("a.bky").attr("data-cred", a.creditos);
                var s = a.data;
                $("#p-playseries a.bkk").attr("href", "#series?" + s.idcategoria), s.mess ? $("#p-playseries .mess").html(s.mess).show() : $("#p-playseries .mess").empty().hide();
                var i = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 475.099 475.099" style="enable-background:new 0 0 475.099 475.099;" xml:space="preserve"><path d="M442.829,265.532c9.328-14.089,13.986-29.598,13.986-46.538c0-19.607-7.225-36.637-21.687-51.117   c-14.469-14.465-31.601-21.696-51.394-21.696h-50.251c9.134-18.842,13.709-37.117,13.709-54.816c0-22.271-3.34-39.971-9.996-53.105   c-6.663-13.138-16.372-22.795-29.126-28.984C295.313,3.09,280.947,0,264.959,0c-9.712,0-18.274,3.521-25.697,10.566   c-8.183,7.993-14.084,18.274-17.699,30.837c-3.617,12.559-6.521,24.6-8.708,36.116c-2.187,11.515-5.569,19.652-10.135,24.41   c-9.329,10.088-19.511,22.273-30.551,36.547c-19.224,24.932-32.264,39.685-39.113,44.255H54.828   c-10.088,0-18.702,3.574-25.84,10.706c-7.135,7.139-10.705,15.752-10.705,25.841v182.723c0,10.089,3.566,18.699,10.705,25.838   c7.142,7.139,15.752,10.711,25.84,10.711h82.221c4.188,0,17.319,3.806,39.399,11.42c23.413,8.186,44.017,14.418,61.812,18.702   c17.797,4.284,35.832,6.427,54.106,6.427h26.545h10.284c26.836,0,48.438-7.666,64.809-22.99   c16.365-15.324,24.458-36.213,24.27-62.67c11.42-14.657,17.129-31.597,17.129-50.819c0-4.185-0.281-8.277-0.855-12.278   c7.23-12.748,10.854-26.453,10.854-41.11C445.399,278.379,444.544,271.809,442.829,265.532z M85.949,396.58   c-3.616,3.614-7.898,5.428-12.847,5.428c-4.95,0-9.233-1.813-12.85-5.428c-3.615-3.613-5.424-7.897-5.424-12.85   c0-4.948,1.805-9.229,5.424-12.847c3.621-3.617,7.9-5.425,12.85-5.425c4.949,0,9.231,1.808,12.847,5.425   c3.617,3.617,5.426,7.898,5.426,12.847C91.375,388.683,89.566,392.967,85.949,396.58z M414.145,242.419   c-4.093,8.754-9.186,13.227-15.276,13.415c2.854,3.237,5.235,7.762,7.139,13.562c1.902,5.807,2.847,11.087,2.847,15.848   c0,13.127-5.037,24.455-15.126,33.969c3.43,6.088,5.141,12.658,5.141,19.697c0,7.043-1.663,14.038-4.996,20.984   c-3.327,6.94-7.851,11.938-13.559,14.982c0.951,5.709,1.423,11.04,1.423,15.988c0,31.785-18.274,47.678-54.823,47.678h-34.536   c-24.94,0-57.483-6.943-97.648-20.841c-0.953-0.38-3.709-1.383-8.28-2.998s-7.948-2.806-10.138-3.565   c-2.19-0.767-5.518-1.861-9.994-3.285c-4.475-1.431-8.087-2.479-10.849-3.142c-2.758-0.664-5.901-1.283-9.419-1.855   c-3.52-0.571-6.519-0.855-8.993-0.855h-9.136V219.285h9.136c3.045,0,6.423-0.859,10.135-2.568c3.711-1.714,7.52-4.283,11.421-7.71   c3.903-3.427,7.564-6.805,10.992-10.138c3.427-3.33,7.233-7.517,11.422-12.559c4.187-5.046,7.47-9.089,9.851-12.135   c2.378-3.045,5.375-6.949,8.992-11.707c3.615-4.757,5.806-7.613,6.567-8.566c10.467-12.941,17.795-21.601,21.982-25.981   c7.804-8.182,13.466-18.603,16.987-31.261c3.525-12.66,6.427-24.604,8.703-35.832c2.282-11.229,5.903-19.321,10.858-24.27   c18.268,0,30.453,4.471,36.542,13.418c6.088,8.945,9.134,22.746,9.134,41.399c0,11.229-4.572,26.503-13.71,45.821   c-9.134,19.32-13.698,34.5-13.698,45.539h100.495c9.527,0,17.993,3.662,25.413,10.994c7.426,7.327,11.143,15.843,11.143,25.553   C420.284,225.943,418.237,233.653,414.145,242.419z"></path></svg>',
                    t = s.wall.replace("amp;w", "w").replace("amp;h", "h");
                if ($(".serieJson").attr("data-cover", t), $(".bty.like").attr("onClick", "chacgeSLike(" + s.id + ", 1)"), $(".bty.unlike").attr("onClick", "chacgeSLike(" + s.id + ", 2)"), 1 == s.votei ? ($("#p-playseries .global-votos i").html('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  x="0px" y="0px" viewBox="0 0 456.814 456.814" style="enable-background:new 0 0 456.814 456.814;" xml:space="preserve"><path d="M441.11,252.677c10.468-11.99,15.704-26.169,15.704-42.54c0-14.846-5.432-27.692-16.259-38.547    c-10.849-10.854-23.695-16.278-38.541-16.278h-79.082c0.76-2.664,1.522-4.948,2.282-6.851c0.753-1.903,1.811-3.999,3.138-6.283    c1.328-2.285,2.283-3.999,2.852-5.139c3.425-6.468,6.047-11.801,7.857-15.985c1.807-4.192,3.606-9.9,5.42-17.133    c1.811-7.229,2.711-14.465,2.711-21.698c0-4.566-0.055-8.281-0.145-11.134c-0.089-2.855-0.574-7.139-1.423-12.85    c-0.862-5.708-2.006-10.467-3.43-14.272c-1.43-3.806-3.716-8.092-6.851-12.847c-3.142-4.764-6.947-8.613-11.424-11.565    c-4.476-2.95-10.184-5.424-17.131-7.421c-6.954-1.999-14.801-2.998-23.562-2.998c-4.948,0-9.227,1.809-12.847,5.426    c-3.806,3.806-7.047,8.564-9.709,14.272c-2.666,5.711-4.523,10.66-5.571,14.849c-1.047,4.187-2.238,9.994-3.565,17.415    c-1.719,7.998-2.998,13.752-3.86,17.273c-0.855,3.521-2.525,8.136-4.997,13.845c-2.477,5.713-5.424,10.278-8.851,13.706    c-6.28,6.28-15.891,17.701-28.837,34.259c-9.329,12.18-18.94,23.695-28.837,34.545c-9.899,10.852-17.131,16.466-21.698,16.847    c-4.755,0.38-8.848,2.331-12.275,5.854c-3.427,3.521-5.14,7.662-5.14,12.419v183.01c0,4.949,1.807,9.182,5.424,12.703    c3.615,3.525,7.898,5.38,12.847,5.571c6.661,0.191,21.698,4.374,45.111,12.566c14.654,4.941,26.12,8.706,34.4,11.272    c8.278,2.566,19.849,5.328,34.684,8.282c14.849,2.949,28.551,4.428,41.11,4.428h4.855h21.7h10.276    c25.321-0.38,44.061-7.806,56.247-22.268c11.036-13.135,15.697-30.361,13.99-51.679c7.422-7.042,12.565-15.984,15.416-26.836    c3.231-11.604,3.231-22.74,0-33.397c8.754-11.611,12.847-24.649,12.272-39.115C445.395,268.286,443.971,261.055,441.11,252.677z"></path><path d="M100.5,191.864H18.276c-4.952,0-9.235,1.809-12.851,5.426C1.809,200.905,0,205.188,0,210.137v182.732    c0,4.942,1.809,9.227,5.426,12.847c3.619,3.611,7.902,5.421,12.851,5.421H100.5c4.948,0,9.229-1.81,12.847-5.421    c3.616-3.62,5.424-7.904,5.424-12.847V210.137c0-4.949-1.809-9.231-5.424-12.847C109.73,193.672,105.449,191.864,100.5,191.864z     M67.665,369.308c-3.616,3.521-7.898,5.281-12.847,5.281c-5.14,0-9.471-1.76-12.99-5.281c-3.521-3.521-5.281-7.85-5.281-12.99    c0-4.948,1.759-9.232,5.281-12.847c3.52-3.617,7.85-5.428,12.99-5.428c4.949,0,9.231,1.811,12.847,5.428    c3.617,3.614,5.426,7.898,5.426,12.847C73.091,361.458,71.286,365.786,67.665,369.308z"></path></svg>').addClass(s.gosto), $("#serieVotar").attr("onClick", "removeSlike(" + s.id + ");")) : ($("#serieVotar").attr("onClick", "overSlike();"), $("#p-playseries .global-votos i").html(i).addClass("like")), $("#p-playseries .bhy .like").html(i), $("#p-playseries .bhy .unlike").html(i), $("#p-playseries .global-share").attr("href", "javascript:openSharer('" + s.share + "', '" + s.name + "');"), s.lista ? ($("#p-playseries .global-lista").attr("data-action", "del").attr("href", "javascript:addSlist(" + s.id + ");"), $("#p-playseries .global-lista i").html('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 26 26" enable-background="new 0 0 26 26"> <path d="m.3,14c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.4-0.4 1-0.4 1.4,0l.1,.1 5.5,5.9c0.2,0.2 0.5,0.2 0.7,0l13.4-13.9h0.1v-8.88178e-16c0.4-0.4 1-0.4 1.4,0l1.4,1.4c0.4,0.4 0.4,1 0,1.4l0,0-16,16.6c-0.2,0.2-0.4,0.3-0.7,0.3-0.3,0-0.5-0.1-0.7-0.3l-7.8-8.4-.2-.3z"></path></svg>')) : ($("#p-playseries .global-lista").attr("data-action", "add").attr("href", "javascript:addSlist(" + s.id + ");"), $("#p-playseries .global-lista i").html('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 357 357" style="enable-background:new 0 0 357 357;" xml:space="preserve"><path d="M357,204H204v153h-51V204H0v-51h153V0h51v153h153V204z"></path></svg>')), 0 < s.relevancia ? $("#p-playseries .votos").html(s.relevancia + "% Relevante").show() : $("#p-playseries .votos").empty().hide(), $("#p-playseries .ratio-hd").css("background-image", "url(" + t + ")"), $("#p-playseries .name").html(s.name), $("#p-playseries .ano").html(s.ano), $("#p-playseries .duracao").html(s.duracao), $("#p-playseries .category").html(s.category + "<i></i>"), $("#p-playseries .sinopse").html("<b>" + s.original + "</b>" + limiter(s.sinopse, 140)), $("#p-playseries .elenco").html("<b>Elenco:</b> " + s.elenco), $("#p-playseries .direcao").html("<b>Direção:</b> " + s.direcao), $("#p-playseries .generos").html("<b>Atualizado:</b> " + s.update), $("#p-playseries .res").html(s.res), a.temporadas) SeriesTaction(JSON.stringify(a.temporadas));
                a.seek ? ($("#p-playseries .name").hide(), $("#p-playseries .seekingk").show(), $("#p-playseries .seekingk .bar span").css("width", a.seek.bar + "%"), $("#p-playseries .seekingk .named").html(a.seek.name), $("#p-playseries .seekingk .resta").html("Tempo restante " + a.seek.resta), alterTSeries(a.seek.temporada), $("#p-playseries #current").val(a.seek.timer), $("#p-playseries #seek").val(a.seek.id), $("#p-playseries .plays").hide(), $("#p-playseries .play").show().attr("href", "javascript:CurrentSerieCap(" + a.seek.id + "),playPlayer('" + s.id + "," + a.seek.id + "," + a.seek.lang + "', '" + t + "', 'serie', '" + a.seek.serie + "', '" + a.seek.lang + "', '" + a.seek.titulo + "', " + a.seek.timer + ")")) : ($("#p-playseries .name").show(), playNoContinue(a.init), alterTSeries(1)), $("#p-playseries .plays").hide(), $("#p-playseries .play").show(), 1 == getCast() ? ($("#p-playseries .plays a").addClass("castPlayer"), $("#p-playseries .play").addClass("castPlayer")) : ($("#p-playseries .plays a").removeClass("castPlayer"), $("#p-playseries .play").removeClass("castPlayer"))
            }
        }
    })
}

function openTemporadas() {
    $(".menu-TEMPORADAS").show()
}

function clearSerie() {
    closeSlike(), $("#p-playseries .g-cast").hide(), $("#p-playseries .plays").hide().empty(), $("#p-playseries .play").show(), $("#p-playseries .category").empty(), $("#p-playseries .seekingk").hide(), $("#p-playseries .seekingk .bar span").css("width", "0%"), $("#p-playseries .seekingk .named").empty(), $("#p-playseries .seekingk .resta").empty(), $("#p-playseries .ratio-hd").css("background-image", "url()"), $("#p-playseries .name").empty(), $("#p-playseries .ano").empty(), $("#p-playseries .duracao").empty(), $("#p-playseries .sinopse").empty(), $("#p-playseries .elenco").empty(), $("#p-playseries .direcao").empty(), $("#p-playseries .generos").empty(), $("#p-playseries .idiomas span").hide(), $("#Frec").empty(), $("#p-playseries .recomendados").hide(), $("#p-playseries #current").val(0), $("#p-playseries #seek").val(0), $("#p-playseries .bky").hide()
}

function montaSerie(e) {
    if ($("#p-series .getCategory").hide(), 1 == checkInit()) var s = $("#getS-" + e),
        t = "#getS-" + e;
    else s = $("#getS"), t = "#getS";
    return s.empty().html('<div class="topload"></div>').fadeIn(), window.setTimeout(function() {
        $.post(getLink() + "/app-series.php", {
            token: breakToken(),
            accepts: breakDevice(),
            filter: e
        }, function(e) {
            if (0 < e.indexOf("trigger")) notFound();
            else {
                var a;
                if (0 == (a = $.parseJSON(e)).result && notFound(), (a = $.parseJSON(e)).deslog) return void deslogg();
                if (s.empty(), a.top) {
                    s.append('<div class="topDestaque owl-carousel netflix-top"></div>'), jQuery.each(a.top, function(e, a) {
                        if (a.lista) var s = '<a data-action="del" href="javascript:addSlist(' + a.id + ');" class="myList" id="FavSerie-' + a.id + '"><i><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 26 26" enable-background="new 0 0 26 26"> <path d="m.3,14c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.4-0.4 1-0.4 1.4,0l.1,.1 5.5,5.9c0.2,0.2 0.5,0.2 0.7,0l13.4-13.9h0.1v-8.88178e-16c0.4-0.4 1-0.4 1.4,0l1.4,1.4c0.4,0.4 0.4,1 0,1.4l0,0-16,16.6c-0.2,0.2-0.4,0.3-0.7,0.3-0.3,0-0.5-0.1-0.7-0.3l-7.8-8.4-.2-.3z"></path></svg></i>Minha lista</a>';
                        else s = '<a data-action="add" href="javascript:addSlist(' + a.id + ');" class="myList" id="FavSerie-' + a.id + '"><i><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 357 357" style="enable-background:new 0 0 357 357;" xml:space="preserve"><path d="M357,204H204v153h-51V204H0v-51h153V0h51v153h153V204z"></path></svg></i>Minha lista</a>';
                        $(t + " .topDestaque").append('<div class="out"><div class="rel"><div class="caption"><div class="one">' + a.name + '</div><div class="two">' + a.generos + '</div><div class="tre">' + s + '<a class="assist" href="#playSerie?' + a.id + '">Assistir</a><a href="#playSerie?' + a.id + '" class="myInfo"><i><svg xmlns="http://www.w3.org/2000/svg"  xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 437.6 437.6" style="enable-background:new 0 0 437.6 437.6;" xml:space="preserve" ><path d="M194,142.8c0.8,1.6,1.6,3.2,2.4,4.4c0.8,1.2,2,2.4,2.8,3.6c1.2,1.2,2.4,2.4,4,3.6c1.2,0.8,2.8,2,4.8,2.4     c1.6,0.8,3.2,1.2,5.2,1.6c2,0.4,3.6,0.4,5.2,0.4c1.6,0,3.6,0,5.2-0.4c1.6-0.4,3.2-0.8,4.4-1.6h0.4c1.6-0.8,3.2-1.6,4.8-2.8     c1.2-0.8,2.4-2,3.6-3.2l0.4-0.4c1.2-1.2,2-2.4,2.8-3.6s1.6-2.4,2-4c0-0.4,0-0.4,0.4-0.8c0.8-1.6,1.2-3.6,1.6-5.2     c0.4-1.6,0.4-3.6,0.4-5.2s0-3.6-0.4-5.2c-0.4-1.6-0.8-3.2-1.6-5.2c-1.2-2.8-2.8-5.2-4.8-7.2c-0.4-0.4-0.4-0.4-0.8-0.8     c-1.2-1.2-2.4-2-4-3.2c-1.6-0.8-2.8-1.6-4.4-2.4c-1.6-0.8-3.2-1.2-4.8-1.6c-2-0.4-3.6-0.4-5.2-0.4c-1.6,0-3.6,0-5.2,0.4     c-1.6,0.4-3.2,0.8-4.8,1.6H208c-1.6,0.8-3.2,1.6-4.4,2.4c-1.6,1.2-2.8,2-4,3.2c-1.2,1.2-2.4,2.4-3.2,3.6     c-0.8,1.2-1.6,2.8-2.4,4.4c-0.8,1.6-1.2,3.2-1.6,4.8c-0.4,2-0.4,3.6-0.4,5.2c0,1.6,0,3.6,0.4,5.2     C192.8,139.6,193.6,141.2,194,142.8z"></path><path d="M249.6,289.2h-9.2v-98c0-5.6-4.4-10.4-10.4-10.4h-42c-5.6,0-10.4,4.4-10.4,10.4v21.6c0,5.6,4.4,10.4,10.4,10.4h8.4v66.4     H188c-5.6,0-10.4,4.4-10.4,10.4v21.6c0,5.6,4.4,10.4,10.4,10.4h61.6c5.6,0,10.4-4.4,10.4-10.4V300     C260,294,255.2,289.2,249.6,289.2z"></path><path d="M218.8,0C98,0,0,98,0,218.8s98,218.8,218.8,218.8s218.8-98,218.8-218.8S339.6,0,218.8,0z M218.8,408.8     c-104.8,0-190-85.2-190-190s85.2-190,190-190s190,85.2,190,190S323.6,408.8,218.8,408.8z"></path></svg></i>Saiba mais</a></div></div><div class="background1"></div><img src="' + a.wall + '" /></div></div>')
                    })
                } else s.css("padding-top", "55px");
                a.series && ("melhores" == getUrl() ? (s.append('<div class="todasFilmes"><div>'), jQuery.each(a.series, function(i, e) {
                    $(t + " .todasFilmes").append('<div class="fields"><h1><span></span><b>' + e.name + '</b></h1><div class="list-items car-homer" id="fm-' + i + '"><div class="owl-carousel carter"></div></div><div>'), jQuery.each(e.loop, function(e, a) {
                        if (a.last) var s = "<h3>" + a.last + "</h3>";
                        else s = "";
                        $("#fm-" + i + " .carter").append('<a href="#playSerie?' + a.id + '" class="itemm"><div class="outline"></div><div class="img"><img class="lazyload" src="img/load-1.png" data-src="' + a.folder + '" /></div><div class="shad"></div><div class="caption"><h2>' + a.name + "</h2>" + s + "</div></a>")
                    })
                }), carter()) : (s.append('<div class="todasSeries"></div>'), $("#todasSeries").empty(), jQuery.each(a.series, function(e, a) {
                    JSON.stringify(a);
                    $(t + " .todasSeries").append('<a href="#playSerie?' + a.id + '" class="item-serie" style="background-image: url(' + a.wall + ');"><div class="shad"></div><div class="folder"><img class="lazyload" src="img/load-1.png" data-src="' + a.folder + '" /></div><div class="caption"><h2>' + limitt(a.name) + '</h2><div class="gty">Assista agora no Top Flix TV</div><div class="ctg">' + a.category + '</div><div class="temps"><i class="play"></i><span class="text">' + a.temporadas + '</span><i class="' + a.res + '">' + a.res + '</i><div class="clear"></div></div></div><div class="clear"></div></a>')
                }), s.append('<div class="clear"></div>')))
            }
            carHome(), netflixTop()
        })
    }, 700), !1
}

function getSinopse(e) {
    $("#prog-" + e + " .seta").hasClass("ss") ? ($(".category-progr .sinopse").slideUp(), $(".category-progr .seta").removeClass("ss")) : ($(".category-progr .sinopse").slideUp(), $(".category-progr .seta").removeClass("ss"), $("#prog-" + e + " .sinopse").slideDown(), $("#prog-" + e + " .seta").addClass("ss"))
}

function Testing() {
    getUrl(), atualView();
    $(".noneTV .preloadd").fadeIn(), $(".noneTV .testing").hide();
    $(".picEu").attr("data-access");
    $.post(getLink() + "/app-tv-teste.php", {
        token: breakToken(),
        accepts: breakDevice()
    }, function(e) {
        if ($(".noneTV .preloadd").hide(), $(".noneTV .testing").show(), 0 < e.indexOf("trigger")) minMessage("Ocorreu um erro, tente novamente!");
        else {
            var a = $.parseJSON(e);
            0 == a.result && openMessage(a.erro, "err"), a.result && (openMessage("Tudo certo seu teste foi ativado!", "ook"), window.setTimeout(function() {
                location.reload()
            }, 3e3))
        }
    })
}

function alterDay(e, a, s) {
    $(".progrloader").fadeIn(), $(".category-progr").hide();
    var i = a;
    $(".picEu").attr("data-access");
    $.post(getLink() + "/app-tv-prog.php", {
        token: breakToken(),
        accepts: breakDevice(),
        id: e,
        data: a,
        epg: s
    }, function(e) {
        0 < e.indexOf("trigger") && minMessage("Ocorreu um erro, tente novamente!");
        var a = $.parseJSON(e);
        if (0 == a.result && (minMessage("Programação indisponível!"), $(".progrloader").hide(), $(".category-progr").fadeIn()), a.prog) {
            $(".progrs a").removeClass("active"), $(".progrs a#data-" + i).addClass("active"), $(".category-progr").empty();
            var l = 0;
            jQuery.each(a.prog, function(e, a) {
                if (a.noww) {
                    l = a.id;
                    var s = "AGORA",
                        i = "horario now"
                } else s = a.hour, i = "horario";
                if (a.genero) var t = '<span class="category">' + a.genero + "</span>";
                else t = "";
                $(".category-progr").append('<li id="prog-' + a.id + '"><div class="data"><div onclick="getSinopse(' + a.id + ');" class="' + i + '">' + s + '</div><div class="programa" onclick="getSinopse(' + a.id + ');">' + a.name + '</div><div class="seta"><span>&nbsp;</span></div><div class="clear"></div><div class="sinopse"><div>' + t + '<span class="stars">' + a.rating + '</span><div class="clear"></div></div>' + a.sinopse + "</div></div></li>")
            }), 0 < l && ($("#prog-" + l).addClass("s"), $("#prog-" + l + " .seta").addClass("ss")), $(".progrloader").hide(), $(".category-progr").fadeIn()
        }
    })
}

function nfilterFilme(e) {
    $.post(getLink() + "/app-filmes-filter.php", {
        token: breakToken(),
        accepts: breakDevice(),
        filter: e
    }, function(e) {
        var a;
        if ((a = $.parseJSON(e)).data && (a = $.parseJSON(e)).data) {
            var s = a.data;
            $("#p-playfilmes a.bkk").attr("href", "#filmes?" + s.idcategoria);
            var i = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 475.099 475.099" style="enable-background:new 0 0 475.099 475.099;" xml:space="preserve"><path d="M442.829,265.532c9.328-14.089,13.986-29.598,13.986-46.538c0-19.607-7.225-36.637-21.687-51.117   c-14.469-14.465-31.601-21.696-51.394-21.696h-50.251c9.134-18.842,13.709-37.117,13.709-54.816c0-22.271-3.34-39.971-9.996-53.105   c-6.663-13.138-16.372-22.795-29.126-28.984C295.313,3.09,280.947,0,264.959,0c-9.712,0-18.274,3.521-25.697,10.566   c-8.183,7.993-14.084,18.274-17.699,30.837c-3.617,12.559-6.521,24.6-8.708,36.116c-2.187,11.515-5.569,19.652-10.135,24.41   c-9.329,10.088-19.511,22.273-30.551,36.547c-19.224,24.932-32.264,39.685-39.113,44.255H54.828   c-10.088,0-18.702,3.574-25.84,10.706c-7.135,7.139-10.705,15.752-10.705,25.841v182.723c0,10.089,3.566,18.699,10.705,25.838   c7.142,7.139,15.752,10.711,25.84,10.711h82.221c4.188,0,17.319,3.806,39.399,11.42c23.413,8.186,44.017,14.418,61.812,18.702   c17.797,4.284,35.832,6.427,54.106,6.427h26.545h10.284c26.836,0,48.438-7.666,64.809-22.99   c16.365-15.324,24.458-36.213,24.27-62.67c11.42-14.657,17.129-31.597,17.129-50.819c0-4.185-0.281-8.277-0.855-12.278   c7.23-12.748,10.854-26.453,10.854-41.11C445.399,278.379,444.544,271.809,442.829,265.532z M85.949,396.58   c-3.616,3.614-7.898,5.428-12.847,5.428c-4.95,0-9.233-1.813-12.85-5.428c-3.615-3.613-5.424-7.897-5.424-12.85   c0-4.948,1.805-9.229,5.424-12.847c3.621-3.617,7.9-5.425,12.85-5.425c4.949,0,9.231,1.808,12.847,5.425   c3.617,3.617,5.426,7.898,5.426,12.847C91.375,388.683,89.566,392.967,85.949,396.58z M414.145,242.419   c-4.093,8.754-9.186,13.227-15.276,13.415c2.854,3.237,5.235,7.762,7.139,13.562c1.902,5.807,2.847,11.087,2.847,15.848   c0,13.127-5.037,24.455-15.126,33.969c3.43,6.088,5.141,12.658,5.141,19.697c0,7.043-1.663,14.038-4.996,20.984   c-3.327,6.94-7.851,11.938-13.559,14.982c0.951,5.709,1.423,11.04,1.423,15.988c0,31.785-18.274,47.678-54.823,47.678h-34.536   c-24.94,0-57.483-6.943-97.648-20.841c-0.953-0.38-3.709-1.383-8.28-2.998s-7.948-2.806-10.138-3.565   c-2.19-0.767-5.518-1.861-9.994-3.285c-4.475-1.431-8.087-2.479-10.849-3.142c-2.758-0.664-5.901-1.283-9.419-1.855   c-3.52-0.571-6.519-0.855-8.993-0.855h-9.136V219.285h9.136c3.045,0,6.423-0.859,10.135-2.568c3.711-1.714,7.52-4.283,11.421-7.71   c3.903-3.427,7.564-6.805,10.992-10.138c3.427-3.33,7.233-7.517,11.422-12.559c4.187-5.046,7.47-9.089,9.851-12.135   c2.378-3.045,5.375-6.949,8.992-11.707c3.615-4.757,5.806-7.613,6.567-8.566c10.467-12.941,17.795-21.601,21.982-25.981   c7.804-8.182,13.466-18.603,16.987-31.261c3.525-12.66,6.427-24.604,8.703-35.832c2.282-11.229,5.903-19.321,10.858-24.27   c18.268,0,30.453,4.471,36.542,13.418c6.088,8.945,9.134,22.746,9.134,41.399c0,11.229-4.572,26.503-13.71,45.821   c-9.134,19.32-13.698,34.5-13.698,45.539h100.495c9.527,0,17.993,3.662,25.413,10.994c7.426,7.327,11.143,15.843,11.143,25.553   C420.284,225.943,418.237,233.653,414.145,242.419z"></path></svg>';
            $(".bty.like").attr("onClick", "chacgeFLike(" + s.id + ", 1)"), $(".bty.unlike").attr("onClick", "chacgeFLike(" + s.id + ", 2)"), 1 == s.votei ? ($("#p-playfilmes .global-votos i").html('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  x="0px" y="0px" viewBox="0 0 456.814 456.814" style="enable-background:new 0 0 456.814 456.814;" xml:space="preserve"><path d="M441.11,252.677c10.468-11.99,15.704-26.169,15.704-42.54c0-14.846-5.432-27.692-16.259-38.547    c-10.849-10.854-23.695-16.278-38.541-16.278h-79.082c0.76-2.664,1.522-4.948,2.282-6.851c0.753-1.903,1.811-3.999,3.138-6.283    c1.328-2.285,2.283-3.999,2.852-5.139c3.425-6.468,6.047-11.801,7.857-15.985c1.807-4.192,3.606-9.9,5.42-17.133    c1.811-7.229,2.711-14.465,2.711-21.698c0-4.566-0.055-8.281-0.145-11.134c-0.089-2.855-0.574-7.139-1.423-12.85    c-0.862-5.708-2.006-10.467-3.43-14.272c-1.43-3.806-3.716-8.092-6.851-12.847c-3.142-4.764-6.947-8.613-11.424-11.565    c-4.476-2.95-10.184-5.424-17.131-7.421c-6.954-1.999-14.801-2.998-23.562-2.998c-4.948,0-9.227,1.809-12.847,5.426    c-3.806,3.806-7.047,8.564-9.709,14.272c-2.666,5.711-4.523,10.66-5.571,14.849c-1.047,4.187-2.238,9.994-3.565,17.415    c-1.719,7.998-2.998,13.752-3.86,17.273c-0.855,3.521-2.525,8.136-4.997,13.845c-2.477,5.713-5.424,10.278-8.851,13.706    c-6.28,6.28-15.891,17.701-28.837,34.259c-9.329,12.18-18.94,23.695-28.837,34.545c-9.899,10.852-17.131,16.466-21.698,16.847    c-4.755,0.38-8.848,2.331-12.275,5.854c-3.427,3.521-5.14,7.662-5.14,12.419v183.01c0,4.949,1.807,9.182,5.424,12.703    c3.615,3.525,7.898,5.38,12.847,5.571c6.661,0.191,21.698,4.374,45.111,12.566c14.654,4.941,26.12,8.706,34.4,11.272    c8.278,2.566,19.849,5.328,34.684,8.282c14.849,2.949,28.551,4.428,41.11,4.428h4.855h21.7h10.276    c25.321-0.38,44.061-7.806,56.247-22.268c11.036-13.135,15.697-30.361,13.99-51.679c7.422-7.042,12.565-15.984,15.416-26.836    c3.231-11.604,3.231-22.74,0-33.397c8.754-11.611,12.847-24.649,12.272-39.115C445.395,268.286,443.971,261.055,441.11,252.677z"></path><path d="M100.5,191.864H18.276c-4.952,0-9.235,1.809-12.851,5.426C1.809,200.905,0,205.188,0,210.137v182.732    c0,4.942,1.809,9.227,5.426,12.847c3.619,3.611,7.902,5.421,12.851,5.421H100.5c4.948,0,9.229-1.81,12.847-5.421    c3.616-3.62,5.424-7.904,5.424-12.847V210.137c0-4.949-1.809-9.231-5.424-12.847C109.73,193.672,105.449,191.864,100.5,191.864z     M67.665,369.308c-3.616,3.521-7.898,5.281-12.847,5.281c-5.14,0-9.471-1.76-12.99-5.281c-3.521-3.521-5.281-7.85-5.281-12.99    c0-4.948,1.759-9.232,5.281-12.847c3.52-3.617,7.85-5.428,12.99-5.428c4.949,0,9.231,1.811,12.847,5.428    c3.617,3.614,5.426,7.898,5.426,12.847C73.091,361.458,71.286,365.786,67.665,369.308z"></path></svg>').addClass(s.gosto), $("#filmeVotar").attr("onClick", "removeFlike(" + s.id + ");")) : ($("#filmeVotar").attr("onClick", "overFlike();"), $("#p-playfilmes .global-votos i").html(i).addClass("like")), $("#p-playfilmes .bky").attr("data-cred", s.creditos), iconDown(s.id, 1, s.DownPagar, s.DownPago, s.Downdub, s.Downleg), s.Downdub ? $("#p-playfilmes .bky").attr("data-dub", s.Downdub).attr("data-qual", 1).attr("data-id", s.id) : $("#p-playfilmes .bky").attr("data-dub", "").attr("data-qual", "").attr("data-id", ""), s.Downleg ? $("#p-playfilmes .bky").attr("data-leg", s.Downleg).attr("data-qual", 1).attr("data-id", s.id) : $("#p-playfilmes .bky").attr("data-leg", "").attr("data-qual", "").attr("data-id", ""), $("#p-playfilmes .bhy .like").html(i), $("#p-playfilmes .bhy .unlike").html(i);
            var t = "";
            s.dub ? (t += "dub", s.dub, $("#p-playfilmes .idiomas .dub").show()) : $("#p-playfilmes .idiomas .dub").hide(), s.nac ? (t += "nac", s.nac, $("#p-playfilmes .idiomas .nac").show()) : $("#p-playfilmes .idiomas .nac").hide(), s.leg ? (t += "leg", s.leg, $("#p-playfilmes .idiomas .leg").show()) : $("#p-playfilmes .idiomas .leg").hide();
            var l = s.wall.replace("840&amp;", "840&");
            $("#p-playfilmes .global-share").attr("href", "javascript:openSharer('" + s.share + "', '" + s.name + "');"), s.lista ? ($("#p-playfilmes .global-lista").attr("data-action", "del").attr("href", "javascript:addFlist(" + s.id + ");"), $("#p-playfilmes .global-lista i").html('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 26 26" enable-background="new 0 0 26 26"> <path d="m.3,14c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.4-0.4 1-0.4 1.4,0l.1,.1 5.5,5.9c0.2,0.2 0.5,0.2 0.7,0l13.4-13.9h0.1v-8.88178e-16c0.4-0.4 1-0.4 1.4,0l1.4,1.4c0.4,0.4 0.4,1 0,1.4l0,0-16,16.6c-0.2,0.2-0.4,0.3-0.7,0.3-0.3,0-0.5-0.1-0.7-0.3l-7.8-8.4-.2-.3z"></path></svg>')) : ($("#p-playfilmes .global-lista").attr("data-action", "add").attr("href", "javascript:addFlist(" + s.id + ");"), $("#p-playfilmes .global-lista i").html('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 357 357" style="enable-background:new 0 0 357 357;" xml:space="preserve"><path d="M357,204H204v153h-51V204H0v-51h153V0h51v153h153V204z"></path></svg>')), s.trailer ? $("#p-playfilmes .global-trailer").show().attr("href", "javascript:trailer('" + s.trailer + "')") : $("#p-playfilmes .global-trailer").hide(), 0 < s.relevancia ? $("#p-playfilmes .votos").html(s.relevancia + "% Relevante").show() : $("#p-playfilmes .votos").empty().hide(), $("#p-playfilmes .ratio-hd").css("background-image", "url(" + l + ")"), $("#p-playfilmes .name").html(s.name), $("#p-playfilmes .category").html(s.category + "<i></i>"), $("#p-playfilmes .ano").html(s.ano), $("#p-playfilmes .duracao").html(s.duracao), $("#p-playfilmes .sinopse").html("<b>SINOPSE</b>" + limiter(s.sinopse, 140)), $("#p-playfilmes .elenco").html("<b>Elenco:</b> " + s.elenco), $("#p-playfilmes .direcao").html("<b>Direção:</b> " + s.direcao), $("#p-playfilmes .generos").html("<b>Gêneros:</b> " + s.category);
            var r = 0;
            if (a.resta && ($(".globalFilter .seeking").show(), $(".globalFilter .resta").html("Tempo restante " + a.resta), $(".globalFilter .bar span").css("width", a.seek + "%"), 0 < a.seeking && (r = a.seeking)), $("#Frec").empty().html('<div class="lister-car"></div>'), a.recomendados) {
                var o = 0;
                $("#p-playfilmes .recomendados").show(), jQuery.each(a.recomendados, function(e, a) {
                    ++o < 13 && $("#Frec .lister-car").append('<div class="pd"><a onClick="Ads2();" href="#playFilme?' + a.id + '" class="itemm"><div class="outline"></div><div class="img"><img class="lazyload" src="img/load-1.png" data-src="' + a.folder + '" /></div><div class="shad"></div><div class="captionn"><h2>' + a.name + "</h2></div></a></div>")
                }), $("#Frec .lister-car").append('<div class="clear"></div>'), lazyload()
            } else $("#p-playfilmes .recomendados").hide();
            if ("dubleg" == t) $("#p-playfilmes .play").attr("href", "javascript:FilmeOpt();"), $("#p-playfilmes .plays").hide().html('<a id="fDub" href="#">DUBLADO</a><a id="fLeg" href="#">LEGENDADO</a>'), $("#p-playfilmes #fDub").show().attr("href", "javascript:playPlayer('" + s.id + ",dub', '" + l + "', 'filme', '" + s.id + "', 'dub', '" + s.name + "', " + r + ");"), $("#p-playfilmes #fLeg").show().attr("href", "javascript:playPlayer('" + s.id + ",leg', '" + l + "', 'filme', '" + s.id + "', 'leg', '" + s.name + "', " + r + ");");
            else if ("nacleg" == t) $("#p-playfilmes .plays").hide().html('<a id="fNac" href="#">NACIONAL</a><a id="fLeg" href="#">LEGENDADO</a>'), $("#p-playfilmes #fNac").show().attr("href", "javascript:playPlayer('" + s.id + ",dub', '" + l + "', 'filme', '" + s.id + "', 'dub', '" + s.name + "', " + r + ");"), $("#p-playfilmes #fLeg").show().attr("href", "javascript:playPlayer('" + s.leg + ",leg', '" + l + "', 'filme', '" + s.id + "', 'leg', '" + s.name + "', " + r + ");"), $("#p-playfilmes .play").attr("href", "javascript:FilmeOpt();");
            else {
                var n = t.replace("nac", "dub"),
                    c = "dub";
                s.leg && (c = "leg"), $("#p-playfilmes .plays").empty(), $("#p-playfilmes .play").show().attr("href", "javascript:playPlayer('" + s.id + "," + c + "', '" + l + "', 'filme', '" + s.id + "', '" + n + "', '" + s.name + "', " + r + ");")
            }
            $("#p-playfilmes .plays").hide(), $("#p-playfilmes .play").show(), 1 == getCast() ? ($("#p-playfilmes .plays a").addClass("castPlayer"), $("#p-playfilmes .play").addClass("castPlayer")) : ($("#p-playfilmes .plays a").removeClass("castPlayer"), $("#p-playfilmes .play").removeClass("castPlayer"))
        }
    })
}

function filterFilme(e) {
    $.post(getLink() + "/app-filmes-filter.php", {
        token: breakToken(),
        accepts: breakDevice(),
        filter: e
    }, function(e) {
        var a;
        if (0 < e.indexOf("trigger")) notFound();
        else if (0 == (a = $.parseJSON(e)).result && notFound(), a.data && (0 == (a = $.parseJSON(e)).result && (minMessage("Esse titulo não está disponível!"), window.location.href = "#home"), a.data)) {
            window.setTimeout(function() {
                $("#p-filmes .getCategory").empty(), $("#p-playfilmes .globalOverlay").fadeOut(function() {
                    $("#p-playfilmes .globalFilter").show().addClass("bounceInDown2"), $("#p-playfilmes .minner-top").show(), $("#p-playfilmes .g-cast").show(), window.setTimeout(function() {
                        $("#p-playfilmes .globalFilter").removeClass("bounceInDown2")
                    }, 1e3)
                })
            }, 1e3);
            var s = a.data;
            $("#p-playfilmes a.bkk").attr("href", "#filmes?" + s.idcategoria);
            var i = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 475.099 475.099" style="enable-background:new 0 0 475.099 475.099;" xml:space="preserve"><path d="M442.829,265.532c9.328-14.089,13.986-29.598,13.986-46.538c0-19.607-7.225-36.637-21.687-51.117   c-14.469-14.465-31.601-21.696-51.394-21.696h-50.251c9.134-18.842,13.709-37.117,13.709-54.816c0-22.271-3.34-39.971-9.996-53.105   c-6.663-13.138-16.372-22.795-29.126-28.984C295.313,3.09,280.947,0,264.959,0c-9.712,0-18.274,3.521-25.697,10.566   c-8.183,7.993-14.084,18.274-17.699,30.837c-3.617,12.559-6.521,24.6-8.708,36.116c-2.187,11.515-5.569,19.652-10.135,24.41   c-9.329,10.088-19.511,22.273-30.551,36.547c-19.224,24.932-32.264,39.685-39.113,44.255H54.828   c-10.088,0-18.702,3.574-25.84,10.706c-7.135,7.139-10.705,15.752-10.705,25.841v182.723c0,10.089,3.566,18.699,10.705,25.838   c7.142,7.139,15.752,10.711,25.84,10.711h82.221c4.188,0,17.319,3.806,39.399,11.42c23.413,8.186,44.017,14.418,61.812,18.702   c17.797,4.284,35.832,6.427,54.106,6.427h26.545h10.284c26.836,0,48.438-7.666,64.809-22.99   c16.365-15.324,24.458-36.213,24.27-62.67c11.42-14.657,17.129-31.597,17.129-50.819c0-4.185-0.281-8.277-0.855-12.278   c7.23-12.748,10.854-26.453,10.854-41.11C445.399,278.379,444.544,271.809,442.829,265.532z M85.949,396.58   c-3.616,3.614-7.898,5.428-12.847,5.428c-4.95,0-9.233-1.813-12.85-5.428c-3.615-3.613-5.424-7.897-5.424-12.85   c0-4.948,1.805-9.229,5.424-12.847c3.621-3.617,7.9-5.425,12.85-5.425c4.949,0,9.231,1.808,12.847,5.425   c3.617,3.617,5.426,7.898,5.426,12.847C91.375,388.683,89.566,392.967,85.949,396.58z M414.145,242.419   c-4.093,8.754-9.186,13.227-15.276,13.415c2.854,3.237,5.235,7.762,7.139,13.562c1.902,5.807,2.847,11.087,2.847,15.848   c0,13.127-5.037,24.455-15.126,33.969c3.43,6.088,5.141,12.658,5.141,19.697c0,7.043-1.663,14.038-4.996,20.984   c-3.327,6.94-7.851,11.938-13.559,14.982c0.951,5.709,1.423,11.04,1.423,15.988c0,31.785-18.274,47.678-54.823,47.678h-34.536   c-24.94,0-57.483-6.943-97.648-20.841c-0.953-0.38-3.709-1.383-8.28-2.998s-7.948-2.806-10.138-3.565   c-2.19-0.767-5.518-1.861-9.994-3.285c-4.475-1.431-8.087-2.479-10.849-3.142c-2.758-0.664-5.901-1.283-9.419-1.855   c-3.52-0.571-6.519-0.855-8.993-0.855h-9.136V219.285h9.136c3.045,0,6.423-0.859,10.135-2.568c3.711-1.714,7.52-4.283,11.421-7.71   c3.903-3.427,7.564-6.805,10.992-10.138c3.427-3.33,7.233-7.517,11.422-12.559c4.187-5.046,7.47-9.089,9.851-12.135   c2.378-3.045,5.375-6.949,8.992-11.707c3.615-4.757,5.806-7.613,6.567-8.566c10.467-12.941,17.795-21.601,21.982-25.981   c7.804-8.182,13.466-18.603,16.987-31.261c3.525-12.66,6.427-24.604,8.703-35.832c2.282-11.229,5.903-19.321,10.858-24.27   c18.268,0,30.453,4.471,36.542,13.418c6.088,8.945,9.134,22.746,9.134,41.399c0,11.229-4.572,26.503-13.71,45.821   c-9.134,19.32-13.698,34.5-13.698,45.539h100.495c9.527,0,17.993,3.662,25.413,10.994c7.426,7.327,11.143,15.843,11.143,25.553   C420.284,225.943,418.237,233.653,414.145,242.419z"></path></svg>';
            $(".bty.like").attr("onClick", "chacgeFLike(" + s.id + ", 1)"), $(".bty.unlike").attr("onClick", "chacgeFLike(" + s.id + ", 2)"), 1 == s.votei ? ($("#p-playfilmes .global-votos i").html('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  x="0px" y="0px" viewBox="0 0 456.814 456.814" style="enable-background:new 0 0 456.814 456.814;" xml:space="preserve"><path d="M441.11,252.677c10.468-11.99,15.704-26.169,15.704-42.54c0-14.846-5.432-27.692-16.259-38.547    c-10.849-10.854-23.695-16.278-38.541-16.278h-79.082c0.76-2.664,1.522-4.948,2.282-6.851c0.753-1.903,1.811-3.999,3.138-6.283    c1.328-2.285,2.283-3.999,2.852-5.139c3.425-6.468,6.047-11.801,7.857-15.985c1.807-4.192,3.606-9.9,5.42-17.133    c1.811-7.229,2.711-14.465,2.711-21.698c0-4.566-0.055-8.281-0.145-11.134c-0.089-2.855-0.574-7.139-1.423-12.85    c-0.862-5.708-2.006-10.467-3.43-14.272c-1.43-3.806-3.716-8.092-6.851-12.847c-3.142-4.764-6.947-8.613-11.424-11.565    c-4.476-2.95-10.184-5.424-17.131-7.421c-6.954-1.999-14.801-2.998-23.562-2.998c-4.948,0-9.227,1.809-12.847,5.426    c-3.806,3.806-7.047,8.564-9.709,14.272c-2.666,5.711-4.523,10.66-5.571,14.849c-1.047,4.187-2.238,9.994-3.565,17.415    c-1.719,7.998-2.998,13.752-3.86,17.273c-0.855,3.521-2.525,8.136-4.997,13.845c-2.477,5.713-5.424,10.278-8.851,13.706    c-6.28,6.28-15.891,17.701-28.837,34.259c-9.329,12.18-18.94,23.695-28.837,34.545c-9.899,10.852-17.131,16.466-21.698,16.847    c-4.755,0.38-8.848,2.331-12.275,5.854c-3.427,3.521-5.14,7.662-5.14,12.419v183.01c0,4.949,1.807,9.182,5.424,12.703    c3.615,3.525,7.898,5.38,12.847,5.571c6.661,0.191,21.698,4.374,45.111,12.566c14.654,4.941,26.12,8.706,34.4,11.272    c8.278,2.566,19.849,5.328,34.684,8.282c14.849,2.949,28.551,4.428,41.11,4.428h4.855h21.7h10.276    c25.321-0.38,44.061-7.806,56.247-22.268c11.036-13.135,15.697-30.361,13.99-51.679c7.422-7.042,12.565-15.984,15.416-26.836    c3.231-11.604,3.231-22.74,0-33.397c8.754-11.611,12.847-24.649,12.272-39.115C445.395,268.286,443.971,261.055,441.11,252.677z"></path><path d="M100.5,191.864H18.276c-4.952,0-9.235,1.809-12.851,5.426C1.809,200.905,0,205.188,0,210.137v182.732    c0,4.942,1.809,9.227,5.426,12.847c3.619,3.611,7.902,5.421,12.851,5.421H100.5c4.948,0,9.229-1.81,12.847-5.421    c3.616-3.62,5.424-7.904,5.424-12.847V210.137c0-4.949-1.809-9.231-5.424-12.847C109.73,193.672,105.449,191.864,100.5,191.864z     M67.665,369.308c-3.616,3.521-7.898,5.281-12.847,5.281c-5.14,0-9.471-1.76-12.99-5.281c-3.521-3.521-5.281-7.85-5.281-12.99    c0-4.948,1.759-9.232,5.281-12.847c3.52-3.617,7.85-5.428,12.99-5.428c4.949,0,9.231,1.811,12.847,5.428    c3.617,3.614,5.426,7.898,5.426,12.847C73.091,361.458,71.286,365.786,67.665,369.308z"></path></svg>').addClass(s.gosto), $("#filmeVotar").attr("onClick", "removeFlike(" + s.id + ");")) : ($("#filmeVotar").attr("onClick", "overFlike();"), $("#p-playfilmes .global-votos i").html(i).addClass("like")), $("#p-playfilmes .bky").attr("data-cred", s.creditos), iconDown(s.id, 1, s.DownPagar, s.DownPago, s.Downdub, s.Downleg), $("#p-playfilmes .bhy .like").html(i), $("#p-playfilmes .bhy .unlike").html(i);
            var t = "";
            s.dub ? (t += "dub", s.dub, $("#p-playfilmes .idiomas .dub").show()) : $("#p-playfilmes .idiomas .dub").hide(), s.nac ? (t += "nac", s.nac, $("#p-playfilmes .idiomas .nac").show()) : $("#p-playfilmes .idiomas .nac").hide(), s.leg ? (t += "leg", s.leg, $("#p-playfilmes .idiomas .leg").show()) : $("#p-playfilmes .idiomas .leg").hide();
            var l = s.wall.replace("840&amp;", "840&");
            $("#p-playfilmes .global-share").attr("href", "javascript:openSharer('" + s.share + "', '" + s.name + "');"), s.lista ? ($("#p-playfilmes .global-lista").attr("data-action", "del").attr("href", "javascript:addFlist(" + s.id + ");"), $("#p-playfilmes .global-lista i").html('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 26 26" enable-background="new 0 0 26 26"> <path d="m.3,14c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.4-0.4 1-0.4 1.4,0l.1,.1 5.5,5.9c0.2,0.2 0.5,0.2 0.7,0l13.4-13.9h0.1v-8.88178e-16c0.4-0.4 1-0.4 1.4,0l1.4,1.4c0.4,0.4 0.4,1 0,1.4l0,0-16,16.6c-0.2,0.2-0.4,0.3-0.7,0.3-0.3,0-0.5-0.1-0.7-0.3l-7.8-8.4-.2-.3z"></path></svg>')) : ($("#p-playfilmes .global-lista").attr("data-action", "add").attr("href", "javascript:addFlist(" + s.id + ");"), $("#p-playfilmes .global-lista i").html('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 357 357" style="enable-background:new 0 0 357 357;" xml:space="preserve"><path d="M357,204H204v153h-51V204H0v-51h153V0h51v153h153V204z"></path></svg>')), s.trailer ? $("#p-playfilmes .global-trailer").show().attr("href", "javascript:trailer('" + s.trailer + "')") : $("#p-playfilmes .global-trailer").hide(), 0 < s.relevancia ? $("#p-playfilmes .votos").html(s.relevancia + "% Relevante").show() : $("#p-playfilmes .votos").empty().hide(), $("#p-playfilmes .ratio-hd").css("background-image", "url(" + l + ")"), $("#p-playfilmes .name").html(s.name), $("#p-playfilmes .category").html(s.category + "<i></i>"), $("#p-playfilmes .ano").html(s.ano), $("#p-playfilmes .duracao").html(s.duracao), $("#p-playfilmes .sinopse").html("<b>SINOPSE</b>" + limiter(s.sinopse, 140)), $("#p-playfilmes .elenco").html("<b>Elenco:</b> " + s.elenco), $("#p-playfilmes .direcao").html("<b>Direção:</b> " + s.direcao), $("#p-playfilmes .generos").html("<b>Gêneros:</b> " + s.category);
            var r = 0;
            if (a.resta && ($(".globalFilter .seeking").show(), $(".globalFilter .resta").html("Tempo restante " + a.resta), $(".globalFilter .bar span").css("width", a.seek + "%"), 0 < a.seeking && (r = a.seeking)), $("#Frec").empty().html('<div class="lister-car"></div>'), a.recomendados) {
                var o = 0;
                $("#p-playfilmes .recomendados").show(), jQuery.each(a.recomendados, function(e, a) {
                    ++o < 13 && $("#Frec .lister-car").append('<div class="pd"><a onClick="Ads2();" href="#playFilme?' + a.id + '" class="itemm"><div class="outline"></div><div class="img"><img class="lazyload" src="img/load-1.png" data-src="' + a.folder + '" /></div><div class="shad"></div><div class="captionn"><h2>' + a.name + "</h2></div></a></div>")
                }), $("#Frec .lister-car").append('<div class="clear"></div>'), lazyload()
            } else $("#p-playfilmes .recomendados").hide();
            if ("dubleg" == t) $("#p-playfilmes .play").attr("href", "javascript:FilmeOpt();"), $("#p-playfilmes .plays").hide().html('<a id="fDub" href="#">DUBLADO</a><a id="fLeg" href="#">LEGENDADO</a>'), $("#p-playfilmes #fDub").show().attr("href", "javascript:playPlayer('" + s.id + ",dub', '" + l + "', 'filme', '" + s.id + "', 'dub', '" + s.name + "', " + r + ");"), $("#p-playfilmes #fLeg").show().attr("href", "javascript:playPlayer('" + s.id + ",leg', '" + l + "', 'filme', '" + s.id + "', 'leg', '" + s.name + "', " + r + ");");
            else if ("nacleg" == t) $("#p-playfilmes .plays").hide().html('<a id="fNac" href="#">NACIONAL</a><a id="fLeg" href="#">LEGENDADO</a>'), $("#p-playfilmes #fNac").show().attr("href", "javascript:playPlayer('" + s.id + ",dub', '" + l + "', 'filme', '" + s.id + "', 'dub', '" + s.name + "', " + r + ");"), $("#p-playfilmes #fLeg").show().attr("href", "javascript:playPlayer('" + s.leg + ",leg', '" + l + "', 'filme', '" + s.id + "', 'leg', '" + s.name + "', " + r + ");"), $("#p-playfilmes .play").attr("href", "javascript:FilmeOpt();");
            else {
                var n = t.replace("nac", "dub"),
                    c = "dub";
                s.leg && (c = "leg"), $("#p-playfilmes .plays").empty(), $("#p-playfilmes .play").show().attr("href", "javascript:playPlayer('" + s.id + "," + c + "', '" + l + "', 'filme', '" + s.id + "', '" + n + "', '" + s.name + "', " + r + ");")
            }
            $("#p-playfilmes .plays").hide(), $("#p-playfilmes .play").show(), 1 == getCast() ? ($("#p-playfilmes .plays a").addClass("castPlayer"), $("#p-playfilmes .play").addClass("castPlayer")) : ($("#p-playfilmes .plays a").removeClass("castPlayer"), $("#p-playfilmes .play").removeClass("castPlayer"))
        }
    })
}

function FilmeOpt() {
    $("#p-playfilmes .play").hide(), $("#p-playfilmes .plays").fadeIn()
}

function SerieOpt() {
    $("#p-playseries .play").hide(), $("#p-playseries .plays").fadeIn()
}

function clearFilme() {
    closeFlike(), $("#p-playfilmes .g-cast").hide(), $("#p-playfilmes .plays").empty().hide(), $("#p-playfilmes .play").show().attr("href", ""), $(".globalFilter .seeking").hide(), $("#p-playfilmes .category").empty(), $(".globalFilter .bar span").css("width", "0%"), $("#p-playfilmes .ratio-hd").css("background-image", "url()"), $("#p-playfilmes .name").empty(), $("#p-playfilmes .ano").empty(), $("#p-playfilmes .duracao").empty(), $("#p-playfilmes .sinopse").empty(), $("#p-playfilmes .elenco").empty(), $("#p-playfilmes .direcao").empty(), $("#p-playfilmes .generos").empty(), $("#p-playfilmes .idiomas span").hide(), $("#Frec").empty(), $("#p-playfilmes .recomendados").hide(), $("#p-playfilmes .bky").hide()
}

function crediit() {
    $(".ovh").hide(), $(".ovh2").show(), AdVideo(), window.setTimeout(function() {
        $(".ovh").show(), $(".ovh2").hide()
    }, 1e4)
}

function montaFilme(e) {
    if ($("#p-filmes .getCategory").hide(), 1 == checkInit()) var s = $("#getF-" + e),
        i = "#getF-" + e;
    else s = $("#getF"), i = "#getF";
    return s.empty().html('<div class="topload"></div>').fadeIn(), window.setTimeout(function() {
        $.post(getLink() + "/app-filmes.php", {
            token: breakToken(),
            accepts: breakDevice(),
            filter: e
        }, function(e) {
            if (1 <= e.indexOf("errorb")) alert("error");
            else {
                var a = $.parseJSON(e);
                if ($(i + " .topload").fadeOut(), s.empty(), a.top) {
                    if (a.deslog) return void deslogg();
                    s.append('<div class="topDestaque owl-carousel netflix-top"></div>'), jQuery.each(a.top, function(e, a) {
                        if (a.lista) var s = '<a data-action="del" href="javascript:addFlist(' + a.id + ');" class="myList" id="FavFilme-' + a.id + '"><i><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 26 26" enable-background="new 0 0 26 26"> <path d="m.3,14c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.4-0.4 1-0.4 1.4,0l.1,.1 5.5,5.9c0.2,0.2 0.5,0.2 0.7,0l13.4-13.9h0.1v-8.88178e-16c0.4-0.4 1-0.4 1.4,0l1.4,1.4c0.4,0.4 0.4,1 0,1.4l0,0-16,16.6c-0.2,0.2-0.4,0.3-0.7,0.3-0.3,0-0.5-0.1-0.7-0.3l-7.8-8.4-.2-.3z"></path></svg></i>Minha lista</a>';
                        else s = '<a data-action="add" href="javascript:addFlist(' + a.id + ');" class="myList" id="FavFilme-' + a.id + '"><i><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 357 357" style="enable-background:new 0 0 357 357;" xml:space="preserve"><path d="M357,204H204v153h-51V204H0v-51h153V0h51v153h153V204z"></path></svg></i>Minha lista</a>';
                        $(i + " .topDestaque").append('<div class="out"><div class="rel"><div class="caption"><div class="one">' + a.name + '</div><div class="two">' + a.generos + '</div><div class="tre">' + s + '<a class="assist" href="#playFilme?' + a.id + '">Assistir</a><a href="#playFilme?' + a.id + '" class="myInfo"><i><svg xmlns="http://www.w3.org/2000/svg"  xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 437.6 437.6" style="enable-background:new 0 0 437.6 437.6;" xml:space="preserve" ><path d="M194,142.8c0.8,1.6,1.6,3.2,2.4,4.4c0.8,1.2,2,2.4,2.8,3.6c1.2,1.2,2.4,2.4,4,3.6c1.2,0.8,2.8,2,4.8,2.4     c1.6,0.8,3.2,1.2,5.2,1.6c2,0.4,3.6,0.4,5.2,0.4c1.6,0,3.6,0,5.2-0.4c1.6-0.4,3.2-0.8,4.4-1.6h0.4c1.6-0.8,3.2-1.6,4.8-2.8     c1.2-0.8,2.4-2,3.6-3.2l0.4-0.4c1.2-1.2,2-2.4,2.8-3.6s1.6-2.4,2-4c0-0.4,0-0.4,0.4-0.8c0.8-1.6,1.2-3.6,1.6-5.2     c0.4-1.6,0.4-3.6,0.4-5.2s0-3.6-0.4-5.2c-0.4-1.6-0.8-3.2-1.6-5.2c-1.2-2.8-2.8-5.2-4.8-7.2c-0.4-0.4-0.4-0.4-0.8-0.8     c-1.2-1.2-2.4-2-4-3.2c-1.6-0.8-2.8-1.6-4.4-2.4c-1.6-0.8-3.2-1.2-4.8-1.6c-2-0.4-3.6-0.4-5.2-0.4c-1.6,0-3.6,0-5.2,0.4     c-1.6,0.4-3.2,0.8-4.8,1.6H208c-1.6,0.8-3.2,1.6-4.4,2.4c-1.6,1.2-2.8,2-4,3.2c-1.2,1.2-2.4,2.4-3.2,3.6     c-0.8,1.2-1.6,2.8-2.4,4.4c-0.8,1.6-1.2,3.2-1.6,4.8c-0.4,2-0.4,3.6-0.4,5.2c0,1.6,0,3.6,0.4,5.2     C192.8,139.6,193.6,141.2,194,142.8z"></path><path d="M249.6,289.2h-9.2v-98c0-5.6-4.4-10.4-10.4-10.4h-42c-5.6,0-10.4,4.4-10.4,10.4v21.6c0,5.6,4.4,10.4,10.4,10.4h8.4v66.4     H188c-5.6,0-10.4,4.4-10.4,10.4v21.6c0,5.6,4.4,10.4,10.4,10.4h61.6c5.6,0,10.4-4.4,10.4-10.4V300     C260,294,255.2,289.2,249.6,289.2z"></path><path d="M218.8,0C98,0,0,98,0,218.8s98,218.8,218.8,218.8s218.8-98,218.8-218.8S339.6,0,218.8,0z M218.8,408.8     c-104.8,0-190-85.2-190-190s85.2-190,190-190s190,85.2,190,190S323.6,408.8,218.8,408.8z"></path></svg></i>Saiba mais</a></div></div><div class="background1"></div><img src="' + a.wall + '" /></div></div>')
                    })
                } else s.css("padding-top", "55px");
                s.append('<div class="todasFilmes"><div>'), jQuery.each(a, function(s, e) {
                    "top" == s || ($(i + " .todasFilmes").append('<div class="fields"><h1><span></span><b>' + e.name + '</b></h1><div class="list-items" id="fm-' + s + '"><div class="owl-carousel lister-home"></div></div><div>'), jQuery.each(e.loop, function(e, a) {
                        $("#fm-" + s + " .lister-home").append('<a href="#playFilme?' + a.id + '" class="itemm"><div class="outline"></div><div class="img"><img class="lazyload" src="img/load-1.png" data-src="' + a.folder + '" /></div><div class="shad"></div><div class="caption"><h2>' + a.name + "</h2></div></a>")
                    }))
                })
            }
            carHome(), netflixTop()
        })
    }, 700), !1
}

function notResult() {
    $("#b-um").hide(), $("#bfilmes1").empty(), $("#b-dois").hide(), $("#bfilmes2").empty(), $("#b-tres").hide(), $("#bfilmes3").empty(), $("#dd-one").empty(), $("#dd-two").empty(), $("#dd-tre").empty(), $("#sNot").hide(), $("#p-buscar .search-preloader").hide()
}

function qbusca() {
    var e = $("#s").val();
    return 1 < e.length ? (notResult(), $(".sugestion").hide(), $(".result-search").hide(), $("#p-buscar .search-preloader").show(), $.post(getLink() + "/app-busca.php", {
        token: breakToken(),
        accepts: breakDevice(),
        q: e
    }, function(e) {
        var a = $.parseJSON(e);
        if ($("#p-buscar .search-preloader").hide(), 0 < a.TotalBusca) {
            if ($(".result-search").show(), 0 < a.TotalFilmes) {
                var s = "resultado";
                if (1 < a.TotalFilmes) s = "resultados";
                $("#dd-one").html(a.TotalFilmes + " " + s), $("#b-um").show(), $("#bfilmes1").html('<div class="owl-carousel lister-home"></div>'), jQuery.each(a.Filmes, function(e, a) {
                    $("#bfilmes1 .lister-home").append('<a href="#playFilme?' + a.id + '" class="itemm"><div class="outline"></div><div class="img"><img class="lazyload" src="img/load-1.png" data-src="' + a.folder + '" /></div><div class="shad"></div><div class="caption"><h2>' + a.name + "</h2></div></a>")
                })
            }
            if (0 < a.TotalSeries) {
                s = "resultado";
                if (1 < a.TotalSeries) s = "resultados";
                $("#dd-two").html(a.TotalSeries + " " + s), $("#b-dois").show(), $("#bfilmes2").html('<div class="owl-carousel lister-home"></div>'), jQuery.each(a.Series, function(e, a) {
                    $("#bfilmes2 .lister-home").append('<a href="' + a.link + '" class="itemm"><div class="outline"></div><div class="img"><img class="lazyload" src="img/load-1.png" data-src="' + a.folder + '" /></div><div class="shad"></div><div class="caption"><h2>' + a.name + "</h2></div></a>")
                })
            }
            if (0 < a.TotalTv) {
                s = "resultado";
                if (1 < a.TotalTv) s = "resultados";
                $("#dd-tre").html(a.TotalTv + " " + s), $("#b-tres").show(), $("#bfilmes3").html('<div class="owl-carousel car-tv lister-tv nopad"></div>'), jQuery.each(a.Tv, function(e, a) {
                    $("#bfilmes3 .lister-tv").append('<a href="#playTv?' + a.id + '" class="line-tv nowCanal" data-id="' + a.idNet + '"><div class="img"><img class="lazyload" src="img/load-2.png" data-src="' + a.wall + '"/></div><div class="shadder"></div><div class="logo" style="background-image: url(' + a.folder + ');">&nbsp;</div><div class="caption"><h1>' + a.name + '</h1><div class="now-' + a.idNet + ' pp none ">Carregando Programação</div></div></a>')
                }), carHome4(), getArrayAgora()
            }
            carHome()
        } else $(".sugestion").show()
    })) : ($("#p-buscar .search-preloader").hide(), $(".result-search").hide(), $(".sugestion").show()), !1
}

function playTv(e, l) {
    $("#p-playTv .plays").hide(), $("#p-playTv .play").show(), $("#exoplayer").attr("data-url", "").attr("data-name", "").attr("data-res", "").attr("data-logo", ""), 1 == getCast() || onTela(), $.post(getLink() + "/app-tv-play.php", {
        token: breakToken(),
        accepts: breakDevice(),
        filter: e,
        res: l
    }, function(e) {
        if (0 < e.indexOf("trigger")) notFound();
        else {
            var a = $.parseJSON(e);
            if (1 == getCast()) {
                var s = "",
                    i = a.filterCanal.iptv;
                1 == l && (s = i.SD), 2 == l && (s = i.HD), 3 == l && (s = i.FHD), 4 == l && (s = i.KK), window.plugins.socialsharing.shareVia("com.instantbits.cast.webvideo", null, null, null, s, function() {}, function(e) {
                    minMessage("Ocorreu um erro, verifique se o Web Video Cast está instalado!")
                })
            } else {
                s = "";
                var t = "";
                i = a.filterCanal.iptv;
                1 == l && (s = i.SD, t = "SD"), 2 == l && (s = i.HD, t = "HD"), 3 == l && (s = i.FHD, t = "FHD"), 4 == l && (s = i.KK, t = "4k"), $("#exoplayer").attr("data-url", s).attr("data-name", a.filterCanal.name).attr("data-res", t).attr("data-logo", a.filterCanal.folder).click()
            }
        }
    })
}

function TVopt() {
    $("#p-playTv .plays").show(), $("#p-playTv .play").hide()
}

function filterCanal(e) {
    $(".none-progr").hide(), $("#p-playTv .plays").empty().hide(), $.post(getLink() + "/app-tv-canal.php", {
        token: breakToken(),
        accepts: breakDevice(),
        filter: e
    }, function(e) {
        if (0 < e.indexOf("trigger")) notFound();
        else {
            $(".category-progr").empty(), $("#p-playTv .progrs").remove(), 0 < e.indexOf("trigger") && (minMessage("Ocorreu um erro, tente novamente!"), window.location.href = "#home");
            var a = $.parseJSON(e);
            if (0 == a.result && (minMessage("Esse canal não está disponível!"), window.location.href = "#home"), a.data) {
                a.data.config ? ($("#p-playTv .play").show().attr("href", "javascript:TVopt();"), a.data.iptv.SD && $("#p-playTv .plays").append('<a id="tSD" href="javascript:playTv(' + a.data.id + ', 1);">SD</a>'), a.data.iptv.HD && $("#p-playTv .plays").append('<a id="tHD" href="javascript:playTv(' + a.data.id + ', 2);">HD</a>'), a.data.iptv.FHD && $("#p-playTv .plays").append('<a id="tHD" href="javascript:playTv(' + a.data.id + ', 3);">FHD</a>'), a.data.iptv.KK && $("#p-playTv .plays").append('<a id="tKK" href="javascript:playTv(' + a.data.id + ', 4);">4K</a>')) : $("#p-playTv .play").show().attr("href", "javascript:noneTV();");
                var i = a.data;
                0 == i.epg ? ($(".inDts").hide(), $(".progrloader").hide(), $(".none-progr").show()) : ($(".category-progr").empty(), $("#p-playTv .progrs").remove(), $(".inDts").html('<div class="progrs owl-carousel"></div>').show(), jQuery.each(i.days, function(e, a) {
                    var s = "alterDay('" + i.id + "', '" + a.data + "', '" + i.epg + "')";
                    $("#p-playTv .progrs").append('<a id="data-' + a.data + '" href="javascript:' + s + '"><div class="sem">' + a.sem + '</div><div class="day">' + a.day + "</div></a>")
                }), $("#data-" + i.hoje).addClass("active"), carProgr()), window.setTimeout(function() {
                    $("#p-playTv .globalOverlay").fadeOut(function() {
                        $("#p-playTv .globalFilter").show().addClass("bounceInDown2"), $("#p-playTv .minner-top").show(), $("#p-playTv .g-cast").show(), window.setTimeout(function() {
                            $("#p-playTv .globalFilter").removeClass("bounceInDown2")
                        }, 1e3)
                    })
                }, 1e3);
                var s = i.wall.replace("840&amp;", "840&");
                if ($("#p-playTv .ratio-hd").css("background-image", "url(" + s + ")"), $("#p-playTv .name").html(i.name), a.prog) {
                    var l = 0;
                    jQuery.each(a.prog, function(e, a) {
                        if (a.noww) {
                            l = a.id;
                            var s = "AGORA",
                                i = "horario now"
                        } else s = a.hour, i = "horario";
                        if (a.genero) var t = '<span class="category">' + a.genero + "</span>";
                        else t = "";
                        $(".category-progr").append('<li id="prog-' + a.id + '"><div class="data"><div onclick="getSinopse(' + a.id + ');" class="' + i + '">' + s + '</div><div class="programa">' + a.name + '</div><div class="seta" onclick="getSinopse(' + a.id + ');"><span>&nbsp;</span></div><div class="clear"></div><div class="sinopse"><div>' + t + '<span class="stars">' + a.rating + '</span><div class="clear"></div></div>' + a.sinopse + "</div></div></li>")
                    }), 0 < l && ($("#prog-" + l).addClass("s"), $("#prog-" + l + " .seta").addClass("ss")), $(".progrloader").hide(), $(".category-progr").fadeIn()
                }
                1 == getCast() ? ($("#p-playTv .plays a").addClass("castPlayer"), $("#p-playTv .play").addClass("castPlayer")) : ($("#p-playTv .plays a").removeClass("castPlayer"), $("#p-playTv .play").removeClass("castPlayer"))
            }
        }
    })
}

function hideRes() {
    $(".player-res").fadeOut()
}

function closeNm() {
    $(".noneTV").show().removeClass("open"), $(".relt").animate({
        scrollTop: 0
    }, 600), $(".closer-none").hide()
}

function noneTV() {
    nPlanos(), $(".noneTV").show().addClass("open"), $(".closer-none").show()
}

function compMore() {
    var e = $(window).height();
    $(".relv").css("height", e + "px"), $(".noneTV .more").click(function() {
        $(".relt").animate({
            scrollTop: e
        }, 600)
    })
}

function montaTv(s) {
    $("#adultPinn").hide(), $("#p-tv .getCategory").hide();
    $(".picEu").attr("data-access");
    if (1 == checkInit()) var i = $("#getT-" + s),
        t = "#getT-" + s;
    else i = $("#getT"), t = "#getT";
    return i.empty().html('<div class="topload"></div>').fadeIn(), window.setTimeout(function() {
        $.post(getLink() + "/app-tv.php", {
            token: breakToken(),
            accepts: breakDevice(),
            filter: s
        }, function(e) {
            if (1 <= e.indexOf("errorb")) alert("error");
            else {
                var a = $.parseJSON(e);
                if ($(t + " .topload").fadeOut(), i.empty(), a.deslog) return void deslogg();
                if (i.html('<div class="lister-tv" style="padding-top:20px;"></div>'), jQuery.each(a.CategoryTv, function(e, a) {
                        $(t + " .lister-tv").append('<a href="#playTv?' + a.id + '" class="line-tv nowCanal" data-id="' + a.epg + '"><div class="img"><img class="lazyload" src="img/load-2.png" data-src="' + a.wall + '"/></div><div class="shadder"></div><div class="logo" style="background-image: url(' + a.folder + ');">&nbsp;</div><div class="caption"><h1>' + a.name + '</h1><div class="now-' + a.epg + ' pp none ">Carregando Programação</div></div></a>')
                    }), $(t + " .lister-tv").append('<div class="clear"></div>'), lazyload(), getArrayAgora(), 39 == s) 1 == $("#pin").attr("data-accept") || ($("#p-tv #getT-39").hide(), $("#adultPinn").show());
                else $("#adultPinn").hide()
            }
        })
    }, 700), !1
}

function getArrayAgora() {
    $(".picEu").attr("data-access");
    var a = new Array;
    $(".nowCanal").each(function(e) {
        "" == $(this).attr("data-id") || a.push($(this).attr("data-id"))
    }), a = a.toString(), $.post(getLink() + "/app-tv-now.php", {
        token: breakToken(),
        accepts: breakDevice(),
        id: a
    }, function(e) {
        var a = $.parseJSON(e);
        a.now && jQuery.each(a.now, function(e, a) {
            var s = "";
            a.genero && (s = "<i>" + a.genero + "</i>"), $(".now-" + a.id).empty().html(s + " " + a.inicio + " - " + a.fim + " <h2>" + a.name + "</h2>").removeClass("none").removeClass("no").show()
        })
    })
}
var inputQuantity = [];

function restMore() {
    $(".moreToggle").slideUp(), $(".lista-conta li a span").removeClass("nDesc"), $(".nDevi").hide().empty(), $(".AddDevice").hide(), $("#moreDevices .preload").show(), $("#moreDevices .nDevices").val(""), $("#moreDevices .subDevice").val("Ativar").removeAttr("disabled"), $("#morePerfil .preload").show(), $("#morePerfil .nPerf").hide(), $("#pass").val("")
}

function openMore(e) {
    var a = $("#a-" + e),
        s = $("#d-" + e);
    s.is(":visible") ? (s.slideUp(), a.removeClass("open")) : ($(".divMore .pagerr .desc").slideUp(), $(".divMore .pagerr .title").removeClass("open"), s.slideDown(), a.addClass("open"))
}

function getPerfil() {
    $.post(getLink() + "/app-user-perfil.php", {
        token: breakToken(),
        accepts: breakDevice()
    }, function(e) {
        var a = $.parseJSON(e);
        a.result && ($("#log").val(a.data.email), $("#gender").val(a.data.gender), $("#nome").val(a.data.nome), $("#morePerfil .preload").hide(), $("#morePerfil .nPerf").show())
    })
}

function moreDevices() {
    $.post(getLink() + "/app-user-devices.php", {
        token: breakToken(),
        accepts: breakDevice()
    }, function(e) {
        $(".AddDevice").show(), $("#moreDevices .preload").hide();
        var a = $.parseJSON(e);
        jQuery.each(a, function(e, a) {
            if (1 == e) 1 == a.remove ? $(".AddDevice").show() : $(".AddDevice").hide(), $(".nDevi").append('<div class="list-devices eu"><i>' + a.icon + '</i><div class="cap"><div class="name">' + a.marca + ": " + a.modelo + '</div><div class="bot">' + a.active + "</div></div></div>");
            else {
                var s = "";
                a.remove && (s = '<a href="javascript:removeDevice(' + a.remove + ');" class="remove">Remover</a>'), $(".nDevi").append('<div id="device-' + a.number + '" class="list-devices"><i>' + a.icon + '</i><div class="cap"><div class="name">' + a.marca + ": " + a.modelo + '</div><div class="bot">' + a.active + " " + s + "</div></div></div>")
            }
        }), $(".nDevi").show()
    })
}

function delAllH() {
    confirm("Você está prestes a remover o todo o seu Histórico?") && ($(".nAtiv").hide(), $("#moreAtividades .preload").show(), $.post(getLink() + "/app-user-perfil.php", {
        token: breakToken(),
        accepts: breakDevice(),
        delH: !0
    }, function(e) {
        $(".nAtiv").show(), $("#moreAtividades .preload").hide();
        var a = $.parseJSON(e);
        a.return ? (restMore(), minMessage("Seu histórico foi apagado!")) : a.error ? openMessage(a.error, "err") : openMessage("Ocorreu um erro, tente novamente!", "ook")
    }))
}

function delAllL() {
    if (confirm("Você está prestes a remover o toda o sua Lista?")) {
        $(".nAtiv").hide(), $("#moreAtividades .preload").show();
        $(".picEu").attr("data-access");
        $.post(getLink() + "/app-user-perfil.php", {
            token: breakToken(),
            accepts: breakDevice(),
            delL: !0
        }, function(e) {
            $(".nAtiv").show(), $("#moreAtividades .preload").hide();
            var a = $.parseJSON(e);
            a.return ? (restMore(), minMessage("Sua lista foi apagada!")) : a.error ? openMessage(a.error, "err") : openMessage("Ocorreu um erro, tente novamente!", "ook")
        })
    }
}

function perfilHistorico() {
    $(".topload3").show(), $("ul.historico").empty().hide(), $.post(getLink() + "/app-user-historico.php", {
        token: breakToken(),
        accepts: breakDevice(),
        type: "history"
    }, function(e) {
        var a = $.parseJSON(e);
        a.result ? (jQuery.each(a.result, function(e, a) {
            $("ul.historico").append('<li id="hist-' + a.qual + '"><div class="img"><a href="' + a.link + '"><img class="lazyload" src="img/load-4.png" data-src="' + a.wall + '" /></a><div class="bar"><span style="width:' + a.seek + '%;"></span></div></div><div class="caption"><div class="name">' + a.name + '</div><div class="ty"><span class="' + a.type + '">' + a.type + '</span><a href="javascript:delH(' + a.qual + ')">remover</a></div><div class="time">' + a.time + "</div></div></li>")
        }), lazyload()) : $("ul.historico").html('<div id="emptyH" class="nada-aqui"><div class="sv"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -12 512.00032 512"><path d="m455.074219 172.613281 53.996093-53.996093c2.226563-2.222657 3.273438-5.367188 2.828126-8.480469-.441407-3.113281-2.328126-5.839844-5.085938-7.355469l-64.914062-35.644531c-4.839844-2.65625-10.917969-.886719-13.578126 3.953125-2.65625 4.84375-.890624 10.921875 3.953126 13.578125l53.234374 29.230469-46.339843 46.335937-166.667969-91.519531 46.335938-46.335938 46.839843 25.722656c4.839844 2.65625 10.921875.890626 13.578125-3.953124 2.660156-4.839844.890625-10.921876-3.953125-13.578126l-53.417969-29.335937c-3.898437-2.140625-8.742187-1.449219-11.882812 1.695313l-54 54-54-54c-3.144531-3.144532-7.988281-3.832032-11.882812-1.695313l-184.929688 101.546875c-2.757812 1.515625-4.644531 4.238281-5.085938 7.355469-.445312 3.113281.601563 6.257812 2.828126 8.480469l53.996093 53.996093-53.996093 53.992188c-2.226563 2.226562-3.273438 5.367187-2.828126 8.484375.441407 3.113281 2.328126 5.839844 5.085938 7.351562l55.882812 30.6875v102.570313c0 3.652343 1.988282 7.011719 5.1875 8.769531l184.929688 101.542969c1.5.824219 3.15625 1.234375 4.8125 1.234375s3.3125-.410156 4.8125-1.234375l184.929688-101.542969c3.199218-1.757812 5.1875-5.117188 5.1875-8.769531v-102.570313l55.882812-30.683594c2.757812-1.515624 4.644531-4.242187 5.085938-7.355468.445312-3.113282-.601563-6.257813-2.828126-8.480469zm-199.074219 90.132813-164.152344-90.136719 164.152344-90.140625 164.152344 90.140625zm-62.832031-240.367188 46.332031 46.335938-166.667969 91.519531-46.335937-46.335937zm-120.328125 162.609375 166.667968 91.519531-46.339843 46.339844-166.671875-91.519531zm358.089844 184.796875-164.929688 90.5625v-102.222656c0-5.523438-4.476562-10-10-10s-10 4.476562-10 10v102.222656l-164.929688-90.5625v-85.671875l109.046876 59.878907c1.511718.828124 3.167968 1.234374 4.808593 1.234374 2.589844 0 5.152344-1.007812 7.074219-2.929687l54-54 54 54c1.921875 1.925781 4.484375 2.929687 7.074219 2.929687 1.640625 0 3.296875-.40625 4.808593-1.234374l109.046876-59.878907zm-112.09375-46.9375-46.339844-46.34375 166.667968-91.515625 46.34375 46.335938zm0 0"></path><path d="m404.800781 68.175781c2.628907 0 5.199219-1.070312 7.070313-2.933593 1.859375-1.859376 2.929687-4.4375 2.929687-7.066407 0-2.632812-1.070312-5.210937-2.929687-7.070312-1.859375-1.863281-4.441406-2.929688-7.070313-2.929688-2.640625 0-5.210937 1.066407-7.070312 2.929688-1.871094 1.859375-2.929688 4.4375-2.929688 7.070312 0 2.628907 1.058594 5.207031 2.929688 7.066407 1.859375 1.863281 4.441406 2.933593 7.070312 2.933593zm0 0" ></path><path d="m256 314.925781c-2.628906 0-5.210938 1.066407-7.070312 2.929688-1.859376 1.867187-2.929688 4.4375-2.929688 7.070312 0 2.636719 1.070312 5.207031 2.929688 7.078125 1.859374 1.859375 4.441406 2.921875 7.070312 2.921875s5.210938-1.0625 7.070312-2.921875c1.859376-1.871094 2.929688-4.441406 2.929688-7.078125 0-2.632812-1.070312-5.203125-2.929688-7.070312-1.859374-1.863281-4.441406-2.929688-7.070312-2.929688zm0 0"></path></svg></div><div class="nprim">Você ainda não assistiu nenhum conteúdo no Top Flix TV.</div><a href="#home" class="navicat">Navegar no Top Flix TV</a></div>'), $(".topload3").fadeOut(function() {
            $("ul.historico").fadeIn()
        })
    })
}

function perfilLista() {
    $(".topload2").show(), $("ul.listaa").empty().hide(), $.post(getLink() + "/app-user-historico.php", {
        token: breakToken(),
        accepts: breakDevice(),
        type: "lista"
    }, function(e) {
        var a = $.parseJSON(e);
        a.result ? (jQuery.each(a.result, function(e, a) {
            $("ul.listaa").append('<li id="list-' + a.qual + '"><div class="img"><div class="background1"></div><img class="lazyload" src="img/load-2.png" data-src="' + a.wall + '" /></div><div class="caption"><div class="poster"><a href="' + a.link + '"><img class="lazyload" src="img/load-1.png" data-src="' + a.image + '" /></a></div><div class="name">' + a.name + '</div><div class="last"><span class="' + a.type + '">' + a.type + "</span> " + a.time + '<a href="javascript:delL(' + a.qual + ');" class="act-del"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"x="0px" y="0px" viewBox="0 0 443 443" style="enable-background:new 0 0 443 443;" xml:space="preserve"><path d="M321.785,38h-83.384V0H125.169v38H41.785v60h280V38z M155.169,30h53.232v8h-53.232V30z"></path><path d="M295.142,214.31l5.66-86.31H62.769l19.016,290h114.172c-14.861-21.067-23.602-46.746-23.602-74.43   C172.355,274.43,226.849,217.779,295.142,214.31z"></path><path d="M301.785,244.141c-54.826,0-99.43,44.604-99.43,99.429S246.959,443,301.785,443s99.43-44.604,99.43-99.43   S356.611,244.141,301.785,244.141z M355.961,376.533l-21.213,21.213l-32.963-32.963l-32.963,32.963l-21.213-21.213l32.963-32.963   l-32.963-32.963l21.213-21.213l32.963,32.963l32.963-32.963l21.213,21.213l-32.963,32.963L355.961,376.533z" ></path></svg></a></div></div></li>')
        }), lazyload()) : $("ul.listaa").html('<div id="emptyH" class="nada-aqui"><div class="sv"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -12 512.00032 512"><path d="m455.074219 172.613281 53.996093-53.996093c2.226563-2.222657 3.273438-5.367188 2.828126-8.480469-.441407-3.113281-2.328126-5.839844-5.085938-7.355469l-64.914062-35.644531c-4.839844-2.65625-10.917969-.886719-13.578126 3.953125-2.65625 4.84375-.890624 10.921875 3.953126 13.578125l53.234374 29.230469-46.339843 46.335937-166.667969-91.519531 46.335938-46.335938 46.839843 25.722656c4.839844 2.65625 10.921875.890626 13.578125-3.953124 2.660156-4.839844.890625-10.921876-3.953125-13.578126l-53.417969-29.335937c-3.898437-2.140625-8.742187-1.449219-11.882812 1.695313l-54 54-54-54c-3.144531-3.144532-7.988281-3.832032-11.882812-1.695313l-184.929688 101.546875c-2.757812 1.515625-4.644531 4.238281-5.085938 7.355469-.445312 3.113281.601563 6.257812 2.828126 8.480469l53.996093 53.996093-53.996093 53.992188c-2.226563 2.226562-3.273438 5.367187-2.828126 8.484375.441407 3.113281 2.328126 5.839844 5.085938 7.351562l55.882812 30.6875v102.570313c0 3.652343 1.988282 7.011719 5.1875 8.769531l184.929688 101.542969c1.5.824219 3.15625 1.234375 4.8125 1.234375s3.3125-.410156 4.8125-1.234375l184.929688-101.542969c3.199218-1.757812 5.1875-5.117188 5.1875-8.769531v-102.570313l55.882812-30.683594c2.757812-1.515624 4.644531-4.242187 5.085938-7.355468.445312-3.113282-.601563-6.257813-2.828126-8.480469zm-199.074219 90.132813-164.152344-90.136719 164.152344-90.140625 164.152344 90.140625zm-62.832031-240.367188 46.332031 46.335938-166.667969 91.519531-46.335937-46.335937zm-120.328125 162.609375 166.667968 91.519531-46.339843 46.339844-166.671875-91.519531zm358.089844 184.796875-164.929688 90.5625v-102.222656c0-5.523438-4.476562-10-10-10s-10 4.476562-10 10v102.222656l-164.929688-90.5625v-85.671875l109.046876 59.878907c1.511718.828124 3.167968 1.234374 4.808593 1.234374 2.589844 0 5.152344-1.007812 7.074219-2.929687l54-54 54 54c1.921875 1.925781 4.484375 2.929687 7.074219 2.929687 1.640625 0 3.296875-.40625 4.808593-1.234374l109.046876-59.878907zm-112.09375-46.9375-46.339844-46.34375 166.667968-91.515625 46.34375 46.335938zm0 0"></path><path d="m404.800781 68.175781c2.628907 0 5.199219-1.070312 7.070313-2.933593 1.859375-1.859376 2.929687-4.4375 2.929687-7.066407 0-2.632812-1.070312-5.210937-2.929687-7.070312-1.859375-1.863281-4.441406-2.929688-7.070313-2.929688-2.640625 0-5.210937 1.066407-7.070312 2.929688-1.871094 1.859375-2.929688 4.4375-2.929688 7.070312 0 2.628907 1.058594 5.207031 2.929688 7.066407 1.859375 1.863281 4.441406 2.933593 7.070312 2.933593zm0 0" ></path><path d="m256 314.925781c-2.628906 0-5.210938 1.066407-7.070312 2.929688-1.859376 1.867187-2.929688 4.4375-2.929688 7.070312 0 2.636719 1.070312 5.207031 2.929688 7.078125 1.859374 1.859375 4.441406 2.921875 7.070312 2.921875s5.210938-1.0625 7.070312-2.921875c1.859376-1.871094 2.929688-4.441406 2.929688-7.078125 0-2.632812-1.070312-5.203125-2.929688-7.070312-1.859374-1.863281-4.441406-2.929688-7.070312-2.929688zm0 0"></path></svg></div><div class="nprim">Você não adicionou nenhum conteúdo do Top Flix TV na sua lista.</div><a href="#home" class="navicat">Navegar no Top Flix TV</a></div>'), $(".topload2").fadeOut(function() {
            $("ul.listaa").fadeIn()
        })
    })
}

function overFlike() {
    $(".globalFilter .linker").addClass("oo");
    var e = parseInt($("#p-playfilmes .linker").offset().top);
    e < 115 && ($("#p-playfilmes .bhy").addClass("bot"), $(".ratio-hd").hide()), e < 360 && $(".ratio-hd").hide(), $(".corp-apps").addClass("dis"), $(".noli").show(), $(".shadLike").show(), $(".hover-menu").show(), $("#p-playfilmes .linker a.nov i").hide(), $("#p-playfilmes .votar").fadeIn(), $("#p-playfilmes .linker a.nov").addClass("out")
}

function closeFlike() {
    $(".ratio-hd").show(), $(".globalFilter .linker").removeClass("oo"), $(".corp-apps").removeClass("dis"), $(".noli").hide(), $(".shadLike").hide(), $(".hover-menu").hide(), $("#p-playfilmes .linker a.nov i").show(), $("#p-playfilmes .linker a.nov").removeClass("out"), $("#p-playfilmes .votar").hide(), $("#p-playfilmes .bhy").removeClass("bot")
}

function removeFlike(e) {
    $(".picEu").attr("data-access");
    $("#filmeVotar").attr("onClick", "overFlike();"), $("#p-playfilmes .global-votos i").html('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 475.099 475.099" style="enable-background:new 0 0 475.099 475.099;" xml:space="preserve"><path d="M442.829,265.532c9.328-14.089,13.986-29.598,13.986-46.538c0-19.607-7.225-36.637-21.687-51.117   c-14.469-14.465-31.601-21.696-51.394-21.696h-50.251c9.134-18.842,13.709-37.117,13.709-54.816c0-22.271-3.34-39.971-9.996-53.105   c-6.663-13.138-16.372-22.795-29.126-28.984C295.313,3.09,280.947,0,264.959,0c-9.712,0-18.274,3.521-25.697,10.566   c-8.183,7.993-14.084,18.274-17.699,30.837c-3.617,12.559-6.521,24.6-8.708,36.116c-2.187,11.515-5.569,19.652-10.135,24.41   c-9.329,10.088-19.511,22.273-30.551,36.547c-19.224,24.932-32.264,39.685-39.113,44.255H54.828   c-10.088,0-18.702,3.574-25.84,10.706c-7.135,7.139-10.705,15.752-10.705,25.841v182.723c0,10.089,3.566,18.699,10.705,25.838   c7.142,7.139,15.752,10.711,25.84,10.711h82.221c4.188,0,17.319,3.806,39.399,11.42c23.413,8.186,44.017,14.418,61.812,18.702   c17.797,4.284,35.832,6.427,54.106,6.427h26.545h10.284c26.836,0,48.438-7.666,64.809-22.99   c16.365-15.324,24.458-36.213,24.27-62.67c11.42-14.657,17.129-31.597,17.129-50.819c0-4.185-0.281-8.277-0.855-12.278   c7.23-12.748,10.854-26.453,10.854-41.11C445.399,278.379,444.544,271.809,442.829,265.532z M85.949,396.58   c-3.616,3.614-7.898,5.428-12.847,5.428c-4.95,0-9.233-1.813-12.85-5.428c-3.615-3.613-5.424-7.897-5.424-12.85   c0-4.948,1.805-9.229,5.424-12.847c3.621-3.617,7.9-5.425,12.85-5.425c4.949,0,9.231,1.808,12.847,5.425   c3.617,3.617,5.426,7.898,5.426,12.847C91.375,388.683,89.566,392.967,85.949,396.58z M414.145,242.419   c-4.093,8.754-9.186,13.227-15.276,13.415c2.854,3.237,5.235,7.762,7.139,13.562c1.902,5.807,2.847,11.087,2.847,15.848   c0,13.127-5.037,24.455-15.126,33.969c3.43,6.088,5.141,12.658,5.141,19.697c0,7.043-1.663,14.038-4.996,20.984   c-3.327,6.94-7.851,11.938-13.559,14.982c0.951,5.709,1.423,11.04,1.423,15.988c0,31.785-18.274,47.678-54.823,47.678h-34.536   c-24.94,0-57.483-6.943-97.648-20.841c-0.953-0.38-3.709-1.383-8.28-2.998s-7.948-2.806-10.138-3.565   c-2.19-0.767-5.518-1.861-9.994-3.285c-4.475-1.431-8.087-2.479-10.849-3.142c-2.758-0.664-5.901-1.283-9.419-1.855   c-3.52-0.571-6.519-0.855-8.993-0.855h-9.136V219.285h9.136c3.045,0,6.423-0.859,10.135-2.568c3.711-1.714,7.52-4.283,11.421-7.71   c3.903-3.427,7.564-6.805,10.992-10.138c3.427-3.33,7.233-7.517,11.422-12.559c4.187-5.046,7.47-9.089,9.851-12.135   c2.378-3.045,5.375-6.949,8.992-11.707c3.615-4.757,5.806-7.613,6.567-8.566c10.467-12.941,17.795-21.601,21.982-25.981   c7.804-8.182,13.466-18.603,16.987-31.261c3.525-12.66,6.427-24.604,8.703-35.832c2.282-11.229,5.903-19.321,10.858-24.27   c18.268,0,30.453,4.471,36.542,13.418c6.088,8.945,9.134,22.746,9.134,41.399c0,11.229-4.572,26.503-13.71,45.821   c-9.134,19.32-13.698,34.5-13.698,45.539h100.495c9.527,0,17.993,3.662,25.413,10.994c7.426,7.327,11.143,15.843,11.143,25.553   C420.284,225.943,418.237,233.653,414.145,242.419z"></path></svg>').removeClass("unlike"), $.post(getLink() + "/app-user-like.php", {
        token: breakToken(),
        accepts: breakDevice(),
        filter: e,
        type: "remove",
        qual: 1
    }, function(e) {
        var a = $.parseJSON(e);
        0 < a.relevancia ? $("#p-playfilmes .votos").html(a.relevancia + "% Relevante").show() : $("#p-playfilmes .votos").empty().hide()
    })
}

function chacgeFLike(e, a) {
    if (1 == a) var s = "like";
    else s = "unlike";
    $("#p-playfilmes .global-votos i").html('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  x="0px" y="0px" viewBox="0 0 456.814 456.814" style="enable-background:new 0 0 456.814 456.814;" xml:space="preserve"><path d="M441.11,252.677c10.468-11.99,15.704-26.169,15.704-42.54c0-14.846-5.432-27.692-16.259-38.547    c-10.849-10.854-23.695-16.278-38.541-16.278h-79.082c0.76-2.664,1.522-4.948,2.282-6.851c0.753-1.903,1.811-3.999,3.138-6.283    c1.328-2.285,2.283-3.999,2.852-5.139c3.425-6.468,6.047-11.801,7.857-15.985c1.807-4.192,3.606-9.9,5.42-17.133    c1.811-7.229,2.711-14.465,2.711-21.698c0-4.566-0.055-8.281-0.145-11.134c-0.089-2.855-0.574-7.139-1.423-12.85    c-0.862-5.708-2.006-10.467-3.43-14.272c-1.43-3.806-3.716-8.092-6.851-12.847c-3.142-4.764-6.947-8.613-11.424-11.565    c-4.476-2.95-10.184-5.424-17.131-7.421c-6.954-1.999-14.801-2.998-23.562-2.998c-4.948,0-9.227,1.809-12.847,5.426    c-3.806,3.806-7.047,8.564-9.709,14.272c-2.666,5.711-4.523,10.66-5.571,14.849c-1.047,4.187-2.238,9.994-3.565,17.415    c-1.719,7.998-2.998,13.752-3.86,17.273c-0.855,3.521-2.525,8.136-4.997,13.845c-2.477,5.713-5.424,10.278-8.851,13.706    c-6.28,6.28-15.891,17.701-28.837,34.259c-9.329,12.18-18.94,23.695-28.837,34.545c-9.899,10.852-17.131,16.466-21.698,16.847    c-4.755,0.38-8.848,2.331-12.275,5.854c-3.427,3.521-5.14,7.662-5.14,12.419v183.01c0,4.949,1.807,9.182,5.424,12.703    c3.615,3.525,7.898,5.38,12.847,5.571c6.661,0.191,21.698,4.374,45.111,12.566c14.654,4.941,26.12,8.706,34.4,11.272    c8.278,2.566,19.849,5.328,34.684,8.282c14.849,2.949,28.551,4.428,41.11,4.428h4.855h21.7h10.276    c25.321-0.38,44.061-7.806,56.247-22.268c11.036-13.135,15.697-30.361,13.99-51.679c7.422-7.042,12.565-15.984,15.416-26.836    c3.231-11.604,3.231-22.74,0-33.397c8.754-11.611,12.847-24.649,12.272-39.115C445.395,268.286,443.971,261.055,441.11,252.677z"></path><path d="M100.5,191.864H18.276c-4.952,0-9.235,1.809-12.851,5.426C1.809,200.905,0,205.188,0,210.137v182.732    c0,4.942,1.809,9.227,5.426,12.847c3.619,3.611,7.902,5.421,12.851,5.421H100.5c4.948,0,9.229-1.81,12.847-5.421    c3.616-3.62,5.424-7.904,5.424-12.847V210.137c0-4.949-1.809-9.231-5.424-12.847C109.73,193.672,105.449,191.864,100.5,191.864z     M67.665,369.308c-3.616,3.521-7.898,5.281-12.847,5.281c-5.14,0-9.471-1.76-12.99-5.281c-3.521-3.521-5.281-7.85-5.281-12.99    c0-4.948,1.759-9.232,5.281-12.847c3.52-3.617,7.85-5.428,12.99-5.428c4.949,0,9.231,1.811,12.847,5.428    c3.617,3.614,5.426,7.898,5.426,12.847C73.091,361.458,71.286,365.786,67.665,369.308z"></path></svg>').addClass(s), $("#filmeVotar").attr("onClick", "javascript:removeFlike(" + e + ");");
    $(".picEu").attr("data-access");
    closeFlike(), $.post(getLink() + "/app-user-like.php", {
        token: breakToken(),
        accepts: breakDevice(),
        filter: e,
        type: a,
        qual: 1
    }, function(e) {
        var a = $.parseJSON(e);
        0 < a.relevancia ? $("#p-playfilmes .votos").html(a.relevancia + "% Relevante").show() : $("#p-playfilmes .votos").empty().hide()
    })
}

function baixarCast() {
    closeCcast(), external("https://play.google.com/store/apps/details?id=com.instantbits.cast.webvideo")
}
$(function() {
    $(".nDevice").each(function(e) {
        inputQuantity[e] = this.defaultValue, $(this).data("idx", e)
    }), $(".nDevice").on("keyup", function(e) {
        var a = $(this),
            s = this.value,
            i = parseInt(a.data("idx"), 10);
        this.validity && this.validity.badInput || isNaN(s) || a.is(":invalid") ? this.value = inputQuantity[i] : (s.length > Number(a.attr("maxlength")) && (s = s.slice(0, 5), a.val(s)), inputQuantity[i] = s)
    })
}), $(function() {
    $(".l-config").click(function() {
        $(".lista-conta li a span").removeClass("nDesc");
        var e = $(this).attr("data-lang"),
            a = $("#" + e);
        a.is(":visible") ? a.slideUp(function() {}) : (restMore(), a.slideDown(), "moreDevices" == e && ($("#morDevices").addClass("nDesc"), moreDevices()), "morePerfil" == e && ($("#morPerfil").addClass("nDesc"), getPerfil()), "moreSenha" == e && ($("#morSenha").addClass("nDesc"), $("#moreSenha .preload").hide(), $("#moreSenha .nSenh").show(), $("#pass1").val(""), $("#pass2").val(""), $("#pass3").val("")), "moreAtividades" == e && ($("#morAtividades").addClass("nDesc"), $("#moreAtividades .preload").hide(), $("#moreAtividades .nAtiv").show()), "morePlaylist" == e && $("#morPlaylist").addClass("nDesc"), "moreDisplay" == e && $("#morDisplay").addClass("nDesc"), "moreAlter" == e && $("#morAlter").addClass("nDesc"), "moreQuality" == e && $("#morQuality").addClass("nDesc"))
    })
});
var localCast = null;

function checkedCaster() {
    localCast = window.setInterval(function() {
        1 == $("#localcast").val() && ($(".cast2").hide(), $(".cast1").show(), clearInterval(localCast))
    }, 3e3)
}

function openCcast() {
    checkCast(), window.setTimeout(function() {
        1 == $("#localcast").val() ? ($(".cast2").hide(), $(".cast1").show()) : (checkedCaster(), $(".cast2").show(), $(".cast1").hide()), $(".over-cast").addClass("open"), $(".overlay-cast").fadeIn(), $(".g-cast").hide()
    }, 150)
}

function closeCcast() {
    clearInterval(localCast), $(".over-cast").removeClass("open"), $(".overlay-cast").fadeOut(), $(".g-cast").show()
}

function openCdown() {
    $(".over-down").addClass("open"), $(".overlay-down").fadeIn()
}

function closeCdown() {
    $(".over-down").removeClass("open"), $(".overlay-down").fadeOut()
}

function overSlike() {
    $(".globalFilter .linker").addClass("oo");
    var e = parseInt($("#p-playseries .linker").offset().top);
    e < 115 && $("#p-playseries .bhy").addClass("bot"), e < 360 && $(".ratio-hd").hide(), $(".corp-apps").addClass("dis"), $(".noli").show(), $(".shadLike").show(), $(".hover-menu").show(), $("#p-playseries .linker a.nov i").hide(), $("#p-playseries .votar").fadeIn(), $("#p-playseries .linker a.nov").addClass("out")
}

function closeSlike() {
    $(".ratio-hd").show(), $(".globalFilter .linker").removeClass("oo"), $(".corp-apps").removeClass("dis"), $(".noli").hide(), $("#p-playseries .shadLike").hide(), $(".hover-menu").hide(), $("#p-playseries .linker a.nov i").show(), $("#p-playseries .linker a.nov").removeClass("out"), $("#p-playseries .votar").hide(), $("#p-playseries .bhy").removeClass("bot")
}

function removeSlike(e) {
    $(".picEu").attr("data-access");
    $("#serieVotar").attr("onClick", "overSlike();"), $("#p-playseries .global-votos i").html('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 475.099 475.099" style="enable-background:new 0 0 475.099 475.099;" xml:space="preserve"><path d="M442.829,265.532c9.328-14.089,13.986-29.598,13.986-46.538c0-19.607-7.225-36.637-21.687-51.117   c-14.469-14.465-31.601-21.696-51.394-21.696h-50.251c9.134-18.842,13.709-37.117,13.709-54.816c0-22.271-3.34-39.971-9.996-53.105   c-6.663-13.138-16.372-22.795-29.126-28.984C295.313,3.09,280.947,0,264.959,0c-9.712,0-18.274,3.521-25.697,10.566   c-8.183,7.993-14.084,18.274-17.699,30.837c-3.617,12.559-6.521,24.6-8.708,36.116c-2.187,11.515-5.569,19.652-10.135,24.41   c-9.329,10.088-19.511,22.273-30.551,36.547c-19.224,24.932-32.264,39.685-39.113,44.255H54.828   c-10.088,0-18.702,3.574-25.84,10.706c-7.135,7.139-10.705,15.752-10.705,25.841v182.723c0,10.089,3.566,18.699,10.705,25.838   c7.142,7.139,15.752,10.711,25.84,10.711h82.221c4.188,0,17.319,3.806,39.399,11.42c23.413,8.186,44.017,14.418,61.812,18.702   c17.797,4.284,35.832,6.427,54.106,6.427h26.545h10.284c26.836,0,48.438-7.666,64.809-22.99   c16.365-15.324,24.458-36.213,24.27-62.67c11.42-14.657,17.129-31.597,17.129-50.819c0-4.185-0.281-8.277-0.855-12.278   c7.23-12.748,10.854-26.453,10.854-41.11C445.399,278.379,444.544,271.809,442.829,265.532z M85.949,396.58   c-3.616,3.614-7.898,5.428-12.847,5.428c-4.95,0-9.233-1.813-12.85-5.428c-3.615-3.613-5.424-7.897-5.424-12.85   c0-4.948,1.805-9.229,5.424-12.847c3.621-3.617,7.9-5.425,12.85-5.425c4.949,0,9.231,1.808,12.847,5.425   c3.617,3.617,5.426,7.898,5.426,12.847C91.375,388.683,89.566,392.967,85.949,396.58z M414.145,242.419   c-4.093,8.754-9.186,13.227-15.276,13.415c2.854,3.237,5.235,7.762,7.139,13.562c1.902,5.807,2.847,11.087,2.847,15.848   c0,13.127-5.037,24.455-15.126,33.969c3.43,6.088,5.141,12.658,5.141,19.697c0,7.043-1.663,14.038-4.996,20.984   c-3.327,6.94-7.851,11.938-13.559,14.982c0.951,5.709,1.423,11.04,1.423,15.988c0,31.785-18.274,47.678-54.823,47.678h-34.536   c-24.94,0-57.483-6.943-97.648-20.841c-0.953-0.38-3.709-1.383-8.28-2.998s-7.948-2.806-10.138-3.565   c-2.19-0.767-5.518-1.861-9.994-3.285c-4.475-1.431-8.087-2.479-10.849-3.142c-2.758-0.664-5.901-1.283-9.419-1.855   c-3.52-0.571-6.519-0.855-8.993-0.855h-9.136V219.285h9.136c3.045,0,6.423-0.859,10.135-2.568c3.711-1.714,7.52-4.283,11.421-7.71   c3.903-3.427,7.564-6.805,10.992-10.138c3.427-3.33,7.233-7.517,11.422-12.559c4.187-5.046,7.47-9.089,9.851-12.135   c2.378-3.045,5.375-6.949,8.992-11.707c3.615-4.757,5.806-7.613,6.567-8.566c10.467-12.941,17.795-21.601,21.982-25.981   c7.804-8.182,13.466-18.603,16.987-31.261c3.525-12.66,6.427-24.604,8.703-35.832c2.282-11.229,5.903-19.321,10.858-24.27   c18.268,0,30.453,4.471,36.542,13.418c6.088,8.945,9.134,22.746,9.134,41.399c0,11.229-4.572,26.503-13.71,45.821   c-9.134,19.32-13.698,34.5-13.698,45.539h100.495c9.527,0,17.993,3.662,25.413,10.994c7.426,7.327,11.143,15.843,11.143,25.553   C420.284,225.943,418.237,233.653,414.145,242.419z"></path></svg>').removeClass("unlike"), $.post(getLink() + "/app-user-like.php", {
        token: breakToken(),
        accepts: breakDevice(),
        filter: e,
        type: "remove",
        qual: 2
    }, function(e) {
        var a = $.parseJSON(e);
        0 < a.playseries ? $("#p-playfilmes .votos").html(a.relevancia + "% Relevante").show() : $("#p-playseries .votos").empty().hide()
    })
}

function getNovidades() {
    "" == $("ul.novidades").html() && $.post(getLink() + "/app-novidades.php", function(e) {
        var a = $.parseJSON(e);
        jQuery.each(a.data, function(e, a) {
            $("ul.novidades").append('<li><a href="' + a.direct + '"><i></i><span class="img"><img style="background-image: url(' + a.image + ');" src="img/nvd.png" /></span><h1>' + a.title + "</h1><h3>" + a.msg + "</h3><h2>" + a.timer + "</h2></a></li>")
        })
    })
}

function chacgeSLike(e, a) {
    if (1 == a) var s = "like";
    else s = "unlike";
    $("#p-playseries .global-votos i").html('<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"  x="0px" y="0px" viewBox="0 0 456.814 456.814" style="enable-background:new 0 0 456.814 456.814;" xml:space="preserve"><path d="M441.11,252.677c10.468-11.99,15.704-26.169,15.704-42.54c0-14.846-5.432-27.692-16.259-38.547    c-10.849-10.854-23.695-16.278-38.541-16.278h-79.082c0.76-2.664,1.522-4.948,2.282-6.851c0.753-1.903,1.811-3.999,3.138-6.283    c1.328-2.285,2.283-3.999,2.852-5.139c3.425-6.468,6.047-11.801,7.857-15.985c1.807-4.192,3.606-9.9,5.42-17.133    c1.811-7.229,2.711-14.465,2.711-21.698c0-4.566-0.055-8.281-0.145-11.134c-0.089-2.855-0.574-7.139-1.423-12.85    c-0.862-5.708-2.006-10.467-3.43-14.272c-1.43-3.806-3.716-8.092-6.851-12.847c-3.142-4.764-6.947-8.613-11.424-11.565    c-4.476-2.95-10.184-5.424-17.131-7.421c-6.954-1.999-14.801-2.998-23.562-2.998c-4.948,0-9.227,1.809-12.847,5.426    c-3.806,3.806-7.047,8.564-9.709,14.272c-2.666,5.711-4.523,10.66-5.571,14.849c-1.047,4.187-2.238,9.994-3.565,17.415    c-1.719,7.998-2.998,13.752-3.86,17.273c-0.855,3.521-2.525,8.136-4.997,13.845c-2.477,5.713-5.424,10.278-8.851,13.706    c-6.28,6.28-15.891,17.701-28.837,34.259c-9.329,12.18-18.94,23.695-28.837,34.545c-9.899,10.852-17.131,16.466-21.698,16.847    c-4.755,0.38-8.848,2.331-12.275,5.854c-3.427,3.521-5.14,7.662-5.14,12.419v183.01c0,4.949,1.807,9.182,5.424,12.703    c3.615,3.525,7.898,5.38,12.847,5.571c6.661,0.191,21.698,4.374,45.111,12.566c14.654,4.941,26.12,8.706,34.4,11.272    c8.278,2.566,19.849,5.328,34.684,8.282c14.849,2.949,28.551,4.428,41.11,4.428h4.855h21.7h10.276    c25.321-0.38,44.061-7.806,56.247-22.268c11.036-13.135,15.697-30.361,13.99-51.679c7.422-7.042,12.565-15.984,15.416-26.836    c3.231-11.604,3.231-22.74,0-33.397c8.754-11.611,12.847-24.649,12.272-39.115C445.395,268.286,443.971,261.055,441.11,252.677z"></path><path d="M100.5,191.864H18.276c-4.952,0-9.235,1.809-12.851,5.426C1.809,200.905,0,205.188,0,210.137v182.732    c0,4.942,1.809,9.227,5.426,12.847c3.619,3.611,7.902,5.421,12.851,5.421H100.5c4.948,0,9.229-1.81,12.847-5.421    c3.616-3.62,5.424-7.904,5.424-12.847V210.137c0-4.949-1.809-9.231-5.424-12.847C109.73,193.672,105.449,191.864,100.5,191.864z     M67.665,369.308c-3.616,3.521-7.898,5.281-12.847,5.281c-5.14,0-9.471-1.76-12.99-5.281c-3.521-3.521-5.281-7.85-5.281-12.99    c0-4.948,1.759-9.232,5.281-12.847c3.52-3.617,7.85-5.428,12.99-5.428c4.949,0,9.231,1.811,12.847,5.428    c3.617,3.614,5.426,7.898,5.426,12.847C73.091,361.458,71.286,365.786,67.665,369.308z"></path></svg>').addClass(s), $("#serieVotar").attr("onClick", "javascript:removeSlike(" + e + ");");
    $(".picEu").attr("data-access");
    closeSlike(), $.post(getLink() + "/app-user-like.php", {
        token: breakToken(),
        accepts: breakDevice(),
        filter: e,
        type: a,
        qual: 2
    }, function(e) {
        var a = $.parseJSON(e);
        0 < a.relevancia ? $("#p-playseries .votos").html(a.relevancia + "% Relevante").show() : $("#p-playseries .votos").empty().hide()
    })
}

function addSlist(e) {
    $(".picEu").attr("data-access");
    if (0 < $("#FavSerie-" + e).length) var a = $("#FavSerie-" + e),
        s = $("#FavSerie-" + e + " i");
    else a = $("#p-playseries .global-lista"), s = $("#p-playseries .global-lista i");
    var i = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 26 26" enable-background="new 0 0 26 26"> <path d="m.3,14c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.4-0.4 1-0.4 1.4,0l.1,.1 5.5,5.9c0.2,0.2 0.5,0.2 0.7,0l13.4-13.9h0.1v-8.88178e-16c0.4-0.4 1-0.4 1.4,0l1.4,1.4c0.4,0.4 0.4,1 0,1.4l0,0-16,16.6c-0.2,0.2-0.4,0.3-0.7,0.3-0.3,0-0.5-0.1-0.7-0.3l-7.8-8.4-.2-.3z"></path></svg>',
        t = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 357 357" style="enable-background:new 0 0 357 357;" xml:space="preserve"><path d="M357,204H204v153h-51V204H0v-51h153V0h51v153h153V204z"></path></svg>',
        l = a.attr("data-type");
    return "add" == l ? s.empty().html(i) : s.empty().html(t), $.post(getLink() + "/app-user-lista.php", {
        token: breakToken(),
        accepts: breakDevice(),
        type: 2,
        qual: e,
        update: 1
    }, function(e) {
        1 <= e.indexOf("error") ? (openMessage("Ocorreu um erro, tente novamente!", "err"), "add" == l ? s.empty().html(t) : s.empty().html(i)) : $.parseJSON(e).add ? (a.attr("data-action", "del"), s.empty().html(i), minMessage("Adicionado à Minha Lista.")) : (a.attr("data-action", "add"), s.empty().html(t))
    }), !1
}

function addFlist(e) {
    $(".picEu").attr("data-access");
    if (0 < $("#FavFilme-" + e).length) var a = $("#FavFilme-" + e),
        s = $("#FavFilme-" + e + " i");
    else a = $("#p-playfilmes .global-lista"), s = $("#p-playfilmes .global-lista i");
    var i = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 26 26" enable-background="new 0 0 26 26"> <path d="m.3,14c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.4-0.4 1-0.4 1.4,0l.1,.1 5.5,5.9c0.2,0.2 0.5,0.2 0.7,0l13.4-13.9h0.1v-8.88178e-16c0.4-0.4 1-0.4 1.4,0l1.4,1.4c0.4,0.4 0.4,1 0,1.4l0,0-16,16.6c-0.2,0.2-0.4,0.3-0.7,0.3-0.3,0-0.5-0.1-0.7-0.3l-7.8-8.4-.2-.3z"></path></svg>',
        t = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 357 357" style="enable-background:new 0 0 357 357;" xml:space="preserve"><path d="M357,204H204v153h-51V204H0v-51h153V0h51v153h153V204z"></path></svg>',
        l = a.attr("data-type");
    "add" == l ? s.empty().html(i) : s.empty().html(t), $.post(getLink() + "/app-user-lista.php", {
        token: breakToken(),
        accepts: breakDevice(),
        type: 1,
        qual: e,
        update: 1
    }, function(e) {
        1 <= e.indexOf("error") ? (openMessage("Ocorreu um erro, tente novamente!", "err"), "add" == l ? s.empty().html(t) : s.empty().html(i)) : $.parseJSON(e).add ? (a.attr("data-action", "del"), s.empty().html(i), minMessage("Adicionado à Minha Lista.")) : (a.attr("data-action", "add"), s.empty().html(t))
    })
}

function delL(a) {
    if (confirm("Remover da sua Lista?")) {
        $(".picEu").attr("data-access");
        $.post(getLink() + "/app-user-perfil.php", {
            token: breakToken(),
            accepts: breakDevice(),
            delLL: a
        }, function(e) {
            $.parseJSON(e).result ? $("#list-" + a).remove() : openMessage("Ocorreu um erro, tente novamente!", "err")
        })
    }
}

function delH(a) {
    if (confirm("Remover do seu Histórico?")) {
        $(".picEu").attr("data-access");
        $.post(getLink() + "/app-user-perfil.php", {
            token: breakToken(),
            accepts: breakDevice(),
            delHH: a
        }, function(e) {
            $.parseJSON(e).result ? $("#hist-" + a).remove() : openMessage("Ocorreu um erro, tente novamente!", "err")
        })
    }
}

function removeDevice(e) {
    confirm("Você está prestes a remover o dispositivo?") && $.post(getLink() + "/app-user-devices.php", {
        token: breakToken(),
        accepts: breakDevice(),
        nDeslog: e
    }, function(e) {
        var a = $.parseJSON(e);
        a.result ? $("#device-" + a.number).remove() : openMessage("Ocorreu um erro, tente novamente!", "err")
    })
}

function addDevice() {
    var e = $(".nDevice").val();
    "" == e ? ($(".nDevice").addClass("rubberBand"), window.setTimeout(function() {
        $(".nDevice").removeClass("rubberBand")
    }, 1e3)) : 6 != e.length ? ($(".nDevice").addClass("rubberBand"), window.setTimeout(function() {
        $(".nDevice").removeClass("rubberBand")
    }, 1e3)) : ($(".subDevice").attr("disabled", "disabled").val("Aguarde"), $.post(getLink() + "/app-user-devices.php", {
        token: breakToken(),
        accepts: breakDevice(),
        nAdd: e
    }, function(e) {
        $(".subDevice").removeAttr("disabled").val("Ativar");
        var a = $.parseJSON(e);
        a.result ? (moreDevices(), $(".nDevi").hide().empty(), $(".AddDevice").hide(), $("#moreDevices .preload").show(), $("#moreDevices .nDevices").val(""), $("#moreDevices .subDevice").val("Ativar").removeAttr("disabled")) : a.error ? openMessage(a.error, "err") : openMessage("Ocorreu um erro, tente novamente!", "err")
    }))
}

function nRem() {
    $.post(getLink() + "/app-user-devices.php", {
        token: breakToken(),
        accepts: breakDevice(),
        nRemov: !0
    }, function(e) {})
}

function editPerfil() {
    var e = $("#log").val(),
        a = $("#pass").val(),
        s = $("#gender").val(),
        i = $("#nome").val();
    $(".picEu").attr("data-access");
    return "" == i ? ($("#l-quatro").addClass("rubberBand"), $('#l-quatro input[type="text"]').addClass("err"), window.setTimeout(function() {
        $("#l-quatro").removeClass("rubberBand"), $('#l-quatro input[type="text"]').removeClass("err")
    }, 1e3)) : 1 == s ? ($("#l-cinco").addClass("rubberBand"), $("#l-cinco select").addClass("err"), window.setTimeout(function() {
        $("#l-cinco").removeClass("rubberBand"), $("#l-cinco select").removeClass("err")
    }, 1e3)) : "" == e ? ($("#l-seis").addClass("rubberBand"), $('#l-seis input[type="email"]').addClass("err"), window.setTimeout(function() {
        $("#l-seis").removeClass("rubberBand"), $('#l-seis input[type="email"]').removeClass("err")
    }, 1e3)) : "" == a ? ($("#l-sete").addClass("rubberBand"), $('#l-sete input[type="password"]').addClass("err"), window.setTimeout(function() {
        $("#l-sete").removeClass("rubberBand"), $('#l-sete input[type="password"]').removeClass("err")
    }, 1e3)) : ($(".subPerfil").attr("disabled", "disabled").val("Aguarde"), $.post(getLink() + "/app-user-perfil.php", {
        token: breakToken(),
        accepts: breakDevice(),
        login: e,
        pass: a,
        name: i,
        gender: s
    }, function(e) {
        $(".subPerfil").removeAttr("disabled").val("Editar conta");
        var a = $.parseJSON(e);
        a.return ? (restMore(), $("#nomeUser").html(a.name), $(".picEu").attr("src", getSite() + "/_storage/avatar/" + a.pic), "female" == a.gender ? ($("i#male").hide(), $("i#female").show()) : ($("i#male").show(), $("i#female").hide()), minMessage("Seu perfil foi atualizado"), restMore()) : a.error && openMessage(a.error, "err")
    })), !1
}

function editSenha() {
    var e = $("#pass1").val(),
        a = $("#pass2").val(),
        s = $("#pass3").val();
    $(".picEu").attr("data-access");
    return "" == e ? ($("#l-oito").addClass("rubberBand"), $('#l-oito input[type="password"]').addClass("err"), window.setTimeout(function() {
        $("#l-oito").removeClass("rubberBand"), $('#l-oito input[type="password"]').removeClass("err")
    }, 1e3)) : "" == a ? ($("#l-nove").addClass("rubberBand"), $('#l-nove input[type="password"]').addClass("err"), window.setTimeout(function() {
        $("#l-nove").removeClass("rubberBand"), $('#l-nove input[type="password"]').removeClass("err")
    }, 1e3)) : "" == s ? ($("#l-dez").addClass("rubberBand"), $('#l-dez input[type="password"]').addClass("err"), window.setTimeout(function() {
        $("#l-dez").removeClass("rubberBand"), $('#l-dez input[type="password"]').removeClass("err")
    }, 1e3)) : ($(".subSenha").attr("disabled", "disabled").val("Aguarde"), $.post(getLink() + "/app-user-perfil.php", {
        token: breakToken(),
        accepts: breakDevice(),
        pass: e,
        newPass: a,
        newPasss: s
    }, function(e) {
        $(".subSenha").removeAttr("disabled").val("Alterar senha");
        var a = $.parseJSON(e);
        a.return ? (restMore(), $("#pass1").val(""), $("#pass2").val(""), $("#pass3").val(""), minMessage("Sua senha foi alterada!")) : a.error && openMessage(a.error, "err")
    })), !1
}

function addPin() {
    var s = $("#pin1").val(),
        e = $("#pass5").val();
    $(".picEu").attr("data-access");
    return s.length < 4 ? ($("#l-vinte").addClass("rubberBand"), $('#l-vinte input[type="password"]').addClass("err"), window.setTimeout(function() {
        $("#l-vinte").removeClass("rubberBand"), $('#l-vinte input[type="password"]').removeClass("err")
    }, 1e3)) : "" == e ? ($("#l-vinteum").addClass("rubberBand"), $('#l-vinteum input[type="password"]').addClass("err"), window.setTimeout(function() {
        $("#l-vinteum").removeClass("rubberBand"), $('#l-vinteum input[type="password"]').removeClass("err")
    }, 1e3)) : ($(".subPin").attr("disabled", "disabled").val("Aguarde"), $.post(getLink() + "/app-user-perfil.php", {
        token: breakToken(),
        accepts: breakDevice(),
        pass: e,
        newPin: s
    }, function(e) {
        $(".subPin").removeAttr("disabled").val("Alterar PIN");
        var a = $.parseJSON(e);
        a.return ? ($("#pin").html(s), restMore(), $("#pin1").val(""), $("#pass5").val(""), minMessage("Seu pin foi alterado!")) : a.error && openMessage(a.error, "err")
    })), !1
}

function checkkPlan() {
    $("#descPlanos").hide(), $.post(getLink() + "/app-user-plano.php", {
        token: breakToken(),
        accepts: breakDevice()
    }, function(e) {
        if ($("#descPlanos").show(), json = $.parseJSON(e), $("#displayPlano").html(json.display), $(".descPlans .name").html("Plano " + json.display), $(".descPlans .desc").html(json.myPlano.desc), $("#planoUser").html("Plano " + json.display), Exe = json.active ? 1 : 0, $(".nCredit").html(json.myCredits), $(".nHist").html(json.myHist), $(".nList").html(json.myLista), classe = "", json.expires && (classe = "atual"), json.atWhats) {
            var a = "'" + json.atWhats + "'";
            $("#atWhats a").attr("href", "javascript:external(" + a + ")"), $("#atWhats").show()
        } else $("#atWhats").hide();
        if (json.playlist) {
            $("#playlist-corp").val(json.playlist);
            var s = "'" + json.playlist + "'";
            $(".playRR").attr("href", "javascript:external(" + s + ")")
        }
        if (json.active) var i = "Ativo até";
        else {
            i = "Expirou em";
            classe = "expirado"
        }
        if (json.expires) var t = '<div style="padding-top: 10px;">' + i + ": <b>" + json.expires + "</b></div>";
        else t = "";
        json.classe && (classe = json.classe), $("#moreDisplay").empty().html('<div class="a-plan ' + classe + '"><div class="name"><i><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 123.811 123.811" style="enable-background:new 0 0 123.811 123.811;" xml:space="preserve"><path d="M29.85,106.463c3.2,3.2,7.5,5,12,5s8.8-1.8,12-5l64.799-64.8c6.5-6.5,7-17.2,0.7-23.9c-6.6-7.1-17.7-7.2-24.399-0.4l-46,46   c-3.9,3.9-10.2,3.9-14.1,0l-5.9-6c-6.6-6.6-17.4-6.6-24,0c-6.6,6.601-6.6,17.4,0,24L29.85,106.463z"></path></svg></i><div>Plano Autal</div>Plano ' + json.myPlano.name + '</div><div class="desc">' + json.myPlano.desc + "." + t + "</div></div>"), $("#moreAlter").empty(), jQuery.each(json.planos, function(e, a) {
            if (json.myPlano.id == a.id) $("#moreAlter").append('<div class="a-plan ' + classe + '"><div class="name"><i><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 123.811 123.811" style="enable-background:new 0 0 123.811 123.811;" xml:space="preserve"><path d="M29.85,106.463c3.2,3.2,7.5,5,12,5s8.8-1.8,12-5l64.799-64.8c6.5-6.5,7-17.2,0.7-23.9c-6.6-7.1-17.7-7.2-24.399-0.4l-46,46   c-3.9,3.9-10.2,3.9-14.1,0l-5.9-6c-6.6-6.6-17.4-6.6-24,0c-6.6,6.601-6.6,17.4,0,24L29.85,106.463z"></path></svg></i><div>Plano Autal</div>Plano ' + a.name + '</div><div class="desc">' + a.desc + ". <span>R$ " + a.valor + "/mês</span></div></div>");
            else {
                var s = "'" + a.link + "'";
                s = s.replace("UID", json.userId), $("#moreAlter").append('<a href="javascript:external(' + s + ')" class="a-plan"><div class="name">Plano ' + a.name + '</div><div class="desc">' + a.desc + ". <span>R$ " + a.valor + "/mês</span></div></a>")
            }
        }), json.activated ? ($("#congif-plano").show(), $("#congif-m3u").show(), $("#r-adult").show()) : ($("#congif-plano").hide(), $("#congif-m3u").hide(), $("#r-adult").hide())
    })
}

function nPlanos() {
    $(".noneTV .list-planos").empty(), $.post(getLink() + "/app-user-plano.php", {
        token: breakToken(),
        accepts: breakDevice(),
        none: !0
    }, function(e) {
        $(".noneTV .more").show(), $(".noneTV .testing").show(), $(".noneTV .preloadd").hide(), json = $.parseJSON(e), $(".whats").attr("href", "javascript:external('" + json.FONELINK + "');"), $(".whats p").html(json.FONE.replace("+55 ", "")), json.counts && ($("#cc1").html(json.counts.sd), $("#cc2").html(json.counts.hd), $("#cc3").html(json.counts.fkd), $("#cc4").html(json.counts.ul)), jQuery.each(json.planos, function(e, a) {
            if (json.myPlano.id == a.id) $(".noneTV .list-planos").append('<div class="a-plan atual"><div class="name"><i><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 123.811 123.811" style="enable-background:new 0 0 123.811 123.811;" xml:space="preserve"><path d="M29.85,106.463c3.2,3.2,7.5,5,12,5s8.8-1.8,12-5l64.799-64.8c6.5-6.5,7-17.2,0.7-23.9c-6.6-7.1-17.7-7.2-24.399-0.4l-46,46   c-3.9,3.9-10.2,3.9-14.1,0l-5.9-6c-6.6-6.6-17.4-6.6-24,0c-6.6,6.601-6.6,17.4,0,24L29.85,106.463z"></path></svg></i><div>Plano Autal</div>Plano ' + a.name + '</div><div class="desc">' + a.desc + ". <span>R$ " + a.valor + "/mês</span></div></div>");
            else {
                var s = "'" + a.link + "'";
                s = s.replace("UID", json.userId), $(".noneTV .list-planos").append('<a href="javascript:external(' + s + ')" class="a-plan"><div class="name">Plano ' + a.name + '</div><div class="desc">' + a.desc + ". <span>R$ " + a.valor + "/mês</span></div></a>")
            }
        })
    })
}

function adtS() {
    var e = $("#ss").val();
    "" != e && $.post(getLink() + "/app-adults.php", {
        token: breakToken(),
        accepts: breakDevice(),
        s: e,
        filter: getUrl()
    }, function(e) {
        var a = $.parseJSON(e);
        a.CategoryZZZ ? ($("#ss").val(""), $(".list-adulter").empty(), jQuery.each(a.CategoryZZZ, function(e, a) {
            var s = a.name.replace("'", "");
            $(".list-adulter").append('<div class="f"><a class="f-adults" href="#"><div class="outline"></div><div class="img"><img  class="lazyload" src="img/load-1.png" data-src="' + a.wall + '" /></div><div class="shad"></div><div class="caption"><h2>' + s + '<br><i class="dur">' + a.duracao + "</i></h2></div></a></div>")
        }), lazyload(), $(".list-adulter").append('<div class="clear"></div>')) : minMessage("Nenhum video encontrado!")
    })
}

function getAdults2() {
    $("#ss").val("");
    var e = getUrl();
    $("#Z" + e).attr("data-name");
    $(".menu-categoria a").removeClass("active"), $("#Z" + e).addClass("active"), $("#adultPin").hide(), $("#adultPage").show(), $.post(getLink() + "/app-adults.php", {
        token: breakToken(),
        accepts: breakDevice(),
        filter: e
    }, function(e) {
        $(".list-adulter").empty(), json = $.parseJSON(e), jQuery.each(json.CategoryZZZ, function(e, a) {
            var s = a.name.replace("'", ""),
                i = "javascript:playPlayer('" + a.link + "', '', 'adult', '" + a.id + "', 'dub', '" + s + "', 0);";
            $(".list-adulter").append('<div class="f"><a class="f-adults" href="' + i + '"><div class="outline"></div><div class="img"><img  class="lazyload" src="img/load-1.png" data-src="' + a.wall + '" /></div><div class="shad"></div><div class="caption"><h2>' + s + '<br><i class="dur">' + a.duracao + "</i></h2></div></a></div>")
        }), lazyload(), $(".list-adulter").append('<div class="clear"></div>')
    })
}

function getAdults() {
    $("#ss").val("");
    var e = getUrl();
    $("#Z" + e).attr("data-name");
    $(".menu-categoria a").removeClass("active"), $("#Z" + e).addClass("active"), $("#adultPin").hide(), $("#adultPage").show(), $.post(getLink() + "/app-zzz.php", {
        token: breakToken(),
        accepts: breakDevice(),
        filter: e
    }, function(e) {
        $(".list-adulter").empty(), json = $.parseJSON(e), jQuery.each(json.CategoryZZZ, function(e, a) {
            var s = a.name.replace("'", "");
            s = "'" + s + "'";
            var i = "'" + a.wall + "'",
                t = JSON.stringify(a.config);
            a.link, a.id;
            $(".list-adulter").append('<div class="exib-sex" id="sex-' + a.id + '"><div class="img" id="se-' + a.id + '"><a href="javascript:red(' + a.id + ", " + s + ", " + i + ')"><img class="lazyload" data-src="' + a.wall + '" src="img/load-5.png"><img src="img/nn.png" class="nrel" /><div class="minute">' + a.duracao + '</div><span class="play"></span></a></div><div class="name">' + a.name + '</div><div style="display:none;" id="co-' + a.id + '">' + t + "</div></div>")
        }), lazyload(), $(".list-adulter").append('<div class="clear"></div>')
    })
}

function SeriesTaction(e) {
    $(".serieJson").empty(), $("#stt").empty(), $("#ssTempradas").empty();
    var a = $.parseJSON(e);
    jQuery.each(a, function(e, a) {
        0,
        $("#stt").append('<li id="cTp' + a.ordem + '"><a class="Upper" href="javascript:alterTSeries(' + a.ordem + ');">' + a.name + "</a></li>"),
        $("#ssTempradas").append('<ul id="t' + a.ordem + '" class="list-ep"></ul>')
    });
    var o = 0;
    jQuery.each(a, function(e, a) {
        0,
        o = a.ordem,
        jQuery.each(a.capitulos, function(e, a) {
            var s = JSON.stringify(a);
            $(".serieJson").append('<div id="sEP-' + a.id + '">' + s + "</div>");
            var i = "",
                t = "";
            if (a.dub && (i = '<span class="dub">DUB</span>'), a.leg && (t = '<span class="leg">LEG</span>'), a.result) var l = i + " " + t,
                r = "playCapSerie('" + a.id + "');";
            else l = '<span class="breve">EM BREVE</span>', r = "void(0);";
            $("#ssTempradas #t" + o).append('<li id="ep-' + a.id + '"><div class="img"><a href="javascript:' + r + '"><i></i><img class="lazyload" src="img/load-4.png" data-src="' + a.image + '"></a></div><div class="caption"><h2>' + a.tname + '</h2><div class="lang"><i class="duration">' + a.duracao + "</i>" + l + '</div></div><p class="ncp">' + limiter(a.name, 110) + "</p></li>")
        }),
        lazyload()
    }), 1 < $("#stt li").length ? $(".nTemp pre").show() : $(".nTemp pre").hide()
}

function CurrentSerieCap(e) {
    $("#currentserie").val(e)
}

function alterTSeries(e) {
    $(".nTemp div").html("TEMPORADA " + e), hideCategorias(), $("#ssTempradas .list-ep").hide().removeClass("show"), $("#ssTempradas #t" + e).show().addClass("show"), $(".menu-TEMPORADAS li a").removeClass("active"), $(".menu-TEMPORADAS #cTp" + e + " a").addClass("active")
}

function playNoContinue(e) {
    var a = $(".serieJson").attr("data-cover"),
        s = $("#sEP-" + e).html(),
        i = $.parseJSON(s),
        t = "";
    i.dub && (t += "dub", i.dub), i.nac && (t += "nac", i.nac), i.leg && (t += "leg", i.leg);
    var l = i.tituloTop,
        r = $("#p-playseries #seek").val(),
        o = $("#p-playseries #current").val();
    if (e == r) var n = o;
    else n = 0;
    if ("dubleg" == t) $("#p-playseries .play").attr("href", "javascript:SerieOpt();"), $("#p-playseries .plays").hide().html('<a id="fDub" href="#">DUBLADO</a><a id="fLeg" href="#">LEGENDADO</a>'), $("#p-playseries #fDub").show().attr("href", "javascript:CurrentSerieCap(" + i.id + "),playPlayer('" + i.serie + "," + i.id + ",dub', '" + a + "', 'serie', '" + i.serie + "', 'dub', '" + l + "', " + n + ")"), $("#p-playseries #fLeg").show().attr("href", "javascript:CurrentSerieCap(" + i.id + "),playPlayer('" + i.serie + "," + i.id + ",leg', 'serie', '" + i.serie + "', 'leg', '" + l + "', " + n + ")");
    else if ("nacleg" == t) $("#p-playseries .play").attr("href", "javascript:SerieOpt();"), $("#p-playseries .plays").hide().html('<a id="fNac" href="#">NACIONAL</a><a id="fLeg" href="#">LEGENDADO</a>'), $("#p-playseries #fNac").show().attr("href", "javascript:CurrentSerieCap(" + i.id + "),playPlayer('" + i.serie + "," + i.id + ",dub', '" + a + "', 'serie', '" + i.serie + "', 'dub', '" + l + "', " + n + ")"), $("#p-playseries #fLeg").show().attr("href", "javascript:CurrentSerieCap(" + i.id + "),playPlayer('" + i.serie + "," + i.id + ",leg', '" + a + "', 'serie', '" + i.serie + "', 'leg', '" + l + "', " + n + ")"), $("#p-playseries .play").attr("href", "javascript:SerieOpt();");
    else {
        var c = t.replace("nac", "dub"),
            p = "dub";
        i.leg && (p = "leg"), $("#p-playseries .plays").empty(), $("#p-playseries .play").show().attr("href", "javascript:CurrentSerieCap(" + i.id + "),playPlayer('" + i.serie + "," + i.id + "," + p + "', '" + a + "', 'serie', '" + i.serie + "', '" + c + "', '" + l + "', " + n + ")")
    }
    i.Castdub ? $("#cast-dub").html(i.Castdub) : $("#cast-dub").empty(), i.Castleg ? $("#cast-leg").html(i.Castleg) : $("#cast-leg").empty(), 1 == getCast() ? ($("#p-playseries .plays a").addClass("castPlayer"), $("#p-playseries .play").addClass("castPlayer")) : ($("#p-playseries .plays a").removeClass("castPlayer"), $("#p-playseries .play").removeClass("castPlayer"))
}

function iconDown(e, a, s, i, t, l) {
    if (2 == a) var r = $("#p-playseries .bky");
    else r = $("#p-playfilmes .bky");
    r.hide(), r.attr("data-qual", a).attr("data-id", e).attr("data-pagar", s).attr("data-pago", i), t ? r.attr("data-dub", !0) : r.attr("data-dub", "").show(), l ? r.attr("data-leg", !0) : r.attr("data-leg", "").show()
}

function playCapSerie(e) {
    $("#p-playseries .play").fadeIn(), $("#p-playseries .plays").hide();
    var a = $("#sEP-" + e).html(),
        s = $.parseJSON(a);
    $("#p-playseries .name").html(s.tituloTop), $(".corp-apps").animate({
        scrollTop: 0
    }, 600);
    var i = "";
    s.dub && (i += "dub", s.dub), s.nac && (i += "nac", s.nac), s.leg && (i += "leg", s.leg), iconDown(s.id, 2, s.DownPagar, s.DownPago, s.Downdub, s.Downleg);
    var t = s.tituloTop,
        l = $("#p-playseries #seek").val(),
        r = $("#p-playseries #current").val();
    if (e == l) {
        var o = r;
        $("#p-playseries .name").hide(), $("#p-playseries .seekingk").show()
    } else {
        $("#p-playseries .name").show(), $("#p-playseries .seekingk").hide();
        o = 0
    }
    var n = s.image.replace("amp;w", "w").replace("amp;h", "h");
    if ($("#p-playseries .ratio-hd").css("background-image", "url(" + n + ")"), "dubleg" == i) $("#p-playseries .play").attr("href", "javascript:SerieOpt();"), $("#p-playseries .plays").hide().html('<a id="fDub" href="#">DUBLADO</a><a id="fLeg" href="#">LEGENDADO</a>'), $("#p-playseries #fDub").show().attr("href", "javascript:CurrentSerieCap(" + s.id + "),playPlayer('" + s.serie + "," + s.id + ",dub', '" + n + "', 'serie', '" + s.serie + "', 'dub', '" + t + "', " + o + ")"), $("#p-playseries #fLeg").show().attr("href", "javascript:CurrentSerieCap(" + s.id + "),playPlayer('" + s.serie + "," + s.id + ",leg', 'serie', '" + s.serie + "', 'leg', '" + t + "', " + o + ")");
    else if ("nacleg" == i) $("#p-playseries .play").attr("href", "javascript:SerieOpt();"), $("#p-playseries .plays").hide().html('<a id="fNac" href="#">NACIONAL</a><a id="fLeg" href="#">LEGENDADO</a>'), $("#p-playseries #fNac").show().attr("href", "javascript:CurrentSerieCap(" + s.id + "),playPlayer('" + s.serie + "," + s.id + ",dub', '" + n + "', 'serie', '" + s.serie + "', 'dub', '" + t + "', " + o + ")"), $("#p-playseries #fLeg").show().attr("href", "javascript:CurrentSerieCap(" + s.id + "),playPlayer('" + s.serie + "," + s.id + ",leg', '" + n + "', 'serie', '" + s.serie + "', 'leg', '" + t + "', " + o + ")"), $("#p-playseries .play").attr("href", "javascript:SerieOpt();");
    else {
        var c = i.replace("nac", "dub"),
            p = "dub";
        s.leg && (p = "leg"), $("#p-playseries .plays").empty(), $("#p-playseries .play").show().attr("href", "javascript:CurrentSerieCap(" + s.id + "),playPlayer('" + s.serie + "," + s.id + "," + p + "', '" + n + "', 'serie', '" + s.serie + "', '" + c + "', '" + t + "', " + o + ")")
    }
    1 == getCast() ? ($("#p-playseries .plays a").addClass("castPlayer"), $("#p-playseries .play").addClass("castPlayer")) : ($("#p-playseries .plays a").removeClass("castPlayer"), $("#p-playseries .play").removeClass("castPlayer"))
}