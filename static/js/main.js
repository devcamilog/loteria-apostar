const digitElements = document.querySelectorAll('.digit');
const spinButton = document.getElementById("spin-button");
const lotterySelect = document.getElementById("lottery-select");
const resultElement = document.getElementById("result");
const reloadButton = document.getElementById('reload-button');
const daysOfWeek = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sabado"];
let spinning = false;
const lotteriesByDay = {
    lunes: [
        "CAFETERITO DIA",
        "SINUANO NOCHE",
        "CARIBEÑA DIA",
        "CARIBEÑA NOCHE",
        "CHONTICO DIA",
        "CHONTICO NOCHE",
        "DORADO MAÑANA",
        "DORADO NOCHE",
        "DORADO TARDE",
        "FANTASTICA DIA",
        "FANTASTICA NOCHE",
        "LA ANTIOQUEÑITA DIA",
        "LA ANTIOQUEÑITA TARDE",
        "LOTERIA CUNDINAMARCA",
        "LOTERIA TOLIMA",
        "PAISITA DIA",
        "PAISITA NOCHE",
        "PIJAO",
        "SINUANO DIA",
        "CAFETERITO NOCHE"
    ],
    martes: [
        "CAFETERITO DIA",
        "CAFETERITO NOCHE",
        "CARIBEÑA DIA",
        "CARIBEÑA NOCHE",
        "CHONTICO DIA",
        "CHONTICO NOCHE",
        "DORADO MAÑANA",
        "DORADO NOCHE",
        "DORADO TARDE",
        "FANTASTICA DIA",
        "FANTASTICA NOCHE",
        "LA ANTIOQUEÑITA DIA",
        "LA ANTIOQUEÑITA TARDE",
        "LOTERIA DE LA CRUZ ROJA",
        "LOTERIA HUILA",
        "PAISITA DIA",
        "PAISITA NOCHE",
        "PIJAO",
        "SINUANO DIA",
        "SINUANO NOCHE"
    ],
    miércoles: [
        "CAFETERITO DIA",
        "SINUANO NOCHE",
        "CARIBEÑA DIA",
        "CARIBEÑA NOCHE",
        "CHONTICO DIA",
        "CHONTICO NOCHE",
        "DORADO MAÑANA",
        "DORADO NOCHE",
        "DORADO TARDE",
        "FANTASTICA DIA",
        "FANTASTICA NOCHE",
        "LA ANTIOQUEÑITA DIA",
        "LA ANTIOQUEÑITA TARDE",
        "LOTERIA MANIZALES",
        "LOTERIA META",
        "LOTERIA VALLE",
        "PAISITA DIA",
        "PAISITA NOCHE",
        "PIJAO",
        "SINUANO DIA",
        "CAFETERITO NOCHE"
    ],
    jueves: [
        "CAFETERITO DIA",
        "SINUANO NOCHE",
        "CARIBEÑA DIA",
        "CARIBEÑA NOCHE",
        "CHONTICO DIA",
        "CHONTICO NOCHE",
        "DORADO MAÑANA",
        "DORADO NOCHE",
        "DORADO TARDE",
        "FANTASTICA DIA",
        "FANTASTICA NOCHE",
        "LA ANTIOQUEÑITA DIA",
        "LA ANTIOQUEÑITA TARDE",
        "LOTERIA BOGOTÁ",
        "LOTERIA QUINDIO",
        "PAISITA DIA",
        "PAISITA NOCHE",
        "PIJAO",
        "SINUANO DIA",
        "CAFETERITO NOCHE"
    ],    
    viernes: [
        "CAFETERITO DIA",
        "SINUANO NOCHE",
        "CARIBEÑA DIA",
        "CARIBEÑA NOCHE",
        "CHONTICO DIA",
        "CHONTICO NOCHE",
        "DORADO MAÑANA",
        "DORADO NOCHE",
        "DORADO TARDE",
        "FANTASTICA DIA",
        "FANTASTICA NOCHE",
        "LA ANTIOQUEÑITA DIA",
        "LA ANTIOQUEÑITA TARDE",
        "LOTERIA MEDELLÍN",
        "LOTERIA RISARALDA",
        "LOTERIA SANTANDER",
        "PAISITA DIA",
        "PAISITA NOCHE",
        "PIJAO",
        "SINUANO DIA",
        "CAFETERITO NOCHE"
    ],    
    sabado: [
        "CAFETERITO DIA",
        "SINUANO NOCHE",
        "CARIBEÑA DIA",
        "CARIBEÑA NOCHE",
        "CHONTICO DIA",
        "CHONTICO NOCHE",
        "DORADO MAÑANA",
        "DORADO NOCHE",
        "DORADO TARDE",
        "FANTASTICA DIA",
        "FANTASTICA NOCHE",
        "LA ANTIOQUEÑITA DIA",
        "LA ANTIOQUEÑITA TARDE",
        "LOTERIA BOYACÁ",
        "LOTERIA CAUCA",
        "PAISA 3",
        "PAISITA DIA",
        "PAISITA NOCHE",
        "PIJAO",
        "SINUANO DIA",
        "CAFETERITO NOCHE",
        "EXTRA DE COLOMBIA"
    ],
    domingo: [
        "CAFETERITO NOCHE",
        "CARIBEÑA DIA",
        "CARIBEÑA NOCHE",
        "CHONTICO DIA",
        "CHONTICO NOCHE",
        "DORADO NOCHE",
        "SINUANO NOCHE",
        "LA ANTIOQUEÑITA DIA",
        "LA ANTIOQUEÑITA TARDE",
        "PAISITA DIA",
        "PAISITA NOCHE",
        "PIJAO",
        "SINUANO DIA",
        "FANTASTICA NOCHE"
    ],    
};

