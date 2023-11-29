import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { CardActions, CardMedia, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Order, SendData } from "um-types";
import { ColFlexBox } from "../../shared/components/ColFlexBox";
import { GridContainer } from "../../shared/components/GridContainer";
import { useOption } from "../../shared/hooks";
import { AppState } from "../../store";
import { addImageData, removeImageData } from "../../store/appReducer";

function createFolderPath() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `public/${year}/${month}/${day}/`;
}

export const ImageUploader = () => {
  const poolId = useOption("poolId");

  const [showLoading, setShowLoading] = useState(false);

  const dispatch = useDispatch();

  let client: S3Client | null = null;

  useEffect(() => {
    const region = "eu-central-1";
    if (poolId) {
      client = new S3Client({
        region,
        credentials: fromCognitoIdentityPool({
          identityPoolId: poolId,
          clientConfig: { region },
        }),
      });
    }
  }, [poolId]);

  async function onFilesChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files !== null) {
      setShowLoading(true);
      const path = createFolderPath();

      if (client === null) {
        return;
      }
      const Bucket = "umzug.meister";
      for (let i = 0; i < files.length; i++) {
        let currentFile = files.item(i);
        if (currentFile !== null) {
          const Key = path.concat(currentFile.name);
          const putCommand = new PutObjectCommand({
            Bucket,
            Key,
            Body: currentFile,
          });

          await client.send(putCommand);

          const response = `https://s3.eu-central-1.amazonaws.com/${Bucket}/${Key}`;

          // dispatch(addImageData({ sendData: { Bucket, }}))
          console.log(response);

          // const promise = upload.promise();
          // promises.push(promise);
          // promise
          //   .then((sendData) => {
          //     dispatch(addImageData({ sendData }));
          //   })
          //   .catch((err) => console.log(err));
        }
      }
      setShowLoading(false);

      // Promise.all(promises).then(() => {
      //   setShowLoading(false);
      // });
    }
  }

  function onRemove(sendData: SendData) {
    dispatch(removeImageData({ sendData }));
  }

  const props = { onFilesChange, onRemove, showLoading };
  return <ImageUploaderRenderer {...props} />;
};

interface Props {
  onRemove(sd: SendData): void;
  onFilesChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  showLoading: boolean;
}

const ImageUploaderRenderer: React.FC<Props> = ({
  showLoading,
  onFilesChange,
  onRemove,
}) => {
  const { sendData } = useSelector<AppState, Order>((s) => s.app.current);

  return (
    <ColFlexBox alignItems="center">
      {showLoading ? (
        <CircularProgress />
      ) : (
        <Button component="label" variant="outlined">
          Jetzt Bilder anhängen
          <input
            hidden
            onChange={onFilesChange}
            accept="image/*"
            multiple
            type="file"
          />
        </Button>
      )}
      <GridContainer>
        {sendData.map((sd) => (
          <ImagePreview
            url={sd.Location}
            key={sd.Location}
            onRemove={() => onRemove(sd)}
          />
        ))}
      </GridContainer>
    </ColFlexBox>
  );
};

const ImagePreview: React.FC<{ url: string; onRemove: () => void }> = ({
  url,
  onRemove,
}) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card elevation={2} sx={{ padding: 1 }}>
        <CardMedia sx={{ height: 200 }} image={url} />
        <CardActions sx={{ justifyContent: "center" }}>
          <IconButton onClick={onRemove} color="error">
            <DeleteOutlineIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};
