import { Observable } from 'rxjs';

export function imageLoader(src: string): Observable<HTMLImageElement> {
  return new Observable((observer) => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      observer.next(image);
      observer.complete();
    };
    image.onerror = (err) => {
      observer.error(err);
    };
  });
}
