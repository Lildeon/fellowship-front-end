import "./App.css";
import { Routes, Route } from "react-router";
import Home from "./pages/navigation/Home.jsx";
import Bookmark from "./pages/navigation/Bookmark.jsx";
import Profile from "./pages/navigation/Profile.jsx";
import Viewpost from "./pages/navigation/Viewpost.jsx";
import Account from "./pages/Register/Account.jsx";
import Layout from "./component/Layout.jsx";
import Notification from "./pages/navigation/Notification.jsx";
import Community from "./pages/CommunityPage/Community.jsx";
import Settings from "./pages/navigation/Settings.jsx";
import UserSignup from "./pages/Register/UserSignup";
import UserLogin from "./pages/Register/UserLogin";
import About from "./pages/navigation/About";
import Post from "./pages/navigation/Post";
import Repost from "./pages/navigation/Repost";
import { AuthProvider } from "./context/AuthProvider";
import Viewprofile from "./pages/ChurchPage/ViewChurch";
import ChurchProfile from "./pages/ChurchPage/ChurchProfile";
import BranchProfile from "./pages/BranchPage/BranchProfile";
import ViewChurch from "./pages/ChurchPage/ViewChurch";
import AboutChurch from "./pages/ChurchPage/AboutChurch";
import ChurchPost from "./pages/ChurchPage/ChurchPost";
import Branches from "./pages/ChurchPage/Branches";
import ViewBranch from "./pages/BranchPage/ViewBranch";
import AboutBranch from "./pages/BranchPage/AboutBranch";
import BranchPost from "./pages/BranchPage/BranchPost";
import Members from "./pages/BranchPage/Members";
import ViewUser from "./pages/navigation/ViewUser";
import UserAbout from "./pages/navigation/UserAbout";
import UserPosts from "./pages/navigation/UserPosts";
import UserRepost from "./pages/navigation/UserRepost";
import BranchPage from "./pages/BranchPage/BranchPage";
import BranchPageAbout from "./pages/BranchPage/BranchPageAbout";
import BranchPagePost from "./pages/BranchPage/BranchPagePost";
import BranchPageMembers from "./pages/BranchPage/BranchPageMembers";
import BranchPageActivities from "./pages/BranchPage/BranchPageActivities";
import ChurchPage from "./pages/ChurchPage/ChurchPage";
import ChurchPageAbout from "./pages/ChurchPage/ChurchPageAbout";
import ChurchPagePost from "./pages/ChurchPage/ChurchPagePost";
import ChurchPageBranches from "./pages/ChurchPage/ChurchPageBranches";
import ChurchPageActivities from "./pages/ChurchPage/ChurchPageActivities";
import ExploreChurches from "./pages/navigation/ExploreChurches";
import ExploreBranches from "./pages/navigation/ExploreBranches";
import Following from "./pages/navigation/Following";
import Followers from "./pages/navigation/Followers";
import FavouritePost from "./pages/navigation/FavouritePost";
import ExploreBookmark from "./pages/navigation/ExploreBookmark";
import PageFollowing from "./pages/navigation/PageFollowing";
import ExploreFollowing from "./pages/navigation/ExploreFollowing";
import Alltestimony from "./pages/navigation/Alltestimony";
import Allbranch from "./pages/navigation/Allbranch";
import Allpeople from "./pages/navigation/Allpeople";
import Pagesposts from "./pages/navigation/Pagesposts";
import FeedPage from "./pages/navigation/FeedPage";
import Event from "./pages/navigation/Event";
import ViewPagePost from "./pages/navigation/ViewPagePost";
import PageSave from "./pages/navigation/PageSave";
import Pages from "./pages/navigation/Pages";
import Testimony from "./pages/navigation/Testimony";
import UserPages from "./pages/navigation/UserPages";
import UserTestimony from "./pages/navigation/UserTestimony";
import ViewEvent from "./pages/navigation/ViewEvent";
import Activities from "./pages/BranchPage/Activities";
import ChurchActivities from "./pages/ChurchPage/ChurchActivities";
import Create from "./pages/CommunityPage/Create";
import Activity from "./pages/CommunityPage/Activity";
import CommunityHome from "./pages/CommunityPage/Home";
import CommunityExplore from "./pages/CommunityPage/Explore";
import ViewFellowship from "./pages/CommunityPage/ViewFellowship";
import FellowshipAbout from "./pages/CommunityPage/FellowshipAbout";
import FellowshipPost from "./pages/CommunityPage/FellowshipPost";
import FellowshipMembers from "./pages/CommunityPage/FellowshipMembers";
import FellowshipEvent from "./pages/CommunityPage/FellowshipEvent";
import FellowshipPagePost from "./pages/CommunityPage/FellowshipPagePost";
import FellowshipPageEvent from "./pages/CommunityPage/FellowshipPageEvent";
import FellowhipPage from "./pages/CommunityPage/FellowshipPage";
import ViewFellowPost from "./pages/CommunityPage/ViewFellowPost";
import ViewfellowEvent from "./pages/CommunityPage/ViewfellowEvent";
import FellowshipFollowers from "./pages/CommunityPage/FellowshipFollowers";
import RepostCommunity from "./pages/navigation/Community";
import UserCommunity from "./pages/navigation/UserCommunity";
import SaveCommunity from "./pages/navigation/SaveCommunity";
import FollowingComm from "./pages/navigation/FollowingComm";
import BranchFollowers from "./pages/BranchPage/BranchFollowers";
import ChurchFollowers from "./pages/ChurchPage/ChurchFollower";
import ExploreLayout from "./component/ExploreLayout";
import ProtectedRoute from "./component/ProtectedRoute";
import Allchurch from "./pages/navigation/Allchurch";
import Allcommunity from "./pages/navigation/Allcommunity";
import Allevent from "./pages/navigation/Allevent";
import User from "./pages/navigation/User";
import AboutFellowship from "./pages/navigation/AboutFellowship";
import ScrollToTop from "./component/ScrollToTop";
import ForgotPassword from "./pages/Register/ForgotPassword";
import ResetPassword from "./pages/Register/ResetPassword";
import ChangePassword from "./pages/Register/ChangePassword";

