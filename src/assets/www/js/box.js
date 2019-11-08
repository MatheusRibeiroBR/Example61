function nVersion(){
	return $('#appVersion').html();
}

function minMessage(msg){
	window.plugins.toast.showShortBottom(msg, function(a){console.log('toast success: ' + a)}, function(b){alert(msg);})

}

function notFound(){
	minMessage('Esse titulo não está disponível!'); 
	window.setTimeout(function(){
		window.location.href='#home';
	},1000);
		
}

function deslog(){
	nRem();
	window.setTimeout(function(){
		DBdeleter('2');
		window.location.href='home2.html';
	},500);
}

function nRem(){
	$.post(getLink()+'/app-user-devices.php',{token: breakToken(), accepts: breakDevice(), nRemov: true}, function(data){});
}

function atualView(){
	var url = window.location.href;
	
	var url = window.location.href;
	var zero = url.indexOf('#');

	if(zero>0){	
		var este = url.substr(zero+1);
		var zero = este.indexOf('?');
		if(zero>0){	
			var neww = este.substr(zero);
			return este.replace(neww,'');
		}else{
			return este;
		}
	}else{
		return '';
	}
}



function getData(){
	var url = window.location.href;
	
	var url = window.location.href;
	var zero = url.indexOf('?');

	if(zero>0){	
		var este = url.substr(zero+1);
		return este;
		
	}else{
		return '';
	}
}


function breakToken(){
	var t = $('.picEu').attr('data-token');
	return t;
}
function breakDevice(){
	var t = $('.picEu').attr('data-access');
	return t;
}

function checkLogin(){
	var array = [];
	var objectStore = db.transaction("PERSON").objectStore("PERSON");
	objectStore.openCursor().onsuccess = function(event) {
	  var cursor = event.target.result;
	  if (cursor) {
		 array.push(cursor.value);
		cursor.continue();
	  }else{
		 var json = 'nada';
		 var set = 'nada';
		 var tamanho = array.length;
		 
		 if(array){
			jQuery.each(array, function( i, val ) {
				if(val.ID == 2){
					json = $.parseJSON(val.NOME);
				}
				
				if(val.ID == 3){
					set = val.NOME;
				}
				
			});
			
			if(json == 'nada'){
				window.location.href='home2.html';
			}else{
				$('#dataUser').html(json);
				inicioMob();
			}
			 
			if(set == 'nada'){
				$('#rep').html('padrao');
				$('.linners .check').removeClass('check');
				$('.linners #padrao').addClass('check');
			}else{
				$('#rep').html(set);
				$('.linners .check').removeClass('check');
				$('.linners #'+set).addClass('check');
			}
			 
		 }else{
			window.location.href='home2.html';
		 }
		  
		
		  
	  }
	}
}

function limiter(text, limiter){len=text.length;if(len>50){return text.substr(0,limiter)+'...';}else{return text;}}
function limitt(text){len=text.length;if(len>27){return text.substr(0,27)+'...';}else{return text;}}
function limittt(text){len=text.length;if(len>50){return text.substr(0,50)+'...';}else{return text;}}


function padraoPage(){
	//if($('.nratio').length>0){ $('.ratio video').remove(); $('.ratio').remove();  }
	$('#num-pin').attr('data-dig', '').html('');
	
	
	cloTv();
	nonePlayer();
	closeTemps();
	$('.over').show();
	$('.globalPlay').hide();
	$('.central-page').show();
	$('.menu').show();
	$('.clickNone').show();
	$('.menu-categoria a').show();
	$('.page-pin').hide();
	closeCategorias();	
}

function inicioMob(){
	var dados = $.parseJSON($('#dataUser').html());
	$('#nomeUser').html(dados.name);
	$('.nname').html(dados.name);
	$('#planoUser').html('');
	$('.picEu').attr('data-access', dados.number).attr('data-token', dados.token);
	//if(dados.gender == 'female'){ $('i#male').hide(); $('i#female').show(); }else{ $('i#male').show(); $('i#female').hide(); }
	$('#hashe').html(dados.token);
	montaHome(dados.token);
}

function nContinue(){
	var current = $('.item-play').attr('data-current');
	var type = $('.item-play').attr('data-type');
	var versao = nVersion();	
		//alert(current); alert(type);
		
	$.post(getLink()+'/app-user-update2.php', {token: breakToken(), accepts: breakDevice(), qual: current, type: type, continue:true }, function(data){
		var json = $.parseJSON(data);

		if(json.expirer){
			window.location.href='expired2.html';
		}

		if(json.logado){ 
			if(json.Continue){ 
				
				$('#primm').show().addClass('margin-top');
				$('#segunn').removeClass('margin-top');
				$('#filmes1').html('<div class="lister-continue"></div>');		

				jQuery.each(json.Continue, function( i, val ) {
					if(i <5){
					var linkk = "'"+val.link+"'";
						if(versao < 5){
							$('#filmes1 .lister-continue').append('<a href="'+val.play+'" class="itemm" id="'+val.type+'-C-'+val.id+'"><div class="pl-coninute"><div class="img"><div class="shad"></div><span class="costPlay"></span><img src="'+val.image+'"></div></div><div class="cont-nue"><div class="bar"><span style="width:'+val.bar+'%;"></span></div><div class="til">'+val.name+'</div></div></a>');
						}else{
							$('#filmes1 .lister-continue').append('<a href="'+val.play+'" class="itemm" id="'+val.type+'-C-'+val.id+'"><div class="pl-coninute"><div class="img"><div class="shad"></div><span class="costPlay"></span><img class="lazyload" src="my/img/load-2.png" data-src="'+val.image+'"></div></div><div class="cont-nue"><div class="bar"><span style="width:'+val.bar+'%;"></span></div><div class="til">'+val.name+'</div></div></a>');
						}
					}
				});

				$('#filmes1 .lister-continue').append('<div class="clear"></div>');
				$('a, .focusable').SpatialNavigation().focus(function() { $(this).css('outline', ''); }).blur(function() { $(this).css('outline', ''); }).first().focus();
				if(versao < 5){ }else{ lazyload(); }
			}
		}else{ 
			deslog(); 
		}	

	});
}

function online(){
	window.setInterval(function(){ 
		var url = window.location.href;	
		var current = $('.item-play').attr('data-current');
		var type = $('.item-play').attr('data-type');
		$.post(getLink()+'/app-user-update2.php', {token: breakToken(), accepts: breakDevice(), qual: current, type: type }, function(data){
			var json = $.parseJSON(data);
			if(json.expirer){
				window.location.href='expired.html';
			}
			if(json.logado){ 
			}else{ 
				deslog(); 
			}	
		});
	 },15000);
}

function configure(qual){
	$('.conff a').removeClass('active');
	$('.conff a#c'+qual).addClass('active');
	$('.configures').hide();
	$('#r-'+qual).show();
}


function fixPage(page){
	
	$('.mPage').hide();
	$('#'+page).show();
	
}

