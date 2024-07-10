// Función para mostrar advertencias
function mostrarAdvertencia(mensaje, color = "red", fontSize = "16px") {
    const warning = document.querySelector("#warning");
    warning.style.color = color;
    warning.style.fontSize = fontSize;
    warning.innerHTML = mensaje;
}

// Función para validar el texto ingresado
function validarTexto(texto) {
    if (texto == "") {
        return false;
    }
    // Verifica que el texto contenga solo letras minúsculas y espacios
    for (let i = 0; i < texto.length; i++) {
        if ((texto[i] < 'a' || texto[i] > 'z') && texto[i] != ' ') {
            mostrarAdvertencia("Texto inválido. Solo se permiten letras minúsculas y espacios.");
            return false;
        }
    }
    return true;
}

// Función para encriptar el texto según la traducción proporcionada
function encriptarTexto(texto, traduccion) {
    let out = "";
    for (let i = 0; i < texto.length; i++) {
        // Si la letra está en la traducción, la reemplaza; de lo contrario, la deja igual
        if (traduccion[texto[i]]) {
            out += traduccion[texto[i]];
        } else {
            out += texto[i];
        }
    }
    return out;
}

// Función para desencriptar el texto según la traducción proporcionada
function desencriptarTexto(texto, traduccion) {
    // Revierte el proceso de encriptación, sustituyendo las secuencias encriptadas por las letras originales
    for (let letra in traduccion) {
        texto = texto.replace(new RegExp(traduccion[letra], "g"), letra);
    }
    return texto;
}

// Función principal para encriptar el texto
function encriptar(traduccion) {
    document.querySelector("#warning").removeAttribute("style"); // Borra cualquier estilo de advertencia previo
    const textarea = document.querySelector("#texto"); // Obtiene el textarea del HTML
    const texto = textarea.value; // Obtiene el valor del textarea
    const area_default = document.querySelector("#default"); // Obtiene el área predeterminada para mostrar mensajes
    const area_result = document.querySelector("#result"); // Obtiene el área de resultados para mostrar el texto encriptado
    const texto_out = document.querySelector("#texto_out"); // Obtiene el textarea de salida

    if (validarTexto(texto)) { // Valida el texto ingresado
        const textoEncriptado = encriptarTexto(texto, traduccion); // Encripta el texto
        area_default.classList.add("invisible"); // Oculta el área predeterminada
        area_result.classList.remove("invisible"); // Muestra el área de resultados
        texto_out.value = textoEncriptado; // Muestra el texto encriptado en el textarea de salida
    } else {
        area_default.classList.remove("invisible"); // Muestra el área predeterminada si el texto no es válido
        area_result.classList.add("invisible"); // Oculta el área de resultados
    }
}

// Función principal para desencriptar el texto
function desencriptar(traduccion) {
    document.querySelector("#warning").removeAttribute("style"); // Borra cualquier estilo de advertencia previo
    const textarea = document.querySelector("#texto"); // Obtiene el textarea del HTML
    const texto = textarea.value; // Obtiene el valor del textarea
    const area_default = document.querySelector("#default"); // Obtiene el área predeterminada para mostrar mensajes
    const area_result = document.querySelector("#result"); // Obtiene el área de resultados para mostrar el texto desencriptado
    const texto_out = document.querySelector("#texto_out"); // Obtiene el textarea de salida

    if (validarTexto(texto)) { // Valida el texto ingresado
        const textoDesencriptado = desencriptarTexto(texto, traduccion); // Desencripta el texto
        area_default.classList.add("invisible"); // Oculta el área predeterminada
        area_result.classList.remove("invisible"); // Muestra el área de resultados
        texto_out.value = textoDesencriptado; // Muestra el texto desencriptado en el textarea de salida
    } else {
        area_default.classList.remove("invisible"); // Muestra el área predeterminada si el texto no es válido
        area_result.classList.add("invisible"); // Oculta el área de resultados
    }
}

// Función para copiar el texto en el portapapeles
function clipboard() {
    const texto_out = document.querySelector("#texto_out"); // Obtiene el textarea de salida
    navigator.clipboard.writeText(texto_out.value); // Copia el contenido del textarea al portapapeles
}

// Obtiene los elementos del DOM y asigna los event listeners
const enc = document.querySelector('#enc'); // Botón de encriptar
const des = document.querySelector('#des'); // Botón de desencriptar
const copy = document.querySelector('#copiar'); // Botón de copiar

// Traducción utilizada para la encriptación
const traduccion = { "a": "ai", "e": "enter", "i": "imes", "o": "ober", "u": "ufat" };

// Asigna los event listeners a los botones correspondientes
enc.addEventListener('click', function () { encriptar(traduccion); }); // Encriptar al hacer clic en el botón "Encriptar"
des.addEventListener('click', function () { desencriptar(traduccion); }); // Desencriptar al hacer clic en el botón "Desencriptar"
copy.addEventListener('click', function () { clipboard(); }); // Copiar al hacer clic en el botón "Copiar"
