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
  var timerOn = 0
  var next = []
  var clicked = 0
  let points = 0
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
        $('#grid div').eq(i).attr({
                                  'data-x': col,
                                  'data-y': row,
                                  'data-letter': ltrs[i]
                                  })

        $('#grid div').eq(i).text(grid[row][col].letter)
        i++
      }
    }
  }
  // $('#grid div').click(function(e){
  //
  //   if (clicked == 0 || findElement($(e.target), next)){
  //     let sel = $(e.target)
  //     console.log(grid[sel.data('y')][sel.data('x')])
  //     currentWord.push($(e.target).data('letter'))
  //     console.log("currentWord= "+currentWord)
  //     $(e.target).addClass("blue lighten-2")
  //     grid[sel.data('y')][sel.data('x')].highlighted==true
  //     next = makeNeighborhood($(e.target).data('x'), $(e.target).data('y'), grid)
  //     console.log("next clickable neighborhood= ", next)
  //     clicked = 1
  //   }
  //   else return
  // })

  function findElement(tar, neigh){
    for (let i = 0; i < neigh.length; i++ ) {
      if (tar.data('x') == neigh[i].x && tar.data('y') == neigh[i].y) {
        return true
      }
    }
    return false
  }

  function makeNeighborhood(x, y, grid) {
    const neighborhood = []
    if (y > 0 && x > 0) {
      if (grid[y - 1][x - 1].highlighted == false) {
        neighborhood.push(grid[y - 1][x - 1])
      }
    }
    if (y > 0) {
      if (grid[y - 1][x].highlighted == false) {
        neighborhood.push(grid[y - 1][x])
      }
    }
    if (y < (grid[0].length-1) && x < (grid[0].length-1)) {
      if (grid[y + 1][x + 1].highlighted == false) {
        neighborhood.push(grid[y + 1][x + 1])
      }
    }

    if (x < (grid[0].length-1)) {
      if (grid[y][x + 1].highlighted == false) {
        neighborhood.push(grid[y][x + 1])
      }
    }
    if (x < (grid[0].length-1) && y > 0) {
      if (grid[x + 1][y - 1].highlighted == false) {
        neighborhood.push(grid[x + 1][y - 1])
      }
    }
    if (y < (grid[0].length-1)) {
      if (grid[y + 1][x].highlighted == false) {
        neighborhood.push(grid[y + 1][x])
      }
    }
    if (y < (grid[0].length-1) && x > 0) {
      if (grid[y + 1][x - 1].highlighted == false) {
        neighborhood.push(grid[y + 1][x - 1])
      }
    }
    if (x > 0) {
      if (grid[y][x - 1].highlighted == false) {
        neighborhood.push(grid[y][x - 1])
      }
    }
    return neighborhood
    //console.log('neighborhood length= '+neighborhood.length)

  //  return neighborhood.map((el) => grid[el[0]][el[1]])
  }

  $("form").submit(function(event) {
    event.preventDefault();
    let textInput = $('input:text')
    let word = textInput.val()
    if (word.length >= lengthVal) {
      $.getJSON("http://api.wordnik.com:80/v4/words.json/search/"+word+"?caseSensitive=true&minCorpusCount=5&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=1&maxLength=-1&skip=0&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5", function(data) {
          if (data["totalResults"]) {
            console.log(data)

            let goodWord = $('<li>').text(word).addClass("collection-item")
            let points = word.length - lengthVal + 1
            let pointsPrint = $('<span>').text(points).addClass("secondary-content")
            goodWord.append(pointsPrint)
            console.log(goodWord)
            $('#list').append(goodWord)
            }

          })
        }





    textInput.val('')
    currentWord = []
    $('#grid>div').removeClass("blue lighten-2")

  })

})
