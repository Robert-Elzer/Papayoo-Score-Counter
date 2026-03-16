import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl }  from '@angular/forms';
import { GameService } from '../../services/game.service';
import { Player } from '../../models/player.modal.js';

@Component({
  selector: 'app-score-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './score-table.html'
})
export class ScoreTableComponent implements OnInit {
  @Output() navigate = new EventEmitter<string>();
  scoreForm: FormGroup = new FormGroup({});

  isHistoryOpen = false;

  constructor(public gameService: GameService) {}

  ngOnInit() {
    //create input for each player added
    this.gameService.players.forEach((player: Player) => {
      this.scoreForm.addControl(player.name, new FormControl(0));
    });
  }

  toggleHistory() {
    this.isHistoryOpen = !this.isHistoryOpen;
  }

  confirmUndo() {
    if (confirm("Are you sure you want to delete the last round?")) {
      this.gameService.undoLastRound();
    }
  }

  get currentTotal() : number {
    const values = this.scoreForm.value;
    return Object.values(values).reduce((sum: number, val: any) => sum + (Number(val) || 0), 0);
  }

  get isValidTotal() : boolean {
    const validTotals = [210, 250, 290, 330, 370];
    return validTotals.includes(this.currentTotal);
  }

  submitRound(event?: Event) {

    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    const roundScores = this.scoreForm.value;
    const validTotals = [210, 250, 290, 330, 370];
    //Check if the sum of inputs is the correct value
    const total = Number(Object.values(roundScores).reduce((a: any, b: any) => Number(a) + Number(b), 0));
    
    if (validTotals.includes(total)) {
      // Proceed to the next round or finish the game
      this.gameService.submitRound(roundScores);
      // Reset the form for the next round
      this.scoreForm.reset();
      this.gameService.players.forEach(p => {
        this.scoreForm.get(p.name)?.setValue(0);
      })
    }
     else {
      alert(`The total score must be 210, 250, 290, 330 or 370. Currently it is ${total}. Please adjust the scores accordingly.`);
    }
  }

  finishGame() {
    this.navigate.emit('results');
  }
}
