/*
SQLyog Community v13.1.2 (64 bit)
MySQL - 10.1.34-MariaDB : Database - bank_service
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`bank_service` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `bank_service`;

/*Table structure for table `accounttype` */

DROP TABLE IF EXISTS `accounttype`;

CREATE TABLE `accounttype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accounttype` int(11) DEFAULT NULL,
  `accounttypename` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `accounttype` */

insert  into `accounttype`(`id`,`accounttype`,`accounttypename`) values 
(1,1,'Checking'),
(2,2,'Savings');

/*Table structure for table `customer` */

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `customer` */

insert  into `customer`(`id`,`name`) values 
(1,'Alice'),
(2,'Bob'),
(3,'Eve');

/*Table structure for table `customeraccount` */

DROP TABLE IF EXISTS `customeraccount`;

CREATE TABLE `customeraccount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer` int(11) NOT NULL,
  `accounttype` int(11) NOT NULL,
  `balance` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `customeraccount` */

insert  into `customeraccount`(`id`,`customer`,`accounttype`,`balance`) values 
(1,1,1,1000),
(2,1,2,5000),
(3,2,1,500),
(4,3,1,5000);

/*Table structure for table `movement` */

DROP TABLE IF EXISTS `movement`;

CREATE TABLE `movement` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customeraccount` int(11) DEFAULT NULL,
  `movementtype` int(11) DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `fee` float DEFAULT NULL,
  `total` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `movement` */

insert  into `movement`(`id`,`customeraccount`,`movementtype`,`amount`,`fee`,`total`) values 
(1,1,2,500,0,500),
(2,2,1,2000,0,2000),
(3,2,3,1500,1,1499);

/*Table structure for table `movementtype` */

DROP TABLE IF EXISTS `movementtype`;

CREATE TABLE `movementtype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `movementtype` int(11) NOT NULL,
  `movementname` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `movementtype` */

insert  into `movementtype`(`id`,`movementtype`,`movementname`) values 
(1,1,'deposit'),
(2,2,'withdrawal'),
(3,3,'transfer');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
