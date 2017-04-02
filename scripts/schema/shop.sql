USE lemons;

CREATE TABLE IF NOT EXISTS `shops` (
  `id` int NOT NULL AUTO_INCREMENT,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `user_id` int NOT NULL,
  `servings` int NOT NULL,
  `cash` double NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uix_shops_uid` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `inventories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `shop_id` int NOT NULL,
  `ingredient` varchar(255) NOT NULL,
  `quantity` double NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uix_inventories_shops` (`shop_id`, `ingredient`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
