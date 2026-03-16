import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StartScreenComponent} from './component/start-screen/start-screen';
import { AddPlayerComponent } from './component/add-player/add-player';
import { ScoreTableComponent  } from './component/score-table/score-table';
import { ResultsComponent } from './component/results/results';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
            CommonModule,
            FormsModule,
            StartScreenComponent,
            AddPlayerComponent,
            ScoreTableComponent,
            ResultsComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class AppComponent {
  currentView = 'start';

  setView(view: string) {
    this.currentView = view;
  }
}