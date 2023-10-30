
const button = document.querySelector(".material-symbols-outlined");
let horaTex = document.querySelector("#hora"); 
let minutoTex = document.querySelector("#minuto");
let segundoTex = document.querySelector("#segundo");
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
    document.querySelector('.temperaturaAtual img').src= `http://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
    console.log(dados)
    console.log(data)
    
};

async function buscarCidade(cidade){
    let dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&units=metric&lang=pt_br`).then(resposta => resposta.json());
    uploadTela(dados);
}

function pesquisar(){
    let cidade= document.querySelector("#search").value;
    buscarCidade(cidade);
};


button.addEventListener("click", pesquisar);
setInterval(relogio,1000);

function fixZero(time) {
    return time <10? "0"+ time : time;
}
relogio();