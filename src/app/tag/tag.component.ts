import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { share, tap } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { Exmaple, Label } from '../suggestion/example';

function generateExamples(n: number): Exmaple['similar'] {
  return Array.from('_'.repeat(n)).map((_, i) => ({
    label: {
      idx: i,
      name: `intent_${i}`,
    },
    score: Number(Math.random().toFixed(2)),
    text: `user_action_${i} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut`,
  }));
}

function generateLabels(n: number): Label[] {
  return Array.from('_'.repeat(n)).map((_, i) => ({
    idx: i,
    name: `label_${i}`,
  }));
}

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagComponent implements OnInit {
  dummyExample: Exmaple = {
    text: 'USER ACTION',
    label: {
      idx: 0,
      name: 'intent_1',
    },
    similar: generateExamples(6),
  };

  dummyLabels = generateLabels(20);

  example$: Observable<Exmaple>;

  labels$: Observable<Label[]>;

  size: number = 200;

  current: number;

  private suggestionElements: HTMLElement[];

  private selectLabelElement: HTMLInputElement;

  constructor(
    private api: ApiService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private changeDetectoRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.api
      .getSize()
      .pipe(tap((size) => (this.size = size)))
      .subscribe({ next: () => {} });
    this.labels$ = this.api.getLabels();
    this.activatedRoute.paramMap.subscribe((params) => {
      this.current = Number(params.get('id'));
      this.example$ = this.api.getExample(this.current).pipe(
        share(),
        tap(() => this.initFocus()),
        tap(() => this.initHighlight())
      );
      this.changeDetectoRef.markForCheck();
    });
  }

  private initFocus(): void {
    setTimeout(() => {
      (document.querySelector('app-suggestion')
        ?.firstChild as HTMLElement)?.focus();
      this.suggestionElements = Array.from(
        document.querySelectorAll('app-suggestion')
      );
      this.selectLabelElement = document.querySelector('app-select-label')
        ?.firstElementChild as HTMLInputElement;
    });
  }

  private initHighlight(): void {
    setTimeout(() => {
      (document.querySelector('li.selected') as HTMLElement).classList.add(
        'active'
      );
    });
  }

  nextExample(): void {
    if (this.current < this.size - 1) {
      this.router.navigate([`${this.current + 1}`]);
    }
  }

  prevExample(): void {
    if (this.current > 0) {
      this.router.navigate([`${this.current - 1}`]);
    }
  }

  onSubmit($event: Event): void {
    $event.preventDefault();
    const { value } = this.selectLabelElement;
    const id = document.querySelector(`option[value="${value}"]`)?.id;
    this.api.tag(this.current, Number(id)).subscribe();
    this.nextExample();
  }

  onTag(idx: number): void {
    this.api.tag(this.current, idx).subscribe();
    this.nextExample();
  }

  onKeydown($event: KeyboardEvent): void {
    if ($event.key.startsWith('Arrow')) {
      this.onArrowdown($event);
    } else if (!isNaN(parseInt($event.key, 10))) {
      this.onNumdown($event);
    } else if ($event.key === 'Escape') {
      this.nextExample();
    }
  }

  private onNumdown($event: KeyboardEvent): void {
    const i = Number($event.key) - 1;
    if (i >= 0) {
      this.focusFirstElementChild(this.suggestionElements[i]);
    } else if (i === -1) {
      this.selectLabelElement.focus();
      $event.preventDefault();
    }
  }

  private onArrowdown($event: KeyboardEvent): void {
    const target = $event.target as HTMLElement;
    switch ($event.key) {
      case 'ArrowDown':
        this.moveFocus(target, 'next');
        break;
      case 'ArrowUp':
        this.moveFocus(target, 'prev');
        break;
      default:
        return;
    }
  }

  private moveFocus(target: HTMLElement, dir: 'next' | 'prev'): void {
    if (dir === 'next') {
      const next =
        target.parentElement.parentElement.nextElementSibling
          ?.firstElementChild;
      (next?.firstElementChild as HTMLElement)?.focus();
    } else {
      (target.parentElement.parentElement.previousElementSibling
        ?.firstElementChild.firstElementChild as HTMLElement)?.focus();
    }
  }

  private focusFirstElementChild(element: Element): void {
    (element?.firstElementChild as HTMLElement)?.focus();
  }
}
