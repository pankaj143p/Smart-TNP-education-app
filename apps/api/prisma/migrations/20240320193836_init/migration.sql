-- AlterTable
ALTER TABLE `TeacherRegestrationToken` ADD COLUMN `role` ENUM('ADMIN', 'STUDENT', 'TEACHER') NOT NULL DEFAULT 'TEACHER';