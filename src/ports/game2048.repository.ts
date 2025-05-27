import { Grid } from 'src/useCases/moveTile/moveTile.usecase.js';

export interface Game2048Repository {
  fetch(): Grid;
  save(grid: Grid);
}
