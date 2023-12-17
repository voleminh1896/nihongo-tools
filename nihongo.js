const DATA_PATH_NIHONGO = {
    ROMAJI_BASIC: "data/romaji-basic.csv",
    ROMAJI_DAKUON_HANDAKUON: "data/romaji_dakuon_handakuon.csv",
    ROMAJI_YOUON: "data/romaji_youon.csv",

    HIRAGANA_BASIC: "data/hiragana-basic.csv",
    HIRAGANA_DAKUON_HANDAKUON: "data/hiragana_dakuon_handakuon.csv",
    HIRAGANA_YOUON: "data/hiragana_youon.csv",

    KATAKANA_BASIC: "data/katakana-basic.csv",
    KATAKANA_DAKUON_HANDAKUON: "data/katakana_dakuon_handakuon.csv",
    KATAKANA_YOUON: "data/katakana_youon.csv",
}

const DATA_PATH_VACABULARY = {
    VACABULARY: "data/vocabulary.csv",
}

// view
const romajiControlView = document.getElementById("romaji");
const hiraganaControlView = document.getElementById("hiragana");
const katakanaControlView = document.getElementById("katakana");
const totalControlView = document.getElementById("total");
const footerContentControlView = document.getElementById("footerContent");

const totalKanjiControlView = document.getElementById("totalKanji");
const onyomiKanjiControlView = document.getElementById("onyomiKanji");
const kunyomiKanjiControlView = document.getElementById("kunyomiKanji");
const kanjiControlView = document.getElementById("kanji");

const totalVocabularyControlView = document.getElementById("totalVocabulary");
const vocabularyControlView = document.getElementById("vocabulary");
const romajiVocabularyControlView = document.getElementById("romajiVocabulary");
const englishVocabularyControlView = document.getElementById("englishVocabulary");

// button
const btnRandomControl = document.getElementById("btnRandomNihongo");
const btnResetControl = document.getElementById("btnResetNihongo");
const btnsaveConfigControl = document.getElementById("btnsaveConfigNihongo");
const btnResultControl = document.getElementById("btnResultNihongo");

const btnRandomKanjiControl = document.getElementById("btnRandomKanji");
const btnResetKanjiControl = document.getElementById("btnResetKanji");

const btnRandomVocabularyControl = document.getElementById("btnRandomVocabulary");
const btnResetVocabularyControl = document.getElementById("btnResetVocabulary");
const btnResultVocabularyControl = document.getElementById("btnResultVocabulary");

// Table
const resultTableControl = document.getElementById("resultTable");
const resultVocabularyTableControl = document.getElementById("resultVocabularyTable");

// checked
var romajiCheckedControl = document.getElementById("romajiChecked");
var hiraganaCheckedControl = document.getElementById("hiraganaChecked");
var katakanaCheckedControl = document.getElementById("katakanaChecked");

var basicCheckedControl = document.getElementById("basicChecked");
var dakuonCheckedControl = document.getElementById("dakuonChecked");
var youonCheckedControl = document.getElementById("youonChecked");

var kanjiCheckedControl = document.getElementById("kanjiChecked");

var onyomiCheckedControl = document.getElementById("onyomiChecked");
var kunyomiCheckedControl = document.getElementById("kunyomiChecked");
var kanjiCheckedControl = document.getElementById("kanjiChecked");

var vocabularyCheckedControl = document.getElementById("vocabularyChecked");
var romajiVocabularyCheckedControl = document.getElementById("romajiVocabularyChecked");
var englishVocabularyCheckedControl = document.getElementById("englishVocabularyChecked");
var filterVocabularyControl = document.getElementById("filterVocabulary");

var romajiItems = [];
var hiraganaItems = [];
var katakanaItems = [];
var indexItemsTemp = [];
var romaji = "";
var hiragana = "";
var katakana = "";

