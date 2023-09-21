import {
  IProgressIndicatorStyles,
  ITextStyles,
  MessageBar,
  MessageBarButton,
  ProgressIndicator,
  Stack,
  Text,
  mergeStyles,
} from "@fluentui/react";
import { useAtomValue, useSetAtom } from "jotai";
import { PropsWithChildren, useState } from "react";
import {
  clearMessageAtom,
  messageAtom,
} from "../atoms/messageBarAtoms";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export interface ILayoutProps {
  onSignOut: () => void;
}

const Layout = (props: PropsWithChildren<ILayoutProps>) => {
  const logoBackground = mergeStyles({
    backgroundImage: "linear-gradient(to right, lightblue, #FFFFFF)",
  });

  const message = useAtomValue(messageAtom);
  const clearMessage = useSetAtom(clearMessageAtom);

  const [isInProgress, setIsInProgress] = useState(false);

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
          <TopBar onSignOut={props.onSignOut} />
        </Stack.Item>
      </Stack>
      <Stack>
        <ProgressIndicator
          styles={progressBarStyles}
          percentComplete={!isInProgress ? 0 : undefined}
        />
        <Stack horizontal>
          <Sidebar />

          <Stack grow style={{ display: "flex" }}>
            {message.message ? (
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
            )}
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
