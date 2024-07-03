-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 03, 2024 at 12:18 PM
-- Server version: 8.0.35
-- PHP Version: 8.2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hk_logbook`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `id` int NOT NULL,
  `student_number` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `first_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `last_name` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `year` int NOT NULL,
  `teacher` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `area` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `course` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `time_in` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `time_out` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date` date NOT NULL,
  `status` enum('CONFIRMED','PENDING','FAILED','') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'PENDING'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`id`, `student_number`, `first_name`, `last_name`, `year`, `teacher`, `area`, `course`, `time_in`, `time_out`, `date`, `status`) VALUES
(26, '03-2223-044053', 'Alfie', 'Reniedo', 3, 'Chocen', 'Extra Duty', 'BSCS', '14:35:08', NULL, '2024-06-26', 'FAILED'),
(27, '03-2222-2222222', 'Stephanie', 'Rivera', 3, 'Rofer', 'Extra Duty', 'BSCS', '14:36:18', NULL, '2024-06-26', 'FAILED'),
(28, '03-2256-4654646', 'Arnold', 'Martinez', 3, 'Rofer', 'Class Faci', 'BSENT', '14:37:16', NULL, '2024-06-26', 'FAILED'),
(29, '09-6545-6454234', 'Carla', 'Oria', 3, 'Aria', 'Office Faci', 'BSCE', '14:38:03', NULL, '2024-06-26', 'FAILED'),
(30, '32-1412-3324565', 'Jack', 'Hole', 2, 'Chocen', 'Office Faci', 'BSCS', '14:38:45', NULL, '2024-06-26', 'FAILED'),
(31, '21-6546-8416149', 'Antie', 'Naneng', 1, 'Asdadsadsa', 'Office Faci', 'BSAR', '14:39:20', NULL, '2024-06-26', 'FAILED'),
(32, '06-5463-8238472', 'Dominick', 'Esprecion', 4, 'Sdadas', 'Class Faci', 'BSCS', '14:43:20', NULL, '2024-06-26', 'FAILED'),
(33, '15-5654-6456456', 'Hey', 'Yow', 2, 'Sadsad', 'Office Faci', 'BSCRIM', '14:43:41', NULL, '2024-06-26', 'FAILED'),
(34, '65-4312-545656', 'What', 'Up', 1, 'Asdsad', 'Class Faci', 'ABEL', '14:44:13', NULL, '2024-06-26', 'FAILED'),
(35, '12-3213-2132152', 'Bam', 'Boo', 1, 'Dasda', 'Class Faci', 'BSA', '14:44:34', NULL, '2024-06-26', 'FAILED'),
(36, '12-3213-2141421', 'Geng', 'Geng', 1, 'Sadsd', 'Office Faci', 'BSMLS', '14:59:22', NULL, '2024-06-26', 'FAILED'),
(37, '12-3213-1512442', 'Fritz', 'Canaveral', 4, 'Asdadadas', 'Class Faci', 'BSCS', '15:00:02', NULL, '2024-06-26', 'FAILED'),
(38, '12-3131-5421323', 'Lebron', 'James', 1, 'Adda', 'Office Faci', 'BSCRIM', '15:00:38', NULL, '2024-06-26', 'FAILED'),
(39, '21-2134-4554354', 'Anthony', 'Davis', 2, 'Sdada', 'Class Faci', 'BSA', '15:01:02', NULL, '2024-06-26', 'FAILED'),
(40, '13-2133-2132132', 'Steph', 'Curry', 3, 'Chocen', 'Class Faci', 'BSMLS', '15:01:26', NULL, '2024-06-26', 'FAILED'),
(41, '89-8798-7978654', 'Klay', 'Thompson', 3, 'Sadsada', 'Office Faci', 'ABEL', '15:01:50', NULL, '2024-06-26', 'FAILED'),
(42, '31-2323-131231', 'Kobe', 'Bryant', 2, 'Asdadda', 'Office Faci', 'BSAIS', '15:02:56', NULL, '2024-06-26', 'FAILED'),
(43, '12-3213-2521521', 'Anthony', 'Edwards', 4, 'Adaa', 'Office Faci', 'ABEL', '15:03:23', NULL, '2024-06-26', 'FAILED'),
(44, '12-2132-1313122', 'Jayson', 'Tatum', 4, 'Adsdsadas', 'Office Faci', 'BSAR', '15:03:45', NULL, '2024-06-26', 'FAILED'),
(45, '21-2132-4214214', 'Kyrie', 'Irving', 3, 'Sasada', 'Office Faci', 'ABEL', '15:04:19', NULL, '2024-06-26', 'FAILED'),
(46, '23-4543-1234232', 'Kawhi', 'Leonard', 3, 'Asdasda', 'Extra Duty', 'ABEL', '15:04:41', NULL, '2024-06-26', 'FAILED'),
(47, '21-3131-3213132', 'Jordan', 'Poole', 1, 'Asdsdsa', 'Office Faci', 'BSCRIM', '15:05:56', NULL, '2024-06-26', 'FAILED'),
(48, '13-2131-3131321', 'Wqewqeqweqwe', 'Wdasda', 4, 'Chocen', 'Office Faci', 'ABEL', '11:49:42', '17:00:00', '2024-06-27', 'FAILED'),
(49, '03-2223-044053', 'Alfie', 'Reniedo', 3, 'Chocen', 'Class Faci', 'BSCS', '15:16:27', '15:18:08', '2024-06-27', 'FAILED'),
(50, '03-2122-032954', 'Dominic', 'Enriquez', 1, 'Foo Bar', 'Office Faci', 'BSCRIM', '23:38:29', '23:51:09', '2024-06-30', 'CONFIRMED'),
(51, '03-2122-032954', 'Dominic', 'Enriquez', 1, 'Foo Bar Baz', 'Class Faci', 'BSCRIM', '23:52:30', '23:52:48', '2024-06-30', 'CONFIRMED'),
(52, '03-2122-032954', 'Dominic', 'Enriquez', 1, 'Foo Bar', 'Class Faci', 'BSCRIM', '00:23:54', '00:30:00', '2024-07-01', 'FAILED'),
(53, '03-2122-032954', 'Dominic', 'Enriquez', 1, 'Foo Bar', 'Class Faci', 'BSCRIM', '00:26:47', '00:53:09', '2024-07-01', 'CONFIRMED'),
(54, '03-2122-032954', 'Dominic', 'Enriquez', 1, 'Foo Bar', 'Class Faci', 'ABEL', '00:33:27', '00:40:27', '2024-07-01', 'CONFIRMED'),
(55, '03-2122-032954', 'Dominic', 'Enriquez', 1, 'Foo Bar', 'Class Faci', 'BSCRIM', '00:54:56', NULL, '2024-07-01', 'FAILED'),
(56, '03-2122-032954', 'Dominic', 'Enriquez', 1, 'Foo Bar', 'Class Faci', 'BSCRIM', '00:56:55', '01:57:00', '2024-07-01', 'CONFIRMED'),
(57, '03-2122-032954', 'Dominic', 'Enriquez', 1, 'Foo Bar', 'Class Faci', 'BSCRIM', '01:12:10', '2:00:00', '2024-07-01', 'CONFIRMED'),
(58, '03-2122-032954', 'Dominic', 'Enriquez', 1, 'Foo Bar', 'Class Faci', 'BSCRIM', '08:46:47', '12:00:00', '2024-07-03', 'PENDING'),
(59, '03-2122-032954', 'Dominic', 'Enriquez', 2, 'Chocen', 'Class Faci', 'BSMLS', '16:16:13', '18:00:00', '2024-07-03', 'PENDING');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

DELIMITER $$
--
-- Events
--
CREATE DEFINER=`root`@`localhost` EVENT `time_out_at_12` ON SCHEDULE EVERY 1 DAY STARTS '2024-06-20 12:00:00' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE attendance SET time_out = '12:00:00' WHERE time_out IS NULL AND DATE(`date`) = CURDATE()$$

CREATE DEFINER=`root`@`localhost` EVENT `time_out_at_17` ON SCHEDULE EVERY 1 DAY STARTS '2024-06-20 18:00:00' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE attendance SET time_out = '18:00:00' WHERE time_out IS NULL AND DATE(`date`) = CURDATE()$$

CREATE DEFINER=`root`@`localhost` EVENT `invalidate_faci` ON SCHEDULE EVERY 1 DAY STARTS '2024-07-01 18:30:00' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE attendance SET status = 'FAILED' WHERE status = 'PENDING'$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
