import React, {useState} from 'react'

function UserDashboard({userData}) {
    const [option, setOption] = useState("wishes");

    const switchClick = (option) => {
      setOption(option);
    };
  return (
    <>
        <div className="profile__collections">
          <div className="profile__options">
            <button
              className={option === "wishes" ? "active" : ""}
              onClick={() => switchClick("wishes")}
            >
              <span className="material-symbols-outlined">favorite</span>
              <h2>Places I want to visit ( {userData?.wishes.length} )</h2>
            </button>

            <div className="vertical-line"></div>
            <button
              className={option === "visited" ? "active" : ""}
              onClick={() => switchClick("visited")}
            >
              <span className="material-symbols-outlined">visibility</span>
              <h2>Places I visited ( {userData?.visited.length} )</h2>
            </button>
          </div>

          <hr color="black" />
        </div>
        <div className="option__content">
          {option === "wishes" && <h1>wishes list is empty</h1>}
          {option === "visited" && <h1>visited list is empty</h1>}
        </div>
    </>
  )
}

export default UserDashboard