import { Observable } from 'rxjs';

export function htmlLoader(html: string): Observable<HTMLImageElement> {
  return new Observable((observer) => {
    const image = new Image();
    image.src =
      'data:image/svg+xml,' +
      encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml">${html}</div></foreignObject></svg>`
      );
    image.onload = () => {
      observer.next(image);
      observer.complete();
    };
    image.onerror = (err) => {
      observer.error(err);
    };
  });
}
