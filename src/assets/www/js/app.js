function onDeviceReady() {
		setTimeout(function(){

				var DevOne = device.manufacturer;
				var DevTwo = device.model;
				var DevTre = 'null';
				var DevFor = device.uuid;
				var DevFiv = device.platform;
				var string = Base64.encode('One='+DevOne+'&Two='+DevTwo+'&Tre='+DevTre+'&For='+DevFor+'&Fiv='+DevFiv+'&Six='+getVersion()+'&Sev='+Base64.encode(navigator.userAgent));
				$('#string').html(string.replace('=', ''));
		},500);
		var notificationOpenedCallback = function(jsonData) {
	  		window.location.href='mobile.html'+jsonData.notification.payload.additionalData.trilhaID;
		};
		if($('#register').length>0){
			  window.plugins.OneSignal
				.startInit("3dadd6ec-86ce-4318-9094-221e8552cd8d")
				.handleNotificationOpened(notificationOpenedCallback)
				.inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
				.endInit();
			  setTimeout(function(){
				window.plugins.OneSignal.getPermissionSubscriptionState(function(status) {
				  status.subscriptionStatus.pushToken;
					var dv = device.uuid;
					$.post(getLink()+'/push.php', { device:dv, token: status.subscriptionStatus.pushToken });
				})
			  },5000);
		}
		initAd(); checkCast();
	var exoSuccess = function (json) {
		if ((json.eventKeycode == 'KEYCODE_BACK') && (json.eventAction == 'ACTION_DOWN')){
			ExoPlayer.stop();
			ExoPlayer.close();
			offTela();
			$('#exoplayer').attr('data-player', 0);
		}
	};
	var exoError = function (error) {
		offTela();
		$('#exoplayer').attr('data-player', 0);
		ExoPlayer.stop();
		ExoPlayer.close();
	};	
	$('#exoplayer').click(function(){
		$('.overlay-player').hide(); $('#playerShow').hide();
		$('#exoplayer').attr('data-player', 1);
		var link = $(this).attr('data-url');
		var name = $(this).attr('data-name');
		var res = $(this).attr('data-res');
		var logo = $(this).attr('data-logo');
		var params = {
			url: link,
			showBuffering: true,
			controller: {
				streamTitle: name,
				streamDescription: res,
				streamImage: logo
			}
		};
		onTela();
		window.ExoPlayer.show(params, exoSuccess, exoError);

	});
	document.addEventListener("pause", onPause, false);
	document.getElementById('showUnderUiButton').addEventListener('click', showUnderSystemUI);
	document.getElementById('showUiButton').addEventListener('click', showSystemUI);
}
document.addEventListener("deviceready", onDeviceReady, !1);
function onFull(){
	$('#showUnderUiButton').click();
}
function ofFull(){
	$('#showUiButton').click();
}
function showUnderSystemUI(){
	AndroidFullScreen.immersiveMode(fullFunction, full2Function);
}	
function showSystemUI(){
	AndroidFullScreen.showSystemUI(fullFunction, full2Function);
}
function fullFunction(){ }
function full2Function(error)	{ }
var admobid = {};
function onPause(){
	offTela();
	if($('#exoplayer').attr('data-player') == 1){
		ExoPlayer.stop();
		ExoPlayer.close();
		$('#exoplayer').attr('data-player', 0);
	}

}
function checkedToken(){
	var DevOne = device.manufacturer;
	var DevTwo = device.model;
	var DevTre = 'null';
	var DevFor = device.uuid; 
	var DevFiv = device.platform;
	var string = Base64.encode('One='+DevOne+'&Two='+DevTwo+'&Tre='+DevTre+'&For='+DevFor+'&Fiv='+DevFiv+'&Six='+getVersion()+'&Sev='+Base64.encode(navigator.userAgent));
	$('#string').html(string.replace('=', ''));
}
function checkCast() {
    appAvailability.check("com.instantbits.cast.webvideo", function() {
        $("#localcast").val(1)
    }, function() {
        $("#localcast").html(0)
    })
}
function initAd(){
    AdMob.getAdSettings(function(i) {}, function() {}), AdMob.setOptions({
        position: AdMob.AD_POSITION.BOTTOM_CENTER,
        bgColor: "black"
    }), $(document).on("onAdFailLoad", function(i) {
        void 0 !== i.originalEvent && (i = i.originalEvent);
        i.detail || i.data
    }), $("#btn_prepare").click(function() {
        AdMob.prepareInterstitial({
            adId: admobid.interstitial,
            autoShow: !0
        })
    }), $("#btn_showfull").click(function() {
        AdMob.showInterstitial()
    }), $("#btn_preparevideo").click(function() {
        AdMob.prepareRewardVideoAd({
            adId: admobid.rewardvideo,
            autoShow: !0
        })
    }), $("#btn_showvideo").click(function() {
        AdMob.showRewardVideoAd()
    }), $(document).on("resume", function() {
        AdMob.showInterstitial()
    })
}
function AdFloating() {
    $("#btn_prepare").click()
}
function AdVideo() {
    $("#btn_preparevideo").click()
}
admobid = {}, /(android)/i.test(navigator.userAgent) ? admobid = {
    banner: "ca-app-pub-2473032612912827/6977859162",
    interstitial: "ca-app-pub-2473032612912827/8554169878",
    rewardvideo: "ca-app-pub-2473032612912827/8390518340"
} : /(ipod|iphone|ipad)/i.test(navigator.userAgent) && (admobid = {
    banner: "ca-app-pub-2473032612912827/6977859162",
    interstitial: "ca-app-pub-2473032612912827/8554169878",
    rewardvideo: "ca-app-pub-2473032612912827/8390518340"
}), document.addEventListener("onAdFailLoad", function(i) {
    "rewardvideo" == i.adType && "ganhar" == atualView() && minMessage("Algo deu errado tente novamente mais tarde!")
}), document.addEventListener("onAdPresent", function(i) {
    "rewardvideo" == i.adType && getsApp(i.rewardAmount)
});