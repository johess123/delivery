-- MariaDB dump 10.19  Distrib 10.5.16-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: delivery_food
-- ------------------------------------------------------
-- Server version	10.5.16-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `all_function`
--

DROP TABLE IF EXISTS `all_function`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `all_function` (
  `s_num` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `af_name` varchar(20) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`s_num`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `all_function`
--

LOCK TABLES `all_function` WRITE;
/*!40000 ALTER TABLE `all_function` DISABLE KEYS */;
INSERT INTO `all_function` VALUES (1,'註冊','未註冊的使用者必須先註冊並登入才可使用系統功能。在註冊頁輸入帳號、密碼、身分與使用者名稱便可註冊。帳號不可與已建立過的帳號相同，身分分為管理者與送餐員兩種，請根據社工身分註冊帳號'),(2,'登入','已註冊的使用者要先在登入頁面登入帳號才可使用系統功能。在登入頁面可以輸入帳號和密碼登入系統，輸入的帳號密碼必須與已註冊的使用者資料一致才可登入，否則會登入失敗。'),(3,'登出','按登出按鈕後會清除目前的登入記錄，並跳轉至登入頁，以切換或重新登入帳號。'),(4,'頁面按鈕列','在所有頁面上方都有頁面按鈕列，可以切換至任意頁面或登出系統，包含首頁、管理客戶、管理路線、管理送餐員、管理菜色、管理便當、客戶健康記錄、管理報表、路線碳排放、登出，共十個按鈕。'),(5,'首頁','使用者在登入成功後或在頁面按鈕列按首頁按鈕會切換至首頁，頁面上方有可切換至任何功能頁面或是登出的按紐列，可根據需求切換至對應的頁面。'),(6,'管理客戶','在頁面按鈕列按管理客戶按紐可以切換到該頁面，這個頁面分成三部分：顯示、查詢、新增客戶的基本資料。顯示：顯示部分會以分頁方式列出所有客戶的編號、姓氏和名稱，可以按上、下、首、末頁按鈕來切換頁面，並且每筆客戶資料後面都有一個其他功能欄位，包含詳細、修改、刪除三種功能按鈕。按詳細按鈕可以看到該名客戶的完整資料，包含客戶編號、姓氏和名稱、性別、住址、住址經緯度、訂的便當類型、訂餐時段。按修改按鈕可以修改該名客戶的資料。按刪除按鈕會刪除該名客戶的資料。查詢：查詢部分由客戶編號、客戶姓、客戶名三個輸入欄位和查詢、重置兩個按鈕組成，在輸入欄位輸入客戶編號、客戶姓、客戶名(三個欄位都是可填可不填)並按下查詢按鈕後，顯示部分會列出符合有填入的客戶編號開頭、客戶姓開頭、客戶名開頭所對應的客戶資料，按下重置按鈕可以把顯示部分還原成初始的狀態。新增：頁面有一個新增客戶的按鈕，按該按紐可以新增客戶資料。'),(7,'管理路線','在頁面按鈕列按管理路線按紐可以切換到該頁面，這個頁面分成三部分：顯示、查詢、新增路線的基本資料。顯示：顯示部分會以分頁方式列出所有路線的編號和名稱，可以按上、下、首、末頁按鈕來切換頁面，並且每筆路線資料後面都有一個其他功能欄位，包含詳細、修改、刪除三種功能按鈕。按詳細按鈕可以看到該路線的完整資料，包含路線編號、名稱、類別、時段。按修改按鈕可以修改該路線的資料。按刪除按鈕會刪除該路線的資料。查詢：查詢部分由路線編號、名稱兩個輸入欄位與查詢、重置兩個按鈕組成，在輸入欄位輸入路線編號或名稱(兩個欄位都是可填可不填)並按下查詢按鈕後，顯示部分會列出符合有填入的路線編號開頭或名稱開頭所對應的路線資料，按下重置按鈕可以把顯示部分還原成初始的狀態。新增：頁面有一個新增路線的按鈕，按該按紐可以新增路線資料。'),(8,'管理送餐員','在頁面按鈕列按管理送餐員按紐可以切換到該頁面，這個頁面分成三部分：顯示、查詢、新增送餐員的基本資料。顯示：顯示部分會以分頁方式列出所有送餐員的編號、姓和名，可以按上、下、首、末頁按鈕來切換頁面，並且每筆送餐員資料後面都有一個其他功能欄位，包含詳細、修改、刪除三種功能按鈕。按詳細按鈕可以看到該送餐員的完整資料，包含送餐員編號、使用者帳號編號、姓、名、綽號、加入理由、經驗、圖片。按修改按鈕可以修改該送餐員的資料。按刪除按鈕會刪除該送餐員的資料。查詢：查詢部分由送餐員編號、姓、名三個輸入欄位與查詢、重置兩個按鈕組成，在輸入欄位輸入送餐員編號、姓、名(三個欄位都是可填可不填)並按下查詢按鈕後，顯示部分會列出符合有填入的送餐員編號開頭或姓開頭或名開頭所對應的送餐員資料，按下重置按鈕可以把顯示部分還原成初始的狀態。新增：頁面有一個新增送餐員的按鈕，按該按紐可以新增送餐員資料。'),(9,'管理菜色','在頁面按鈕列按管理菜色按紐可以切換到該頁面，這個頁面分成三部分：顯示、查詢、新增菜色的基本資料。顯示：顯示部分會以分頁方式列出所有菜色的菜色編號、名稱和價錢，可以按上、下、首、末頁按鈕來切換頁面，並且每筆菜色資料後面都有一個其他功能欄位，包含詳細、修改、刪除三種功能按鈕。按詳細按鈕可以看到該菜色的完整資料，包含菜色編號、名稱、葷素、菜色描述、價錢。按修改按鈕可以修改該菜色的資料。按刪除按鈕會刪除該菜色的資料。查詢：查詢部分由菜色編號、名稱、價錢名三個輸入欄位和查詢、重置兩個按鈕組成，在輸入欄位輸入菜色編號、名稱、價錢(三個欄位都是可填可不填)並按下查詢按鈕後，顯示部分會列出符合有填入的菜色編號開頭、名稱開頭、價錢開頭所對應的菜色資料，按下重置按鈕可以把顯示部分還原成初始的狀態。新增：頁面有一個新增菜色的按鈕，按該菜色可以新增菜色資料。'),(10,'管理便當','在頁面按鈕列按管理便當按紐可以切換到該頁面，這個頁面分成三部分：顯示、查詢、新增便當的基本資料。顯示：顯示部分會以分頁方式列出所有便當的編號、名稱，可以按上、下、首、末頁按鈕來切換頁面，並且每筆便當資料後面都有一個其他功能欄位，包含詳細、修改、刪除三種功能按鈕。按詳細按鈕可以看到該便當的完整資料，包含便當編號、名稱、便當包含的菜色、價錢。按修改按鈕可以修改該便當的資料。按刪除按鈕會刪除該便當的資料。查詢：查詢部分由便當編號、名稱兩個輸入欄位和查詢、重置兩個按鈕組成，在輸入欄位輸入便當編號、名稱(兩個欄位都是可填可不填)並按下查詢按鈕後，顯示部分會列出符合有填入的便當編號開頭、名稱開頭所對應的便當資料，按下重置按鈕可以把顯示部分還原成初始的狀態。新增：頁面有一個新增便當的按鈕，按該按紐可以新增便當資料。'),(11,'客戶健康記錄','在頁面按鈕列按客戶健康記錄按鈕可以切換到該頁面，這個頁面分成兩個部分：顯示、查詢客戶健康記錄。顯示：顯示部分會以分頁方式列出所有健康記錄的客戶編號、客戶姓名、記錄日期，可以按上、下、首、末頁按鈕來切換頁面，並且每筆健康記錄後面都有一個其他功能欄位，包含詳細功能按鈕。按詳細按鈕可以看到該筆健康記錄的完整資料，包含客戶編號、客戶姓名、記錄日期、備註、記錄圖片、記錄該筆資料的送餐員的送餐員編號。查詢：查詢部分由客戶編號、客戶姓名、記錄日期三個輸入欄位和查詢、重置兩個按鈕組成，在輸入欄位輸入客戶編號、客戶姓名、記錄日期(三個欄位都是可填可不填)並按下查詢按鈕後，顯示部分會列出符合有填入的客戶編號開頭、客戶姓名開頭、記錄日期所對應的健康記錄資料，按下重置按鈕可以把顯示部分還原成初始的狀態。'),(12,'管理報表','在頁面按鈕列按管理報表按鈕可以切換到該頁面，這個頁面有兩個功能按鈕，分別是匯出當日報表與匯出上月報表。當日送餐訂單完成後會產生報表資料，按下匯出當日報表按鈕系統就會整理並匯出.xlsx格式的當日報表資料，包含訂單日期、客戶編號、訂單價錢，若當天報表資料尚未建立完成系統則會提醒無法匯出。按下匯出上月報表按鈕系統就會整理並匯出.xlsx格式的上月報表資料，包含訂單日期、客戶編號、訂單價錢。'),(13,'路線碳排放','在頁面按鈕列按路線碳排放按鈕可以切換到該頁面，這個頁面有一個匯出上月報表的功能按鈕。按下匯出上月報表按鈕系統就會整理並匯出.xlsx格式的上月報表資料，包含路線編號、送餐日期、該日送餐碳排放量、該日送餐總距離，可以從報表得知各路線在各日期的送餐總距離與產生的碳排放量。');
/*!40000 ALTER TABLE `all_function` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bento`
--

DROP TABLE IF EXISTS `bento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bento` (
  `s_num` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `bo_name` varchar(20) NOT NULL,
  PRIMARY KEY (`s_num`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bento`
--

LOCK TABLES `bento` WRITE;
/*!40000 ALTER TABLE `bento` DISABLE KEYS */;
INSERT INTO `bento` VALUES (17,'1號便當'),(18,'2號便當'),(23,'3號便當');
/*!40000 ALTER TABLE `bento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bento_dishes`
--

DROP TABLE IF EXISTS `bento_dishes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bento_dishes` (
  `s_num` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `bo_s_num` int(10) NOT NULL,
  `ds_s_num` int(10) NOT NULL,
  PRIMARY KEY (`s_num`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bento_dishes`
--

LOCK TABLES `bento_dishes` WRITE;
/*!40000 ALTER TABLE `bento_dishes` DISABLE KEYS */;
INSERT INTO `bento_dishes` VALUES (73,18,12),(74,18,14),(85,23,19),(86,23,21),(87,23,18),(104,17,21),(105,17,17),(106,17,14);
/*!40000 ALTER TABLE `bento_dishes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clients` (
  `s_num` int(10) NOT NULL AUTO_INCREMENT,
  `ct_name` varchar(20) NOT NULL,
  `ct_lastname` varchar(20) NOT NULL,
  `ct_gender` varchar(20) NOT NULL,
  `ct_address` varchar(50) DEFAULT NULL,
  `ct_lon` double DEFAULT NULL,
  `ct_lat` double DEFAULT NULL,
  `ct_time` int(1) NOT NULL,
  `bo_s_num` int(10) NOT NULL,
  `status` int(1) DEFAULT 0,
  PRIMARY KEY (`s_num`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (50,'姵穎','余','女','南投縣埔里鎮桃米路16-8號',120.946735,23.9652431,1,18,0),(51,'冠權','王','女','南投縣埔里鎮桃米路4-5號',120.9417592,23.9558838,1,18,0),(52,'柏緯','李','男','南投縣埔里鎮桃南路69號',120.9458721,23.9615676,2,18,0),(53,'承瑾','謝','男','南投縣埔里鎮南環路952號',120.94827,23.966843,1,18,0),(54,'詠平','王','女','南投縣埔里鎮安七街89-1號',120.9538413,23.9669157,2,17,0),(56,'瑜楓','黃','男','南投縣埔里鎮民生路146號',120.9629218,23.9600815,2,17,0),(71,'學校','測試','男','國立暨南國際大學',23.9494326,120.9376825,1,17,0),(72,'123','黃','男','國立暨南國際大學',23.9494326,120.9376825,1,17,0);
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients_route`
--

DROP TABLE IF EXISTS `clients_route`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clients_route` (
  `s_num` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ct_s_num` int(10) unsigned NOT NULL,
  `ct_order` int(5) NOT NULL,
  `reh_s_num` int(10) unsigned NOT NULL,
  PRIMARY KEY (`s_num`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients_route`
--

LOCK TABLES `clients_route` WRITE;
/*!40000 ALTER TABLE `clients_route` DISABLE KEYS */;
INSERT INTO `clients_route` VALUES (2,50,1,1),(3,51,1,1),(4,52,1,1),(5,53,1,1),(6,54,1,1),(7,56,1,1);
/*!40000 ALTER TABLE `clients_route` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients_status`
--

DROP TABLE IF EXISTS `clients_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clients_status` (
  `s_num` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ct_s_num` int(10) unsigned NOT NULL,
  `date` datetime DEFAULT NULL,
  `remark` varchar(100) DEFAULT NULL,
  `cs_img` varchar(300) DEFAULT NULL,
  `dp_s_num` int(10) unsigned NOT NULL,
  `status1` int(1) DEFAULT 0,
  `status2` int(1) DEFAULT 0,
  PRIMARY KEY (`s_num`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients_status`
--

LOCK TABLES `clients_status` WRITE;
/*!40000 ALTER TABLE `clients_status` DISABLE KEYS */;
INSERT INTO `clients_status` VALUES (1,56,'2023-07-18 00:00:00','..........','6_0_2023-07-18.png',6,0,0),(3,54,'2023-08-09 00:00:00','無','6_0_2023-07-18.png',6,0,0),(5,51,'2023-08-31 00:00:00','這次一定對！',NULL,6,1,0),(6,51,'2023-08-31 00:00:00','這次一定對！',NULL,6,1,0),(7,52,'2023-08-31 05:13:15','終於成功了',NULL,6,1,0),(8,53,'2023-08-31 05:23:36','嗚呼',NULL,6,1,0),(9,56,'2023-08-31 05:27:54','可以睡覺了沒','6_56_2023-08-31_5:27:54.png',6,1,0),(10,50,'2023-08-31 05:35:29','這次該對了吧','6_50_2023-08-31_5:35:29.png',6,1,0),(11,52,'2023-08-31 06:04:13','好難','6_52_2023-08-31_6:4:13.png',6,1,0),(12,53,'2023-08-31 06:10:05','hi','6_53_2023-08-31_6:10:5.png',6,1,0),(13,50,'2023-08-31 06:11:36','hihi',NULL,6,0,1);
/*!40000 ALTER TABLE `clients_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `daily_report`
--

DROP TABLE IF EXISTS `daily_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `daily_report` (
  `s_num` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `price` int(10) NOT NULL,
  `ct_s_num` int(10) unsigned NOT NULL,
  PRIMARY KEY (`s_num`)
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daily_report`
--

LOCK TABLES `daily_report` WRITE;
/*!40000 ALTER TABLE `daily_report` DISABLE KEYS */;
INSERT INTO `daily_report` VALUES (1,'2023-08-04',50,500),(2,'2023-08-04',54,10000),(3,'2023-08-04',56,100),(24,'2023-07-31',50,0),(25,'2023-07-31',51,100),(26,'2023-07-31',52,200),(27,'2023-07-31',53,300),(28,'2023-07-31',54,400),(29,'2023-07-31',56,500),(30,'2023-08-08',50,0),(31,'2023-08-08',51,100),(32,'2023-08-08',52,200),(33,'2023-08-08',53,300),(34,'2023-08-08',54,400),(35,'2023-08-08',56,500),(36,'2023-08-08',64,600),(37,'2023-08-09',50,220),(38,'2023-08-09',51,220),(39,'2023-08-09',52,220),(40,'2023-08-09',53,220),(41,'2023-08-09',54,220),(42,'2023-08-09',56,220),(56,'2023-08-10',50,220),(57,'2023-08-10',51,220),(58,'2023-08-10',52,220),(59,'2023-08-10',53,220),(60,'2023-08-10',54,220),(61,'2023-08-10',56,220),(62,'2023-08-14',50,220),(63,'2023-08-14',51,220),(64,'2023-08-14',52,220),(65,'2023-08-14',53,220),(66,'2023-08-14',54,220),(67,'2023-08-14',56,220),(68,'2023-08-28',50,220),(69,'2023-08-28',51,220),(70,'2023-08-28',52,220),(71,'2023-08-28',53,220),(72,'2023-08-28',54,220),(73,'2023-08-28',56,220),(74,'2023-08-29',50,342),(75,'2023-08-29',51,342),(76,'2023-08-29',52,342),(77,'2023-08-29',53,342),(78,'2023-08-29',54,342),(79,'2023-08-29',56,342),(80,'2023-08-30',50,342),(81,'2023-08-30',51,342),(82,'2023-08-30',52,342),(83,'2023-08-30',53,342),(84,'2023-08-30',54,342),(85,'2023-08-30',56,342),(86,'2023-08-31',50,342),(87,'2023-08-31',51,342),(88,'2023-08-31',52,342),(89,'2023-08-31',53,342),(90,'2023-08-31',54,342),(91,'2023-08-31',56,342),(92,'2023-09-01',50,342),(93,'2023-09-01',51,342),(94,'2023-09-01',52,342),(95,'2023-09-01',53,342),(96,'2023-09-01',54,342),(97,'2023-09-01',56,342),(98,'2023-09-02',50,2049),(99,'2023-09-02',51,2049),(100,'2023-09-02',52,2049),(101,'2023-09-02',53,2049),(102,'2023-09-02',54,2049),(103,'2023-09-02',56,2049),(104,'2023-09-03',50,2049),(105,'2023-09-03',51,2049),(106,'2023-09-03',52,2049),(107,'2023-09-03',53,2049),(108,'2023-09-03',54,2049),(109,'2023-09-03',56,2049),(110,'2023-09-04',50,2049),(111,'2023-09-04',51,2049),(112,'2023-09-04',52,2049),(113,'2023-09-04',53,2049),(114,'2023-09-04',54,2049),(115,'2023-09-04',56,2049),(116,'2023-09-05',50,2049),(117,'2023-09-05',51,2049),(118,'2023-09-05',52,2049),(119,'2023-09-05',53,2049),(120,'2023-09-05',54,2049),(121,'2023-09-05',56,2049),(122,'2023-09-06',50,2049),(123,'2023-09-06',51,2049),(124,'2023-09-06',52,2049),(125,'2023-09-06',53,2049),(126,'2023-09-06',54,2049),(127,'2023-09-06',56,2049);
/*!40000 ALTER TABLE `daily_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `daily_shipment`
--

DROP TABLE IF EXISTS `daily_shipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `daily_shipment` (
  `s_num` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `dp_s_num` int(10) NOT NULL,
  `ct_s_num` int(10) unsigned NOT NULL,
  `reh_s_num` int(4) NOT NULL,
  `ct_name` varchar(20) NOT NULL,
  `date` date NOT NULL,
  `bo_s_num` int(10) NOT NULL,
  `reh_name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ct_order` int(1) NOT NULL,
  `price` int(10) NOT NULL,
  PRIMARY KEY (`s_num`)
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daily_shipment`
--

LOCK TABLES `daily_shipment` WRITE;
/*!40000 ALTER TABLE `daily_shipment` DISABLE KEYS */;
INSERT INTO `daily_shipment` VALUES (1,6,50,1,'余姵穎','2023-08-10',18,'北部',1,220),(2,6,51,1,'王冠權','2023-08-10',18,'北部',2,220),(3,12,52,2,'李柏緯','2023-08-10',18,'中部',1,220),(4,12,53,2,'謝承瑾','2023-08-10',18,'中部',2,220),(5,13,54,3,'王詠平','2023-08-10',17,'南部',1,220),(6,13,56,3,'黃瑜楓','2023-08-10',17,'南部',2,220),(7,6,50,1,'余姵穎','2023-08-14',18,'北部',1,220),(8,6,51,1,'王冠權','2023-08-14',18,'北部',2,220),(9,12,52,2,'李柏緯','2023-08-14',18,'中部',1,220),(10,12,53,2,'謝承瑾','2023-08-14',18,'中部',2,220),(11,13,54,3,'王詠平','2023-08-14',17,'南部',1,220),(12,13,56,3,'黃瑜楓','2023-08-14',17,'南部',2,220),(13,6,50,1,'余姵穎','2023-08-21',18,'北部',1,220),(14,6,51,1,'王冠權','2023-08-21',18,'北部',2,220),(15,12,52,2,'李柏緯','2023-08-21',18,'中部',1,220),(16,12,53,2,'謝承瑾','2023-08-21',18,'中部',2,220),(17,13,54,3,'王詠平','2023-08-21',17,'南部',1,220),(18,13,56,3,'黃瑜楓','2023-08-21',17,'南部',2,220),(19,6,50,1,'余姵穎','2023-08-25',18,'北部',1,220),(20,6,51,1,'王冠權','2023-08-25',18,'北部',2,220),(21,12,52,2,'李柏緯','2023-08-25',18,'中部',1,220),(22,12,53,2,'謝承瑾','2023-08-25',18,'中部',2,220),(23,13,54,3,'王詠平','2023-08-25',17,'南部',1,220),(24,13,56,3,'黃瑜楓','2023-08-25',17,'南部',2,220),(37,6,50,1,'余姵穎','2023-08-26',18,'北部',1,220),(38,6,51,1,'王冠權','2023-08-26',18,'北部',2,220),(39,12,52,2,'李柏緯','2023-08-26',18,'中部',1,220),(40,12,53,2,'謝承瑾','2023-08-26',18,'中部',2,220),(41,13,54,3,'王詠平','2023-08-26',17,'南部',1,220),(42,13,56,3,'黃瑜楓','2023-08-26',17,'南部',2,220),(43,6,50,1,'余姵穎','2023-08-27',18,'北部',1,220),(44,6,51,1,'王冠權','2023-08-27',18,'北部',2,220),(45,12,52,2,'李柏緯','2023-08-27',18,'中部',1,220),(46,12,53,2,'謝承瑾','2023-08-27',18,'中部',2,220),(47,13,54,3,'王詠平','2023-08-27',17,'南部',1,220),(48,13,56,3,'黃瑜楓','2023-08-27',17,'南部',2,220),(55,6,50,1,'余姵穎','2023-08-28',18,'北部',1,220),(56,6,51,1,'王冠權','2023-08-28',18,'北部',2,220),(57,6,52,1,'李柏緯','2023-08-28',18,'北部',3,220),(58,6,53,1,'謝承瑾','2023-08-28',18,'北部',4,220),(59,6,54,1,'王詠平','2023-08-28',17,'北部',5,220),(60,6,56,1,'黃瑜楓','2023-08-28',17,'北部',6,220),(61,6,50,1,'余姵穎','2023-08-29',18,'北部',1,342),(62,6,51,1,'王冠權','2023-08-29',18,'北部',2,342),(63,6,52,1,'李柏緯','2023-08-29',18,'北部',3,342),(64,6,53,1,'謝承瑾','2023-08-29',18,'北部',4,342),(65,6,54,1,'王詠平','2023-08-29',17,'北部',5,342),(66,6,56,1,'黃瑜楓','2023-08-29',17,'北部',6,342),(67,6,50,1,'余姵穎','2023-08-30',18,'北部',1,342),(68,6,51,1,'王冠權','2023-08-30',18,'北部',2,342),(69,6,52,1,'李柏緯','2023-08-30',18,'北部',3,342),(70,6,53,1,'謝承瑾','2023-08-30',18,'北部',4,342),(71,6,54,1,'王詠平','2023-08-30',17,'北部',5,342),(72,6,56,1,'黃瑜楓','2023-08-30',17,'北部',6,342),(73,6,50,1,'余姵穎','2023-08-31',18,'北部',1,342),(74,6,51,1,'王冠權','2023-08-31',18,'北部',2,342),(75,6,52,1,'李柏緯','2023-08-31',18,'北部',3,342),(76,6,53,1,'謝承瑾','2023-08-31',18,'北部',4,342),(77,6,54,1,'王詠平','2023-08-31',17,'北部',5,342),(78,6,56,1,'黃瑜楓','2023-08-31',17,'北部',6,342),(79,6,50,1,'余姵穎','2023-09-01',18,'北部',1,342),(80,6,51,1,'王冠權','2023-09-01',18,'北部',2,342),(81,6,52,1,'李柏緯','2023-09-01',18,'北部',3,342),(82,6,53,1,'謝承瑾','2023-09-01',18,'北部',4,342),(83,6,54,1,'王詠平','2023-09-01',17,'北部',5,342),(84,6,56,1,'黃瑜楓','2023-09-01',17,'北部',6,342),(85,6,50,1,'余姵穎','2023-09-02',18,'北部',1,2049),(86,6,51,1,'王冠權','2023-09-02',18,'北部',2,2049),(87,6,52,1,'李柏緯','2023-09-02',18,'北部',3,2049),(88,6,53,1,'謝承瑾','2023-09-02',18,'北部',4,2049),(89,6,54,1,'王詠平','2023-09-02',17,'北部',5,2049),(90,6,56,1,'黃瑜楓','2023-09-02',17,'北部',6,2049),(91,6,50,1,'余姵穎','2023-09-03',18,'北部',1,2049),(92,6,51,1,'王冠權','2023-09-03',18,'北部',2,2049),(93,6,52,1,'李柏緯','2023-09-03',18,'北部',3,2049),(94,6,53,1,'謝承瑾','2023-09-03',18,'北部',4,2049),(95,6,54,1,'王詠平','2023-09-03',17,'北部',5,2049),(96,6,56,1,'黃瑜楓','2023-09-03',17,'北部',6,2049),(97,6,50,1,'余姵穎','2023-09-04',18,'北部',1,2049),(98,6,51,1,'王冠權','2023-09-04',18,'北部',2,2049),(99,6,52,1,'李柏緯','2023-09-04',18,'北部',3,2049),(100,6,53,1,'謝承瑾','2023-09-04',18,'北部',4,2049),(101,6,54,1,'王詠平','2023-09-04',17,'北部',5,2049),(102,6,56,1,'黃瑜楓','2023-09-04',17,'北部',6,2049),(103,6,50,1,'余姵穎','2023-09-05',18,'北部',1,2049),(104,6,51,1,'王冠權','2023-09-05',18,'北部',2,2049),(105,6,52,1,'李柏緯','2023-09-05',18,'北部',3,2049),(106,6,53,1,'謝承瑾','2023-09-05',18,'北部',4,2049),(107,6,54,1,'王詠平','2023-09-05',17,'北部',5,2049),(108,6,56,1,'黃瑜楓','2023-09-05',17,'北部',6,2049),(109,6,50,1,'余姵穎','2023-09-06',18,'北部',1,2049),(110,6,51,1,'王冠權','2023-09-06',18,'北部',2,2049),(111,6,52,1,'李柏緯','2023-09-06',18,'北部',3,2049),(112,6,53,1,'謝承瑾','2023-09-06',18,'北部',4,2049),(113,6,54,1,'王詠平','2023-09-06',17,'北部',5,2049),(114,6,56,1,'黃瑜楓','2023-09-06',17,'北部',6,2049);
/*!40000 ALTER TABLE `daily_shipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `delivery_person`
--

DROP TABLE IF EXISTS `delivery_person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `delivery_person` (
  `s_num` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ur_s_num` int(10) unsigned NOT NULL,
  `dp_nickname` varchar(20) DEFAULT NULL,
  `dp_img` varchar(300) DEFAULT NULL,
  `dp_reason` varchar(300) DEFAULT NULL,
  `dp01` varchar(20) NOT NULL,
  `dp02` varchar(20) NOT NULL,
  `dp_experience` varchar(300) DEFAULT NULL,
  `status` int(1) DEFAULT 0,
  PRIMARY KEY (`s_num`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `delivery_person`
--

LOCK TABLES `delivery_person` WRITE;
/*!40000 ALTER TABLE `delivery_person` DISABLE KEYS */;
INSERT INTO `delivery_person` VALUES (6,1,'大毛','dp_1.jpg','閒閒沒事','李','恩榮','沒有',0),(12,7,'原住民','dp_7.jpg','住附近','李','維','很多',0),(14,6,'煙哥','dp_6.png','社長','陳','延勳','超多',0),(19,8,'豬','dp_8.jpg','豬','王','詠平','豬',0);
/*!40000 ALTER TABLE `delivery_person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dishes`
--

DROP TABLE IF EXISTS `dishes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `dishes` (
  `s_num` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ds_name` varchar(20) NOT NULL,
  `description` varchar(100) NOT NULL,
  `price` int(10) unsigned NOT NULL,
  PRIMARY KEY (`s_num`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dishes`
--

LOCK TABLES `dishes` WRITE;
/*!40000 ALTER TABLE `dishes` DISABLE KEYS */;
INSERT INTO `dishes` VALUES (12,'高麗菜','素//不好吃//我喜歡//綠色的菜//讚',222),(13,'豬肉','葷//豬的肉',120),(14,'魚肉','葷//吳郭魚',50),(15,'雞腳','葷//雞的腳',100),(16,'雞翅','葷//雞翅膀',50),(17,'白菜','素//好吃//難吃',1000),(18,'大陸妹','素//大陸妹',999),(19,'雙層牛肉吉士堡','葷//酸黃瓜',60),(20,'大麥克','葷//生菜//大',70),(21,'哈密瓜','葷//哈密瓜//甜//綠色',999);
/*!40000 ALTER TABLE `dishes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `distance`
--

DROP TABLE IF EXISTS `distance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `distance` (
  `s_num` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `reh_s_num` int(4) NOT NULL,
  `date` date NOT NULL,
  `dp_s_num` int(10) NOT NULL,
  `lon` double DEFAULT NULL,
  `lat` double DEFAULT NULL,
  `km` double DEFAULT NULL,
  PRIMARY KEY (`s_num`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `distance`
--

LOCK TABLES `distance` WRITE;
/*!40000 ALTER TABLE `distance` DISABLE KEYS */;
INSERT INTO `distance` VALUES (1,1,'2023-08-14',1,120,22,10),(2,2,'2023-08-14',2,120,22,20);
/*!40000 ALTER TABLE `distance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monthly_report`
--

DROP TABLE IF EXISTS `monthly_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `monthly_report` (
  `s_num` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `price` int(10) NOT NULL,
  `ct_s_num` int(10) unsigned NOT NULL,
  PRIMARY KEY (`s_num`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monthly_report`
--

LOCK TABLES `monthly_report` WRITE;
/*!40000 ALTER TABLE `monthly_report` DISABLE KEYS */;
INSERT INTO `monthly_report` VALUES (1,'2023-07-13',43,500),(2,'2023-07-14',43,500),(3,'2023-07-14',46,500),(4,'2023-07-15',46,500),(5,'2023-07-15',46,500),(6,'2023-07-15',46,500),(7,'2023-07-16',46,500),(8,'2023-07-15',46,500),(9,'2023-07-16',46,500),(10,'2023-07-17',47,500),(11,'2023-07-17',48,500),(12,'2023-07-18',48,500),(13,'2023-07-18',47,500),(14,'2023-07-18',50,500),(15,'2023-07-18',51,500),(16,'2023-07-18',52,500),(17,'2023-07-18',53,500),(18,'2023-07-18',54,500),(19,'2023-07-31',50,0),(20,'2023-07-31',51,100),(21,'2023-07-31',52,200),(22,'2023-07-31',53,300),(23,'2023-07-31',54,400),(24,'2023-07-31',56,500),(25,'2023-07-30',50,0),(26,'2023-07-30',51,100),(27,'2023-07-30',52,200),(28,'2023-07-30',53,300),(29,'2023-07-30',54,400),(30,'2023-07-30',56,500);
/*!40000 ALTER TABLE `monthly_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `opinion`
--

DROP TABLE IF EXISTS `opinion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `opinion` (
  `s_num` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `content` varchar(300) NOT NULL,
  PRIMARY KEY (`s_num`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opinion`
--

LOCK TABLES `opinion` WRITE;
/*!40000 ALTER TABLE `opinion` DISABLE KEYS */;
INSERT INTO `opinion` VALUES (1,'2023-09-04','讚'),(2,'2023-09-04','我在世一次');
/*!40000 ALTER TABLE `opinion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `punch`
--

DROP TABLE IF EXISTS `punch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `punch` (
  `s_num` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `dp_s_num` int(10) unsigned NOT NULL,
  `reh_s_num` int(10) NOT NULL DEFAULT 0,
  `ph_time` datetime NOT NULL,
  `ph_inorout` int(1) NOT NULL,
  `ph_lon` double DEFAULT NULL,
  `ph_lat` double DEFAULT NULL,
  `ph_wifi` int(1) NOT NULL,
  `ct_s_num` int(10) unsigned NOT NULL,
  PRIMARY KEY (`s_num`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `punch`
--

LOCK TABLES `punch` WRITE;
/*!40000 ALTER TABLE `punch` DISABLE KEYS */;
INSERT INTO `punch` VALUES (1,6,1,'2023-08-30 22:11:36',0,123,23,1,50);
/*!40000 ALTER TABLE `punch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `route`
--

DROP TABLE IF EXISTS `route`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `route` (
  `s_num` int(10) unsigned NOT NULL,
  `reh_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reh_category` int(1) DEFAULT NULL,
  `reh_time` int(1) DEFAULT NULL,
  `status` int(1) DEFAULT 0,
  PRIMARY KEY (`s_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route`
--

LOCK TABLES `route` WRITE;
/*!40000 ALTER TABLE `route` DISABLE KEYS */;
INSERT INTO `route` VALUES (1,'北部',2,2,0),(2,'中部',2,1,0),(3,'南部',3,2,0);
/*!40000 ALTER TABLE `route` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `route_carbon`
--

DROP TABLE IF EXISTS `route_carbon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `route_carbon` (
  `s_num` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `reh_s_num` int(4) NOT NULL,
  `date` date NOT NULL,
  `quality` varchar(20) NOT NULL,
  `km` double DEFAULT NULL,
  PRIMARY KEY (`s_num`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route_carbon`
--

LOCK TABLES `route_carbon` WRITE;
/*!40000 ALTER TABLE `route_carbon` DISABLE KEYS */;
INSERT INTO `route_carbon` VALUES (1,1,'2023-07-20','9.889301865792257',7.188348590109861),(3,1,'2023-08-21','9.889448404560369',17.970958750698415),(4,1,'2023-08-28','0',42325.20301611568),(5,1,'2023-08-29','0',0),(6,1,'2023-09-04','0',42396.8601085332),(7,1,'2023-09-04','0',42396.8601085332),(8,1,'2023-09-05','0',0);
/*!40000 ALTER TABLE `route_carbon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `s_num` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user` varchar(20) NOT NULL,
  `pw` varchar(20) NOT NULL,
  `identity` varchar(1) NOT NULL,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`s_num`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'test','123','a','testtest'),(3,'kenny5','Kenny061256','a','FengDog'),(4,'kenny1','Kenny061256','a','FengDog'),(5,'sss','Kenny061256','a','123'),(6,'kenny','Kenny061256','d','黃瑜楓'),(7,'kenny2','Kenny061256','d','瑜楓1'),(8,'wyping','wyping','d','王詠平'),(9,'kenny3','Kenny061256','a','123'),(10,'tommygood','123','a','tommygood');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-06 12:59:43
