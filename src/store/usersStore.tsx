import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type PersonaTipo = "fisica" | "moral";

interface PersonaBase {
  rfc: string;
  tipoPersona: PersonaTipo;
}

interface PersonasFisicas extends PersonaBase {
  nombre: string;
  apellidos: string;
  fechaNacimiento: string | null;
}

interface PersonasMorales extends PersonaBase {
  nombreComercial: string;
  giro: string;
  fechaConstitucion: string | null;
}

interface UserStore {
  personasFisicas: PersonasFisicas[];
  personasMorales: PersonasMorales[];
  activeTab: PersonaTipo;
  savePersonaFisica: (data: PersonasFisicas) => void;
  savePersonaMoral: (data: PersonasMorales) => void;
  deletePersonaFisica: (rfc: string) => void;
  deletePersonaMoral: (rfc: string) => void;
  setActiveTab: (activeTab: PersonaTipo) => void;
}

export const useUsersStore = create<UserStore>()(
  persist(
    (set) => ({
      personasFisicas: [],
      personasMorales: [],
      activeTab: "fisica",
      savePersonaFisica: (data: PersonasFisicas) => {
        set((state) => ({
          personasFisicas: [...state.personasFisicas, data],
        }));
      },

      savePersonaMoral: (data: PersonasMorales) => {
        set((state) => ({
          personasMorales: [...state.personasMorales, data],
        }));
      },

      deletePersonaFisica: (rfc: string) => {
        set((state) => ({
          personasFisicas: state.personasFisicas.filter(
            (persona) => persona.rfc !== rfc
          ),
        }));
      },

      deletePersonaMoral: (rfc: string) => {
        set((state) => ({
          personasMorales: state.personasMorales.filter(
            (persona) => persona.rfc !== rfc
          ),
        }));
      },

      setActiveTab: (activeTab: PersonaTipo) => {
        set({ activeTab });
      },
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
