import { CommandBar, ICommandBarItemProps } from "@fluentui/react";
import { PropsWithChildren, useState } from "react";
import { errorMessageAtom, successMessageAtom } from "../atoms/messageBarAtoms";
import { useSetAtom } from "jotai";

export interface ITopBarProps {
  onSignOut: () => void;
}

const TopBar = (props: PropsWithChildren<ITopBarProps>) => {
  const [isInProgress, setIsInProgress] = useState(false);
  const setSuccessMessage = useSetAtom(successMessageAtom);
  const setErrorMessage = useSetAtom(errorMessageAtom);

  const [isConnected, setIsConnected] = useState(true);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [profileData, setProfileData] = useState({
    givenName: "John",
    surname: "Doe",
  });

  const _items: ICommandBarItemProps[] = [];

  const _farItems: ICommandBarItemProps[] = [
    {
      key: "connectionStatus",
      text: "Connection Status",
      ariaLabel: "Connection Status",
      iconOnly: true,
      iconProps: {
        iconName: isConnected ? "PlugConnected" : "PlugDisconnected",
      },
    },
    {
      key: "notifications",
      text:
        notifications.length > 0 ? notifications.length.toString() : undefined,
      ariaLabel: "Notifications",
      buttonStyles: {
        textContainer: {
          position: "absolute",
          left: 3,
          top: 5,
          backgroundColor: "red",
          color: "white",
          borderRadius: 5,
        },
      },
      iconProps: { iconName: "Ringer" },
      onClick: () => {},
    },
    !isAuthenticated
      ? {
          key: "login",
          text: "Login",
          ariaLabel: "Login",
          iconOnly: true,
          iconProps: { iconName: "FollowUser" },
          onClick: () => {},
        }
      : {
          key: "signedIn",
          text: `${profileData.givenName ?? ""} ${profileData.surname ?? ""}`,
          ariaLabel: "Signed In",
          iconOnly: true,
          iconProps: { iconName: "Contact" },
          subMenuProps: {
            items: [
              {
                key: "toggleInProgress",
                text: "Toggle In Progress",
                ariaLabel: "Toggle In Progress",
                onClick: async () => {
                  setIsInProgress(!isInProgress);
                },
              },
              {
                key: "showSuccessMessage",
                text: "Success Message",
                ariaLabel: "Success Message In Message Bar",
                onClick: async () => {
                  setSuccessMessage("This is a success message");
                },
              },
              {
                key: "showErrorMessage",
                text: "Error Message",
                ariaLabel: "Error Message In Message Bar",
                onClick: async () => {
                  setErrorMessage("This is a error message");
                },
              },
              {
                key: "profile",
                text: "Profile",
                ariaLabel: "Profile",
                onClick: async () => {},
              },
              {
                key: "logout",
                text: "Logout",
                onClick: () => {
                  props.onSignOut();
                },
              },
              {
                key: "about",
                text: "About",
                ariaLabel: "About",
                onClick: () => {},
              },
            ],
          },
        },
  ];

  return (
    <CommandBar
      className="Header"
      items={_items}
      farItems={_farItems}
      ariaLabel="Items actions"
      primaryGroupAriaLabel="Items actions"
      farItemsGroupAriaLabel="More actions"
    />
  );
};
export default TopBar;
