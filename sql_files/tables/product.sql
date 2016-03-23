-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Mar 24, 2016 at 12:18 AM
-- Server version: 5.5.42
-- PHP Version: 5.6.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

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