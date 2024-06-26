import { _fetch } from "../utils/fetch.js";
import currentDir from "../utils/currentDir.js";

_fetch("GET", `${currentDir}/php/auth/checkPersistence.php`).then((res) => {
  if (res.authenticated) {
    window.location.replace(`${currentDir}`);
  }
});
