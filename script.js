
const button = document.querySelector(".material-symbols-outlined");
let horaTex = document.querySelector("#hora"); 
let minutoTex = document.querySelector("#minuto");
let segundoTex = document.querySelector("#segundo");
let enter = document.querySelector("#search");
let aviso = document.querySelector(".right p");
const key = "b74023e8fa691037aaa1c471c00e4782";

function relogio(){
let data = new Date();
let hora = data.getHours();
let minuto = data.getMinutes();
let segundos = data.getSeconds();
 horaTex.innerHTML = fixZero(hora);
 minutoTex.innerHTML = fixZero(minuto);
 segundoTex.innerHTML = fixZero(segundos);
 let semana = data.getDay();
 dayName = new Array ("Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado");
 monName = new Array ("Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro");
 document.querySelector(".dia").innerHTML = dayName[semana];
 document.querySelector(".data").innerHTML = `${data.getDate()} de ${monName[data.getMonth()]} ${data.getFullYear()}`;
};

function uploadTela(dados){
    let data = new Date();
 
    document.querySelector(".cidade").innerHTML = `${dados.name}, ${dados.sys.country}`;
    document.querySelector(".temperaturaAtual p").innerHTML = `${Math.floor(dados.main.temp)} ºC`;
    document.querySelector(".humidadePorc").innerHTML = `${Math.floor(dados.main.humidity)} %`;
    document.querySelector(".temperaturaAtual span").innerHTML = dados.weather[0].description;
    document.querySelector(".ventoPct").innerHTML = dados.wind.speed;
    document.querySelector('.temperaturaAtual img').src= `http://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
    console.log(dados)  
};

async function buscarCidade(cidade){
    if(cidade != ""){
        aviso.innerHTML = "";
        let dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&units=metric&lang=pt_br`).then(resposta => resposta.json());
        
        if(dados.cod === 200){
            uploadTela(dados);
            aviso.innerHTML = "";
        }else{
            avisar("Não encontramos essa localização");
        }

    }else{
        avisar("Campo vazio!");
    }
}

function pesquisar(){
    let cidade= document.querySelector("#search").value;
    buscarCidade(cidade);
};

function avisar(msg){
    aviso.innerHTML = msg
};


button.addEventListener("click", pesquisar);
document.addEventListener("keypress", function(e) {
    if(e.key === 'Enter') {
        let btn = document.querySelector(".material-symbols-outlined"); 
      btn.click();
    }
  });

setInterval(relogio,1000);

function fixZero(time) {
    return time <10? "0"+ time : time;
}
relogio();