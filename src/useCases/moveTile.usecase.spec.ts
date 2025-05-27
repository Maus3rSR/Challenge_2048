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

    const iterationDirection = Array.from<Direction>(['UP', 'LEFT']).includes(
      direction,
    )
      ? -1
      : 1;

    if (Array.from<Direction>(['LEFT', 'RIGHT']).includes(direction)) {
      let columnIndex = 0;
      while (grid[columnIndex] !== undefined) {
        let rowIndex = direction === 'LEFT' ? grid[columnIndex].length - 1 : 0;
        let nextRowIndex = rowIndex + iterationDirection;

        while (grid[columnIndex][nextRowIndex] === null) {
          grid[columnIndex][nextRowIndex] = grid[columnIndex][rowIndex];
          grid[columnIndex][rowIndex] = null;

          rowIndex += iterationDirection;
          nextRowIndex += iterationDirection;
        }

        columnIndex++;
      }
    } else if (Array.from<Direction>(['UP', 'DOWN']).includes(direction)) {
      let columnIndex = direction === 'UP' ? grid.length - 1 : 0;
      let nextColumnIndex = columnIndex + iterationDirection;

      while (
        grid[nextColumnIndex] !== undefined &&
        grid[nextColumnIndex][0] === null
      ) {
        grid[nextColumnIndex][0] = grid[columnIndex][0];
        grid[columnIndex][0] = null;

        columnIndex += iterationDirection;
        nextColumnIndex += iterationDirection;
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
      direction: 'DOWN',
      grid: [[2], [null], [null]],
      expectedGrid: [[null], [null], [2]],
    },
    {
      direction: 'UP',
      grid: [[null], [2]],
      expectedGrid: [[2], [null]],
    },
    {
      direction: 'UP',
      grid: [[null], [null], [2]],
      expectedGrid: [[2], [null], [null]],
    },
    {
      direction: 'RIGHT',
      grid: [
        [2, null],
        [2, null],
      ],
      expectedGrid: [
        [null, 2],
        [null, 2],
      ],
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
