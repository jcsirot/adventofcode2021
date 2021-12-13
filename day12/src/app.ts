import * as readline from 'readline';

type Node = string;

const START: Node = 'start';
const END: Node = 'end';

class Graph {
  private edges: {[node: Node]: Node[]};

  constructor(edges: {[node: Node]: Node[]}) {
    this.edges = edges;
  }

  connectedNodes(node: Node): Node[] {
    return this.edges[node];
  }

  toString(): string {
    return this.edges.toString();
  }
}

class GraphBuilder {
  private edges: {[node: Node]: Node[]};

  constructor() {
    this.edges = {};
  }

  addEdge(node1: Node, node2: Node): void {
    if (node2 != START && node1 != END) {
      if (!this.edges[node1]) {
        this.edges[node1] = [];
      }
      this.edges[node1].push(node2);
    }
    if (node1 != START && node2 != END) {
      if (!this.edges[node2]) {
        this.edges[node2] = [];
      }
      this.edges[node2].push(node1);
    }
  }

  build(): Graph {
    return new Graph(this.edges);
  }
}


const parseInput = async (rd: readline.Interface): Promise<Graph> => {
  const builder = new GraphBuilder();
  for await (const line of rd) {
    const [n1, n2] = line.split('-');
    builder.addEdge(n1, n2);
  }
  return builder.build();
}

const isLargeCave = (node: Node): boolean => /^\p{Upper}+$/u.test(node);

const visitPart1 = (input: Graph, current: Node, visited: Node[], currentPath: string, paths: string[]) => {
  const p = currentPath + '-' + current;
  if (current == END) {
    paths.push(p);
    return
  }
  const toVisit = input.connectedNodes(current).filter(n => visited.indexOf(n) == -1);
  if (toVisit.length > 0) {
    const newVisited = isLargeCave(current) ? visited : [...visited, current];
    toVisit.forEach(n => visitPart1(input, n, newVisited, p, paths));
  }
}

const passagePathingPart1 = async (input: Graph): Promise<number> => {
  const paths: string[] = [];
  visitPart1(input, START, [], '', paths);
  return paths.length;
};

const visitPart2 = (input: Graph, current: Node, visited: Node[], visitedTwice: boolean, currentPath: Node[], paths: string[]) => {
  const p = [...currentPath, current];
  if (current == END) {
    paths.push(p.join(','));
    return
  }
  const newVisitedTwice = visitedTwice || (!isLargeCave(current) && currentPath.indexOf(current) != -1);
  const toVisit = input.connectedNodes(current).filter(n => newVisitedTwice ? visited.indexOf(n) == -1 : true);
  if (toVisit.length > 0) {
    const newVisited = isLargeCave(current) ? visited : [...visited, current];
    toVisit.forEach(n => visitPart2(input, n, newVisited, newVisitedTwice, p, paths));
  }
}

const passagePathingPart2 = async (input: Graph): Promise<number> => {
  const paths: string[] = [];
  visitPart2(input, START, [], false, [], paths);
  return paths.length;
};

export { passagePathingPart1, passagePathingPart2, parseInput }
