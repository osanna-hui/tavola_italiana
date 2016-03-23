-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Mar 24, 2016 at 12:15 AM
-- Server version: 5.5.42
-- PHP Version: 5.6.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `tavola`
--
CREATE DATABASE IF NOT EXISTS `tavola` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `tavola`;

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `admin_id` int(11) NOT NULL,
  `username` varchar(300) NOT NULL,
  `password` varchar(300) NOT NULL,
  `admin_img` varchar(500) NOT NULL,
  `firstName` varchar(300) NOT NULL,
  `lastName` varchar(300) NOT NULL,
  `phone` varchar(300) NOT NULL,
  `email` varchar(300) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`admin_id`, `username`, `password`, `admin_img`, `firstName`, `lastName`, `phone`, `email`) VALUES
(1, 'ohui', '59618f693f1a3ce1c29ec65a56e5ee13', '', 'Osanna', 'Hui', '6041234567', 'ohui@ohui.com'),
(2, 'aornato', 'dd8a56898ed126e08b403d07c4ae70ff', '', 'Anthony', 'Ornato', '6040987654', 'ao@ao.com'),
(3, 'aferguson', 'f127f25028d41b78092b0fc9286dc79c', '', 'Arron', 'Ferguson', '1234567890', 'arron_ferguson@bcit.ca');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `ID` int(11) NOT NULL,
  `state` varchar(30) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `total` decimal(15,2) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`ID`, `state`, `time`, `total`) VALUES
(1, 'checked out', '2016-03-23 23:10:16', '0.00');

-- --------------------------------------------------------

--
-- Table structure for table `cart_product`
--

CREATE TABLE `cart_product` (
  `ID` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cart_product`
--

INSERT INTO `cart_product` (`ID`, `product_id`, `cart_id`, `quantity`, `time`) VALUES
(1, 1, 1, 1, '2016-03-23 23:11:50');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `cust_id` int(11) NOT NULL,
  `firstName` varchar(300) NOT NULL,
  `lastName` varchar(300) NOT NULL,
  `phone` int(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `deliveryAddress` varchar(300) NOT NULL,
  `city` varchar(300) NOT NULL,
  `transaction_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`cust_id`, `firstName`, `lastName`, `phone`, `email`, `deliveryAddress`, `city`, `transaction_id`) VALUES
(1, 'Osanna', 'Hui', 1234567, 'hi@hi.com', '123 bcit', 'bby', 1);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `ID` int(11) NOT NULL,
  `SKU` varchar(100) NOT NULL,
  `item_price` decimal(15,2) NOT NULL,
  `description` varchar(100) NOT NULL,
  `item_qnty` varchar(300) NOT NULL,
  `item_img` varchar(500) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`ID`, `SKU`, `item_price`, `description`, `item_qnty`, `item_img`) VALUES
(1, 'SK-1111A', '12.99', 'Caprese Salad', '19', 'img/caprese.jpg'),
(2, 'SK-1112A', '6.99', 'Caesar Salad', '20', 'img/caesar_salad.jpg'),
(3, 'SK-1114A', '16.99', 'Bruschetta Sampler', '20', 'img/bruschetta_sampler.jpg'),
(4, 'SK-1116A', '9.99', 'Beef Carpaccio', '20', 'img/beef_carpaccio.jpg'),
(5, 'SK-1111D', '5.99', 'Gelato & Sorbet', '20', 'img/sorbet.jpg'),
(6, 'SK-1111B', '6.99', 'Tartina Fragole e Limone', '20', 'img/tartina_fragole_e_limone.jpg'),
(7, 'SK-1115D', '3.99', 'Zeppole', '20', 'img/zeppole.jpg'),
(8, 'SK-1116D', '7.99', 'Tiramisu', '20', 'img/tiramisu.jpg'),
(9, 'SK-1111PA', '14.99', 'Penne Arrabiata', '20', 'img/penne_arrablata.jpg'),
(10, 'Sk-1112PA', '15.99', 'Lasagna', '20', 'img/lasagna.jpg'),
(11, 'SK-1113PA', '16.99', 'Gnocchi', '20', 'img/gnocchi.jpg'),
(12, 'SK-11114PA', '17.99', 'Linguine Carbonara', '20', 'img/linguine_carbonara.jpg'),
(13, 'SK-1111PI', '15.99', 'Prosciutto Pizza', '20', 'img/prosciutto_pizza.jpg'),
(14, 'SK-1112PI', '15.99', 'Siciliana Pizza', '20', 'img/siciliana_pizza.jpg'),
(15, 'SK-1115PI', '15.99', 'Capricciosa Pizza', '20', 'img/capricciosa_pizza.jpg'),
(16, 'SK-1116PI', '14.99', 'Margherita Pizza', '20', 'img/margherita_pizza.jpg'),
(17, 'SK-1120A', '6.99', 'Burrata & Prosciutto', '20', 'img/burrata_prosciutto.jpg'),
(18, 'SK-1121PA', '16.99', 'Spaghetti Bolognese', '20', 'img/spaghetti_bolognese.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `cart_product`
--
ALTER TABLE `cart_product`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `cart_id` (`cart_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`cust_id`),
  ADD KEY `transaction_id` (`transaction_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `cart_product`
--
ALTER TABLE `cart_product`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `cust_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=19;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart_product`
--
ALTER TABLE `cart_product`
  ADD CONSTRAINT `cart_product_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`ID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_product_ibfk_2` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`ID`) ON UPDATE CASCADE;

--
-- Constraints for table `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`transaction_id`) REFERENCES `cart_product` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
