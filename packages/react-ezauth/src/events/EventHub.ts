import Observable from "zen-observable";
import { EzAuthEvent } from ".";

let emitAuthEvent: (event: EzAuthEvent) => void
const ezAuthEventHub = new Observable<EzAuthEvent>(subscriber => {
  emitAuthEvent = (event) => subscriber.next(event)
})

export { emitAuthEvent, ezAuthEventHub }