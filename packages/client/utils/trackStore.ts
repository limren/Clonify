import create from "zustand";

type TrackStore = {
  trackId: number | null;
  changeTrack: (id: number) => void;
};

export const useTrackStore = create<TrackStore>((set) => ({
  trackId: null,
  changeTrack: (id: number) => set({ trackId: id }),
}));
