function getVersion(){return"1.0.2"}
function getSite(){return"https://sys.topflix.com.br"}
function getLink(){return getSite()+"/v2"}
function getAgent(){return navigator.appVersion}
//function ambiente(){return!(0<window.location.href.indexOf("topflixhd"))}
function ambiente(){return true;}
function goBack(){window.history.back()}
function external(n){navigator.app.loadUrl(n,{openExternal:!0})}
function getUrl(){var n=window.location.href,e=n.indexOf("?");return 0<e?n.substr(e+1):null}
function offTela(){ if(ambiente()){ ofFull(); screen.orientation.lock("portrait");window.plugins.insomnia.allowSleepAgain();}}
function onTela(){ if(ambiente()){ onFull(); screen.orientation.lock("landscape");window.plugins.insomnia.keepAwake();}}
function closeApp(){navigator.app.exitApp()}
function wifiConn(){return ambiente()&&navigator.network.connection.type==Connection.NONE?"off":"on"}
function hideKey(){ambiente()&&Keyboard.hide()}
function minMessage(n){ambiente()?window.plugins.toast.showShortBottom(n,function(n){},function(n){}):console.log(n)}
function openSharer(n,e){var o={url:n,chooserTitle:e};window.plugins.socialsharing.shareWithOptions(o,function(n){console.log("Share completed? "+n.completed),console.log("Shared to app: "+n.app)},function(n){console.log("Sharing failed with message: "+n)})}
function isEmail(n){return/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(n)}$(function(){if(ambiente());else{var n=Base64.encode("One=xiaom1&Two=POCOPHONE F1&Tre=null&For=EAAA&Fiv=Android&Six="+getVersion()+"&Sev="+Base64.encode(navigator.userAgent));$("#string").html(n.replace("=",""))}});




