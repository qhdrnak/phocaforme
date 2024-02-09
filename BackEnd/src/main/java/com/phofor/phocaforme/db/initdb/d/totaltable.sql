-- MariaDB dump 10.19  Distrib 10.11.6-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: PhocaForMe
-- ------------------------------------------------------
-- Server version	10.11.6-MariaDB-1:10.11.6+maria~ubu2204

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
-- Table structure for table `Barter`
--

DROP TABLE IF EXISTS `Barter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Barter` (
                          `barterStatus` tinyint(1) DEFAULT 0,
                          `bartered` tinyint(1) DEFAULT 0,
                          `barter_board_id` bigint(20) NOT NULL AUTO_INCREMENT,
                          `lastModifiedDate` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) NULL,
                          `registrationDate` datetime(6) DEFAULT CURRENT_TIMESTAMP(6) NULL,
                          `barter_card_type` varchar(255) DEFAULT NULL,
                          `barter_content` varchar(255) DEFAULT NULL,
                          `barter_title` varchar(255) DEFAULT NULL,
                          `nickname` varchar(255) DEFAULT NULL,
                          `user_id` char(50) DEFAULT NULL,
                          PRIMARY KEY (`barter_board_id`),
                          KEY `FKk4pg7j67v70s9ck1makqejgda` (`user_id`),
                          CONSTRAINT `FKk4pg7j67v70s9ck1makqejgda` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Barter`
--

LOCK TABLES `Barter` WRITE;
/*!40000 ALTER TABLE `Barter` DISABLE KEYS */;
/*!40000 ALTER TABLE `Barter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BarterFindIdol`
--

DROP TABLE IF EXISTS `BarterFindIdol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BarterFindIdol` (
                                  `barter_board_id` bigint(20) DEFAULT NULL,
                                  `barter_find_id` bigint(20) NOT NULL AUTO_INCREMENT,
                                  `idol_member_id` bigint(20) DEFAULT NULL,
                                  PRIMARY KEY (`barter_find_id`),
                                  KEY `FK337te895vx8beghuhst57r7l` (`barter_board_id`),
                                  KEY `FK2ggjmradi2lx9es2kq13e1ndh` (`idol_member_id`),
                                  CONSTRAINT `FK2ggjmradi2lx9es2kq13e1ndh` FOREIGN KEY (`idol_member_id`) REFERENCES `IdolMember` (`idol_member_id`),
                                  CONSTRAINT `FK337te895vx8beghuhst57r7l` FOREIGN KEY (`barter_board_id`) REFERENCES `Barter` (`barter_board_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BarterFindIdol`
--

LOCK TABLES `BarterFindIdol` WRITE;
/*!40000 ALTER TABLE `BarterFindIdol` DISABLE KEYS */;
/*!40000 ALTER TABLE `BarterFindIdol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BarterImage`
--

DROP TABLE IF EXISTS `BarterImage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BarterImage` (
                               `barter_board_id` bigint(20) DEFAULT NULL,
                               `barter_image_id` bigint(20) NOT NULL AUTO_INCREMENT,
                               `barter_img_code` varchar(255) DEFAULT NULL,
                               PRIMARY KEY (`barter_image_id`),
                               KEY `FK9hj4c092d4gvqqrxdjo6g83oj` (`barter_board_id`),
                               CONSTRAINT `FK9hj4c092d4gvqqrxdjo6g83oj` FOREIGN KEY (`barter_board_id`) REFERENCES `Barter` (`barter_board_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BarterImage`
--

LOCK TABLES `BarterImage` WRITE;
/*!40000 ALTER TABLE `BarterImage` DISABLE KEYS */;
/*!40000 ALTER TABLE `BarterImage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BarterOwnIdol`
--

DROP TABLE IF EXISTS `BarterOwnIdol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BarterOwnIdol` (
                                 `barter_board_id` bigint(20) DEFAULT NULL,
                                 `barter_own_id` bigint(20) NOT NULL AUTO_INCREMENT,
                                 `idol_member_id` bigint(20) DEFAULT NULL,
                                 PRIMARY KEY (`barter_own_id`),
                                 KEY `FKlhqs21wlhu7hk6khblvx2qty` (`barter_board_id`),
                                 KEY `FK2qceo7ae3vmo23vi6xdosnrn6` (`idol_member_id`),
                                 CONSTRAINT `FK2qceo7ae3vmo23vi6xdosnrn6` FOREIGN KEY (`idol_member_id`) REFERENCES `IdolMember` (`idol_member_id`),
                                 CONSTRAINT `FKlhqs21wlhu7hk6khblvx2qty` FOREIGN KEY (`barter_board_id`) REFERENCES `Barter` (`barter_board_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BarterOwnIdol`
--

LOCK TABLES `BarterOwnIdol` WRITE;
/*!40000 ALTER TABLE `BarterOwnIdol` DISABLE KEYS */;
/*!40000 ALTER TABLE `BarterOwnIdol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `IdolGroup`
--

DROP TABLE IF EXISTS `IdolGroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `IdolGroup` (
                             `idol_group_id` bigint(20) NOT NULL AUTO_INCREMENT,
                             `gender` varchar(255) DEFAULT NULL,
                             `idol_group_name_eng` varchar(255) DEFAULT NULL,
                             `idol_group_name_kr` varchar(255) DEFAULT NULL,
                             PRIMARY KEY (`idol_group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=147 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `IdolGroup`
--

