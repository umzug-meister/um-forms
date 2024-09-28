import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Address,
  AppPrice,
  BucketObject,
  Category,
  CustomItem,
  Furniture,
  MLeistung,
  Order,
  OrderService,
  OrderSrcType,
  Service,
} from "um-types";
import { appRequest } from "../api";
import { Urls } from "../api/Urls";

import { set, cloneDeep } from "lodash";
import { AppState } from ".";
import { formatISO } from "date-fns";

interface AppSlice {
  current: Order;
  options: AppOptions;
  furniture: Furniture[];
  services: Service[];
  categories: Category[];
  selectedPriceID: string | undefined;
}

export interface AppOptions {
  [name: string]: any;
}

export const loadAllCategories = createAsyncThunk("loadAllCategories", () => {
  return appRequest("get")(Urls.categories());
});

const calcCustomItemVolume = (ci: CustomItem) => {
  const { breite, hoehe, tiefe } = ci;
  if (breite && tiefe && hoehe) {
    ci.itemVolume =
      (Number(breite) * Number(tiefe) * Number(hoehe)) / 1_000_000;
  }
};

export const uploadOrder = createAsyncThunk(
  "uploadOrder",
  (cb: (id: string | number) => void, thunkApi) => {
    const {
      app: { current },
    } = thunkApi.getState() as AppState;

    const next: Order = cloneDeep(current);
    if (next.isDateFix) {
      //@ts-expect-error
      next.date_from = undefined;
      //@ts-expect-error
      next.date_to = undefined;
    }

    if (!next.isDateFix) {
      //help agents find the date
      next.date = next.date_from;
    }

    if (typeof next.from !== "undefined") {
      if (next.from.movementObject !== "Haus") {
        if (next.from.stockwerke) {
          //@ts-expect-error
          next.from.stockwerke = undefined;
        }
      }

      if (next.from.movementObject === "Haus") {
        next.from = {
          ...next.from,
          //@ts-expect-error
          floor: undefined,
          //@ts-expect-error
          liftType: undefined,
        };
      }

      if (!next.from.demontage) {
        next.from = {
          ...next.from,
          //@ts-expect-error
          bedNumber: undefined,
          //@ts-expect-error
          kitchenWidth: undefined,
          //@ts-expect-error
          wardrobeWidth: undefined,
        };
      }
      next.from.address = `${next.from.address_street}, ${next.from.address_zip} ${next.from.address_city}`;
    }

    if (typeof next.to !== "undefined") {
      if (!next.to?.montage) {
        next.to = {
          ...next.to,
          //@ts-expect-error
          bedNumber: undefined,
          //@ts-expect-error
          kitchenWidth: undefined,
        };
      }

      if (next.to?.movementObject !== "Haus") {
        if (next.to.stockwerke) {
          //@ts-expect-error
          next.to.stockwerke = undefined;
        }
      }

      if (next.to?.movementObject === "Haus") {
        next.to = {
          ...next.to,
          //@ts-expect-error
          floor: undefined,
          //@ts-expect-error
          liftType: undefined,
        };
      }

      next.to.address = `${next.to.address_street}, ${next.to.address_zip} ${next.to.address_city}`;
    }

    if (
      !next.bohrarbeiten &&
      next.services?.length &&
      next.services.length > 0
    ) {
      next.services = next.services.filter((s) => s.tag !== "Bohrarbeiten");
    }

    if (
      !next.needPackings &&
      next.services?.length &&
      next.services.length > 0
    ) {
      next.services = next.services.filter((s) => s.tag !== "Packmaterial");
    }

    if (next.bulky) {
      next.bulkyItems.forEach(calcCustomItemVolume);
    } else {
      //@ts-expect-error
      next.bulkyItems = undefined;
    }
    if (next.expensive) {
      next.expensiveItems.forEach(calcCustomItemVolume);
    } else {
      //@ts-expect-error
      next.expensiveItems = undefined;
    }
    if (next.heavy) {
      next.heavyItems.forEach(calcCustomItemVolume);
    } else {
      //@ts-expect-error
      next.heavyItems = undefined;
    }

    next.items = next.items.filter((i) => Number(i.colli) > 0);

    next.timestamp = Date.now();

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
  bucketImages: new Array<BucketObject>(),
  services: new Array<OrderService>(),
  items: new Array<Furniture>(),
  isDateFix: true,
  date: formatISO(new Date(), { representation: "date" }),
  date_from: formatISO(new Date(), { representation: "date" }),
  date_to: formatISO(new Date(), { representation: "date" }),
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

    addImageData(state, action: PayloadAction<{ bucketObject: BucketObject }>) {
      const { bucketObject } = action.payload;
      if (
        !state.current.bucketImages.some((i) => i.ETag === bucketObject.ETag)
      ) {
        state.current.bucketImages.push(bucketObject);
      }
    },

    removeImageData(state, action: PayloadAction<{ ETag: string }>) {
      state.current.bucketImages = state.current.bucketImages.filter(
        (i) => i.ETag !== action.payload.ETag
      );
    },

    setAddressParts(
      state,
      action: PayloadAction<{
        path: "from" | "to";
        addressParts: Partial<Address>;
      }>
    ) {
      const next = state.current;
      const { path, addressParts } = action.payload;
      const curAddrss = next[path];

      set(next, [path], { ...curAddrss, ...addressParts });
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
    calculateOrder(state, action: PayloadAction<{ src: OrderSrcType }>) {
      const hvzPriceOption = state.options["hvzPrice"];

      let nmb = 0;

      if (state.current.from.parkingSlot) {
        nmb = ++nmb;
      }

      if (state.current.to.parkingSlot) {
        nmb = ++nmb;
      }

      const halteverbotszonen = nmb * Number(hvzPriceOption);
      console.log("halteverbotszonen", halteverbotszonen);

      const orderSum =
        (Number(state.current.timeBased.basis) || 0) + halteverbotszonen;
      const next = state.current;

      if (!next.src) {
        // might be already set from search params, e.g. obi
        set(next, ["src"], action.payload.src);
      }
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
  setAddressParts,
} = appSlice.actions;

export { appReducer };
