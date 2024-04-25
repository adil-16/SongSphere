
export type SongType = {
  id: string;
  cover: string;
  title: string;
  album: string;
  dateAdded: string;
  duration: string;
};

export type Playlist = {
  id: string;
  title: string;
  description: string;
  songs: SongType[]; // This should be an array of SongType objects
};
