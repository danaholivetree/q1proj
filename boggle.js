$(document).ready(function() {

  $(".button-collapse").sideNav();

  let fiveCubes =
    "AAAFRS AAEEEE AAFIRS ADENNN AEEEEM AEEGMU AEGMNN AFIRSY BJKQXZ CCNSTW CEIILT CEILPT CEIPST DHHNOT DHHLOR DHLNOR DDLNOR EIIITT EMOTTT ENSSSU FIPRSY GORRVW HIPRRY NOOTUW OOOTTU"

  let fourCubes =
    "aaciot abilty abjmoq acdemp acelrs adenvz ahmors bfiorx denosw dknotu eefhiy egintv egkluy ehinps elpstu gilruw"

  let ltrs = []
  let board = []
  //set default TIMER


  $('#gridSelect').click(function selectGridSize(e) {
    tar = e.target
    val = $(tar).attr('data-value')
    if (val == 4) {
      makeCubeArrays(fourCubes)
    } else if (val == 5) {
      makeCubeArrays(fiveCubes)
    }
    // else if (val === 6) {
    //   makeCubeArrays(sixCubes)
    // }
    fillGrid(val) //move this to "Shake! function?"

    //START TIMER
  })

  function makeCubeArrays(list) {
    let cubes = list.toUpperCase().split(" ")
    let splitCubes = cubes.map(function(el) {
      return el.split("")
    })
    shake(splitCubes)
  }

  function shake(it) {
    let mixCubes = []
    while (it.length > 0) {
      mixCubes.push(it.splice(Math.floor((it.length) * Math.random()), 1))
    }
    ltrs = mixCubes.map(function(el) {
      return el[0][Math.floor(6 * Math.random())]
    })
    // fillGrid(Math.sqrt(it.length))
  }

  function fillGrid(val) {
    $('#grid').children().remove()
    for (let i = 0; i < Math.pow(val, 2); i++) {
      let slot = $('<div>')
      slot.width(250 / val).height(252 / val).addClass("slot")
      $('#grid').append(slot)
      slot.text(ltrs[i])
    }
    $("#target").focus();
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
    if (e.which == 13) {
      event.preventDefault();
      $("form #words").submit();
    }

    let sel = e.key.toUpperCase()
    // if (sel > 64 && sel < 91) {
    $('#grid>div:contains(' + sel + ')').toggleClass("blue")
    // }
  })

})
