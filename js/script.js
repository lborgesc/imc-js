// EXPLICAÇÃO SOBRE JSON E LOCAL STORAGE

// let pessoa = {
//     nome: "Eduardo",
//     idade: 38
// }

// let stringPessoa = JSON.stringify(pessoa);

// console.log(pessoa);
// console.log(stringPessoa);

// localStorage.setItem("pessoa", pessoa);
// localStorage.setItem("stringPessoa", stringPessoa);


// console.log(JSON.parse(localStorage.getItem("stringPessoa")));
// localStorage.setItem("listaPessoas", 'teste');


// COMEÇO DO PROGRAMA

let listaPessoas; //underfined


if (localStorage.getItem("listaPessoas") == null) //não tem dados
{
    listaPessoas = [];
} else {
    //inicializa com os dados do storage
    listaPessoas = JSON.parse(localStorage.getItem("listaPessoas"));
}


exibeResultado();// Roda a função pra ele exibir os cadastrosm caso existam



// função para calcular IMC 
// Recebe altura e peso retorna o calculo
function calcularIMC(a, p) {
    return p / (a * a)

}

function geraSituacao(imc) {
    /*
           Resultado	        Situação
           Menor que 18.5      Magreza severa
           Entre 18,5 e 24,99	Peso normal
           Entre 25 e 29,99	Acima do peso
           Entre 30 e 34,99	Obesidade I
           Entre 35 e 39,99	Obesidade II (severa)
           Acima de 40         Cuidado!!!
       */

    if (imc < 18.5) {
        return "Magreza severa";
    } else if (imc >= 18.5 && imc <= 24.99) {
        return "Peso normal";
    } else if (imc >= 25 && imc <= 29.99) {
        return "Acima do peso";
    } else if (imc >= 30 && imc <= 34.99) {
        return "Obesidade I";
    } else if (imc >= 35 && imc <= 39.99) {
        return "Obesidade II (severa)";
    } else {
        return "Cuidado!!!";
    }

}



function calcular() {
    // pegar os dados do formulario

    let nome = document.getElementById('nome').value;
    let altura = parseFloat(document.getElementById('altura').value);
    let peso = parseFloat(document.getElementById('peso').value);

    if (nome == "" || isNaN(altura) || isNaN(peso)) {//esqueceu campo sem preencher
        alert('Preencha todos os campos!');
    } else {


        // calcular o imc
        let imc = calcularIMC(altura, peso);

        // Gerarar a situação,  baseada no imc 
        let situacao = geraSituacao(imc);

        // guardar o imc e a sitaução no objeto pessoa
        let pessoas = {};

        pessoas.nome = nome;
        pessoas.altura = altura;
        pessoas.peso = peso.toFixed(2);
        pessoas.imc = imc.toFixed(2);
        pessoas.situacao = situacao;

        //Cadastra na lista de pessoas 
        listaPessoas.push(pessoas);
        localStorage.setItem("listaPessoas", JSON.stringify(listaPessoas));


        // Exibir a pessoa na tela 
        exibeResultado();

    }
    
    // fim da função calcular
}

function exibeResultado() {
    let template = "";


    for (let i = 0; i < listaPessoas.length; i++) {

        template += `
        <tr>                                                     
        <td>${listaPessoas[i].nome}</td>
        <td>${listaPessoas[i].altura}</td>
        <td>${listaPessoas[i].peso}</td>
        <td>${listaPessoas[i].imc}</td>
        <td>${listaPessoas[i].situacao}</td>
        </tr>`;


    }
    document.getElementById('cadastro').innerHTML = template;
}
