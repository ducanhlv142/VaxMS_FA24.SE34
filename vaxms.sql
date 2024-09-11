-- Database creation
CREATE DATABASE IF NOT EXISTS VaxMS;
USE VaxMS;

-- Bảng authority
CREATE TABLE `authority` (
  `authority_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL, -- Tên quyền hạn, tối đa 50 ký tự là hợp lý
  PRIMARY KEY (`authority_id`)
) ENGINE=InnoDB;

-- Bảng account (chứa thông tin đăng nhập)
CREATE TABLE `account` (
  `account_id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(100) DEFAULT NULL UNIQUE, -- Email, tối đa 100 ký tự
  `password` varchar(255) DEFAULT NULL, -- Mật khẩu, 255 ký tự đủ để chứa mã hóa
  `google_id` varchar(100) DEFAULT NULL, -- Lưu ID Google, tối đa 100 ký tự
  `phone_number` varchar(15) DEFAULT NULL UNIQUE, -- Số điện thoại, tối đa 15 ký tự
  `login_type` ENUM('standard', 'google', 'phone') DEFAULT 'standard', -- Xác định loại đăng nhập
  `activation_key` varchar(100) DEFAULT NULL, -- Key kích hoạt, tối đa 100 ký tự
  `actived` bit(1) DEFAULT NULL, -- Trạng thái kích hoạt
  `authority_id` bigint NOT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`account_id`),
  FOREIGN KEY (`authority_id`) REFERENCES `authority`(`authority_id`)
) ENGINE=InnoDB;

-- Bảng customer_profile (chứa thông tin cá nhân chi tiết và bảo hiểm)
CREATE TABLE `customer_profile` (
  `profile_id` bigint NOT NULL AUTO_INCREMENT,
  `customer_id` bigint NOT NULL,
  `full_name` varchar(100) NOT NULL, -- Tên đầy đủ, tối đa 100 ký tự
  `gender` ENUM('Male', 'Female', 'Other') NOT NULL, -- Giới tính
  `birthdate` date DEFAULT NULL, -- Ngày sinh
  `phone` varchar(15) NOT NULL UNIQUE, -- Số điện thoại, tối đa 15 ký tự
  `avatar` varchar(255) DEFAULT NULL, -- Avatar, 255 ký tự để chứa URL ảnh
  `city` varchar(100) NOT NULL, -- Tỉnh/Thành phố, tối đa 100 ký tự
  `district` varchar(100) NOT NULL, -- Quận/Huyện, tối đa 100 ký tự
  `ward` varchar(100) NOT NULL, -- Phường/Xã, tối đa 100 ký tự
  `street` varchar(255) DEFAULT NULL, -- Số nhà, Tên đường, tối đa 255 ký tự
  `insurance_status` tinyint(1) DEFAULT NULL, -- Trạng thái bảo hiểm
  `contact_name` varchar(100) NOT NULL, -- Tên người liên hệ, tối đa 100 ký tự
  `contact_relationship` varchar(50) NOT NULL, -- Mối quan hệ, tối đa 50 ký tự
  `contact_phone` varchar(15) NOT NULL, -- Số điện thoại người liên hệ, tối đa 15 ký tự
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`profile_id`),
  FOREIGN KEY (`customer_id`) REFERENCES `account`(`account_id`)
) ENGINE=InnoDB;

-- Bảng topics (chủ đề của bài viết)
CREATE TABLE `topics` (
  `topic_id` bigint NOT NULL AUTO_INCREMENT,
  `topic_name` varchar(100) NOT NULL, -- Tên chủ đề, tối đa 100 ký tự
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`topic_id`)
) ENGINE=InnoDB;

