

function cambioG(valor) {
    let iconoG = document.getElementById('imgGenero');

    if (valor === "mas") {
        iconoG.src = 'images/male.png';
        console.log("Entra");
    } else if (valor === "fem") {
        iconoG.src = 'images/female.png';
        console.log("Entra");
    }
}

function calcularEdad() {
    let iconoE = document.getElementById('imgGeneracion');
    var fechaNacimiento = new Date(document.getElementById("fechaNace").value);
    var fechaActual = new Date();
    fechaActual.setDate(fechaActual.getDate() - 1);
    fechaActual.setHours(0, 0, 0, 0);
    var edad = -1; 

    if (fechaNacimiento >= fechaActual) {
        if (fechaNacimiento.toDateString() === fechaActual.toDateString()) {
            alert("La fecha de nacimiento no puede ser igual al día de hoy");
        } else {
            alert("La fecha de nacimiento no puede ser igual o posterior al día de hoy");
        }
    } else {
        var diferencia = fechaActual - fechaNacimiento;
        edad = Math.floor(diferencia / (1000 * 60 * 60 * 24 * 365.25));
        if (edad >= 0 && edad <= 6) {
            iconoE.src = 'images/GenAlpha.png';

        } else if (edad >= 7 && edad <= 21) {
            iconoE.src = 'images/GenZ.png';

        } else if (edad >= 22 && edad <= 36) {
            iconoE.src = 'images/GenY.png';

        } else if (edad >= 37 && edad <= 51) {
            iconoE.src = 'images/GenX.png';

        } else if (edad >= 52 && edad <= 70) {
            iconoE.src = 'images/BabbyBoomers.png';

        } else {
            iconoE.src = 'images/Builders.png';

        }
    }
    return edad;
}


function calcularCostoSeguro() {
    var iconoE = document.getElementById('imgGeneracion');
    if (iconoE.src.includes("Builders")) {
        alert("Lo sentimos, los clientes de la generación 'Builders' no califican para el seguro.");
        return;
    }
    
    var enfermedad = parseFloat(document.getElementById("cboEnfermedad").value);
    if (enfermedad === -1) {
        alert("Lo sentimos, los clientes con enfermedad terminal no califican para el seguro.");
        return;
    }

    var fechaNacimiento = new Date(document.getElementById("fechaNace").value);
    var edad = calcularEdad(fechaNacimiento);
    
    if (edad < 0) {
        alert("Por favor, introduzca una fecha de nacimiento válida.");
        return;
    }

    var genero = document.querySelector('input[name="rbtG"]:checked').value;
    var drogas = document.querySelector('input[name="rbtD"]:checked').value;
    var enfermedad = parseFloat(document.getElementById("cboEnfermedad").value);

    var factorBase = genero === "mas" ? 0.0012 : 0.0009;
    var factorBaseEdad = Math.sqrt(edad) / 1000;
    var factorAplicable = factorBase + factorBaseEdad;

    var factorRecargo = 0;
    if (drogas === "S") {
        factorRecargo += 0.2000;
    }
    factorRecargo += enfermedad;

    var tarifaFinal = factorAplicable + (factorAplicable * factorRecargo);

    var montoAsegurado = parseFloat(document.getElementById("txtMonto").value);

    var costoTotalSeguro = montoAsegurado * tarifaFinal;

    costoTotalSeguro = Math.ceil(costoTotalSeguro * 100) / 100;

    document.getElementById("lblCostoSeguro").textContent = "Costo del seguro: " + costoTotalSeguro.toFixed(2);
}



const apiUrl = 'http://apilayer.net/api/list?access_key=b758c97bcd6b957565decc9b4f798252&format=1';
const selectMonedas = document.getElementById('cboMonedas');

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const monedas = Object.keys(data.currencies);
        monedas.forEach(moneda => {
            const option = document.createElement('option');
            option.value = moneda;
            option.textContent = `  ${data.currencies[moneda]}`;
            selectMonedas.appendChild(option);
        });
        selectMonedas.value = 'USD';
    })
    .catch(error => console.error('Error al obtener datos de la API:', error));

    