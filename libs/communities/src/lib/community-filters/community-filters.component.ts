import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SvgIconComponent } from '@tt/common-ui';

@Component({
  selector: 'community-filters',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SvgIconComponent],
  templateUrl: './community-filters.component.html',
  styleUrl: './community-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommunityFiltersComponent {
  fb = inject(FormBuilder);

  communitySearchForm = this.fb.group({
    communityName: [''],
    theme: [''],
    tags: ['']
  });
}
