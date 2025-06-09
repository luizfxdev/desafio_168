// Função para verificar se um número é palíndromo
function isPalindrome(number) {
  // Converte o número para string
  const str = number.toString()
  // Inverte a string e compara com a original
  return str === str.split('').reverse().join('')
}

// Função principal que encontra todos os palíndromos no intervalo
function palindromeNumbers(start, end) {
  const palindromes = []

  // Garante que start é menor ou igual a end
  if (start > end) {
    ;[start, end] = [end, start] // Troca os valores se necessário
  }

  // Itera por todos os números no intervalo
  for (let i = start; i <= end; i++) {
    if (isPalindrome(i)) {
      palindromes.push(i)
    }
  }

  return palindromes
}

// Função para formatar o texto de cálculo
function formatCalculation(start, end, palindromes) {
  let text = `Intervalo analisado: de ${start} a ${end}\n\n`

  if (palindromes.length === 0) {
    text += `Nenhum número palíndromo encontrado neste intervalo.`
  } else {
    text += `Números palíndromos encontrados (${palindromes.length}):\n`
    text += palindromes.join(', ')

    text += `\n\nProcesso de verificação:\n`
    for (let i = 0; i < Math.min(3, palindromes.length); i++) {
      const num = palindromes[i]
      const str = num.toString()
      text += `- ${num} → "${str}" → "${str.split('').reverse().join('')}" → ${
        str === str.split('').reverse().join('') ? '✅' : '❌'
      }\n`
    }
    if (palindromes.length > 3) {
      text += `- ... e mais ${palindromes.length - 3} números\n`
    }
  }

  return text
}

// Quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  const decipherBtn = document.getElementById('decipher')
  const returnBtn = document.getElementById('return')
  const startInput = document.getElementById('start')
  const endInput = document.getElementById('end')
  const resultDiv = document.getElementById('result')
  const calculationDiv = document.getElementById('calculation')

  // Função para limpar os campos
  function clearFields() {
    startInput.value = ''
    endInput.value = ''
    resultDiv.innerHTML = ''
    calculationDiv.innerHTML = ''
  }

  // Função para processar os números
  function processNumbers() {
    const start = parseInt(startInput.value)
    const end = parseInt(endInput.value)

    // Validação dos inputs
    if (isNaN(start) || isNaN(end)) {
      resultDiv.innerHTML = '<span class="error">Por favor, insira números válidos em ambos os campos.</span>'
      calculationDiv.innerHTML = ''
      return
    }

    // Encontra os palíndromos
    const palindromes = palindromeNumbers(start, end)

    // Exibe os resultados
    if (palindromes.length === 0) {
      resultDiv.innerHTML = 'Nenhum número palíndromo encontrado neste intervalo.'
    } else {
      resultDiv.innerHTML = `Palíndromos encontrados: <strong>[${palindromes.join(', ')}]</strong>`
    }

    // Exibe o cálculo detalhado
    calculationDiv.textContent = formatCalculation(start, end, palindromes)
  }

  // Event listeners para os botões
  decipherBtn.addEventListener('click', processNumbers)

  returnBtn.addEventListener('click', clearFields)

  // Permite pressionar Enter para decifrar
  document.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
      processNumbers()
    }
  })
})
