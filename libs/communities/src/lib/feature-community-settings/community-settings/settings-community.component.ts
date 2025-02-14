import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tt-settings-community',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settings-community.component.html',
  styleUrl: './settings-community.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsCommunityComponent {}
