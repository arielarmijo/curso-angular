import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'domseguro'
})
export class DomseguroPipe implements PipeTransform {

  url = 'https://open.spotify.com/embed?uri=';

  constructor(private sanitazer: DomSanitizer) {}

  transform(value: string): SafeResourceUrl  {
    return this.sanitazer.bypassSecurityTrustResourceUrl(this.url + value);
  }

}
