-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: restful
-- ------------------------------------------------------
-- Server version	5.7.19-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `contents`
--

DROP TABLE IF EXISTS `contents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contents` (
  `row_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) NOT NULL,
  `nicname` varchar(50) NOT NULL,
  `board_id` int(11) DEFAULT NULL,
  `title` varchar(50) NOT NULL,
  `content` varchar(5000) NOT NULL,
  `comment_cnt` int(11) DEFAULT '0',
  `like_cnt` int(11) DEFAULT '0',
  `read_cnt` int(11) DEFAULT '0',
  `delete_yn` tinyint(4) DEFAULT '0',
  `create_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_modify_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `delete_date` datetime DEFAULT NULL,
  PRIMARY KEY (`row_id`,`user_id`,`nicname`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contents`
--

LOCK TABLES `contents` WRITE;
/*!40000 ALTER TABLE `contents` DISABLE KEYS */;
INSERT INTO `contents` VALUES (2,'test1111','제작자2',1,'테스트 제목2','두번째 내용 포스트맨으로 수정함(수정시간포함)',5,6,0,0,'2017-10-31 22:24:12','2017-11-05 18:47:44',NULL),(3,'test3333','제작자3',1,'테스트 제목3','테스트용 내용 포스트맨으로 전송한 첫 내용3',0,0,0,1,'2017-11-02 20:54:57','2017-11-05 18:51:19',NULL),(4,'test4444','제작자4',1,'테스트 제목4','테스트용 내용 포스트맨으로 전송한 첫 내용4',0,9,0,0,'2017-11-02 20:56:37','2017-11-02 20:56:37',NULL),(5,'test5','제작자5',1,'테스트 제목5','테스트용 내용 포스트맨으로 전송한 첫 내용5',0,3,0,0,'2017-11-02 20:56:54','2017-11-02 20:56:54',NULL),(6,'test6','제작자6',1,'테스트 제목6','테스트용 내용 포스트맨으로 전송한 첫 내용6',0,2,0,0,'2017-11-02 20:57:01','2017-11-02 20:57:01',NULL),(7,'test6','제작자6',0,'테스트 제목6','테스트용 내용 포스트맨으로 전송한 첫 내용6',0,1,0,0,'2017-11-07 19:55:57','2017-11-07 19:55:57',NULL),(8,'test6','제작자6',2,'테스트 제목6','테스트용 내용 포스트맨으로 전송한 첫 내용6',0,0,0,0,'2017-11-07 19:56:01','2017-11-07 19:56:01',NULL),(9,'test6','제작자6',3,'테스트 제목6','테스트용 내용 포스트맨으로 전송한 첫 내용6',0,0,0,0,'2017-11-07 19:56:05','2017-11-07 19:56:05',NULL),(10,'test6','제작자6',4,'테스트 제목6','테스트용 내용 포스트맨으로 전송한 첫 내용6',0,0,0,0,'2017-11-07 19:56:09','2017-11-07 19:56:09',NULL),(11,'test6','제작자6',5,'테스트 제목6','테스트용 내용 포스트맨으로 전송한 첫 내용6',0,0,0,0,'2017-11-07 19:56:11','2017-11-07 19:56:11',NULL),(12,'test7','제작자7',0,'테스트 제목7','테스트용 내용 포스트맨으로 전송한 첫 내용7',0,1,0,0,'2017-11-07 19:56:24','2017-11-07 19:56:24',NULL),(13,'test8','제작자8',0,'테스트 제목8','테스트용 내용 포스트맨으로 전송한 첫 내용8',0,0,0,0,'2017-11-07 19:56:31','2017-11-07 19:56:31',NULL),(14,'test8','제작자8',2,'테스트 제목8','테스트용 내용 포스트맨으로 전송한 첫 내용8',0,0,0,0,'2017-11-07 19:56:37','2017-11-07 19:56:37',NULL),(15,'test1234','제작자',1,'안드로이드로 작성테스트','안드로이드로 글 작성 테스트함. 작성 완료 후 페이지 새로고침도 확인필요',11,4,0,0,'2017-11-07 20:42:25','2017-11-07 20:42:25',NULL),(16,'test1234','제작자',0,'ICT 그룹에도 글 작성확인','ICT그룹 게시판에도 글작성 정상확인',6,0,0,0,'2017-11-07 20:44:51','2017-11-07 20:44:51',NULL),(17,'test1234','제작자',0,'긍작성 테스트2','테스트중',5,1,0,0,'2017-11-07 20:50:56','2017-11-07 20:50:56',NULL);
/*!40000 ALTER TABLE `contents` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-09 23:45:51