LOCK TABLES `IdolGroup` WRITE;
/*!40000 ALTER TABLE `IdolGroup` DISABLE KEYS */;
INSERT INTO `IdolGroup` VALUES
                            (1,'female','Girls\' Generation','소녀시대'),
                            (2,'male','SHINee','샤이니'),
                            (3,'male','EXO','엑소'),
                            (4,'female','Red Velvet','레드벨벳'),
                            (5,'male','NCT','엔시티'),
                            (6,'male','NCT U','엔시티 유'),
                            (7,'male','NCT 127','엔시티 127'),
                            (8,'male','NCT DREAM','엔시티 드림'),
                            (9,'male','NCT WISH','엔시티 위시'),
                            (10,'female','aespa','에스파'),
                            (11,'male','RIIZE','라이즈'),
                            (12,'female','Wonder Girls','원더걸스'),
                            (13,'male','2AM','투에이엠'),
                            (14,'male','2PM','투피엠'),
                            (15,'female','15&','피프틴앤'),
                            (16,'male','GOT7','갓세븐'),
                            (17,'male','JJ Project','제이제이 프로젝트'),
                            (18,'male','DAY6','데이식스'),
                            (19,'female','TWICE','트와이스'),
                            (20,'male','Stray Kids','스트레이 키즈'),
                            (21,'female','ITZY','있지'),
                            (22,'male','Xdinary Heroes','엑스디너리 히어로즈'),
                            (23,'female','NMIXX','엔믹스'),
                            (24,'female','2NE1','투애니원'),
                            (25,'male','WINNER','위너'),
                            (26,'male','iKON','아이콘'),
                            (27,'female','BLACKPINK','블랙핑크'),
                            (28,'male','TREASURE','트레저'),
                            (29,'female','GLAM','글램'),
                            (30,'male','BTS','방탄소년단'),
                            (31,'male','TXT','투모로우바이투게더'),
                            (32,'female','KARA','카라'),
                            (33,'male','A-JAX','에이젝스'),
                            (34,'female','APRIL','에이프릴'),
                            (35,'male','MIRAE','미래소년'),
                            (36,'female','4Minute','포미닛'),
                            (37,'male','BEAST','비스트'),
                            (38,'male','BTOB','비투비'),
                            (39,'female','CLC','씨엘씨'),
                            (40,'male','Pentagon','펜타곤'),
                            (41,'female','(G)I-DLE','(여자)아이들'),
                            (42,'female','LIGHTSUM','라이트썸'),
                            (43,'female','GFriend','여자친구'),
                            (44,'female','LE SSERAFIM','르세라핌'),
                            (45,'female','NewJeans','뉴진스'),
                            (46,'male','The Boyz','더보이즈'),
                            (47,'female','Apink','에이핑크'),
                            (48,'male','VICTON','빅톤'),
                            (49,'male','Bandage','밴디지'),
                            (50,'female','Weeekly','위클리'),
                            (51,'male','ATBO','앳보'),
                            (52,'male','FT Island','FT아일랜드'),
                            (53,'male','CNBLUE','씨엔블루'),
                            (54,'female','AOA','에이오에이'),
                            (55,'male','N.Flying','엔플라잉'),
                            (56,'male','SF9','에스에프나인'),
                            (57,'female','Cherry Bullet','체리블렛'),
                            (58,'male','P1Harmony','피원하모니'),
                            (59,'male','U-KISS','유키스'),
                            (60,'female','Laboum','라붐'),
                            (61,'female','ARIAZ','아리아즈'),
                            (62,'female','Hello Venus','헬로비너스'),
                            (63,'male','ASTRO','아스트로'),
                            (64,'female','Weki Meki','위키미키'),
                            (65,'female','After School','애프터스쿨'),
                            (66,'female','Orange Caramel','오렌지캬라멜'),
                            (67,'male','NU\'EST','뉴이스트'),
                            (68,'male','SEVENTEEN','세븐틴'),
                            (69,'female','PRISTIN','프리스틴'),
                            (70,'female','fromis_9','프로미스나인'),
                            (71,'male','TWS','티더블유에스'),
                            (72,'female','IU','아이유'),
                            (73,'female','FIESTAR','피에스타'),
                            (74,'male','HISTORY','히스토리'),
                            (75,'female','Melody Day','멜로디데이'),
                            (76,'female','CLASS:y','클래스와이'),
                            (77,'male','FANTASY BOYS','판타지 보이즈'),
                            (78,'female','Vitamin','비타민'),
                            (79,'female','Pierce','피어스'),
                            (80,'male','ZE:A','제국의아이들'),
                            (81,'female','Nine Muses','나인뮤지스'),
                            (82,'male','BIGSTAR','빅스타'),
                            (83,'male','DKB','다크비'),
                            (84,'female','Secret','시크릿'),
                            (85,'male','B.A.P','비에이피'),
                            (86,'male','TRCNG','티알씨엔지'),
                            (87,'female','Juniel','주니엘'),
                            (88,'male','CIX','씨아이엑스'),
                            (89,'male','EPEX','이펙스'),
                            (90,'female','cignature','시그니처'),
                            (91,'female','Playgirl','플레이걸'),
                            (92,'female','Sistar','씨스타'),
                            (93,'male','Boyfriend','보이프렌드'),
                            (94,'male','Monsta X','몬스타엑스'),
                            (95,'female','WJSN','우주소녀'),
                            (96,'male','CRAVITY','크래비티'),
                            (97,'female','IVE','아이브'),
                            (98,'female','BeBe Mingnon','베베 미뇽'),
                            (99,'female','Dal Shabet','달샤벳'),
                            (100,'female','Dreamcatcher','드림캐쳐'),
                            (101,'male','DRIPPIN','드리핀'),
                            (102,'female','Freestar','프리스타'),
                            (103,'female','Chocolate','초콜릿'),
                            (104,'female','A-Daily','에이데일리'),
                            (105,'female','Floria','플로리아'),
                            (106,'male','Xeno-T','제노티'),
                            (107,'male','TROY','트로이'),
                            (108,'male','Block B','블락비'),
                            (109,'male','ATEEZ','에이티즈'),
                            (110,'male','xikers','자이커스'),
                            (111,'male','POCUS','포커즈'),
                            (112,'male','ENOi','이엔오아이'),
                            (113,'female','RaNia','라니아'),
                            (114,'female','Blackswan','블랙스완'),
                            (115,'male','UP10TION','업텐션'),
                            (116,'female','Crayon Pop','크레용팝'),
                            (117,'male','K-Much','가물치'),
                            (118,'female','NC.A','앤씨아'),
                            (119,'male','MASC','마스크'),
                            (120,'female','Real Girl Project','리얼걸 프로젝트'),
                            (121,'female','Two X','투엑스'),
                            (122,'male','MADTOWN','매드타운'),
                            (123,'female','EVERGLOW','에버글로우'),
                            (124,'male','TEMPEST','템페스트'),
                            (125,'female','Chungha','청하'),
                            (126,'female','BVNDIT','밴디트'),
                            (127,'male','IN2IT','인투잇'),
                            (128,'female','MOMOLAND','모모랜드'),
                            (129,'female','IZ*ONE','아이즈원'),
                            (130,'female','NeonPunch','네온펀치'),
                            (131,'female','GWSN','공원소녀'),
                            (132,'female','Ladies\' Code','레이디스 코드'),
                            (133,'female','LOONA','이달의 소녀'),
                            (134,'male','Like a Movie','라이크 어 무비'),
                            (135,'male','AB6IX','에이비식스'),
                            (136,'male','BDC','비디씨'),
                            (137,'male','YOUNITE','유나이트'),
                            (138,'male','GHOST9','고스트나인'),
                            (139,'male','ENHYPEN','엔하이픈'),
                            (140,'male','Lionesses','라이어네스'),
                            (141,'female','Isekai Idol','이세계 아이돌'),
                            (142,'male','NINE.i','나인아이'),
                            (143,'female','Queenz Eye','퀸즈아이'),
                            (144,'male','TOZ','토즈'),
                            (145,'male','ONE PACT','원팩트'),
                            (146,'male','TIOT','티아이오티');
