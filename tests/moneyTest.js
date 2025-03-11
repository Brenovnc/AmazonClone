import {formatCurrency} from '../scripts/utils/money.js'

console.log("TestSuit: Testando a função formatCurrency")
console.log("Convertendo cents em dolars:")
console.log(formatCurrency(2095))
console.log("Trabalhando com o zero:")
console.log(formatCurrency(0))
console.log("Arredondando para o cents mais próximo:")
console.log(formatCurrency(2000.5))