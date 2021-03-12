import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Label } from '../suggestion/example';

@Component({
  selector: 'app-select-label',
  templateUrl: './select-label.component.html',
  styleUrls: ['./select-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectLabelComponent {
  @Input()
  labels: Label[];

  @Input()
  value: string;

  onChange($event: Event): void {
    const input = $event.target as HTMLInputElement;
    const datalist = input.list as HTMLDataListElement;
    const isValid = Array.from(datalist.options)
      .map((o) => o.value)
      .includes(input.value);
    if (!isValid) {
      input.setCustomValidity('Please select a valid label');
    } else {
      input.setCustomValidity('');
    }
  }
}
