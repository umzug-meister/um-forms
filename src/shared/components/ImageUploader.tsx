import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { CardActions, CardMedia, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BucketObject, Order } from "um-types";
import { ColFlexBox } from "./ColFlexBox";
import { GridContainer } from "./GridContainer";
import { AppState } from "../../store";
import { addImageData, removeImageData } from "../../store/appReducer";

function createFolderPath(dateAsString: string | undefined) {
  const date = dateAsString ? new Date(dateAsString) : new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `public/${year}/${month}/${day}/`;
}

export default function ImageUploader() {
  const poolId = import.meta.env.VITE_AWS_POOL_ID;

  const { bucketImages, date, date_to } = useSelector<AppState, Order>(
    (s) => s.app.current
  );

  const [showLoading, setShowLoading] = useState(false);

  const dispatch = useDispatch();

  const clientRef = useRef<S3Client | null>(null);

  useEffect(() => {
    const region = "eu-central-1";
    if (poolId) {
      clientRef.current = new S3Client({
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
      const path = createFolderPath(date || date_to);

      if (clientRef.current === null) {
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

          const { ETag } = await clientRef.current.send(putCommand);

          const Location = `https://s3.eu-central-1.amazonaws.com/${Bucket}/${Key}`;

          const bucketObject: BucketObject = {
            Bucket,
            Key,
            Location,
            ETag: ETag ?? "",
          };

          dispatch(addImageData({ bucketObject }));
        }
      }
      setShowLoading(false);
    }
  }

  function onRemove(ETag: string) {
    dispatch(removeImageData({ ETag }));
  }

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
        {bucketImages.map(({ ETag, Location }) => (
          <ImagePreview
            url={Location}
            key={ETag}
            onRemove={() => onRemove(ETag)}
          />
        ))}
      </GridContainer>
    </ColFlexBox>
  );
}

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