function getAvailableLotteries() {
    const today = daysOfWeek[new Date().getDay()];

    if (!lotteriesByDay[today]) {
        return [];
    } else {
        const now = new Date();
        const currentMilitaryTime = now.getHours() * 100 + now.getMinutes(); // Hora militar actual

        const availableLotteries = lotteriesByDay[today].filter((lottery) => {
            const closingTime = getClosingTime(lottery, today);
            return !closingTime || currentMilitaryTime <= closingTime;
        });

        return availableLotteries;
    }
}

function populateLotteryOptions() {
    const availableLotteries = getAvailableLotteries();

    if (availableLotteries.length === 0) {
        resultElement.textContent = "No hay loterías disponibles en este horario";
        spinButton.disabled = true;
    } else {
        spinButton.disabled = false;
    }
}

function isLastSaturdayOfMonth(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Nota: getMonth() devuelve valores de 0 a 11, así que agregamos 1 para obtener el mes correcto.
    const lastDayOfMonth = new Date(year, month, 0);
    const lastSaturday = getLastSaturdayOfMonth(lastDayOfMonth);

    return date.getDate() === lastSaturday && date.getDay() === 6; // 6 representa el sábado
}

//funcion para definir los horarios en la que las loterias estan disponibles
function getClosingTime(lottery, day) {
    // Define los horarios de cierre para cada lotería en formato HHMM (hora militar),
    const closingTimes = {
        "CAFETERITO DIA": { lunes: 1158, martes: 1158 , miercoles: 1200, jueves: 1158, viernes: 1200, sabado: 1158, domingo: 2110}, 
        "SINUANO NOCHE": { lunes: 2230 , martes: 2230 ,miercoles: 2230, jueves: 2230, viernes: 2230, sabado: 2230, domingo: 2030},
        "CARIBEÑA DIA": { lunes: 1430 , martes: 1430, miercoles: 1430, jueves: 1430, viernes: 1430, sabado: 1430, domingo: 1430},
        "CARIBEÑA NOCHE": { lunes: 2230 , martes: 2230, miercoles: 2230, jueves: 2230, viernes: 2230, sabado: 2230, domingo: 2030},
        "CHONTICO DIA": { lunes: 1300 , martes: 1300, miercoles: 1300, jueves: 1300, viernes: 1300, sabado: 1300, domingo: 1300},
        "CHONTICO NOCHE": { lunes: 1900 , martes: 1900, miercoles: 1900, jueves: 1900, viernes: 1900, sabado: 2200, domingo: 2000},
        "DORADO MAÑANA": { lunes: 1055 , martes: 1055, miercoles: 1055, jueves: 1055, viernes: 1055, sabado: 1055},
        "DORADO NOCHE": { lunes: 2215 , martes: 2215, miercoles: 2215, jueves: 2215, viernes: 2215, sabado: 2215, domingo: 1925},
        "DORADO TARDE": { lunes: 1525 , martes: 1525, miercoles: 1525, jueves: 1525, viernes: 1525, sabado: 1525},
        "FANTASTICA DIA": { lunes: 1300, martes: 1300 , miercoles: 1300 , jueves: 1300, viernes: 1300, sabado: 1300},
        "FANTASTICA NOCHE": { lunes: 2030, martes: 2030 , miercoles: 2230, jueves: 2030, viernes: 2030, sabado: 2030},
        "LA ANTIOQUEÑITA DIA": { lunes: 1000, martes: 1000, miercoles: 1000, jueves: 1000, viernes: 1000, sabado: 1000, domingo: 1200},
        "LA ANTIOQUEÑITA TARDE": { lunes: 1600, martes: 1600 ,miercoles: 1600, jueves: 1600, viernes: 1600, sabado: 1600, domingo: 1600},
        "LOTERIA CUNDINAMARCA": { lunes: 2225},
        "LOTERIA TOLIMA": { lunes: 2230 },
        "LOTERIA DE LA CRUZ ROJA": { martes: 2230},
        "LOTERIA HUILA": { martes: 2230},
        "LOTERIA MANIZALES":{miercoles: 2230},
        "LOTERIA META":{miercoles: 2230},
        "LOTERIA VALLE":{miercoles: 2230},
        "LOTERIA BOGOTÁ":{jueves:2225},
        "LOTERIA QUINDIO":{jueves:2230},
        "LOTERIA MEDELLÍN":{viernes: 2300},
        "LOTERIA RISARALDA":{viernes: 2300},
        "LOTERIA SANTANDER":{viernes: 2300},
        "LOTERIA BOYACÁ":{sabado: 2230},
        "LOTERIA CAUCA":{sabado: 2300},
        "PAISA 3":{sabado: 2200},
        "PAISITA DIA": { lunes: 1300 , martes: 1300, miercoles: 1300, jueves: 1300, viernes: 1300, sabado: 1300, domingo: 1400},
        "PAISITA NOCHE": { lunes: 1800 , martes: 1800, miercoles: 1800, jueves: 1800 , viernes: 1800, sabado: 1800, domingo: 2000},
        "PIJAO": { lunes: 1400 , martes: 1400, miercoles: 1400, jueves: 1400 , viernes: 1400, sabado: 2100, domingo: 2000},
        "SINUANO DIA": { lunes: 1430 , martes: 1430, miercoles: 1430, jueves: 1430 , viernes: 1430, sabado: 1430, domingo: 1430},
        "CAFETERITO NOCHE": { lunes: 1955, martes: 1955, miercoles: 1955, jueves: 1955 , viernes: 1955, sabado: 1955},
        "FANTASTICA NOCHE": { domingo: 2030},
        "EXTRA DE COLOMBIA":{sabado: 2145} 
    };

    return closingTimes[lottery] && closingTimes[lottery][day];
}

