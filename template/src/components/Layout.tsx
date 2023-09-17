import {
    CommandBar,
    ICommandBarItemProps,
    INavLinkGroup,
    INavStyles,
    IProgressIndicatorStyles,
    ITextStyles,
    MessageBar,
    Nav,
    ProgressIndicator,
    Stack,
    Text,
    mergeStyles,
  } from "@fluentui/react";
  import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
  
  const Layout = (props: any) => {
    const logoBackground = mergeStyles({
      backgroundImage: "linear-gradient(to right, lightblue, #FFFFFF)",
    });
  
    const navigate = useNavigate();
  
    const [navExpanded, setNavExpanded] = useState(true);
    const [isInProgress, setIsInProgress] = useState(false);
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
                    setIsInProgress(!isInProgress);
                  },
                },
              ],
            },
          },
    ];
  
    const navLinks: INavLinkGroup[] = [
      {
        links: [
          {
            name: "",
            url: "",
            icon: navExpanded ? "DoubleChevronLeft8" : "DoubleChevronRight8",
            onClick: () => {
              if (navExpanded) {
                setNavExpanded(false);
              } else {
                setNavExpanded(true);
              }
            },
          },
          {
            name: "Home",
            url: "/",
            expandAriaLabel: "Assets list",
            collapseAriaLabel: "Assets list",
            iconProps: {
              iconName: "Home",
              styles: { root: { color: "green" } },
            },
          },
          {
            name: "Items",
            url: "/items",
            expandAriaLabel: "Zones list",
            collapseAriaLabel: "Zones list",
            iconProps: {
              iconName: "CubeShape",
              styles: { root: { color: "goldenRod" } },
            },
          },
        ],
      },
    ];
  
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
  
    const navStyles: Partial<INavStyles> = {
      root: {
        width: navExpanded ? 180 : 42,
        boxSizing: "border-box",
        border: "1px solid #eee",
        overflowY: "auto",
        backgroundImage: "linear-gradient(to right, #FFFFFF, #FAFAFA)",
      },
    };
  
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
              onLinkClick={(e, link) => {
                e?.preventDefault();
                //   clearMessage();
                //   setActiveNav(link?.key ?? "");
                if (link?.url) {
                  navigate(link?.url);
                }
              }}
              ariaLabel="Nav"
              styles={navStyles}
              groups={navLinks}
              // onLinkExpandClick={(_, item?: INavLink) => {
              //   setExpandedNav(item?.key ?? "");
              // }}
            />
            <Stack grow style={{ display: "flex" }}>
              {/* {message.message ? (
                <MessageBar
                  messageBarType={message.messageType}
                  isMultiline={false}
                  dismissButtonAriaLabel="Close"
                  onDismiss={() => clearMessage()}
                  actions={
                    <div>
                      {message.actions?.map((a) => (
                        <MessageBarButton onClick={a.action}>
                          {a.actionLabel}
                        </MessageBarButton>
                      ))}
                    </div>
                  }
                >
                  {message.message}
                </MessageBar>
              ) : (
                <></>
              )} */}
              <Stack
                horizontal
                disableShrink
                tokens={{
                  childrenGap: 5,
                }}
              >
                <Stack.Item align="stretch" grow>
                  <Text
                    variant="xLargePlus"
                    styles={{ root: { padding: "10px 14px 25px 25px" } }}
                  ></Text>
                </Stack.Item>
                <Stack.Item align="end"></Stack.Item>
              </Stack>
              <div
                style={{
                  padding: "10px 14px 25px 25px",
                  overflow: "auto",
                  height: "720px",
                }}
              >
                {props.children}
              </div>
            </Stack>
          </Stack>
        </Stack>
      </>
    );
  };
  
  export default Layout;
  