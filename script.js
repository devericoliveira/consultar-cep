const searchCepButton = document.querySelector("button");
const container = document.querySelector("ul");

function searchCep(event) {
  event.preventDefault();

  const inputValue = document.querySelector("input");
  
  if(inputValue.value) {
    validationCepInfos(inputValue.value);
    inputValue.value = '';
    inputValue.focus();
  }
}

async function getCepInfos(cep) {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const datas = await response.json();
  return datas;
}

async function validationCepInfos(cepInput) {
  const datas = await getCepInfos(cepInput);

  if(!datas) {
    showError();
    return;
  }

  showCepInfos(datas);
} 


function showError() {
  const template = `
    <li class="list-group-item">
      <strong>Erro: </strong>
      <span>Insira um cep válido.</span>
    </li>
  `
  container.innerHTML = template;
}

function showCepInfos({cep, logradouro, bairro, localidade}) {
  const template = `
    <li class="list-group-item">
      <strong>Cep: </strong>
      <span>${cep}</span>
    </li>
    <li class="list-group-item">
      <strong>Logradouro: </strong>
      <span>${logradouro}</span>
    </li>
    <li class="list-group-item">
      <strong>Bairro: </strong>
      <span>${bairro}</span>
    </li>
    <li class="list-group-item">
      <strong>Localidade: </strong>
      <span>${localidade}</span>
    </li>
  `

  container.innerHTML = template;
}

searchCepButton.addEventListener("click", searchCep);