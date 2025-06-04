import {
  StubGame2048Repository,
  StubRandomNumberProvider,
} from '../tests/stubs.js';
import { StartGame } from './startGame.usecase.js';

let repository: StubGame2048Repository;
let randomNumberProvider: StubRandomNumberProvider;

describe('Start a new game', () => {
  beforeEach(() => {
    repository = new StubGame2048Repository();
    randomNumberProvider = new StubRandomNumberProvider();
  });

  it('Should generate a grid with 2 tiles containing 2 or 4', () => {
    randomNumberProvider.numbers = [0, 0, 1, 0];

    const startGame = new StartGame(repository, randomNumberProvider);
    startGame.execute();

    expect(repository.grid).toEqual([
      [2, null, null, null],
      [2, null, null, null],
      [null, null, null, null],
      [null, null, null, null],
    ]);
  });
});