function montaHome(token){
	var versao = nVersion();
	
	var view = atualView();
	$.post(getLink()+'/app-mobile.php', {token: breakToken(), accepts: breakDevice()}, function(data){
		
		if(data.indexOf('trigger')>0){ 
			montaHome();
			}else{
				window.setTimeout(function(){ $('#cInit').html(1); },15000);
				var json = $.parseJSON(data);
				
				if(json.expired){ window.location.href='expired.html'; }
				if(json.dns){ 
					openMessage('Login sem acesso ao IPTV, informe ao Seu Revendedor!', 'err');
					window.setTimeout(function(){
						DBdeleter('2');
						window.location.href='home2.html';
					},6000);
				}else{
					window.setTimeout(function(){
						$('.over').hide();
					},1000);
				}
							
				online();
				$('#pin').html(json.topAccess);
				$('#ssDf').html(json.idService);
				$('#init').html(1);
				if(json.deslog){ deslog(); return; }
				
				if(json.expirer){
					$('.ennExp span').html('Seu plano expira em '+json.expirer);
					$('.alertr').show();
				}else{
					$('.alertr').hide();
				}
				
				if(json.topAdult == 1){	$('#menuAdulto').show();}else{$('#menuAdulto').hide();}
				
				if(json.expired){ window.location.href='expired.html'; }
				
				
				$('.whats').html(json.menu.whats.name);
				$('.revName').html(json.menu.whats.people);
				
				$('#planoUser').html(json.topPlano);
				
				$('#topH2').html(json.topTitulo);
				$('#topH3').html(json.topTitulo2);
				
				if(json.Continue){
					$('#primm').show().addClass('margin-top');
					$('#segunn').removeClass('margin-top');
						$('#filmes1').html('<div class="lister-continue"></div>');		
						
						jQuery.each(json.Continue, function( i, val ) {
							if(i <5){
							var linkk = "'"+val.link+"'";
								if(versao < 5){
									$('#filmes1 .lister-continue').append('<a href="'+val.play+'" class="itemm" id="'+val.type+'-C-'+val.id+'"><div class="pl-coninute"><div class="img"><div class="shad"></div><span class="costPlay"></span><img src="'+val.image+'"></div></div><div class="cont-nue"><div class="bar"><span style="width:'+val.bar+'%;"></span></div><div class="til">'+val.name+'</div></div></a>');
								}else{
									$('#filmes1 .lister-continue').append('<a href="'+val.play+'" class="itemm" id="'+val.type+'-C-'+val.id+'"><div class="pl-coninute"><div class="img"><div class="shad"></div><span class="costPlay"></span><img class="lazyload" src="my/img/load-2.png" data-src="'+val.image+'"></div></div><div class="cont-nue"><div class="bar"><span style="width:'+val.bar+'%;"></span></div><div class="til">'+val.name+'</div></div></a>');
								}
								
							}
						});
					
						$('#filmes1 .lister-continue').append('<div class="clear"></div>');
					
					
										
				}else{
					$('#primm').hide();
					$('#segunn').addClass('margin-top');
				}
				
				
				if(json.homeLancamentos){ //topFilmes
					$('#filmes2').html('<div class="lister-home"></div>');			
					jQuery.each(json.homeLancamentos, function( i, val ) {	
						if(i<7){
							if(versao < 5){
								$('#filmes2 .lister-home').append('<div class="grid ovNone"><div class="g"><a class="clickNone" href="#playFilme?'+val.id+'"></a><div class="img"><img src="'+val.folder+'" /><div class="shad"></div></div><div class="caption"><h2>'+val.name+'</h2></div></div></div>');	
							}else{
								$('#filmes2 .lister-home').append('<div class="grid ovNone"><div class="g"><a class="clickNone" href="#playFilme?'+val.id+'"></a><div class="img"><img class="lazyload" src="my/img/load-1.png" data-src="'+val.folder+'" /><div class="shad"></div></div><div class="caption"><h2>'+val.name+'</h2></div></div></div>');	
							}
						}
					});
					$('#filmes2 .lister-home').append('<div class="clear"></div>');
					
				}
				
				if(json.homeAlta){ //topFilmes
					$('#filmes8').html('<div class="lister-home"></div>');			
					jQuery.each(json.homeAlta, function( i, val ) {	
						if(i<7){
							if(versao < 5){
								$('#filmes8 .lister-home').append('<div class="grid ovNone"><div class="g"><a class="clickNone" href="'+val.link+'"></a><div class="img"><img src="'+val.folder+'" /><div class="shad"></div></div><div class="caption"><h2>'+val.name+'</h2></div></div></div>');			
							}else{
								$('#filmes8 .lister-home').append('<div class="grid ovNone"><div class="g"><a class="clickNone" href="'+val.link+'"></a><div class="img"><img class="lazyload" src="my/img/load-1.png" data-src="'+val.folder+'" /><div class="shad"></div></div><div class="caption"><h2>'+val.name+'</h2></div></div></div>');			
							}
						}
					});
					$('#filmes8 .lister-home').append('<div class="clear"></div>');
					
				}
				
				
				if(json.homeAssistidos){ //topFilmes
					$('#filmes3').html('<div class="lister-home"></div>');			
					jQuery.each(json.homeAssistidos, function( i, val ) {	
						if(i<7){
							if(versao < 5){
								$('#filmes3 .lister-home').append('<div class="grid ovNone"><div class="g"><a class="clickNone" href="#playFilme?'+val.id+'"></a><div class="img"><img src="'+val.folder+'" /><div class="shad"></div></div><div class="caption"><h2>'+val.name+'</h2></div></div></div>');	
							}else{
								$('#filmes3 .lister-home').append('<div class="grid ovNone"><div class="g"><a class="clickNone" href="#playFilme?'+val.id+'"></a><div class="img"><img class="lazyload" src="my/img/load-1.png" data-src="'+val.folder+'" /><div class="shad"></div></div><div class="caption"><h2>'+val.name+'</h2></div></div></div>');			
							}
						}
					});
					$('#filmes3 .lister-home').append('<div class="clear"></div>');
				}
				
				
				if(json.homeRecomenda){ //topFilmes
					$('#filmes5').html('<div class="lister-home"></div>');			
					jQuery.each(json.homeRecomenda, function( i, val ) {	
						if(i<7){
							if(versao < 5){
								$('#filmes5 .lister-home').append('<div class="grid ovNone"><div class="g"><a class="clickNone" href="#playFilme?'+val.id+'"></a><div class="img"><img src="'+val.folder+'" /><div class="shad"></div></div><div class="caption"><h2>'+val.name+'</h2></div></div></div>');			
							}else{
								$('#filmes5 .lister-home').append('<div class="grid ovNone"><div class="g"><a class="clickNone" href="#playFilme?'+val.id+'"></a><div class="img"><img class="lazyload" src="my/img/load-1.png" data-src="'+val.folder+'" /><div class="shad"></div></div><div class="caption"><h2>'+val.name+'</h2></div></div></div>');			
							}
						}
					});
					$('#filmes3 .lister-home').append('<div class="clear"></div>');
				}
				
				
				if(json.homeEpisodios){ //topFilmes
					$('#filmes6').html('<div class="lister-home"></div>');			
					jQuery.each(json.homeEpisodios, function( i, val ) {	
						if(i<7){
							if(versao < 5){
								$('#filmes6 .lister-home').append('<div class="grid ovNone"><div class="g"><a class="clickNone" href="#playSerie?'+val.id+'"></a><div class="img"><img src="'+val.folder+'" /><div class="shad"></div></div><div class="caption"><h2>'+val.name+'</h2><h3>'+val.last+'</h3></div></div></div>');	
							}else{
								$('#filmes6 .lister-home').append('<div class="grid ovNone"><div class="g"><a class="clickNone" href="#playSerie?'+val.id+'"></a><div class="img"><img class="lazyload" src="my/img/load-1.png" data-src="'+val.folder+'" /><div class="shad"></div></div><div class="caption"><h2>'+val.name+'</h2><h3>'+val.last+'</h3></div></div></div>');
							}
						}
					});
					$('#filmes3 .lister-home').append('<div class="clear"></div>');
				}
				
				
				
				if(json.CategoryFilmes){ //categoria de filmes
					$('#ct-filmes').html(JSON.stringify(json.CategoryFilmes));
				}
				
				if(json.CategorySeries){ //categoria de filmes
					$('#ct-series').html(JSON.stringify(json.CategorySeries));
				}
				
				if(json.CategoryZZZ){ //categoria de filmes
					$('#ct-adulto').html(JSON.stringify(json.CategoryZZZ));
				}
				
				if(json.CategoryTv){ //categoria de filmes
					$('#ct-tv').html(JSON.stringify(json.CategoryTv));
				}
				
				$('#cAdult').html(json.topAdult);
				
				if(json.topAdult == 1){
					$('.sAdulter').show();
					
					if(json.CategoryZZZ){ //categoria de filmes
						$('#ct-adulto').html(JSON.stringify(json.CategoryZZZ));
					}
					
				}else{
					$('.sAdulter').remove();
					$('#T39').remove();
				}
				
				$('a, .focusable').SpatialNavigation().focus(function() { $(this).css('outline', ''); }).blur(function() { $(this).css('outline', ''); }).first().focus();
				
				/*
				if(view == 'filmes'){ offLogo('FILMES', 'Mais Filmes'); }
				if(view == 'series'){ offLogo('SERIES', 'Mais SÃ©ries'); }
				if(view == 'tv'){ offLogo('TV', 'Mais Canais'); }
				*/
			}

			if(versao < 5){  }else{ lazyload(); }

	});
	return false;
	
}


function checkkPlan(){
	$.post(getLink()+'/app-user-plano.php', {token: breakToken(), accepts: breakDevice()}, function(data){
		
		json = $.parseJSON(data);
		if(json.active){ Exe = 1;}else{ Exe = 0; }
		classe = '';
		
		if(json.expires){
			classe = 'atual';
		}else{

		}
		if(json.active){ var ativo = 'Ativo até'; }else{ var ativo = 'Expirou em'; classe = 'expirado'; }			
		if(json.expires){var expires = '<div style="padding-top: 10px;">'+ativo+': <b>'+json.expires+'</b></div>'; }else{ var expires = '';  }
		if(json.classe){ classe = json.classe; }
		$('#moreDisplay').empty().html('<div class="a-plan '+classe+'"><div class="name"><i><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 123.811 123.811" style="enable-background:new 0 0 123.811 123.811;" xml:space="preserve"><path d="M29.85,106.463c3.2,3.2,7.5,5,12,5s8.8-1.8,12-5l64.799-64.8c6.5-6.5,7-17.2,0.7-23.9c-6.6-7.1-17.7-7.2-24.399-0.4l-46,46   c-3.9,3.9-10.2,3.9-14.1,0l-5.9-6c-6.6-6.6-17.4-6.6-24,0c-6.6,6.601-6.6,17.4,0,24L29.85,106.463z"></path></svg></i><div>Plano Autal</div>Plano '+json.myPlano.name+'</div><div class="desc">'+json.myPlano.desc+'.'+expires+'</div></div>');
		$('#moreAlter').empty();
		
	});
	
	
}

function openCategorias(){
	$(".clickNone").hide();
	$('.menu-categoria').addClass('overed');
	$('.ovleft').addClass('overed');
	$('body').addClass('noOverflow');
}

function closeCategorias(){
	$(".clickNone").show();
	$('.menu-categoria').removeClass('overed');
	$('.ovleft').removeClass('overed');
	$('body').removeClass('noOverflow');
}

function dataCategory(page){
	var li = $('#ct-'+page).html();
	$('.menu-categoria .cp').empty();
	var json = $.parseJSON(li);
	jQuery.each(json, function( i, val ) {	
		if(page == 'filmes'){
			$('.menu-categoria .cp').append('<a id="F'+val.id+'" data-name="'+val.title+'" href="javascript:closeCategorias(),montaFilme('+val.id+');">'+val.title+'</a>');
		}
		if(page == 'series'){
			$('.menu-categoria .cp').append('<a id="S'+val.id+'" data-name="'+val.title+'" href="javascript:closeCategorias(),montaSerie('+val.id+');">'+val.title+'</a>');
		}
		if(page == 'tv'){
			$('.menu-categoria .cp').append('<a id="T'+val.id+'" data-name="'+val.title+'" href="javascript:closeCategorias(),montaTv('+val.id+');">'+val.title+'</a>');
			if($('#cAdult').html() == 1){ 
				
				var pn = $('#pin').attr('data-accept');
				if(pn == 0){
					$('#T39').attr('href', 'javascript:tvPin()'); 
				}
			
			}else{
				$('#T39').remove(); 
			}
		}
		if(page == 'adulto'){
			$('.menu-categoria .cp').append('<a id="Z'+val.id+'" data-name="'+val.title+'" href="javascript:closeCategorias(),montaAdulto('+val.id+');">'+val.title+'</a>');
		}
	});
	$('a, .focusable').SpatialNavigation().focus(function() { $(this).css('outline', ''); }).blur(function() { $(this).css('outline', ''); }).first().focus();
}

function nSeek(){
	var onde = atualView();
	if(onde == 'playFilme'){
		nSeekFilme(getData());
	}else if(onde == 'playSerie'){
		nSeekSerie(getData());
	}
	
	nContinue();
}

//FILMES

