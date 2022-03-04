const rounds = [
  {
    title: "Quarter Finals",
    seeds: [
      {
        id: 1,
        teams: [
          { name: "Team A", bgColor: "red", textColor: "black", uuid: "1" },
          { name: "Team B", bgColor: "blue", textColor: "white", uuid: "2" },
        ],
        score: [0, 0],
      },
      {
        id: 2,
        teams: [
          { name: "Team C", bgColor: "green", textColor: "black", uuid: "3" },
          { name: "Team D", bgColor: "orange", textColor: "white", uuid: "4" },
        ],
        score: [0, 0],
      },
      {
        id: 3,
        teams: [
          { name: "Team E", bgColor: "purple", textColor: "red", uuid: "5" },
          { name: "Team F", bgColor: "pink", textColor: "black", uuid: "6" },
        ],
        score: [0, 0],
      },
      {
        id: 4,
        teams: [
          { name: "Team G", bgColor: "yellow", textColor: "black", uuid: "7" },
          { name: "Team H", bgColor: "brown", textColor: "white", uuid: "8" },
        ],
        score: [0, 0],
      },
    ],
  },
  {
    title: "Semi Finals",
    seeds: [
      {
        id: 5,
        teams: [
          { name: "A", bgColor: "red", textColor: "black", uuid: "1" },
          { name: "D", bgColor: "orange", textColor: "black", uuid: "4" },
        ],
        score: [0, 0],
      },
      {
        id: 6,
        teams: [
          { name: "E", bgColor: "purple", textColor: "black", uuid: "5" },
          { name: "H", bgColor: "brown", textColor: "black", uuid: "8" },
        ],
        score: [0, 0],
      },
    ],
  },
  {
    title: "Final",
    seeds: [
      {
        id: 7,
        teams: [
          { name: "A", bgColor: "red", textColor: "black", uuid: "1" },
          { name: "E", bgColor: "purple", textColor: "black", uuid: "5" },
        ],
        score: [0, 0],
      },
    ],
  },
];

export default rounds;
