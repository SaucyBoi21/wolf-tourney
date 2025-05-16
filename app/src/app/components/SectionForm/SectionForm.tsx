"use client"
import { useFieldArray, Control, UseFormRegister, SubmitHandler, useForm } from "react-hook-form"
import TournamentFormData from "../TournamentForm/TournamentForm"

interface SectionFormProps {
    index: number
    control: Control<TournamentFormData>
    
}
