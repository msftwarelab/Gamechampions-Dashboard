import React from "react";
import { styled, media } from "~theme";
import {
  SUCCESS_QUERY_STRING_PARAM,
  PREVACTION_QUERY_STRING_PARAM,
  OBJECT_QUERY_STRING_PARAM
} from "~containers/snackbar/constants";
import { onImageLoad } from "~containers/matchLobby/constants";
import { submitProof } from "~containers/matchLobby/actions";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { FlexBox } from "~components/atoms";

const PhotoProofUpload = ({ match, history, selectedLanguage }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const id = match.get("id");

  return (
    <FlexBox width="100%" margin="0 18px" justifyContent="center">
      <Input
        name={`${name}_file`}
        id={`photoUpload`}
        type="file"
        title=" "
        onChange={e => {
          history.push(
            `/${selectedLanguage}/match-lobby/${id}/?${SUCCESS_QUERY_STRING_PARAM}=true&${PREVACTION_QUERY_STRING_PARAM}=view&${OBJECT_QUERY_STRING_PARAM}=win-claim`
          );
          const files = e.target.files;
          if (files) {
            for (let i = 0; i < files.length; i++) {
              const file = files[i];
              try {
                if (file.size > 1024 * 1024 * 40) {
                  throw "Error: File size is too large";
                }

                // only process image files.
                if (!file.type.match("image.*")) {
                  throw "Error: Invalid filetype";
                }

                const reader = new FileReader();

                // closure to capture the file information
                reader.onload = e => {
                  onImageLoad(file, e.target).then(response => {
                    dispatch(
                      submitProof({
                        matchId: id,
                        fileUrl: response.fileUrl
                      })
                    );
                  });
                };

                // read in the image file as a data URL
                reader.readAsDataURL(file);
              } catch (e) {
                alert(e);
              }
            }
          }
        }}
      />
      <Label htmlFor={"photoUpload"}> {t("ClaimWin")} </Label>
    </FlexBox>
  );
};

export default PhotoProofUpload;

const Input = styled.input`
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
`;

const Label = styled.label`
  width: 100%;
  height: 55px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.colors.secondary};
  font-size: ${({ theme }) => theme.fonts.small}
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  padding: 15px;



  ${media.md`
  width: 154px;
`};
`;
