window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
if(!window.indexedDB)
{
  console.log("Seu navegador não suporta o recurso IndexedDB");
}

//DeletaBanco();

	var request = indexedDB.open("TOPFLIXHD", 1);
	var db = null;
	request.onupgradeneeded = function(){
		db = request.result;
		var pessoa = db.createObjectStore("PERSON", {keyPath : "ID"});
		pessoa.createIndex("ID", "ID", {unique: false});
		pessoa.createIndex("NOME", "NOME", {unique: false});
			
		}
	
	request.onsuccess = function(){
		db = request.result;
		console.log(db);
		console.log("Conectado corretamente");
		//window.setTimeout(function(){ checkLogin();},300);
	}
	
	request.onerror = function(event){
		console.log("Error " + event.target.errorCode);
	}
	
	

function DeletaBanco(){    
    var bdDeleta = indexedDB.deleteDatabase("TOPFLIXHD");
    bdDeleta.onerror = function(event) {
        console.log("Error " + event.target.errorCode);
    };
    bdDeleta.onsuccess = function(event) {
        console.log("Deletado com sucesso!");
    };
}

function DBdeleter(id){
	var codigo = id;
	var request = db.transaction(["PERSON"], "readwrite")
	.objectStore("PERSON")
	.delete(codigo);
	request.onsuccess = function(event) {
	}; 
}

function DBinsert(id, nome){
	var codigo = id,
	nome = nome,
	
	data = [],
	transacao = db.transaction("PERSON", "readwrite"),
	store = transacao.objectStore("PERSON");

	data.ID = codigo;
	data.NOME = nome;

	var request = store.put(data);
	
	request.onsuccess = function(event){
		
		console.log("Sucesso ao salvar");
		//listaPessoas();
	}
	
	request.onerror = function(event){
		console.log(event + "Erro ao salvar");
	}
	
}


function DBcheck(){
	var array = [];
	var objectStore = db.transaction("PERSON").objectStore("PERSON");
	objectStore.openCursor().onsuccess = function(event) {
	
	  var cursor = event.target.result;
	  if (cursor) {
		  array.push(cursor.value);
		cursor.continue();
	  }else{
		 var json = 'nada';
		 var tamanho = array.length;
		 console.log(tamanho);
		 if(array[0]){
			 
			 var json = array[0]['NOME'];
			 return json;
		 }else{
			
		 }
	  }
	  
	  return json;
	  
	  
	}
	
	
}
