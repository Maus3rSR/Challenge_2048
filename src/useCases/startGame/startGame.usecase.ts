import { Game2048Repository } from 'src/ports/game2048.repository.js';
import { RandomNumberProvider } from 'src/ports/randomNumber.provider.js';
import { Grid } from '../moveTile/moveTile.usecase.js';

export class StartGame {
  constructor(
    private readonly gameRepository: Game2048Repository,
    private readonly randomNumberProvider: RandomNumberProvider,
  ) {}

  execute() {
    // const grid: Grid = [
    //   [null, null, null, null],
    //   [null, null, null, null],
    //   [null, null, null, null],
    //   [null, null, null, null],
    // ];
    // let row = this.randomNumberProvider.generate([0, grid.length]);
    // let column = this.randomNumberProvider.generate([0, grid.length]);
    // grid[row][column] = 2;
    // row = this.randomNumberProvider.generate([0, grid.length]);
    // column = this.randomNumberProvider.generate([0, grid.length]);
    // grid[row][column] = 2;
    // this.gameRepository.save(grid);
  }
}
