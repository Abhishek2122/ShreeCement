import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';
// if (environment.production) {
//   enableProdMode();
//   window.console.log = () => { };
//   window.console.warn = () => { };
//   window.console.error = () => { };
//   window.console.clear();
// }
platformBrowserDynamic().bootstrapModule(AppModule).then((ref) => {}).catch((err) => console.error(err));
