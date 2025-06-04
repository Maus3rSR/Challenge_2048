import { Game2048Repository } from 'src/ports/game2048.repository.js';
import { Grid } from './moveTile/moveTile.usecase.js';

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
