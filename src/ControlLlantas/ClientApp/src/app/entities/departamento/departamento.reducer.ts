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
import {
  IDepartamento,
  defaultValue,
} from "app/shared/model/departamento.model";

const initialState: EntityState<IDepartamento> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

const apiUrl = "api/departamentos";

// Actions

export const getEntities = createAsyncThunk(
  "departamento/fetch_entity_list",
  async ({ page, size, sort }: IQueryParams) => {
    const requestUrl = `${apiUrl}?cacheBuster=${new Date().getTime()}`;
    return axios.get<IDepartamento[]>(requestUrl);
  }
);

export const getEntity = createAsyncThunk(
  "departamento/fetch_entity",
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<IDepartamento>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const createEntity = createAsyncThunk(
  "departamento/create_entity",
  async (entity: IDepartamento, thunkAPI) => {
    const result = await axios.post<IDepartamento>(apiUrl, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const updateEntity = createAsyncThunk(
  "departamento/update_entity",
  async (entity: IDepartamento, thunkAPI) => {
    const result = await axios.put<IDepartamento>(
      `${apiUrl}/${entity.id}`,
      cleanEntity(entity)
    );
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const partialUpdateEntity = createAsyncThunk(
  "departamento/partial_update_entity",
  async (entity: IDepartamento, thunkAPI) => {
    const result = await axios.patch<IDepartamento>(
      `${apiUrl}/${entity.id}`,
      cleanEntity(entity)
    );
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const deleteEntity = createAsyncThunk(
  "departamento/delete_entity",
  async (id: string | number, thunkAPI) => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await axios.delete<IDepartamento>(requestUrl);
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

// slice

export const DepartamentoSlice = createEntitySlice({
  name: "departamento",
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

export const { reset } = DepartamentoSlice.actions;

// Reducer
export default DepartamentoSlice.reducer;