var vocabularyItems = [];
var romajiVocabularyItems = [];
var englishVocabularyItems = [];
var indexVocabularyItemsTemp = [];
var romajiVocabulary = "";
var vocabulary = "";
var englishVocabulary = "";

main();
mainNihongo();
mainKanji();
mainVocabulary();

listVocabulary();

// Javascript code
var startTime, elapsedTime, timerInterval;

function startTimer() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function () {
        var currentTime = Date.now();
        elapsedTime = currentTime - startTime;
        updateDisplay(elapsedTime);
    }, 10);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay(elapsedTime);
}

function updateDisplay(time) {
    var milliseconds = Math.floor((time % 1000) / 10);
    var seconds = Math.floor((time / 1000) % 60);
    var minutes = Math.floor((time / 1000 / 60) % 60);
    var hours = Math.floor((time / 1000 / 60 / 60) % 24);

    var displayTime = hours.toString().padStart(2, '0') + ':' +
        minutes.toString().padStart(2, '0') + ':' +
        seconds.toString().padStart(2, '0') + '.' +
        milliseconds.toString().padStart(2, '0');

    document.querySelector('.display').textContent = displayTime;
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function startTime() {
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = today.getMonth() + 1;
    var dd = today.getDate();

    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    // add a zero in front of numbers<10
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML = yyyy + "/" + mm + "/" + dd + " " + h + ":" + m + ":" + s;
    t = setTimeout(function () {
        startTime()
    }, 500);
}

function main() {
    const currentDate = new Date();
    footerContentControlView.innerHTML = "Copyright © " + currentDate.getFullYear() + " . All Rights Reserved. Design by <a href=\"mailto: voleminh1896@gmail.com\">Minke</a>";
    startTime();
    document.querySelector('.start').addEventListener('click', startTimer);
    document.querySelector('.stop').addEventListener('click', stopTimer);
    document.querySelector('.reset').addEventListener('click', resetTimer);
    resetTimer();
}

function listVocabulary() {
    var tr = document.createElement('tr');

    var th = document.createElement('th');
    th.innerHTML = "Ádsd";
    var td1 = document.createElement('td');
    td1.innerHTML = "Ádsd";
    var td2 = document.createElement('td');
    td2.innerHTML = "Ádsd";
    var td3 = document.createElement('td');
    td3.innerHTML = "Ádsd";

    tr.appendChild(th);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);

    document.getElementById("listVocabularyTable").appendChild(tr);
}

async function mainNihongo() {
    // content default 
    resetTextNihongo();

    // get Data
    await getDatasNihongo();

    // event click
    btnRandomControl.addEventListener("click", random);
    btnResetControl.addEventListener("click", reset);
    btnsaveConfigControl.addEventListener("click", loadConfig);
    btnResultControl.addEventListener("click", result);

    btnRandomVocabularyControl.addEventListener("click", randomVocabulary);
    btnResetVocabularyControl.addEventListener("click", resetVocabulary);

    romajiCheckedControl.addEventListener("change", changeCheckedRomaji);
    hiraganaCheckedControl.addEventListener("change", changeCheckedHiragana);
    katakanaCheckedControl.addEventListener("change", changeCheckedKatakana);

    vocabularyCheckedControl.addEventListener("change", changeCheckedVocabulary);
    romajiVocabularyCheckedControl.addEventListener("change", changeCheckedRomajiVocabulary);
    englishVocabularyCheckedControl.addEventListener("change", changeCheckedEnglishVocabulary);
    filterVocabularyControl.addEventListener("input", filterVocabulary);

    btnResultVocabularyControl.addEventListener("click", resultVocabulary);
}

function filterVocabulary() {
    resetVocabulary();
    getDatasVocabulary(filterVocabularyControl.value);
}

function changeCheckedVocabulary() {
    if (vocabularyCheckedControl.checked) {
        vocabularyControlView.textContent = vocabulary === "" ? "Vocabulary" : vocabulary;
    } else {
        vocabularyControlView.textContent = "Vocabulary";
    }
}

