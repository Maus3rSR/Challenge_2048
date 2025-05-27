import { Game2048Repository } from 'src/ports/game2048.repository.js';

export type Direction = 'UP' | 'LEFT' | 'RIGHT' | 'DOWN';
export type TileValue = number | null;
export type Grid = TileValue[][];

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
      let rowIndex = 0;

      while (grid[rowIndex] !== undefined) {
        let columnIndex = direction === 'UP' ? grid.length - 1 : 0;
        let nextColumnIndex = columnIndex + iterationDirection;

        while (
          grid[nextColumnIndex] !== undefined &&
          grid[nextColumnIndex][rowIndex] === null
        ) {
          grid[nextColumnIndex][rowIndex] = grid[columnIndex][rowIndex];
          grid[columnIndex][rowIndex] = null;

          columnIndex += iterationDirection;
          nextColumnIndex += iterationDirection;
        }

        rowIndex++;
      }
    }

    this.gameRepository.save(grid);
  }
}
