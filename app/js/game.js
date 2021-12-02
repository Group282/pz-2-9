const COUNT_IMAGES = 130;
const MAX_GAMES = 10;
let WIN_GAMES = 0;

function main () {
  $('.btn').button();
  $( "#dialog-win" ).dialog({
  autoOpen: false,
  show: { effect: "fold", duration: 300 },
  hide: { effect: "fold", duration: 600 },
  modal: true,
  resizable: false,
  width: 450,
  buttons: [
    {
      text: "Добре",
      click: function() {
        $( this ).dialog( "close" );
      }
    }
  ],
  title: 'Інформація',
});
  $('#guess-img').draggable({ cursor: 'move' });

  $('.playground>img').droppable( {
    drop: handleDropEvent
  });

  $('#drop-game').on('click', dropCurrentGame);

  game();
}

main();

// helper functions
function handleDropEvent( event, ui ) {
  const draggable = ui.draggable;
  const catchedImg = event.target.attributes.src.value;
  const droppableImg = draggable.attr('src');

  if (catchedImg === droppableImg) {
    WIN_GAMES++;

    if (WIN_GAMES === MAX_GAMES) {
      WIN_GAMES = 0;

      openDialog('Вітаю ви виграли!');
    } else {
      openDialog(`Вітаю ви виграли цей раунд! Залишилось ${MAX_GAMES - WIN_GAMES}.`);
    }
    game();
  } else {
    openDialog('Не вірний вибір');
  }

  $(draggable).css({ left: 0, top: 0});
}

function game() {
  const imgPathsArray = [];

  for (let imgIdx = 0; imgIdx < COUNT_IMAGES; imgIdx++) {
    imgPathsArray.push(`../assets/img/${imgIdx + 1}.webp`);
  }

  const images = imgPlaygroundRandomizer(imgPathsArray);

  $(".playground>img").each(function (idx) {
    this.src = images.playground[idx];
  })

  $('#guess-img').attr('src', images.guess);
}

function dropCurrentGame() {
  WIN_GAMES = 0;
  game();
}

function openDialog(text) {
  $('#dialog-win').prev().text(text);
  $( "#dialog-win" ).dialog( "open" );
}
