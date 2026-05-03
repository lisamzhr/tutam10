let lastSubmittedId: string | null = null;

export const rsvpStore = {
  setLastId: (id: string | null) => {
    lastSubmittedId = id;
  },
  getLastId: (): string | null => {
    return lastSubmittedId;
  },
  clear: () => {
    lastSubmittedId = null;
  },
};