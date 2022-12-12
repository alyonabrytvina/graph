export const getPrevNodes = (mapping: Mapping, nodes: (Source | Action)[], currentNode: Source | Action): (Source | Action)[] => {
  const prevNodes = [];

  if ('prev' in currentNode) {
    currentNode.prev.map((id) => {
      const actions = mapping.actions.filter((action) => action.id === id);
      const sources = mapping.sources.filter((source) => source.id === id);
      const nextNode = [...sources, ...actions][0];

      prevNodes.push(...getPrevNodes(mapping, [...nodes, currentNode], nextNode));
    });
  } else {
    prevNodes.push(...mapping.sources.filter((source) => source.id === currentNode.id));
  }

  return [...nodes, ...prevNodes];
};

const getTransformations = (mapping: Mapping): Transformation[] => {
  const transformations: Transformation[] = [];

  mapping.targets.forEach((target) => {
    const lastAction = mapping.actions.find((_) => _.next === target.id);

    if (lastAction) {
      const prevNodes = getPrevNodes(mapping, [], lastAction);
      const actions: Action[] = prevNodes.filter((prevNode) => 'prev' in prevNode) as Action[];
      const sources: Source[] = prevNodes.filter((prevNode) => 'name' in prevNode) as Source[];

      transformations.push({
        actions,
        sources,
        target,
      });
    }
  });

  return transformations;
};
