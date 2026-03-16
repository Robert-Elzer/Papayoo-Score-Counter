import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-player',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-player.html'
})

export class AddPlayerComponent {
@Output() navigate = new EventEmitter<string>();
playerName: string = '';

constructor(public gameService: GameService) {}

get canStartGame(): boolean {
  return this.gameService.players.length >= 3;
}

addPlayer() {
  const name = this.playerName.trim();
  if (name.length === 0) {
    alert('Please enter a player name.');
    return;
  }
  if (this.gameService.players.length >= 8) {
    console.log('BLOCKING: Limit reached');
    alert('Maximum of 8 players allowed.');
    return;
  }
  console.log('SUCCESS: Adding player now')
  this.gameService.addPlayer(name);
  this.playerName = '';
}

confirmPlayer() {
  if (this.playerName.trim().length > 0) {
    this.gameService.addPlayer(this.playerName.trim());
    this.playerName = '';
    this.navigate.emit('start');
  }
}

removePlayer(index: number) {
  this.gameService.removePlayer(index);
}

startGame() {
  if (this.gameService.players.length < 3) return;
  if (this.canStartGame) {
    this.navigate.emit('score');
  }
}
cancel() {
  this.navigate.emit('start');
}
}