function montaFilme(id){
	var versao = nVersion();
	var bck = $('#ct-filmes').attr('data-id', id);
	
	$('#p-filmes .category-loader').show();
	$('#p-filmes .page-category').hide();
	
	
	$('body').animate({scrollTop:0}, 600);
	var div = $('.divFilmes');
	div.empty();
	$.post(getLink()+'/app-filmes-box.php', {token: breakToken(), accepts: breakDevice(), filter:id, box: true }, function(data){
		if(data.indexOf('errorb') >=1){
			alert('error');
		}else{
			var json = $.parseJSON(data);
			$('#f-top').html(json.name);

			div.append('<div class="todasFilmes"><div>');


			jQuery.each(json.filmes.loop, function( i, val ) {
				if(versao < 5){ 	
					$('.todasFilmes').append('<div class="grid ovNone"><div class="g"><a class="clickNone" href="#playFilme?'+val.id+'"></a><div class="img"><img src="'+val.folder+'" /><div class="shad"></div></div><div class="caption"><h2>'+val.name+'</h2></div></div></div>');	
				}else{
					$('.todasFilmes').append('<div class="grid ovNone"><div class="g"><a class="clickNone" href="#playFilme?'+val.id+'"></a><div class="img"><img class="lazyload" src="my/img/load-1.png" data-src="'+val.folder+'" /><div class="shad"></div></div><div class="caption"><h2>'+val.name+'</h2></div></div></div>');	
				}
			});
				
			$('.todasFilmes').append('<div class="clear"></div>');
			if(versao < 5){  }else{ lazyload(); }
			
			$('#p-filmes .category-loader').hide();
			$('#p-filmes .page-category').show();
			
			$('a, .focusable').SpatialNavigation().focus(function() { $(this).css('outline', ''); }).blur(function() { $(this).css('outline', ''); }).first().focus();
				
		}
	});
	return false;
}

function nSeekFilme(id){
	$.post(getLink()+'/app-filmes-filter.php', {token: breakToken(), accepts: breakDevice(), filter:id }, function(data){
		var json = $.parseJSON(data);
		if(json.data){
			var seeking = 0;
			if(json.resta){
				
				var filter = json.data;
				var cover = filter.wall.replace('840&amp;','840&');
				
				$('#cAssisitr').hide();
				$('#cInicio').show();
				$('#cContinue').show();
				$('#cContinue span.p').html('Continuar');
				$('.globalPlay .bar').show();
				$('.globalPlay .bar span').css('width', json.seek+'%');
				if(json.seeking>0){	seeking = json.seeking;	}

				$('#cContinue').attr('href', "javascript:playPlayer('"+filter.id+","+json.track+"', '"+cover+"', 'filme', '"+filter.id+"', '"+json.track+"', '"+filter.name+"', "+seeking+");");
				$('#cInicio').attr('href', "javascript:playPlayer('"+filter.id+","+json.track+"', '"+cover+"', 'filme', '"+filter.id+"', '"+json.track+"', '"+filter.name+"', 0);");
				$('a, .focusable').SpatialNavigation().focus(function() { $(this).css('outline', ''); }).blur(function() { $(this).css('outline', ''); }).first().focus();
			}else{
				$('#cAssisitr').show();
				$('#cContinue').hide();
				$('#cInicio').hide();
				$('#cContinue span.p').html('');
				$('.globalPlay .bar').hide();
				$('.globalPlay .bar span').css('width', '0%');
			}
		}
	});
}


function filterFilme(id){
	
	$('.pl-loader').show();
	
	$.post(getLink()+'/app-filmes-filter.php', {token: breakToken(), accepts: breakDevice(), filter:id }, function(data){
		if(data.indexOf('trigger')>0){ 
			notFound();
		}else{
			var json = $.parseJSON(data);
			if(json.result == false){notFound(); }
			if(json.data){
				if(json.result == false){ minMessage('Esse titulo não está disponível!'); window.location.href='#home'; }
				if(json.data){
					
					
					
					$('.pl-loader').hide();
					
					var filter = json.data;
					var addLista = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 26 26" enable-background="new 0 0 26 26"> <path d="m.3,14c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.4-0.4 1-0.4 1.4,0l.1,.1 5.5,5.9c0.2,0.2 0.5,0.2 0.7,0l13.4-13.9h0.1v-8.88178e-16c0.4-0.4 1-0.4 1.4,0l1.4,1.4c0.4,0.4 0.4,1 0,1.4l0,0-16,16.6c-0.2,0.2-0.4,0.3-0.7,0.3-0.3,0-0.5-0.1-0.7-0.3l-7.8-8.4-.2-.3z"></path></svg>';
					var removeLista = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 357 357" style="enable-background:new 0 0 357 357;" xml:space="preserve"><path d="M357,204H204v153h-51V204H0v-51h153V0h51v153h153V204z"></path></svg>';
					
					$('#cAssisitr').focus();
					
					
					var links = ''; var play = '';
					
					if(filter.dub){ links += 'dub'; play = filter.dub; $('.globalPlay .idiomas .dub').show(); }else{ $('.globalPlay .idiomas .dub').hide(); }
					if(filter.nac){ links += 'nac'; play = filter.nac; $('.globalPlay .idiomas .nac').show(); }else{ $('.globalPlay .idiomas .nac').hide(); }
					if(filter.leg){ links += 'leg'; play = filter.leg; $('.globalPlay .idiomas .leg').show(); }else{ $('.globalPlay .idiomas .leg').hide(); }
					
					var cover = filter.wall.replace('840&amp;','840&');
					
					
					if(filter.lista){
						$('#cLista').attr('data-action', 'del').attr('href', 'javascript:addFlist('+filter.id+');');
						$('#cLista').show().html('<i>'+addLista+'</i><span>Remover da minha lista</span>');
					}else{
						$('#cLista').attr('data-action', 'add').attr('href', 'javascript:addFlist('+filter.id+');');
					   	$('#cLista').show().html('<i>'+removeLista+'</i><span>Adicionar à  minha lista</span>');
					}
					
					if(filter.trailer){ 	
						$('#cTrailer').show().attr('href', "javascript:trailer('"+filter.trailer+"')");
					}else{
						$('#cTrailer').hide();
					}
					
					if(filter.relevancia > 0){ 
						$('.globalPlay .votos').html(filter.relevancia+'% Relevante').show(); 
					}else{ 
						$('.globalPlay .votos').empty().hide(); 
					}
					
					$('.globalPlay .ratio-hd').css('background-image', 'url('+cover+')');
					$('.globalPlay .idiomas').show();
					$('.globalPlay .name').html(filter.name);
					$('.globalPlay .category').html(filter.category+'<i></i>');
					$('.globalPlay .ano').html(filter.ano);
					$('.globalPlay .duracao').html(filter.duracao);
					$('.globalPlay .sinopse').html(limiter(filter.sinopse, 180));
					$('.globalPlay .elenco').html('<b>Elenco:</b> '+filter.elenco);
					$('.globalPlay .direcao').html('<b>DireÃ§Ã£o:</b> '+filter.direcao);
					$('.globalPlay .generos').html('<b>GÃªneros:</b> '+filter.category);
					
					var seeking = 0;
					if(json.resta){
						$('#cAssisitr').hide();
						$('#cInicio').show();
						$('#cContinue').show();
						$('#cContinue span.p').html('Continuar');
						$('.globalPlay .bar').show();
						$('.globalPlay .bar span').css('width', json.seek+'%');
						if(json.seeking>0){
							seeking = json.seeking;
						}
						
						
						$('#cContinue').attr('href', "javascript:playPlayer('"+filter.id+","+json.track+"', '"+cover+"', 'filme', '"+filter.id+"', '"+json.track+"', '"+filter.name+"', "+seeking+");");
						$('#cInicio').attr('href', "javascript:playPlayer('"+filter.id+","+json.track+"', '"+cover+"', 'filme', '"+filter.id+"', '"+json.track+"', '"+filter.name+"', 0);");
						
					}else{
						$('#cAssisitr').show();
						$('#cContinue').hide();
						$('#cInicio').hide();
						$('#cContinue span.p').html('');
						$('.globalPlay .bar').hide();
						$('.globalPlay .bar span').css('width', '0%');
					
					
						if(links == 'dubleg'){

							$('#cAssisitr').show().attr('href', "javascript:playPlayer('"+filter.id+",dub', '"+cover+"', 'filme', '"+filter.id+"', 'dub', '"+filter.name+"', "+seeking+");");
							$('#cAssisitrr').show().attr('href', "javascript:playPlayer('"+filter.id+",leg', '"+cover+"', 'filme', '"+filter.id+"', 'leg', '"+filter.name+"', "+seeking+");");

						}else{
							var lg = links.replace('nac', 'dub');

							var qw = 'dub';
							if(filter.leg){ qw = 'leg'; }
							if(qw == 'leg'){
								$('#cAssisitr').hide();
								$('#cAssisitrr').show().attr('href', "javascript:playPlayer('"+filter.id+","+qw+"', '"+cover+"', 'filme', '"+filter.id+"', '"+qw+"', '"+filter.name+"', "+seeking+");");
							}else{
								$('#cAssisitrr').hide();
								$('#cAssisitr').show().attr('href', "javascript:playPlayer('"+filter.id+","+qw+"', '"+cover+"', 'filme', '"+filter.id+"', '"+qw+"', '"+filter.name+"', "+seeking+");");
							}


						}
					}
					$('a, .focusable').SpatialNavigation().focus(function() { $(this).css('outline', ''); }).blur(function() { $(this).css('outline', ''); }).first().focus();
				
				}
			}
		}
		
		
	});
	
}

function FilmeOpt(){
	$('.globalPlay .play').hide();
	$('.globalPlay .plays').fadeIn();
}

function SerieOpt(){
	$('.globalPlay .play').hide();
	$('.globalPlay .plays').fadeIn();
}

function closeTemps(){
	$('.globalPlay .caption2').hide();
	$('.globalPlay .others').show();
	$('.globalPlay .links').show();
	$('.globalPlay .ratio-temps').hide();
}

function openTemps(){
	$('.globalPlay .caption2').show();
	$('.globalPlay .others').hide();
	$('.globalPlay .links').hide();
	$('.globalPlay .ratio-temps').show();
	$(".clickNon").hide();
	$('.sTemps').addClass('overed');
	$('.Upper').show();
	$('.play-t').animate({scrollTop:0}, 600);
}

