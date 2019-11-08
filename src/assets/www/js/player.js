var checkPlayer = null;
var player = null;
var realtime = null;

function CheckPlayer(){
	checkPlayer = window.setInterval(function(){
		console.log('tem');	
		if($('#player-wrapper').length>0){
			onTela();
			if($('.media-control').hasClass('media-control-hide')){ }else{  
				$('.media-control').addClass('media-control-hide'); 
				$('.players-btn').fadeOut();
				$('.media-control').fadeOut(); 
				$('.backplayer').fadeOut(); 
			}			
		}
	},5000);
}



function seekMore(){
	var current = parseInt(player.getCurrentTime());
	var sek = (current+10);
	player.seek(sek);
}

function seekMinus(){
	var current = parseInt(player.getCurrentTime());
	var sek = (current-10);
	player.seek(sek);
}

function red(id, name, image){
	var stream = 'https://www.redtube.com.br/'+id;
	playPlayer(stream, image, 'adult', id, '', name, 0);
}

function castPlayer(qual, stream, type){
	var ep = 0;
	if(type == 'serie'){ ep = $('#current'+type).val(); }
	
	var nType = stream.indexOf('netcine.us');
	var nTypee = stream.indexOf('redtube');
	if(nType > 0){
		$.ajax({
			url:stream,
			cache:false,
			type:"GET",
			success: function(data){
				var p =  stream.indexOf('p=');
				var pp = stream.substr(p+2);	
				getter = NetCINE(data, pp);
				
			}
		});
	}else if(nTypee > 0){
		$.ajax({
			url:stream,
			cache:false,
			type:"GET",
			success: function(data){	
				getter = RedTUBE(data);
			}
		});
	}else{
		getter = stream;
	}
	if(qual == 'com.mxtech.videoplayer.ad'){
		if(type == 'tv'){ var mime = 'application/x-mpegURL'; }else{ var mime = 'video/mp4'; }
		window.plugins.launcher.launch({
			packageName:'com.mxtech.videoplayer.ad',
			uri:getter,
			dataType:mime
		});
	}else{
		window.plugins.socialsharing.shareVia(qual, null, null, null, getter, function(){console.log('share ok')}, function(msg) { minMessage('Ocorreu um erro, verifique se o Player está instalado!'); });
	}
	
}



function realTime(type, id){
	var time = 10000;
	var realtime = window.setInterval(function(){
		var test = $('.picEu').attr('data-access');
		if(type == 'tv'){ clearInterval(realTime); }
		if($('.media-control-indicator').length>0){
			var current = formataTime(player.getCurrentTime());
			var fim = formataTime(player.getDuration());
			var lang = $('.item-play').attr('data-lang');
			if(type == 'filme'){
				$.post(getLink()+'/app-user-seekfilme.php', {token: breakToken(), accepts: breakDevice(), current: current, finish: fim, filmeId: id, track: lang}, function(dat){});
			}
			if(type == 'serie'){
				var cap = $('#current'+type).val();
				$.post(getLink()+'/app-user-seekserie.php', {token: breakToken(), accepts: breakDevice(), current: current, finish: fim, serieId: id, capId: cap, track: lang}, function(dat){
					var data = $.parseJSON(dat);
						if(data.proximo){
							if(data.finish){clearInterval(realtime);}
							if(data.proximo.nexter){
								var get = data.proximo.nexter;
								CurrentSerieCap(get.cap);
								nonePlayer();
								alterPlayer(get.stream, get.wall, 'serie', get.serie, get.lang, get.titulo, 0);
							}
						}
					
				});
			}
		}else{
			console.log('stop');
			clearInterval(realtime);	
		}
	},time);
}