function changeCheckedRomajiVocabulary() {
    if (romajiVocabularyCheckedControl.checked) {
        romajiVocabularyControlView.textContent = romajiVocabulary === "" ? "Romaji Vocabulary" : romajiVocabulary;
    } else {
        romajiVocabularyControlView.textContent = "Romaji Vocabulary";
    }
}

function changeCheckedEnglishVocabulary() {
    if (englishVocabularyCheckedControl.checked) {
        englishVocabularyControlView.textContent = englishVocabulary === "" ? "English Vocabulary" : englishVocabulary;
    } else {
        englishVocabularyControlView.textContent = "English Vocabulary";
    }
}

async function mainKanji() {
    // content default 
    resetTextKanji();

    // get Data
    await getDatasKanji();
}

async function mainVocabulary() {
    resetTextVocabulary();

    // get Data
    await getDatasVocabulary(filterVocabularyControl.value);
}

function result() {
    resultTableControl.innerHTML = "";

    for (let index = 0; index < indexItemsTemp.length; index++) {
        const element = indexItemsTemp[index];

        var li = document.createElement('li');
        li.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-start');

        var value2 = document.createElement("div");
        value2.setAttribute('class', 'ms-2 me-auto');
        //value2.innerHTML = romajiItems[element];

        var value = document.createElement("div");
        value.setAttribute('class', 'h3 fw-bold');
        value.innerHTML = hiraganaItems[element];

        var value3 = document.createElement("span");
        value3.setAttribute('class', 'h3');
        value3.innerHTML = katakanaItems[element];

        value2.appendChild(value);
        li.appendChild(value2);
        li.appendChild(value3);

        resultTableControl.appendChild(li);
    }

}

function resultVocabulary() {
    resultVocabularyTableControl.innerHTML = "";

    for (let index = 0; index < indexVocabularyItemsTemp.length; index++) {
        const element = indexVocabularyItemsTemp[index];

        var li = document.createElement('li');
        li.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-start');

        var value2 = document.createElement("div");
        value2.setAttribute('class', 'ms-2 me-auto');
        value2.innerHTML = romajiVocabularyItems[element];

        var value = document.createElement("div");
        value.setAttribute('class', 'h3 fw-bold');
        value.innerHTML = vocabularyItems[element];

        var value3 = document.createElement("span");
        value3.setAttribute('class', 'h3');
        value3.innerHTML = englishVocabularyItems[element];

        value2.appendChild(value);
        li.appendChild(value2);
        li.appendChild(value3);

        resultVocabularyTableControl.appendChild(li);
    }

}

function changeCheckedRomaji() {
    if (romajiCheckedControl.checked) {
        romajiControlView.textContent = romaji === "" ? "Romaji" : romaji;
    } else {
        romajiControlView.textContent = "Romaji";
    }
}

function changeCheckedHiragana() {
    if (hiraganaCheckedControl.checked) {
        hiraganaControlView.textContent = hiragana === "" ? "Hiragana" : hiragana;
    } else {
        hiraganaControlView.textContent = "Hiragana";
    }
}

function changeCheckedKatakana() {
    if (katakanaCheckedControl.checked) {
        katakanaControlView.textContent = katakana === "" ? "Katakana" : katakana;
    } else {
        katakanaControlView.textContent = "Katakana";
    }
}

async function loadConfig() {
    dakuonCheckedControl = document.getElementById("dakuonChecked");
    youonCheckedControl = document.getElementById("youonChecked");
    kanjiCheckedControl = document.getElementById("kanjiChecked");

    await getDatasNihongo();
}

