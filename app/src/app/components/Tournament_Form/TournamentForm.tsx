"use client";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import PQueue from "p-queue";

interface Tournament {
  tournamentName: string;
  numRounds: number;
}

interface Player {
  playerName: string;
  rating: number;
  uscfId: string;
  playingUp: boolean;
  sectionId: string;
}

interface Round {
  roundNumber: number;
  sectionId: string;
}

interface Section {
  sectionName: string;
  tournamentId: string;
  minRating: number;
  maxRating: number;
  players: Player[];
  rounds: Round[];
}

interface TournamentFormData {
  tournament: Tournament;
  players: Player[];
  rounds: Round[];
  sections: Section[];
}

const createEmptySection = (): Section => ({
  sectionName: "",
  tournamentId: "",
  minRating: 0,
  maxRating: 3000,
  players: [],
  rounds: [],
});

const createEmptyPlayer = (): Player => ({
  playerName: "",
  uscfId: "",
  rating: 0,
  playingUp: true,
  sectionId: "",
});

function TournamentForm() {
  const { register, handleSubmit, control } = useForm<TournamentFormData>();
  const {
    fields: sectionFields,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    name: "sections",
    control,
  });

  const onSubmit: SubmitHandler<TournamentFormData> = async (data) => {
    const { tournament, players, rounds, sections } = data;
    const { tournamentName, numRounds } = tournament;
    const tournamentResponse = await axios.post("/api/tournament", {
      name: tournamentName,
      rounds: numRounds,
    });
    const queue = new PQueue({ concurrency: 5 });
    sections.forEach((section) => {
      const { sectionName, minRating, maxRating } = section;
      queue.add(() =>
        axios.post("/api/section", {
          name: sectionName,
          minRating: minRating,
          maxRating: maxRating,
          tournamentId: tournamentResponse.data,
        })
      );
    });
    await queue.onIdle();
  };

  return (
    <form className="tournament-form" onSubmit={handleSubmit(onSubmit)}>
      <h2>Create Tournament</h2>
      <div className="input-group">
        <label>Tournament Name</label>
        <input
          {...register("tournament.tournamentName", {
            required: true,
          })}
          type="text"
          placeholder=""
        />
      </div>

      <div className="input-group">
        <label>Number of Rounds </label>
        <input
          {...register("tournament.numRounds", {
            required: true,
            valueAsNumber: true,
            validate: (value) => value >= 1,
          })}
          type="number"
          placeholder="0"
        />
      </div>

      <h3>Sections</h3>
      {sectionFields.map((field, index) => {
        const {
          fields: playerFields,
          append: appendPlayer,
          remove: removePlayer,
        } = useFieldArray({ name: "players", control });

        return (
          <div key={field.id}>
            <input
              placeholder="Section Name"
              {...register(`sections.${index}.sectionName`)}
            />
            <input
              type="number"
              placeholder="Min Rating"
              {...register(`sections.${index}.minRating`)}
            />
            <input
              type="number"
              placeholder="Max Rating"
              {...register(`sections.${index}.maxRating`)}
            />

            <h4>Players in this Section</h4>
            {playerFields.map((field, playerIndex) => (
              <div key={field.id}>
                <input
                  placeholder="Player Name"
                  {...register(
                    `sections.${index}.players.${playerIndex}.playerName`
                  )}
                />
                <input
                  placeholder="USCF ID"
                  {...register(
                    `sections.${index}.players.${playerIndex}.uscfId`
                  )}
                />
                <input
                  placeholder="Rating"
                  type="number"
                  {...register(
                    `sections.${index}.players.${playerIndex}.rating`
                  )}
                />
                <p>Playing Up?</p>
                <input
                  type="checkbox"
                  {...register(
                    `sections.${index}.players.${playerIndex}.playingUp`
                  )}
                />
                <button type="button" onClick={() => removePlayer(playerIndex)}>
                  Remove Player
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => appendPlayer(createEmptyPlayer())}
            >
              Add Player
            </button>
            <button type="button" onClick={() => removeSection(index)}>
              Remove Section
            </button>
          </div>
        );
      })}

      <button type="button" onClick={() => appendSection(createEmptySection())}>
        Add Section
      </button>

      <br />
      <br />
      <input type="submit" value="Create Tournament" />
    </form>
  );
}

export default TournamentForm;
