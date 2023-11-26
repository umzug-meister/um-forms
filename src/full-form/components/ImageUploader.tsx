/// <reference types="aws-sdk" />
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Box, CardActions, CardMedia, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";

import { CognitoIdentityCredentials, config, S3 } from "aws-sdk";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Order } from "um-types";
import { ColFlexBox } from "../../shared/components/ColFlexBox";
import { GridContainer } from "../../shared/components/GridContainer";
import { useOption } from "../../shared/hooks";
import { AppState } from "../../store";
import { addImage, removeImage } from "../../store/appReducer";

function initAws(poolId: string) {
  config.update({
    region: "eu-central-1",
    credentials: new CognitoIdentityCredentials({
      IdentityPoolId: poolId,
    }),
  });
}

function createFolderPath(name: string) {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const album = name;
  return `public/${year}/${month}/${day}/${album}/`;
}

export const ImageUploader = () => {
  const {
    images,
    customer: { lastName },
  } = useSelector<AppState, Order>((s) => s.app.current);

  const poolId = useOption("poolId");

  const [showLoading, setShowLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (poolId) {
      initAws(poolId);
    }
  }, [poolId]);

  function onFilesChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files !== null) {
      const promises = new Array<Promise<S3.ManagedUpload.SendData>>();
      setShowLoading(true);
      const path = createFolderPath(lastName);

      for (let i = 0; i < files.length; i++) {
        let currentFile = files.item(i);
        if (currentFile !== null) {
          const upload = new S3.ManagedUpload({
            params: {
              Bucket: "umzug.meister",
              Key: path.concat(currentFile.name),
              Body: currentFile,
            },
          });
          const promise = upload.promise();
          promises.push(promise);
          promise
            .then((data) => {
              dispatch(addImage({ imageUrl: data.Location }));
            })
            .catch((err) => console.log(err));
        }
      }

      Promise.all(promises).then(() => {
        setShowLoading(false);
      });
    }
  }

  function onRemove(url: string) {
    dispatch(removeImage({ imageUrl: url }));
  }

  const props = { images, onFilesChange, onRemove, showLoading };
  return <ImageUploaderRenderer {...props} />;
};

interface Props {
  images: string[];
  onRemove(url: string): void;
  onFilesChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  showLoading: boolean;
}

const ImageUploaderRenderer: React.FC<Props> = ({
  onFilesChange,
  images,
  onRemove,
  showLoading,
}) => {
  return (
    <ColFlexBox>
      <Box>
        {showLoading ? (
          <CircularProgress />
        ) : (
          <Button component="label" variant="outlined">
            Bilder anhängen
            <input
              hidden
              onChange={onFilesChange}
              accept="image/*"
              multiple
              type="file"
            />
          </Button>
        )}
      </Box>
      <GridContainer>
        {images.map((url) => (
          <ImagePreview url={url} key={url} onRemove={() => onRemove(url)} />
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
        <CardMedia sx={{ height: 200 }} image={url}></CardMedia>
        <CardActions>
          <IconButton onClick={onRemove} color="error">
            <DeleteOutlineIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};
