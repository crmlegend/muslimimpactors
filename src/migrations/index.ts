import * as migration_20260506_011536_initial_schema from './20260506_011536_initial_schema';
import * as migration_20260530_082500_add_people_archive_track from './20260530_082500_add_people_archive_track';
import * as migration_20260530_142700_create_site_settings_global from './20260530_142700_create_site_settings_global';
import * as migration_20260530_153000_curate_american_civic_profiles from './20260530_153000_curate_american_civic_profiles';

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
  {
    up: migration_20260530_142700_create_site_settings_global.up,
    down: migration_20260530_142700_create_site_settings_global.down,
    name: '20260530_142700_create_site_settings_global'
  },
  {
    up: migration_20260530_153000_curate_american_civic_profiles.up,
    down: migration_20260530_153000_curate_american_civic_profiles.down,
    name: '20260530_153000_curate_american_civic_profiles'
  },
];
