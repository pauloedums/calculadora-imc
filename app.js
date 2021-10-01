function defineStatus() {
    const personKilograms = parseFloat(document.getElementById('person-kilograms').value),
          personHeight = parseFloat(document.getElementById('person-height').value),
          result = parseFloat(personKilograms/(personHeight/100)).toPrecision(3);

          console.log(result);
    let resultText = '';

    switch(true){
        case(result < 0 && result < 13):
            resultText = 'Não é possível medir o seu IMC.';
            break;
        case(result >= 14 && result < 15):
            resultText = 'Bem vinda Valeria Levitin';
            break;
        case (result >= 15 && result < 18):
            resultText = 'Magreza';
            break;
        case (result >= 18 && result < 24):
            resultText = 'Normal';
            break;
        case (result >= 24 && result < 30):
            resultText = 'Sobrepeso';
            break;
        case (result >= 30):
            resultText = 'Obesidade';
            break;
        case (result >= 343):
            resultText = 'Bem vindo Jon Brower Minnoch';
            break;
        default:
            resultText = 'Não é possível medir o seu IMC.';
            break;
    }

    return resultText;
}
function result(){
    document.getElementById('imc-result').innerHTML = defineStatus();
    return false;
}   

function replaceCommaWithDot(thisEl){
    const el = document.getElementById(thisEl);

    el.addEventListener('keypress', function(e) {
        el.value = el.value.replace('/^\d+$/');
      });
}

