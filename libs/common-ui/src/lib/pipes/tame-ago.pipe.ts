import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'timeAgo',
   standalone: true
})
export class TimeAgoPipe implements PipeTransform {
   transform(value: string | null): string {
      if (!value) return 'Дата неизвестна';

      const date = new Date(value).getTime();
      const now = Date.now();
      const diff = (now - date) / 1000;

      const timeFrames = [
         { unit: 'секунд', value: 60 },
         { unit: 'минут', value: 60 },
         { unit: 'часов', value: 24 },
         { unit: 'дней', value: Infinity }
      ];

      let amount = diff;
      for (const { unit, value } of timeFrames) {
         if (amount < value) {
            return `${Math.floor(amount)} ${unit} назад`;
         }
         amount /= value;
      }

      return value;
   }
}
