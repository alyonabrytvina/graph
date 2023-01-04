export const transformations = [
  {
    sources: [
      {
        id: "src1",
        name: "Source1",
      },
      {
        id: "src2",
        name: "Source2",
      },
    ],
    actions: [
      {
        id: "act1",
        prev: ["src1", "src2"],
        next: "act2",
      },
      {
        id: "act2",
        prev: ["act1"],
        next: "trg1",
      },
    ],
    target: {
      id: "trg1",
      name: "Target1",
    },
  },
  {
    sources: [
      {
        id: "src1",
        name: "Source1",
      },
    ],
    actions: [
      {
        id: "act3",
        prev: ["src1"],
        next: "trg2",
      },
    ],
    target: {
      id: "trg2",
      name: "Target2",
    },
  },
  {
    sources: [
      {
        id: "src3",
        name: "Source3",
      },
      {
        id: "src2",
        name: "Source2",
      },
    ],
    actions: [
      {
        id: "act4",
        prev: ["src3"],
        next: "act5",
      },
      {
        id: "act5",
        prev: ["src2", "act4"],
        next: "act6",
      },
      {
        id: "act6",
        prev: ["act5"],
        next: "act7",
      },
      {
        id: "act7",
        prev: ["act6"],
        next: "trg3",
      },
    ],
    target: {
      id: "trg3",
      name: "Target3",
    },
  },
];