function clearPlay(){
	nonePlayer();
	closeTemps();
	$('.globalPlay .ratio-hd').css('background-image', 'url()');
	$('.globalPlay .name').html('');
	$('.globalPlay .category').html('');
	$('.globalPlay .ano').html('');
	$('.globalPlay .duracao').html('');
	$('.globalPlay .sinopse').html('');
	$('.globalPlay .elenco').html('');
	$('.globalPlay .direcao').html('');
	$('.globalPlay .generos').html('');
	$('.globalPlay .idiomas').hide('');
	$('.globalPlay .idiomas').hide('');
	$('.globalPlay .votos').empty().hide(); 
	$('.globalPlay .links a').hide().removeAttr('href'); 
	$('.globalPlay .caption2').hide();
	$('.globalPlay .caption3').hide();
	$('.globalPlay .caption').show();

	$('.globalPlay .ratio-hd').show();
}

//SERIES
function montaSerie(id){
	var versao = nVersion();
	$('#p-series .category-loader').show();
	$('#p-series .page-category').hide();
	var bck = $('#ct-series').attr('data-id', id);
	$('body').animate({scrollTop:0}, 600);
	var div = $('.divSeries');
	div.empty();
	$.post(getLink()+'/app-series-box.php', {token: breakToken(), accepts: breakDevice(), filter:id, box: true }, function(data){
		if(data.indexOf('errorb') >=1){
			alert('error');
		}else{
			var json = $.parseJSON(data);
			$('#s-top').html(json.name);

			div.append('<div class="todasSeries"><div>');

			jQuery.each(json.series, function( i, val ) { 
				if(versao < 5){
					$('.todasSeries').append('<div class="item-s"><a class="clickNone" href="#playSerie?'+val.id+'"></a><div class="item-serie" style="background-image: url('+val.wall+');"><div class="shad"></div><div class="folder"><img src="'+val.folder+'" /></div><div class="caption"><h2>'+limitt(val.name)+'</h2><div class="ctg">'+val.category+'</div><div class="temps"><i class="play"></i><span class="text">'+val.temporadas+'</span><i class="'+val.res+'">'+val.res+'</i><div class="clear"></div></div></div><div class="clear"></div></div></div>');
				}else{
					$('.todasSeries').append('<div class="item-s"><a class="clickNone" href="#playSerie?'+val.id+'"></a><div class="item-serie" style="background-image: url('+val.wall+');"><div class="shad"></div><div class="folder"><img class="lazyload" src="my/img/load-1.png" data-src="'+val.folder+'" /></div><div class="caption"><h2>'+limitt(val.name)+'</h2><div class="ctg">'+val.category+'</div><div class="temps"><i class="play"></i><span class="text">'+val.temporadas+'</span><i class="'+val.res+'">'+val.res+'</i><div class="clear"></div></div></div><div class="clear"></div></div></div>');
				}
			});
			
			$('a, .focusable').SpatialNavigation().focus(function() { $(this).css('outline', ''); }).blur(function() { $(this).css('outline', ''); }).first().focus();
			
			$('.todasSeries').append('<div class="clear"></div>');
			if(versao < 5){ }else{ lazyload(); }
			$('#p-series .category-loader').hide();
			$('#p-series .page-category').show();
		}
	});
	return false;
}

function nSeekSerie(id){
	
	$.post(getLink()+'/app-series-filter.php', {token: breakToken(), accepts: breakDevice(), filter:id }, function(data){
		var json = $.parseJSON(data);
		if(json.data){
			
			if(json.seek){
				var filter = json.data;
				var cover = filter.wall.replace('amp;w', 'w').replace('amp;h', 'h');
				$('#cContinue span.p').html('Continuar '+json.seek.ordenado);
				$('.globalPlay .bar').show();
				$('.globalPlay .bar span').css('width', json.seek.bar+'%');
				$('#cContinue').show();
				$('#cInicio').show();
				$('#cAssisitr').hide();

				$('.globalPlay .seekingk').show();
				$('.globalPlay .seekingk .bar span').css('width', json.seek.bar+'%');
				alterTSeries(json.seek.temporada);
				$('.globalPlay #current').val(json.seek.timer);
				$('.globalPlay #seek').val(json.seek.id);
				$('.globalPlay .plays').hide();

				$('#cContinue').attr('href', "javascript:CurrentSerieCap("+json.seek.id+"),playPlayer('"+filter.id+","+json.seek.id+","+json.seek.lang+"', '"+cover+"', 'serie', '"+json.seek.serie+"', '"+json.seek.lang+"', '"+json.seek.titulo+"', "+json.seek.timer+");");
				$('#cInicio').attr('href', "javascript:CurrentSerieCap("+json.seek.id+"),playPlayer('"+filter.id+","+json.seek.id+","+json.seek.lang+"', '"+cover+"', 'serie', '"+json.seek.serie+"', '"+json.seek.lang+"', '"+json.seek.titulo+"', 0);");
				$('a, .focusable').SpatialNavigation().focus(function() { $(this).css('outline', ''); }).blur(function() { $(this).css('outline', ''); }).first().focus();
			}
			
		}
	});
}



function filterSerie(id){
	
	$.post(getLink()+'/app-series-filter.php', {token: breakToken(), accepts: breakDevice(), filter:id }, function(data){
		
		if(data.indexOf('trigger')>0){ 
			notFound();
		}else{
			var json = $.parseJSON(data);
			if(json.result == false){notFound(); }
			if(json.data){

				



				
				
				var filter = json.data;
				
				
				var addLista = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 26 26" enable-background="new 0 0 26 26"> <path d="m.3,14c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.4-0.4 1-0.4 1.4,0l.1,.1 5.5,5.9c0.2,0.2 0.5,0.2 0.7,0l13.4-13.9h0.1v-8.88178e-16c0.4-0.4 1-0.4 1.4,0l1.4,1.4c0.4,0.4 0.4,1 0,1.4l0,0-16,16.6c-0.2,0.2-0.4,0.3-0.7,0.3-0.3,0-0.5-0.1-0.7-0.3l-7.8-8.4-.2-.3z"></path></svg>';
					var removeLista = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 357 357" style="enable-background:new 0 0 357 357;" xml:space="preserve"><path d="M357,204H204v153h-51V204H0v-51h153V0h51v153h153V204z"></path></svg>';
					
				var cover = filter.wall.replace('amp;w', 'w').replace('amp;h', 'h');
				$('.serieJson').attr('data-cover', cover);


				if(filter.lista){
					$('#cLista').attr('data-action', 'del').attr('href', 'javascript:addSlist('+filter.id+');');
					$('#cLista').show().html('<i>'+addLista+'</i><span>Remover da minha lista</span>');
				}else{
					$('#cLista').attr('data-action', 'add').attr('href', 'javascript:addSlist('+filter.id+');');
					$('#cLista').show().html('<i>'+removeLista+'</i><span>Adicionar Ã  minha lista</span>');
				}


				if(filter.relevancia > 0){ 
					$('.globalPlay .votos').html(filter.relevancia+'% Relevante').show(); 
				}else{ 
					$('.globalPlay .votos').empty().hide(); 
				}

				$('.globalPlay .ratio-hd').css('background-image', 'url('+cover+')');
				$('.globalPlay .name').html(filter.name);
				$('.globalPlay .ano').html(filter.ano);
				$('.globalPlay .duracao').html(filter.duracao);
				$('.globalPlay .generos').html('<b>GÃªneros:</b> '+filter.category);
				$('.globalPlay .sinopse').html('<b>'+filter.original+'</b>'+limiter(filter.sinopse, 140));
				$('.globalPlay .elenco').html('<b>Elenco:</b> '+filter.elenco);
				$('.globalPlay .direcao').html('<b>DireÃ§Ã£o:</b> '+filter.direcao);
				$('.globalPlay .res').html(filter.res);

				if(json.temporadas){
					var temps = JSON.stringify(json.temporadas);	
					SeriesTaction(temps);
				}
				
				$('#cTemps').show().attr('href', 'javascript:openTemps();');

				if(json.seek){
					
					$('#cContinue span.p').html('Continuar '+json.seek.ordenado);
					$('.globalPlay .bar').show();
					$('.globalPlay .bar span').css('width', json.seek.bar+'%');
					$('#cContinue').show();
					$('#cInicio').show();
					$('#cAssisitr').hide();
					
					$('.globalPlay .seekingk').show();
					$('.globalPlay .seekingk .bar span').css('width', json.seek.bar+'%');
					alterTSeries(json.seek.temporada);
					$('.globalPlay #current').val(json.seek.timer);
					$('.globalPlay #seek').val(json.seek.id);
					$('.globalPlay .plays').hide();
					
					$('#cContinue').attr('href', "javascript:CurrentSerieCap("+json.seek.id+"),playPlayer('"+filter.id+","+json.seek.id+","+json.seek.lang+"', '"+cover+"', 'serie', '"+json.seek.serie+"', '"+json.seek.lang+"', '"+json.seek.titulo+"', "+json.seek.timer+");");
					$('#cInicio').attr('href', "javascript:CurrentSerieCap("+json.seek.id+"),playPlayer('"+filter.id+","+json.seek.id+","+json.seek.lang+"', '"+cover+"', 'serie', '"+json.seek.serie+"', '"+json.seek.lang+"', '"+json.seek.titulo+"', 0);");
					
				}else{
					$('#cContinue').hide();
					$('#cAssisitr').show();
					$('#cInicio').hide();
					playNoContinue(json.init);
					alterTSeries(1);
				}
				
				$('a, .focusable').SpatialNavigation().focus(function() { $(this).css('outline', ''); }).blur(function() { $(this).css('outline', ''); }).first().focus();
				
			}
		}
	});
	
}

function hideEp(id){
	$('.sTemps span i').hide();
	$('#cTp'+id+' span i').show();
}

