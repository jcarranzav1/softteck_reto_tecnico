import { v7 as uuidv7 } from 'uuid'
import {
    ActivityEnum,
    CameraModeEnum,
    CharacterEnum,
    ControlSchemeEnum,
    ModeEnum,
    OnlineRoleEnum,
    PlatformEnum
} from '@shared/enum/gta5.enum'

export class GTA5ProfileEntity {
    id: string;
    profile_name: string;
    platforms: PlatformEnum[];
    modes_enabled: ModeEnum[];
    is_voice_chat_enabled: boolean;
    control_scheme: ControlSchemeEnum;
    camera_preference: CameraModeEnum;
    hours_played: number;
    completion_percent: number;
    rank_online: number;
    kd_ratio: number;
    mission_ids_completed: number[];
    owned_vehicle_names: string[];
    favorite_weapons: string[];
    characters_unlocked: CharacterEnum[];
    online_roles: OnlineRoleEnum[];
    preferred_activities: ActivityEnum[];
    status: boolean;
    created_by: string;
    updated_by: string;
    created_at: Date;
    updated_at: Date;

    constructor(props?: Partial<GTA5ProfileEntity>) {
        if (props) {
            Object.assign(this, props);
        }
    }

    static create(data: Partial<GTA5ProfileEntity>) {
        const entity = new GTA5ProfileEntity();
        Object.assign(entity, {
            id: uuidv7(),
            created_at: new Date(),
            updated_at: new Date(),
            status: true,
            ...data,
        });
        return entity;
    }
}