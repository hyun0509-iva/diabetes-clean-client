export interface CommonResponse {
  isOk: boolean;
  msg: string;
}

export interface IAuthRequest {
  email: string;
  password: string;
  nickname: string;
}

export type TAuthRequest = Omit<IAuthRequest, "nickname">;

export interface IAuthResponse extends CommonResponse {
  accessToken: string;
  userInfo: IUserInfo;
}
export interface IUserInfo {
  readonly _id: string;
  email: string;
  nickname: string;
  aboutMe?: string;
  followers: Array<string>;
  followings: Array<string>;
  imageSrc: string;
  createdAt: string;
  updatedAt: string;
}

export type TMyInfo = Pick<
  IUserInfo,
  | "_id"
  | "email"
  | "nickname"
  | "imageSrc"
  | "followers"
  | "followings"
  | "aboutMe"
>;

export type TBriefWriter = Pick<TMyInfo, "_id" | "nickname" | "imageSrc">;

export type TUserUpdateRequest = Pick<
  TMyInfo,
  "nickname" | "aboutMe" | "imageSrc"
>;

export interface IUserResponse {
  isOk: boolean;
  userInfo: IUserInfo;
}

export interface IDiabetesRequest {
  writer: string;
  sugar_level: number;
  slot: string;
  note: string;
  createdAt: Date | string;
}

export interface IDiabetesInfo {
  readonly _id: string;
  writer?: Pick<TBriefWriter, "_id" | "nickname">;
  sugar_level: number;
  slot: string;
  createdAt: Date | string;
  note?: string;
}

export interface IDiabetesResponse {
  isOk: boolean;
  diabetesInfo: IDiabetesInfo[] | IDiabetesInfo;
}

export interface IUpdateDiabetes {
  id: string;
  sugar_level: number;
  note: string;
}

export interface IContentsRequest {
  writer: string;
  content: string;
  imageName?: string;
  imageUrl?: string;
}

export interface IContents {
  _id: string;
  writer: TMyInfo | TBriefWriter;
  content: string;
  imageName: string;
  imageUrl: string;
  createdAt: Date | string;
  updateAt: Date | string;
  isDeleted: boolean;
}
export interface IContentsResponse {
  likedPost?: any;
  isOk: boolean;
  contents: IContents[];
  total?: number;
}

export interface IContentsDetailResponse {
  isOk: boolean;
  contentsInfo: IContents;
  total?: number;
}

export interface ICommentRequest {
  writer: string;
  contentsId: string;
  parentCommentId?: string;
  content: string;
}

export interface IMyFeed {
  writer: TMyInfo;
  contentsCount: number;
}

export interface IMyFeedResponse {
  isOk: boolean;
  contents: IMyFeed;
}

export interface IComment {
  _id: string;
  writer: TBriefWriter;
  contentsId: string;
  parentCommentId: string;
  content: string;
  createdAt: Date | string;
  updateAt: Date | string;
  isDeleted: boolean;
}

export interface ICommentResponse {
  isOk: boolean;
  comment: IComment[];
}

type TFollowUser = Omit<TBriefWriter, "imageSrc">;
export interface IFollowResponse {
  isOk: boolean;
  followInfo: {
    writer: TFollowUser;
    followers: Array<string>;
    followings: Array<string>;
  };
}

export interface ILikeRequest {
  userId: string;
  commentId?: string;
  contentsId?: string;
}

export interface ILike {
  _id: string;
  writer: string;
  comments?: IComment;
  contents?: IContents;
}

export interface ILikeResponse {
  isOk: boolean;
  like: ILike[];
}
