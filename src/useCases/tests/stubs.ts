import { Game2048Repository } from 'src/ports/game2048.repository.js';
import { Grid } from '../moveTile/moveTile.usecase.js';
import { RandomNumberProvider } from 'src/ports/randomNumber.provider.js';

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

export class StubRandomNumberProvider implements RandomNumberProvider {
  numbers: number[] = [];
  iterator: Iterator<number>;

  constructor() {
    this.iterator = this.numbers[Symbol.iterator]();
  }

  generate(between: [number, number] = [0, 0]): number {
    return this.iterator.next().value;
  }
}