-- Bảng news (chứa thông tin tin tức)
CREATE TABLE `news` (
  `news_id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL, -- Tiêu đề, tối đa 255 ký tự
  `content` text NOT NULL, -- Nội dung tin tức
  `image` varchar(255) DEFAULT NULL, -- Đường dẫn hình ảnh
  `author_id` bigint NOT NULL, -- Người tạo tin tức
  `topic_id` bigint NOT NULL, -- Chủ đề của tin tức
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`news_id`),
  FOREIGN KEY (`author_id`) REFERENCES `account`(`account_id`),
  FOREIGN KEY (`topic_id`) REFERENCES `topics`(`topic_id`)
) ENGINE=InnoDB;

-- Bảng news_sources (nguồn liên quan đến bài viết)
CREATE TABLE `news_sources` (
  `source_id` bigint NOT NULL AUTO_INCREMENT,
  `news_id` bigint NOT NULL,
  `source_name` varchar(255) NOT NULL, -- Tên nguồn, tối đa 255 ký tự
  `source_url` varchar(255) NOT NULL, -- URL nguồn, tối đa 255 ký tự
  PRIMARY KEY (`source_id`),
  FOREIGN KEY (`news_id`) REFERENCES `news`(`news_id`)
) ENGINE=InnoDB;


-- Bảng vaccine_types
CREATE TABLE `vaccine_types` (
  `type_id` bigint NOT NULL AUTO_INCREMENT,
  `type_name` varchar(100) NOT NULL, -- Tên loại vaccine, tối đa 100 ký tự
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB;

-- Bảng manufacturers
CREATE TABLE `manufacturers` (
  `manufacturer_id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL, -- Tên nhà sản xuất, tối đa 100 ký tự
  `country` varchar(100) DEFAULT NULL, -- Quốc gia, tối đa 100 ký tự
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`manufacturer_id`)
) ENGINE=InnoDB;

-- Bảng age_groups (nhóm tuổi)
CREATE TABLE `age_groups` (
  `age_group_id` bigint NOT NULL AUTO_INCREMENT,
  `age_range` varchar(50) NOT NULL, -- Phạm vi tuổi, tối đa 50 ký tự
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`age_group_id`)
) ENGINE=InnoDB;

-- Bảng vaccine (thông tin cơ bản về vaccine và nhóm tuổi)
CREATE TABLE `vaccine` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL, -- Tên vaccine, tối đa 255 ký tự
  `type_id` bigint NOT NULL,
  `manufacturer_id` bigint NOT NULL,
  `age_group_id` bigint NOT NULL, -- Liên kết với nhóm tuổi
  `description` text DEFAULT NULL, -- Mô tả vaccine
  `image` varchar(255) DEFAULT NULL, -- Đường dẫn hình ảnh vaccine
  `price` int NOT NULL, -- Giá vaccine
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`type_id`) REFERENCES `vaccine_types`(`type_id`),
  FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturers`(`manufacturer_id`),
  FOREIGN KEY (`age_group_id`) REFERENCES `age_groups`(`age_group_id`)
) ENGINE=InnoDB;

-- Bảng vaccine_inventory (quản lý kho vaccine)
CREATE TABLE `vaccine_inventory` (
  `inventory_id` bigint NOT NULL AUTO_INCREMENT,
  `vaccine_id` bigint NOT NULL,
  `quantity` int NOT NULL, -- Số lượng vaccine
  `import_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `export_date` datetime DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`inventory_id`),
  FOREIGN KEY (`vaccine_id`) REFERENCES `vaccine`(`id`),
) ENGINE=InnoDB;

