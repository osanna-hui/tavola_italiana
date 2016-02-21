-- phpMyAdmin SQL Dump
-- version 4.4.1.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 15, 2016 at 08:28 AM
-- Server version: 5.5.42
-- PHP Version: 5.6.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `tavola`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `ID` int(11) NOT NULL,
  `SKU` varchar(100) NOT NULL,
  `item_price` decimal(15,2) NOT NULL,
  `description` varchar(100) NOT NULL,
  `item_qnty` varchar(300) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`ID`, `SKU`, `item_price`, `description`, `item_qnty`) VALUES
(1, 'SK-1111A', '12.99', 'Caprese Salad', ''),
(2, 'SK-1112A', '6.99', 'Caesar Salad', ''),
(3, 'SK-1114A', '16.99', 'Bruschetta Sampler', ''),
(4, 'SK-1116A', '9.99', 'Beef Carpaccio', ''),
(5, 'SK-1111D', '5.99', 'Gelato & Sorbet', ''),
(6, 'SK-1111B', '6.99', 'Tartina Fragole e Limone', ''),
(7, 'SK-1115D', '3.99', 'Zeppole', ''),
(8, 'SK-1116D', '7.99', 'Tiramisu', ''),
(9, 'SK-1111PA', '14.99', 'Penne Arrabiata', ''),
(10, 'Sk-1112PA', '15.99', 'Lasagna', ''),
(11, 'SK-1113PA', '16.99', 'Gnocchi', ''),
(12, 'SK-11114PA', '17.99', 'Linguine Carbonara', ''),
(13, 'SK-1111PI', '15.99', 'Prosciutto Pizza', ''),
(14, 'SK-1112PI', '15.99', 'Siciliana Pizza', ''),
(15, 'SK-1115PI', '15.99', 'Capricciosa Pizza', ''),
(16, 'SK-1116PI', '14.99', 'Margherita Pizza', ''),
(17, 'SK-1120A', '6.99', 'Burrata & Prosciutto', ''),
(18, 'SK-1121PA', '16.99', 'Spaghetti Bolognese', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=19;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
