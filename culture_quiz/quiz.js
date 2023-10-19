URL = "https://anapioficeandfire.com/api/characters/"

function reload() {
    location.reload()
}

function get_culture() {
    let num = Math.floor(Math.random() * (2030 - 1) + 1);
    return fetch(URL + num)
        .then((res) => res.json())
        .then((data) => {
            return data.culture;
        });
}

function check_answer(right_culture, selected, button_id) {
    let button = document.getElementById(button_id);
    if (right_culture == selected) { button.style.backgroundColor = "green" }
    else { button.style.backgroundColor = "red" }
}

async function make_test() {
    try {
        let num = Math.floor(Math.random() * (2030 - 1) + 1);
        let response = await fetch(URL + num);
        let data = await response.json();
        while (!data.culture) {
            num = Math.floor(Math.random() * (2030 - 1) + 1);
            response = await fetch(URL + num);
            data = await response.json();
        }
        let character_name = document.getElementById("character-name");
        character_name.textContent = data.name;
        let culture_list = []
        culture_list.push(data.culture)
        while (culture_list.length < 4) {
            const culture = await get_culture();
            if (culture && culture_list.indexOf(culture) === -1) { culture_list.push(culture) }
        }
        culture_list = culture_list.sort(() => Math.random() - 0.5)
        for (let i = 1; i < culture_list.length + 1; i++) {
            let id = "ans" + i
            let button = document.getElementById(id);
            button.textContent = culture_list[i - 1]
            button.onclick = () => check_answer(data.culture, culture_list[i - 1], id)
        }
    } catch (error) {
        console.error(error);
    }
}

make_test();