CREATE TABLE IF NOT EXISTS `reto_tecnico`.`user` (
                                                     `id` CHAR(36) NOT NULL,
    `email` VARCHAR(320) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `status` TINYINT(1) NOT NULL DEFAULT 1,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `ux_user_email` (`email`),
    KEY `idx_user_status` (`status`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;