import { Random, Console } from '@woowacourse/mission-utils';
class App {
  async play() {
    try {
      let players = await this.userInput(1);
      this.validateInputPlayers(players);
      players = players = players.split(',');
      console.log(players);
      const games = await this.userInput(2);
      this.validateGames(games);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  userInput(type) {
    let input;
    if (type === 1) {
      input = Console.readLineAsync(
        '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)'
      );
    } else if (type === 2) {
      input = Console.readLineAsync('시도할 횟수는 몇 회인가요?');
    }
    return input;
  }
  validateInputPlayers(input) {
    const players = input.split(',');
    if (players.length < 2) {
      throw new Error('플레이어는 1명 이상입력해주세요');
    }
    players.map((player) => this.validatePlayer(player));
    // console.log('올바른 입력입니다.');
    return players;
  }
  validatePlayer(player) {
    console.log(player);
    if (player.trim() === '') {
      this.ExceptionOccurred();
    }
    if (player.length > 5) {
      this.ExceptionOccurred();
    }
  }
  validateGames(input) {
    if (isNaN(input)) {
      this.ExceptionOccurred();
    }
  }
  ExceptionOccurred() {
    throw new Error('[ERROR] 잘못된 입력입니다.');
  }
  startGame(players, games) {
    let playersMove = new Array(players.length);
    playersMove.fill(0);
    Console.print('실행 결과');
    for (let i = 0; i < Number(games); i++) {
      playersMove = this.moveOrWait(players, playersMove);
      this.printRound(players, playersMove);
      Console.print(' ');
    }
    const winner = this.printWinner(players, playersMove);
    Console.print('최종우승자 : ' + winner.join(', '));
  }
  moveOrWait(players, playersMove) {
    for (let i = 0; i < players.length; i++) {
      if (this.createRandomNumber() >= 4) playersMove[i]++;
    }
    return playersMove;
  }
  createRandomNumber() {
    const randomNumber = Random.pickNumberInRange(0, 9);
    return randomNumber;
  }
  printRound(players, playersMove) {
    for (let i = 0; i < players.length; i++) {
      const moveBar = this.createBar(playersMove[i]);
      Console.print(players[i] + ' : ' + moveBar);
    }
  }
  createBar(playersMove) {
    let bar = '';
    for (let i = 0; i < playersMove; i++) {
      bar += '-';
    }
    return bar;
  }
  printWinner(players, playersMove) {
    const maxMove = Math.max(...playersMove);
    console.log(maxMove);
    let winner = [];
    for (let i = 0; i < players.length; i++) {
      if (playersMove[i] === maxMove) winner.push(players[i]);
    }
    return winner;
  }
}
const app = new App();
app.startGame(['pobi', 'woni', 'jun'], '5');
export default App;
