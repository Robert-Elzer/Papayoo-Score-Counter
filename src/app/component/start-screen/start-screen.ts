import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './start-screen.html',  
})

export class StartScreenComponent {
  @Output() navigate = new EventEmitter<string>();

  constructor(public gameService: GameService) {}

  get hasEnoughPlayers(): boolean {
    const count = this.gameService.players.length;
    return count >= 3 && count <= 8;
  }

  onAddPlayerClick() {
    this.navigate.emit('input');
  }

  onStartGameClick() {
    const playerCount = this.gameService.players.length;
    if (playerCount < 3) {
      alert('At least 3 players are required to start the game.');
      return;
    } else if (playerCount > 8) {
      alert('A maximum of 8 players can play the game.');
      return;
    } else {
      this.navigate.emit('score');
    }
  }
}


