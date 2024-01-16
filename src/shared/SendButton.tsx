import SendIcon from "@mui/icons-material/Send";
import { CircularProgress } from "@mui/material";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Order, OrderSrcType } from "um-types";
import { AppDispatch, AppState } from "../store";
import { calculateOrder, uploadOrder } from "../store/appReducer";
import { AppButton } from "./components/AppButton";
import { useOption } from "./hooks";

interface Props {
  src: OrderSrcType;
  validateFn?: () => boolean;
}

export function SendButton({ src, validateFn = () => true }: Readonly<Props>) {
  const dispatch = useDispatch<AppDispatch>();

  const succesUrl = useOption("successUrl");

  const [uploading, setUploading] = useState(false);

  const { dataPrivacyAccepted } = useSelector<AppState, Order>(
    (s) => s.app.current
  );

  const onUploadRequest = useCallback(() => {
    if (validateFn()) {
      setUploading(true);
      const cb = (id: number | string) => {
        window.location.href = succesUrl;
      };
      dispatch(calculateOrder({ src }));
      dispatch(uploadOrder(cb));
    }
  }, [dispatch]);

  return (
    <AppButton
      disabled={!dataPrivacyAccepted}
      onClick={onUploadRequest}
      endIcon={
        uploading ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          <SendIcon />
        )
      }
      variant="contained"
    >
      Absenden
    </AppButton>
  );
}
