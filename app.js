
let personKilograms, personHeight = 0, inputIsValid = false, canShowResult = false, resultText = '';

class CalculateIMC{

    constructor(personKilograms, personHeight){
        this.personKilograms = parseFloat(personKilograms);
        this.personHeight = parseFloat(personHeight);
    }
    defineStatus() {
        const result = parseFloat(this.personKilograms/(this.personHeight/100)).toPrecision(3);
        switch(true){
            case(result < 0 && result < 15):
                resultText = 'Não é possível medir o seu IMC.';
                break;
            case (result >= 15 && result < 18):
                resultText = `Seu IMC é de <strong>${result} kg/m2</strong>.`;
                getElementById('result-table').style.display = 'table';
                getElementById('magreza').classList.add('active');
                break;
            case (result >= 18 && result < 24):
                resultText = `Seu IMC é de ${result} kg/m2.`;
                getElementById('result-table').style.display = 'table';
                getElementById('normal').classList.add('active');
                break;
            case (result >= 24 && result < 30):
                resultText = `Seu IMC é de ${result} kg/m2.`;
                getElementById('result-table').style.display = 'table';
                getElementById('sobrepeso').classList.add('active');
                break;
            case (result >= 30):
                resultText = `Seu IMC é de <strong>${result} kg/m2</strong>.`;
                getElementById('result-table').style.display = 'table';
                getElementById('obesidade').classList.add('active');
                break;
            default:
                resultText = 'Não é possível medir o seu IMC.';
                break;
        }
        return resultText;
    }
}
class Validations{
    
    constructor(){}

    getAllLiElements(){
        return document.getElementsByClassName('progress-stepper');
    }

    getAllInputElements(){
        return document.getElementsByTagName('input');
    }

    applyErrorMsg(indexLi){
        this.getAllLiElements()[0].children[indexLi].children[2].lastElementChild.classList.add('show');
    }

    removeErrorMsg(indexLi){
        for(var lis of this.getAllLiElements()){
            lis.children[indexLi].children[2].lastElementChild.classList.remove('show');
        }
    }

    removeActiveForElement(indexLi){
        this.getAllLiElements()[0].children[indexLi].classList.remove('fix-last-active');
    }

    addActiveForElement(indexLi){
        this.getAllLiElements()[0].children[indexLi].classList.add('active', 'fix-last-active');
        this.addStatusForType(this.getAllInputElements()[indexLi -1].id);
    }

    applyOrRemoveMsgError(oldIndex, newIndex){
        const inp = this.getAllInputElements()[oldIndex];
        inputIsValid = 
            inp.id === 'person-kilograms' && (inp.value !== "" && parseFloat(inp.value) > 25) || 
            inp.id === 'person-height' && (inp.value !== "" && parseFloat(inp.value) > 55);
        if(inputIsValid){
            inp.setAttribute('valid', true);
            canShowResult = inp.id === 'person-height';
            this.removeActiveForElement(oldIndex);
            this.addActiveForElement(newIndex);
            return false;
        } else {
            inp.setAttribute('valid', false);
            this.applyErrorMsg(oldIndex);
            return false;
        }
    }

    addStatusForType(inputId){
        inputId === 'person-kilograms' ? 
                getElementById('personKG').innerHTML = `: ${getElementById('person-kilograms').value} Kg` : 
                getElementById('personHT').innerHTML = `: ${parseFloat(getElementById('person-height').value)} cm`;
    }
    
}
const validations = new Validations();

function getElementById(elemID){
    return document.getElementById(elemID);
}

function onKeyPress(event){
    validations.removeErrorMsg(event);
    return event.charCode >= 48 && event.charCode <= 57;
}

function nextStep(){
    validations.applyOrRemoveMsgError(0, 1);
}

function result(){
    validations.applyOrRemoveMsgError(1, 2);
    if(canShowResult) {
        const calculateIMC = new CalculateIMC(
            getElementById('person-kilograms').value,
            getElementById('person-height').value);
            getElementById('imc-result').innerHTML = calculateIMC.defineStatus();
            console.log(calculateIMC.defineStatus());
    }
    return false;
}  


