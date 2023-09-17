import { MessageBarType } from "@fluentui/react";
import { atom } from "jotai";

export interface IMessage {
  message: string;
  messageType: MessageBarType;
  actions?: IMessageBarAction[];
}

export interface IMessageBarAction {
  actionLabel: string;
  action: () => {};
}

export const messageAtom = atom<IMessage>({
  message: "",
  messageType: MessageBarType.info,
});

export const successMessageAtom = atom(
  null,
  (_get, set, newText: string) => {
    setTimeout(() => set(messageAtom, { message: '', messageType: MessageBarType.info }), 5000);
    set(messageAtom, { message: newText, messageType: MessageBarType.success })
  }
)

export const errorMessageAtom = atom(
  null, 
  (_get, set, newText: string) => {
    setTimeout(() => set(messageAtom, { message: '', messageType: MessageBarType.info }), 20000);
    set(messageAtom, { message: newText, messageType: MessageBarType.error });
  }
)

export const clearMessageAtom = atom(
  null, 
  (_get, set) => set(messageAtom, { message: '', messageType: MessageBarType.info })
)

export const messageBarAtom = atom(
  null,
  (_get, set, newText: string, messageType: MessageBarType, actions?: IMessageBarAction[]) => {
    setTimeout(() => set(messageAtom, { message: '', messageType: MessageBarType.info }), 5000);
    set(messageAtom, { message: newText, messageType: messageType, actions: actions })
  }
)

export const isInProgressAtom = atom<boolean>(false);