import { atom } from "jotai";
export interface IProfileData {
  givenName: string,
  surname: string,
  userPrincipalName: string,
  email: string,
  id: string,
  roles: string[],
  permissions: number[],
}
export const profileDataAtom = atom<IProfileData>({
  givenName: "",
  surname: "",
  userPrincipalName: "",
  email: "",
  id: "",
  roles: [],
  permissions: [],
});

export const isAuthenticatedAtom = atom<boolean>(
  (get) => !!get(profileDataAtom)
)

