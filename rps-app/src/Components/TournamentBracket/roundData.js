const rounds = [
  {
    title: "Quarter Finals",
    seeds: [
      {
        id: 1,
        teams: [
          { name: "Team A", bgColor: "red", textColor: "black" },
          { name: "Team B", bgColor: "blue", textColor: "white" },
        ],
        score: [0, 0],
      },
      {
        id: 2,
        teams: [
          { name: "Team C", bgColor: "green", textColor: "black" },
          { name: "Team D", bgColor: "orange", textColor: "white" },
        ],
        score: [0, 0],
      },
      {
        id: 3,
        teams: [
          { name: "Team E", bgColor: "purple", textColor: "red" },
          { name: "Team F", bgColor: "pink", textColor: "black" },
        ],
        score: [0, 0],
      },
      {
        id: 4,
        teams: [
          { name: "Team G", bgColor: "yellow", textColor: "black" },
          { name: "Team H", bgColor: "brown", textColor: "white" },
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
          { name: "Team A", bgColor: "red", textColor: "black" },
          { name: "Team D", bgColor: "orange", textColor: "white" },
        ],
        score: [0, 0],
      },
      {
        id: 6,
        teams: [
          { name: "Team E", bgColor: "purple", textColor: "red" },
          { name: "Team H", bgColor: "brown", textColor: "white" },
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
          { name: "", bgColor: "white", textColor: "black" },
          { name: "", bgColor: "purple", textColor: "red" },
        ],
        score: [0, 0],
      },
    ],
  },
];

export default rounds;
