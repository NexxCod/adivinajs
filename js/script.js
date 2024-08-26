document.addEventListener('DOMContentLoaded', function() {
    // Generar un número aleatorio entre 1 y 100
    let randomNumber = generateRandomNumber(1, 100);
    const maxAttempts = 10; // Número máximo de intentos permitidos
    let attempts = 0; // Intentos realizados

    const guessInput = document.getElementById('guessInput');
    const guessButton = document.getElementById('guessButton');
    const message = document.getElementById('message');
    const attemptsDisplay = document.getElementById('attempts');

    // Mostrar el número de intentos restantes al inicio
    updateAttemptsDisplay(maxAttempts - attempts);

    // Evento de clic para el botón de adivinar
    guessButton.addEventListener('click', function() {
        handleGuess();
    });

    /**
     * Función que maneja el intento de adivinanza del usuario
     */
    function handleGuess() {
        let userGuess = parseInt(guessInput.value);

        // Validar la entrada del usuario
        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            message.textContent = "Por favor, introduce un número válido entre 1 y 100.";
            return; // Salir de la función si la entrada no es válida
        }

        // Usar un bucle while para gestionar los intentos del usuario
        while (attempts < maxAttempts) {
            attempts++; // Incrementar el contador de intentos

            if (userGuess === randomNumber) {
                message.textContent = "¡Felicidades! Adivinaste el número correcto.";
                endGame();
                break; // Salir del bucle si el usuario adivina correctamente
            } else {
                message.textContent = userGuess < randomNumber ? "El número es mayor." : "El número es menor.";
                
                // Verificar si los intentos han llegado al máximo
                if (attempts >= maxAttempts) {
                    message.textContent = `Lo siento, te has quedado sin intentos. El número era ${randomNumber}.`;
                    endGame();
                    break; // Terminar el juego si se han usado todos los intentos
                } else {
                    updateAttemptsDisplay(maxAttempts - attempts);
                }

                break; // Salir del bucle para esperar el próximo intento
            }
        }

        // Limpiar el campo de entrada
        guessInput.value = '';
    }

    /**
     * Genera un número aleatorio entre min y max (inclusive)
     * @param {number} min - Número mínimo
     * @param {number} max - Número máximo
     * @returns {number} - Número aleatorio generado
     */
    function generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Actualiza el número de intentos restantes en la interfaz de usuario
     * @param {number} attemptsLeft - Número de intentos restantes
     */
    function updateAttemptsDisplay(attemptsLeft) {
        attemptsDisplay.textContent = `Intentos restantes: ${attemptsLeft}`;
    }

    /**
     * Termina el juego deshabilitando el botón de adivinar
     */
    function endGame() {
        guessButton.disabled = true;
    }

});
