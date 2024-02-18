import SendIcon from "@mui/icons-material/Send";
import { CircularProgress } from "@mui/material";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Order, OrderSrcType } from "um-types";
import { AppDispatch, AppState } from "../store";
import { calculateOrder, uploadOrder } from "../store/appReducer";
import { AppButton } from "./components/AppButton";
import { useOption } from "./hooks";
import { validateCustomer } from "./hooks/useValidate";

interface Props {
  src: OrderSrcType;
  shouldValidateCustomer?: boolean;
  onValidation?: (message: string, valid: boolean) => void;
}

export function SendButton({
  src,
  shouldValidateCustomer,
  onValidation,
}: Readonly<Props>) {
  const dispatch = useDispatch<AppDispatch>();

  const order = useSelector<AppState, Order>((s) => s.app.current);

  const succesUrl = useOption("successUrl");

  const [uploading, setUploading] = useState(false);

  const { dataPrivacyAccepted } = useSelector<AppState, Order>(
    (s) => s.app.current
  );

  const onUploadRequest = useCallback(() => {
    try {
      if (shouldValidateCustomer) {
        validateCustomer(order);
      }
      setUploading(true);
      const cb = () => {
        window.location.href = succesUrl;
      };
      dispatch(calculateOrder({ src }));
      dispatch(uploadOrder(cb));
    } catch (e: any) {
      onValidation?.(e.toString(), false);
    } finally {
      setUploading(false);
    }
  }, [dispatch, order]);

  return (
    <>
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
    </>
  );
}
