import { Label, mergeStyleSets, Stack, TextField } from "@fluentui/react";
import { DialogType } from "@fluentui/react/lib/Dialog";

import { useAtomValue } from "jotai";
import { profileDataAtom } from "../atoms/authAtoms";

const Profile = () => {
  const dialogContentProps = {
    type: DialogType.normal,
    title: "Profile",
    closeButtonAriaLabel: "Close",
  };

  const profileData = useAtomValue(profileDataAtom);
  const styles = mergeStyleSets({
    labelColumn: {
      width: "100px",
    },
  });
  return (
    <>
      <Stack tokens={{ childrenGap: 5 }}>
        <Stack horizontal>
          <Label className={styles.labelColumn}>First Name: </Label>
          <TextField
            data-testid="firstNameText"
            readOnly
            value={profileData.givenName}
            borderless
          ></TextField>
        </Stack>
        <Stack horizontal>
          <Label className={styles.labelColumn}>Last Name: </Label>
          <TextField
            data-testid="lastNameText"
            readOnly
            value={profileData.surname}
            borderless
          ></TextField>
        </Stack>
        <Stack horizontal>
          <Label className={styles.labelColumn}>Username: </Label>
          <TextField
            data-testid="emailText"
            readOnly
            value={profileData.userPrincipalName}
            borderless
          ></TextField>
        </Stack>
        <Stack horizontal>
          <Label className={styles.labelColumn}>Email: </Label>
          <TextField
            data-testid="emailText"
            readOnly
            value={profileData.userPrincipalName}
            borderless
          ></TextField>
        </Stack>
        <Stack horizontal>
          <Label className={styles.labelColumn}>Id: </Label>
          <TextField
            data-testid="idText"
            readOnly
            value={profileData.id}
            borderless
          ></TextField>
        </Stack>
      </Stack>
    </>
  );
};

export default Profile;