populateLotteryOptions();

spinButton.addEventListener("click", () => {
    const availableLotteries = getAvailableLotteries();

    if (availableLotteries.length === 0) {
        resultElement.textContent = "No hay loterías disponibles en este horario";
    } else {
        const randomIndex = Math.floor(Math.random() * availableLotteries.length);
        const selectedLottery = availableLotteries[randomIndex];
        const numberOfNumbers = document.getElementById("number-of-numbers").value;
        resultElement.textContent = `${selectedLottery}`;
    }
});

// Función para obtener el último sábado del mes
function getLastSaturdayOfMonth(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Nota: getMonth() devuelve valores de 0 a 11, así que agregamos 1 para obtener el mes correcto.
    const lastDayOfMonth = new Date(year, month, 0);
    let lastSaturday = null;

    for (let day = lastDayOfMonth.getDate(); day >= 1; day--) {
        const currentDate = new Date(year, month - 1, day);
        if (currentDate.getDay() === 6) {
            lastSaturday = day;
            break;
        }
    }

    return lastSaturday;
}

// Funcion para recargar la pagina
reloadButton.addEventListener('click', function() {
    location.reload();
});

function getRandomDigit() {
    return Math.floor(Math.random() * 10);
}

async function spinDigit(digitElement, finalDigit) {
    return new Promise(resolve => {
        const animationDuration = 120; // Duración de la animación en milisegundos
        const frameDuration = 1000 / 60; // Duración de un fotograma (60 FPS)
        const frames = Math.ceil(animationDuration / frameDuration);
        const increment = (finalDigit * 100) / frames; // Ajusta el valor 100 para centrar correctamente
        let currentY = 0;
        let frame = 0;
        function animate() {
            currentY -= increment;
            digitElement.style.transform = `translateY(${currentY}%)`;
            frame++;
            if (frame < frames) {
                requestAnimationFrame(animate);
            } else {
                digitElement.style.transform = `translateY(-${finalDigit * 100}%)`; // Ajusta el valor 100
                resolve();
            }
        }
        animate();
    });
}

async function startSpinning() {
    if (spinning) return;
        spinning = true;
        const finalDigits = [
            getRandomDigit(),
            getRandomDigit(),
            getRandomDigit(),
            getRandomDigit()
        ];

    for (let i = 0; i < digitElements.length; i++) {
        await spinDigit(digitElements[i], finalDigits[i]);
    }

    setTimeout(() => {
        const today = new Date();      
        spinning = false;
    }, 100);
}


function handleOption() {
    var selectElement = document.getElementById('number-of-numbers');
    var selectedValue = selectElement.value;

    // Obtener todos los elementos con la clase "digit"
    var digitElements = document.getElementsByClassName('digit');

    // Ocultar todos los elementos
    for (var i = 0; i < digitElements.length; i++) {
        digitElements[i].style.display = 'none';
    }

    // Mostrar solo los elementos seleccionados de izquierda a derecha
    for (var i = digitElements.length - 1; i >= digitElements.length - selectedValue; i--) {
        digitElements[i].style.display = 'block';
    }
}


