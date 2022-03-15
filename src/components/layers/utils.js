
import {
  useHistory
} from "react-router-dom";

function ChangeMapLink(props)
{
  let history = useHistory();
  function handleClick(data) {
    let res = new URLSearchParams(history.location.search);
    res.set("maptype", data.value);

    history.push({
        "pathname": "/map",
        "search": "?" + res.toString()
    });
  }

  return (
    <span onClick={() => handleClick(props)}>
      {props.children}
    </span>
  );
};

function ChangeTopicLink(props)
{
  let history = useHistory();
  function handleClick(data) {
    let res = new URLSearchParams(history.location.search);
    res.set("type", data.value);
    res.set("prop", "race");
    res.set("cnum", data.cnum);

    history.push({
        "pathname": "/theme",
        "search": "?" + res.toString()
    });
  }

  return (
    <span onClick={() => handleClick(props)}>
      {props.children}
    </span>
  );
};

export {ChangeMapLink, ChangeTopicLink};