async function getDatasVocabulary(filter) {
    vocabularyItems = [];
    romajiVocabularyItems = [];
    englishVocabularyItems = [];

    const data = await readFiles(DATA_PATH_VACABULARY.VACABULARY);

    for (key in data) {
        if (data.hasOwnProperty(key)) {
            var value = Object.values(data[key]);
            if (value[2] == '' && value[3] == '') {
                continue;
            }

            const inputFilter = value[4].split(',');
            var isAdd = false;

            for (let index = 0; index < inputFilter.length; index++) {
                const element = inputFilter[index];

                if (filter === "" || filter.includes(element)) {
                    isAdd = true;
                }

            }

            if (isAdd) {
                vocabularyItems.push(value[1]);
                romajiVocabularyItems.push(value[2]);
                englishVocabularyItems.push(value[3]);
            }
        }
    }

    // Get Total
    getTotalVocabulary();
}

async function getDatasKanji() {

}

async function getDatasNihongo() {
    romajiItems = [];
    hiraganaItems = [];
    katakanaItems = [];


    // Read dat from files csv
    const datas = [];

    for (let index = 0; index < Object.values(DATA_PATH_NIHONGO).length; index++) {
        const element = Object.values(DATA_PATH_NIHONGO)[index];

        const data = await readFiles(element);

        datas.push({
            path: element,
            data: data,
        });
    }

    const totalPathRomaji = [];
    const totalPathHiragana = [];
    const totalPathKatakana = [];

    if (basicCheckedControl.checked) {
        totalPathRomaji.push(DATA_PATH_NIHONGO.ROMAJI_BASIC);
        totalPathHiragana.push(DATA_PATH_NIHONGO.HIRAGANA_BASIC);
        totalPathKatakana.push(DATA_PATH_NIHONGO.KATAKANA_BASIC);
    }

    if (dakuonCheckedControl.checked) {
        totalPathRomaji.push(DATA_PATH_NIHONGO.ROMAJI_DAKUON_HANDAKUON);
        totalPathHiragana.push(DATA_PATH_NIHONGO.HIRAGANA_DAKUON_HANDAKUON);
        totalPathKatakana.push(DATA_PATH_NIHONGO.KATAKANA_DAKUON_HANDAKUON);
    }

    if (youonCheckedControl.checked) {
        totalPathRomaji.push(DATA_PATH_NIHONGO.ROMAJI_YOUON);
        totalPathHiragana.push(DATA_PATH_NIHONGO.HIRAGANA_YOUON);
        totalPathKatakana.push(DATA_PATH_NIHONGO.KATAKANA_YOUON);
    }


    for (let index = 0; index < totalPathRomaji.length; index++) {
        const pathRomaji = totalPathRomaji[index];
        const pathHiragana = totalPathHiragana[index];
        const pathKatakana = totalPathKatakana[index];

        const dataRomaji = datas.find(i => i.path === pathRomaji).data;
        const dataHiragana = datas.find(i => i.path === pathHiragana).data;
        const dataKatakana = datas.find(i => i.path === pathKatakana).data;

        for (let index2 = 0; index2 < dataRomaji.length; index2++) {
            const element2Romaji = Object.values(dataRomaji[index2]);
            const element2Hiragana = Object.values(dataHiragana[index2]);
            const element2Katakana = Object.values(dataKatakana[index2]);

            for (let index3 = 0; index3 < element2Romaji.length; index3++) {
                const element3 = element2Romaji[index3];
                const element3Hiragana = element2Hiragana[index3];
                const element3Katakana = element2Katakana[index3];

                if (element3 === "") {
                    continue;
                }

                romajiItems.push(element3);
                hiraganaItems.push(element3Hiragana);
                katakanaItems.push(element3Katakana);
            }
        }
    }

    // Get Total
    getTotal();

}

function resetTextKanji() {
    totalKanjiControlView.textContent = "? / ?";
    onyomiKanjiControlView.textContent = "Onyomi";
    kunyomiKanjiControlView.textContent = "Kunyomi";
    kanjiControlView.textContent = "Kanji";
};

