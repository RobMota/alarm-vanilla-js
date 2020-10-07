let min = document.querySelector(".min");
let seg = document.querySelector(".seg");
let tempo = document.querySelector(".tempo");
let musica = document.getElementById("musica");
let btn = document.querySelector(".btn");
tempo.innerHTML = ` 0 : 0`;

function ate60(seletor) {
  for (let i = 0; i <= 60; i++) {
    let options = document.createElement("OPTION");
    let textOptions = document.createTextNode(i);
    
    options.setAttribute("value", i);
    options.appendChild(textOptions);
    seletor.appendChild(options);
  }
}


let contagemAtivada = false;

function iniciarCont() {
  let segundos = parseInt(seg.value);
  let minutos = parseInt(min.value);
  console.log("MINUTOS: " + minutos);
  console.log("SEUNDOS: " + segundos);
  
  
  // contagemAtivada esta parada
  //entao inicia
  if (contagemAtivada == false){
    console.log("INCIANDO CONTAGEM")
    contagemAtivada = true;
    //escrito parar 

    let t = setInterval(function () {
      console.log(`${minutos} : ${segundos}`); //mostra no console o tempo
      tempo.innerHTML = `${minutos} : ${segundos}`; //mostra no innerHTML o tempo
    
      if (minutos != 0 && segundos == -1) {
        console.log("Entrou na condicao 1")
        segundos = 60;
        minutos -= 1;
      }
      
      if (minutos == 0 && segundos == 0) {
        console.log("Entrou na condicao 2")
        clearInterval(t);
        btn.innerHTML = "parar"
        musica.play();
      }

      segundos -= 1;
    }, 1000);

  } else if (contagemAtivada == true){
    //para a contagem
      //para o setInterval com clearInterval (parar variavel t)
      console.log("Parando a contagem")
      contagemAtivada = false;
      clearInterval(t);
      btn.innerHTML = 'começar'
      musica.pause();
  } 
}

ate60(seg);
ate60(min);



