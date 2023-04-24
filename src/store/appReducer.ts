import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppPrice, MLeistung, Order, Service } from "um-types";
import { appRequest } from "../api";
import { Urls } from "../api/Urls";

import { set } from "lodash";
import { AppState } from ".";

export interface AppOptions {
  [name: string]: any;
}

export const uploadOrder = createAsyncThunk(
  "uploadOrder",
  (cb: (id: string | number) => void, thunkApi) => {
    const {
      app: { current },
    } = thunkApi.getState() as AppState;

    return appRequest("post")(Urls.orderById(""), current).then((res) => {
      cb(res.id);
    });
  }
);

export const loadAllOptions = createAsyncThunk("loadAllOptions", () => {
  return appRequest("get")(Urls.options());
});

export const loadAllServices = createAsyncThunk("loadAllServices", () => {
  return appRequest("get")(Urls.services());
});

interface AppSlice {
  current: Order;
  options: AppOptions;
  services: Service[];
  selectedPriceID: string | undefined;
}

const initialState: AppSlice = {
  selectedPriceID: undefined,
  current: {
    src: "express",
    customer: {
      telNumber: "",
    },
    from: {
      demontage: false,
    },
    to: {
      montage: false,
    },
    time: "08:00",
    prices: {},
    timeBased: {},
    leistungen: new Array<MLeistung>(),
    images: new Array<string>(),
  } as Order,
  options: {},
  services: new Array<Service>(),
};

export const saveOrder = createAsyncThunk(
  "saveOrder",
  (callback: (id: number | string) => void, thunkApi) => {
    const state = thunkApi.getState() as AppState;

    const currentOrder = state.app.current;

    if (currentOrder !== null) {
      return appRequest("post")(Urls.orderById(""), currentOrder).then(
        (res) => {
          callback(res.id);
        }
      );
    }
  }
);

const appSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setSelectedPriceId(
      state,
      action: PayloadAction<{ id: string | undefined }>
    ) {
      state.selectedPriceID = action.payload.id;
      const curPrice = state.services.find(
        (s) => s.id == action.payload.id
      ) as AppPrice;

      const { hourPrice, includedHours, sum, workers, t35, t75 } = curPrice;

      const next = state.current;
      set(next, ["timeBased", "basis"], sum);
      set(next, ["timeBased", "extra"], hourPrice);
      set(next, ["timeBased", "hours"], includedHours);
      set(next, ["transporterNumber"], t35);
      set(next, ["workersNumber"], workers);
      state.current = next;
    },
    calculateOrder(state) {
      const hvzPriceOption = state.options["hvzPrice"];

      let nmb = 0;

      if (state.current.from.parkingSlot) {
        nmb = ++nmb;
      }

      if (state.current.to.parkingSlot) {
        nmb = ++nmb;
      }

      const halteverbotszonen = nmb * Number(hvzPriceOption);

      const orderSum =
        (Number(state.current.timeBased.basis) || 0) + halteverbotszonen;
      const next = state.current;

      set(next, ["sum"], orderSum);
      set(next, ["prices", "halteverbotszonen"], halteverbotszonen);

      state.current = next;
    },
    updateOrderProps(
      state,
      action: PayloadAction<{ path: string[]; value: any }>
    ) {
      const { path, value } = action.payload;

      const next = state.current;
      set(next, path, value);

      state.current = next;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadAllOptions.fulfilled, (state, action) => {
        state.options = action.payload;
      })
      .addCase(loadAllServices.fulfilled, (state, action) => {
        state.services = action.payload;
      });
  },
});

const appReducer = appSlice.reducer;

export const { updateOrderProps, setSelectedPriceId, calculateOrder } =
  appSlice.actions;

export { appReducer };
