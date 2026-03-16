import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service.js';
import { Player } from '../../models/player.modal.js';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results.html'
})
export class ResultsComponent {
  @Output() navigate = new EventEmitter<string>();

  constructor(public gameservice: GameService) {}

  get sortedPlayers(): Player[] {
    return [...this.gameservice.players].sort((a, b) => a.totalScore - b.totalScore);
  }

  restartGame() {
    this.gameservice.resetGame();
    this.navigate.emit('start');
  }
}
