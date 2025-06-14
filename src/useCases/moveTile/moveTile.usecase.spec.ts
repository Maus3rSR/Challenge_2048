import { describe, it } from 'vitest';

import { Grid, MoveTile, Direction } from './moveTile.usecase.js';
import { StubGame2048Repository } from '../tests/stubs.js';

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
    {
      direction: 'DOWN',
      grid: [
        [2, 2],
        [null, null],
      ],
      expectedGrid: [
        [null, null],
        [2, 2],
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