function resetTextVocabulary() {
    totalVocabularyControlView.textContent = "? / ?";
    vocabularyControlView.textContent = "Vocabulary";
    romajiVocabularyControlView.textContent = "Romaji Vocabulary";
    englishVocabularyControlView.textContent = "English Vocabulary";

    vocabulary = "";
    romajiVocabulary = "";
    englishVocabulary = "";
};

function resetTextNihongo() {
    totalControlView.textContent = "? / ?";
    romajiControlView.textContent = "Romaji";
    hiraganaControlView.textContent = "Hiragana";
    katakanaControlView.textContent = "Katakana";

    romaji = "";
    hiragana = "";
    katakana = "";
};

function getTotal() {
    totalControlView.textContent = `${indexItemsTemp.length} / ${romajiItems.length}`;
};

function getTotalVocabulary() {
    totalVocabularyControlView.textContent = `${indexVocabularyItemsTemp.length} / ${romajiVocabularyItems.length}`;
};


function random() {
    if (romajiItems.length === 0) {
        return;
    }

    while (true) {
        const randomElement = Math.floor(Math.random() * romajiItems.length);

        if (!indexItemsTemp.includes(randomElement)) {
            resetTextNihongo();

            romaji = romajiItems[randomElement];
            hiragana = hiraganaItems[randomElement];
            katakana = katakanaItems[randomElement];


            if (romajiCheckedControl.checked) {
                romajiControlView.textContent = romaji;
            }

            if (hiraganaCheckedControl.checked) {
                hiraganaControlView.textContent = hiragana;
            }

            if (katakanaCheckedControl.checked) {
                katakanaControlView.textContent = katakana;
            }
            indexItemsTemp.push(randomElement);
            getTotal();
            return;
        }

        if (indexItemsTemp.length === romajiItems.length) {
            return;
        }
    }
};

function randomVocabulary() {

    if (romajiVocabularyItems.length === 0) {
        return;
    }

    while (true) {
        const randomElement = Math.floor(Math.random() * romajiVocabularyItems.length);

        if (!indexVocabularyItemsTemp.includes(randomElement)) {
            resetTextVocabulary();

            vocabulary = vocabularyItems[randomElement];
            romajiVocabulary = romajiVocabularyItems[randomElement];
            englishVocabulary = englishVocabularyItems[randomElement];

            if (vocabularyCheckedControl.checked) {
                vocabularyControlView.textContent = vocabulary;
            }

            if (romajiVocabularyCheckedControl.checked) {
                romajiVocabularyControlView.textContent = romajiVocabulary;
            }

            if (englishVocabularyCheckedControl.checked) {
                englishVocabularyControlView.textContent = englishVocabulary;
            }

            indexVocabularyItemsTemp.push(randomElement);
            getTotalVocabulary();
            return;
        }

        if (indexVocabularyItemsTemp.length === romajiVocabularyItems.length) {
            return;
        }
    }
};

function resetVocabulary() {
    indexVocabularyItemsTemp = [];
    resetTextVocabulary();
    getTotalVocabulary();
};

function reset() {
    indexItemsTemp = [];
    resetTextNihongo();
    getTotal();
};

async function readFiles(value) {
    const result = [];

    await fetch(value)
        .then(response => response.text()) // Lấy nội dung dưới dạng văn bản
        .then(data => {
            const rows = data.split('\n'); // Tách từng dòng

            const header = rows[0].split('|'); // Lấy header từ dòng đầu tiên

            const rowData = rows.slice(1); // Lấy dữ liệu từ dòng thứ 2 trở đi

            rowData.forEach(row => {
                const values = row.split('|');

                const rowObject = {};

                header.forEach((headerItem, index) => {
                    if (values[index]) {
                        rowObject[headerItem] = values[index].replace("\r", "").trim();
                    } else {
                        rowObject[headerItem] = "";
                    }
                });

                result.push(rowObject);
            });
        })
        .catch(error => console.log(error)); // Xử lý lỗi nếu có

    return result;
};
