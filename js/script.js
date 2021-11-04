let min = 1
let max = 25
let sufix = 'rno'


let msg_error = 'Не вірний вибір'
let msg_congratulation = 'Вітаю ви виграли'

let game_arr = []
let search_arr = []
let search_counter = 0

$('#dialog').dialog({
  autoOpen: false,
  show: {
    effect: "fadeIn",
    duration: 1000
  },
  hide: {
    effect: "fadeOut",
    duration: 1000
  }
});


document.getElementById('rno_btn_start').addEventListener("click", () => {
  $('.rno_first_form').hide()
  $('.rno_second_form').show()
  startGame()
})

document.getElementById('rno_btn_restart').addEventListener("click", () => {
  clearAndRestartGame()
})

document.getElementById(`rno_img_search`).addEventListener('dragstart', (ev) => {
  ev.dataTransfer.setData(search_arr[search_counter].toString(), search_arr[search_counter].toString()); //ev.target.id.split('_')[0]
})

function startGame() {
  search_counter = 0
  game_arr = getRandomArray()
  search_arr = getRandomArray()
  $("#rno_img_search").attr("src", `img/${search_arr[0]}.jpg`);
  let counter = 0
  let jq_rows = $('.rno_game_table').children().children()
  for (let row of jq_rows) {
    let jq_cells = row.children
    for (let cell of jq_cells) {
      $(cell).html(`<img id="${game_arr[counter]}_id_img" class="rno_img" src="img/${game_arr[counter++]}.jpg"/>`);
    }
  }

  for (let j of game_arr) {
    document.getElementById(`${j}_id_img`).addEventListener("dragover", (ev) => {
      ev.preventDefault();
    })
    document.getElementById(`${j}_id_img`).addEventListener("drop", (ev) => {
      ev.preventDefault();
      let data = ev.dataTransfer.getData(j.toString());

      if (data === j.toString()) {
        $("#rno_img_search").attr("src", `img/${search_arr[++search_counter]}.jpg`);
        $(`#${j}_id_img`).remove()
        if (search_counter === 25) {
          $('#msg_dialog').text(msg_congratulation)
          $("#dialog").dialog("open");
        }
      } else {
        $('#msg_dialog').text(msg_error)
        $("#dialog").dialog("open");
      }
    })
  }
}

function clearAndRestartGame() {
  let jq_rows = $('.rno_game_table').children().children()
  for (let row of jq_rows) {
    let jq_cells = row.children
    for (let cell of jq_cells) {
      $(cell).html('')
    }
  }

  startGame()
}

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function getRandomArray() {
  let arr = []
  for (let i = 1; i <= max; i++) {
    arr.push(i)
  }
  arr = shuffle(arr)
  return arr
}



