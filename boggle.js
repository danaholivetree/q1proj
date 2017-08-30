$(document).ready(function() {

  $(".button-collapse").sideNav();

  let fiveCubes =
    "AAAFRS AAEEEE AAFIRS ADENNN AEEEEM AEEGMU AEGMNN AFIRSY BJKQXZ CCNSTW CEIILT CEILPT CEIPST DHHNOT DHHLOR DHLNOR DDLNOR EIIITT EMOTTT ENSSSU FIPRSY GORRVW HIPRRY NOOTUW OOOTTU"

  let fourCubes =
    "aaciot abilty abjmoq acdemp acelrs adenvz ahmors bfiorx denosw dknotu eefhiy egintv egkluy ehinps elpstu gilruw"

  let ltrs = []
  var grid = []
  let board = []
  let currentWord = []
  let splitCubes = []
  //set defaults
  //let val = 4
  let timeVal = 3
  let lengthVal = 4
  let sel = 0
  var timerOn = 0

  $('#timer').text(timeVal + ":" + "00")
  fillGrid(4)
  makeCubeArrays(fourCubes)

  $('#gridSelect button').click(function selectGridSize(e) {
    e.preventDefault()
    val = $(e.target).attr('data-value')
    if (val == 4) {
      makeCubeArrays(fourCubes)
    } else if (val == 5) {
      makeCubeArrays(fiveCubes)
    }
    // else if (val === 6) {
    //   makeCubeArrays(sixCubes)
    // }
    fillGrid(val)
  })

  function makeCubeArrays(list) {
    let cubes = list.toUpperCase().split(" ")
    splitCubes = cubes.map(function(el) {
      return el.split("")
    })
  }

  function fillGrid(val) {
    $('#grid').children().remove()
    for (let i = 0; i < Math.pow(val, 2); i++) {
      let slot = $('<div>')
      slot.width(250 / val).height(252 / val).addClass("slot")
      $('#grid').append(slot)
    }
  }

  $('#lengthSelect').click(function selectLength(e) {
    e.preventDefault()
    lengthVal = $(e.target).attr('data-value')
  })

  $('#timeSelect').click(function selectTimer(e) {
    e.preventDefault()
    timeVal = $(e.target).attr('data-value')
    $('#timer').text(timeVal + ":" + "00")
  })

  function startTimer(min, sec) {

    let m = min
    let s = sec
    setInterval(function() {
      // if (timerOn = 0) { // function for resetting
      //
      //   m = timeVal
      //   s = 0
      //   $('#timer').text(m.toString() + ":" + padLeft(s))
      //   return false;
      //}
      if (m >= 0 && s >= 0) { //maybe move this outside setInterval
        //console.log('m ' + m + ' s ' + s)
        $('#timer').text(m.toString() + ":" + padLeft(s))
        if (s == 0) {
          s = 59
          m--
        } else s--
      } else return //add reset timer function
    }, 1000)
  }

  function padLeft(x) {
    return x < 10 ? `0${x}` : x.toString()
  }

  $('#shake').click(function(e) {
    e.preventDefault()
    shake(splitCubes)
    $("#target").focus()
    startTimer(timeVal, 0)
  })

  function shake(it) {
    let mixCubes = []
    while (it.length > 0) {
      mixCubes.push(it.splice(Math.floor((it.length) * Math.random()), 1))
    }
    ltrs = mixCubes.map(function(el) {
      return el[0][Math.floor(6 * Math.random())]
    })
    let i = 0
    for (let row = 0; row < Math.sqrt(ltrs.length); row++) {
      grid.push([])
      for (let col = 0; col < Math.sqrt(ltrs.length); col++) {
        grid[row][col] = {
          letter: ltrs[i],
          highlighted: false,
          x : col,
          y : row
        }
        $('#grid div').eq(i).data(grid[row][col])
        //console.log($('#grid div').eq(i).data(grid[row][col]))
        $('#grid div').eq(i).text(grid[row][col].letter)
        //console.log($('#grid div').eq(i).text())
        i++
      }
    }

  }

  $(document).keydown(function(e) {
    if (e.which === 8) { //for dealing with backspace
      $('#grid>div:contains(' + currentWord[currentWord.length - 1] + ')').removeClass("blue lighten-2")
      currentWord.pop()
      //console.log(currentWord)
    }
    if (e.which > 64 && e.which < 91) { //for selecting letters
      sel = e.key.toUpperCase()
      let currentKeys = $('.slot:contains(' + sel + ')')

      let neighbors = currentKeys.map(function(i, el){

        makeNeighborhood($(el).data('x'), $(el).data('y'), grid)
        console.log($(el).data())
      })
      // console.log(neighbors)
      // if (currentKeys.first().data("highlighted")) {
      //   console.log(currentKeys.next())
      // }
      //console.log(currentKey.data('x'))
      // currentKey.addClass("blue lighten-2")
      // currentKey.data("highlighted", "true")
      // currentWord.push(sel)
    }
  })

  function makeNeighborhood(x, y, grid) {
    const neighborhood = []
    if (y > 0 && x > 0) {
      neighborhood.push(grid[y - 1][x - 1].letter)
    }
    if (y > 0) {
      neighborhood.push(grid[y - 1][x].letter)
    }
    if (y < (grid[0].length-1) && x < (grid[0].length-1)) {
      neighborhood.push(grid[y + 1][x + 1].letter)
    }

    if (x < (grid[0].length-1)) {
      neighborhood.push(grid[y][x + 1].letter)
    }
    if (x < (grid[0].length-1) && y > 0) {
      neighborhood.push(grid[x + 1][y - 1].letter)
    }
    if (y < (grid[0].length-1)) {
      neighborhood.push(grid[y + 1][x].letter)
    }
    if (y < (grid[0].length-1) && x > 0) {
      neighborhood.push(grid[y + 1][x - 1].letter)
    }
    if (x > 0) {
      neighborhood.push(grid[y][x - 1].letter)
    }






      console.log(neighborhood)
  //  return neighborhood.map((el) => grid[el[0]][el[1]])
  }

  $("form").submit(function(event) {
    event.preventDefault();
    let textInput = $('input:text')
    //console.log(textInput.val())
    let goodWord = $('<li>').text(textInput.val())
    $('#list').append(goodWord)
    textInput.val('')
    currentWord = []
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
