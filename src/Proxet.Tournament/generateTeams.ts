const fs = require('fs')

interface Player {
  id: number
  name: string
  delay: Number
  vehicle: Number
}

export interface Teams {
  team1: string[]
  team2: string[]
}

export const generateTeams = (filePath: string): Teams => {

  const statFile = fs.readFileSync(__dirname + '/wait-time.stat', 'utf8')
  const statsStrings = statFile.split('\n')

  let stats: Player[] = []
  statsStrings.forEach((user: string, index: number) => {
    user = user.replace('\r', '')
    const PlayerArr = user.split('\t')

    stats.push({
      id: index,
      name: PlayerArr[0],
      delay: Number(PlayerArr[1]),
      vehicle: Number(PlayerArr[2]),
    })
  })

  stats = stats.sort((a, b) => {
      if (a.delay < b.delay) {
        return 1
      } else {
        return -1
      }
    }
  )

  let firstClass: Player[] = []
  let secondClass: Player[] = []
  let thirdClass: Player[] = []

  for (let user in stats) {
    let Player = stats[user]
    if(Player.vehicle === 1) {
      firstClass.push(Player)
    } else if (Player.vehicle === 2) {
      secondClass.push(Player)
    } else if(Player.vehicle === 3) {
      thirdClass.push(Player)
    }
  }

  let team1: string[] = []
  let team2: string[] = []

  for (let i = 0; i < 6; i++) {
    let Player = firstClass[i]
    if (i % 2 == 0) {
      team2.push(Player.name)
    } else {
      team1.push(Player.name)
    }
  }

  for (let i = 0; i < 6; i++) {
    let Player = secondClass[i]
    if (i % 2 == 0) {
      team2.push(Player.name)
    } else {
      team1.push(Player.name)
    }
  }

  for (let i = 0; i < 6; i++) {
    let Player = thirdClass[i]
    if (i % 2 == 0) { 
      team2.push(Player.name)
    } else {
      team1.push(Player.name)
    }
  }

  return {
    team1,
    team2,
  }
}