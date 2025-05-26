import { describe, it } from 'vitest';

export enum DirectionEnum {
  UP = 'UP',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  DOWN = 'DOWN',
}

export type Direction = `${DirectionEnum}`;
export type TileValue = number | null;
export type GridRow = TileValue[];

export interface Game2048Repository {
  fetch(): GridRow;
  save(grid: GridRow);
}

export class StubGame2048Repository implements Game2048Repository {
  grid: GridRow;

  fetch(): GridRow {
    // Need COPY => false positive
    return [...this.grid];
  }

  save(grid: GridRow) {
    this.grid = [...grid];
  }
}

export class MoveTile {
  constructor(private readonly gameRepository: Game2048Repository) {}

  toDirection(direction: Direction) {
    const grid = this.gameRepository.fetch();

    const iterationDirection = direction === 'LEFT' ? -1 : 1;

    let currentIndex = direction === 'LEFT' ? grid.length - 1 : 0;
    let nextIndex = currentIndex + iterationDirection;

    while (grid[nextIndex] === null) {
      grid[nextIndex] = grid[currentIndex];
      grid[currentIndex] = null;
      currentIndex += iterationDirection;
      nextIndex += iterationDirection;
    }

    this.gameRepository.save(grid);
  }
}

type MoveGridTest = {
  direction: Direction;
  grid: GridRow;
  expectedGrid: GridRow;
};

let repository: StubGame2048Repository;

describe('Move tiles to a specific direction', () => {
  beforeEach(() => {
    repository = new StubGame2048Repository();
  });

  it.each<MoveGridTest>([
    {
      direction: 'RIGHT',
      grid: [2, null],
      expectedGrid: [null, 2],
    },
    {
      direction: 'RIGHT',
      grid: [2, null, null],
      expectedGrid: [null, null, 2],
    },
    {
      direction: 'LEFT',
      grid: [null, null, 2],
      expectedGrid: [2, null, null],
    },
  ])(
    'Should move tiles to the <$direction> edge: $grid -> $expectedGrid',
    ({ direction, grid, expectedGrid }) => {
      repository.grid = grid;

      new MoveTile(repository).toDirection(direction);

      expect(repository.grid).toEqual<GridRow>(expectedGrid);
    },
  );
});
