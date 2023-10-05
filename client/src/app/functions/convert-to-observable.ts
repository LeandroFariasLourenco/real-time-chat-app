import { Observable } from "rxjs";
import { SocketIoClient } from "../clients/socket-io";
import { NgZone } from "@angular/core";

export const socketEventToObservable = <T>(event: string): Observable<T> => {
  const zone = new NgZone({ enableLongStackTrace: true });

  return new Observable((observer) => {
    SocketIoClient.on(event, (params: T) => {
      zone.run(() => {
        observer.next(params);
      });
    });
  });
}