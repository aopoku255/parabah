/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `User` table. All the data in the column will be lost.
  - The primary key for the `PayoutRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `PayoutRequest` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `SocialLinks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `SocialLinks` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `ProductReview` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `ProductReview` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `RefundRequest` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `RefundRequest` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `Shop` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `Shop` table. All the data in the column will be lost.
  - You are about to alter the column `socialLinksId` on the `Shop` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `userId` on the `Shop` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "avatar" TEXT,
    "password" TEXT NOT NULL,
    "dateOfBirth" DATETIME NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL
);
INSERT INTO "new_User" ("avatar", "dateOfBirth", "email", "firstName", "lastName", "password", "phone", "verified") SELECT "avatar", "dateOfBirth", "email", "firstName", "lastName", "password", "phone", "verified" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE TABLE "new_PayoutRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "no" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "message" TEXT NOT NULL
);
INSERT INTO "new_PayoutRequest" ("amount", "date", "id", "message", "no", "status") SELECT "amount", "date", "id", "message", "no", "status" FROM "PayoutRequest";
DROP TABLE "PayoutRequest";
ALTER TABLE "new_PayoutRequest" RENAME TO "PayoutRequest";
CREATE TABLE "new_SocialLinks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "facebook" TEXT,
    "youtube" TEXT,
    "twitter" TEXT,
    "instagram" TEXT
);
INSERT INTO "new_SocialLinks" ("facebook", "id", "instagram", "twitter", "youtube") SELECT "facebook", "id", "instagram", "twitter", "youtube" FROM "SocialLinks";
DROP TABLE "SocialLinks";
ALTER TABLE "new_SocialLinks" RENAME TO "SocialLinks";
CREATE TABLE "new_ProductReview" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rating" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "customer" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "comment" TEXT NOT NULL
);
INSERT INTO "new_ProductReview" ("comment", "customer", "id", "image", "name", "rating") SELECT "comment", "customer", "id", "image", "name", "rating" FROM "ProductReview";
DROP TABLE "ProductReview";
ALTER TABLE "new_ProductReview" RENAME TO "ProductReview";
CREATE TABLE "new_RefundRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderNo" TEXT NOT NULL,
    "shopName" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL
);
INSERT INTO "new_RefundRequest" ("amount", "id", "image", "name", "orderNo", "shopName", "status") SELECT "amount", "id", "image", "name", "orderNo", "shopName", "status" FROM "RefundRequest";
DROP TABLE "RefundRequest";
ALTER TABLE "new_RefundRequest" RENAME TO "RefundRequest";
CREATE TABLE "new_Shop" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "coverPicture" TEXT NOT NULL,
    "profilePicture" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "socialLinksId" INTEGER NOT NULL,
    CONSTRAINT "Shop_socialLinksId_fkey" FOREIGN KEY ("socialLinksId") REFERENCES "SocialLinks" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Shop_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Shop" ("address", "coverPicture", "email", "name", "phone", "profilePicture", "slug", "socialLinksId", "userId", "verified") SELECT "address", "coverPicture", "email", "name", "phone", "profilePicture", "slug", "socialLinksId", "userId", "verified" FROM "Shop";
DROP TABLE "Shop";
ALTER TABLE "new_Shop" RENAME TO "Shop";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
