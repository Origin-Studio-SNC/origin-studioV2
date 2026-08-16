import * as migration_20260626_135149 from './20260626_135149';
import * as migration_20260816_152024_chat_leads from './20260816_152024_chat_leads';

export const migrations = [
  {
    up: migration_20260626_135149.up,
    down: migration_20260626_135149.down,
    name: '20260626_135149',
  },
  {
    up: migration_20260816_152024_chat_leads.up,
    down: migration_20260816_152024_chat_leads.down,
    name: '20260816_152024_chat_leads'
  },
];
