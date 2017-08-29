$(document).ready(function() {

  $(".button-collapse").sideNav();

  let fiveCubes =
    "AAAFRS AAEEEE AAFIRS ADENNN AEEEEM AEEGMU AEGMNN AFIRSY BJKQXZ CCNSTW CEIILT CEILPT CEIPST DHHNOT DHHLOR DHLNOR DDLNOR EIIITT EMOTTT ENSSSU FIPRSY GORRVW HIPRRY NOOTUW OOOTTU"

  let fourCubes =
    "aaciot abilty abjmoq acdemp acelrs adenvz ahmors bfiorx denosw dknotu eefhiy egintv egkluy ehinps elpstu gilruw"

  let ltrs = []
  let board = []
  let sel = 0
  let currentWord=[]
  let val = 4
  let timeVal = 3
  let lengthVal = 4
  let splitCubes=[]


  $('#gridSelect button').click(function selectGridSize(e) {
    e.preventDefault()
    console.log('grid selected')
    tar = e.target
    // $('#gridSelect').children().removeClass("blue lighten-4")
    // $(tar).parent().addClass("blue lighten-4")
    val = $(tar).attr('data-value')
    if (val == 4) {
      makeCubeArrays(fourCubes)
      console.log("four by four cube arrays made")
    } else if (val == 5) {
      makeCubeArrays(fiveCubes)
      console.log("five by five cube arrays made")
    }
    // else if (val === 6) {
    //   makeCubeArrays(sixCubes)
    // }
    // fillGrid(val)  //this works

    //START TIMER - should go on "shake button"
  })

  $('#timeSelect').click(function selectTimer(e) {
    e.preventDefault()
    timeVal = $(e.target).attr('data-value')

  })

  $('#lengthSelect').click(function selectLength(e) {
    e.preventDefault()
    lengthVal = $(e.target).attr('data-value')
  })

  $('#timer').text = timeVal + ":" + 00;

  function startTimer() {
    var presentTime = $('timer').text();
    var timeArray = presentTime.split(/[:]+/);
    var m = timeArray[0];
    var s = checkSecond((timeArray[1] - 1));
    if(s==59){m=m-1}
    //if(m<0){alert('timer completed')}
    $('timer').text(m + ":" + s)
    //setTimeout(startTimer, 1000)
  }
  function checkSecond(sec) {
    if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
    if (sec < 0) {sec = "59"};
    return sec;
  }

  function makeCubeArrays(list) {
    let cubes = list.toUpperCase().split(" ")

    splitCubes = cubes.map(function(el) {
      return el.split("")
    })
    console.log(splitCubes)
    //shake(splitCubes)
  }

  $('#shake').click(function(){

    shake(splitCubes)
  })

  function shake(it) {

    let mixCubes = []
    while (it.length > 0) {
      mixCubes.push(it.splice(Math.floor((it.length) * Math.random()), 1))
    }

    ltrs = mixCubes.map(function(el) {
      return el[0][Math.floor(6 * Math.random())]
    })

    console.log(Math.sqrt(ltrs.length))
    fillGrid(Math.sqrt(ltrs.length))
  }

  function fillGrid(val) {
    console.log('filling grid')
    $('#grid').children().remove()
    for (let i = 0; i < Math.pow(val, 2); i++) {
      let slot = $('<div>')
      slot.width(250 / val).height(252 / val).addClass("slot")
      $('#grid').append(slot)
      slot.text(ltrs[i])
    }
    $("#target").focus();
    startTimer();
  }

  function makeNeighborhood(x, y, board) {
    const neighborhood = []

    if (x > 0 && x < board[0].length && y > 0 && y < board[0].length) {
      neighborhood.push([x - 1, y])
      neighborhood.push([x + 1, y])
      neighborhood.push([x, y - 1])
      neighborhood.push([x, y + 1])
      neighborhood.push([x - 1, y - 1])
      neighborhood.push([x - 1, y + 1])
      neighborhood.push([x + 1, y - 1])
      neighborhood.push([x + 1, y + 1])
    }

    return neighborhood.map((el) => board[el[0]][el[1]])
  }

  $(document).keydown(function(e) {
    if (e.which===8){
      $('#grid>div:contains(' + currentWord[currentWord.length-1] + ')').removeClass("blue lighten-2")
      currentWord.pop()
      console.log(currentWord)
    }


    if (e.which > 64 && e.which < 91) {
      sel = e.key.toUpperCase()
      $('#grid>div:contains(' + sel + ')').addClass("blue lighten-2")
      currentWord.push(sel)
      console.log(currentWord)
    }
  })

  $("form").submit(function( event ) {
    event.preventDefault();
    let textInput = $('input:text')
    console.log(textInput.val())
    let goodWord = $('<li>').text(textInput.val())
    $('#list').append(goodWord)
    textInput.val('')
    currentWord =[]
    $('#grid>div').removeClass("blue lighten-2")

  })

//   $( "form #words" ).submit(function( event ) {
//   event.preventDefault();
//   if ( $( "input:first" ).val() === "correct" ) {
//     $( "span" ).text( "Validated..." ).show();
//     return;
//   }
//
//   $( "span" ).text( "Not valid!" ).show().fadeOut( 1000 );
// });

})
