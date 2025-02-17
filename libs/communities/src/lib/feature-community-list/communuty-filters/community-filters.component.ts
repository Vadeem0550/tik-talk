import { ChangeDetectionStrategy, Component, inject, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, startWith, Subscription } from 'rxjs';
import { StackInputComponent, SvgIconComponent, TtInputComponent } from '@tt/common-ui';
import { Community } from 'libs/data-access/src/lib/community/interfaces/community.interface';
import { Store } from '@ngrx/store';
import { communityActions, selectFilteredCommunities } from '../../../../../data-access/src/lib/community';

@Component({
  selector: 'tt-community-filters',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, StackInputComponent, SvgIconComponent, TtInputComponent, FormsModule],
  templateUrl: './community-filters.component.html',
  styleUrl: './community-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityFiltersComponent implements OnDestroy {
  fb = inject(FormBuilder);
  communityStore = inject(Store);

  communities$ = this.communityStore.select(selectFilteredCommunities);

  searchFormSub!: Subscription;

  isDropdownOpened = signal<boolean>(false);
  selectedCommunity = signal<Community | null>(null);

  communitySearchForm = this.fb.group({
    name: [''],
    themes: [''],
    tags: ['']
  });

  constructor() {
    this.searchFormSub = this.communitySearchForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(300)
      ).subscribe(formValue => {
        this.communityStore.dispatch(communityActions.filterEvents({ filters: formValue }));
      });
  }

  toggleDropdown(): void {
    this.isDropdownOpened.set(!this.isDropdownOpened());
  }

  selectCommunity(community: Community | null): void {
    this.selectedCommunity.set(community);
    this.isDropdownOpened.set(false);
  }

  ngOnDestroy(): void {
    this.searchFormSub.unsubscribe();
  }
}
