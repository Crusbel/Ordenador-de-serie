
// Variables

var lista = [];
var lista2 = [];
var txtNumero = $('#txtNumero');
var btnAgregar = $('#btnAgregar');
var btnOrdenar = $('#btnOrdenar');

//Acciones

btnAgregar.on('click', function(){
	listar();
});

btnOrdenar.on('click', function(){
	ordenarLista();
	animar();
});

txtNumero.numeric(false);


//Funciones

function listar(){
	if($.inArray(txtNumero.val(), lista) < 0)
		lista.push(txtNumero.val());

	$('#listaNumeros').html('');
	for (var i = 0; i <= lista.length - 1; i++) {
		$('#listaNumeros').append('<li class="collection-item" style="opacity:1; left:0;">'+ lista[i] +'</li>');
	}
	txtNumero.val('');
	txtNumero.focus();
	btnAgregar.addClass('disabled');
	revisarOrden();
}

function ordenarLista(){
	$('#listaNumeros').html('');
	lista2 = lista.sort(function(a,b){return a - b;});

	for (var i = 0; i <= lista2.length - 1; i++) {
		$('#listaNumeros').append('<li class="collection-item">'+ lista2[i] +'</li>');
	}
}

function animar(){
	var duracionBase = 100;
	$('#listaNumeros').each(function(i) {
	    var countLi = $(this).children().length;
	    $(this).children().each(function(ii) {
	        var li = $(this),
	            tiempo = (i * countLi * duracionBase) + (ii * duracionBase);
	        window.setTimeout(function() {
	            li.animate({left:0, opacity:1})
	        }, tiempo);
	    });
	});
}

function revisarOrden(){
	if(lista.length > 1)
		btnOrdenar.removeClass('disabled');
	else
		btnOrdenar.addClass('disabled');
}

txtNumero.keyup(function(e){
	if(txtNumero.val() != ''){
		if(txtNumero.val() >= 0){
			btnAgregar.removeClass('disabled');
			if(e.which == 13)listar();
		}
		else if(txtNumero.val() < 0 && txtNumero.val().length > 1){
			btnAgregar.removeClass('disabled');
			if(e.which == 13)listar();
		}
		else{
			btnAgregar.addClass('disabled');
		}				
	}
	else{
		btnAgregar.addClass('disabled');
	}			
})



