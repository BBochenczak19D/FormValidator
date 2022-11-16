//const age = document.querySelector('input[name="age"]')
//const firstname = document.querySelector('input[name="firstname"]')

const form = document.querySelector('form')
let alerts = document.querySelector('.alerts')

const phoneFormat =  /^\+[1-9]\d{1,14}$/
const emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
function isValidPesel(pesel) {
    let weight = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    let sum = 0;
    let controlNumber = parseInt(pesel.substring(10, 11));

    for (let i = 0; i < weight.length; i++) {
        sum += (parseInt(pesel.substring(i, i + 1)) * weight[i]);
    }
    sum = sum % 10;
    return (10 - sum) % 10 === controlNumber;
}
var isValidIsbn = function(str) {

    var sum,
        weight,
        digit,
        check,
        i;

    str = str.replace(/[^0-9X]/gi, '');

    if (str.length != 10 && str.length != 13) {
        return false;
    }

    if (str.length == 13) {
        sum = 0;
        for (i = 0; i < 12; i++) {
            digit = parseInt(str[i]);
            if (i % 2 == 1) {
                sum += 3*digit;
            } else {
                sum += digit;
            }
        }
        check = (10 - (sum % 10)) % 10;
        return (check == str[str.length-1]);
    }

    if (str.length == 10) {
        weight = 10;
        sum = 0;
        for (i = 0; i < 9; i++) {
            digit = parseInt(str[i]);
            sum += weight*digit;
            weight--;
        }
        check = (11 - (sum % 11)) % 11
        if (check == 10) {
            check = 'X';
        }
        return (check == str[str.length-1].toUpperCase());
    }
}
console.log(alerts)

form.addEventListener('submit',(e)=>{
    //console.log(form.pesel.value)
    alerts.innerHTML = ''
    var alertTab = []
    Data = [
        {
            value: form.firstName.value,
            method: function() {
                if (this.value.length < 2){
                   return false
                }
            }
        },
        {
            value: form.lastName.value,
            method: function() {
                if (this.value.length < 2){
                    alertTab.push('Za krótkie nazwisko!')
                    return false
                }
            }
        },
        {
            value: form.age.value,
            method: function() {
                const wiek = this.value
                if (Number(wiek) < 2 || Number(wiek) > 99)
                    alertTab.push('Wpisz klase')
                console.log(wiek)}
        },
        {
            value: form.email.value,
            method: function() {
                this.value = String(this.value)
                if(!this.value.match(emailFormat)) alertTab.push('Niepoprawny email')
                ;}
        },
        {
            value: form.pesel.value,
            method: function() {
                if(!isValidPesel(this.value)) alertTab.push('Niepoprawny pesel!')
            }
        },
        {
            value: form.gender.value,
            method: function() {
                if(this.value === '') alertTab.push("Nie wybrano płci")
                console.log(this.value)}
        },
        {
            value: form.tel.value,
            method: function() {
                if(!this.value.match(phoneFormat)) alertTab.push("Niepoprawny nr telefonu")
                return false}
        },
        {
            value: form.class.value,
            method: function() {
                if(this.value === '') alertTab.push('Wpisz klasę')
                console.log(this.value)}
        },
        {
            value: form.title.value,
            method: function() {
                if (this.value.length < 2){
                    alertTab.push('Wprowadz poprawny tytuł')
                }
            }
        },
        {
            value: form.publisher.value,
            method: function() {
                if (this.value.length < 2){
                    alertTab.push('Za krótka nazwa wydawcy!')
            }
        }
        },
        {
            value: form.isbn.value,
            method: function() {
                if (!isValidIsbn(this.value) || this.value == "") alertTab.push('Niepoprawny ISBN')
            }
        },
        {
            value: form.notes.value,
            method: function() {console.log(this.value)}
        },
    ]
    Data.forEach((item) => {
        item.method();
      });
    alertTab.forEach((item)=>{
        alerts.innerHTML+=`${item}` + "<br>"
    })
})
