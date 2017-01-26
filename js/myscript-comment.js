
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

txtNumero.numeric(false);			//indico que el campo de texto solo acepte números enteros


//Funciones

//listo todos los numeros que se agregarán al array
function listar(){
	if($.inArray(txtNumero.val(), lista) < 0)	//verifico si en el array 'lista' existe el número ingresado
		lista.push(txtNumero.val());			//si no existe, agrego al array

	$('#listaNumeros').html('');				//elimino el contenido de mi 'ul', para luego añadir los item del array
	
	for (var i = 0; i <= lista.length - 1; i++) {
		$('#listaNumeros').append('<li class="collection-item" style="opacity:1; left:0;">'+ lista[i] +'</li>');
	}

	txtNumero.val('');							//limpio mi campo de texto
	txtNumero.focus();							//coloco el foco en el campo de texto
	btnAgregar.addClass('disabled');			//desactivo el boton agregar, para no poder agregar hasta validar el campo (linea 78)
	revisarOrden();								//revisa cuantos item tiene el array
}

//función para poder ordenar mi lista
function ordenarLista(){
	lista2 = lista.sort(function(a,b){return a - b;}); 	//ordeno de manera ascendente en un nuevo array 'lista2'

	$('#listaNumeros').html('');						//elimino el contenido de mi 'ul', para luego añadir los item del nuevo array

	for (var i = 0; i <= lista2.length - 1; i++) {
		$('#listaNumeros').append('<li class="collection-item">'+ lista2[i] +'</li>');
	}
}

//función para animar los item al momento de ordenar
function animar(){
	var duracionBase = 100;								//declaro una duración inicial
	$('#listaNumeros').each(function(i) {
	    var countLi = $(this).children().length;		//contar cuantos 'li' tiene mi 'ul#listaNumeros'
	    $(this).children().each(function(ii) {			//recorro todos los 'li'
	        var li = $(this),
	            tiempo = (i * countLi * duracionBase) + (ii * duracionBase); // calcula un tiempo diferente para cada 'li'
	        window.setTimeout(function() {
	            li.animate({left:0, opacity:1})			//agrego la animación
	        }, tiempo);									//según el tiempo que le indico
	    });
	});
}

//revisa si existe mas de un item en el array, para poder realizar el orden
function revisarOrden(){
	if(lista.length > 1)
		btnOrdenar.removeClass('disabled');		//si existe mas de un item, activa el boton ordenar
	else
		btnOrdenar.addClass('disabled');		//de lo contrario, lo desactiva
}

//validar el campo
txtNumero.keyup(function(e){
	if(txtNumero.val() != ''){											//verifica que el campo no esté vacío
		if(txtNumero.val() >= 0){										//cuando el número es positivo, el botón agregar se activa
			btnAgregar.removeClass('disabled');
			if(e.which == 13)listar();									//al presionar la tecla 'enter', llama a la función listar
		}
		else if(txtNumero.val() < 0 && txtNumero.val().length > 1){		//cuando el número es negativo, el botón agregar se activa
			btnAgregar.removeClass('disabled');
			if(e.which == 13)listar();									//al presionar la tecla 'enter', llama a la función listar
		}
		else{
			btnAgregar.addClass('disabled');
		}				
	}
	else{
		btnAgregar.addClass('disabled');
	}			
})



