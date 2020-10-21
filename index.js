let min = document.querySelector(".min");
let seg = document.querySelector(".seg");
let tempo = document.querySelector(".tempo");
let musica = document.getElementById("musica");
let btn = document.querySelector(".btn");

tempo.innerHTML = ` 00 : 00`;

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
let t;

function iniciarCont() {
  let segundos = parseInt(seg.value);
  let minutos = parseInt(min.value);

  // contagemAtivada esta parada
  //entao inicia
  if (contagemAtivada == false) {
    console.log("INCIANDO CONTAGEM");
    contagemAtivada = true;
    //escrito parar
    btn.innerHTML = "Parar";

    min.disabled = true;
    seg.disabled = true;

    t = setInterval(function () {
      let minStr = minutos <= 9 ? "0" + minutos : minutos;
      let segStr = segundos <= 9 ? "0" + segundos : segundos;

      console.log(`${minStr} : ${segStr}`); //mostra no console o tempo
      tempo.innerHTML = `${minStr} : ${segStr}`; //mostra no innerHTML o tempo

      if (minutos != 0 && segundos == 0) {
        segundos = 60;
        minutos -= 1;
      }

      if (minutos == 0 && segundos == 0) {
        console.log("Tocando som do alarme");
        clearInterval(t);
        btn.style.backgroundColor = "orange";
        btn.innerHTML = "Parar Alarme";
        musica.play();
      }

      segundos -= 1;
    }, 1000);
  } else if (contagemAtivada == true) {
    //para a contagem
    //para o setInterval com clearInterval (parar variavel t)
    console.log("Parando som do alarme");
    min.disabled = false;
    seg.disabled = false;

    contagemAtivada = false;
    btn.innerHTML = "Começar";
    btn.style.backgroundColor = "#f0f0f0";
    musica.pause();
    tempo.innerHTML = ` 00 : 00`;
    clearInterval(t);
  }
}

ate60(seg);
ate60(min);
