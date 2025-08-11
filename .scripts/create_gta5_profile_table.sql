CREATE TABLE IF NOT EXISTS `reto_tecnico`.`gta5_profile` (
                                                             `id` CHAR(36) NOT NULL,
    `profile_name` VARCHAR(100) NOT NULL,

    `platforms` JSON NOT NULL,
    `modes_enabled` JSON NOT NULL,
    `is_voice_chat_enabled` TINYINT(1) NOT NULL DEFAULT 0,

    `control_scheme` ENUM('KEYBOARD_MOUSE','CONTROLLER') NOT NULL DEFAULT 'CONTROLLER',
    `camera_preference` ENUM('FIRST_PERSON','THIRD_PERSON') NOT NULL DEFAULT 'THIRD_PERSON',

    `hours_played` DOUBLE NOT NULL DEFAULT 0,
    `completion_percent` INT NOT NULL DEFAULT 0,
    `rank_online` INT NOT NULL DEFAULT 0,
    `kd_ratio` DOUBLE NOT NULL DEFAULT 0,

    `mission_ids_completed` JSON NOT NULL,
    `owned_vehicle_names` JSON NOT NULL,
    `favorite_weapons` JSON NOT NULL,

    `characters_unlocked` JSON NOT NULL,
    `online_roles` JSON NOT NULL,
    `preferred_activities` JSON NOT NULL,

    `status` TINYINT(1) NOT NULL DEFAULT 1,
    `created_by` VARCHAR(255),
    `updated_by` VARCHAR(255),
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (`id`),
    UNIQUE KEY `ux_gta5_profile_profile_name` (`profile_name`),
    KEY `idx_gta5_profile_status` (`status`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;