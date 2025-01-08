-- CreateTable
CREATE TABLE "Lesson" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(1000) NOT NULL,
    "content" VARCHAR(1000) NOT NULL,
    "imageUri" VARCHAR(255),

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);
