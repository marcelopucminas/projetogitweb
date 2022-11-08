console.log("carregou co sucesso")

var dataHora = new Date();
dataHora.setDate(1);
var dia = dataHora.getDate();
var mes = dataHora.getMonth();
var ano = dataHora.getFullYear();

var meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setempbro", "Outrubo", "Novembro", "Dezembro"
];

//aqui eu guardei o elemento body em uma variavel 
var body = document.querySelector('body');

//criei um elemento <h1>
var h1 = document.createElement('h1');

//Inseri um elemento dentro do body
body.appendChild(h1);

//inicio o calendario 
function defineVariaveisDatas() {
    dataHora.setDate(1);
    dia = dataHora.getDate();
    mes = dataHora.getMonth();
    ano = dataHora.getFullYear();
}

function imprimeCalendario() {

    //verifico se já existe algum calendario na tela
    var existe = document.querySelector('table');

    //se existir
    if (existe) {
        //remove o calendario 
        existe.remove();
    }

    // crio o table geral do calendario
    var table = document.createElement('table');
    table.setAttribute('cellpadding', '0');
    table.setAttribute('cellspacing', '0');
    // Crio o thead que vai receber o nome do mes
    var thead = document.createElement('thead');
    // ciro o linha
    var tr = document.createElement('tr');

    // crio coluna que vai ter o botão de voltar 1 mes
    var td = document.createElement('td');
    td.innerHTML = "<button onclick='voltarMes()'> << </button>";
    tr.appendChild(td);

    // Crio a coluna que recebe o mes e o ano 
    var td = document.createElement('td');
    td.setAttribute('colspan', '5');
    td.innerText = meses[mes] + " " + ano;

    tr.appendChild(td);

    // crio coluna que vai ter o botão de avançar o mes 
    var td = document.createElement('td');
    td.innerHTML = "<button onclick='avancarMes()'> >> </button>";
    tr.appendChild(td);

    //crio o tbdy
    var tbody = document.createElement('tbody');

    table.appendChild(thead);
    table.appendChild(tbody);
    thead.appendChild(tr);
    body.appendChild(table);
    imprimeDiasDaSemana(tbody)
    imprimeDiasMesCorrente(tbody);

}


function voltarMes() {
    dataHora.setMonth(dataHora.getMonth() - 1);
    defineVariaveisDatas();
    imprimeCalendario();
}

function avancarMes() {
    dataHora.setMonth(dataHora.getMonth() + 1);
    defineVariaveisDatas();
    imprimeCalendario();
}

function imprimeDiasDaSemana(tbodyRecebidoViaArgumento) {
    var dias = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"];
    var tr = document.createElement('tr');

    for (var dia of dias) {
        var td = document.createElement('td');
        td.innerText = dia;
        tr.appendChild(td);
    }

    tbodyRecebidoViaArgumento.appendChild(tr);

}

function imprimeDiasMesCorrente(tbody) {
    var tr = document.createElement('tr');
    var comecaNoDia = dataHora.getDay();
    var terminaNoDia = null;
    var nDia = 1;
    var x = 1;
    while (nDia <= pegaUltimoDiaMes(dataHora)) {
        var dataHoraCopia = new Date(dataHora);
        dataHoraCopia.setDate(nDia);
        var td = document.createElement('td');

        if (x <= comecaNoDia) {
            td.innerText = "";
        } else {
            td.innerText = nDia;
            terminaNoDia = dataHoraCopia.getDay();
            nDia++;
        }
        tr.appendChild(td);


        if (x % 7 === 0) {
            tbody.appendChild(tr);
            var tr = document.createElement('tr');
        }

        x++;
    }

    var totalTds = 6 - terminaNoDia;

    for (var x = 0; x < totalTds; x++) {
        var td = document.createElement('td');
        td.innerText = "";
        tr.appendChild(td);
    }


    tbody.appendChild(tr);
}

function pegaUltimoDiaMes(data) {
    var dataCopia = new Date(data);
    dataCopia.setMonth(data.getMonth() + 1);
    dataCopia.setDate(1);
    dataCopia.setDate(dataCopia.getDate() - 1);
    return dataCopia.getDate();
}

imprimeCalendario();

