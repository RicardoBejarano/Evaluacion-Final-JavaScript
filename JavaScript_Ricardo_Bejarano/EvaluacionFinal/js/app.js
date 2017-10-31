var Calculadora = {
  numPant : document.getElementById('display'),
  tecla : document.getElementsByClassName('tecla'),
  valor : "",
  operador:"",
  operacion:"",
  resultado : "",
  numero: "vacio",
  ultOperacion : "",
  varTemp : 0,
  decimal : false,
  iniciarNum : true,
  operacionCompletada : true,

  init:function(){
    this.eventosMouse()
    Calculadora.reiniciarCalculadora()
  },

  reiniciarCalculadora:function(){
    Calculadora.numPant.innerHTML = 0,
    Calculadora.valor="",
    Calculadora.operador="",
    Calculadora.operacion="",
    Calculadora.resultado = "",
    Calculadora.numero = "vacio",
    Calculadora.ultOperacion = "",
    Calculadora.varTemp = "",
    Calculadora.decimal = false ,
    Calculadora.iniciarNum = true,
    Calculadora.operacionCompletada = false ;
  },
  eventosMouse: function(event){
    for (i=0; i < this.tecla.length; i++){
      this.tecla[i].addEventListener("mousedown",function(event){
        var valor = event.currentTarget.id
        document.getElementById(valor).style="transform:scale(0.9);"
        Calculadora.validarTecla(valor, Calculadora.operador)
      })
      this.tecla[i].addEventListener("mouseup",function(event){
        var valor = event.currentTarget.id
        document.getElementById(valor).style="transform:scale(1);"
      })
    }
  },
  validarTecla:function(valor){
    switch (valor) {
      case "igual":
        numero = String(numero)
        operador="="
        break;
      case "punto":
        numero = "."
        operador = "."
        break;
      case "on":
        numero = ""
        operador = "on"
        Calculadora.reiniciarCalculadora()
        break;
      case "sign":
        numero = "operador"
        operador = "sign"
        break;
      case "por":
        numero="operador"
        operador = "*"
        break;
      case "mas":
        numero="operador"
        operador = "+"
        break;
      case "menos":
        numero="operador"
        operador = "-"
        break;
      case "dividido":
        numero="operador"
        operador = "/"
        break;
      case "0":
        numero = 0
        break;
      case "1":
        numero = 1
        break;
      case  "2":
        numero = 2
        break;
      case "3":
        numero = 3
        break;
      case "4":
        numero = 4
        break;
      case "5":
        numero = 5
        break;
      case "6":
        numero = 6
        break;
      case "7":
        numero = 7
        break;
      case "8":
        numero = 8
        break;
      case "9":
        numero = 9
        break;
      default:
        numero = "No es un número"
        break;
    }
    if ((typeof(numero) == 'number' || numero == ".")){
      if (Calculadora.numPant.innerHTML.length < 8){
        if (Calculadora.iniciarNum == true && Calculadora.operacionCompletada == true){
          Calculadora.reiniciarCalculadora()
        }
        if (numero == 0 && Calculadora.numPant.innerHTML == 0){
          console.log("Debe seleccionar un numero distinto de 0");
        }else{
          if (Calculadora.numPant.innerHTML == 0 || Calculadora.iniciarNum == true){
            Calculadora.varTemp += String(numero)
            Calculadora.varTemp = Number(Calculadora.varTemp)
            Calculadora.numPant.innerHTML = Number(Calculadora.varTemp)
            if(numero == "."){
              Calculadora.varTemp = String("0.")
              Calculadora.numPant.innerHTML = Calculadora.varTemp
              Calculadora.decimal = true
            }
          }else{
            if (numero == "." && Calculadora.decimal == false){
              Calculadora.varTemp += String(numero)
              Calculadora.numPant.innerHTML = String(Calculadora.varTemp)
              Calculadora.decimal = true
            }else{
              if(numero == "." && Calculadora.decimal==true){
                console.log("No puede agregar mas comas al numero");
              }else{
                Calculadora.varTemp +=String(numero)
                Calculadora.numPant.innerHTML = Number(Calculadora.varTemp)
              }
            }
          }
          Calculadora.iniciarNum = false
        }
      }else{
        console.log("Ha ingresado el numero máximo de caracteres permitidos");
      }
    }
    if (typeof(numero) == "string") {
      switch (operador) {
          case "sign":
          operador =""
          Calculadora.cambiarSigno()
          break;
        case "=":
          Calculadora.iniciarNum = true
          Calculadora.realizarOperacion(operador)
          Calculadora.decimal = false
          break;
        case "on":
          console.log("Reiniciar Parámetros");
          break;
        case ".":
          console.log("decimal Habilitado");
          break;
        default:
          Calculadora.numPant.innerHTML = ""
          Calculadora.iniciarNum = true
          if(Calculadora.iniciarNum == true && Calculadora.operacionCompletada == true && operador != "="){
            Calculadora.varTemp = "";
            Calculadora.operacionCompletada = false
            Calculadora.ultOperacion = operador
          }else{
            Calculadora.realizarOperacion(operador)
            Calculadora.operacionCompletada = false
            Calculadora.decimal = false
          }
      }
    }
  },
  realizarOperacion: function(operador) {
    this.verificarOperacion()
    if(operador== "="){
      Calculadora.numPant.innerHTML = Calculadora.resultado
      Calculadora.operacionCompletada = true
      Calculadora.iniciarNum = true
    }else{
      Calculadora.varTemp = ""
      Calculadora.ultOperacion = operador
    }
    Calculadora.numero = Calculadora.resultado
    Calculadora.ajustarResultado()
  },
  verificarOperacion: function(){
    if(Calculadora.numero == "vacio") {
      Calculadora.resultado = Calculadora.varTemp
    }else{
      operaciones="(" +Calculadora.numero+ ")" +Calculadora.ultOperacion+ "(" +Calculadora.varTemp+ ")";
      resultado=eval(operaciones)
      Calculadora.resultado=resultado;
      console.log(operaciones+"="+resultado);
    }
  },
  ajustarResultado:function(){
    pantalla = Calculadora.numPant.innerHTML
    if(pantalla.length > 8){
      var resultadoMaximo = pantalla.slice(0,8);
      Calculadora.numPant.innerHTML = resultadoMaximo;
      Calculadora.numero = Calculadora.numPant.innerHTML
    }
  },
  cambiarSigno: function(){
    var pantalla = Calculadora.numPant.innerHTML
    if (pantalla != 0){
      var resultadoSigno = Number(-Calculadora.numPant.innerHTML)
      Calculadora.numPant.innerHTML = resultadoSigno
    }
    if(Calculadora.operacionCompletada == true && Calculadora.iniciarNum == true){
      Calculadora.numero = resultadoSigno
      Calculadora.varTemp = resultadoSigno
    }else if(Calculadora.operacionCompletada == false && Calculadora.iniciarNum == false){
      Calculadora.varTemp = resultadoSigno
    }
  },
}
Calculadora.init();
