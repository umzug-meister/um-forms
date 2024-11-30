import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../store";
import { FormsOptions, setOptionValue } from "../../store/appReducer";
import { useEffect } from "react";
import { appRequest } from "../../api";
import { Urls } from "../../api/Urls";

export function useOption(key: keyof FormsOptions) {
  const dispatch = useDispatch<AppDispatch>();

  const optionValue = useSelector<AppState, string>((s) => s.app.options[key]);

  useEffect(() => {
    const loadOption = () => {
      appRequest<{ value: string }>("get")(Urls.options(key)).then(
        ({ value }) => {
          dispatch(setOptionValue({ path: key, value }));
        }
      );
    };
    if (!optionValue) {
      loadOption();
    }
  });

  return optionValue;
}