-- Bảng vaccine_distribution (lịch sử phân phối vaccine)
CREATE TABLE `vaccine_distribution` (
  `distribution_id` bigint NOT NULL AUTO_INCREMENT,
  `inventory_id` bigint NOT NULL,
  `distribution_type` ENUM('import', 'export') NOT NULL, -- Loại phân phối
  `quantity` int NOT NULL, -- Số lượng phân phối
  `distribution_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`distribution_id`),
  FOREIGN KEY (`inventory_id`) REFERENCES `vaccine_inventory`(`inventory_id`)
) ENGINE=InnoDB;

-- Bảng vaccine_schedule
CREATE TABLE `vaccine_schedule` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `vaccine_id` bigint NOT NULL,
  `created_by` bigint NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `limit_people` int NOT NULL, -- Giới hạn số người
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`vaccine_id`) REFERENCES `vaccine`(`id`),
  FOREIGN KEY (`created_by`) REFERENCES `account`(`account_id`)
) ENGINE=InnoDB;

-- Bảng customer_schedule (gộp cả trạng thái lịch tiêm)
CREATE TABLE `customer_schedule` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `account_id` bigint NOT NULL,
  `vaccine_schedule_id` bigint NOT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `pay_status` tinyint(1) DEFAULT NULL, -- Trạng thái thanh toán
  `status` ENUM('pending', 'confirmed', 'cancelled') NOT NULL, -- Trạng thái lịch tiêm
  PRIMARY KEY (`id`),
  FOREIGN KEY (`account_id`) REFERENCES `account`(`account_id`),
  FOREIGN KEY (`vaccine_schedule_id`) REFERENCES `vaccine_schedule`(`id`)
) ENGINE=InnoDB;

-- Bảng comments (bao gồm bình luận, thích và trả lời cho tin tức và vaccine)
CREATE TABLE `comments` (
  `comment_id` bigint NOT NULL AUTO_INCREMENT,
  `account_id` bigint NOT NULL,
  `vaccine_id` bigint DEFAULT NULL, -- Bình luận cho vaccine, có thể để trống nếu là bình luận tin tức
  `news_id` bigint DEFAULT NULL, -- Bình luận cho tin tức, có thể để trống nếu là bình luận vaccine
  `parent_comment_id` bigint DEFAULT NULL, -- Để trả lời bình luận khác
  `content` text DEFAULT NULL, -- Nội dung bình luận
  `likes_count` int DEFAULT 0, -- Số lượt thích
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  FOREIGN KEY (`account_id`) REFERENCES `account`(`account_id`),
  FOREIGN KEY (`vaccine_id`) REFERENCES `vaccine`(`id`),
  FOREIGN KEY (`news_id`) REFERENCES `news`(`news_id`),
  FOREIGN KEY (`parent_comment_id`) REFERENCES `comments`(`comment_id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Bảng payment
CREATE TABLE `payment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `customer_schedule_id` bigint NOT NULL,
  `amount` int NOT NULL, -- Số tiền thanh toán
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `created_by` bigint NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`customer_schedule_id`) REFERENCES `customer_schedule`(`id`),
  FOREIGN KEY (`created_by`) REFERENCES `account`(`account_id`)
) ENGINE=InnoDB;

-- Bảng payment_methods (phương thức thanh toán)
CREATE TABLE `payment_methods` (
  `method_id` bigint NOT NULL AUTO_INCREMENT,
  `method_name` varchar(50) NOT NULL, -- Tên phương thức, tối đa 50 ký tự
  PRIMARY KEY (`method_id`)
) ENGINE=InnoDB;

-- Bảng payment_details (chi tiết thanh toán)
CREATE TABLE `payment_details` (
  `payment_detail_id` bigint NOT NULL AUTO_INCREMENT,
  `payment_id` bigint NOT NULL,
  `method_id` bigint NOT NULL,
  `amount` int NOT NULL, -- Số tiền chi tiết
  `transaction_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`payment_detail_id`),
  FOREIGN KEY (`payment_id`) REFERENCES `payment`(`id`),
  FOREIGN KEY (`method_id`) REFERENCES `payment_methods`(`method_id`)
) ENGINE=InnoDB;

-- Bảng doctors (thông tin bác sĩ)
CREATE TABLE `doctors` (
  `doctor_id` bigint NOT NULL AUTO_INCREMENT,
  `account_id` bigint NOT NULL,
  `specialization` varchar(100) DEFAULT NULL, -- Chuyên môn, tối đa 100 ký tự
  `experience_years` int DEFAULT NULL, -- Số năm kinh nghiệm
  `bio` text DEFAULT NULL, -- Thông tin mô tả về bác sĩ
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`doctor_id`),
  FOREIGN KEY (`account_id`) REFERENCES `account`(`account_id`)
) ENGINE=InnoDB;

-- Bảng nurses (thông tin y tá)
CREATE TABLE `nurses` (
  `nurse_id` bigint NOT NULL AUTO_INCREMENT,
  `account_id` bigint NOT NULL,
  `qualification` varchar(100) DEFAULT NULL, -- Trình độ, tối đa 100 ký tự
  `experience_years` int DEFAULT NULL, -- Số năm kinh nghiệm
  `bio` text DEFAULT NULL, -- Thông tin mô tả về y tá
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`nurse_id`),
  FOREIGN KEY (`account_id`) REFERENCES `account`(`account_id`)
) ENGINE=InnoDB;

-- Bảng feedback (gộp cả phản hồi về bác sĩ và y tá)
CREATE TABLE `feedback` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `customer_schedule_id` bigint NOT NULL,
  `feedback_type` ENUM('general', 'doctor', 'nurse') DEFAULT 'general', -- Loại phản hồi
  `doctor_id` bigint DEFAULT NULL, -- Id của bác sĩ
  `nurse_id` bigint DEFAULT NULL, -- Id của y tá
  `content` text DEFAULT NULL, -- Nội dung phản hồi
  `rating` tinyint(1) DEFAULT NULL, -- Đánh giá (1-5 sao)
  `response` text DEFAULT NULL, -- Phản hồi từ hệ thống
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`customer_schedule_id`) REFERENCES `customer_schedule`(`id`),
  FOREIGN KEY (`doctor_id`) REFERENCES `doctors`(`doctor_id`),
  FOREIGN KEY (`nurse_id`) REFERENCES `nurses`(`nurse_id`)
) ENGINE=InnoDB;


