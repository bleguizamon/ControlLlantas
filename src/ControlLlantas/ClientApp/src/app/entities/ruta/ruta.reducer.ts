import axios from "axios";
import {
  createAsyncThunk,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";

import { cleanEntity } from "app/shared/util/entity-utils";
import {
  IQueryParams,
  createEntitySlice,
  EntityState,
  serializeAxiosError,
} from "app/shared/reducers/reducer.utils";
import { IRuta, defaultValue } from "app/shared/model/ruta.model";

const initialState: EntityState<IRuta> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

const apiUrl = "api/rutas";

// Actions

export const getEntities = createAsyncThunk(
  "ruta/fetch_entity_list",
  async ({ page, size, sort }: IQueryParams) => {
    const requestUrl = `${apiUrl}?cacheBuster=${new Date().getTime()}`;
    return axios.get<IRuta[]>(requestUrl);
  }
);

export const getEntity = createAsyncThunk(
  "ruta/fetch_entity",
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<IRuta>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const createEntity = createAsyncThunk(
  "ruta/create_entity",
  async (entity: IRuta, thunkAPI) => {
    const result = await axios.post<IRuta>(apiUrl, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const updateEntity = createAsyncThunk(
  "ruta/update_entity",
  async (entity: IRuta, thunkAPI) => {
    const result = await axios.put<IRuta>(
      `${apiUrl}/${entity.id}`,
      cleanEntity(entity)
    );
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const partialUpdateEntity = createAsyncThunk(
  "ruta/partial_update_entity",
  async (entity: IRuta, thunkAPI) => {
    const result = await axios.patch<IRuta>(
      `${apiUrl}/${entity.id}`,
      cleanEntity(entity)
    );
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const deleteEntity = createAsyncThunk(
  "ruta/delete_entity",
  async (id: string | number, thunkAPI) => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await axios.delete<IRuta>(requestUrl);
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

// slice

export const RutaSlice = createEntitySlice({
  name: "ruta",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getEntity.fulfilled, (state, action) => {
        state.loading = false;
        state.entity = action.payload.data;
      })
      .addCase(deleteEntity.fulfilled, (state) => {
        state.updating = false;
        state.updateSuccess = true;
        state.entity = {};
      })
      .addMatcher(isFulfilled(getEntities), (state, action) => {
        const { data } = action.payload;

        return {
          ...state,
          loading: false,
          entities: data,
        };
      })
      .addMatcher(
        isFulfilled(createEntity, updateEntity, partialUpdateEntity),
        (state, action) => {
          state.updating = false;
          state.loading = false;
          state.updateSuccess = true;
          state.entity = action.payload.data;
        }
      )
      .addMatcher(isPending(getEntities, getEntity), (state) => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addMatcher(
        isPending(
          createEntity,
          updateEntity,
          partialUpdateEntity,
          deleteEntity
        ),
        (state) => {
          state.errorMessage = null;
          state.updateSuccess = false;
          state.updating = true;
        }
      );
  },
});

export const { reset } = RutaSlice.actions;

// Reducer
export default RutaSlice.reducer;
