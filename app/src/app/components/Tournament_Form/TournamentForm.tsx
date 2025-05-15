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
  sectionId: string;
}

interface Round {
  roundNumber: number;
  sectionId: string;
}

interface Section {
  sectionName: string;
  tournamentId: string;
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
  players: [],
  rounds: [],
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
      const { sectionName } = section;
      queue.add(() =>
        axios.post("/api/section", {
          name: sectionName,
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
          {...register("tournament.rounds", {
            required: true,
            validate: (value) => value >= 1,
          })}
          type="number"
          placeholder=""
        />
      </div>

      <h3>Sections</h3>
      {sectionFields.map((field, index) => (
        <div key={field.id}>
          <input
            placeholder="Section Name"
            {...register(`sections.${index}.sectionName`)}
          />
          <button type="button" onClick={() => removeSection(index)}>
            Remove
          </button>
        </div>
      ))}

      <button type="button" onClick={() => appendSection(createEmptySection())}>
        Add Section
      </button>

      <br /><br />
      <input type="submit" value="Create Tournament" />

    </form>
  );
}

export default TournamentForm;
