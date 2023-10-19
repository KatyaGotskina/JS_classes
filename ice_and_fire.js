function get_info_character(num) {
    url = "https://anapioficeandfire.com/api/characters/" + num;
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            let characterContainer = document.getElementById("Character-info");
            characterContainer.innerHTML=""
            let name = document.createElement("H2");
            let culture = document.createElement("H2");
            let titles = document.createElement("H1");
            titles.textContent = data.titles.join(", ");
            name.style.color = "green";
            name.textContent = data.name;
            if (data.playedBy[0]) {
                name.textContent += " - " + data.playedBy;
            }
            if (data.tvSeries[0]) {
                for (i = 0; i < data.tvSeries.length; i++) {
                    if (i === 0) {
                        name.textContent += " (";
                    }
                    name.textContent += data.tvSeries[i];
                    if (i != data.tvSeries.length - 1) name.textContent += " ";
                    else if (i === data.tvSeries.length - 1) {
                        name.textContent += ")";
                    }
                }
            }
            titles.style.textAlign = "center";
            name.style.textAlign = "center";
            culture.style.textAlign = "center";
            culture.style.color = "red";
            characterContainer.appendChild(titles);
            characterContainer.appendChild(name);
            if (data.culture) {
                culture.textContent = data.culture;
                characterContainer.appendChild(culture);
            }
            for (i = 0; i < data.aliases.length; i++) {
                let aliase = document.createElement("H3");
                aliase.textContent = data.aliases[i];
                characterContainer.appendChild(aliase);
            }
        })
        .catch((err) => console.log(err));
}

function get_character() {
    let input = document.getElementById("input-num");
    get_info_character(input.value);
}
