/* <--- Common Type ---> */

/**
 * @name CommonResponse
 * @description 공통 응답 타입
 * @property {boolean} isOk
 * @property {string} msg
 */
export interface CommonResponse {
  isOk: boolean;
  msg: string;
}

/* <--- Auth Type ---> */

/**
 * @name IAuthInfo
 * @description 인증 공통 타입
 * @property {string} email
 * @property {string} password
 * @property {string} confirmPassword
 * @property {string} nickname
 */
export interface IAuthInfo {
  email: string;
  password: string;
  confirmPassword: string;
  nickname: string;
}

/**
 * @name TSignUpRequest
 * @description 회원가입 요청 타입
 * @property {string} email
 * @property {string} password
 * @property {string} nickname
 */
export type TSignUpRequest = Omit<IAuthInfo, "confirmPassword">;

/**
 * @name TLoginRequest
 * @description 로그인 요청 타입
 * @property {string} email
 * @property {string} password
 */
export type TLoginRequest = Omit<IAuthInfo, "nickname" | "confirmPassword">;

/**
 * @name IAuthResponse
 * @description 로그인 응답 타입
 * @property {string} accessToken
 * @property {IUserInfo} userInfo
 */
export interface IAuthResponse extends CommonResponse {
  accessToken: string;
  userInfo: IUserInfo;
}

/* <--- User(MyInfo 포함) Type ---> */

/**
 * @name IUserInfo
 * @description 유저 타입
 * @property {string} _id
 * @property {string} email
 * @property {string} nickname
 * @property {string} aboutMe
 * @property {Array<string>} followers
 * @property {Array<string>} followings
 * @property {string} createdAt
 * @property {string} updatedAt
 * @property {IUploadedImg} imageData
 */
export interface IUserInfo {
  readonly _id: string;
  email: string;
  nickname: string;
  aboutMe?: string;
  followers: Array<string>;
  followings: Array<string>;
  imageData: IUploadedImg;
  createdAt: string;
  updatedAt: string;
}

export type TMyInfo = Pick<
  IUserInfo,
  | "_id"
  | "email"
  | "nickname"
  | "imageData"
  | "followers"
  | "followings"
  | "aboutMe"
>;

export type TBriefWriter = Pick<TMyInfo, "_id" | "nickname" | "imageData">;

export type TUserUpdateRequest = Partial<
  Pick<TMyInfo, "nickname" | "aboutMe" | "imageData">
>;

export interface IUserResponse {
  isOk: boolean;
  userInfo: IUserInfo;
}

/* <--- Diabetes Type ---> */

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

/* <--- Contents Type ---> */

export interface IContentsRequest {
  writer: string;
  content: string;
  imageData?: Array<IUploadedImg>;
}

export interface IContents {
  _id: string;
  writer: TMyInfo | TBriefWriter;
  content: string;
  imageData?: Array<IUploadedImg>;
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

// * --
// * @property {string} publicId
// * @property {string} assetId
// * @property {string} fileName
// * @property {string} url
// * @property { number | string}
// * @property { number | string}
// */
export interface IUploadedImg {
  /* 이미지 삭제에 필요한 속성도 포함 */
  publicId: string;
  assetId: string;
  fileName?: string;
  url: string;
  width: number | string;
  height: number | string;
}

export interface IContentsDetailResponse {
  isOk: boolean;
  contentsInfo: IContents;
  total?: number;
}

/* <--- MyFeed Type ---> */

export interface IMyFeed {
  writer: TMyInfo;
  contentsCount: number;
}

export interface IMyFeedResponse {
  isOk: boolean;
  contents: IMyFeed;
}

/* <--- Comment Type ---> */

export interface ICommentRequest {
  writer: string;
  contentsId: string;
  parentCommentId?: string;
  content: string;
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

/* <--- FollowUser Type ---> */

type TFollowUser = Omit<TBriefWriter, "imageData">;
export interface IFollowResponse {
  isOk: boolean;
  followInfo: {
    writer: TFollowUser;
    followers: Array<string>;
    followings: Array<string>;
  };
}

/* <---  Like Type ---> */

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
