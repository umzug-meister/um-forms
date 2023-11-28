import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AppPrice,
  Category,
  Furniture,
  MLeistung,
  Order,
  OrderService,
  SendData,
  Service,
} from "um-types";
import { appRequest } from "../api";
import { Urls } from "../api/Urls";

import { set } from "lodash";
import { AppState } from ".";

interface AppSlice {
  current: Order;
  options: AppOptions;
  furniture: Furniture[];
  services: Service[];
  categories: Category[];
  selectedPriceID: string | undefined;
}

export type SrcType = "express" | "UmzugRuckZuck";

export interface AppOptions {
  [name: string]: any;
}

export const loadAllCategories = createAsyncThunk("loadAllCategories", () => {
  return appRequest("get")(Urls.categories());
});

export const uploadOrder = createAsyncThunk(
  "uploadOrder",
  (cb: (id: string | number) => void, thunkApi) => {
    const {
      app: { current },
    } = thunkApi.getState() as AppState;

    const next = {
      ...current,
      date: new Date(current.date).toLocaleDateString("ru"),
    };

    return appRequest("post")(Urls.orderById(""), next).then((res) => {
      cb(res.id);
    });
  }
);

export const loadAllFurniture = createAsyncThunk("loadAllFurniture", () => {
  return appRequest("get")(Urls.items());
});

export const loadAllOptions = createAsyncThunk("loadAllOptions", () => {
  return appRequest("get")(Urls.options());
});

export const loadAllServices = createAsyncThunk("loadAllServices", () => {
  return appRequest("get")(Urls.services());
});

const initialOrder = {
  customer: {
    telNumber: "",
  },
  from: {
    demontage: false,
  },
  to: {
    montage: false,
  },
  time: "07:00",
  prices: {},
  timeBased: {},
  leistungen: new Array<MLeistung>(),
  sendData: new Array<SendData>(),
  services: new Array<OrderService>(),
  items: new Array<Furniture>(),
} as Order;

const initialState: AppSlice = {
  selectedPriceID: undefined,
  current: initialOrder,
  options: {},
  furniture: [],
  categories: [],
  services: new Array<Service>(),
};

const calculateVolume = (state: AppSlice) => {
  const itemsVolume = state.current.items.reduce((acc, next) => {
    return acc + Number(next.colli) * Number(next.volume);
  }, 0);

  const boxVol =
    Number(state.options.boxCbm) * Number(state.current.boxNumber || 0);
  const kleiderboxVol =
    Number(state.options.kleiderboxCbm) *
    Number(state.current.kleiderboxNumber || 0);

  state.current.volume = boxVol + kleiderboxVol + itemsVolume;
};

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

      const { hourPrice, includedHours, sum, workers, t35, ridingCosts } =
        curPrice;

      const next = state.current;

      next.leistungen = [
        {
          calculate: true,
          desc: "An/Abfahrtskosten",
          sum: ridingCosts,
        },
      ];
      set(next, ["timeBased", "basis"], sum);
      set(next, ["timeBased", "extra"], hourPrice);
      set(next, ["timeBased", "hours"], includedHours);
      set(next, ["transporterNumber"], t35);
      set(next, ["workersNumber"], workers);

      state.current = next;
    },

    addImageData(state, action: PayloadAction<{ sendData: SendData }>) {
      state.current.sendData.push(action.payload.sendData);
    },

    removeImageData(state, action: PayloadAction<{ sendData: SendData }>) {
      state.current.sendData = state.current.sendData.filter(
        (i) => i.Key !== action.payload.sendData.Key
      );
    },
    setServiceColli(
      state,
      action: PayloadAction<{ id: string; colli: string }>
    ) {
      const { colli, id } = action.payload;

      const curServices = state.current.services;

      const available = curServices.find((s) => s.id === id);
      if (available) {
        available.colli = String(colli);
      } else {
        const service = state.services.find((s) => s.id === id);
        if (service) {
          const next: OrderService = { ...(service as OrderService), colli };
          state.current.services = [...curServices, next];
        }
      }
    },
    calculateOrder(state, action: PayloadAction<{ src: SrcType }>) {
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

      set(next, ["src"], action.payload.src);
      set(next, ["sum"], orderSum);
      set(next, ["prices", "halteverbotszonen"], halteverbotszonen);

      state.current = next;
    },
    setFurniture(state, action: PayloadAction<{ furniture: Furniture }>) {
      const { furniture } = action.payload;

      const index = state.current.items.findIndex(
        (i) =>
          i.id === furniture.id &&
          i.selectedCategory === furniture.selectedCategory
      );

      if (index < 0) {
        state.current.items.push(furniture);
      } else {
        state.current.items[index].colli = furniture.colli;
      }
      calculateVolume(state);
    },
    updateOrderProps(
      state,
      action: PayloadAction<{ path: string[]; value: any }>
    ) {
      const { path, value } = action.payload;

      const next = state.current;
      set(next, path, value);

      state.current = next;
      calculateVolume(state);
    },
    clearState(state) {
      state.current = initialOrder;
      state.selectedPriceID = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadAllOptions.fulfilled, (state, action) => {
        state.options = action.payload;
      })
      .addCase(loadAllServices.fulfilled, (state, action) => {
        state.services = action.payload;
      })
      .addCase(loadAllFurniture.fulfilled, (state, action) => {
        state.furniture = action.payload;
      })
      .addCase(loadAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

const appReducer = appSlice.reducer;

export const {
  setServiceColli,
  updateOrderProps,
  setSelectedPriceId,
  calculateOrder,
  clearState,
  addImageData,
  removeImageData,
  setFurniture,
} = appSlice.actions;

export { appReducer };