function SeriesTaction(json){
	
	$('.serieJson').empty();
	$('#stt').empty(); 
	$('#ssTempradas').empty();
	var js = $.parseJSON(json);
	var a=0;
	jQuery.each(js, function( i, val ) {
		a++;
		$('#stt').append('<li id="cTp'+val.ordem+'"><a class="Upper" onFocus="hideEp('+val.ordem+')"; href="javascript:alterTSeries('+val.ordem+');"></a> <span>'+val.name+'<i>'+val.count+'</i></span></li>');
		$('#ssTempradas').append('<ul id="t'+val.ordem+'" class="list-ep"></ul>');
	
	});
	var ordem = 0;
	var cc=0;
	jQuery.each(js, function( i, val ) { cc++;
		ordem = val.ordem
		jQuery.each(val.capitulos, function( e, cap ) {
			var ok = JSON.stringify(cap);
			$('.serieJson').append('<div id="sEP-'+cap.id+'">'+ok+'</div>');
			//if(cc==1 && cap.ordem == 1){ iniCapSerie(cap.id); $('#clickSeriePlay').show(); }
			var dub = '';var leg = ''; if(cap.dub){dub = '<span class="dub">DUB</span>';}if(cap.leg){leg = '<span class="leg">LEG</span>';}
			if(cap.result){ var lim = dub+' '+leg; var linkk = "playCapSerie('"+cap.id+"');"; }else{ var lim = '<span class="breve">EM BREVE</span>'; var linkk= "void(0);"; }
			
			var duracao = cap.duracao.replace('m', 'min').replace('H','h');
			$('#ssTempradas #t'+ordem).append('<li id="ep-'+cap.id+'"><div class="img"><a class="clickNon" href="javascript:'+linkk+'"></a><div class="shd"></div><span class="ordem">'+cap.namer+'</span><img class="lazyload" src="my/img/load-4.png" data-src="'+cap.image+'"/></div><div class="caption"><h2>'+cap.bname+'</h2><p >'+cap.name+'</p></div><div class="lang"><i class="duration">('+duracao+')</i>'+lim+'<div class="clear"></div></div></li>');
		});
		$('a, .focusable').SpatialNavigation().focus(function() { $(this).css('outline', ''); }).blur(function() { $(this).css('outline', ''); }).first().focus();
		lazyload();
	});
	
	
}


function CurrentSerieCap(id){
	$('#currentserie').val(id);
}


function alterTSeries(qual){
	$('#ssTempradas .list-ep').hide().removeClass('show');
	$('#ssTempradas #t'+qual).show().addClass('show');
	$('.sTemps a').removeClass('active');
	$('.sTemps span').removeClass('active');
	$('#cTp'+qual+' a').addClass('active');
	$('#cTp'+qual+' span').addClass('active');
	
	$(".clickNon").show();
	$('.sTemps').removeClass('overed');
	$('.Upper').hide();
	$('.play-t').animate({scrollTop:0}, 600);
}


function playNoContinue(id){	
	closeTemps();
	var image = $('.serieJson').attr('data-cover'); 
	var qq = $('#sEP-'+id).html();
	var json = $.parseJSON(qq);
	var links = ''; var play = '';
	if(json.dub){ links += 'dub'; play = json.dub; }
	if(json.leg){ links += 'leg'; play = json.leg; }
	var title = json.tituloTop;
	var seek = $('#p-playseries #seek').val();
	var current = $('#p-playseries #current').val();
	
	$('#cContinue').hide();
	$('#cInicio').hide();

	var image = json.image.replace('amp;w', 'w').replace('amp;h', 'h');
	$('#p-playseries .ratio-hd').css('background-image', 'url('+image+')');
	var seeking = 0;
	if(links == 'dubleg'){
		
		$('#cAssisitr span').html(json.namer+' (DUB)');
		$('#cAssisitrr span').html(json.namer+' (LEG)');
		
		$('#cAssisitr').show().attr('href', "javascript:CurrentSerieCap("+json.id+"),playPlayer('"+json.serie+","+json.id+",dub', '"+image+"', 'serie', '"+json.serie+"', 'dub', '"+title+"', "+seeking+")");
		$('#cAssisitrr').show().attr('href', "javascript:CurrentSerieCap("+json.id+"),playPlayer('"+json.serie+","+json.id+",leg', '"+image+"', 'serie', '"+json.serie+"', 'leg', '"+title+"', "+seeking+")");
	}else{
		var lg = links.replace('nac', 'dub');
		
		if(json.leg){
			var tw='leg';
			$('#cAssisitr').hide();
			$('#cAssisitrr span').html(json.namer+' (LEG)');
			$('#cAssisitrr').show().attr('href', "javascript:CurrentSerieCap("+json.id+"),playPlayer('"+json.serie+","+json.id+",leg', '"+image+"', 'serie', '"+json.serie+"', 'leg', '"+title+"', "+seeking+")");
		}else{
			var tw = 'dub';
			$('#cAssisitrr').hide();
			$('#cAssisitr span').html(json.namer+' (DUB)');
			$('#cAssisitr').show().attr('href', "javascript:CurrentSerieCap("+json.id+"),playPlayer('"+json.serie+","+json.id+",dub', '"+image+"', 'serie', '"+json.serie+"', 'dub', '"+title+"', "+seeking+")");
		}
		
		
	}
	$('a, .focusable').SpatialNavigation().focus(function() { $(this).css('outline', ''); }).blur(function() { $(this).css('outline', ''); }).first().focus();
}

function playCapSerie(id){	
	
	closeTemps();
	//var image = $('.serieJson').attr('data-cover');
	var qq = $('#sEP-'+id).html();
	var json = $.parseJSON(qq);
	var links = ''; var play = '';
	if(json.dub){ links += 'dub'; play = json.dub; }
	if(json.leg){ links += 'leg'; play = json.leg; }
	var title = json.tituloTop;
	var seek = $('#p-playseries #seek').val();
	var current = $('#p-playseries #current').val();

	
	$('#cContinue').hide();
	$('#cInicio').hide();

	var image = json.image.replace('amp;w', 'w').replace('amp;h', 'h');
	$('#p-playseries .ratio-hd').css('background-image', 'url('+image+')');
	var seeking = 0;
	if(links == 'dubleg'){
		
		$('#cAssisitr span').html(json.namer+' (DUB)');
		$('#cAssisitrr span').html(json.namer+' (LEG)');
		
		$('#cAssisitr').show().attr('href', "javascript:CurrentSerieCap("+json.id+"),playPlayer('"+json.serie+","+json.id+",dub', '"+image+"', 'serie', '"+json.serie+"', 'dub', '"+title+"', "+seeking+")");
		$('#cAssisitrr').show().attr('href', "javascript:CurrentSerieCap("+json.id+"),playPlayer('"+json.serie+","+json.id+",leg', '"+image+"', 'serie', '"+json.serie+"', 'leg', '"+title+"', "+seeking+")");
	}else{
		var lg = links.replace('nac', 'dub');
		
		if(json.leg){
			var tw='leg';
			$('#cAssisitr').hide();
			$('#cAssisitrr span').html(json.namer+' (LEG)');
			$('#cAssisitrr').show().attr('href', "javascript:CurrentSerieCap("+json.id+"),playPlayer('"+json.serie+","+json.id+",leg', '"+image+"', 'serie', '"+json.serie+"', 'leg', '"+title+"', "+seeking+")");
		}else{
			var tw = 'dub';
			$('#cAssisitrr').hide();
			$('#cAssisitr span').html(json.namer+' (DUB)');
			$('#cAssisitr').show().attr('href', "javascript:CurrentSerieCap("+json.id+"),playPlayer('"+json.serie+","+json.id+",dub', '"+image+"', 'serie', '"+json.serie+"', 'dub', '"+title+"', "+seeking+")");
		}
		
		
	}


	$('a, .focusable').SpatialNavigation().focus(function() { $(this).css('outline', ''); }).blur(function() { $(this).css('outline', ''); }).first().focus();
}


//TV

function playTv(id, resolution){

	var external = 0;
	
	//if(getCast() == 1){ }else{ onTela(); }
	
	$.post(getLink()+'/app-tv-play.php', {token: breakToken(), accepts: breakDevice(), filter:id, res: resolution }, function(data){
			
		if(data.indexOf('trigger')>0){ 
			notFound();
		}else{
			var json = $.parseJSON(data);
			if(external == 1){				
				$('#playerShow').hide();
				$('.overlay-player').fadeOut();
				//chormecast
				var str = '';
				var links = json.filterCanal.iptv;
				if(resolution == 1){str = links.SD;}
				if(resolution == 2){str = links.HD;}
				if(resolution == 3){ str = links.FHD;}
				castPlayer(str, json.filterCanal.wall, 'tv', json.filterCanal.id, 0, '');
			}else{
				//sem cast
				var str = '';
				var links = json.filterCanal.iptv;
				if(resolution == 1){str = links.SD;}
				if(resolution == 2){str = links.HD;}
				if(resolution == 3){ str = links.FHD;}
				
				playPlayer(str, json.filterCanal.wall, 'tv', json.filterCanal.id, '', '', 0);
				var svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 294.843 294.843" style="enable-background:new 0 0 294.843 294.843;" xml:space="preserve"><path d="M278.527,79.946c-10.324-20.023-25.38-37.704-43.538-51.132c-2.665-1.97-6.421-1.407-8.392,1.257s-1.407,6.421,1.257,8.392   c16.687,12.34,30.521,28.586,40.008,46.983c9.94,19.277,14.98,40.128,14.98,61.976c0,74.671-60.75,135.421-135.421,135.421   S12,222.093,12,147.421S72.75,12,147.421,12c3.313,0,6-2.687,6-6s-2.687-6-6-6C66.133,0,0,66.133,0,147.421   s66.133,147.421,147.421,147.421s147.421-66.133,147.421-147.421C294.842,123.977,289.201,100.645,278.527,79.946z"></path><path d="M109.699,78.969c-1.876,1.067-3.035,3.059-3.035,5.216v131.674c0,3.314,2.687,6,6,6s6-2.686,6-6V94.74l88.833,52.883   l-65.324,42.087c-2.785,1.795-3.589,5.508-1.794,8.293c1.796,2.786,5.508,3.59,8.294,1.794l73.465-47.333   c1.746-1.125,2.786-3.073,2.749-5.15c-0.037-2.077-1.145-3.987-2.93-5.05L115.733,79.029   C113.877,77.926,111.575,77.902,109.699,78.969z" ></path></svg>';
				var l = '';
				var btn = json.filterCanal.iptv;
				if(btn.SD){
					var hrf = "javascript:alterPlayer('"+btn.SD+"', '"+json.filterCanal.wall+"', 'tv', '"+json.filterCanal.id+"', '', '', 0)";
					l += '<a href="'+hrf+'" class="SD nmore"><i>'+svg+'</i>SD</a>';
				}
				if(btn.HD){
					var hrf = "javascript:alterPlayer('"+btn.HD+"', '"+json.filterCanal.wall+"', 'tv', '"+json.filterCanal.id+"', '', '', 0)";
					l += '<a href="'+hrf+'" class="HD nmore"><i>'+svg+'</i>HD</a>';
				}
				if(btn.FHD){
					var hrf = "javascript:alterPlayer('"+btn.FHD+"', '"+json.filterCanal.wall+"', 'tv', '"+json.filterCanal.id+"', '', '', 0)";
					l += '<a href="'+hrf+'" class="FHD nmore"><i>'+svg+'</i>FHD</a>';
				}
				$('#playerShow').prepend('<div onClick="hideRes();" class="player-res"><div><h1>'+json.filterCanal.name+'</h1>'+l+'</div></div>')
				if(resolution == 1){ $('.player-res a.SD').addClass('active'); }
				if(resolution == 2){ $('.player-res a.HD').addClass('active'); }
				if(resolution == 3){ $('.player-res a.FHD').addClass('active'); }
				$('a, .focusable').SpatialNavigation().focus(function() { $(this).css('outline', ''); }).blur(function() { $(this).css('outline', ''); }).first().focus();
				
			}
		}
		
	});
	
	
			

}

