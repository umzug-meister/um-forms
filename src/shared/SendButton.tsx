import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { calculateOrder, SrcType, uploadOrder } from "../store/appReducer";
import { AppDispatch } from "../store";

interface Props {
  scrollToRoot: () => void;
  src: SrcType;
}

export function SendButton({ scrollToRoot, src }: Readonly<Props>) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onUploadRequest = useCallback(() => {
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
    <Button
      onClick={onUploadRequest}
      endIcon={<SendIcon />}
      variant="contained"
    >
      Anfragen
    </Button>
  );
}
