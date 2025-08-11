import { z } from "zod";
import {
    ActivityEnum,
    CameraModeEnum,
    CharacterEnum,
    ControlSchemeEnum,
    ModeEnum,
    OnlineRoleEnum,
    PlatformEnum
} from '@shared/enum/gta5.enum'

export const createGTA5ProfileSchema = z.object({
    profile_name: z
        .string()
        .min(1, "profile_name is required")
        .transform((s) => s.trim().toLowerCase())
        .refine((v) => /^[a-z0-9_]+$/.test(v), {
            message: "profile_name: only letters, numbers, and underscore are allowed",
        }),
    platforms: z.array(z.enum(PlatformEnum)).min(1),
    modes_enabled: z.array(z.enum(ModeEnum)).min(1),

    is_voice_chat_enabled: z.boolean().default(false),
    control_scheme: z.enum(ControlSchemeEnum).default(ControlSchemeEnum.CONTROLLER),
    camera_preference: z.enum(CameraModeEnum).default(CameraModeEnum.THIRD_PERSON),

    hours_played: z.number().nonnegative().default(0),
    completion_percent: z.number().min(0).max(100).default(0),
    rank_online: z.number().int().nonnegative().default(0),
    kd_ratio: z.number().nonnegative().default(0),

    mission_ids_completed: z.array(z.number().int()).default([]),
    owned_vehicle_names: z.array(z.string().min(1)).default([]),
    favorite_weapons: z.array(z.string().min(1)).default([]),

    characters_unlocked: z.array(z.enum(CharacterEnum)).default([]),
    online_roles: z.array(z.enum(OnlineRoleEnum)).default([]),
    preferred_activities: z.array(z.enum(ActivityEnum)).default([]),
}).strict();

export type CreateGTA5ProfileDto = z.infer<typeof createGTA5ProfileSchema>;
