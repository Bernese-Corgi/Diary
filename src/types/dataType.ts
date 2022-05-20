export type DiaryType = {
  title: string;
  contents: string;
  created_at: string;
};

export type DiaryListType = DiaryType[] | null;

export type DiaryListDataType = {
  diary: DiaryListType;
};
