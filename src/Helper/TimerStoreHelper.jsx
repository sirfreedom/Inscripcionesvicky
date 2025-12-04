import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const TimerStoreHelper = create(
  persist(
    (set, get) => ({
      timeLeft: 10 * 60, // 10 minutos default
      isRunning: false,
      intervalId: null,

      setInitialTime: (initialTimeInMinutes) => {
        const { intervalId } = get();
        if (intervalId) clearInterval(intervalId); // Detiene cualquier temporizador corriendo
        set({ timeLeft: initialTimeInMinutes * 60, isRunning: false, intervalId: null });
      },

      // Función para iniciar el temporizador
      start: () => {
        if (get().isRunning) return; // Evita iniciar si ya está corriendo
        set({ isRunning: true });
        const id = setInterval(() => {
          set((state) => {
            if (state.timeLeft <= 1) {
              clearInterval(id);
              return { timeLeft: 0, isRunning: false, intervalId: null };
            }
            return { timeLeft: state.timeLeft - 1 };
          });
        }, 1000);
        set({ intervalId: id });
      },

      // Función para pausar
      pause: () => {
        const { intervalId } = get();

        if (intervalId) {
          clearInterval(intervalId);
          set({ isRunning: false, intervalId: null });
        }
      },

      // Función para resetear 
      reset: (initialTimeInMinutes) => {
        const { intervalId } = get();
        if (intervalId) clearInterval(intervalId);
        set({ timeLeft: initialTimeInMinutes * 60, isRunning: false, intervalId: null });
      },

      // Función para formatear el tiempo
      formatTime: () => {
        const { timeLeft } = get();
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      },
    }),
    {
      name: 'timer-storage', 
      partialize: (state) => ({ timeLeft: state.timeLeft, isRunning: state.isRunning }), // Solo persiste estos campos (intervalId se recrea)
    }
  )
);

export default TimerStoreHelper;