function filterCanal(id){
	
	$('.globalPlay .caption2').hide();
	$('.globalPlay .caption3').show();
	$('.globalPlay .caption').hide();
	
	$.post(getLink()+'/app-tv-canal.php', {token: breakToken(), accepts: breakDevice(), filter:id }, function(data){
		if(data.indexOf('trigger')>0){ 
			notFound();
		}else{
			if(data.indexOf('trigger')>0){ minMessage('Ocorreu um erro, tente novamente!'); window.location.href='#home'; }
			var json = $.parseJSON(data); 
			if(json.result == false){ minMessage('Esse canal não está disponível!'); window.location.href='#home'; }
			if(json.data){
				
				var cover = json.data.wall.replace('840&amp;','840&');
				$('.globalPlay .ratio-hd').css('background-image', 'url('+cover+')');
				$('.globalPlay .idiomas').show();
				$('.globalPlay .name').html(json.data.name);
				
				if(json.data.config){
					//$('#p-playTv .play').show().attr('href', "javascript:playTv('"+json.data.id+"'),onTela();");
					
					if(json.data.iptv.SD){ $('#cSD').attr('href', 'javascript:playTv('+json.data.id+', 1);').show(); }else{ $('#cSD').hide();  }
					if(json.data.iptv.HD){ $('#cHD').attr('href', 'javascript:playTv('+json.data.id+', 2);').show(); }else{ $('#cHD').hide();  }
					if(json.data.iptv.FHD){ $('#cFHD').attr('href', 'javascript:playTv('+json.data.id+', 3);').show(); }else{ $('#cFHD').hide();  }
					
				}else{
				}

				
				/*
				
				if(filter.epg == false){
					$('.inDts').hide();
					$('.progrloader').hide();
					$('.none-progr').show();
				}else{
					$('.category-progr').empty();
					$('#p-playTv .progrs').remove();
					$('.inDts').html('<div class="progrs owl-carousel"></div>').show();
					jQuery.each(filter.days, function( i, val ) {	
						var lin = "alterDay('"+filter.id+"', '"+val.data+"', '"+filter.epg+"')";
						$('#p-playTv .progrs').append('<a id="data-'+val.data+'" href="javascript:'+lin+'"><div class="sem">'+val.sem+'</div><div class="day">'+val.day+'</div></a>');				
					});
					$('#data-'+filter.hoje).addClass('active');
				}
				window.setTimeout(function(){
					$('#p-playTv .globalOverlay').fadeOut(function(){ 
						$('#p-playTv .globalFilter').show().addClass('bounceInDown2');
						$('#p-playTv .minner-top').show();
						$('#p-playTv .g-cast').show();
						window.setTimeout(function(){ 
							$('#p-playTv .globalFilter').removeClass('bounceInDown2'); 
						},1000);
					});
				},1000);

				

				if(json.prog){
					var este = 0;
					jQuery.each(json.prog, function( i, val ) {
						if(val.noww){ este = val.id; var ini = 'AGORA'; var cll = 'horario now'; }else{ var ini = val.hour; var cll = 'horario'; }
						if(val.genero){ var f='<span class="category">'+val.genero+'</span>'; }else{ var f='';}
						$('.category-progr').append('<li id="prog-'+val.id+'"><div class="data"><div onclick="getSinopse('+val.id+');" class="'+cll+'">'+ini+'</div><div class="programa">'+val.name+'</div><div class="seta" onclick="getSinopse('+val.id+');"><span>&nbsp;</span></div><div class="clear"></div><div class="sinopse"><div>'+f+'<span class="stars">'+val.rating+'</span><div class="clear"></div></div>'+val.sinopse+'</div></div></li>');
					});
					if(este > 0){
						$('#prog-'+este).addClass('s');
						$('#prog-'+este +' .seta').addClass('ss');
					}
					$('.progrloader').hide();
					$('.category-progr').fadeIn();
				}
				*/


			}

		}

	});

	
	
}

function getArrayAgora(){
	var test = $('.picEu').attr('data-access');
	var data = new Array();
	$('.nowCanal').each(function( index ) {
		if($( this ).attr('data-id') == ''){ }else{ data.push($( this ).attr('data-id')); }
	});	
	data = data.toString();
	$.post(getLink()+'/app-tv-now.php', {token: breakToken(), accepts: breakDevice(), id: data }, function(dat){
		var data = $.parseJSON(dat);	
			if(data.now){
				jQuery.each(data.now, function(i, val){	
					var gen = '';
					if(val.genero){ gen = '<i>'+val.genero+'</i>'; }
					$('.now-'+val.id).empty().html(gen+' '+val.inicio+' - '+val.fim+' <h2>'+val.name+'</h2>').removeClass('none').removeClass('no').show();
				});
			}			
	});
	
}

function montaTv(id){
	var versao = nVersion();
	$('#p-tv .category-loader').show();
	$('#p-tv .page-category').hide();
	var bck = $('#ct-tv').attr('data-id', id);
	$('body').animate({scrollTop:0}, 600);
	var div = $('.divTv');
	div.empty();
	$.post(getLink()+'/app-tv-box.php', {token: breakToken(), accepts: breakDevice(), filter:id, box: true }, function(data){
		if(data.indexOf('errorb') >=1){
			alert('error');
		}else{
			var json = $.parseJSON(data);
			$('#t-top').html(json.name);

			div.append('<div class="todasTv"><div>');

			jQuery.each(json.canais, function( i, val ) { 
				if(versao < 5){
					$('.todasTv').append('<div class="item-t"><div class="line-tv nowCanal" data-id="'+val.epg+'"><a class="clickNone" href="javascript:filterStream('+val.id+');"></a><div class="img"><div class="numberr">'+val.id+'</div><img class="lazyload" src="my/img/load-2.png" data-src="'+val.wall+'"/><div class="shadder"></div></div><div class="logo" style="background-image: url('+val.folder+');">&nbsp;</div><div class="caption"><h1>'+val.name+'</h1><div class="now-'+val.epg+' pp none ">Carregando ProgramaÃ§Ã£o</div></div></div></div>');
				}else{
					$('.todasTv').append('<div class="item-t"><div class="line-tv nowCanal" data-id="'+val.epg+'"><a class="clickNone" href="javascript:filterStream('+val.id+');"></a><div class="img"><div class="numberr">'+val.id+'</div><img class="lazyload" src="my/img/load-2.png" data-src="'+val.wall+'"/><div class="shadder"></div></div><div class="logo" style="background-image: url('+val.folder+');">&nbsp;</div><div class="caption"><h1>'+val.name+'</h1><div class="now-'+val.epg+' pp none ">Carregando ProgramaÃ§Ã£o</div></div></div></div>');
				}
			});
			$('a, .focusable').SpatialNavigation().focus(function() { $(this).css('outline', ''); }).blur(function() { $(this).css('outline', ''); }).first().focus();
			$('.todasTv').append('<div class="clear"></div>');
			if(versao < 5){ }else{ lazyload(); }
			getArrayAgora();
			
			$('#p-tv .category-loader').hide();
			$('#p-tv .page-category').show();
		}
	});
	return false;
}


//ADULTO
function montaAdulto(id){
	var versao = nVersion();
	$('#p-adulto .category-loader').show();
	$('#p-adulto .page-category').hide();
	var bck = $('#ct-adulto').attr('data-id', id);
	$('body').animate({scrollTop:0}, 600);
	var div = $('.divAdult');
	div.empty();
	$.post(getLink()+'/app-adulto-box.php', {token: breakToken(), accepts: breakDevice(), filter:id, box: true }, function(data){
		if(data.indexOf('errorb') >=1){
			alert('error');
		}else{
			var json = $.parseJSON(data);
			$('#z-top').html(json.name);

			div.append('<div class="todasAdult"><div>');

			jQuery.each(json.CategoryZZZ, function( i, val ) {
				var name = val.name.replace("'", "");
				name = "'"+name+"'";
				var image = "'"+val.wall+"'";
				var data = JSON.stringify(val.config);
				
				if(versao < 5){
					$('.todasAdult').append('<div class="exib-sex" id="sex-'+val.id+'"><div class="img" id="se-'+val.id+'"><a class="clickNone" href="javascript:red('+val.id+', '+name+', '+image+')"></a><img class="lazyload" data-src="'+val.wall+'" src="my/img/load-5.png"><img src="my/img/nn.png" class="nrel" /><div class="minute">'+val.duracao+'</div><span class="play"></span></div><div class="name">'+val.name+'</div><div style="display:none;" id="co-'+val.id+'">'+data+'</div></div>');
				}else{
					$('.todasAdult').append('<div class="exib-sex" id="sex-'+val.id+'"><div class="img" id="se-'+val.id+'"><a class="clickNone" href="javascript:red('+val.id+', '+name+', '+image+')"></a><img class="lazyload" data-src="'+val.wall+'" src="my/img/load-5.png"><img src="my/img/nn.png" class="nrel" /><div class="minute">'+val.duracao+'</div><span class="play"></span></div><div class="name">'+val.name+'</div><div style="display:none;" id="co-'+val.id+'">'+data+'</div></div>');
				}
				
			});
			$('a, .focusable').SpatialNavigation().focus(function() { $(this).css('outline', ''); }).blur(function() { $(this).css('outline', ''); }).first().focus();
			$('.todasAdult').append('<div class="clear"></div>');
			if(versao < 5){ }else{ lazyload(); }
			$('#p-adulto .category-loader').hide();
			$('#p-adulto .page-category').show();
		}
	});
	return false;
}


