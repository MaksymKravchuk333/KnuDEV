var firstValue = 1;
let secondValue = "Hello World!";
const thirdValue = true;


x = 5;
y = 6;
z = x + y;

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("button").forEach(button => {
        button.addEventListener("click", function () {
            console.log(`[Console] User pressed the button: "${this.innerText}"`);
        });
    });
    document.querySelectorAll("input, textarea").forEach(input => {
        input.addEventListener("input", function () {
            console.log(`[Console] User enter the value in "${this.name || this.id || 'no name'}": ${this.value}`);
        });
    });
});

    function calculate(){
        try{
            let customerValue = document.getElementById("user_expression").value;
            let result = eval(customerValue);
            document.getElementById("result_of_expression").innerHTML = "Hello, the sum is : " + result;
        } catch (error) {
            document.getElementById("result_of_expression").innerHTML = "Error!";
        }
    }

    function setName(){
        try{
            let getName = document.getElementById("user_name").value;
            document.getElementById("greeting_message").innerHTML = "Hello, " + getName + "!";
        }
        catch(error){
            document.getElementById("greeting_message").innerHTML = "Error" + getName + "!";
        }
    }

    async function getWeather() {
        const apiKey = '71cfcde53aeb4483b3a83001251202';
        const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Kyiv&lang=en`;
    
        try {
            const response = await fetch(url);
            const data = await response.json();
    
            const date = new Date().toLocaleDateString('en-EN');
            const temp = Math.round(data.current.temp_c);
            const weatherDesc = data.current.condition.text; 
            const time = data.location.localtime.split(" ")[1];
    
            document.getElementById('weather-result').innerHTML = `
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Time:</strong>${time}</p>
                <p><strong>Temperature:</strong> ${temp}°C</p>
                <p><strong>Precipitation:</strong> ${weatherDesc}</p>
            `;
        } catch (error) {
            document.getElementById('weather-result').innerHTML = `<p>Ошибка загрузки данных</p>`;
        }
    }


    // Запускаем функцию при загрузке страницы
    getWeather();