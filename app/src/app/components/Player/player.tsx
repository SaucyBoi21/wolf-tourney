interface PlayerProps {
    name: string,
    rating: number,
    uscf_id: string,
    seed: number
}

const Player:React.FC<PlayerProps> = ({name, rating, uscf_id, seed}) => {
    return (
        <div className="player">
            <h3 className="name">{name}</h3>
            <p className="rating">{rating}</p>
            <p className="uscf_id">{uscf_id}</p>
            <p className="seed">{seed}</p>
        </div>
    )
}

export default Player