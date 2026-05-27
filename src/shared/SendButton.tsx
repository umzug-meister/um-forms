import SendIcon from "@mui/icons-material/Send";
import { CircularProgress } from "@mui/material";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Order, OrderSrcType } from "@umzug-meister/um-core";
import { AppDispatch, AppState } from "../store";
import { calculateOrder, uploadOrder } from "../store/appReducer";
import { AppButton } from "./components/AppButton";
import { validateCustomer } from "./hooks/useValidate";

interface Props {
  src: OrderSrcType;
  shouldValidateCustomer?: boolean;
  onValidation?: (message: string, valid: boolean) => void;
  successPath?: string;
}

export function SendButton({
  src,
  shouldValidateCustomer,
  onValidation,
  successPath = "/erfolg",
}: Readonly<Props>) {
  const dispatch = useDispatch<AppDispatch>();

  const order = useSelector<AppState, Order>((s) => s.app.current);

  const navigate = useNavigate();

  const [uploading, setUploading] = useState(false);

  const { dataPrivacyAccepted } = useSelector<AppState, Order>(
    (s) => s.app.current
  );

  const onUploadRequest = useCallback(async () => {
    try {
      if (shouldValidateCustomer) {
        validateCustomer(order);
      }
      setUploading(true);
      const cb = () => {
        navigate(successPath);
      };
      dispatch(calculateOrder({ src }));
      await dispatch(uploadOrder(cb));
    } catch (e: any) {
      onValidation?.(e.toString(), false);
    } finally {
      setUploading(false);
    }
  }, [dispatch, order, successPath, navigate]);

  return (
    <AppButton
      disabled={!dataPrivacyAccepted || uploading}
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
