
function closeMessage(){
	$('.overAlerter').hide();
	$('.alerter').fadeOut(function(){
		$('.alerter').removeClass('ook').removeClass('err');
	});
	
}

function openMessage(msg, cls){
	$('.alerter .p p').empty().html(msg);
	$('.overAlerter').show();
	$('.alerter').addClass(cls).fadeIn();
}


function restForm(){
	$('#l-um input[type="email"]').val('');
	$('#l-dois input[type="password"]').val('');
	$('.sub1 input[type="submit"]').removeAttr('disabled').val('Entrar');
	
	$('#l-tres input[type="email"]').val('');
	$('.sub2 input[type="submit"]').removeAttr('disabled').val('Enviar');
	
	$('#log').val('');
	$('#pass').val('');
	$('#gender').val(1);
	$('#nome').val('');
	$('.sub3 input[type="submit"]').removeAttr('disabled').val('Registrar');
	
	
	
}
	
function recoverLog(){
	restForm();
	$('#formKey').hide();
	$('#formLogin').show().addClass('bounceInUp');
	window.setTimeout(function(){
		$('#formLogin').removeClass('bounceInUp');
	},1000);
	
	
}	
function recoverKey(){
	restForm();
	$('#formLogin').hide();
	$('#formKey').show().addClass('bounceInUp');
	window.setTimeout(function(){
		$('#formKey').removeClass('bounceInUp');
	},1000);
	
}

function dispara(){
	
		$('.content').removeClass('saclle'); 
		$('.fixed-into').addClass('no');
		$('.content__title').click(); 	
		$('.anime-logo .preload').fadeIn();
	
	
	window.setTimeout(function(){
		$('.anime-logo span').addClass('open');
		$('.anime-logo .preload').fadeOut();
		
		var c = wifiConn();
		if(c == 'off'){

			

			window.setTimeout(function(){
				$('.anime-logo .preload').fadeOut();
				$('.content').fadeOut('slow',function(){
					window.location.href='offline.html';
				});

			},1500);
		}else{

			$.post(getLink()+'/index.php', { token: str(), key: getDev(), device: 'tv' }, function(data){
				console.log(data);	
				var dat = $.parseJSON(data);
				if(dat.update){
					window.location.href='update.html';
				}else{
					if(dat.status == 0){
						openView(dat.link)
					}else{
						$('#device').attr('data-device', dat.dispositivo);
						$('.homeTitle').html(dat.homeTitle);
						getHome();
					}
				}
			});
			
			
			
		}
	},500);
}



function checking(){
	
	
	
	window.setTimeout(function(){
	
		
		//var c = wifiConn();
		var c = 'on';
		if(c == 'off'){
			window.setTimeout(function(){
				$('.anime-logo .preload').fadeOut();
				$('.content').fadeOut('slow',function(){
					window.location.href='offline.html';
				});

			},1500);
		}else{
			
			$.post(getLink()+'/index.php', { checking: str(), key: getDev(), device: 'tv' }, function(data){
				var dat = $.parseJSON(data);
				if(dat.update){
					window.location.href='update.html';
				}else{
					if(dat.log == 'ok'){
						directHome();
					}else{
						if(dat.status == 0){
							openView(dat.link)
						}else{
							$('#device').attr('data-device', dat.dispositivo);
							DBdeleter('2');
							$('.homeTitle').html(dat.homeTitle);
							getHome();
						}
					}
				}
			});
			
		
		}
	},500);
}

function devicer(){
	var num = $('#device').attr('data-device');
	$('#device').html(num);
	window.setInterval(function(){
		checkNumber();
	},3000);
}

function checkNumber(){
	var num = $('#device').attr('data-device');
	$.post(getLink()+'/index.php', {number: num, device: 'cel', key: getDev(), device: 'tv' }, function(data){
		var json = $.parseJSON(data);
		if(json.result){
			$('#hashe').html(json.dados.token);
			var dados = JSON.stringify(JSON.stringify(json.dados));
			DBinsert('2', dados);
			window.setTimeout(function(){
				redirectHome();
			},500);
		}
	});
	
}

function directHome(){
	window.location.href='box.html#home';
}

