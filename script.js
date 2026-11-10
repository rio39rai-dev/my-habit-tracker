//表の見出し
const habits = ["walk", "squat", "sit-up", "decollete"];

const header = document.getElementById("habit-header");

const row = document.createElement("tr");

const habitHeader = document.createElement("th");
habitHeader.textContent = "menu";
header.appendChild(habitHeader);

let year = 2026;
let month = 12;

/*
habits.forEach(habit => {
    const habitHeader = document.createElement("th");
    habitHeader.textContent = habit;
    row.appendChild(habitHeader);
});
header.appendChild(row);
*/

//月切り替えボタン
const prevButton = document.getElementById("prev-month");
const nextButton = document.getElementById("next-month");
const currentMonth = document.getElementById("current-month");

//表の本体
const body = document.getElementById("habit-body");
/*
let year = 2026;
let month = 12;
*/

function updateMonthLabel() { //年月を表示
    const date = new Date(year, month -1);
    currentMonth.textContent = date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
    });
}
//表の生成
function renderTable(){
    body.innerHTML = "";

    const daysInMonth = new Date(year, month, 0).getDate(); //(month)月の最終日を取得

    //日付ヘッダーの作成
    for (let i = 1; i <= daysInMonth; i++){
        const dateHeader = document.createElement("th");
        dateHeader.textContent = `${i}`;
        header.appendChild(dateHeader);
    }

    habits.forEach(habit =>{
        const dataRow = document.createElement("tr");

        const habitData = document.createElement("th");
        habitData.textContent = habit ;
        dataRow.appendChild(habitData);

        for (let i = 1; i <= daysInMonth; i++){
            const dateData = document.createElement("td");
            dataRow.appendChild(dateData);

            const storageKey = `${year}-${month}-${i}-${habit}`;
            let isChecked = Number(localStorage.getItem(storageKey)) || 0;

            //isCheckedに応じて色を表示する
            function updateColor(){
                if(isChecked == 0){
                    dateData.style.backgroundColor = "#ffffff";
                }else{
                    if (isChecked == 1){dateData.style.backgroundColor = "#BFE3D0"}
                    if (isChecked == 2){dateData.style.backgroundColor = "#F9E7A8"}
                    if (isChecked == 3){dateData.style.backgroundColor = "#F6C6D0"}
                }
            }

            updateColor();

            dateData.addEventListener("click", () => {
                if(isChecked == 3){
                    isChecked = 0;
                }else{
                    isChecked++;
                }
                localStorage.setItem(storageKey, isChecked);
                updateColor();
            });
        };

        body.appendChild(dataRow);
    });
}

updateMonthLabel();
renderTable();

prevButton.addEventListener("click", () => { //前の月に戻る
    month--;
    if (month < 1){
        month = 12;
        year--;
    }
    updateMonthLabel();
    renderTable();
});

nextButton.addEventListener("click", () => { //次の月に進む
    month++;
    if (month > 12){
        month = 1;
        year++;
    }
    updateMonthLabel();
    renderTable();
});


