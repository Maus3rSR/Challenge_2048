import { describe, it } from 'vitest';

export type Direction = 'UP' | 'LEFT' | 'RIGHT' | 'DOWN';
export type TileValue = number | null;
export type Grid = TileValue[][];

export interface Game2048Repository {
  fetch(): Grid;
  save(grid: Grid);
}

export class StubGame2048Repository implements Game2048Repository {
  grid: Grid;

  fetch(): Grid {
    // Need COPY => false positive
    return [...this.grid];
  }

  save(grid: Grid) {
    this.grid = [...grid];
  }
}

export class MoveTile {
  constructor(private readonly gameRepository: Game2048Repository) {}

  toDirection(direction: Direction) {
    const grid = this.gameRepository.fetch();

    if (Array.from<Direction>(['LEFT', 'RIGHT']).includes(direction)) {
      const iterationDirection = direction === 'LEFT' ? -1 : 1;

      let currentIndex = direction === 'LEFT' ? grid[0].length - 1 : 0;
      let nextIndex = currentIndex + iterationDirection;

      while (grid[0][nextIndex] === null) {
        grid[0][nextIndex] = grid[0][currentIndex];
        grid[0][currentIndex] = null;
        currentIndex += iterationDirection;
        nextIndex += iterationDirection;
      }
    } else {
      if (grid[1][0] === null) {
        grid[1][0] = grid[0][0];
        grid[0][0] = null;
      }
    }

    this.gameRepository.save(grid);
  }
}

type MoveGridTest = {
  direction: Direction;
  grid: Grid;
  expectedGrid: Grid;
};

let repository: StubGame2048Repository;

describe('Move tiles to a specific direction', () => {
  beforeEach(() => {
    repository = new StubGame2048Repository();
  });

  it.each<MoveGridTest>([
    {
      direction: 'RIGHT',
      grid: [[2, null]],
      expectedGrid: [[null, 2]],
    },
    {
      direction: 'RIGHT',
      grid: [[2, null, null]],
      expectedGrid: [[null, null, 2]],
    },
    {
      direction: 'LEFT',
      grid: [[null, null, 2]],
      expectedGrid: [[2, null, null]],
    },
    {
      direction: 'DOWN',
      grid: [[2], [null]],
      expectedGrid: [[null], [2]],
    },
    {
      direction: 'UP',
      grid: [[null], [2]],
      expectedGrid: [[2], [null]],
    },
  ])(
    'Should move tiles to the <$direction> edge: $grid -> $expectedGrid',
    ({ direction, grid, expectedGrid }) => {
      repository.grid = grid;

      new MoveTile(repository).toDirection(direction);

      expect(repository.grid).toEqual<Grid>(expectedGrid);
    },
  );
});
