import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware"; // Importa el middleware persist

type PersonaTipo = "fisica" | "moral";

interface PersonaBase {
  rfc: string;
  tipoPersona: PersonaTipo;
}

interface PersonasFisicas extends PersonaBase {
  nombre?: string;
  apellidos?: string;
  fechaNacimiento?: string | null;
}

interface PersonasMorales extends PersonaBase {
  nombreComercial?: string;
  giro?: string;
  fechaConstitucion?: string | null;
}

type Persona = PersonasFisicas | PersonasMorales;

interface UserStore {
  personasFisicas: PersonasFisicas[];
  personasMorales: PersonasMorales[];
  activeTab: "fisica" | "moral";
  saveForm: (data: Persona) => void;
  deleteUser: (rfc: string, tipoPersona: "fisica" | "moral") => void;
  setActiveTab: (activeTab: "fisica" | "moral") => void;
}

export const useUsersStore = create<UserStore>()(
  persist(
    (set) => ({
      personasFisicas: [],
      personasMorales: [],
      activeTab: "fisica",

      saveForm: (data: Persona) => {
        if (data.tipoPersona === "fisica") {
          set((state) => ({
            personasFisicas: [...state.personasFisicas, data],
          }));
        } else if (data.tipoPersona === "moral") {
          set((state) => ({
            personasMorales: [...state.personasMorales, data],
          }));
        }
      },
      deleteUser: (rfc: string, tipoPersona: "fisica" | "moral") => {
        if (tipoPersona === "fisica") {
          set((state) => ({
            personasFisicas: state.personasFisicas.filter(
              (persona) => persona.rfc !== rfc
            ),
          }));
        } else if (tipoPersona === "moral") {
          set((state) => ({
            personasMorales: state.personasMorales.filter(
              (persona) => persona.rfc !== rfc
            ),
          }));
        }
      },

      setActiveTab: (activeTab: "fisica" | "moral") => {
        set({ activeTab });
      },
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
