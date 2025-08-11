CREATE TABLE IF NOT EXISTS reto_tecnico.`fusion_logs` (
                                                          `id` CHAR(36) NOT NULL,
    `person_id` VARCHAR(3) NOT NULL,
    `person` JSON NOT NULL,
    `planet` JSON NOT NULL,

    `country` JSON NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `created_by` VARCHAR(255),
    `updated_by` VARCHAR(255),
    PRIMARY KEY (`id`),
    UNIQUE KEY `uq_idx_fusion_person_id` (`person_id`),
    KEY `idx_fusion_created_at` (`created_at`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
