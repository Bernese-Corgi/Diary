import axios from 'axios';
import { DiaryListType } from 'types/dataType';

const READ_ALL_DIARY = 'diary/READ_ALL_DIARY' as const;
const READ_ALL_DIARY_SUCCESS = 'diary/READ_ALL_DIARY_SUCCESS' as const;
const READ_ALL_DIARY_ERROR = 'diary/READ_ALL_DIARY_ERROR' as const;

export enum ActionType {
  READ_ALL_DIARY = 'READ_ALL_DIARY',
  READ_ALL_DIARY_SUCCESS = 'READ_ALL_DIARY_SUCCESS',
  READ_ALL_DIARY_ERROR = 'READ_ALL_DIARY_ERROR',
}

export const readAllDiaryAsync = () => async dispatch => {
  dispatch({ type: READ_ALL_DIARY });

  try {
    const response = await axios.get('/data1/work1.json');

    dispatch({
      type: READ_ALL_DIARY_SUCCESS,
      payload: response.data,
      meta: response,
    });

    return response.data;
  } catch (error) {
    dispatch({ type: READ_ALL_DIARY_ERROR, payload: error });
  }
};

export type DiaryState = {
  loading: boolean;
  diaries: DiaryListType;
  error;
};

const initialState: DiaryState = {
  loading: false,
  diaries: null,
  error: null,
};

function diaryReducer(state: DiaryState = initialState, { type, payload }) {
  switch (type) {
    // loading
    case READ_ALL_DIARY:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // success
    case READ_ALL_DIARY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        diaries: payload.diary,
      };

    // failure
    case READ_ALL_DIARY_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
        diaries: null,
      };

    default:
      return state;
  }
}

export default diaryReducer;
