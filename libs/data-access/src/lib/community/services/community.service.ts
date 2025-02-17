import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Community } from '../interfaces/community.interface';
import { tap } from 'rxjs';
import { Pageble } from '@tt/shared';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  baseApiUrl = 'https://icherniakov.ru/yt-course/';

  http = inject(HttpClient);

  filteredCommunities = signal<Community[]>([]);

  filterCommunities(params: Record<string, any>) {
    return this.http
      .get<Pageble<Community>>(`${this.baseApiUrl}community/`, {
          params
        }
      ).pipe(
        tap((res) => this.filteredCommunities.set(res.items)));
  }
}


