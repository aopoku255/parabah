-- CreateTable
CREATE TABLE "User" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "avatar" TEXT,
    "password" TEXT NOT NULL,
    "dateOfBirth" DATETIME NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Shop" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "coverPicture" TEXT NOT NULL,
    "profilePicture" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "socialLinksId" TEXT NOT NULL,
    CONSTRAINT "Shop_socialLinksId_fkey" FOREIGN KEY ("socialLinksId") REFERENCES "SocialLinks" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Shop_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SocialLinks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "facebook" TEXT,
    "youtube" TEXT,
    "twitter" TEXT,
    "instagram" TEXT
);

-- CreateTable
CREATE TABLE "ProductReview" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "rating" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "customer" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "comment" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "RefundRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderNo" TEXT NOT NULL,
    "shopName" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PayoutRequest" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "no" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "date" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "message" TEXT NOT NULL
);
