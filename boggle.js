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
  let val = 4
  var timeVal = 3
  var timer
  let lengthVal = 4

  //var next = []
  //var clicked = 0
  //let points = 0
  let totalPoints = 0
  let m = timeVal
  let s = 0
  $('#timer').text(timeVal + ":" + "00")
  fillGrid(4)
  makeCubeArrays(fourCubes)



  $('#gridSelect button').click(function selectGridSize(e) {
    e.preventDefault()
    $(this).toggleClass('active');
    $(this).siblings().removeClass('active')
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

  $('#lengthSelect button').click(function selectLength(e) {
    e.preventDefault()
    $(this).toggleClass('active');
    $(this).siblings().removeClass('active')
    lengthVal = $(e.target).attr('data-value')
  })

  $('#timeSelect button').click(function selectTimer(e) {
    e.preventDefault()
    $(this).toggleClass('active');
    $(this).siblings().removeClass('active')
    timeVal = $(e.target).attr('data-value')
    $('#timer').text(timeVal + ":" + "00")
  })

  function startTimer(min) {
    timer = setInterval(countDown, 1000) //should be decl globally
    m = min
  }

  function padLeft(x) {
    return x < 10 ? `0${x}` : x.toString()
  }

  function countDown() {
    if (m >= 0 && s >= 0) {
      $('#timer').text(m.toString() + ":" + padLeft(s))
      if (s == 0) {
        s = 59
        m--
      } else s--
    } else endRound()
  }

  function endRound() {
    alert("Time's Up! You got " + totalPoints + " points!")
    stopTimer()
    reset()
  }

  $('#shake').click(function(e) {
    if ($('#shake').text() == "SHAKE!") {
      e.preventDefault()
      shake(splitCubes)
      $("#target").focus()
      startTimer(timeVal)
      $('#shake').text("reset")
    } else {
      $('#shake').text("SHAKE!")
      stopTimer()
      reset()
    }
  })

  function stopTimer() {
    clearInterval(timer)
  }

  function reset() {
    fillGrid(val) //clears and redraws the board
    m = timeVal //resets internal timer to last selected game length
    s = 0
    $('#timer').text(m.toString() + ":" + padLeft(s)) //reset timer
    $('.collection-item').remove() //clears word list
    totalPoints = 0 //clears saved points
    $('#points').text(totalPoints)
    $('input:text').val('') //clears input field
    currentWord = [] //clears current word
  }

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
        $('#grid div').eq(i).attr({
          'data-x': col,
          'data-y': row,
          'data-letter': ltrs[i]
        })
        if (ltrs[i] == 'Q') {
          ltrs[i] = 'Qu'
        }

        grid[row][col] = {
          letter: ltrs[i],
          highlighted: false,
          x: col,
          y: row
        }

        $('#grid div').eq(i).text(grid[row][col].letter)
        i++
      }
    }
  }

  $("form").submit(function(event) {
    event.preventDefault();
    let word = $('input:text').val()
    //let word = textInput.val()
    // validate(word)

    validate(word, lengthVal, ltrs, function(result, reason) {
      if (result == false) {
        Materialize.toast(reason, 2000)
        $('input:text').val('')
      } else submitWord(word)
    })
  })

  function validate(x, minLength, containingArray, cb) {
    if (x.length < minLength) {
      cb(false, 'that word is too short')
    } else if (x.toUpperCase().split('').some((ch) => containingArray.indexOf(ch) === -1)) {
      cb(false, 'those letters are not all on the board')
    } else {
      let endpoint = `http://api.wordnik.com:80/v4/word.json/${x}/definitions?limit=10&includeRelated=true&sourceDictionaries=webster&useCanonical=true&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5`

      $.getJSON(endpoint, function(data) {
        // console.log(data)
        // console.log(data.length)
        cb((data.length !== 0), 'that word is not in the dictionary yet')
      })
    }
  }


  function submitWord(word) {
    let goodWord = $('<li>').text(word).addClass("collection-item")
    let points = word.length - lengthVal + 1
    let pointsPrint = $('<span>').text(points).addClass("secondary-content")
    totalPoints += points
    $('#points').text(totalPoints)
    goodWord.append(pointsPrint)
    $('#list').append(goodWord)
    $('input:text').val('')
  }


  //
  // function makeNeighborhood(x, y, grid) {
  //   const neighborhood = []
  //   if (y > 0 && x > 0) {
  //     if (grid[y - 1][x - 1].highlighted == false) {
  //       neighborhood.push(grid[y - 1][x - 1])
  //     }
  //   }
  //   if (y > 0) {
  //     if (grid[y - 1][x].highlighted == false) {
  //       neighborhood.push(grid[y - 1][x])
  //     }
  //   }
  //   if (y < (grid[0].length - 1) && x < (grid[0].length - 1)) {
  //     if (grid[y + 1][x + 1].highlighted == false) {
  //       neighborhood.push(grid[y + 1][x + 1])
  //     }
  //   }
  //
  //   if (x < (grid[0].length - 1)) {
  //     if (grid[y][x + 1].highlighted == false) {
  //       neighborhood.push(grid[y][x + 1])
  //     }
  //   }
  //   if (x < (grid[0].length - 1) && y > 0) {
  //     if (grid[x + 1][y - 1].highlighted == false) {
  //       neighborhood.push(grid[x + 1][y - 1])
  //     }
  //   }
  //   if (y < (grid[0].length - 1)) {
  //     if (grid[y + 1][x].highlighted == false) {
  //       neighborhood.push(grid[y + 1][x])
  //     }
  //   }
  //   if (y < (grid[0].length - 1) && x > 0) {
  //     if (grid[y + 1][x - 1].highlighted == false) {
  //       neighborhood.push(grid[y + 1][x - 1])
  //     }
  //   }
  //   if (x > 0) {
  //     if (grid[y][x - 1].highlighted == false) {
  //       neighborhood.push(grid[y][x - 1])
  //     }
  //   }
  //   return neighborhood
  // }


})
