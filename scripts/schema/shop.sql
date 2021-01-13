DROP TABLE IF EXISTS `lemons`.`storefront`;
CREATE TABLE IF NOT EXISTS `lemons`.`storefront` (
  `user_id` varchar(30) NOT NULL PRIMARY KEY,
  `turn` int NOT NULL,
  `backstock` int NOT NULL,
  `cash` int NOT NULL,

  `cur_temp` int NOT NULL,
  `for_temp` int NOT NULL,
  `cur_prec` int NOT NULL,
  `for_prec` int NOT NULL,

  `purchased` int NOT NULL,
  `prepared` int NOT NULL,
  `sales` int NOT NULL,
  `waste` int NOT NULL,
  `demand` int NOT NULL,

  `purchasing` int NOT NULL,
  `preparing` int NOT NULL,
  `price` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;