/*!40000 ALTER TABLE `IdolGroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `IdolMember`
--

DROP TABLE IF EXISTS `IdolMember`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `IdolMember` (
                              `idol_group_id` bigint(20) DEFAULT NULL,
                              `idol_member_id` bigint(20) NOT NULL AUTO_INCREMENT,
                              `searchCount` bigint(20) DEFAULT NULL,
                              `idol_name` varchar(255) DEFAULT NULL,
                              `image` varchar(255) DEFAULT NULL,
                              PRIMARY KEY (`idol_member_id`),
                              KEY `FKljl431411kyr11f7lkp0a0wse` (`idol_group_id`),
                              CONSTRAINT `FKljl431411kyr11f7lkp0a0wse` FOREIGN KEY (`idol_group_id`) REFERENCES `IdolGroup` (`idol_group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=366 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `IdolMember`
--

LOCK TABLES `IdolMember` WRITE;
/*!40000 ALTER TABLE `IdolMember` DISABLE KEYS */;
INSERT INTO `IdolMember` VALUES
                             (1,1,NULL,'태연','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F41598546-2f97-4916-91d5-3abc83dbe01d.jpg'),
                             (1,2,NULL,'써니','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2F187%2F202208241201353321.jpg'),
                             (1,3,NULL,'티파니','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202212%2F20221227121412781.jpg'),
                             (1,4,NULL,'효연','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F9a51ee89-a093-4ac9-aa6e-dc11eb5e3d97.jpg'),
                             (1,5,NULL,'유리','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202303%2F20230317190817154.jpg'),
                             (1,6,NULL,'수영','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F92c6744a-9d6b-46c7-ab93-8262dab86646.jpg'),
                             (1,7,NULL,'윤아','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202209%2F20220919113643752.jpg'),
                             (1,8,NULL,'서현','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2F155%2F202207081223328681.jpg'),
                             (2,9,NULL,'온유','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F6436e329-2520-4cb8-9bce-da5362abe214.jpg'),
                             (2,10,NULL,'종현','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2F117%2F201701241709131761.jpg'),
                             (2,11,NULL,'Key','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F906b0f6a-ab40-46c6-ab76-8b00733daea3.jpg'),
                             (2,12,NULL,'민호','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F68e094c8-5b31-4293-8242-f83d903f3ef8.jpg'),
                             (2,13,NULL,'태민','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fa52b4aa0-36c9-40bc-9e6c-039b0dd2a893.jpg'),
                             (3,14,NULL,'수호','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fac2d6169-84ff-446e-8596-b90dad8c1888.jpg'),
                             (3,15,NULL,'찬열','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fbc0185b2-95b4-461b-9206-9d32482acdcb.jpg'),
                             (3,16,NULL,'카이','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F92aeae53-5aed-4ddf-be31-5695a5bb9be0.jpg'),
                             (3,17,NULL,'디오','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ft%2F0c0e7a1f-970e-40b2-93d3-5d98154ef521.jpg'),
                             (3,18,NULL,'백현','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F79d10463-2855-4944-a0e8-a8e998406397.jpg'),
                             (3,19,NULL,'세훈','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F2b7094c4-a54c-4619-96d5-daf159189631.jpg'),
                             (3,20,NULL,'시우민','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fc919e6c4-63f5-499d-b442-fa10954c3bfa.jpg'),
                             (3,21,NULL,'첸','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F1529c0b2-19a6-4109-adff-897a2cbb8816.jpg'),
                             (3,22,NULL,'레이','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2F16%2F202110181633194231.jpg'),
                             (4,23,NULL,'웬디','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F7d4ff00c-d51f-4368-b16e-2f6ea791c710.jpg'),
                             (4,24,NULL,'아이린','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F30070b67-1099-4e12-9b31-c109862368f5.jpg'),
                             (4,25,NULL,'슬기','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ff20339ea-04cc-4872-850a-009568d9a436.jpg'),
                             (4,26,NULL,'조이','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F0e15781c-892a-47f0-943f-3fcb98225bc4.jpg'),
                             (4,27,NULL,'예리','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F51e203ae-5603-4599-822c-23311e9baa26.jpg'),
                             (5,28,NULL,'태일','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F6e24e0fb-b359-4dfa-90c4-18fa18747970.jpg'),
                             (5,29,NULL,'쟈니','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fde1a67ff-d4db-406a-88f2-8f2ea79e73c9.jpg'),
                             (5,30,NULL,'태용','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F554c7904-dca7-4639-9406-57b1d4aaa7e8.jpg'),
                             (5,31,NULL,'유타','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ffa65767d-a78e-492e-8a3d-111b4fe65249.jpg'),
                             (5,32,NULL,'도영','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ff51039f1-69f3-4b14-8bed-2e0c97c5fa8c.jpg'),
                             (5,33,NULL,'텐','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fe8560ce6-0ca8-43ae-8c84-1cdeb859f955.jpg'),
                             (5,34,NULL,'재현','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F6791a659-b583-4004-a9d7-4ec3cc263c14.jpg'),
                             (5,35,NULL,'윈윈','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F690fd938-373f-4a25-86b6-83015c9df79c.jpg'),
                             (5,36,NULL,'마크','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fa39f989a-e2a0-44b2-9f67-3d759cd786a9.jpg'),
                             (5,37,NULL,'런쥔','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F1cebc9a5-7d6d-4376-a118-97936bc8f223.jpg'),
                             (5,38,NULL,'제노','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F6f70aec2-2445-47d3-9f87-a3add4de16d4.jpg'),
                             (5,39,NULL,'해찬','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F431a855e-083e-41c8-ac88-510ddcca18a1.jpg'),
                             (5,40,NULL,'재민','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ff6c578ff-cb17-4b18-b180-5a29ea164156.jpg'),
                             (5,41,NULL,'천러','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F6d4252f8-4276-47c2-81c4-4314acf274f2.jpg'),
                             (5,42,NULL,'지성','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F4c8d3136-838e-4f89-a380-dc92c0db7458.jpg'),
                             (5,43,NULL,'정우','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ff9e3d3b4-3657-4096-8ee6-150b5b78e6a1.jpg'),
                             (5,44,NULL,'쿤','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F05d3009b-d2fd-4ca4-8d22-a630e552db34.jpg'),
                             (5,45,NULL,'샤오쥔','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fdeef779d-4c2a-428b-a5fe-ebc8769add42.jpg'),
                             (5,46,NULL,'양양','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ffe345df5-bf93-43f8-aecc-0b678b01d690.jpg'),
                             (5,47,NULL,'헨드리','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fa4633d5e-3866-47ea-9241-49187ab909c5.jpg'),
                             (6,48,NULL,'태용','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F554c7904-dca7-4639-9406-57b1d4aaa7e8.jpg'),
                             (6,49,NULL,'도영','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ff51039f1-69f3-4b14-8bed-2e0c97c5fa8c.jpg'),
                             (6,50,NULL,'재현','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F6791a659-b583-4004-a9d7-4ec3cc263c14.jpg'),
                             (6,51,NULL,'텐','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fe8560ce6-0ca8-43ae-8c84-1cdeb859f955.jpg'),
                             (6,52,NULL,'마크','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fa39f989a-e2a0-44b2-9f67-3d759cd786a9.jpg'),
                             (7,53,NULL,'태일','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F6e24e0fb-b359-4dfa-90c4-18fa18747970.jpg'),
                             (7,54,NULL,'쟈니','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fde1a67ff-d4db-406a-88f2-8f2ea79e73c9.jpg'),
                             (7,55,NULL,'태용','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F554c7904-dca7-4639-9406-57b1d4aaa7e8.jpg'),
                             (7,56,NULL,'유타','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ffa65767d-a78e-492e-8a3d-111b4fe65249.jpg'),
                             (7,57,NULL,'도영','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ff51039f1-69f3-4b14-8bed-2e0c97c5fa8c.jpg'),
                             (7,58,NULL,'재현','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F6791a659-b583-4004-a9d7-4ec3cc263c14.jpg'),
                             (7,59,NULL,'윈윈','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F690fd938-373f-4a25-86b6-83015c9df79c.jpg'),
                             (7,60,NULL,'마크','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fa39f989a-e2a0-44b2-9f67-3d759cd786a9.jpg'),
                             (7,61,NULL,'해찬','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F431a855e-083e-41c8-ac88-510ddcca18a1.jpg'),
                             (7,62,NULL,'정우','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ff9e3d3b4-3657-4096-8ee6-150b5b78e6a1.jpg'),
                             (8,63,NULL,'마크','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fa39f989a-e2a0-44b2-9f67-3d759cd786a9.jpg'),
                             (8,64,NULL,'런쥔','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F1cebc9a5-7d6d-4376-a118-97936bc8f223.jpg'),
                             (8,65,NULL,'제노','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F6f70aec2-2445-47d3-9f87-a3add4de16d4.jpg'),
                             (8,66,NULL,'해찬','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F431a855e-083e-41c8-ac88-510ddcca18a1.jpg'),
                             (8,67,NULL,'재민','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ff6c578ff-cb17-4b18-b180-5a29ea164156.jpg'),
                             (8,68,NULL,'천러','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F6d4252f8-4276-47c2-81c4-4314acf274f2.jpg'),
                             (8,69,NULL,'지성','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F4c8d3136-838e-4f89-a380-dc92c0db7458.jpg'),
                             (10,70,NULL,'카리나','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F38744acb-273f-4b25-a967-b7be6c533ef1.jpg'),
                             (10,71,NULL,'윈터','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F5a9eaab5-6459-4579-bde4-ec700ae0551c.jpg'),
                             (10,72,NULL,'지젤','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F52aed221-9555-4c16-a418-efdefb1b7344.jpg'),
                             (10,73,NULL,'닝닝','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fde95c268-33fd-4d47-9fb1-190890969a49.jpg'),
                             (13,74,NULL,'조권','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202110%2F20211026112455502.jpg'),
                             (13,75,NULL,'임슬옹','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202302%2F20230215140115280.jpg'),
                             (13,76,NULL,'정진운','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202105%2F20210510151617103.jpg'),
                             (13,77,NULL,'이창민','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2F36%2F20211020134536921.jpg'),
                             (14,78,NULL,'JUN. K','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202106%2F20210623101508594.png'),
                             (14,79,NULL,'닉쿤','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202106%2F20210623095330404.jpg'),
                             (14,80,NULL,'택연','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F81b7e4db-a300-4d04-842f-009b941f0e51.jpg'),
                             (14,81,NULL,'우영','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202106%2F20210623095421521.jpg'),
                             (14,82,NULL,'찬성','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2F173%2F20220509155013351.jpg'),
                             (14,83,NULL,'이준호','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202211%2F20221128100839844.png'),
                             (16,84,NULL,'JAY B','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F647376b6-66d0-4513-9767-3ada9f60f4e6.jpg'),
                             (16,85,NULL,'마크','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2F90%2F202011241541299571.jpg'),
                             (16,86,NULL,'잭슨','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202101%2F20210122185126189.jpg'),
                             (16,87,NULL,'박진영','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202103%2F20210322144614371.jpg'),
                             (16,88,NULL,'영재','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F1f485e2c-a1fb-4e1f-8e13-0f453e5a67a0.jpg'),
                             (16,89,NULL,'뱀뱀','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202303%2F20230322182425685.jpg'),
                             (16,90,NULL,'유겸','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202301%2F20230102111649467.png'),
                             (18,91,NULL,'성진','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202104%2F20210412161839820.png'),
                             (18,92,NULL,'Young K','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F74de9d62-aa2e-4654-b352-0ee37de38b91.jpg'),
                             (18,93,NULL,'원필','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202202%2F20220209115221599.png'),
                             (18,94,NULL,'도운','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202109%2F20210925113425755.png'),
                             (19,95,NULL,'나연','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fa68bd33c-4fcb-43c6-a1b7-176bcef823b3.jpg'),
                             (19,96,NULL,'정연','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fc956c2a1-ce2e-488d-aed9-0c7acb45adcb.jpg'),
                             (19,97,NULL,'모모','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F0bad2945-f58b-4583-87f6-ba9e469685ed.jpg'),
                             (19,98,NULL,'사나','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F30906b1f-e7fe-48f2-af65-fb9adbbe403d.jpg'),
                             (19,99,NULL,'지효','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F1e81b91e-4a7b-41a7-9d4b-6f1b16e277ba.jpg'),
                             (19,100,NULL,'미나','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fae96b371-3fff-4437-95ca-00cafd471452.jpg'),
                             (19,101,NULL,'다현','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F795b0c72-33bb-43a7-9dab-342cb918c350.jpg'),
                             (19,102,NULL,'채영','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ffaa81511-4011-4ea0-924d-a08ec40e13da.jpg'),
                             (19,103,NULL,'쯔위','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F91d1660f-f66a-4c47-b866-2b6c245152c4.jpg'),
                             (20,104,NULL,'방찬','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fe777e05a-293d-46da-8c46-5cfc694247be.jpg'),
                             (20,105,NULL,'리노','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fa5e03d22-f631-4ee2-afe2-5ac5b3b9f8d7.jpg'),
                             (20,106,NULL,'창빈','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F42eb249b-2711-45ca-ba7f-7842a4529e9c.jpg'),
                             (20,107,NULL,'현진','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F052c87c0-ec09-4138-8b19-f85177ecfa27.jpg'),
                             (20,108,NULL,'한','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F9689b2a5-75e4-4e7b-8467-f456aeac8e64.jpg'),
                             (20,109,NULL,'필릭스','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fca714902-2daf-424e-9595-e0aa9c6f5b4c.jpg'),
                             (20,110,NULL,'승민','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F22e488b8-ab4e-4268-96dd-d5d17acef914.jpg'),
                             (20,111,NULL,'아이엔','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F75cc9197-dcec-4866-99b2-0ac1215ce657.jpg'),
                             (21,112,NULL,'예지','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F36918539-e9a9-46b7-a349-e0a9d6ae1f8f.jpg'),
                             (21,113,NULL,'리아','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F183da91f-a162-4a56-9ff7-626eda3ec2c4.jpg'),
                             (21,114,NULL,'류진','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F7e796d48-fb89-4f26-bfbf-3e99c272dce0.jpg'),
                             (21,115,NULL,'채령','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F0978315b-5ca3-4caf-a0a3-e5493eb54999.jpg'),
                             (21,116,NULL,'유나','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F40e2b0d7-255e-4413-98db-60b4e6bcf2ed.jpg'),
                             (23,117,NULL,'릴리','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F7f15f006-5ebe-47bc-9a85-e087cb7b8831.jpg'),
                             (23,118,NULL,'해원','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F414a4dd8-1253-41ce-8e68-6722c1282b7d.jpg'),
                             (23,119,NULL,'설윤','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F6a73c95a-951b-4c5d-813d-f0b326b8081a.jpg'),
                             (23,120,NULL,'배이','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fbc6cec0e-f1e5-42a5-be69-b227db556eaa.jpg'),
                             (23,121,NULL,'지우','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fa3c87dd8-b39d-4d10-9665-d8a83db98856.jpg'),
                             (23,122,NULL,'규진','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F606cef49-22b3-4ee6-8846-b6e6c2ad67b9.jpg'),
                             (25,123,NULL,'강승윤','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202206%2F20220628181405816.jpg'),
                             (25,124,NULL,'김진우','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202206%2F20220628181507677.jpg'),
                             (25,125,NULL,'송민호','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202206%2F20220628181441492.jpg'),
                             (25,126,NULL,'이승훈','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202206%2F20220628181533725.jpg'),
                             (27,127,NULL,'지수','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202303%2F20230327170438473.jpg'),
                             (27,128,NULL,'제니','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F27254ea5-91be-4c19-9004-2d3d2d1fc367.jpg'),
                             (27,129,NULL,'로제','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202209%2F20220913133442989.jpg'),
                             (27,130,NULL,'리사','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202209%2F20220913133506551.jpg'),
                             (28,131,NULL,'최현석','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F624ebb76-ec2e-4505-a765-9de643208d07.jpg'),
                             (28,132,NULL,'지훈','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fe1563116-cf05-4476-9a92-5628d26e5682.jpg'),
                             (28,133,NULL,'요시','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F3dd5d2fc-7a8d-4929-8367-54646e8b60cf.jpg'),
                             (28,134,NULL,'준규','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fe0aaac94-e0e9-4b61-8e49-9d3fab98a8f4.jpg'),
                             (28,135,NULL,'윤재혁','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F84beb53a-9970-4523-958d-be7887bd0cc9.jpg'),
                             (28,136,NULL,'아사히','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F928c4504-47b9-42b3-abd0-751235843416.jpg'),
                             (28,137,NULL,'도영','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F8943f4a7-d4d7-4fe0-a278-04456bc80396.jpg'),
                             (28,138,NULL,'하루토','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fabad7693-8ac0-43bc-806f-58677dd6a483.jpg'),
                             (28,139,NULL,'박정우','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ff7a97770-e9ff-44c8-9fa9-e8bc5acfffb0.jpg'),
                             (28,140,NULL,'소정환','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F91904937-1aa1-47a6-9b82-94628fbaadd3.jpg'),
                             (30,141,NULL,'RM','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2F74%2F202212051555381451.png'),
                             (30,142,NULL,'진','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2F88%2F202210251057335601.png'),
                             (30,143,NULL,'슈가','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2F86%2F202304211711133851.png'),
                             (30,144,NULL,'제이홉','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2F90%2F202308222149326631.jpg'),
                             (30,145,NULL,'지민','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202303%2F20230324141336356.jpg'),
                             (30,146,NULL,'뷔','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fcade00ba-c71f-493e-9c83-be60d716e174.png'),
                             (30,147,NULL,'정국','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ft%2F5f84e775-20f5-4b31-891a-e91a266c7c30.jpg'),
                             (31,148,NULL,'수빈','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ft%2F4092270d-96f6-4e0d-8264-ad2d4a7b0e1c.jpg'),
                             (31,149,NULL,'연준','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ft%2F1762b633-6009-46da-ab6f-744c4deda2c4.jpg'),
                             (31,150,NULL,'범규','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ft%2F6283c4fd-9e29-4cc6-9e50-6dd7830d1ac1.jpg'),
                             (31,151,NULL,'태현','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fa8175eb9-2aac-4ff0-98be-029adb48c061.jpg'),
                             (31,152,NULL,'휴닝카이','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F810794dc-ee04-4c58-9a17-12ce4e762b10.jpg'),
                             (36,153,NULL,'남지현','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202208%2F20220822175301538.jpg'),
                             (36,154,NULL,'허가윤','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202103%2F20210322103801513.jpg'),
                             (36,155,NULL,'전지윤','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202008%2F20200819122024405.jpg'),
                             (36,156,NULL,'김현아','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ft%2F3410d869-df6a-4736-a8df-6b51b1e97bc4.jpg'),
                             (36,157,NULL,'권소현','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F9dde7302-b87d-4296-8d49-425062308366.jpg'),
                             (38,158,NULL,'서은광','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202304%2F20230427160332563.jpg'),
                             (38,159,NULL,'이민혁','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202304%2F2023042716051863.jpg'),
                             (38,160,NULL,'이창섭','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F4992394f-f437-4fe2-a838-dc121ec15f5b.jpg'),
                             (38,161,NULL,'임현식','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202304%2F20230427160942436.jpg'),
                             (38,162,NULL,'프니엘','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202304%2F20230427161014559.jpg'),
                             (38,163,NULL,'육성재','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ff4ab5a6a-b9c8-419d-b170-8e92301a251f.jpg'),
                             (39,164,NULL,'오승희','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202008%2F20200826003115108.jpg'),
                             (39,165,NULL,'최유진','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ft%2F096a6ea3-2d78-42dd-a443-7d25e35dc75f.jpg'),
                             (39,166,NULL,'장승연','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202008%2F20200826003249236.jpg'),
                             (39,167,NULL,'장예은','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202304%2F20230418133933908.jpg'),
                             (39,168,NULL,'권은빈','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202107%2F20210719175021468.jpg'),
                             (40,169,NULL,'진호','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202201%2F20220107020658938.jpg'),
                             (40,170,NULL,'후이','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F80779bb2-58f3-4da1-8fe4-e17f3ac7b809.jpg'),
                             (40,171,NULL,'홍석','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F4f00b2c9-b86b-42ba-95ca-f980979306df.jpg'),
                             (40,172,NULL,'신원','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202201%2F20220107020804876.jpg'),
                             (40,173,NULL,'여원','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202201%2F20220107020843424.jpg'),
                             (40,174,NULL,'옌안','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202201%2F20220107020911904.jpg'),
                             (40,175,NULL,'유토','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202201%2F20220107020937321.jpg'),
                             (40,176,NULL,'키노','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fd9d07bfc-0afa-4355-a8d4-8bfcafd8bf99.jpeg'),
                             (40,177,NULL,'우석','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202201%2F20220107021030685.jpg'),
                             (41,178,NULL,'미연','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fccca65a3-c572-4f7f-a0e6-8ee0e6e48094.jpg'),
                             (41,179,NULL,'민니','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fea228c0b-328b-4a32-b184-7d7a56befdf3.jpg'),
                             (41,180,NULL,'소연','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F7b687ec4-17b2-4f32-b951-996e67865e57.jpg'),
                             (41,181,NULL,'우기','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F64bf9576-a15c-4f42-a597-d9f6d4039721.jpg'),
                             (41,182,NULL,'슈화','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fdc12655e-0d01-47cc-8f23-bbff4659f83d.jpg'),
                             (43,183,NULL,'소원','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202211%2F20221122114458719.jpg'),
                             (43,184,NULL,'예린','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fe5537519-3a1f-4160-9270-0f4f473bf4b2.jpg'),
                             (43,185,NULL,'은하','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ff8d692aa-047e-49e0-9d78-6aa47602a093.jpg'),
                             (43,186,NULL,'유주','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ff8ff87a1-aa97-4983-b12f-9a2420f04ee9.jpg'),
                             (43,187,NULL,'신비','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F340da85b-54f5-465d-b256-bf72bc09850f.jpg'),
                             (43,188,NULL,'엄지','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F188ec9e4-df69-4641-8507-19e6cc2bad59.jpg'),
                             (44,189,NULL,'김채원','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F8e7e6167-7518-49e1-9107-b8a39b34ad3f.jpg'),
                             (44,190,NULL,'사쿠라','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fff142ed7-4861-4844-9ce3-76d250d55ea8.jpg'),
                             (44,191,NULL,'허윤진','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F38f48265-0c4b-4975-b48a-4908e25ca5c5.jpg'),
                             (44,192,NULL,'카즈하','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F1540018e-f57d-4b25-8b8a-c7221fe5ad1c.jpg'),
                             (44,193,NULL,'홍은채','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F3474ff70-433e-456b-9eae-2d7c5d4503aa.jpg'),
                             (45,194,NULL,'민지','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F008ac9a5-795e-4060-849d-4860af085cfe.jpg'),
                             (45,195,NULL,'하니','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F602f0e75-f047-40db-b42a-20e95c265966.jpg'),
                             (45,196,NULL,'다니엘','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F9dbaa974-e2a0-41e8-9364-38f7f8d0791e.jpg'),
                             (45,197,NULL,'해린','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F3bbd678a-8cea-45fb-86f0-92df62bf6006.jpg'),
                             (45,198,NULL,'혜인','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F3c425d60-69b0-4f15-abd0-39d1da383435.jpg'),
                             (46,199,NULL,'상연','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F69cf392b-ba20-427f-8bf1-8cd524a8420f.jpg'),
                             (46,200,NULL,'제이콥','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F3ebd7c1c-4514-4084-bdc8-ea46f80e593b.jpg'),
                             (46,201,NULL,'영훈','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Faf48b1f1-31ba-41a3-a7ea-b380cfd26a13.jpg'),
                             (46,202,NULL,'현재','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fdaf26ccb-70de-45a6-837b-4e51c0379989.jpg'),
                             (46,203,NULL,'주연','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fd788aa71-c80b-4be9-8f2e-a25f95e5818a.jpg'),
                             (46,204,NULL,'케빈','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fe3ef3dd6-521f-4b42-9390-8e5b2334b97f.jpg'),
                             (46,205,NULL,'뉴','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fb962c1ad-c3b9-4532-a7db-2183f88c70b0.jpg'),
                             (46,206,NULL,'큐','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F1db38341-a55f-41b3-9564-e71a85459015.jpg'),
                             (46,207,NULL,'주학년','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F00c25539-d5c1-439c-9749-82c9857cdcbc.jpg'),
                             (46,208,NULL,'선우','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fbb1dec30-9956-4f80-9058-8032c8912f38.jpg'),
                             (46,209,NULL,'에릭','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F8e1c170f-5e14-4901-b111-150d66c31823.jpg'),
                             (47,210,NULL,'박초롱','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F7a554aaf-f34c-4888-913b-377af24c64b4.jpg'),
                             (47,211,NULL,'윤보미','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F2847a058-8572-48c7-98e9-91e9c5d279dc.jpg'),
                             (47,212,NULL,'정은지','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F9e73ac3c-3ee6-4e29-b47c-8a31d33031aa.jpg'),
                             (47,213,NULL,'김남주','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F0b48afc5-3319-4c24-b15d-c1c71bf42db6.jpg'),
                             (47,214,NULL,'오하영','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F0f0670d1-793d-47f7-981e-c9995b0346ef.jpg'),
                             (48,215,NULL,'한승우','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F6bed3034-2f74-4c70-8755-008987fff20f.jpg'),
                             (48,216,NULL,'강승식','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202211%2F20221103123343717.jpg'),
                             (48,217,NULL,'임세준','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202211%2F20221103123456808.jpg'),
                             (48,218,NULL,'도한세','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F1e07d224-24ac-4d32-adb0-7e888ffa5d78.jpg'),
                             (48,219,NULL,'최병찬','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2F137%2F202305171227398431.jpg'),
                             (48,220,NULL,'정수빈','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F4d1d9c4b-ed2f-41a6-a9cf-80887b0fad39.jpg'),
                             (52,221,NULL,'이홍기','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fbe719248-2910-454c-9d6b-bad6a2de1fea.jpg'),
                             (52,222,NULL,'이재진','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F1a2441c0-ed43-46a3-a78b-733efedad750.jpg'),
                             (52,223,NULL,'최민환','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F04173143-2578-4d36-9e26-d126a6dcdaa5.jpg'),
                             (53,224,NULL,'정용화','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F3e42adf3-c8b5-4885-b91f-df6c20fd923f.jpg'),
                             (53,225,NULL,'강민혁','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202110%2F20211012184326879.jpg'),
                             (53,226,NULL,'이정신','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202203%2F20220303174128492.jpg'),
                             (55,227,NULL,'이승협','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202210%2F20221004124042653.jpg'),
                             (55,228,NULL,'차훈','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202210%2F20221004124019251.jpg'),
                             (55,229,NULL,'김재현','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202210%2F20221004123640888.jpg'),
                             (55,230,NULL,'유회승','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202210%2F20221004124107375.jpg'),
                             (55,231,NULL,'서동성','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202210%2F20221005122724174.jpg'),
                             (56,232,NULL,'영빈','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fc5f6b3ca-cce2-4eff-b9d3-a4b4546c4fe0.jpg'),
                             (56,233,NULL,'인성','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ffa83ecdb-85b5-4002-b787-7c5c7673290f.jpg'),
                             (56,234,NULL,'재윤','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202212%2F20221228191118100.jpg'),
                             (56,235,NULL,'다원','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ft%2F38713701-974a-4234-8516-13ada4fb39fc.jpg'),
                             (56,236,NULL,'주호','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F8f4ff2fa-e717-4ef8-85c6-544846e3ce7c.jpg'),
                             (56,237,NULL,'유태양','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F15127512-19bf-41d2-8f3e-5e65fb706816.jpg'),
                             (56,238,NULL,'휘영','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F6bf11ab7-ffd9-460b-bb89-5e6bad8ad574.jpg'),
                             (56,239,NULL,'찬희','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fd614865b-b44e-41b7-b56d-9fa35d9a486e.jpg'),
                             (60,240,NULL,'소연','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ft%2F10d650d2-8b68-4219-bc08-8447815c8a72.jpg'),
                             (60,241,NULL,'진예','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ff838e55a-613a-442f-ac96-cf59381ce03c.jpg'),
                             (60,242,NULL,'해인','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202301%2F20230116161402142.jpg'),
                             (60,243,NULL,'솔빈','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202111%2F20211103100057328.jpg'),
                             (63,244,NULL,'차은우','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202301%2F20230127132729112.jpg'),
                             (63,245,NULL,'문빈','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202212%2F20221222131947930.jpg'),
                             (63,246,NULL,'MJ','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202205%2F20220509184008356.jpg'),
                             (63,247,NULL,'진진','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ff1e53ed4-0377-494c-a05e-6706a75b67cc.jpg'),
                             (63,248,NULL,'윤산하','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202212%2F20221222132024697.jpg'),
                             (64,249,NULL,'최유정','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202209%2F20220907140628675.jpg'),
                             (64,250,NULL,'김도연','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202111%2F20211111201837905.jpg'),
                             (64,251,NULL,'지수연','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202111%2F20211111202337921.jpg'),
                             (64,252,NULL,'엘리','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202111%2F20211111202012434.jpg'),
                             (64,253,NULL,'세이','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202111%2F20211111201956455.jpg'),
                             (64,254,NULL,'루아','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202111%2F20211111201923473.jpg'),
                             (64,255,NULL,'리나','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202111%2F202111112019397.jpg'),
                             (64,256,NULL,'루시','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202111%2F20211111201856966.jpg'),
                             (67,257,NULL,'JR','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F65959c0d-69ba-4553-8535-eb3cf57cca14.jpg'),
                             (67,258,NULL,'아론','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2F127%2F202203111022322631.png'),
                             (67,259,NULL,'백호','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ft%2F4f477efd-3da2-4661-b95a-89d65e90dafc.jpg'),
                             (67,260,NULL,'민현','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2F123%2F202304051108449771.jpg'),
                             (67,261,NULL,'렌','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202306%2F20230613184616340.jpg'),
                             (68,262,NULL,'에스쿱스','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ff08a2d36-cd46-4ee2-a003-f048f70b1d18.png'),
                             (68,263,NULL,'정한','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F664d07ca-c400-46d5-822d-3d3426d924a9.png'),
                             (68,264,NULL,'조슈아','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Feb6c05fd-69fe-46d7-b5ac-2acfd66dd2b2.png'),
                             (68,265,NULL,'준','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F3334cfc1-683a-41ab-ba11-6e868abb9548.png'),
                             (68,266,NULL,'호시','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F4e58e309-c203-4064-9fa7-2b5acd350de4.png'),
                             (68,267,NULL,'원우','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fd481b2ea-d4ef-4dd1-89a4-2045fc462e07.png'),
                             (68,268,NULL,'우지','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fd2600de5-e85e-4bbe-a2b9-810f35fca426.png'),
                             (68,269,NULL,'디에잇','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F06ff66c0-5314-413b-9e05-0a5642c952c5.png'),
                             (68,270,NULL,'민규','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F071de788-3637-4491-ae14-736ca034cc0c.png'),
                             (68,271,NULL,'도겸','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fc43bef9c-2cff-4292-a71f-9c9a392f26d4.png'),
                             (68,272,NULL,'승관','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fc8e1f437-b682-41ac-9850-19a7683bbc3b.png'),
                             (68,273,NULL,'버논','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fb44e9c30-fd91-49e1-9e92-d5bb1c3cdf99.png'),
                             (68,274,NULL,'디노','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fb38b93d8-745c-4429-b36b-acbba19e086c.png'),
                             (70,275,NULL,'이새롬','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202305%2F2023052523251125.png'),
                             (70,276,NULL,'송하영','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202305%2F20230525232626749.png'),
                             (70,277,NULL,'박지원','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202305%2F2023052523272065.png'),
                             (70,278,NULL,'노지선','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202305%2F20230525232806447.png'),
                             (70,279,NULL,'이서연','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202305%2F20230525232845602.png'),
                             (70,280,NULL,'이채영','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202305%2F20230525232925791.png'),
                             (70,281,NULL,'이나경','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202305%2F20230525233004186.png'),
                             (70,282,NULL,'백지헌','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202305%2F20230525233055207.png'),
                             (94,283,NULL,'셔누','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F4779427a-0211-403f-875f-fad85fde9680.jpg'),
                             (94,284,NULL,'민혁','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202212%2F20221229141933703.jpg'),
                             (94,285,NULL,'기현','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202212%2F20221229142047438.jpg'),
                             (94,286,NULL,'형원','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F9e06b0b3-8dda-4b85-93d8-dafc444c4fd1.jpg'),
                             (94,287,NULL,'주헌','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2F120%2F202305171056232031.jpg'),
                             (94,288,NULL,'아이엠','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2F6%2F202306091736072141.png'),
                             (95,289,NULL,'엑시','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F432d5f06-4a0d-400d-a87a-9468e43dfaf7.jpg'),
                             (95,290,NULL,'설아','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202301%2F20230112164921246.jpg'),
                             (95,291,NULL,'보나','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202303%2F20230328142639529.jpg'),
                             (95,292,NULL,'수빈','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202301%2F2023011216501929.jpg'),
                             (95,293,NULL,'은서','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F1df49521-3d12-4f47-a7b8-8196d8f97ccb.jpg'),
                             (95,294,NULL,'여름','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202301%2F20230112165222366.jpg'),
                             (95,295,NULL,'다영','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202301%2F20230117173638537.jpg'),
                             (95,296,NULL,'연정','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202301%2F20230112165317259.jpg'),
                             (95,297,NULL,'루다','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F7d6adb73-94eb-446c-a9d9-013e52a056ac.jpg'),
                             (95,298,NULL,'다원','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F97b7578f-e1da-4259-87cf-b19be3b3178a.jpeg'),
                             (97,299,NULL,'안유진','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ft%2F58ef14a2-0a28-4da0-aa43-26b8f783239e.jpg'),
                             (97,300,NULL,'가을','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ft%2Fa9a6c0e2-2145-4ef0-9cc0-12dae0ee6993.jpg'),
                             (97,301,NULL,'레이','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ft%2F3530abb7-0443-48fd-b393-9286c8004d43.jpg'),
                             (97,302,NULL,'장원영','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ft%2F67eaec40-cb29-40a7-977e-467d1ad492c4.jpg'),
                             (97,303,NULL,'리즈','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ft%2F65b94a43-a7fe-4e98-aaf8-65fcec76019d.jpg'),
                             (97,304,NULL,'이서','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ft%2F7d89aa2f-e48b-4a27-9037-bb173eed25c5.jpg'),
                             (108,305,NULL,'지코','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202207%2F20220715142503516.jpg'),
                             (108,306,NULL,'태일','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202202%2F2022021615521892.jpg'),
                             (108,307,NULL,'재효','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202101%2F2021011417553587.jpg'),
                             (108,308,NULL,'비범','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202110%2F20211013172804707.jpg'),
                             (108,309,NULL,'피오','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F201909%2F20190911212139765.jpg'),
                             (108,310,NULL,'박경','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2F174%2F201911151129108701.jpg'),
                             (108,311,NULL,'유권','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202202%2F20220221123922106.jpg'),
                             (109,312,NULL,'홍중','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F40294a29-69d9-47c2-8edf-835665a25839.jpg'),
                             (109,313,NULL,'성화','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fc8cbe97c-6fa3-4450-8c1e-7e14efa17070.jpg'),
                             (109,314,NULL,'윤호','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F89588545-3478-4f42-8275-1a8c46afa31a.jpg'),
                             (109,315,NULL,'여상','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F173d9c13-8506-4231-9822-6a133856a0bf.jpg'),
                             (109,316,NULL,'산','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F00e7f5cd-62c6-4e85-99d7-953d46375629.jpg'),
                             (109,317,NULL,'민기','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fd5906304-d507-4d39-90b8-37f9509e7fa1.jpg'),
                             (109,318,NULL,'우영','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F7855f025-cd73-45c1-921b-c738b1c0df64.jpg'),
                             (109,319,NULL,'종호','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F3a253d83-0552-424e-b8f5-1cc6a215b825.jpg'),
                             (123,320,NULL,'이유','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F6bc042d4-2210-48ac-a385-53921ee7c895.jpg'),
                             (123,321,NULL,'시현','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F2dfe27da-264b-4f05-9327-a83633c16eca.jpg'),
                             (123,322,NULL,'미아','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F2f5d51c7-7676-4a45-a00f-64dd079e039c.jpg'),
                             (123,323,NULL,'온다','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F94932888-c9b2-4b9b-9c8d-f6ca280812fb.jpg'),
                             (123,324,NULL,'아샤','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F32a7c153-8799-4dec-8a44-f46bbc7fed73.jpg'),
                             (123,325,NULL,'이런','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fc11891a0-326b-4e75-8433-ebddcc84bb0a.jpg'),
                             (128,326,NULL,'혜빈','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202201%2F20220113104016956.jpg'),
                             (128,327,NULL,'제인','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202304%2F20230404050401286.jpg'),
                             (128,328,NULL,'나윤','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ft%2F539bd8b6-cee0-46ba-a045-fd9d2948069f.jpg'),
                             (128,329,NULL,'주이','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202201%2F2022011310424186.jpg'),
                             (128,330,NULL,'아인','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202201%2F20220113193204651.jpg'),
                             (128,331,NULL,'낸시','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2F83%2F2023032810382751.jpg'),
                             (129,332,NULL,'권은비','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fe0f4165e-f0d0-44b7-80eb-cfb212c3e598.jpg'),
                             (129,333,NULL,'강혜원','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202109%2F20210929173837584.jpg'),
                             (129,334,NULL,'최예나','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F3b3040d7-639f-4126-9ea1-b8a24e8cd0b8.jpg'),
                             (129,335,NULL,'이채연','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F266a8322-546c-4fe0-ae49-264564a84b41.jpg'),
                             (129,336,NULL,'김채원','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F8e7e6167-7518-49e1-9107-b8a39b34ad3f.jpg'),
                             (129,337,NULL,'김민주','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202109%2F20210917110800550.jpg'),
                             (129,338,NULL,'야부키 나코','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202012%2F20201202170801241.jpg'),
                             (129,339,NULL,'혼다 히토미','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202012%2F20201202170948911.jpg'),
                             (129,340,NULL,'조유리','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F8e1b72d0-e83f-4044-8501-d4a87002dac4.jpg'),
                             (129,341,NULL,'안유진','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ft%2F58ef14a2-0a28-4da0-aa43-26b8f783239e.jpg'),
                             (129,342,NULL,'장원영','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ft%2F67eaec40-cb29-40a7-977e-467d1ad492c4.jpg'),
                             (129,343,NULL,'사쿠라','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fff142ed7-4861-4844-9ce3-76d250d55ea8.jpg'),
                             (133,344,NULL,'희진','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fc699735d-be59-46c0-b8b8-d4ed461c7072.jpg'),
                             (133,345,NULL,'현진','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F6eb024a6-53e1-4dc7-82d4-39e7f7f15d05.jpg'),
                             (133,346,NULL,'하슬','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F10c8fe40-2728-429c-af82-b159c9b1e0a3.jpg'),
                             (133,347,NULL,'여진','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F7e06e268-c1bf-4842-afb9-c93dc9f1ccfa.jpg'),
                             (133,348,NULL,'비비','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F801581ad-f274-422d-b2a9-e416fd3ee481.jpg'),
                             (133,349,NULL,'김립','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fb6e1e5fc-8f62-47b5-9d1b-223bb78242b6.jpg'),
                             (133,350,NULL,'진솔','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fa9e7c9a3-2f66-4e94-9a84-52fd57dfbcfe.jpg'),
                             (133,351,NULL,'최리','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F904b7a5e-4c0c-4b15-8896-9adabc778111.jpg'),
                             (133,352,NULL,'이브','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F202206%2F20220618150922175.jpg'),
                             (133,353,NULL,'고원','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F1e498472-de7a-4c94-ada2-b7ee5703505b.jpg'),
                             (133,354,NULL,'올리비아 혜','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F6a718d38-d5b0-4fa6-adae-6ccd05debe65.jpg'),
                             (135,355,NULL,'전웅','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F6996b904-ef56-472d-85a6-466b44edb7be.jpg'),
                             (135,356,NULL,'김동현','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F80ca077a-accd-4a38-8f8d-a307f2878d2d.jpg'),
                             (135,357,NULL,'박우진','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F73d7190f-1f24-4611-8a3f-1789446a55e6.jpg'),
                             (135,358,NULL,'이대휘','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fa14d9a88-dcc1-4e3c-bacf-d1a5c9967177.jpg'),
                             (139,359,NULL,'정원','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F92565f9b-9609-4793-8ec8-6edc85e05dfe.jpg'),
                             (139,360,NULL,'희승','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fe3133a65-fa07-481d-a321-4cf651f02121.jpg'),
                             (139,361,NULL,'제이','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F340da5fc-9412-453c-a79c-54b0b38cc11c.jpg'),
                             (139,362,NULL,'제이크','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fea455e7b-efc0-438c-b39d-570f390a7f73.jpg'),
                             (139,363,NULL,'성훈','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2F122ded3e-c0c7-4494-a849-9dc3077113df.jpg'),
                             (139,364,NULL,'선우','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Fffbb5cb4-7515-4308-a0a4-6208748932d1.jpg'),
                             (139,365,NULL,'니키','https://search.pstatic.net/common?type=n&size=150x168&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2FprofileImg%2Ff8863a24-828b-4d1c-9901-04f4e4a1987a.jpg');