function montaPlayer(stream, poster, type, id, lang, titulo, seek){	
	
	CheckPlayer();
	onTela();
	$('#playerShow').fadeIn();
	$('#playerShow .title-player span ').html(titulo);
	$('.item-play').attr({'data-type':type, 'data-current':id, 'data-lang':lang, 'data-title': titulo}).html('<div id="player-wrapper"></div>');
	var mime  = 'video/mp4'; 
	if(type == 'filme'){var mime  = 'video/mp4'; $('#playerShow').removeClass('ondemand');}
	if(type == 'serie'){var mime  = 'video/mp4'; $('#playerShow').removeClass('ondemand');}
	if(type == 'anime'){var mime  = 'video/mp4'; $('#playerShow').removeClass('ondemand'); }
	if(type == 'tv'){var mime  = 'application/vnd.apple.mpegurl'; $('#playerShow').addClass('ondemand'); }
	var nType = stream.indexOf('netcine.us');
	var nTypee = stream.indexOf('redtube');
	if(nType > 0){
		$.ajax({
			url:stream,
			cache:false,
			type:"GET",
			success: function(data){
				var p =  stream.indexOf('p=');
				var pp = stream.substr(p+2);	
				getter = NetCINE(data, pp);
				play = getter;
				player = new Clappr.Player({
					source: getter,
					poster: poster,
					mute: false,
					height: '100%',
					width: '100%',
					autoPlay: false,
					playbackNotSupportedMessage: 'Ocorreu um erro ao reproduzir o vídeo. Tente Novamente.',
					mimeType: mime,
					parentId: '#player-wrapper'
				});
				window.setTimeout(function(){
					$('.overlay-player').fadeOut();
					$('.spinner-three-bounce[data-spinner]').html('<i class="preload"></div>');
					player.setVolume(100);
					player.play();
				},500);
				
			}
		});
	}else if(nTypee > 0){
		$.ajax({
			url:stream,
			cache:false,
			type:"GET",
			success: function(data){	
				getter = RedTUBE(data);
				play = getter;
				player = new Clappr.Player({
					source: getter,
					poster: poster,
					mute: false,
					height: '100%',
					width: '100%',
					autoPlay: false,
					playbackNotSupportedMessage: 'Ocorreu um erro ao reproduzir o vídeo. Tente Novamente.',
					mimeType: mime,
					parentId: '#player-wrapper'
				});
				
				window.setTimeout(function(){
					$('.overlay-player').fadeOut();
					$('.spinner-three-bounce[data-spinner]').html('<i class="preload"></div>');
					player.setVolume(100);
					player.play();
				},500);
			}
		});
	}else{
		play = stream;
		player = new Clappr.Player({
			source: stream,
			poster: poster,
			mute: false,
			height: '100%',
			width: '100%',
			autoPlay: false,
			playbackNotSupportedMessage: 'Ocorreu um erro ao reproduzir o vídeo. Tente Novamente.',
			mimeType: mime,
			parentId: '#player-wrapper'
		});	
		
		window.setTimeout(function(){
			$('.overlay-player').fadeOut();
			$('.spinner-three-bounce[data-spinner]').html('<i class="preload"></div>');
			player.setVolume(100);
			player.play();
		},500);
	}
	
	if(seek>0){ player.seek(seek); }
	realTime(type, id);
	if(type == 'serie'){
		window.setTimeout(function(){
			var test = $('.picEu').attr('data-access');
			var cap = $('#current'+type).val();
			$.post(getLink()+'/app-series-active.php', {token: breakToken(), accepts: breakDevice(), serie: id, cap: cap, track: lang}, function(dat){			
					var data = $.parseJSON(dat);	
				console.log(data);
					if(data.prox){
						var json = data.prox;
						$('.player-seeking.next-ep').removeClass('hider').removeClass('hider').attr('href', "javascript:CurrentSerieCap("+json.cap+"),alterPlayer('"+json.stream+"', '"+json.wall+"', 'serie', '"+json.serie+"', '"+json.lang+"', '"+json.titulo+"', 0);");
					}
					if(data.prev){
						var json = data.prev;
						//playPlayer(get.stream, get.wall, 'serie', get.serie, get.lang, get.titulo, 0);
						$('.player-seeking.prev-ep').removeClass('hider').attr('href', "javascript:CurrentSerieCap("+json.cap+"),alterPlayer('"+json.stream+"', '"+json.wall+"', 'serie', '"+json.serie+"', '"+json.lang+"', '"+json.titulo+"', 0);");
					}
			});
		},1000);
	}
}

function setPlayer(qual){
	$('.linners .check').removeClass('check');
	$('.linners #'+qual).addClass('check');
	$('#rep').html($('.linners #'+qual).attr('data-app'));
	window.setTimeout(function(){ closeNm(); },1000);
}

function qualPlayer(){
	var q = $('#rep').html();
	return q;
}


function playPlayer(stream, poster, type, id, lang, titulo, seek){
	
	var pl = qualPlayer();
	if(pl == 'padrao'){
		montaPlayer(stream, poster, type, id, lang, titulo, seek);
	}else{
		castPlayer(pl, stream, type);
	}

}

