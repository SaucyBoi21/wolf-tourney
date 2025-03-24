"use client";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";

interface Player {
  name: string;
  rating: number;
  uscfId: string;
  section: string;
}

interface TournamentFormData {
  name: string;
  rounds: number;
  sections: string;
  players: Player[];
}

function TournamentForm() {
  const { register, handleSubmit, control } = useForm<TournamentFormData>();
  const {fields, append, remove} = useFieldArray(
    {
      name: "players",
      control,
    }
  )
  const onSubmit: SubmitHandler<TournamentFormData> = (data) => {
    console.log(data);
  };

  return (
    <form className="tournament-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="input-group">
        <label>Tournament Name </label>
        <input
          {...register("name", {
            required: true,
          })}
          type="text"
          placeholder=""
        />
      </div>

      <div className="input-group">
        <label>Number of Rounds </label>
        <input
          {...register("rounds", {
            required: true,
            validate: (value) => value >= 1,
          })}
          type="text"
          placeholder=""
        />
      </div>

      <div className="input-group">
        <label>Players </label>
        <input type="text" />
      </div>
      <button type="submit">Create Tournament</button>
    </form>
  );
}

export default TournamentForm;
