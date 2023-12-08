const bingoSquare = document.getElementById("main-wrapper");    // 전체 빙고판
const rows = document.getElementsByClassName("row");            // 빙고 5행의 요소들
const bingoInput = document.getElementById("bingo-info-num");   // 빙고 수를 출력한 요소

const columnsInRows = {};       // 각 행마다 5열 ( row1 : [column-1, column-2, column-3, column-4, column-5])
const bingoElements = [];       // 5행 5열의 25개의 각 요소들
const RandomNumberArray = [];   // 25개의 랜덤으로 추출한 수들

let number = 0;                 // 빙고 수를 위한 변수

// 5 X 5 만들기(각 행의 열을 만든 후 열마다 class와 id, 그리고 색상을 지정하고, 랜덤수를 입력)
const createBingoBoard = () => {
    let num = 1;
    for(let row of rows) {
        const columnsInRow = [];  // 행 마다 5개의 열을 만들면, 그 요소를 담을 배열
        for(let i = 0; i < rows.length; i++) {
            const column = document.createElement("div");
            
            column.classList.add("column");
            column.id = `column-${i+1}`;

            column.textContent = randomNumber();
            column.style.backgroundColor = "yellow";
            row.appendChild(column);

            columnsInRow.push(column);
            bingoElements.push(column);
        }
        columnsInRows[`row${num++}`] = columnsInRow;
    }
}

// 1부터 25까지, 25개의 수를 랜덤하게 추출하여 배열에 넣기
const randomNumber = () => {
    let number = parseInt((Math.random() * 25) + 1);
    while(RandomNumberArray.includes(number)) {
        number = parseInt((Math.random() * 25) + 1)
    }
    RandomNumberArray.push(number);
    return number;   
}

// 빙고 칸을 선택하면 색이 변하게 만들기(각 행마다 열을 순회하며 클릭을 통해 색상을 바꾸고, 가로와 세로, 대각선 빙고를 체크하도록 만든다)
const isClick = () => {
    for(let rowKey in columnsInRows) {
        let columnsInRow = columnsInRows[rowKey];
        for(let i = 0; i < columnsInRow.length; i++) {    
            let color = columnsInRow[i].style.backgroundColor;    
            columnsInRow[i].addEventListener("click", () => {
                color = colorChange(color, columnsInRow[i]);        // 클릭하면 색상이 변한다
                rowBingo(columnsInRow);                             // 클릭할 때마다 가로 빙고 체크
                columnBingo(columnsInRow[i]);                       // 클릭할 때마다 세로 빙고 체크
                diagonalBingo(columnsInRow[i]);                     // 클릭할 때마다 대각선 빙고 체크
            });
        }
    }
}

// 색상이 변하는 함수
const colorChange = (color, elm) => {
    if(color === "yellow") {
        elm.style.backgroundColor = "pink";
        return color = "pink";
    } else {
        elm.style.backgroundColor = "yellow";
        return color = "yellow";
    }
}

// 가로 빙고(한 행의 열들이 모두 pink로 변하면 빙고로 만든다)
const rowBingo = (columnsInRow) => {
    let isPink = [];
    columnsInRow.forEach((elm) => {
        let color = elm.style.backgroundColor;
        if(color === "pink") {
            isPink.push("pink");
        } else {
            isPink.push("yellow");
        }
    });
    
    if(!(isPink.includes("yellow"))) {
        bingoInput.textContent = `${++number} 빙고`;
        columnsInRow.forEach((elm) => {
            elm.style.pointerEvents = "none";
        })
    }
}

// 세로 빙고(클릭한 요소와 일치하는 colum을 cols 배열에 담은 후 클릭한 색상이 pink인 것들을 빙고로 만든다)
const columnBingo = (column) => {
    let isPink = [];
    const col = column.id;
    let cols = bingoElements.filter((elm) => {
        return elm.id == col;
    });

    cols.forEach((elm) => {
        let color = elm.style.backgroundColor;
        if(color === "pink") {
            isPink.push("pink");
        } else {
            isPink.push("yellow");
        }
    });

    if(!(isPink.includes("yellow"))) {
        bingoInput.textContent = `${++number} 빙고`;
        cols.forEach((elm) => {
            elm.style.pointerEvents = "none";
        });
    }
}

// 대각선 빙고(왼쪽 대각선과 오른쪽 대각선을 나눈 후 각 행마다 id가 column-1, column-2, column-3, column-4, column-5인 것들을 각각 다른 배열에 담은 후 색상을 체크한다)
const diagonalBingo = (column) => {
    let isPink_1 = [];
    let isPink_2 = [];

    const colValues = Object.values(columnsInRows);
    let diagonal_1 = colValues.map((elm, idx) => {
        return colValues[idx][idx];
    });

   const  reverseColValues = colValues.reverse();
   let diagonal_2 = reverseColValues.map((elm, idx) => {
        return reverseColValues[idx][idx];
    });

    if(diagonal_1.includes(column)) {
        diagonal_1.forEach((elm) => {
            let color = elm.style.backgroundColor;
            if(color === "pink") {
                isPink_1.push("pink");
            } else {
                isPink_1.push("yellow");
            }
        });

        if(!(isPink_1.includes("yellow"))) {
            bingoInput.textContent = `${++number} 빙고`;
            diagonal_1.forEach((elm) => {
                elm.style.pointerEvents = "none";
            });
        }
    }

    if(diagonal_2.includes(column)) {
        diagonal_2.forEach((elm) => {
            let color = elm.style.backgroundColor;
            if(color === "pink") {
                isPink_2.push("pink");
            } else {
                isPink_2.push("yellow");
            }
        });

        if(!(isPink_2.includes("yellow"))) {
            bingoInput.textContent = `${++number} 빙고`;
            diagonal_2.forEach((elm) => {
                elm.style.pointerEvents = "none";
            });
        }
    }
}


createBingoBoard();
isClick();
