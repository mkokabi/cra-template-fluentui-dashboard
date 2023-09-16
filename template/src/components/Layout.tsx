import {
    CommandBar,
    ICommandBarItemProps,
    IProgressIndicatorStyles,
    ITextStyles,
    Nav,
    ProgressIndicator,
    Stack,
    Text,
    mergeStyles,
  } from "@fluentui/react";
  import React, { useState } from "react";
  
  const Layout = () => {
    const logoBackground = mergeStyles({
      backgroundImage: "linear-gradient(to right, lightblue, #FFFFFF)",
    });
  
    const titleTextStyles: Partial<ITextStyles> = {
      root: {
        paddingLeft: "14px",
        paddingTop: "14px",
      },
    };
  
    const subtitleTextStyles: Partial<ITextStyles> = {
      root: {
        paddingLeft: "5px",
      },
    };
  
    const progressBarStyles: IProgressIndicatorStyles = {
      itemDescription: "",
      itemName: "",
      itemProgress: { padding: "0px 0px" },
      progressBar: "",
      progressTrack: "",
      root: {},
    };
    const [isInProgress, setIsInProgress] = useState(true);
    const [isConnected, setIsConnected] = useState(true);
    const [notifications, setNotifications] = useState<string[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [profileData, setProfileData] = useState({givenName: "John", surname: "Doe"});
  
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
                  key: "profile",
                  text: "Profile",
                  ariaLabel: "Profile",
                  onClick: async () => {},
                },
                {
                  key: "logout",
                  text: "Logout",
                  onClick: () => {},
                },
                {
                  key: "about",
                  text: "About",
                  ariaLabel: "About",
                  onClick: () => {
                      setIsInProgress(false);
                  },
                },
              ],
            },
          },
    ];
  
    return (
      <>
        <Stack
          horizontal
          styles={{
            root: {
              backgroundImage: "linear-gradient(to right, lightblue, #FFFFFF)",
            },
          }}
        >
          <Stack.Item className={logoBackground}>
            <Text variant="xxLarge" styles={titleTextStyles}>
              Title
            </Text>
            <Text styles={subtitleTextStyles}>Sub title</Text>
          </Stack.Item>
          <Stack.Item grow>
            <CommandBar
              className="Header"
              items={_items}
              farItems={_farItems}
              ariaLabel="Items actions"
              primaryGroupAriaLabel="Items actions"
              farItemsGroupAriaLabel="More actions"
            />
          </Stack.Item>
        </Stack>
        <Stack>
          <ProgressIndicator
            styles={progressBarStyles}
            percentComplete={!isInProgress ? 0 : undefined}
          />
          <Stack horizontal>
            <Nav
              groups={[
                {
                  links: [
                    { name: "Home", url: "/" },
                    { name: "About", url: "/about" },
                  ],
                },
              ]}
            />
          </Stack>
        </Stack>
      </>
    );
  };
  
  export default Layout;
  