function App() {
  return (
    <>
      <ScrollToTop />
      <AuthProvider>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route
                path="community-followers/:id"
                element={<FellowshipFollowers />}
              />
              <Route
                path="branch-followers/:id"
                element={<BranchFollowers />}
              />
              <Route
                path="church-followers/:id"
                element={<ChurchFollowers />}
              />

              <Route path="create-community" element={<Create />} />

              <Route path="fellowship/:id" element={<ViewFellowship />}>
                <Route path="about" element={<FellowshipAbout />} />
                <Route path="post" element={<FellowshipPost />} />
                <Route path="members" element={<FellowshipMembers />} />
                <Route path="activities" element={<FellowshipEvent />} />
              </Route>

              <Route path="view-event/:id" element={<ViewfellowEvent />} />

              <Route path="fellowship-post/:id" element={<ViewFellowPost />} />
              <Route path="my-page/:id" element={<FellowhipPage />}>
                <Route path="about" element={<FellowshipAbout />} />
                <Route path="post" element={<FellowshipPagePost />} />
                <Route path="members" element={<FellowshipMembers />} />
                <Route path="activities" element={<FellowshipPageEvent />} />
              </Route>

              <Route path="communities" element={<Community />}>
                <Route path="explore" element={<CommunityExplore />} />
                <Route path="activities" element={<Activity />} />
                <Route path="home" element={<CommunityHome />} />
              </Route>

              <Route path="all-testimony" element={<Alltestimony />} />
              <Route path="all-branches" element={<Allbranch />} />
              <Route path="all-people" element={<Allpeople />} />
              <Route path="all-churches" element={<Allchurch />} />
              <Route path="all-communities" element={<Allcommunity />} />

              <Route element={<ExploreFollowing />}>
                <Route path="following/:id" element={<Following />} />
                <Route path="followers/:id" element={<Followers />} />
                <Route path="following-pages/:id" element={<PageFollowing />} />
                <Route
                  path="following-communities/:id"
                  element={<FollowingComm />}
                />
              </Route>

              <Route path="branch/:id" element={<BranchPage />}>
                <Route path="about" element={<BranchPageAbout />} />
                <Route path="post" element={<BranchPagePost />} />
                <Route path="members" element={<BranchPageMembers />} />
                <Route path="activities" element={<BranchPageActivities />} />
              </Route>

              <Route path="church/:id" element={<ChurchPage />}>
                <Route path="about" element={<ChurchPageAbout />} />
                <Route path="post" element={<ChurchPagePost />} />
                <Route path="branches" element={<ChurchPageBranches />} />
                <Route path="activities" element={<ChurchPageActivities />} />
              </Route>

              <Route path="user/:id" element={<ViewUser />}>
                <Route path="about" element={<UserAbout />} />
                <Route path="post" element={<UserPosts />} />
                <Route path="repost" element={<UserRepost />} />
                <Route path="pages" element={<UserPages />} />
                <Route path="testimony" element={<UserTestimony />} />
                <Route path="community" element={<UserCommunity />} />
              </Route>

              <Route element={<FeedPage />}>
                <Route path="home" element={<Home />} />
                <Route path="pages-posts" element={<Pagesposts />} />
              </Route>

              <Route path="page-post/:id" element={<ViewPagePost />} />
              <Route path="user/:id" element={<Viewprofile />} />

              <Route path="explore" element={<ExploreLayout />}>
                <Route path="branches" element={<ExploreBranches />} />
                <Route path="churches" element={<ExploreChurches />} />
                <Route path="events" element={<Event />} />
              </Route>

              <Route path="event-view/:id" element={<ViewEvent />} />

              <Route path="view/branch/:branch" element={<ViewBranch />}>
                <Route path="about" element={<AboutBranch />} />
                <Route path="post" element={<BranchPost />} />
                <Route path="members" element={<Members />} />
                <Route path="activities" element={<Activities />} />
              </Route>

              <Route path="view/church/:church" element={<ViewChurch />}>
                <Route path="about" element={<AboutChurch />} />
                <Route path="post" element={<ChurchPost />} />
                <Route path="branches" element={<Branches />} />
                <Route path="activities" element={<ChurchActivities />} />
              </Route>

              <Route path="/view/:id" element={<Viewpost />} />

              <Route element={<ExploreBookmark />}>
                <Route path="bookmark" element={<Bookmark />} />
                <Route path="favourite" element={<FavouritePost />} />
                <Route path="pages" element={<PageSave />} />
                <Route path="community" element={<SaveCommunity />} />
              </Route>

              <Route path="church-profile" element={<ChurchProfile />} />
              <Route path="branch-profile" element={<BranchProfile />} />

              <Route path="/profile" element={<Profile />}>
                <Route path="about" element={<About />} />
                <Route path="post" element={<Post />} />
                <Route path="repost" element={<Repost />} />
                <Route path="pages" element={<Pages />} />
                <Route path="testimony" element={<Testimony />} />
                <Route path="community" element={<RepostCommunity />} />
              </Route>

              <Route path="notification" element={<Notification />} />
              <Route path="settings" element={<Settings />}>
                <Route path="account" element={<User />} />
                <Route path="about" element={<AboutFellowship />} />
                <Route path="change-password" element={<ChangePassword />} />
              </Route>
            </Route>
          </Route>

          <Route path="post">
            <Route path=":post" element={<Viewpost />} />
          </Route>

          <Route path="reset-password/:token" element={<ResetPassword />} />
          <Route path="forgot-password" element={<ForgotPassword />} />

          <Route path="/">
            <Route index element={<Account />} />
            <Route path="sign-up" element={<UserSignup />} />
            <Route path="sign-in" element={<UserLogin />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
