import { Injectable } from '@angular/core';
import { Player } from '../models/player.modal.js';

@Injectable({
  providedIn: 'root'
})

export class GameService {
    players: Player[] = [];
    currentRound = 1;

    addPlayer(playerName: string) {
        const newPlayer: Player = {
            name: playerName,
            roundScores: [],
            totalScore: 0
        };
        this.players.push(newPlayer);
    }

    removePlayer(index: number) {
        this.players.splice(index, 1);
    }

    private lastSubmitTime = 0;

    submitRound(scores: { [key: string]: number}) {
        const now = Date.now();
        if (now - this.lastSubmitTime < 500) return;
        this.lastSubmitTime = now;

        this.players.forEach(player => {
            const score = Number(scores[player.name]) || 0;
            player.roundScores.push(score);
            player.totalScore += score;
        });
        this.currentRound++;
        this.saveToStorage();
    }

    undoLastRound() {
  if (this.players.length === 0 || this.players[0].roundScores.length === 0) return;

  this.players.forEach(player => {
    const removedScore = player.roundScores.pop();
    if (removedScore !== undefined) {
      player.totalScore -= removedScore;
    }
  });

  this.currentRound--;
  this.saveToStorage();
}

    constructor() {
        this.loadFormStorage();        
    }

    private saveToStorage() {
        const data = {
            players: this.players,
            currentRound: this.currentRound
        };
        localStorage.setItem('papayoo_data', JSON.stringify(data));
        }

    private loadFormStorage() {
        const saved = localStorage.getItem('papayoo_data');
        if (saved) {
            const parsed = JSON.parse(saved);
            this.players = parsed.players;
            this.currentRound = parsed.currentRound;
        }
}
resetGame() {
    localStorage.removeItem('papayoo_data');
    this.players = [];
    this.currentRound = 1;
    }
}