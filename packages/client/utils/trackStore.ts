import create from "zustand";

type TrackStore = {
  trackId: number | null;
  beingPlayed: boolean;
  changeTrack: (id: number) => void;
  changePlay: (bool: boolean) => void;
};

export const useTrackStore = create<TrackStore>((set) => ({
  trackId: null,
  beingPlayed: false,
  changeTrack: (id: number) => set({ trackId: id }),
  changePlay: (bool: boolean) => set({ beingPlayed: bool }),
}));
