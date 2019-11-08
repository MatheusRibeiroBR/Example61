function closeMessage() {
    $(".overAlerter").hide(), $(".alerter").fadeOut(function() {
        $(".alerter").removeClass("ook").removeClass("err")
    })
}

function openMessage(e, o) {
    $(".alerter .p p").empty().html(e), $(".overAlerter").show(), $(".alerter").addClass(o).fadeIn()
}

function redirectApp(e) {
    $(".pager.responsive").fadeOut(), $(".logo-top").fadeOut(), window.setTimeout(function() {
        $(".introduct").fadeIn(), $(".introduct .preload").show()
    }, 1e3), window.setTimeout(function() {
        window.location.href = e
    }, 2e3)
}

function fbLogin() {
    facebookConnectPlugin.login(["public_profile", "email"], function(e) {
        var n = e.authResponse.accessToken;
        facebookConnectPlugin.api("/me?fields=id,email,name,picture.width(720).height(720).as(picture_large)", ["public_profile", "email"], function(e) {
            var o = JSON.stringify(e);
            faceLogin(o, n)
        }, function(e) {
            4201 == e.errorCode || openMessage("Ocorreu um erro, tente novamente!", "err")
        })
    }, function(e) {
        4201 == e.errorCode || openMessage("Ocorreu um erro, tente novamente!", "err")
    })
}