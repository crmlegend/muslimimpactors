import * as migration_20260506_011536_initial_schema from './20260506_011536_initial_schema';
import * as migration_20260530_082500_add_people_archive_track from './20260530_082500_add_people_archive_track';

export const migrations = [
  {
    up: migration_20260506_011536_initial_schema.up,
    down: migration_20260506_011536_initial_schema.down,
    name: '20260506_011536_initial_schema'
  },
  {
    up: migration_20260530_082500_add_people_archive_track.up,
    down: migration_20260530_082500_add_people_archive_track.down,
    name: '20260530_082500_add_people_archive_track'
  },
];