//
function tvPin(){
	closeCategorias();
	$('.page-pin').show();
	$('#p-tv').hide();
}


//TECLADO 


function bbb(e){
	var q = String($('#num-pin').attr('data-dig'));
	
	var text = q+String(e);	
	$('#num-pin').attr('data-dig', text).html('&#8226;');
	
	var nuu = text.length;
	if(nuu == 1){ $('#num-pin').html('&#8226;'); }else if(nuu == 2){ $('#num-pin').html('&#8226;&#8226;'); }else if(nuu == 3){ $('#num-pin').html('&#8226;&#8226;&#8226;'); }else { $('#num-pin').html('&#8226;&#8226;&#8226;&#8226;'); }
	
	if(nuu == 4){
		if(text == $('#pin').html()){
			$('#pin').attr('data-accept', 1);
			$('#adultPin').hide();
			if(atualView() == 'tv'){
				$('#p-tv').show();
				montaTv(39);
			}else{
				$('#adultPage').show();
				montaAdulto(1);
			}
		}else{
			minMessage('PIN incorreto!')
			$('#num-pin').html('').attr('data-dig', '');
		}
	}
	
	
}

function bb(e){
	var q = String($('#field-busca').text());
	if(e=='_'){
		if(q.length > 0){ var text = q+' ';	}
	}else if(e == '__'){
		if(q.length > 0){ var text = q.substring(0,(q.length - 1)); }
	}else{
		var text = q+String(e);	
	}
	$('#field-busca').text(text);
	if(text.length>1){
		window.setTimeout(function(){ qbusca(text); },500);
	}else{
		notResult();
	}
}

function notResult(){
	$('.result-search').hide().empty();
	$('.sugestion').show();
}

function qbusca(text){
	if(text.length>1){
		var versao = nVersion();
		notResult();
		$('.sugestion').hide();
		$('.result-search').hide();
		$('#p-buscar .search-preloader').show();
		$.post(getLink()+'/app-box-busca.php', {token: breakToken(), accepts: breakDevice(), q: text}, function(dat){
			var data = $.parseJSON(dat);
				$('#p-buscar .search-preloader').hide();
				if(data.TotalBusca>0){
					$('.result-search').show();
					
						$('#b-um').show();
						$('.result-search').empty().html('<div class="lister-home"></div>');			
						jQuery.each(data.loop, function( i, val ) {	
							if(versao < 5){
								$('.result-search .lister-home').append('<div class="grid busc ovNone"><div class="g"><a class="clickNone" href="'+val.link+'"></a><div class="img"><img src="'+val.folder+'" /><div class="shad"></div></div><div class="caption"><h2>'+val.name+'</h2></div></div></div>');	
							}else{
								$('.result-search .lister-home').append('<div class="grid busc ovNone"><div class="g"><a class="clickNone" href="'+val.link+'"></a><div class="img"><img class="lazyload" src="my/img/load-1.png" data-src="'+val.folder+'" /><div class="shad"></div></div><div class="caption"><h2>'+val.name+'</h2></div></div></div>');	
							}		
						});
					
						$('a, .focusable').SpatialNavigation().focus(function() { $(this).css('outline', ''); }).blur(function() { $(this).css('outline', ''); }).first().focus();

						if($('.result-search .lister-home .clear').length == 0){
							$('.result-search .lister-home').append('<div class="clear"></div>')
						}
					if(versao < 5){ }else{ lazyload(); }
				}else{
					$('.result-search').hide().empty();
					$('.sugestion').show();
						
				}
				
		});
	}else{
		$('#p-buscar .search-preloader').hide();
		$('.result-search').hide();
		$('.sugestion').show();
		
	}
	
	return false;
}

/*ACTION-LISTA*/

function addSlist(qual){
	var btn = $('#cLista');
	var btnn = $('#cLista i');
	var btnnn = $('#cLista span');

	var ok = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 26 26" enable-background="new 0 0 26 26"> <path d="m.3,14c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.4-0.4 1-0.4 1.4,0l.1,.1 5.5,5.9c0.2,0.2 0.5,0.2 0.7,0l13.4-13.9h0.1v-8.88178e-16c0.4-0.4 1-0.4 1.4,0l1.4,1.4c0.4,0.4 0.4,1 0,1.4l0,0-16,16.6c-0.2,0.2-0.4,0.3-0.7,0.3-0.3,0-0.5-0.1-0.7-0.3l-7.8-8.4-.2-.3z"></path></svg>';
	var no = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 357 357" style="enable-background:new 0 0 357 357;" xml:space="preserve"><path d="M357,204H204v153h-51V204H0v-51h153V0h51v153h153V204z"></path></svg>';
	
	var v = btn.attr('data-type');
	
	if(v == 'add'){
		btnn.empty().html(ok);
	}else{
		btnn.empty().html(no);
	}
	
	
	$.post(getLink()+'/app-user-lista.php', {token: breakToken(), accepts: breakDevice(), type: 2, qual: qual, update: 1}, function(data){
		if(data.indexOf('error') >=1){
			minMessage('Ocorreu um erro, tente novamente!');
			if(v == 'add'){
				btnn.empty().html(no);
			}else{
				btnn.empty().html(ok);
			}
		}else{
			var json = $.parseJSON(data);
			if(json.add){
				//adicionou
				btn.attr('data-action','del');
				btnn.empty().html(ok);
				minMessage('Adicionado à minha lista.');
				btnnn.empty().html('Remover da minha lista');
			}else{
				//removeu
				btn.attr('data-action','add');
				btnn.empty().html(no);
				btnnn.empty().html('Adicionar à minha lista');
			}

		}
	});
	
	
	return false;
	
}

function addFlist(qual){
	var btn = $('#cLista');
	var btnn = $('#cLista i');
	var btnnn = $('#cLista span');

	var ok = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 26 26" enable-background="new 0 0 26 26"> <path d="m.3,14c-0.2-0.2-0.3-0.5-0.3-0.7s0.1-0.5 0.3-0.7l1.4-1.4c0.4-0.4 1-0.4 1.4,0l.1,.1 5.5,5.9c0.2,0.2 0.5,0.2 0.7,0l13.4-13.9h0.1v-8.88178e-16c0.4-0.4 1-0.4 1.4,0l1.4,1.4c0.4,0.4 0.4,1 0,1.4l0,0-16,16.6c-0.2,0.2-0.4,0.3-0.7,0.3-0.3,0-0.5-0.1-0.7-0.3l-7.8-8.4-.2-.3z"></path></svg>';
	var no = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 357 357" style="enable-background:new 0 0 357 357;" xml:space="preserve"><path d="M357,204H204v153h-51V204H0v-51h153V0h51v153h153V204z"></path></svg>';
	
	var v = btn.attr('data-type');
	
	if(v == 'add'){
		btnn.empty().html(ok);
	}else{
		btnn.empty().html(no);
	}
	
	
	$.post(getLink()+'/app-user-lista.php', {token: breakToken(), accepts: breakDevice(), type: 1, qual: qual, update: 1}, function(data){
		if(data.indexOf('error') >=1){
			minMessage('Ocorreu um erro, tente novamente!');
			if(v == 'add'){
				btnn.empty().html(no);
			}else{
				btnn.empty().html(ok);
			}
		}else{
			var json = $.parseJSON(data);
			if(json.add){
				//adicionou
				btn.attr('data-action','del');
				btnn.empty().html(ok);
				minMessage('Adicionado à  minha lista.');
				btnnn.empty().html('Remover da minha lista');
			}else{
				//removeu
				btn.attr('data-action','add');
				btnn.empty().html(no);
				btnnn.empty().html('Adicionar à  minha lista');
			}

		}
	});
	
	
	return false;
	
}

function noneagora(id, name){
	$('.exibicao .lfg').append('<i>'+id+'</i><marquee>'+name+'</marquee>');	
	$('.coverCaption').show();
	$('.exibicao').fadeIn();
	noexibi();
}


function filterStream(id){
	$('.resolut').hide();
	//closeResolut();
	//pauseNow();
	limpaAgora();
	$('.exibicao').hide();
	$('#nextCanal').val(0);
	$('#prevCanal').val(0);
	$('.menu-canal .relatives a').removeClass('active');
	$('.avan-tv .lod').css('width', '0%');
	
	$('#keyDownCanal').empty().hide(); 
	$('.alert-res a').removeClass('active');
	
	$.post(getLink()+'/app-tv-canal-box.php', {token: breakToken(), accepts: breakDevice(), filter:id }, function(js){
		if(js.indexOf('trigger')>0){ 
			notFound();
		}else{
			var json = $.parseJSON(js); 
			
			if(json.data){
				
				var check = qualPlayer();	
				var data = json.data;
				if(check == 'padrao'){
					if(data.alter.next){
						$('#nextCanal').val(data.alter.next);
					}
					if(data.alter.prev){
						$('#prevCanal').val(data.alter.prev);
					}

					$('#oKeyDonw').show().html(data.name);

					var cover = data.wall.replace('&amp;','&');
					var cover = cover.replace('840&amp;','840&');

					var parde = data.name+' ('+data.format+')';

					$('.quality i').html(data.format);

					$('#iptv-'+data.format).addClass('active');
					if(data.iptv.SD){
						var ee = data.name+' (SD)';
						var sd = "alterQuality('SD', '"+data.iptv.SD+"', '"+cover+"', '"+ data.name+"', "+data.id+")";
						$('#iptv-SD').show().attr('href', 'javascript:'+sd+';');
					}else{
						$('#iptv-SD').hide().removeAttr('href');
					}

					if(data.iptv.HD){
						var ee = data.name+' (HD)';
						var hd = "alterQuality('HD', '"+data.iptv.HD+"', '"+cover+"', '"+ data.name+"', "+data.id+")";
						$('#iptv-HD').show().attr('href', 'javascript:'+hd+';');
					}else{
						$('#iptv-HD').hide().removeAttr('href');
					}

					if(data.iptv.FHD){
						var ee = data.name+' (FHD)';
						var fhd = "alterQuality('FHD', '"+data.iptv.FHD+"', '"+cover+"', '"+ data.name+"', "+data.id+")";
						$('#iptv-FHD').show().attr('href', 'javascript:'+fhd+';');
					}else{
						$('#iptv-FHD').hide().removeAttr('href');
					}
					$('a, .focusable').SpatialNavigation().focus(function() { $(this).css('outline', ''); }).blur(function() { $(this).css('outline', ''); }).first().focus();



					$('.central-page').hide();
					$('.menu').hide();
					$('.clickNone').hide();
					$('.menu-categoria a').hide();
					$('.resolut').show();

					if(data.idNet > 0){ realTimeNow(data.id); }
					if(data.agora){  agora(id, parde, data.agora, data.prox); }else{ noneagora(id, parde); }		
					if(data.categoria == 39){
						var pn = $('#pin').attr('data-accept');
						if(pn == 1){
							playPlayer(data.play, cover, 'tv', data.id, '', data.name, 0);
						}else{
							$('#ct-tv').attr('data-id', data.categoria);
							if(atualView() == 'tv'){
								nonePlayer();
								tvPin();
							}else{
								window.location.href='#tv';
								tvPin();

							}
						}
					}else{
						playPlayer(data.play, cover, 'tv', data.id, '', data.name, 0);
					}	
				}else{
					if(data.iptv.SD){
						var ee = data.name+' (SD)';
						var sd = "castPlayer('"+check+"', '"+data.iptv.SD+"', 'tv')";
						$('#iptvv-SD').show().attr('href', 'javascript:'+sd+',cloTv();');
					}else{
						$('#iptvv-SD').hide().removeAttr('href');
					}

					if(data.iptv.HD){
						var ee = data.name+' (HD)';
						var hd = "castPlayer('"+check+"', '"+data.iptv.HD+"', 'tv')";
						$('#iptvv-HD').show().attr('href', 'javascript:'+hd+',cloTv();');
					}else{
						$('#iptvv-HD').hide().removeAttr('href');
					}

					if(data.iptv.FHD){
						var ee = data.name+' (FHD)';
						var fhd = "castPlayer('"+check+"', '"+data.iptv.FHD+"', 'tv')";
						$('#iptvv-FHD').show().attr('href', 'javascript:'+fhd+',cloTv();');
					}else{
						$('#iptvv-FHD').hide().removeAttr('href');
					}
					$('#nmCanal').html(data.name);
					$('#p-tv .page-category').hide();
					$('#tvExternal').show();
					$('a, .focusable').SpatialNavigation().focus(function() { $(this).css('outline', ''); }).blur(function() { $(this).css('outline', ''); }).first().focus();
				}
			}else{
				$('#indisponivel').show();
			}
		}
	});
		
}

