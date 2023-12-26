-- CreateTable
CREATE TABLE "Post" (
    "id" STRING NOT NULL,
    "title" STRING NOT NULL,
    "text" STRING NOT NULL,
    "author" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