-- Dữ liệu mẫu cho bảng authority
INSERT INTO authority (name) 
VALUES 
('Admin'), 
('Doctor'), 
('Nurse'), 
('Customer'), 
('Support Staff');

-- Dữ liệu mẫu cho bảng account
INSERT INTO account (email, password, google_id, phone_number, login_type, activation_key, actived, authority_id, created_date) 
VALUES 
('admin@vaxms.com', 'hashed_password', NULL, '0123456789', 'standard', NULL, 1, 1, NOW()), 
('doctor@vaxms.com', 'hashed_password', NULL, '0987654321', 'standard', NULL, 1, 2, NOW()), 
('nurse@vaxms.com', 'hashed_password', NULL, '0223344556', 'standard', NULL, 1, 3, NOW()), 
('customer1@vaxms.com', 'hashed_password', NULL, '0998877665', 'standard', NULL, 1, 4, NOW()), 
('support@vaxms.com', 'hashed_password', NULL, '0112233445', 'standard', NULL, 1, 5, NOW());

-- Dữ liệu mẫu cho bảng customer_profile
INSERT INTO customer_profile (customer_id, full_name, gender, birthdate, phone, avatar, city, district, ward, street, insurance_status, contact_name, contact_relationship, contact_phone, created_date) 
VALUES 
(4, 'Nguyen Van A', 'Male', '1990-01-01', '0998877665', 'avatar1.jpg', 'Ho Chi Minh', 'District 1', 'Ward 1', '123 Le Loi', 1, 'Tran Thi B', 'Wife', '0123456789', NOW());

-- Dữ liệu mẫu cho bảng topics
INSERT INTO topics (topic_name, created_date) 
VALUES 
('Health', NOW()), 
('Vaccination', NOW()), 
('COVID-19', NOW());

-- Dữ liệu mẫu cho bảng news
INSERT INTO news (title, content, image, author_id, topic_id, created_date) 
VALUES 
('COVID-19 Vaccination Updates', 'Latest updates on COVID-19 vaccination', 'covid19.jpg', 1, 3, NOW()), 
('Health Benefits of Regular Vaccination', 'Vaccination is crucial for maintaining public health...', 'health_vaccine.jpg', 1, 2, NOW());

-- Dữ liệu mẫu cho bảng news_sources
INSERT INTO news_sources (news_id, source_name, source_url) 
VALUES 
(1, 'WHO', 'https://www.who.int'), 
(2, 'CDC', 'https://www.cdc.gov');


INSERT INTO age_groups (age_range, created_date) 
VALUES 
('0-6 months', NOW()),
('0-12 months', NOW()), 
('0-24 months', NOW()), 
('6-24 months', NOW()), 
('12-24 months', NOW()), 
('4-6 years', NOW()), 
('7-18 years', NOW()), 
('Women planning to become pregnant', NOW()), 
('Adults', NOW());

-- Dữ liệu mẫu cho bảng vaccine_types
INSERT INTO vaccine_types (type_name, created_date) 
VALUES 
('COVID-19', NOW()), 
('Influenza', NOW()), 
('Hepatitis B', NOW());

-- Dữ liệu mẫu cho bảng manufacturers
INSERT INTO manufacturers (name, country, created_date) 
VALUES 
('Pfizer', 'USA', NOW()), 
('Moderna', 'USA', NOW()), 
('AstraZeneca', 'UK', NOW());

-- Dữ liệu mẫu cho bảng vaccine
INSERT INTO vaccine (name, type_id, manufacturer_id, age_group_id, description, image, price, created_date) 
VALUES 
('Pfizer-BioNTech COVID-19 Vaccine', 1, 1, 1, 'Effective against COVID-19', 'pfizer.jpg', 20, NOW()), 
('Moderna COVID-19 Vaccine', 1, 2, 2, 'mRNA vaccine for COVID-19', 'moderna.jpg', 22, NOW()), 
('AstraZeneca COVID-19 Vaccine', 1, 3, 3, 'Viral vector vaccine for COVID-19', 'astrazeneca.jpg', 18, NOW());