function alterPlayer(stream, poster, type, id, lang, titulo, seek){
	onTela();
	if($('#player-wrapper').length>0){ player.destroy(); }
	clearInterval(realtime);
	unCheckPlayer();
	
	$('.overlay-player').show();
	
	$('.next-ep').addClass('hider').attr('href', 'javascript:void(0);'); 
	$('.prev-ep').addClass('hider').attr('href', 'javascript:void(0);'); 
	
	
	$('.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause]').click();
	$('#player-wrapper').empty().remove();
	$('.item-play').attr({'data-type':'', 'data-current':''}).empty();
	$('.players-btn').hide();
	$('.media-control').hide();
	
	
	$('.title-player span').empty();
	$('.media-control').addClass('media-control-hide'); 
	
	window.setTimeout(function(){
		playPlayer(stream, poster, type, id, lang, titulo, seek);
	},500);
	
}

function nonePlayer(){
	if($('#player-wrapper').length>0){ player.destroy(); }
	$('#playerShow .player-res').remove();
	clearInterval(realtime);
	unCheckPlayer();
	$('.title-player span').empty();
	$('.next-ep').addClass('hider').attr('href', 'javascript:void(0);'); 
	$('.prev-ep').addClass('hider').attr('href', 'javascript:void(0);'); 
	$('.media-control').addClass('media-control-hide'); 
	$('.players-btn').hide();
	$('.media-control').hide();
	
	offTela();
	
	$('.media-control[data-media-control] .media-control-layer[data-controls] button.media-control-button[data-playpause]').click();
	$('#player-wrapper').empty().remove();
	$('.item-play').attr({'data-type':'', 'data-current':''}).empty();
	$('#playerShow').fadeOut();
	
	
}

function trailer(url){
	//nonePlayer();
	var server = serverLive();
	if(server){
		var url = getSite()+'/trailer.php?vid='+url.replace('.','');
		document.addEventListener("deviceready", onDeviceReady, false);
		function onDeviceReady() {
			 var ref = window.open(url, '_parent', 'location=no');
			 ref.addEventListener('loadstart', function(event) { 
				window.screen.lockOrientation('landscape');
				Fullscreen.on();
			 });
			ref.addEventListener('loadstop', function(event) {

			});
			ref.addEventListener('exit', function(event) { 
				window.screen.lockOrientation('portrait');
				Fullscreen.off();
				ref.close(); 
			});
		}
	}else{
		window.open(getSite()+'/trailer.php?vid='+url.replace('.',''));
	}
}


function NetCINE(data, pp){
	var one = data.indexOf('primary: "html5",');
	data = data.substr(one+17);	
	var one = data.indexOf('}]');
	data = data.substr(0,one);	
	data = data.replace(/\s{2,}/g, ' ');
	data = data.replace("sources: [{",'');
	data = data.replace("},{",'');
	data = data.replace(/\s{2,}/g, ' ');
	var alto = data.indexOf("ALTO");		
	if(alto>0){
		var ht = data.lastIndexOf("http:");
		var hdd = data.substr(ht);	
		hdd = hdd.replace('"','');
		hdd = hdd.replace("http://", "http");
		hdd = hdd.replace("//", "/"+pp+"/");
		hdd = hdd.replace("http", "http://");
	}else{
		hdd = null;
	}
	return hdd
}

function RedTUBE(data){
	var one = data.indexOf('[{"defaultQuality');
	data = data.substr(one);	
	var one = data.indexOf('}]')+2;
	data = data.substr(0,one);	
	hdd = data.replace("\//", '/');
	var pl = '';
	var hdd = $.parseJSON(hdd);
	
	if(hdd[0].videoUrl != ''){
		var pl = hdd[0].videoUrl;
	}else if(hdd[1].videoUrl != ''){
		var pl = hdd[1].videoUrl;
	}else if(hdd[2].videoUrl != ''){
		var pl = hdd[2].videoUrl;
	}
	
	return pl;
}
function formataTime(time, paddedHours) {
  if (!isFinite(time)) return '--:--';

  time = time * 1000;
  time = parseInt(time / 1000);
  var seconds = time % 60;
  time = parseInt(time / 60);
  var minutes = time % 60;
  time = parseInt(time / 60);
  var hours = time % 24;
  var days = parseInt(time / 24);
  var out = '';
  if (days && days > 0) {
    out += days + ':';
    if (hours < 1) out += '00:';
  }
  if (hours && hours > 0 || paddedHours) out += ('0' + hours).slice(-2) + ':';
  out += ('0' + minutes).slice(-2) + ':';
  out += ('0' + seconds).slice(-2);
  return out.trim();
}
	
function unCheckPlayer(){
	clearInterval(checkPlayer);
	console.log('clear');
}