function CheckInit(){
	window.setTimeout(function(){
		
		checking();		
	},1000);
}



function initiall(){
	
	window.setTimeout(function(){
		
		
		window.setTimeout(function(){ 
			
				//online
				dispara();
			

		},1000);
		
	},1000);
	
	
	
	
	
		
}



function getHome(){
	$('.copy').fadeIn();
	$('.top-head').show().addClass('bounceInDown');
	window.setTimeout(function(){ 
		$('.page-left').show().addClass('bounceInLeft'); 
		$('.page-right').show().addClass('bounceInRight'); 
	}, 200);
	$('.anime-logo').fadeOut('slow');
	
}

//FORMS

function redirectHome(){
	$('.backgrounds').fadeOut();
	$('div.menu').hide();
	$('.top-head').hide();
	$('.page-right').hide();
	$('.page-left').hide();
	$('.preload').show();
	$('.anime-logo').fadeIn(function(){
		window.setTimeout(function(){ directHome(); },1000);
	});
}


function hasher(json){
	var h = $.parseJSON(json);
	var hh = $.parseJSON(h);
	if(hh.token != ''){
		$('#hashe').html(hh.token);
	}else{
		DBdeleter('2');
		initiall();
	}
}

//MENU
function homeCorp(){
	$('*').animate({scrollTop:0}, 300);
}
function MenuOver(){
	$('.open-menu').addClass('active');
	$('.menu').show().addClass('aberto');
	$('.pageApp').addClass('overed');
	$('.fechMenu').show();
}
	
function MenuOut(){
	$('.open-menu').removeClass('active');
	$('.menu').removeClass('aberto');
	$('.pageApp').removeClass('overed');
	$('.fechMenu').hide();
}

function OpenMenu(){
	if($('.menu').hasClass("aberto")){
		MenuOut();
	}else{
		MenuOver();
	}
	
}


function getLogin(){
	var login = $('#l-um input[type="email"]').val();
	var senha = $('#l-dois input[type="password"]').val();
	if(login == ''){
		$('#l-um').addClass('rubberBand');$('#l-um input[type="email"]').addClass('err'); window.setTimeout(function(){$('#l-um').removeClass('rubberBand'); $('#l-um input[type="email"]').removeClass('err');},1000);
	}else if(senha == ''){
		$('#l-dois').addClass('rubberBand');  $('#l-dois input[type="password"]').addClass('err'); window.setTimeout(function(){$('#l-dois').removeClass('rubberBand');$('#l-dois input[type="password"]').removeClass('err');},1000);
	}else{
		$('.sub1').attr('disabled', 'disabled').val('Aguarde');
		$.post( getLink()+'/gestao/login.php',  { login: login, pass: senha, key: getDev() }, function(data){
			$('.sub1').removeAttr('disabled').val('Entrar');
			var dat = $.parseJSON(data);
			if(dat.return){
				var json = JSON.stringify(data);
				$('#hashe').html(dat.token);
				DBinsert('2',json);
				redirectHome();
			}else{
				openMessage(dat.erro, 'err');
			}
		});
		
	}
	return false;
}

function getRecover(){
	var login = $('#l-tres input[type="email"]').val();
	if(login == ''){
		$('#l-tres').addClass('rubberBand');$('#l-tres input[type="email"]').addClass('err'); window.setTimeout(function(){$('#l-tres').removeClass('rubberBand'); $('#l-tres input[type="email"]').removeClass('err');},1000);
	
	}else{
		$.ajax({
			url: getLink()+'/gestao/recover.php',
			data: { recover: login },
			cache: false,
			type: "POST",
			headers:{token:str(),accepts: getDev()},
			beforeSend: function(){
				$('.sub2').attr('disabled', 'disabled').val('Aguarde');
			},
			success: function(data){
				$('.sub2').removeAttr('disabled').val('Enviar');
				console.log(data);
				var dat = $.parseJSON(data);
				if(dat.return){
					openMessage('Sua senha foi encaminhada para seu email!', 'ook'); 
				}else{
					openMessage(dat.erro, 'err');
				}
				
				
			},
			error:function(){
				openMessage('Ocorreu um erro, tente novamente!', 'err');
			}
		});
	}
	return false;
}