/*!40000 ALTER TABLE `IdolMember` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `barter_chat_messages`
--

DROP TABLE IF EXISTS `barter_chat_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `barter_chat_messages` (
                                        `barter_chat_created_at` datetime(6) DEFAULT NULL,
                                        `barter_chat_id` bigint(20) NOT NULL AUTO_INCREMENT,
                                        `barter_chat_room_id` bigint(20) DEFAULT NULL,
                                        `barter_chat_img_code` varchar(255) DEFAULT NULL,
                                        `barter_chat_message` text DEFAULT NULL,
                                        `barter_chat_sender_id` varchar(255) DEFAULT NULL,
                                        PRIMARY KEY (`barter_chat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `barter_chat_messages`
--

LOCK TABLES `barter_chat_messages` WRITE;
/*!40000 ALTER TABLE `barter_chat_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `barter_chat_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `barter_chat_room`
--

DROP TABLE IF EXISTS `barter_chat_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `barter_chat_room` (
                                    `barter_chat_room_delete` bit(1) DEFAULT NULL,
                                    `barter_board_id` bigint(20) DEFAULT NULL,
                                    `barter_chat_room_id` bigint(20) NOT NULL AUTO_INCREMENT,
                                    `barter_latest_chat` bigint(20) DEFAULT NULL,
                                    `barter_owner_latest_chat` bigint(20) DEFAULT NULL,
                                    `barter_room_created_at` datetime(6) DEFAULT NULL,
                                    `barter_visitor_latest_chat` bigint(20) DEFAULT NULL,
                                    `barter_board_title` varchar(255) DEFAULT NULL,
                                    `barter_owner_id` varchar(255) DEFAULT NULL,
                                    `barter_visitor_id` varchar(255) DEFAULT NULL,
                                    PRIMARY KEY (`barter_chat_room_id`),
                                    KEY `FK8syjsdhq6dsuftxk56cuiq3jc` (`barter_latest_chat`),
                                    CONSTRAINT `FK8syjsdhq6dsuftxk56cuiq3jc` FOREIGN KEY (`barter_latest_chat`) REFERENCES `barter_chat_messages` (`barter_chat_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `barter_chat_room`
--

LOCK TABLES `barter_chat_room` WRITE;
/*!40000 ALTER TABLE `barter_chat_room` DISABLE KEYS */;
/*!40000 ALTER TABLE `barter_chat_room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
                        `bias_id` bigint(20) DEFAULT NULL,
                        `created_at` datetime(6) NOT NULL,
                        `updated_at` datetime(6) DEFAULT NULL,
                        `email` varchar(100) DEFAULT NULL,
                        `kakao_id` varchar(50) DEFAULT NULL,
                        `nickname` varchar(50) DEFAULT NULL,
                        `oauth_type` varchar(50) DEFAULT NULL,
                        `user_id` char(50) NOT NULL,
                        `user_name` char(20) NOT NULL,
                        PRIMARY KEY (`user_id`),
                        UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`),
                        UNIQUE KEY `UK_4tp32nb01jmfcirpipti37lfs` (`kakao_id`),
                        UNIQUE KEY `UK_n4swgcf30j6bmtb4l4cjryuym` (`nickname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES
    (NULL,'2024-02-06 16:36:06.394190','2024-02-06 16:36:06.394190','qhdrnak@naver.com','3321474497','qhdrnak@naver.com','kakao','17b2461a-81a7-4fca-b6f2-66e87280aeea','김봉균');
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

-- Dump completed on 2024-02-07 10:50:35
