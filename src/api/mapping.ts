export const mapping = {
  sources: [
    {
      id: "src1",
      name: "Source1",
    },
    {
      id: "src2",
      name: "Source2",
    },
    {
      id: "src3",
      name: "Source3",
    },
  ],
  targets: [
    {
      id: "trg1",
      name: "Target1",
    },
    {
      id: "trg2",
      name: "Target2",
    },
    {
      id: "trg3",
      name: "Target3",
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
    {
      id: "act3",
      prev: ["src1"],
      next: "trg2",
    },
    {
      id: "act3",
      prev: ["src3"],
      next: "act4",
    },
    {
      id: "act4",
      prev: ["src2", "act3"],
      next: "act5",
    },
    {
      id: "act5",
      prev: ["act4"],
      next: "act6",
    },
    {
      id: "act6",
      prev: ["act5"],
      text: "trg3",
    },
  ],
};
