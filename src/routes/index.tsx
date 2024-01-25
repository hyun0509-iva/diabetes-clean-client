import { Suspense, lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ROUTER_PATH } from "constants/router_path";
import RootLayout from "layouts/RootLayout";
import PrivateRoutes from "./PrivateRoutes";
import LoggedInRoutes from "./LoggedInRoutes";
import Home from "pages/Home";
import NotFound from "pages/NotFound";

const Login = lazy(() => import("pages/Login"));
const SignUp = lazy(() => import("pages/SignUp"));
const Story = lazy(() => import("pages/Story"));
const Memo = lazy(() => import("pages/Memo"));
const My = lazy(() => import("pages/My"));
const WriteMemo = lazy(() => import("pages/WriteMemo"));
const MyStory = lazy(() => import("pages/MyStory"));
const WriteContents = lazy(() => import("pages/WriteContents"));
const SearchPage = lazy(() => import("pages/SearchPage"));
const MyPost = lazy(() => import("components/domain/MyFeed/MyPost"));
const LikedPost = lazy(() => import("components/domain/MyFeed/LikedPost"));

const {
  INDEX,
  LOGIN,
  SIGNUP,
  SAVE_MEMO_DIABETES,
  UPDATE_DIABETES,
  MEMO,
  STORY,
  MYPAGE,
  SAVE_CONTENTS,
  UPDATE_CONTENTS,
  MY_FEED,
  SEARCH,
  EMPATHY
} = ROUTER_PATH;

const Router = createBrowserRouter([
  {
    path: INDEX,
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        element: <PrivateRoutes />,
        children: [
          {
            path: MEMO,
            element: <Memo />
          },
          { path: SAVE_MEMO_DIABETES, element: <WriteMemo /> },
          { path: UPDATE_DIABETES, element: <WriteMemo /> },
          { path: SAVE_CONTENTS, element: <WriteContents /> },
          { path: UPDATE_CONTENTS, element: <WriteContents /> },
          { path: MYPAGE, element: <My /> }
        ]
      },
      {
        element: <LoggedInRoutes />,
        children: [
          {
            path: LOGIN,
            element: <Login />
          },
          {
            path: SIGNUP,
            element: <SignUp />
          }
        ]
      },
      {
        path: INDEX,
        element: <Home />
      },
      {
        path: STORY,
        element: <Story />
      },
      {
        path: SEARCH,
        element: <SearchPage />
      },
      {
        path: MY_FEED,
        element: <MyStory />,
        children: [
          { index: true, element: <MyPost /> },
          { path: EMPATHY, element: <LikedPost /> }
        ]
      }
    ]
  }
]);

const Routes = () => {
  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <RouterProvider router={Router} />
    </Suspense>
  );
};

export default Routes;
