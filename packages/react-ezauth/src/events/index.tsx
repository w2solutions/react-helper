import { DefaultUser } from "..";

export enum EzAuthEventType {
  SIGNED_IN,
  SIGNED_OUT,
  INITIALIZED,
}

interface SignedInEvent {
  type: EzAuthEventType.SIGNED_IN
  user: DefaultUser
}

interface InitializedEvent {
  type: EzAuthEventType.INITIALIZED
  user?: DefaultUser
}

interface SignedOutEvent {
  type: EzAuthEventType.SIGNED_OUT
}

export type EzAuthEvent =
  | SignedInEvent
  | SignedOutEvent
  | InitializedEvent


export { ezAuthEventHub } from './EventHub'