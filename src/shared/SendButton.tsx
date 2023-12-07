import SendIcon from "@mui/icons-material/Send";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Order } from "um-types";
import { AppDispatch, AppState } from "../store";
import { calculateOrder, SrcType, uploadOrder } from "../store/appReducer";
import { AppButton } from "./components/AppButton";

interface Props {
  scrollToRoot: () => void;
  src: SrcType;
}

export function SendButton({ scrollToRoot, src }: Readonly<Props>) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [uploading, setUploading] = useState(false);

  const { dataPrivacyAccepted } = useSelector<AppState, Order>(
    (s) => s.app.current
  );

  const onUploadRequest = useCallback(() => {
    setUploading(true);
    const cb = (id: number | string) => {
      setTimeout(() => {
        scrollToRoot();
        navigate(`/success/${id}`);
      }, 1000);
    };
    dispatch(calculateOrder({ src }));
    dispatch(uploadOrder(cb));
  }, [dispatch]);

  return (
    <AppButton
      disabled={!dataPrivacyAccepted || uploading}
      onClick={onUploadRequest}
      endIcon={<SendIcon />}
      variant="contained"
    >
      Absenden
    </AppButton>
  );
}
