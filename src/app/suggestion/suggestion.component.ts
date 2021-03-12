import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Exmaple } from './example';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuggestionComponent {
  @Input()
  suggestion: Exmaple['similar'][number];

  @Output()
  tag = new EventEmitter<MouseEvent>();
}
