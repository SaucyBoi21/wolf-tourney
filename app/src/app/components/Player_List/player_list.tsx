import Player from "../Player/player";

const PlayerList = () => {
  return (
    <>
      <h2>player list</h2>
      <Player name={"Saahas"} rating={1500} uscf_id={"1234"} seed={1} />
    </>
  );
};

export default PlayerList;
