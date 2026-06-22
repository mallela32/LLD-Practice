import "./App.css";
import { UserDashboard } from "./good/UserDashboard";
import { UserService } from "./services/User.service";

function App() {
  const userService = new UserService();
  return (
    <>
      <UserDashboard userService={userService} />
    </>
  );
}

export default App;
