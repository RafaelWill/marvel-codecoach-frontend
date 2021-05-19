import {Injectable} from '@angular/core';
import {ScriptStore} from './script.store';

@Injectable({
  providedIn: 'root'
})

export class ScriptService {

  private _scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this._scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  public load(...scripts: string[]): void {
    scripts.forEach((script) => this.loadExternalScript(script));
  }

  private loadExternalScript(name: string): void {
    const body = document.body as HTMLDivElement;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = this._scripts[name].src;
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }


}