function cloTv(){
	$('#p-tv .page-category').show();
	$('#tvExternal').hide();
}

function filterStreamm(id){
	$('.resolut').hide();
	limpaAgora();
	$('.exibicao').hide();
	$('#nextCanal').val(0);
	$('#prevCanal').val(0);
	$('.menu-canal .relatives a').removeClass('active');
	$('.avan-tv .lod').css('width', '0%');
	
	$('#keyDownCanal').empty().hide(); 
	$('.alert-res a').removeClass('active');
	
	$.post(getLink()+'/app-tv-canal-box.php', {token: breakToken(), accepts: breakDevice(), filter:id }, function(js){
		if(js.indexOf('trigger')>0){ 
			minMessage('Esse número de canal não está disponível!');
		}else{
			var json = $.parseJSON(js); 
			
			if(json.data){
				
				var data = json.data;
				
				if(data.alter.next){
					$('#nextCanal').val(data.alter.next);
				}
				if(data.alter.prev){
					$('#prevCanal').val(data.alter.prev);
				}
							
				$('#oKeyDonw').show().html(data.name);
				
				var cover = data.wall.replace('&amp;','&');
				var cover = cover.replace('840&amp;','840&');
				
				var parde = data.name+' ('+data.format+')';
				
				$('.quality i').html(data.format);
			
				$('#iptv-'+data.format).addClass('active');
				if(data.iptv.SD){
					var ee = data.name+' (SD)';
					var sd = "alterQuality('SD', '"+data.iptv.SD+"', '"+cover+"', '"+ data.name+"', "+data.id+")";
					$('#iptv-SD').show().attr('href', 'javascript:'+sd+';');
				}else{
					$('#iptv-SD').hide().removeAttr('href');
				}
				
				if(data.iptv.HD){
					var ee = data.name+' (HD)';
					var hd = "alterQuality('HD', '"+data.iptv.HD+"', '"+cover+"', '"+ data.name+"', "+data.id+")";
					$('#iptv-HD').show().attr('href', 'javascript:'+hd+';');
				}else{
					$('#iptv-HD').hide().removeAttr('href');
				}
				
				if(data.iptv.FHD){
					var ee = data.name+' (FHD)';
					var fhd = "alterQuality('FHD', '"+data.iptv.FHD+"', '"+cover+"', '"+ data.name+"', "+data.id+")";
					$('#iptv-FHD').show().attr('href', 'javascript:'+fhd+';');
				}else{
					$('#iptv-FHD').hide().removeAttr('href');
				}
				$('a, .focusable').SpatialNavigation().focus(function() { $(this).css('outline', ''); }).blur(function() { $(this).css('outline', ''); }).first().focus();
				
				
				
				$('.central-page').hide();
				$('.menu').hide();
				$('.clickNone').hide();
				$('.menu-categoria a').hide();
				$('.resolut').show();
				
				if(data.idNet > 0){ realTimeNow(data.id); }
				if(data.agora){  agora(id, parde, data.agora, data.prox); }else{ noneagora(id, parde); }		
				if(data.categoria == 39){
					var pn = $('#pin').attr('data-accept');
					if(pn == 1){
						playPlayer(data.play, cover, 'tv', data.id, '', data.name, 0);
					}else{
						$('#ct-tv').attr('data-id', data.categoria);
						if(atualView() == 'tv'){
							nonePlayer();
							tvPin();
						}else{
							window.location.href='#tv';
							tvPin();
							
						}
					}
				}else{
					playPlayer(data.play, cover, 'tv', data.id, '', data.name, 0);
				}	
			}else{
				minMessage('Esse nÃºmero de canal não está disponível!');
			}
		}
	});
		
}
function alterNow(agora, prox){
	if(agora.id){
		$('#nowAgora').val(agora.id);
		$('#now-agora .ind').hide();
		var gem = '';
		if(agora.genero){
			gem = '<i>'+agora.genero+'</i>';
		}
		$('#now-agora .pdo').show().html(agora.name);
		$('#now-agora .caption').show().html(gem+' '+agora.inicio+' - '+agora.fim);
	}else{
		$('#now-agora .pdo').hide();
		$('#now-agora .caption').hide();
	}
	if(prox){
		var gem = '';
		if(prox.genero){
			gem = '<i>'+prox.genero+'</i>';
		}
		$('#now-proximo .pdo').show().html(prox.name);
		$('#now-proximo .caption').show().html(gem+' '+prox.inicio+' - '+prox.fim);
	}else{
		$('#now-proximo .pdo').hide();
		$('#now-proximo .caption').hide();
	}
	
	$('.coverCaption').show();
	$('.exibicao').fadeIn();
	noexibi();
}

function agora(id, name, agora, prox){
	
	$('.exibicao .lfg').append('<i>'+id+'</i><marquee>'+name+'</marquee>');
	if(agora.name){
		$('#nowAgora').val(agora.id);
		$('#now-agora .ind').hide();
		var gem = '';
		if(agora.genero){
			gem = '<i>'+agora.genero+'</i>';
		}
		$('#now-agora .pdo').show().html(agora.name);
		$('#now-agora .caption').show().html(gem+' '+agora.inicio+' - '+agora.fim);
	}else{
		$('#now-agora .pdo').hide();
		$('#now-agora .caption').hide();
	}
	
	
	if(prox.name){
		var gem = '';
		if(prox.genero){
			gem = '<i>'+prox.genero+'</i>';
		}
		$('#now-proximo .pdo').show().html(prox.name);
		$('#now-proximo .caption').show().html(gem+' '+prox.inicio+' - '+prox.fim);
	}else{
		$('#now-proximo .pdo').hide();
		$('#now-proximo .caption').hide();
	}
	
	$('.coverCaption').show();
	$('.exibicao').fadeIn();
	noexibi();
}

function limpaAgora(){
	
	$('.exibicao .lfg').empty();
	$('#now-agora .pdo').hide().empty();
	$('#now-agora .caption').hide().empty();
	$('#now-proximo .pdo').hide().empty();
	$('#now-proximo .caption').hide().empty();
}

var fd = null;

function noexibi(){
	fd = window.setTimeout(function(){
		$('.exibicao').fadeOut();
	}, 8000);
	
}

function closeRes(){
	$('.alert-res').hide();
	exibe();
}

function exibe(){
	clearInterval(fd);
	if($('.alert-res').is(":visible")){
		
	}else{
		$('.exibicao').fadeIn();
		$('.coverCaption').show();
		noexibi();
	}
}

function openResl(){
	pauseNow();
	$('.exibicao').fadeOut();
	$('.alert-res').show();
}

var nower = null;
function pauseNow(){
	clearInterval(nower);
}
function realTimeNow(id){
	
	nower = window.setInterval(function(){
		$.post(getLink()+'/app-tv-nower.php', {id: id, device: 'box'},function(data){
			
			if(data.agora){
				var now = $('#nowAgora').val();
				if(data.agora.id > now){
					if(data.proximo){ var prox = data.proximo; }else{ var prox = null; }
					alterNow(data.agora, prox);
				}
			}
		
		});
	},12000);
	
}


/*CONTROLE*/

function digitaKey(r){
	
	var num = qualNumero(r);


	if(num == ''){
		$('#keyDownCanal').empty().hide();
	}else{
		if(num == 10){ num = 0; }
		var i = $('#keyDownCanal').html();
		if(i==''){
			$('#keyDownCanal').show().html(num);
		}else{
			if($('#keyDownCanal').html().length<3){
				var t = i+''+num;
				$('#keyDownCanal').html(t);
				var dig = $('#keyDownCanal').html();
				var quantos = dig.length;
				if(quantos>2){
					window.setTimeout(function(){ abreCanal(dig); },500);
				}else{
					window.setTimeout(function(){ $('#keyDownCanal').empty().hide(); $('#oKeyDonw').show(); },4000);
				}
			}
		}	
		
	}
}

function abreCanal(id){
	filterStreamm(id);
}



function delAllH(){
	minMessage('Ocrreu um erro tente novamente mais tarde!');
}