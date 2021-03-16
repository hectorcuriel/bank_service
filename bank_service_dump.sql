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
  PRIMARY KEY (`id`),
  UNIQUE KEY `NAME` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

/*Data for the table `customer` */

insert  into `customer`(`id`,`name`) values 
(19,'aaa'),
(1,'Alice'),
(2,'Bob'),
(3,'Eve'),
(20,'x'),
(16,'xxx'),
(4,'xxxx');

/*Table structure for table `customeraccount` */

DROP TABLE IF EXISTS `customeraccount`;

CREATE TABLE `customeraccount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer` int(11) NOT NULL,
  `accounttype` int(11) NOT NULL,
  `balance` float NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `CUSTOMER_ACCOUNTTYPE` (`customer`,`accounttype`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

/*Data for the table `customeraccount` */

insert  into `customeraccount`(`id`,`customer`,`accounttype`,`balance`) values 
(1,1,1,1000),
(2,1,2,5000),
(3,2,1,500),
(4,3,1,5000),
(5,20,1,10),
(11,16,2,1000),
(13,16,1,1000);

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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

/*Data for the table `movement` */

insert  into `movement`(`id`,`customeraccount`,`movementtype`,`amount`,`fee`,`total`) values 
(1,1,2,500,0,500),
(2,2,1,2000,0,2000),
(3,2,3,1500,1,1499),
(4,1,1,100,0,0),
(5,1,1,450,0,0),
(6,3,1,450,0,0),
(7,2,1,450,0,0),
(8,2,1,1450,0,0),
(9,2,1,3,0,0),
(10,2,2,3,0,0),
(11,3,2,3,0,0),
(12,3,2,300,0,0),
(13,2,2,1000,0,0),
(14,2,2,1000,0,0),
(15,2,2,1000,0,0),
(16,2,2,1000,0,0),
(17,2,2,1000,0,0),
(18,2,2,500,0,0),
(19,2,3,50,1,NULL),
(20,2,3,50,1,49);

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
