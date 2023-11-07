class Quiz {
    constructor() {
        this.apiUrl = "https://anapioficeandfire.com/api/characters/";
        this.currentQuestion = 0;
        this.correctAnswers = 0;
        this.IsFirstCorrect = true;
    }

    get_culture() {
        let num = Math.floor(Math.random() * (2030 - 1) + 1);
        return fetch(this.apiUrl + num)
            .then((res) => res.json())
            .then((data) => {
                return data.culture;
            });
    }

    check_answer(right_culture, selected, button_id) {
        let button = document.getElementById(button_id);
        if (right_culture == selected) {
            button.style.backgroundColor = "green"
            if (this.IsFirstCorrect == true) {
                this.correctAnswers += 1;
                let rights_num = document.getElementById("num-right-answers");
                rights_num.innerHTML = 'Правильных ответов: ' + this.correctAnswers;
            }
        }
        else { button.style.backgroundColor = "red"; this.IsFirstCorrect = false }
    }

    async make_test() {
        let buttons = document.querySelectorAll(".choice");
        console.log(buttons)
        for (let button of buttons) { button.style.backgroundColor = '#5a8cc5'; button.textContent = '' }
        this.IsFirstCorrect = true
        try {
            let num = Math.floor(Math.random() * (2030 - 1) + 1);
            let response = await fetch(this.apiUrl + num);
            let data = await response.json();
            while (!data.culture) {
                num = Math.floor(Math.random() * (2030 - 1) + 1);
                response = await fetch(this.apiUrl + num);
                data = await response.json();
            }
            this.currentQuestion += 1
            let character_name = document.getElementById("character-name");
            character_name.textContent = data.name;
            let question_num = document.getElementById("current-question");
            question_num.textContent = this.currentQuestion;
            let culture_list = []
            culture_list.push(data.culture)
            while (culture_list.length < 4) {
                const culture = await this.get_culture();
                if (culture && culture_list.indexOf(culture) === -1) { culture_list.push(culture) }
            }
            culture_list = culture_list.sort(() => Math.random() - 0.5)
            for (let i = 1; i < culture_list.length + 1; i++) {
                let id = "ans" + i
                let button = document.getElementById(id);
                button.textContent = culture_list[i - 1]
                button.onclick = () => this.check_answer(data.culture, culture_list[i - 1], id)
            }
        } catch (error) {
            console.error(error);
        }
    }
}

let our_quiz = new Quiz()
our_quiz.make_test();

const startButton = document.getElementById("next");

startButton.addEventListener("click", () => {
    our_quiz.make_test();
});